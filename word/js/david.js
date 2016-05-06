(function() {

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEl);
        return;
    }

    function getPosition(lat, lng, alt){

        var pos = {};

        pos.y = (lat / 90) * (earthHeight / 2);
        pos.x = (lng / 180) * (earthWidth / 2);
        pos.z = alt;


        return pos;
    }

    function createScene(){
        // create the scene
        var scene = new THREE.Scene();

        return scene
    }

    function createEarth(width, height) {
        return new THREE.Mesh(new THREE.PlaneGeometry( width, height )
                , new THREE.MeshPhongMaterial({
                    map : THREE.ImageUtils.loadTexture('images/water_4k.png')
                }));
    }

    function createBackgroundLight(){
        return new THREE.AmbientLight( 0x222222); // soft white light
    }


    function startLight(lat, lng, lifeTime){
        var pos = getPosition(lat,lng,0);
        createMesh(lifeTime,pos);
    }

    function render() {
        var timeNow = new Date().getTime();
        var len = puntos.length;
        while(len-- > 0){
            var punto = puntos[len];
            if(timeNow > punto.fin){
                group.remove(punto);
                puntos.splice(len,1);
            }
        }

        requestAnimationFrame(render);

        renderer.render(scene, camera);
    }

    function createMesh(duracion,pos) {
        var time = new Date().getTime();

        var material = new THREE.MeshBasicMaterial({
            color : 0x00ECFF ,
            map : THREE.ImageUtils.loadTexture( "images/spark.png" )
        });
        //
        //var material = new THREE.MeshPhongMaterial({
        //	//specular: 0x00ECFF,
        //	// intermediate
        //	//color: 0xFFFFFF,
        //	// dark
        //	emissive: 0x00ECFF,
        //	//metal : true,
        //	shininess: 35,
        //	map : THREE.ImageUtils.loadTexture( "images/spark.png" )
        //});

        var radius = 0.015;
        var segments = 10;

        var circleGeometry = new THREE.CircleGeometry( radius, segments );
        var mash = new THREE.Mesh( circleGeometry, material );
        mash.position.x = pos.x;
        mash.position.y = pos.y;
        mash.position.z = pos.z;
        mash.fin = time+duracion;
        group.add(mash);
        puntos.push(mash);
    }


    var width = window.innerWidth;
    var height = window.innerHeight;
    var earthWidth = 4;
    var earthHeight = 2;
    var puntos = [];
    var luces = [];
    var group = new THREE.Object3D();
    var scene = createScene();
    scene.add(group);
    var earth = createEarth(earthWidth, earthHeight);
    scene.add(earth);
    var light = createBackgroundLight();
    scene.add(light);
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.z = 2;
    camera.position.y = 0;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    var webglEl = document.getElementById('webgl');
    webglEl.appendChild(renderer.domElement);

    var socket = io();

    socket.on('loc', function(coord) {
        coord = JSON.parse(coord);
        startLight(coord.lat, coord.lng, 10000);
    });

    render();

}());