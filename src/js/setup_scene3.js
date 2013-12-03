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

// setup_scene3
define(['three','jquery','cube','orbitpan','surface'], 
    function(three, jquery, cube, orbitpan, surface){
    //TODO: THREE is in the global scope now, but three is undefined

    // SETUP function to export
    var setup_scene3 = function(thisapp){
        /** 
         * 'this' refers to acti0.app, where this function is attached as 'setup' listener
         *  EVENTS:
         *      register:   'render' --> update_camera()
         *      register:   'render' --> render()
         *  SHARED:
         *      my_cube, 'cube'
         */

        console.log("setup_scene3");

        // Renderer
        var container = $("#container3");
        var renderer = new THREE.WebGLRenderer( {antialias: true} );
        renderer.setSize( $('#container3').outerWidth(), $('#container3').outerHeight() );
        renderer.gammaOutput = false;
        container.append( renderer.domElement );

        // Cameras
        var camera = new THREE.PerspectiveCamera(
            35.0,
            $('#container3').outerWidth()/$('#container3').outerHeight(),
            0.01, 4000
        );
        //camera.position.set( 0, 0, this.h3visualizer_controls.size *2.8 );
        camera.position.set( 0, 0, 2 *2.8 );

        // On window resize : update camera and renderer dom element size
        window.addEventListener( 'resize',
            function(){
                camera.aspect = $('#container3').outerWidth()/$('#container3').outerHeight();
                camera.updateProjectionMatrix();
                renderer.setSize( $('#container3').outerWidth(), $('#container3').outerHeight());
            }, 
            false
        );

        // We add controls to cameras
        var cameraControls = new THREE.OrbitAndPanControls(
            camera, renderer.domElement
        );
        cameraControls.target.set( 0,0,0 );
        // We add the driver to the camera
        // TODO: var cameraDriver = new MY.CameraDriver(camera);


        // SCENE
        var scene = new THREE.Scene(); 
    
        var my_cube = new cube.Cube({
            size    : this.config.size
        });
        my_cube.build(scene);
        var my_surface = new surface.Surface({
            
        });
        my_surface.build(scene);

        console.log(scene);

        // SHARE
        thisapp.share(my_cube, 'cube');
        thisapp.share(my_surface, 'surface');
    
        // RENDER LOOP
        var clock = new THREE.Clock();
        var update_camera = function(){
            // Update Camera
            var delta = clock.getDelta();
            cameraControls.update(delta);
        };
        var render = function(){
            // Render
            renderer.render(scene, camera);
        };
        thisapp.on('render', update_camera);
        thisapp.on('render', render);
    
    };
    return setup_scene3;
});
