// cube

define(['cosa'], function(cosa){

    Cube = function(spec){
        // Validate spec
        var spec = spec !== undefined ? spec : {};
        this.size = typeof spec.size === "number" && spec.size ? spec.size : 2;
    
        // Extend Cosa
        cosa.Cosa.call(this, spec);
        
        // Children
        this.children = {
            //cloud   :   new H3VIS.Cloud(this)
        };
    
        //Position children
        //var that = this;
        //this.children.cloud.setPos3D = function(position_3d){
        //};
    };
     
    Cube.prototype = Object.create( cosa.Cosa.prototype );

    Cube.prototype.paint = function(object_3d){
        var o = object_3d;
    
        var light = new THREE.HemisphereLight(0x777777,0x222222);
        var light2 = new THREE.DirectionalLight(0xffffff);
        light2.position.set(1,1,1);
        o.add(light);
        o.add(light2);

        var geometry = new THREE.CubeGeometry(this.size,this.size,this.size,1,1,1);

        var cube = new THREE.Mesh(
            geometry,
            new THREE.MeshLambertMaterial({
                color   :   new THREE.Color().setRGB(1,0,0)
            })
        );

        o.add(cube);
    };

    
    return {
        Cube  :   Cube
    };
});

