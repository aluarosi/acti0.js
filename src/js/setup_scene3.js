// setup_scene3

define(['three','jquery','cube','orbitpan'], 
    function(three, jquery, cube, orbitpan){
    //TODO: THREE is in the global scope now, but three is undefined

    var setup_scene3 = function(){
        /** 
         * 'this' refers to acti0.app, where this function is attached as 'setup' listener
         * READS:
         *  this.config.
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
        console.log(scene);

    
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
        this.on('render', update_camera);
        this.on('render', render);
    
    };

    return setup_scene3;
});

MY = {};
MY.setupRenderersAndCameras = function(){
    // Grab container div and append renderer.domElement
    var container = $("#containerR");
    // Create Renderer(s) and add it to our container div
    this.renderer = new THREE.WebGLRenderer( {antialias: true} );
    this.renderer.setSize( $('#containerR').outerWidth(), $('#containerR').outerHeight() );
    this.renderer.gammaOutput = false;
    container.append( this.renderer.domElement );
    
    // Cameras
    this.camera = new THREE.PerspectiveCamera(
        35.0,
        $('#containerR').outerWidth()/$('#containerR').outerHeight(),
        0.01, 4000
    );
    this.camera.position.set( 0, 0, this.h3visualizer_controls.size *2.8 );
    // On window resize : update camera and renderer dom element size
    var that = this;
    window.addEventListener( 'resize',
        function(){
            that.camera.aspect = $('#containerR').outerWidth()/$('#containerR').outerHeight();
            that.camera.updateProjectionMatrix();
            that.renderer.setSize( $('#containerR').outerWidth(), $('#containerR').outerHeight());
        }, 
        false
    );
    // We add controls to cameras
    this.cameraControls = new THREE.OrbitAndPanControls(
        this.camera, this.renderer.domElement
    );
    this.cameraControls.target.set( 0,0,0 );
    // We add the driver to the camera
    this.cameraDriver = new MY.CameraDriver(this.camera);
};

MY.setupScene = function(){
    // Create the Scene
    console.log("in setupScene");
    this.scene = new THREE.Scene(); 
    
    this.h3visualizer = new H3VIS.H3Visualizer({
        size    : this.h3visualizer_controls.size, 
        histogram: this.histogram,
        mode    :   this.h3visualizer_controls.mode,
        wireframe   :   this.h3visualizer_controls.wireframe,
        show_cube_frame   :   this.h3visualizer_controls.show_cube_frame,
        threshold   :   this.h3visualizer_controls.threshold,
        opacity_factor  :   this.h3visualizer_controls.opacity_factor,
        size_factor  :   this.h3visualizer_controls.opacity_factor
        
    });
    this.h3visualizer.build(this.scene);

};
