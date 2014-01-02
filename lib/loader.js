/*
 Copyright, 2013, by Tomas Korcak. <korczis@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

(function () {
    'use strict';

    var fs = require('fs'),
        path = require('path');

    var Module = require('./module');

    var exports = module.exports = function Loader(opts) {
        if(!opts) {
            opts = {};
        }
    };

    exports.prototype.modules = (function() {
        return [];
    }());

    exports.prototype.prototypes = (function() {
        return {};
    })

    exports.loadModule = (function(dir) {
        return require(dir);
    });

    exports.instantiateModule = (function(klass, opts) {
        if(!opts) {
            opts = {};
        }
        
        return new klass(opts);
    });

    exports.prototype.addModules = (function(dir) {
        var res = [];

        // List directory and load every subfolder as module
        var files = fs.readdirSync(dir);
        for(var i = 0; i < files.length; i++) {
            var fullPath = path.join(dir, files[i]);
            
            // Try load as module if module.json exists
            if(fs.existsSync(path.join(fullPath, 'module.json')))
            {
                var Mod = exports.loadModule(fullPath);
                var segments = fullPath.split(path.sep);
                var modName = segments[segments.length - 1];

                this.prototypes[modName] = Mod;

                /*
                var mod = exports.instantiateModule(Mod);
                if(mod) {
                    res.push(mod);
                } 
                */      
            }                             
        }
        
        this.modules = res;

        return this.modules;
    });

    exports.prototype.getModule = (function(name) {
        return this.prototypes[name];
    });

    exports.prototype.createInstance = (function(name, opts) {
        if(!opts) {
            opts = {};
        }
        
        var Mod = this.getModule(name);
        if(Mod) {
            return new Mod(opts);
        }
    });

}());