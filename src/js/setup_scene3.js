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
