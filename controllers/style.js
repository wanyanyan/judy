var _ = require('lodash')
var validate = require('mapbox-gl-style-spec').validate
var escaper = require('mongo-key-escaper')
//var abaculus = require('abaculus')
//var gl2xml = require('mapbox-gl-json-to-mapnik-xml')
var async = require('async')
//var tilelive = require('tilelive')
  // var mbgl = require('mapbox-gl-native')
  // var sharp = require('sharp')
  // var request = require('request')
var Style = require('../models/style')
//var render = require('./native-gl-render')


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
  /*var style_id = req.params.style_id
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
  })*/
}


module.exports.preview = function(req, res) {
  /*var style_id = req.params.style_id
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
  })*/
}
