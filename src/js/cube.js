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

// cube
define(['cosa'], function(cosa){

    var Cube = function(spec){
        // Validate spec
        var spec = spec !== undefined ? spec : {};
        this.size = typeof spec.size === "number" && spec.size ? spec.size : 2;
        this.color = new THREE.Color().setRGB(1,0,0);
    
        // Extend Cosa
        cosa.Cosa.call(this, spec);
        
        // Children
        this.children = {
            //cloud   :   new H3VIS.Cloud(this)
        };
    
        //Position children
        //var that = this;
        //this.children.cloud.setPos3D = function(position_3d){
        //};
    };
     
    Cube.prototype = Object.create( cosa.Cosa.prototype );
    
    Cube.prototype.setColor = function(r,g,b){
        this.color.setRGB(r/255, g/255, b/255);
    };
    Cube.prototype.setSize = function(r,g,b){
        this.size = 1 + (1 * r/255);
        this.rebuild();
    };

    Cube.prototype.paint = function(object_3d){
        var o = object_3d;
    
        var light = new THREE.HemisphereLight(0x777777,0x222222);
        var light2 = new THREE.DirectionalLight(0xffffff);
        light2.position.set(1,1,1);
        o.add(light);
        o.add(light2);

        var geometry = new THREE.CubeGeometry(this.size,this.size,this.size,1,1,1);

        var cube = new THREE.Mesh(
            geometry,
            new THREE.MeshLambertMaterial({
                color   :   this.color,
                wireframe : true
            })
        );
        this.cube = cube;

        o.add(cube);
    };

    
    return {
        Cube  :   Cube
    };
});

