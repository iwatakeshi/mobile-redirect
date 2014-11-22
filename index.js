/*jslint node: true, forin: true, jslint white: true, newcap: true*/
/*
 * mdirect
 * author : Takeshi Iwana
 * https://github.com/iwatakeshi
 * license : MIT
 * Code heavily borrowed from Adam Draper
 * https://github.com/adamwdraper
 */

(function() {
    'use strict';

    var mdirect,
        isMobile = require('is-mobile'),
        _ = require('lodash'),
        _opt = {},
        _default = {
            redirectPath: '/mobile'
        },
        _opt = _default,
        hasModule = (typeof module !== 'undefined' && module.exports);

    mdirect = function(opt) {
        if(opt){
          _opt = _.assign(_.extend(_default, opt));
        }
        return function(req, res, next) {
            if (isMobile(req) || /mobile/i.test(req.header('user-agent'))) {
                if (req.path !== _opt.redirectPath) {
                    res.redirect(_opt.redirectPath);
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    };

    /************************************
      Exposing mdirect
  ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = mdirect;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `mdirect` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this.mdirect = mdirect;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return mdirect;
        });
    }
}).call(this);