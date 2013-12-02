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


    }; 

    Surface.prototype = Object.create(cosa.Cosa.prototype);

    Surface.prototype.updateFromCanvasData = function(canvas_data){
        //console.log("updateFromCanvasData", canvas_data);
    };

    return {
        Surface  :   Surface
    };
});
