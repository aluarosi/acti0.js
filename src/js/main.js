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

// main
require.config({
    urlBase: "js",
    paths: {
        jquery: "lib/jquery",
        three:  "lib/three_r61",
        orbitpan: "lib/OrbitAndPanControls.new"
    }
});

require([   'jquery',
            'acti0',
            'setup_video',
            'setup_scene3'
            ], 
            function(
                jq, 
                acti0, 
                setup_video,
                setup_scene3
            ){

    var app = acti0.app;

    // CONFIG
    app.setConfig({
        size    :   1
    }); 
    // SETUP
    app.on('setup', setup_video);
    app.on('setup', setup_scene3);

    // Tentative - tests - This will be in a separate setup_ file
    app.on('setup', function(thisapp){
        thisapp.shared.video_manager.on('canvas-data', function(data){
            //console.log(data);
            var r = data.data[0];
            var g = data.data[1];
            var b = data.data[2];
            var a = data.data[3];
            thisapp.shared.cube.setColor(r,g,b);
            thisapp.shared.cube.setSize(r,g,b);
            // Stop 
            //thisapp.shared.video_manager.removeListener('canvas-data', arguments.callee );
        });       
    });
    
    // RUN
    app.run();

});
