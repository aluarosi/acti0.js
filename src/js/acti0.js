/**
 * This file is part of acti0.js
 * (JavaScript framework for building interactive visualizations in the web browser)
 * https://github.com/aluarosi/acti0.js
 * 
 * Copyright (C) 2013 Alvaro Santamaria Herrero (aluarosi)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// acti0
define(['event0'], function(event0){

    var App = function(){
        this.config = {};
        this.shared = {};
        /**
         * Config
         */
        this.setConfig = function(custom_config){
            this.config = custom_config;
        }
        /**
         * Share
         */
        this.share = function(obj, name){
           this.shared[name] = obj; 
        };
        /**
         * Setup
         */
        var setup = function(thisapp){
            console.log("event0.app.setup");
            thisapp.emit('setup', thisapp);
        };
        /**
         * Loop
         */
        var loop = function(thisapp){
            console.log("event0.app.loop");
            // This is our "inner-reactor loop"
            (function render(){
                thisapp.emit('render', thisapp);
                requestAnimationFrame(render); 
            }());
        };
        /**
         * Run (public method)
         */
        this.run = function(){
            console.log("event0.app.run");
            setup(this);
            loop(this);
        };
    };

    // Inherit from EventEmitter
    App.prototype = Object.create(event0.EventEmitter.prototype);

    var app = new App();

    return {
        app: app
    };
});
