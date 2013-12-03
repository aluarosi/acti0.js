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
        three:  "lib/three_r63",
        orbitpan: "lib/OrbitAndPanControls.new"
    }
});

require([   'jquery',
            'acti0',
            'setup_video',
            'setup_scene3',
            'setup_connectors'
            ], 
            function(
                jq, 
                acti0, 
                setup_video,
                setup_scene3,
                setup_connectors
            ){

    var app = acti0.app;

    // CONFIG
    app.setConfig({
        size    :   1
    }); 
    // SETUP
    app.on('setup', setup_video);
    app.on('setup', setup_scene3);

    app.on('setup', setup_connectors);

    
    // RUN
    app.run();

});
