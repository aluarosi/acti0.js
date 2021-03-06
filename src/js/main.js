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
        jquery  : "lib/jquery",
        three   : "lib/three_r63",
        orbitpan    : "lib/OrbitAndPanControls.new",
        datgui  : "lib/dat.gui.min",
        tweenjs : "lib/tweenjs",
        kinetic : "lib/kinetic",
        d3      : "lib/d3"
    }
});

require([   'jquery',
            'acti0',
            'setup_html',
            'setup_video',
            'setup_scene3',
            'setup_webcam',
            'setup_controls',
            'setup_displayzoom',
            'setup_d3test',
            'setup_connectors'
            ], 
            function(
                jq, 
                acti0, 
                setup_html,
                setup_video,
                setup_scene3,
                setup_webcam,
                setup_controls,
                setup_displayzoom,
                setup_d3test,
                setup_connectors
            ){

    var app = acti0.app;

    // CONFIG
    app.setConfig({
        size        : 0.1,
        D0          : 5.0,  // Distance D0 for camera position,
        viewpoints  : [
            {   destination: new THREE.Vector3(0.0,5,0.1),
                target_dest: new THREE.Vector3(0,0,0),
                fovZ_dest: 1.0 
            },
            {   destination: new THREE.Vector3(2.5,2.5,2.5),
                target_dest: new THREE.Vector3(0,0,0),
                fovZ_dest: 1.0 
            },
            {   destination: new THREE.Vector3(-2.5,2.5, 2.5),
                target_dest: new THREE.Vector3(0,0,0),
                fovZ_dest: 1.0 
            },
            {   destination: new THREE.Vector3(-10,8,10),
                target_dest: new THREE.Vector3(0,0,0),
                fovZ_dest: 4.0 
            },
            {   target_dest: new THREE.Vector3(0,0,-1),
            },
            {   target_dest: new THREE.Vector3(0,0,1),
            }
        ],
        controls    : {
            sources : ['file','webcam'],
            viewpoints  : [1, 2, 3, 4, 5, 6]
        }
    }); 
    // SETUP
    app.on('setup', setup_html);
    app.on('setup', setup_video);
    app.on('setup', setup_scene3);
    app.on('setup', setup_webcam);
    app.on('setup', setup_controls);
    app.on('setup', setup_displayzoom);
    app.on('setup', setup_d3test);
    app.on('setup', setup_connectors);

    // RUN
    app.run();

});
