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
         * Setup
         */
        var setup = function(thisapp){
            // Tentative: passing setup_context to the listener
            //  will it be useful?
            var setup_context = {};
            console.log("event0.app.setup");
            thisapp.emit('setup', setup_context);
        };
        /**
         * Loop
         */
        var loop = function(thisapp){
            console.log("event0.app.loop");
            // Tentative: passing render_context to the listener
            //  will it be useful?
            var render_context = {};
            // This is our "inner-reactor loop"
            (function render(){
                thisapp.emit('render', render_context);
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
