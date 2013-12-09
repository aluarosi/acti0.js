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

// setup_webcam

define(['event0'], function(event0){

    // Aux functions
    var hasGetUserMedia = function() {
        return  !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
    };
    var goIfGetUserMedia = function(continuation){
        /**
            If a vendor getUserMedia() function exists,
            executes continuation(getUserMedia) 
         */
        if (hasGetUserMedia()){
            navigator.getUserMedia =  navigator.getUserMedia || navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia || navigator.msGetUserMedia;
            continuation();
        } else {
            alert('getUserMedia() is not supported in your browser\n(WebCam not available!)');

        };
    };

    // WEBCAM manager
    var WebCamManager = function(video_element){
        this.video = video_element;

    };
    WebCamManager.prototype = Object.create(event0.EventEmitter.prototype);
    WebCamManager.prototype.activate = function(){
        var _this = this;
        goIfGetUserMedia(function(){
            navigator.getUserMedia(
                {"video": true, "audio": false}, 
                function(localMediaStream){
                    _this.video.src = window.URL.createObjectURL(localMediaStream);
                },
                function(e){
                    console.log("callback error", e);
                }
            );
        });
    };



    // SETUP function to be exported
    var setup_webcam = function(thisapp){
        console.log("SETUP WEBCAM");

        var video = document.querySelector('video');

        webcam = new WebCamManager(video);

        //thisapp.share(webcam, 'webcam');

        webcam.activate();

    };
    return setup_webcam; 

});

