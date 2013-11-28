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

// setup_video
define(['jquery','event0'], function(jquery, event0){


    // CLASSES (these could be taken out to a requirejs module)
    var VideoManager = function(){
        /**
         * VideoManager
         * EVENTS:
         *      emit('canvas-drawn', image_data)
         */
        this.video = $('#video_video')[0];
        this.canvas = $('#video_canvas')[0];
        this.context = this.canvas.getContext('2d');

        this.canvas.width = this.video.clientWidth;
        this.canvas.height = this.video.clientHeight;
        //this.canvas.width = this.canvas.width/10;
        //this.canvas.height = this.canvas.height/10;
        this.canvas.width = 192;
        this.canvas.height = 125;
    };
    
    VideoManager.prototype = Object.create(event0.EventEmitter.prototype);
    VideoManager.prototype.drawToCanvas = function(){
        this.context.drawImage(this.video, 0,0, this.canvas.width,this.canvas.height );
        var image_data = this.context.getImageData(0,0, this.canvas.width, this.canvas.height);
        this.emit('canvas-data', image_data);
    };



    // SETUP function to be exported
    var setup_video = function(thisapp){
    /** 
     * 'this' refers to acti0.app, where this function is attached as 'setup' listener
     * READS:
     *  this.config
     */

        var video_manager = new VideoManager();
        thisapp.share(video_manager, 'video_manager');

        thisapp.onX('render', video_manager.drawToCanvas.bind(video_manager));

    };
    return setup_video;
});
