/**
 * Created by wanyanyan on 16-10-12.
 */
var abaculus = require('abaculus')
var SphericalMercator = require('sphericalmercator')
var mbgl = require('mapbox-gl-native')
var sharp = require('sharp')
var request = require('request')
var mime = require('mime')

module.exports = function(style, params, callback) {
  var opts = {
    style: style,
    scale: params.scale,
    format: params.format
  }

  params.getTile = function(z, x, y, callback2) {
    return getTileMapboxGL(z, x, y, opts, callback2)
  }

  abaculus(params, callback)
}

 function getTileMapboxGL(z, x, y, opts, callback) {
   if (!opts.style) {
     return callback(new Error('Mising style'))
   }

   opts.format = opts.format || 'png'

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
     ratio: opts.scale
   }

   var sm = new SphericalMercator({ size: 512 })
   var center = sm.ll([x * 512 + 256, y * 512 + 256], z)

   var renderOptions = {
     zoom: z,
     width: 512,
     height: 512,
     center: center,
     bearing: opts.bearing || 0,
     pitch: opts.pitch || 0
   }

   var map = new mbgl.Map(mapOptions)
   map.load(opts.style)
   map.render(renderOptions, function(err, buffer) {
     if (err) return callback(err)

     map.release()

     var image = sharp(buffer, {
       raw: {
         width: parseInt(renderOptions.width * mapOptions.ratio),
         height: parseInt(renderOptions.width * mapOptions.ratio),
         channels: 4
       }
     })
     image.toFormat(opts.format).toBuffer(function(err, buffer, info) {
       return callback(err, buffer, { 'Content-Type': mime.lookup(info.format) })
     })
   })
 }
