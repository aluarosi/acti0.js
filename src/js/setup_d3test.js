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

// setup_d3test
/**
    D3.js micro-demo
    Shows interactive circles for each viewpoint
 */

define(['d3'], function(d3dummy){
    // d3.js seems not to be imported the require.js way
    // d3 is in the global scope instead

    var my_viewpoints = {};

    var setup_d3test = function(thisapp){
        console.log("d3test"); 

        //TODO: this should be cloned
        my_viewpoints = thisapp.config.viewpoints; 
        // A shared model should exist to coordinate this display
        //  with other controls tigeering the camera movements
        //  but we "model" the state hacking the config object!!!
        //  This is pretty ugly. We want something running fast.
        var div_viewpoints = d3.selectAll("#div_viewpoints");
        var w = div_viewpoints[0][0].clientWidth;
        var h = div_viewpoints[0][0].clientHeight;
        var n = my_viewpoints.length;
        var inc = h/n;
        var r = inc*0.8;
        var set_cx = function(d,i){
            var cx = (i/3|0)*w/2 + w/4; 
            return cx;
        };
        var set_cy = function(d,i){
            var j = i/3|0;
            var k = i -j*3;
            var cy = 2*inc*(k+1/2); 
            return cy;
        };
    
        // Trying out D3.js for the 1st time
        // Round buttons to select the camra viewpoint
        var circles = div_viewpoints.append("svg")
            .selectAll("circle")
            .data(my_viewpoints)
            .enter().append("circle")
            .attr("cx", set_cx)
            .attr("cy", set_cy)
            .attr("r", r)
            .style("fill", "grey")
            .style("stroke", "white")
            .on("click", function(d,i){
                console.log(i);
                thisapp.shared.goToViewpoint(thisapp.config.viewpoints[i]);
                // Ugly hack, as we tamper config
                my_viewpoints.forEach(function(d,i){
                    d.__selected__ = false;
                });
                my_viewpoints[i].__selected__ = true;
                update();
            });
            
        var update = function(i){
            var circles = div_viewpoints.select("svg").selectAll("circle")
                .data(my_viewpoints)
                .transition().duration(1000)
                .style("fill", function(d,i){
                    return d.__selected__ ? "green" : "grey";
                });
            
        };
        

    };
    return setup_d3test;
});
