
function MAIN_SceneGenerator(engine, canvas) {

    canvas.width = GLOBAL_PARAM.sWidth;
    canvas.height = GLOBAL_PARAM.sHeight;
	function MaterialsGenerator(scene, vScale, uScale, img, nmap, detail, hasAlpha) {
		let NewMaterial = {};
			NewMaterial = new BABYLON.StandardMaterial("sand", scene);
			NewMaterial.diffuseTexture = new BABYLON.Texture(img, scene);
            NewMaterial.diffuseTexture.vScale = vScale;
            NewMaterial.diffuseTexture.uScale = uScale;
            if (nmap!=undefined && nmap!=null && nmap!="") {
                NewMaterial.bumpTexture = new BABYLON.Texture(nmap, scene);
                NewMaterial.bumpTexture.vScale = NewMaterial.diffuseTexture.vScale;
                NewMaterial.bumpTexture.uScale = NewMaterial.diffuseTexture.uScale;
            }
            if (detail!=undefined && detail!=null && detail!="") {
                NewMaterial.detailMap.texture = new BABYLON.Texture(detail, scene);
                NewMaterial.detailMap.isEnabled = true;
                NewMaterial.detailMap.diffuseBlendLevel = 1; // between 0 and 1
                NewMaterial.detailMap.bumpLevel = 0.5; // between 0 and 1
                NewMaterial.detailMap.roughnessBlendLevel = 1; // between 0 and 1
            }
            if (hasAlpha!=undefined && hasAlpha!=null && hasAlpha!="") {
                NewMaterial.diffuseTexture.hasAlpha = true;
                NewMaterial.backFaceCulling = false;
            }
            NewMaterial.diffuseColor = new BABYLON.Color3(0.85, 0.65, 0.45);
            NewMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            NewMaterial.emissiveColor = new BABYLON.Color3(0.6, 0.6, 0.6);
            NewMaterial.ambientColor = new BABYLON.Color3(0.85, 0.65, 0.45);
		return NewMaterial;
	}



    /*  Отработка сцены    */
    var scene = new BABYLON.Scene(engine);
    	scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        GLOBAL_PARAM.scene = scene;


        CController(canvas, scene);
        camera = GLOBAL_PARAM.camera;


        /*
    var camera = new BABYLON.ArcRotateCamera("Camera", (Math.PI/180)*140, (Math.PI/180)*90, 40, new BABYLON.Vector3(10, 6, -25), scene);
        camera.applyGravity = true;
        camera.ellipsoid = new BABYLON.Vector3(2,2,2);
        camera.checkCollisions = true;  

        scene.activeCamera.attachControl(canvas);*/


/*      
        scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    //console.log("POINTER DOWN");
                    break;
                case BABYLON.PointerEventTypes.POINTERUP:
                    //console.log("POINTER UP");
                    break;
                case BABYLON.PointerEventTypes.POINTERMOVE:
                    //console.log("POINTER MOVE");
                    break;
                case BABYLON.PointerEventTypes.POINTERWHEEL:
                    //console.log("POINTER WHEEL");
                    break;
                case BABYLON.PointerEventTypes.POINTERPICK:
                    //console.log("POINTER PICK");
                    break;
                case BABYLON.PointerEventTypes.POINTERTAP:
                    //console.log("POINTER TAP");

                    break;
                case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
                    //console.log("POINTER DOUBLE-TAP");
                    break;
            }
        });
    */


    var light0 = new BABYLON.PointLight("DirectionalLight", new BABYLON.Vector3(700, 1000, 1000), scene);

    var ground = new BABYLON.Mesh.CreateGround("ground", 500, 500, 1, scene);
    // ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", heightMapPath, width, height, 10, minHeight, maxHeight, scene, false, onReadyCallback);
        ground.material = MaterialsGenerator(scene, 40, 40, "./img/sand_hd.png", "./img/sand_hd_nm.png", "./img/stain.png");
        ground.checkCollisions = true;
        SHADOWS_CONTAINS.push(ground);
        PHYSICS_COLLISIONS.push(ground);

        


    /*  Отработка уровня    */
    
    /*
    var origin = BABYLON.Mesh.CreateSphere("origin", 10, 1.0, scene);
   	var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false);
    var box = BABYLON.Mesh.CreateBox("box", 3.0, scene);
    	box.position = new BABYLON.Vector3(-5, 0, 0); 

    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene, false);
        cylinder.position = new BABYLON.Vector3(5, 0, 0);	
        cylinder.material = MaterialsGenerator(scene, 1, 1, "./img/sand.png");
    */


    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:10000.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./img/skybox2/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        skybox.applyFog = false;


    /*
    BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "Doggy.obj").then((result) => {
        result.meshes[1].position.x = 0;
        myMesh1.rotation.y = Math.PI / 2;
        const myMesh1 = scene.getMeshByName("myMesh_1");
    });


    
    BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "egypt_1.glb").then((result) => {
        result.meshes[1].position.x = 5;
        result.meshes[1].position.z = -200;
        result.meshes[1].scaling = new BABYLON.Vector3(50, 50, 50);
        result.meshes[1].material = MaterialsGenerator(scene, 60, 60, "./img/bricks.png", "./img/bricks_nm.png");
        myMesh1.rotation.y = Math.PI / 2;
        const myMesh2 = scene.getMeshByName("myMesh_2");
    });
    */


    BABYLON.SceneLoader.ImportMeshAsync("", "./models/egypt/", "column.glb").then((result) => {
        result.meshes[1].scaling = new BABYLON.Vector3(6, 6, 6);
        result.meshes[1].rotation = new BABYLON.Vector3(0, 0, 0);
        result.meshes[1].position = new BABYLON.Vector3(20, 0, 20);
        result.meshes[1].material = MaterialsGenerator(scene, 1, 1, "./models/egypt/column.png", "./models/egypt/column_nm.png");
        result.meshes[1].checkCollisions = true;
        SHADOWS_ELEMENTS.push(result.meshes[1]);
        //SHADOWS_CONTAINS.push(result.meshes[1]);
        MODELS_COLLISION.push(result.meshes[1]);

        EVENTS_COLLECTION.push({
            "toucher" : GLOBAL_PARAM.MyRay,
            "touchElements": [{
                "obj": result.meshes[1],
                "helpText" : "Это первая модель",
                "callFunc" : "CC_HelloEmenet",
                "arg": "Привет, крошка..."
            }]
        });
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "./models/egypt/", "column.glb").then((result) => {
        result.meshes[1].scaling = new BABYLON.Vector3(6, 6, 6);
        result.meshes[1].rotation = new BABYLON.Vector3(0, 0, 0);
        result.meshes[1].position = new BABYLON.Vector3(-20, 0, -20);
        result.meshes[1].material = MaterialsGenerator(scene, 1, 1, "./models/egypt/column.png", "./models/egypt/column_nm.png");
        result.meshes[1].checkCollisions = true;
        SHADOWS_ELEMENTS.push(result.meshes[1]);
        //SHADOWS_CONTAINS.push(result.meshes[1]);
        MODELS_COLLISION.push(result.meshes[1]);
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "./models/egypt/", "palm.glb").then((result) => {
        result.meshes[1].scaling = new BABYLON.Vector3(1, 1, 1);
        result.meshes[1].rotation = new BABYLON.Vector3(0, Math.PI/180*90, 0);
        result.meshes[1].position = new BABYLON.Vector3(11, 0, -12);
        result.meshes[1].material = MaterialsGenerator(scene, 1, 1, "./models/egypt/palm.png", undefined, undefined, true);
        result.meshes[1].checkCollisions = true;
        SHADOWS_ELEMENTS.push(result.meshes[1]);
        MODELS_COLLISION.push(result.meshes[1]);
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "./models/egypt/", "palm.glb").then((result) => {
        result.meshes[1].scaling = new BABYLON.Vector3(0.8, 0.8, 0.8);
        result.meshes[1].rotation = new BABYLON.Vector3(0, Math.PI/180*200, 0);
        result.meshes[1].position = new BABYLON.Vector3(12, 0, -12);
        result.meshes[1].material = MaterialsGenerator(scene, 1, 1, "./models/egypt/palm.png", undefined, undefined, true);
        result.meshes[1].checkCollisions = true;
        SHADOWS_ELEMENTS.push(result.meshes[1]);
        MODELS_COLLISION.push(result.meshes[1]);
    });



    function BuildTheWall(pX, pY, pZ,  rX, rY, rZ,  sX, sY, sZ) {
        var box = BABYLON.Mesh.CreateBox("box", 3.0, scene);
            box.position = new BABYLON.Vector3(pX, pY, pZ);
            box.rotation = new BABYLON.Vector3(rX, rY, rZ);
            box.scaling = new BABYLON.Vector3(sX, sY, sZ);
            box.material = MaterialsGenerator(scene, 1, 8, "./img/bricks2.png", "./img/bricks_nm.png", "./img/stain2.png");
            box.checkCollisions = true;
            SHADOWS_ELEMENTS.push(box);
            PHYSICS_COLLISIONS.push(box);
    }

    BuildTheWall(0,7.2,-60,  0,0,Math.PI,  40,5,0.5);
    BuildTheWall(0,7.2,60,  Math.PI*2,0,Math.PI*2,  40,5,0.5);
    BuildTheWall(60,7.2,0,  0,Math.PI/180*90,Math.PI*2,  40,5,0.5);

/*
    var box = BABYLON.Mesh.CreateBox("box", 3.0, scene);
        box.position = new BABYLON.Vector3(0, 7.2, -20);
        box.rotation = new BABYLON.Vector3(0, 0, Math.PI);
        box.scaling = new BABYLON.Vector3(40, 5, 0.5);
        box.material = MaterialsGenerator(scene, 1, 8, "./img/bricks2.png", "./img/bricks_nm.png", "./img/stain.png");
        box.checkCollisions = true;
        SHADOWS_ELEMENTS.push(box);
        PHYSICS_COLLISIONS.push(box);
*/
        //OnPointerOverTrigger, OnPointerOutTrigger
        //box.actionManager = new BABYLON.ActionManager(scene);
        /*
        box.actionManager.registerAction(
            new BABYLON.InterpolateValueAction(
                BABYLON.ActionManager.OnPickTrigger,
                light0,
                'diffuse',
                BABYLON.Color3.White(),
                1000
            )
        );
        box.actionManager.registerAction(
            new BABYLON.InterpolateValueAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                light0,
                'diffuse',
                BABYLON.Color3.Black(),
                1000
            )
        );
        */

    var SM_TextTag = new BABYLON.SpriteManager("spriteManager", "./img/effects/helper.png", 2000, {width:256, height:256}, scene);
    var HelperSprite = new BABYLON.Sprite("helper", SM_TextTag);
        HelperSprite.position = new BABYLON.Vector3(0,5.5,-16);
        HelperSprite.isPickable = true;
        HelperSprite.width = 0;
        HelperSprite.height = 5;

        /*
        box.actionManager = new BABYLON.ActionManager(scene);
        box.actionManager.registerAction(
            new BABYLON.InterpolateValueAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                HelperSprite,
                'width',
                5,
                200
            )
        );
        box.actionManager.registerAction(
            new BABYLON.InterpolateValueAction(
                BABYLON.ActionManager.OnPointerOutTrigger,
                HelperSprite,
                'width',
                0,
                200
            )
        );
        */

   




    /*  Постобработка    */
    setTimeout(function() {
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light0);
            for (a=0; a<SHADOWS_CONTAINS.length; a++) {
                SHADOWS_CONTAINS[a].receiveShadows = true;
            }
            shadowGenerator.getShadowMap().renderList = SHADOWS_ELEMENTS;
            shadowGenerator.useBlurExponentialShadowMap = true;

            shadowGenerator.getShadowMap().refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
            light0.autoUpdateExtends = false;     
    },1000);


    /* Объемный свет */
    var _LIGHT_MESH_ = BABYLON.Mesh.CreateSphere("origin", 3, 1.0, scene);
    var LightMaterial = new BABYLON.StandardMaterial("light", scene);
            LightMaterial.diffuseColor = new BABYLON.Color3(1,1,1);
            LightMaterial.specularColor = new BABYLON.Color3(1,1,1);
            LightMaterial.emissiveColor = new BABYLON.Color3(1,1,1);
            LightMaterial.ambientColor = new BABYLON.Color3(1,1,1); 
    _LIGHT_MESH_.material = LightMaterial; 
    _LIGHT_MESH_.position.y = 1400;
    _LIGHT_MESH_.position.z = 1000;
    _LIGHT_MESH_.scaling = new BABYLON.Vector3(190, 190, 190);
    var vls = new BABYLON.VolumetricLightScatteringPostProcess("vls", 1.0, camera, _LIGHT_MESH_, 30, BABYLON.Texture.BILINIER_SAMPLINGMODE, engine, false);
    


    /*
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.03;
    */
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogStart = 90.0;
    scene.fogEnd = 250.0;
    scene.fogColor = new BABYLON.Color3(0.85, 0.65, 0.45);
    




/*  Обработка драг-н-дроп   

    var startingPoint;
    var currentMesh;

    var getGroundPosition = function () {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;
        }

        return null;
    }

    var pointerDown = function (mesh) {
            currentMesh = mesh;
            startingPoint = getGroundPosition();
            if (startingPoint) { // we need to disconnect camera from canvas
                setTimeout(function () {
                    camera.detachControl(canvas);
                }, 0);
            }
    }

    var pointerUp = function () {
        if (startingPoint) {
            camera.attachControl(canvas, true);
            startingPoint = null;
            return;
        }
    }

    var pointerMove = function () {
        if (!startingPoint) {
            return;
        }
        var current = getGroundPosition();
        if (!current) {
            return;
        }

        var diff = current.subtract(startingPoint);
        currentMesh.position.addInPlace(diff);

        startingPoint = current;

    }

    scene.onPointerObservable.add((pointerInfo) => {            
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERDOWN:
                if(pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh != ground) {
                    pointerDown(pointerInfo.pickInfo.pickedMesh)
                }
                break;
            case BABYLON.PointerEventTypes.POINTERUP:
                    pointerUp();
                break;
            case BABYLON.PointerEventTypes.POINTERMOVE:          
                    pointerMove();
                break;
        }
    });
     */

     //Execute whene level is fully loaded
    scene.executeWhenReady(function() {
        GAMEEVENTS_StartAttaching();
        GAMEEVENTS_Collisions(GLOBAL_PARAM.scene);
    });
    return scene;

}


function MAIN_GFX_Start() {
	var canvas = document.getElementById("main_babylon_canvas");        
	var engine = new BABYLON.Engine(canvas, true);

    var scene = MAIN_SceneGenerator(engine, canvas);
    engine.runRenderLoop(function() {
       scene.render();
    });

}

window.onload = function() {
	MAIN_GFX_Start();
}

