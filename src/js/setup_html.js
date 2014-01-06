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

// setup_html

define([], function(){
    var setup_html = function(thisapp){

        thisapp.share( document.querySelector('video#video_video'), 'html_video');
        thisapp.share( document.querySelector('video#video_video source'), 'html_video_source');
        thisapp.share( document.querySelector('canvas#video_canvas'), 'html_video_canvas');
        thisapp.share( document.querySelector('#container3'), 'html_container3d');
        thisapp.share( document.querySelector('#controls'), 'html_controls');
        thisapp.share( document.querySelector('#video-license'), 'html_license');
    }; 
    return setup_html;
});
