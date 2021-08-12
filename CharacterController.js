var CAMERA_ROTATION_ANGLE = 0;
var CAMERA_SIDES_ANGLE = 0;
var CAMERA_ROTATION_N = 1;
var CAMERA_SIDES_N = 1;
var USE_SOMETHING = {};
	USE_SOMETHING.func = "";
	USE_SOMETHING.params;


function CC_PlayerQuestInput() {

}

function CC_SubtitleControl(text, hideTime) {
	var SUBTITLE_ELEMENT = document.getElementById("subtitles_element").getElementsByTagName("div")[0];
	if (hideTime==undefined || hideTime=="" || hideTime==null) { hideTime=0; }
		hideTime=hideTime*1000;
	SUBTITLE_ELEMENT.innerHTML = text;
	setTimeout(function(){
		SUBTITLE_ELEMENT.innerHTML = "";
	}, hideTime);
}

function CC_SubtitlesChain(_arr_) {
	var a = 0;
	function CallSubNext(sec) {
		setTimeout(function(){
			a++;
			CallSub();
		}, sec*1000);
	}
	function CallSub() {
		CC_SubtitleControl(_arr_[a][0], _arr_[a][1]);
		try { NextVal = _arr_[a+1][0]; } catch(no) { NextVal=undefined; }
		if (NextVal!=undefined && NextVal!=null && NextVal!="") {
			CallSubNext(_arr_[a][1]);
		}
		if (_arr_[a][2]!=undefined && _arr_[a][2]!=null && _arr_[a][2]!="") {
			window[_arr_[a][2]](_arr_[a][3]);
		}
	}
	CallSub();
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


function CC_ExitOrActivatePointerLock(condition) {
	if (condition==true) {	
        GLOBAL_PARAM.canvas.requestPointerLock = GLOBAL_PARAM.canvas.requestPointerLock || GLOBAL_PARAM.canvas.msRequestPointerLock || GLOBAL_PARAM.canvas.mozRequestPointerLock || GLOBAL_PARAM.canvas.webkitRequestPointerLock;
            GLOBAL_PARAM.canvas.requestPointerLock();
	} else {
		document.exitPointerLock();
	}
}


function CC_OpenCloseMenu(menu_id) {
	var MenuDOM = document.getElementById(menu_id);
	var Status = MenuDOM.getAttribute("opened");
	var setStyle = "";
	if (Status=="closed") {		//Opening menu
		MenuDOM.classList.remove("hidden");
		MenuDOM.setAttribute("opened", "opened");
		MenuDOM.style.display = setStyle;
		CC_ExitOrActivatePointerLock();
	} else {					//Closing menu
		setStyle = "none";
		MenuDOM.classList.add("hidden");
		MenuDOM.setAttribute("opened", "closed");
		setTimeout(function(){	MenuDOM.style.display = setStyle;	}, 300);
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
    camera.rotation = new BABYLON.Vector3(0, 0, 0);
    GLOBAL_PARAM.camera = camera;
    //camera.maxZ = GLOBAL_PARAM.maxZ;

//MyRayCast
	var MyRay = BABYLON.Mesh.CreateBox("box", 3.0, scene);
        MyRay.position = new BABYLON.Vector3(0, -0.1, 8);
        MyRay.rotation = new BABYLON.Vector3(0, 0, 0);
        MyRay.scaling = new BABYLON.Vector3(0.02, 0.02, 5);
        MyRay.isVisible = false;
        MyRay.parent = camera;
        	GLOBAL_PARAM.MyRay = MyRay;


//Hero

   var hero = BABYLON.Mesh.CreateSphere('hero', 3, 4, false, BABYLON.Mesh.FRONTSIDE);
   	GLOBAL_PARAM.hero = hero;
    EVENTS_COLLECTION.push({
            "toucher" : GLOBAL_PARAM.hero,
            "touchElements": []
        });
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
    var PressEcape = false;
    
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

            case 81: // q
            	PressEcape = true;
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

            case 81: // q
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
			if (GLOBAL_PARAM.ControlDisabled==false) {
				CameraShaking(camera);
			}
		}

        if (moveForward && GLOBAL_PARAM.ControlDisabled==false) {
            f_speed = SPEED;
        }
        if (moveBackward && GLOBAL_PARAM.ControlDisabled==false) {
            f_speed = -SPEED;
        }

        if (moveRight && GLOBAL_PARAM.ControlDisabled==false) {
            s_speed = SPEED;
        }

        if (moveLeft && GLOBAL_PARAM.ControlDisabled==false) {
            s_speed = -SPEED;
        }

        if (PressEcape) {
		    moveForward = false;
		    moveBackward = false;
		    moveRight = false;
		    moveLeft = false;
		    PressEcape = false;
        	//CC_OpenCloseMenu("MENU_HUD");
        	GAMEEVENTS_DisableToucher(false);
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
    var isLocked = GLOBAL_PARAM.cursor_locked;
    
    // On click event, request pointer lock
    scene.onPointerDown = function (evt) {
        if (!GLOBAL_PARAM.cursor_locked) {
            CC_ExitOrActivatePointerLock(true);
        }
    };
    

    var pointerlockchange = function () {
        var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
        
        // If the user is already locked
        if (!controlEnabled) {
            //camera.detachControl(canvas);
            GLOBAL_PARAM.cursor_locked = false;
        } else {
            //camera.attachControl(canvas);
            GLOBAL_PARAM.cursor_locked = true;
        }
    };
    
    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    return camera;
}