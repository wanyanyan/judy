var _ = require('lodash')
var validate = require('mapbox-gl-style-spec').validate
var escaper = require('mongo-key-escaper')
var abaculus = require('abaculus')
var gl2xml = require('mapbox-gl-json-to-mapnik-xml')
var async = require('async')
var tilelive = require('tilelive')
  // var mbgl = require('mapbox-gl-native')
  // var sharp = require('sharp')
  // var request = require('request')
var Style = require('../models/style')
var render = require('./native-gl-render')


//该模块包含了对样式功能进行业务处理的各项函数

module.exports.list = function(req, res) {
  var query = {
    owner: req.params.username,
    is_deleted: false
  }

  if (req.user.username !== req.params.username && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    query.scope = 'public'
  }

  Style.find(query, 'style_id owner scope type tags description version name createdAt updatedAt', function(err, styles) {
    if (err) {
      return res.status(500).json({ error: err })
    }

    res.json(styles)
  }).sort({ createdAt: -1 })
}


module.exports.retrieve = function(req, res) {
  Style.findOne({
    style_id: req.params.style_id,
    owner: req.params.username
  }, function(err, style) {
    if (err) {
      return res.status(500).json({ error: err })
    }

    if (!style) {
      return res.sendStatus(404)
    }

    res.json(escaper.unescape(style.toJSON()))
  })
}


module.exports.create = function(req, res) {
  var errors = validate(req.body)
  if (errors.length > 0) {
    return res.status(400).json(errors)
  }

  var filter = ['_id', '__v', 'is_deleted', 'style_id', 'owner', 'createdAt', 'updatedAt']
  var style = _.omit(escaper.escape(req.body), filter)

  var newStyle = new Style(style)
  newStyle.owner = req.params.username

  newStyle.save(function(err, style) {
    if (err) {
      return res.status(500).json({ error: err })
    }

    res.json(escaper.unescape(style.toJSON()))
  })
}


module.exports.update = function(req, res) {
  var filter = ['_id', '__v', 'is_deleted', 'style_id', 'owner', 'createdAt', 'updatedAt']

  Style.findOneAndUpdate({
    style_id: req.params.style_id,
    owner: req.params.username
  }, _.omit(escaper.escape(req.body), filter), { new: true }, function(err, style) {
    if (err) {
      return res.status(500).json({ error: err })
    }

    if (!style) {
      return res.sendStatus(404)
    }

    res.json(escaper.unescape(style.toJSON()))
  })
}


module.exports.delete = function(req, res) {
  Style.findOneAndUpdate({
    style_id: req.params.style_id,
    owner: req.params.username
  }, { is_deleted: true }, { new: true }, function(err, style) {
    if (err) {
      return res.status(500).json({ error: err })
    }

    if (!style) {
      return res.sendStatus(404)
    }

    res.sendStatus(204)
  })
}


module.exports.downloadTile = function(req, res) {
  var style_id = req.params.style_id
  var username = req.params.username
  var z = +req.params.z || 0
  var x = +req.params.x || 0
  var y = +req.params.y || 0
  var scale = +(req.params.scale || '@1x').slice(1, 2)
  var format = req.params.format || 'png'

  async.autoInject({
    style: function(callback) {
      Style.findOne({ style_id: style_id, owner: username }, callback)
    },
    getTile: function(style, callback) {
      var opts = {
        style: escaper.unescape(style.toJSON()),
        scale: scale,
        format: format
      }

      getTileMapnik(z, x, y, opts, callback)
    }
  }, function(err, results) {
    if (err) {
      return res.status(500).json({ error: err })
    }

    res.set(results.getTile[1])
    res.send(results.getTile[0])
  })
}


module.exports.preview = function(req, res) {
  var style_id = req.params.style_id
  var username = req.params.username

  var params = {
    zoom: parseInt(+req.query.zoom || 0),
    scale: +req.query.scale || 1,
    bbox: JSON.parse(req.query.bbox || null) || [-180, -85.0511, 180, 85.0511],
    center: JSON.parse(req.query.center || null),
    format: req.query.format || 'png',
    quality: +req.query.quality || null,
    limit: 19008,
    tileSize: 512
  }

  async.autoInject({
    style: function(callback) {
      Style.findOne({ style_id: style_id, owner: username }, callback)
    },
    getImage: function(style, callback) {
      render(escaper.unescape(style.toJSON()), params, callback)
      //getImageAbaculus(escaper.unescape(style.toJSON()), params, callback)
    }
  }, function(err, results) {
    if (err) {
      return res.status(500).json({ error: err.message || err })
    }

    res.set(results.getImage[1])
    res.send(results.getImage[0])
  })
}


function getTileMapnik(z, x, y, opts, callback) {
  if (!opts.style) {
    return callback('Mising style')
  }

  opts.scale = +opts.scale || 1
  opts.format = opts.format || 'png'

  async.autoInject({
    xml: function(callback) {
      gl2xml(opts.style, callback)
    },
    source: function(xml, callback) {
      var uri = {
        protocol: 'vector:',
        xml: xml,
        scale: opts.scale,
        format: opts.format
      }

      tilelive.load(uri, callback)
    },
    getTile: function(source, callback) {
      source.getTile(z, x, y, callback)
    }
  }, function(err, results) {
    if (err) return callback(err)

    if (!results.getTile) return callback()

    return callback(err, results.getTile[0], results.getTile[1])
  })
}


// function getTileMapboxGL(z, x, y, opts, callback) {
//   if (!opts.style) {
//     return callback(new Error('Mising style'))
//   }

//   opts.scale = (+opts.scale || 1) / 2
//   opts.format = opts.format || 'png'

//   var mapOptions = {
//     request: function(req, callback) {
//       request({
//         url: req.url,
//         encoding: null,
//         gzip: true
//       }, function(err, res, body) {
//         if (err) return callback(err)

//         return callback(null, {data: body})
//       })
//     },
//     ratio: opts.scale
//   }

//   var sm = new SphericalMercator({ size: 512 })
//   var center = sm.ll([x * 512 + 256, y * 512 + 256], z)

//   var renderOptions = {
//     zoom: z,
//     width: 512,
//     height: 512,
//     center: center,
//     bearing: opts.bearing || 0,
//     pitch: opts.pitch || 0
//   }

//   var map = new mbgl.Map(mapOptions)
//   map.load(opts.style)
//   map.render(renderOptions, function(err, buffer) {
//     if (err) return callback(err)

//     map.release()

//     var image = sharp(buffer, {
//       raw: {
//         width: renderOptions.width * mapOptions.ratio,
//         height: renderOptions.width * mapOptions.ratio,
//         channels: 4
//       }
//     })

//     image.toFormat(opts.format).toBuffer(function(err, buffer, info) {
//       return callback(err, buffer, { 'Content-Type': mime.lookup(info.format) })
//     })
//   })
// }

/* eslint-disable no-unused-vars */
function getImageAbaculus(style, params, callback) {
  var opts = {
    style: style,
    scale: params.scale,
    format: params.format
  }

  params.getTile = function(z, x, y, callback2) {
    return getTileMapnik(z, x, y, opts, callback2)
  }

  abaculus(params, callback)
}
