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

// surface
define(['cosa'], function(cosa){

    var Surface = function(spec){
        var thisobject = this;
        // Validate spec
        var spec = typeof spec !== "undefined" ? spec : {};
        this.canvas_data = null;


        // Extend Cosa
        cosa.Cosa.call(thisobject, spec);

        // Children
        this.children = {
            // mesh : 
        };

        //Position children
        //var that = this;
        //this.children.cloud.setPos3D = function(position_3d){
        //};

        //Position itself
    }; 

    Surface.prototype = Object.create(cosa.Cosa.prototype);

    Surface.prototype.updateFromCanvasData = function(canvas_data){
        this.canvas_data = canvas_data;
        this.rebuild();
    };

    // Paint
    Surface.prototype.paint = function(object_3d){
        var o = object_3d;
        var canvas_data = this.canvas_data;
        if (canvas_data === null) return;
        
        var h = canvas_data.height; 
        var w = canvas_data.width;
        

        var eachpixel = function(callback){
            var r,g,b,a;
            var index;
            for (var i=0; i<h; i++){
                for (var j=0; j<w; j++){
                    index = (i*w + j)*4; 
                    r = canvas_data.data[index];
                    g = canvas_data.data[index+1];
                    b = canvas_data.data[index+2];

                    callback(i,j,r,g,b);
                };
            };
        };

    /**
        var geometry = new THREE.Geometry();
        eachpixel(function(i,j,r,g,b){
            var x = j/20;
            var y = i/20;
            geometry.vertices.push( new THREE.Vector3(x,y,g/255*3));
            geometry.colors.push(new THREE.Color().setRGB(r/255,g/255,b/255));
        });
    */

        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', Float32Array, h*w, 3);
        geometry.addAttribute( 'color', Float32Array, h*w, 3);

        var positions = geometry.attributes.position.array;
        var colors = geometry.attributes.color.array;

        var idx =0;
        var color = new THREE.Color().setRGB(0,1,0);
        eachpixel( function(i,j,r,g,b) {
            var x = (j-w/2)/20.0;
            var y = (i-h/2)/20.0;

            idx = (w*i + j) * 3;

            positions[idx] = x;
            positions[idx+1] = g/255*3;
            positions[idx+2] = y;

            color.setRGB(r/255, g/255, b/255);

            /**
            colors[idx] = color.r;
            colors[idx+1] = color.g;
            colors[idx+2] = color.b;
            */
            colors[idx] = 0;
            colors[idx+1] = color.g;
            colors[idx+2] = 0;
            
        });

        geometry.computeBoundingSphere();

        var material = new THREE.ParticleSystemMaterial({
            size : 1/10*0.4,
            //TODO: threejs does not scale the particle with the zoom
            //      only with the distance! Check this!
            sizeAttenuation : true, 
            vertexColors: true
        });


        var particles = new THREE.ParticleSystem(
            geometry,
            material
        );
    
        o.add(particles); 

        o.scale.set(0.4, 0.4, 0.4);



    };

    return {
        Surface  :   Surface
    };
});
