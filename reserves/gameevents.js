

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
	        	CC_CROSSHAIR_CONTROL('catched', HelpText, callFunc, arg);
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
	        function() {	CC_CROSSHAIR_CONTROL('');	}
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
			GAMEEVENTS_AttachHoverEvents(toucher, touchElement, GLOBAL_PARAM.scene, HelpText, callFunc, arg);
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
        let box2 = BABYLON.Mesh.CreateBox("box", 2.0, scene);
            box2.rotation = ModelMesh.rotation;
            box2.scaling = ModelMesh.scaling;
                box2.scaling.y = box2.scaling.y*2;
            box2.position = ModelMesh.position;
                box2.position.x = ModelMesh.position.x*(-1);
                box2.position.y+=box2.scaling.y/2
            //box.rotation = ModelMesh.rotation;
            //box.scaling = ModelMesh.scaling;
            box2.checkCollisions = true;
            box2.isVisible = false;
            box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.05, friction:0.05 }, scene);
    }
}