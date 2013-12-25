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

// setup_displayzoom
/**
    KineticJS micro-demo
    Shows zoom diagram with KineticJS on a canvas
 */

define(['kinetic'], function(kinetic){

    var setup_displayzoom = function(thisapp){

        // Test1: draw a circle
        var container = document.querySelector("#div_zoom");

        var stage = new kinetic.Stage({
            container   : "div_zoom",
            width       : container.clientWidth,
            height      : container.clientHeight
        });
        var layer = new kinetic.Layer();
    
        var circle = new kinetic.Circle({
            x: 10,
            y: 20,
            radius: 10,
            fill: 'green',
            stroke: 'white',
            strokeWidth: 4
        });


        // Build
        layer.add(circle);
        stage.add(layer);

        // Events
        circle.on('mouseover', function(evt){
            this.attrs.radius = this.attrs.radius-1;
            layer.draw();
        });

        // Camera image
        var imageObj = new Image();
        var callback = function(){
            var camera = new kinetic.Image({
                x : 0,
                y : 0,
                width : imageObj.width/2,
                height : imageObj.height/2,
                image: imageObj
            });
            layer.add(camera);
        };
        imageObj.onload = callback;
        imageObj.src = "http://172.16.0.201:8000/test/img/camera.png";

    };
    return setup_displayzoom;
});