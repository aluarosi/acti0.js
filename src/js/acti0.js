define(['event0'], function(event0){

    var App = function(){
        this.config = {};
        this.shared = {};
        /**
         * Config
         */
        this.setConfig = function(custom_config){
            this.config = custom_config;
        }
        /**
         * Share
         */
        this.share = function(obj, name){
           this.shared[name] = obj; 
        };
        /**
         * Setup
         */
        var setup = function(thisapp){
            console.log("event0.app.setup");
            thisapp.emit('setup', thisapp);
        };
        /**
         * Loop
         */
        var loop = function(thisapp){
            console.log("event0.app.loop");
            // This is our "inner-reactor loop"
            (function render(){
                thisapp.emit('render', thisapp);
                requestAnimationFrame(render); 
            }());
        };
        /**
         * Run (public method)
         */
        this.run = function(){
            console.log("event0.app.run");
            setup(this);
            loop(this);
        };
    };

    // Inherit from EventEmitter
    App.prototype = Object.create(event0.EventEmitter.prototype);

    var app = new App();

    return {
        app: app
    };
});
