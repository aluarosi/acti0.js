// setup_video

define(['jquery','event0'], function(jquery, event0){


    // CLASSES (these could be taken out to a requirejs module)
    var VideoManager = function(){
        this.video = $('#video_video')[0];
        this.canvas = $('#video_canvas')[0];
        this.context = this.canvas.getContext('2d');

        this.canvas.width = this.video.clientWidth;
        this.canvas.height = this.video.clientHeight;
        //this.canvas.width = this.canvas.width/10;
        //this.canvas.height = this.canvas.height/10;
        this.canvas.width = 192
        this.canvas.height = 125
    };
    
    VideoManager.prototype = Object.create(event0.EventEmitter);
    VideoManager.prototype.drawToCanvas = function(){
        this.context.drawImage(this.video, 0,0, this.canvas.width,this.canvas.height );
    };



    // SETUP function to be exported
    var setup_video = function(){
    /** 
     * 'this' refers to acti0.app, where this function is attached as 'setup' listener
     * READS:
     *  this.config
     */

        var video_manager = new VideoManager();

        this.onX('render', video_manager.drawToCanvas.bind(video_manager));

    };
    return setup_video;
});
