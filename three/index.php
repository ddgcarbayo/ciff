<? require(__DIR__.'/../inc/head.php')?>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r67/three.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js"></script>
    <script src="/three/map3d.js"></script>
    <div id="demo">
        <div class="pull-left">
            <div class="btn-group-vertical">
                <button type="button" class="btn btn-warning" onclick="showGDP()">GDP (per capita)</button>
                <button type="button" class="btn btn-warning" onclick="showDebt()">Public debt (per capita)</button>
                <br/>
                <button type="button" class="btn btn-warning" onclick="stopCamera()">STOP</button>
                <button type="button" class="btn btn-warning" onclick="playCamera()">PLAY</button>
            </div>
        </div>
    </div>
    <!-- Se encarga de dar la textura a la bola del mundo-->
    <script type="x-shader" id="sem-vs">
        varying vec2 vN;
        void main() {
            vec4 p = vec4( position, 1. );
            vec3 e = normalize( vec3( modelViewMatrix * p ) );
            vec3 n = normalize( normalMatrix * normal );
            vec3 r = reflect( e, n );
            float m = 2. * length( vec3( r.xy, r.z + 1. ) );
            vN = r.xy / m + .5;
            gl_Position = projectionMatrix * modelViewMatrix * p;
        }
    </script>

    <script type="x-shader" id="sem-fs">
        uniform sampler2D tMatCap;
        varying vec2 vN;
        void main() {
            vec3 base = texture2D( tMatCap, vN ).rgb;
            gl_FragColor = vec4( base, 1. );
        }
    </script>
    <!-- *************************FIN TEXTURA****************** -->

    <script>
        function makeEnvMapMaterial(file) {
            var material = new THREE.ShaderMaterial({
                uniforms: {
                    tMatCap: {
                        type: 't',
                        value: THREE.ImageUtils.loadTexture( file )
                    }
                },
                vertexShader: document.getElementById( "sem-vs" ).textContent,
                fragmentShader: document.getElementById( "sem-fs" ).textContent,
                shading: THREE.SmoothShading
            });

            material.uniforms.tMatCap.value.wrapS = material.uniforms.tMatCap.value.wrapT = THREE.ClampToEdgeWrapping;
            return material;
        }

        function demo(data) {

            var animation;
            var animationPlayed = true;

            var scene = new THREE.Scene();

            var camera = new THREE.PerspectiveCamera();
            camera.position.set(0, 400, 700);
            camera.lookAt(scene.position);
            scene.add(camera);

            var renderer, gold, blue, radius;

            try {
                renderer = new THREE.WebGLRenderer( { /* clearColor: 0xff0000, clearAlpha: 1, */ alpha: true } );
                gold = makeEnvMapMaterial("/three/gold.jpg");
                blue = makeEnvMapMaterial("/three/blue.jpg");
                radius = 0.995;

            } catch (noWebGL) {
                renderer = new THREE.CanvasRenderer();
                gold = new THREE.MeshLambertMaterial ({ color : 0xffaa50, shading : THREE.FlatShading });
                blue = new THREE.MeshLambertMaterial ({ color : 0x50aaff, shading : THREE.FlatShading });
                radius = 0.9; // smaller radius makes the sorting less atrocious

                var light = new THREE.DirectionalLight (0xffffff);
                light.position.set (0, 0, 1);
                scene.add (light); // materials are solid black without the light
            }

            //renderer.setClearColorHex( 0x000000, 1 );
            renderer.setClearColor( 0x000000, 0 ); // the default
            document.getElementById('demo').appendChild(renderer.domElement);

            var globe = new THREE.Object3D ();
            globe.scale.set (250, 250, 250);
            scene.add (globe);

            var geometry = new THREE.SphereGeometry(radius, 30, 15);
            globe.add (new THREE.Mesh (geometry, blue));

            for (var name in data) {
                geometry = new Map3DGeometry (data[name], 0);
                globe.add (data[name].mesh = new THREE.Mesh (geometry, gold));
            }

            showGDP = function () {
                for (var name in data) {
                    var scale = (1 + 7e-6 * ( data[name].data.gdp || 0 ) );
                    TweenLite.to(data[name].mesh.scale, 0.5, { x : scale, y : scale, z : scale });
                }
            };

            showDebt = function () {
                for (var name in data) {
                    var scale = (1 + 7e-6 * ( data[name].data.gdp || 0 ) * ( data[name].data.debt || 0 ) / 100);
                    TweenLite.to(data[name].mesh.scale, 0.5, { x : scale, y : scale, z : scale });
                }
            };

            stopCamera = function(){
                if(animationPlayed){
                    animationPlayed = false;
                    cancelAnimationFrame(animation);
                }
            };

            playCamera = function(){
                if(!animationPlayed){
                    animationPlayed = true;
                    render();
                }
            };

            var resize = function () {
                //var w = renderer.domElement.parentElement.clientWidth;
                //var h = renderer.domElement.parentElement.clientHeight;
                var w = 700;
                var h = 500;

                // notify the renderer of the size change
                renderer.setSize(w, h);

                // update the camera
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            };

            var render = function () {
                animation = requestAnimationFrame (render);
                globe.rotation.y += 0.01;
                renderer.render (scene, camera);
            };

            window.addEventListener('resize', resize, false);
            window.addEventListener('DOMMouseScroll', mousewheel, false);
            window.addEventListener('mousewheel', mousewheel, false);

            function mousewheel(event) {

                if(animationPlayed){
                    var fovMAX = 80;
                    var fovMIN = 40;

                    camera.fov -= event.wheelDeltaY * 0.05;
                    camera.fov = Math.max( Math.min( camera.fov, fovMAX ), fovMIN );
                    camera.projectionMatrix = new THREE.Matrix4().makePerspective(camera.fov, 700 / 500, camera.near, camera.far);
                }
            }

            resize();
            render();
        }
    </script>
    <script src="/three/data.js"></script>
<? require(__DIR__.'/../inc/footer.php')?>