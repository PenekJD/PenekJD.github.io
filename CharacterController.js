var CAMERA_ROTATION_ANGLE = 0;
var CAMERA_SIDES_ANGLE = 0;
var CAMERA_ROTATION_N = 1;
var CAMERA_SIDES_N = 1;
var USE_SOMETHING = {};
	USE_SOMETHING.func = "";
	USE_SOMETHING.params;

function CC_SubtitleControl(text, hideTime) {
	var SUBTITLE_ELEMENT = document.getElementById("subtitles_element").getElementsByTagName("div")[0];
	if (hideTime==undefined || hideTime=="" || hideTime==null) { hideTime=0; }
		hideTime=hideTime*1000;
	SUBTITLE_ELEMENT.innerHTML = text;
	setTimeout(function(){
		SUBTITLE_ELEMENT.innerHTML = "";
	}, hideTime);
}

function CC_TargetTitleControl(text) {
	var SUBTITLE_ELEMENT = document.getElementById("targettitle_element").getElementsByTagName("div")[0];
	SUBTITLE_ELEMENT.innerHTML = text;
	if (text==undefined || text==null || text=="") {
		SUBTITLE_ELEMENT.innerHTML = "";
	}

}

function CC_CROSSHAIR_CONTROL(catchType, helpText, actionFunc, params) {
	var Crosshair = document.getElementById("crosshair_element").getElementsByTagName("div")[0];
		Crosshair.style.backgroundPosition="";
	if (catchType=="catched") {
		Crosshair.style.backgroundPosition="100%";
	}

	if (actionFunc!="" && actionFunc!=null && actionFunc!=undefined) {
		USE_SOMETHING.func = actionFunc;
		USE_SOMETHING.params = params;
	} else {
		USE_SOMETHING.func = "";
		USE_SOMETHING.params = "";
	}

	CC_TargetTitleControl(helpText);
}

function CC_USE_GAME_ELEMENT(params) {
	if (USE_SOMETHING.func!="" && USE_SOMETHING.func!=undefined && USE_SOMETHING.func!=null) {
		window[USE_SOMETHING.func](USE_SOMETHING.params);
	}
}


function CController(canvas, scene) {

	function CameraShaking(camera) {
		let Force = 0.1;
		let N_pluser = 0.02;
		if (CAMERA_ROTATION_ANGLE>Force && CAMERA_ROTATION_N==1) { CAMERA_ROTATION_N = -1; }
		if (CAMERA_ROTATION_ANGLE<Force*(-1) && CAMERA_ROTATION_N==-1) { CAMERA_ROTATION_N = 1; }
		CAMERA_ROTATION_ANGLE+=N_pluser*CAMERA_ROTATION_N;

		if (CAMERA_SIDES_ANGLE>Force*2 && CAMERA_SIDES_N==1) { CAMERA_SIDES_N = -1; }
		if (CAMERA_SIDES_ANGLE<Force*(-2) && CAMERA_SIDES_N==-1) { CAMERA_SIDES_N = 1; }
		CAMERA_SIDES_ANGLE+=N_pluser*CAMERA_SIDES_N;

		camera.position.y = camera.position.y+CAMERA_ROTATION_ANGLE;
		camera.position.z = camera.position.z+CAMERA_SIDES_ANGLE;
		camera.position.x = camera.position.x+CAMERA_SIDES_ANGLE;
	}

//Scene
    scene.gravity = new BABYLON.Vector3(0, -3, 0);
    scene.collisionEnabled = true;
    scene.enablePhysics();

   	//Actions for game-use-elements
	scene.actionManager = new BABYLON.ActionManager(scene);
	scene.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(
	        {
	            trigger: BABYLON.ActionManager.OnKeyDownTrigger, 
	            parameter: "e"
	        }, 
	        function() {	CC_USE_GAME_ELEMENT();	}
		)
	);

//Camera

    // Parameters : name, position, scene
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 25), scene);

    // Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(0, 0, 0);
    camera.checkCollisions = true;
    camera.attachControl(canvas, true); 
    camera.rotation = new BABYLON.Vector3(0, Math.PI/180, Math.PI/180);
    GLOBAL_PARAM.camera = camera;

//MyRayCast
	var MyRay = BABYLON.Mesh.CreateBox("box", 3.0, scene);
        MyRay.position = new BABYLON.Vector3(0, -0.1, 8);
        MyRay.rotation = new BABYLON.Vector3(0, 0, 0);
        MyRay.scaling = new BABYLON.Vector3(0.02, 0.02, 5);
        MyRay.isVisible = false;
        MyRay.parent = camera;
        	GLOBAL_PARAM.MyRay = MyRay;


//Hero

   var hero = BABYLON.Mesh.CreateBox('hero', 4.0, scene, false, BABYLON.Mesh.FRONTSIDE);
   	GLOBAL_PARAM.hero = hero;
    hero.position.x = 0.0;
    hero.position.y = 100.0;
    hero.position.z = 0.0;
    hero.isVisible = false;
    hero.physicsImpostor = new BABYLON.PhysicsImpostor(hero, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 1.0, friction: 0.1 }, scene);     
    // hero.physicsImpostor.physicsBody.fixedRotation = true;
    // hero.physicsImpostor.physicsBody.updateMassProperties();


    var moveForward = false;
    var moveBackward = false;
    var moveRight = false;
    var moveLeft = false;
    
    var onKeyDown = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true; break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                break;
        }
    };

    var onKeyUp = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // a
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    
    
    scene.registerBeforeRender(function () {   

        camera.position.x = hero.position.x;
        camera.position.y = hero.position.y+2;
        camera.position.z = hero.position.z;
        
        var forward = camera.getTarget().subtract(camera.position).normalize();
        forward.y = 0;
        var right = BABYLON.Vector3.Cross(forward, camera.upVector).normalize();
        right.y = 0;
        
        var SPEED = 22;
        let f_speed = 0;
        var s_speed = 0;
        var u_speed = 12;

		if (moveForward || moveBackward || moveRight || moveLeft) {
			CameraShaking(camera);
		}

        if (moveForward) {
            f_speed = SPEED;
        }
        if (moveBackward) {
            f_speed = -SPEED;
        }

        if (moveRight) {
            s_speed = SPEED;
        }

        if (moveLeft) {
            s_speed = -SPEED;
        }
        
        var move = (forward.scale(f_speed)).subtract((right.scale(s_speed))).subtract(camera.upVector.scale(u_speed));
        
        hero.physicsImpostor.physicsBody.velocity.x = move.x;
        hero.physicsImpostor.physicsBody.velocity.z = move.z;
        hero.physicsImpostor.physicsBody.velocity.y = move.y;
    });

   //Jump
   /*
    function jump(){
      hero.physicsImpostor.applyImpulse(new BABYLON.Vector3(1, 2000, -1), hero.getAbsolutePosition());
    }

    document.body.onkeydown = function(e){
      if(e.keyCode == 32){
        //your code
        setTimeout(jump(), 50); 
      }
    }*/


    //Mouse
    //We start without being locked.
    var isLocked = false;
    
    // On click event, request pointer lock
    scene.onPointerDown = function (evt) {
        if (!isLocked) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }
    };
    

    var pointerlockchange = function () {
        var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
        
        // If the user is already locked
        if (!controlEnabled) {
            //camera.detachControl(canvas);
            isLocked = false;
        } else {
            //camera.attachControl(canvas);
            isLocked = true;
        }
    };
    
    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    return camera;
}





//PublicGameFunctions

function CC_HelloEmenet(arg) {
	CC_SubtitleControl(arg[1], 5);
}

function CC_Snitch(arg) {
	var HideModel = arg[0];

    //Create a scaling animation at 30 FPS
    var animationBox = new BABYLON.Animation("tutoAnimation", "position.y", 10, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({
        frame: 0,
        value: -100
    });
    animationBox.setKeys(keys);
    HideModel.animations.push(animationBox);
	var anim = GLOBAL_PARAM.scene.beginAnimation(HideModel, 0, 100, false);

	CC_SubtitleControl(arg[1], 5);
}

function CC_SpinDatBitch(arg) {
	var Model = arg[0];
    //Create a scaling animation at 30 FPS
    var keys = [];
    	keys.push({ frame: 0, value: Math.PI/180 });
    	keys.push({ frame: 0, value: Math.PI/180 });
    	keys.push({ frame: 100, value: Math.PI/180*360 });
    var animationRot = new BABYLON.Animation(
    	"tutoAnimation", 
    	"rotation.y",
    	10,
    	BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    	BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    var keysPos = [];
    	keysPos.push({ frame: 0, value: new BABYLON.Vector3(Model.position.x*(-1), Model.position.y, Model.position.z) });
    var animationPosition = new BABYLON.Animation(
    	"position", 
    	"position",
    	1,
    	BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    	BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
	animationRot.setKeys(keys);
	animationPosition.setKeys(keysPos);
    Model.animations.push(animationRot);
    Model.animations.push(animationPosition);
	var anim = GLOBAL_PARAM.scene.beginAnimation(Model, 0, 100, true);

}

function CC_GameStartChain() {
	var MonologChain = [];
		MonologChain.push(["<span><sam>Sam:</sam> Hello, stranger!</span>", 3]);
		MonologChain.push(["<span><sam>Sam:</sam> Welcome to Sam4ever World...</span>", 4]);
		MonologChain.push(["<span><sam>Sam:</sam> Big quest is coming!</span>", 4]);
		MonologChain.push(["<span><sam>Sam:</sam> Comeback later. You'll love it!</span>", 4]);

		var a = 0;
		function CallSubNext(sec) {
			setTimeout(function(){
				a++;
				CallSub();
			}, sec*1000);
		}
		function CallSub() {
			CC_SubtitleControl(MonologChain[a][0], MonologChain[a][1]);
			try { NextVal = MonologChain[a+1][0]; } catch(no) { NextVal=undefined; }
			if (NextVal!=undefined && NextVal!=null && NextVal!="") {
				CallSubNext(MonologChain[a][1]);
			}
		}
		CallSub();
}