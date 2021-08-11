function GAMEEVENTS_DisableToucher(condition) {
	CC_CROSSHAIR_CONTROL('');
	GLOBAL_PARAM.ControlDisabled = condition;
}

function GAMEEVENTS_AttachTouchFieldsEvents(toucher, touchElement, scene, HelpText, callFunc, arg) {
	if (toucher.actionManager==undefined || toucher.actionManager==null || toucher.actionManager=="") {
		toucher.actionManager = new BABYLON.ActionManager(scene);
	}
    toucher.actionManager.registerAction(
	    new BABYLON.ExecuteCodeAction(	//InterpolateValueAction
	        {
	            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
	            parameter: { 
	                mesh: touchElement, 
	                usePreciseIntersection: true
	            }
	        }, 
	        function() {
	        	window[callFunc](arg);
	        }
	    )
	);
	toucher.actionManager.registerAction(
	    new BABYLON.ExecuteCodeAction(
	        {
	            trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, 
	            parameter: { 
	                mesh: touchElement, 
	                usePreciseIntersection: true
	            }
	        }, 
	        function() {	
	        	
	        }
	    )
	);
}

function GAMEEVENTS_AttachHoverEvents(toucher, touchElement, scene, HelpText, callFunc, arg) {
	if (toucher.actionManager==undefined || toucher.actionManager==null || toucher.actionManager=="") {
		toucher.actionManager = new BABYLON.ActionManager(scene);
	}
    toucher.actionManager.registerAction(
	    new BABYLON.ExecuteCodeAction(	//InterpolateValueAction
	        {
	            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
	            parameter: { 
	                mesh: touchElement, 
	                usePreciseIntersection: true
	            }
	        }, 
	        function() {	
	        	if (GLOBAL_PARAM.ControlDisabled==false) { 
	        		CC_CROSSHAIR_CONTROL('catched', HelpText, callFunc, arg);
	        	}
	        }
	    )
	);
	toucher.actionManager.registerAction(
	    new BABYLON.ExecuteCodeAction(
	        {
	            trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, 
	            parameter: { 
	                mesh: touchElement, 
	                usePreciseIntersection: true
	            }
	        }, 
	        function() {	
	        	if (GLOBAL_PARAM.ControlDisabled==false) { CC_CROSSHAIR_CONTROL(''); }
	        }
	    )
	);
}

function GAMEEVENTS_StartAttaching() { 
	for (a=0; a<EVENTS_COLLECTION.length; a++) {
		var toucher = EVENTS_COLLECTION[a].toucher; 
		for (b=0; b<EVENTS_COLLECTION[a].touchElements.length; b++) {
			var touchElement = EVENTS_COLLECTION[a].touchElements[b].obj;
			var HelpText = EVENTS_COLLECTION[a].touchElements[b].helpText;
			var callFunc = EVENTS_COLLECTION[a].touchElements[b].callFunc;
			var arg = EVENTS_COLLECTION[a].touchElements[b].arg;
			if (a==0) {	//Only for crosshair (first toucher)
				GAMEEVENTS_AttachHoverEvents(toucher, touchElement, GLOBAL_PARAM.scene, HelpText, callFunc, arg);
			} else {
				GAMEEVENTS_AttachTouchFieldsEvents(toucher, touchElement, GLOBAL_PARAM.scene, HelpText, callFunc, arg);
			}
		}
	}
}

function GAMEEVENTS_Collisions(scene) {
	for (let a=0; a<PHYSICS_COLLISIONS.length; a++) { 
        let COL_ELEMENT = PHYSICS_COLLISIONS[a];	
        COL_ELEMENT.physicsImpostor = new BABYLON.PhysicsImpostor(COL_ELEMENT, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.05, friction:0.05 }, scene);
    }
    for (let a=0; a<MODELS_COLLISION.length; a++) {
        let ModelMesh = MODELS_COLLISION[a];
        
        let box = BABYLON.Mesh.CreateBox("box", 2.0, scene);
            box.rotation = ModelMesh.rotation;
            box.scaling = ModelMesh.scaling;
                box.scaling.y = box.scaling.y*2;
            box.position = ModelMesh.position;
                box.position.x = ModelMesh.position.x*(-1);
                box.position.y+=box.scaling.y/2
            //box.rotation = ModelMesh.rotation;
            //box.scaling = ModelMesh.scaling;
            box.checkCollisions = true;
            box.isVisible = false;
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.05, friction:0.05 }, scene);
    }
}