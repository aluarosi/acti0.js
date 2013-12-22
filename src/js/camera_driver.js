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
define(['event0','three','tweenjs'], function(event0, three, tween){
    // Tween is not imported as require.js, but in global space 
    //   under name "createjs"
    var Tween = createjs.Tween;
    var Ease = createjs.Ease;
    

    var SimpleDriver = function(camera, app, spec){
        var thisobject = this;
        //Validate spec
        var spec = typeof spec !== "undefined" ? spec : {};
        this.origin = null;
        this.destination = spec.destination || new THREE.Vector3(-1,-1,-1);
        this.target = new THREE.Vector3(0,0,0);
        this.camera = camera;
        this.app = app;
        this.duration = 1.0;
        this.camtween = camera;

        this.receiveRenderBound = null;

    };

    SimpleDriver.prototype = Object.create(event0.EventEmitter.prototype);
    SimpleDriver.prototype.go = function(duration, ease){
        console.log("camera driver go");
        var ease = ease || Ease.backInOut;
        this.duration = duration || this.duration;
        this.origin = this.camera.position.clone();
        // Attach itself to acti0 app 'render' event
        this.receiveRenderBound = this.receiveRender.bind(this);
        this.app.onX('render', this.receiveRenderBound);
        // Tween
        var thisobject = this;
        this.camtween = Tween.get(thisobject.camera.position).to(
            { 
                x: thisobject.destination.x, 
                y: thisobject.destination.y,
                z: thisobject.destination.z
            }, 
            thisobject.duration,
            ease 
        ).call(function(){
            // End of the tween! 
            // Disconnect from tick
            thisobject.app.removeListenerX('render', thisobject.receiveRenderBound);
            thisobject.emit('done', thisobject);
        });
        console.log("camtween", this.camtween);
    };
    SimpleDriver.prototype.stop = function(){
        
    };
    SimpleDriver.prototype.set = function(destination, target){
        this.destination = destination || this.destination;
        this.target = target || this.target;
    };
    SimpleDriver.prototype.clear = function(){
        
    };
    SimpleDriver.prototype.update = function(delta){
        Tween.tick(delta);
        this.camera.lookAt(this.target);
        // TODO: camera.target has to be included in the tween too!!!
    };
    SimpleDriver.prototype.receiveRender = function(app, delta){
        this.update(delta);
    };





    return {
        SimpleDriver  :   SimpleDriver
    };
});
