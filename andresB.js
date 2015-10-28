var camera, scene, renderer; //every three.js project needs a camera, scene, renderer
var container, controls, stats;

var object1, object2, object3, object4; //variable to hold our objects

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var camAspectRatio = window.innerWidth / window.innerHeight;

var audio; //global variable to hold background audio
var domEvents;
var bgVolHigh = 0.8;  //variables to hold various audio levels
var bgVolMed = 0.4;
var bgVolLow = 0.2;
// var objectSoundPlaying = false;

backgroundSound();
init();
animate();


//----------------------------------------------------------------------------------------

function backgroundSound(){
  audio = document.createElement('audio');
  audio.src = 'sound/soundtrack.mp3';
  audio.play();
  audio.loop = true;
  audio.volume = bgVolHigh;
   console.log(audio.volume);
   
}


function init() {

  //NEW SCENE
  scene = new THREE.Scene();
        
  //RENDERER
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  //PERSPECTIVE CAMERA
  camera = new THREE.PerspectiveCamera( 45, camAspectRatio, 1, 2000);
  camera.position.set(0,100,200);
  // camera.position.z = 200;
  scene.add(camera);

  //CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0, 0);
  controls.maxDistance = 500;

  //LIGHTING
  var ambient = new THREE.AmbientLight( 0x444444 );
  scene.add( ambient );  

  var directionalLight = new THREE.DirectionalLight( 0xffeedd );
  directionalLight.position.set( 0, 0, 1 ).normalize();
  scene.add( directionalLight );

  // //GROUND JUST SO WE CAN SEE WHAT WE ARE DOING
  // var ground = new THREE.Mesh( new THREE.PlaneGeometry(400, 400, 10, 10), new THREE.MeshLambertMaterial({color:0xFFFFFF}) );
  // ground.receiveShadow = true;
  // ground.position.set(0, 0, 0);
  // ground.rotation.x = -Math.PI / 2;
  // this.scene.add(ground);

  //INIT DOM EVENTS
  domEvents = new THREEx.DomEvents(camera, renderer.domElement);

  //ADD MODEL
  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

  var onError = function ( xhr ) {
   };

  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );


  //LOAD OBJECT 1 - TROLL
  var loader1 = new THREE.OBJMTLLoader();
  loader1.load( 'obj/object1_final2.obj', 'obj/object1_final2.mtl', function ( object ) {
          object1 = object;
          object1.position.x = 0;
          object1.position.y = 70;
          object1.position.z = 0;
          object1.scale.set(10, 10, 10);
          // object.position.y = - 80;
          object1.rotation.x = 100;
          object1.rotation.y = 3;
          object1.rotation.z = 10;
          scene.add(object1);

          //OBJECT 1 - add an event listener to object1 for click
          var mesh = object1.children[0];

          domEvents.addEventListener(mesh, 'mouseover', function(event){ //lower the music on mouseover
            audio.volume = bgVolMed;
                }, false);

          // domEvents.addEventListener(mesh, 'mouseout', function(event){ //lower the music on mouseover
          //   audio.volume = .75;
          //       }, false);

          var obj1_audio = document.createElement('audio');
          domEvents.addEventListener(mesh, 'click', function(event){
            console.log('hey, I\'m object 1, the troll figurine');
            
            obj1_audio.src = 'sound/sound_object1.mp3';
            obj1_audio.play();
            obj1_audio.volume = 1;
            audio.volume = bgVolLow;
            // objectSoundPlaying = true;

            // //if obj 1 audio is playing, lower the background music
            // if (obj1_audio.volume.duration > 0 && !obj1_audio.volume.paused) { 
            //   audio.volume = .2;
            // }
  
            
           }, false);

  }, onProgress, onError );



  //LOAD OBJECT 2 - LIGHTER
  var loader2 = new THREE.OBJMTLLoader();
  loader2.load( 'obj/object4_final.obj', 'obj/object4_final.mtl', function ( object ) {
          object2 = object;
          object2.position.x = -105;
          object2.position.y = 85;
          object2.position.z = 60;
          object2.scale.set(4, 4, 4);
    
          object2.rotation.x = 100;
          object2.rotation.y = 3;
          object2.rotation.z = 10;
          scene.add(object2);

          //OBJECT 2 - add an event listener to object1 for click
          var mesh = object2.children[0];

          domEvents.addEventListener(mesh, 'mouseover', function(event){ //lower the music on mouseover
            audio.volume = bgVolMed;
                }, false);

          // domEvents.addEventListener(mesh, 'mouseout', function(event){ //lower the music on mouseover
          //   audio.volume = .75;
          //       }, false);

          var obj2_audio = document.createElement('audio');
          domEvents.addEventListener(mesh, 'click', function(event){
            console.log('hey, I\'m object 2, the zippo lighter');
            obj2_audio.src = 'sound/sound_object2.mp3';
            obj2_audio.play();
            obj2_audio.volume = 1;
            audio.volume = bgVolLow;

            // object1.visible = false;
                }, false);

        }, onProgress, onError );



  //LOAD OBJECT 3 - SKULL
  var loader3 = new THREE.OBJMTLLoader();
  loader3.load( 'obj/object3_skull_final3.obj', 'obj/object3_skull_final3.mtl', function ( object ) {
          object3 = object;
          object3.position.x = 20;
          object3.position.y = -10;
          object3.position.z = 0;
          object3.scale.set(10, 10, 10);
    
          object3.rotation.x = 0;
          object3.rotation.y = 0;
          object3.rotation.z = 0;
          scene.add(object3);

          //OBJECT 3 - add an event listener to object for click
          var mesh = object3.children[0];

          domEvents.addEventListener(mesh, 'mouseover', function(event){ //lower the music on mouseover
            audio.volume = bgVolMed;
                }, false);

          // domEvents.addEventListener(mesh, 'mouseout', function(event){ //lower the music on mouseover
          //   audio.volume = .75;
          //       }, false);

          var obj3_audio = document.createElement('audio');
          domEvents.addEventListener(mesh, 'click', function(event){
            console.log('hey, I\'m object 3, the skull statue');
            obj3_audio.src = 'sound/sound_object3.mp3';
            obj3_audio.play();
            obj3_audio.volume = 1;
            audio.volume = bgVolLow;
                }, false)

        }, onProgress, onError );


  //LOAD OBJECT 4 - PAINTING
  var loader4 = new THREE.OBJMTLLoader();
  loader4.load( 'obj/object5_final.obj', 'obj/object5_final.mtl', function ( object ) {
          object4 = object;
          object4.position.x = 100;
          object4.position.y = -20;
          object4.position.z = 0;
          object4.scale.set(6, 6, 6);
    
          object4.rotation.x = 0;
          object4.rotation.y = 0;
          object4.rotation.z = 0;
          scene.add(object4);

          //OBJECT 4 - add an event listener to object for click
          var mesh = object4.children[0];

          domEvents.addEventListener(mesh, 'mouseover', function(event){ //lower the music on mouseover
            audio.volume = bgVolMed;
                }, false);

          // domEvents.addEventListener(mesh, 'mouseout', function(event){ //lower the music on mouseover
          //   audio.volume = .75;
          //       }, false);

          var obj4_audio = document.createElement('audio');
          domEvents.addEventListener(mesh, 'click', function(event){
            console.log('hey, I\'m object 4, the painting');
            obj4_audio.src = 'sound/sound_object4.mp3';
            obj4_audio.play();
            obj4_audio.volume = 1;
            audio.volume = bgVolLow;
                }, false)
        }, onProgress, onError );

        
 
   //WHEN YOU RESIZE THE WINDOW adjust everything (camera and renderer)
   THREEx.WindowResize(renderer, camera);


}

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;
}


function animate() {
  requestAnimationFrame( animate );
  controls.update();

  // var rotSpeed = 0.001;
  // if (object1) { 
  //       object1.rotation.z-= rotSpeed;
  //   }

  //  if (object3) { 
  //       object3.rotation.z-= rotSpeed;
  //   }
  renderer.render( scene, camera );
}



