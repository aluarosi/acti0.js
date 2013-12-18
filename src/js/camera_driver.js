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

// camera_driver
define(['event0','three'], function(event0, three){

    var SimpleDriver = function(camera, app, spec){
        var thisobject = this;
        //Validate spec
        var spec = typeof spec !== "undefined" ? spec : {};
        this.destination = spec.destination || [-1,-1,-1];
        this.target = null;
        this.velocity = null;
        this.camera = null;
        this.app = app;

        this.clock = new THREE.Clock();
        this.receiveRenderBound = null;

        // Unit vector to destination
        this.ux = null;
        this.uy = null;
        this.uz = null;
    };

    SimpleDriver.prototype = Object.create(event0.EventEmitter.prototype);
    SimpleDriver.prototype.go = function(){
        // Attach itself to acti0 app 'render' event
        this.receiveRenderBound = this.receiveRender.bind(this);
        this.app.on('render', this.receiveRenderBound ); 
        this.clock.getDelta();
    };
    SimpleDriver.prototype.stop = function(){
        
    };
    SimpleDriver.prototype.set = function(destination, target, velocity){
        this.destination = destination;
        this.target = target;
        this.velocity = velocity;

        //TODO: this.ux = 
    };
    SimpleDriver.prototype.clear = function(){
        
    };
    SimpleDriver.prototype.receiveRender = function(){
        var delta = this.clock.getDelta();
        //this.camera.position += 
    };





    return {
        SimpleDriver  :   SimpleDriver
    };
});
