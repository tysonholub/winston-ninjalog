var util = require('util');
var request = require('request');
var jwt = require('jwt-simple');
var winston = require('winston');

var defaultOptions = {
  level: 'debug',
  name: 'ninjalog',
  formatter: function(options){
    return new Date().toISOString() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.msg ? options.msg : '') +
      (options.meta && Object.keys(options.meta).length ? '\n'+ JSON.stringify(options.meta, null, 4) : '' );
  }
};

function Ninjalog (options) {
  if (!options) {
    throw new Error('Transport options is required');
  }
  if (!options.email) {
    throw new Error('You must specify the Ninjalog email in options.email');
  }
  if(!options.client_id) {
    throw new Error('You must specify the Ninjalog client_id in options.client_id');
  }
  if(!options.client_secret) {
    throw new Error('You must specify the Ninjalog client_secret in options.client_secret');
  }

  this.options = options;
  this.options.level = options.level || defaultOptions.level;
  this.options.name = options.name || defaultOptions.name;
  this.options.formatter = options.formatter || defaultOptions.formatter;

  this.name = this.options.name;
  this.level = this.options.level;

  var self = this;
  request({
    uri: 'https://www.ninjalog.io/api/v1/auth/token',
    method: 'POST',
    json: {
      email: self.options.email,
      client_id: self.options.client_id
    }
  }, function(err, res, body){
    var decoded = jwt.decode(body, self.options.client_secret);
    self.auth_token = decoded['auth_token'];
  });
}

util.inherits(Ninjalog, winston.Transport);

Ninjalog.prototype.log = function (level, msg, meta, callback) {
  var self = this;

  if(!self.auth_token){
    throw new Error('You do not have a Ninjalog auth_token');
  }

  request({
    uri: 'https://www.ninjalog.io/api/v1/log',
    method: 'POST',
    json: {
      message: self.options.formatter({
        level: level,
        msg: msg,
        meta: meta
      })
    },
    headers: {
      Authorization: 'Bearer ' + self.auth_token
    }
  }, function(err, res, body){
    callback(null, true);
  });
};

winston.transports.Ninjalog = Ninjalog;
module.exports = Ninjalog;
module.exports.Ninjalog = Ninjalog;
