/** * This file is part of acti0.js
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

// setup_video
define(['event0'], function(event0){

    // CLASSES (these could be taken out to a requirejs module)
    /**
     * VideoManager
     * EVENTS:
     *      emit:       --> 'canvas-drawn' image_data
     *      receive:    'render' --> receiveRender()
    */
    var VideoManager = function(html_video, html_canvas){
        this.video = html_video;
        this.canvas = html_canvas;
        this.context = this.canvas.getContext('2d');

        this.canvas.width = this.video.clientWidth;
        this.canvas.height = this.video.clientHeight;
        this.canvas.width = 192;
        this.canvas.height = 125;
    };
    VideoManager.prototype = Object.create(event0.EventEmitter.prototype);
    VideoManager.prototype.drawToCanvas = function(){
        this.context.drawImage(this.video, 0,0, this.canvas.width,this.canvas.height );
        var image_data = this.context.getImageData(0,0, this.canvas.width, this.canvas.height);
        this.emit('canvas-data', image_data);
    };
    // Receiver method
    VideoManager.prototype.receiveRender = function(event_emitter, event_data){
        this.drawToCanvas(); 
    };
    // Setter methods
    VideoManager.prototype.setSource = function(src){
        this.video.src = src;
    };

    // SETUP function to be exported
    var setup_video = function(thisapp){
    /** 
     * 'this' refers to acti0.app, where this function is attached as 'setup' listener
     *  EVENTS:
     *      register:   'render' --> VideoManager.receiveRender()
     *  SHARED:
     *      video_manager, 'video_manager'
     */

        var video_manager = new VideoManager(
            thisapp.shared.html_video,
            thisapp.shared.html_video_canvas
        );

        // Shared objects
        thisapp.share(video_manager, 'video_manager');

        // Register event handler
        thisapp.onX('render', video_manager.receiveRender.bind(video_manager));

    };
    return setup_video;
});
