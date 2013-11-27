// main

require.config({
    urlBase: "js",
    paths: {
        jquery: "lib/jquery",
        three:  "lib/three_r61",
        orbitpan: "lib/OrbitAndPanControls.new"
    }
});

require([   'jquery',
            'acti0',
            'setup_video',
            'setup_scene3'
            ], 
            function(
                jq, 
                acti0, 
                setup_video,
                setup_scene3
            ){

    var app = acti0.app;

    // CONFIG
    app.setConfig({
        size    :   1
    });

    // SETUP
    app.on('setup', setup_video);
    app.on('setup', setup_scene3);
    
    // RUN
    app.run();

});
