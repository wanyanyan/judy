/**
 * Created by wanyanyan on 16-10-14.
 */
var mbgl = require('mapbox-gl-native')
var sharp = require('sharp')
var request = require('request')
var mime = require('mime')

module.exports = function(style, params, callback) {
  if (!style) {
    return callback(new Error('Mising style'))
  }

  params.format = params.format || 'png'

  var mapOptions = {
    request: function(req, callback) {
      request({
        url: req.url,
        encoding: null,
        gzip: true
      }, function(err, res, body) {
        if (err) return callback(err)

        return callback(null, {data: body})
      })
    },
    ratio: params.scale/2
  }

  var center = params.center||[(params.bbox[0]+params.bbox[2])/2,(params.bbox[1]+params.bbox[3])/2]
  var renderOptions = {
    zoom: params.zoom,
    width: 1000,
    height: 1000,
    center: center,
    bearing: params.bearing || 0,
    pitch: params.pitch || 0
  }

  var map = new mbgl.Map(mapOptions)
  map.load(style)
  map.render(renderOptions, function(err, buffer) {
    if (err) return callback(err)

    map.release()

    var image = sharp(buffer, {
      raw: {
        width: renderOptions.width * mapOptions.ratio,
        height: renderOptions.width * mapOptions.ratio,
        channels: 4
      }
    })
    image.toFormat(params.format).toBuffer(function(err, buffer, info) {
      return callback(err, buffer, info?{ 'Content-Type': mime.lookup(info.format) }:null)
    })
  })
}

