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

// setup_controls
define(['datgui','jquery','three'], function(datgui,jquery,three){
    /**
        datgui -> not imported the requirejs way
        We get the reference to 'dat' instead.
        (Like for jquery)
     */
    var setup_controls = function(thisapp){
        console.log("setup_controls");

        // GUI controls
        var gui = new dat.GUI({autoPlace: false});
        var controlsContainer = $(thisapp.shared.html_controls);
        controlsContainer.append(gui.domElement); 
        //Folders
        var f_visualizer = gui.addFolder("WebCam/File");
        //var f_camera = gui.addFolder("Camera");
        f_visualizer.open();
        //f_camera.open();
        // Source selector
        var ctrl_source = f_visualizer.add(
            thisapp.config.controls,
            'sources',thisapp.config.controls.sources
        ).name("Source");
        // Camera viewpoints
        /**
        var ctrl_viewpoint = f_camera.add(
            thisapp.config.controls,
            'viewpoints',thisapp.config.controls.viewpoints
        ).name("Viewpoint");
        */


        // CONNECTIONS
        ctrl_source.onChange(function(val){
            var selector = {
                'file'      : function(){
                    thisapp.shared.video_manager.setSource(        
                        $(thisapp.shared.html_video_source).attr("src")
                    );
                    $(thisapp.shared.html_license).css("display","block");
                },
                'webcam'    : function(){
                    thisapp.shared.webcam.activate();
                    $(thisapp.shared.html_license).css("display","none");
                }
            };
            selector[val]();
        }); 
        /**
        ctrl_viewpoint.onChange(function(val){
            thisapp.shared.goToViewpoint(thisapp.config.viewpoints[val-1]);
        });
        */
    

    };
    return setup_controls;
});
