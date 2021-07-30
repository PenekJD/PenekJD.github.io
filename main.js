
function MAIN_HideLoadingScreen() {
    var LScreen = document.getElementById("LOADING_SCREEN");
    LScreen.classList.add("hidden");
    setTimeout(function(){ LScreen.style.display = "none"; },1000);
}

function MAIN_SceneGenerator(engine, canvas) {

    canvas.width = GLOBAL_PARAM.sWidth;
    canvas.height = GLOBAL_PARAM.sHeight;
	function MaterialsGenerator(scene, vScale, uScale, img, nmap, detail, hasAlpha, reflection) {
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
            if (reflection!=undefined && reflection!=null && reflection!="") {
                NewMaterial.backFaceCulling = false;
                NewMaterial.reflectionTexture = new BABYLON.CubeTexture(reflection, scene);
                NewMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            }
            NewMaterial.diffuseColor = new BABYLON.Color3(0.85, 0.65, 0.45);
            NewMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            NewMaterial.emissiveColor = new BABYLON.Color3(0.6, 0.6, 0.6);
            NewMaterial.ambientColor = new BABYLON.Color3(0.85, 0.65, 0.45);
		return NewMaterial;
	}


    //Models creation from LEVEL_LOAD
    function LevelStructureCreation() {
        //Creating of models
        for (a=0; a<LEVEL_LOAD.models.length; a++) {

            let mdlObj = LEVEL_LOAD.models[a];
            BABYLON.SceneLoader.ImportMeshAsync(mdlObj.name, mdlObj.folder, mdlObj.model).then((result) => {
                result.meshes[1].scaling = new BABYLON.Vector3(mdlObj.scaling[0], mdlObj.scaling[1], mdlObj.scaling[2]);
                result.meshes[1].rotation = new BABYLON.Vector3(mdlObj.rotation[0], mdlObj.rotation[1], mdlObj.rotation[2]);
                result.meshes[1].position = new BABYLON.Vector3(mdlObj.position[0], mdlObj.position[1], mdlObj.position[2]);
                result.meshes[1].material = MaterialsGenerator(GLOBAL_PARAM.scene, mdlObj.texture_scale[0], mdlObj.texture_scale[1], mdlObj.texture, mdlObj.normal, undefined, mdlObj.alpha);
                if (mdlObj.collision) {   result.meshes[1].checkCollisions = true;  }
                if (mdlObj.cast_shadow) {   SHADOWS_ELEMENTS.push(result.meshes[1]);  }
                if (mdlObj.contains_shadow) {   SHADOWS_CONTAINS.push(result.meshes[1]);  }
                if (mdlObj.create_collision) {   MODELS_COLLISION.push(result.meshes[1]);  }
                for (b=0; b<mdlObj.touch_events.length; b++) {
                    let tEvent = mdlObj.touch_events[b];
                    EVENTS_COLLECTION[0].touchElements.push({
                        "obj": result.meshes[1],
                        "helpText" : tEvent.helpText,
                        "callFunc" : tEvent.callFunc,
                        "arg": [result.meshes[1], tEvent.arg]
                    });
                }
            });

        }

    }



    /*  Отработка сцены    */
    var scene = new BABYLON.Scene(engine);
    	scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        GLOBAL_PARAM.scene = scene;


        CController(canvas, scene);
        camera = GLOBAL_PARAM.camera;


    var light0 = new BABYLON.PointLight("DirectionalLight", new BABYLON.Vector3(700, 1000, 1000), scene);

    var ground = new BABYLON.Mesh.CreateGround("ground", 500, 500, 1, scene);
    // ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", heightMapPath, width, height, 10, minHeight, maxHeight, scene, false, onReadyCallback);
        ground.material = MaterialsGenerator(scene, 40, 40, "./img/sand_hd.png", "./img/sand_hd_nm.png", "./img/stain.png");
        ground.checkCollisions = true;
        SHADOWS_CONTAINS.push(ground);
        PHYSICS_COLLISIONS.push(ground);



    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:10000.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./img/skybox2/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        skybox.rotation = new BABYLON.Vector3(0, Math.PI/180*30, 0);
        skybox.applyFog = false;


    LevelStructureCreation();



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
    BuildTheWall(-60,7.2,0,  0,Math.PI/180*270,Math.PI*2,  40,5,0.5);



    var SM_TextTag = new BABYLON.SpriteManager("spriteManager", "./img/effects/helper.png", 2000, {width:256, height:256}, scene);
    var HelperSprite = new BABYLON.Sprite("helper", SM_TextTag);
        HelperSprite.position = new BABYLON.Vector3(0,5.5,-16);
        HelperSprite.isPickable = true;
        HelperSprite.width = 0;
        HelperSprite.height = 5;
  




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
    _LIGHT_MESH_.position.z = 850;
    _LIGHT_MESH_.position.x = 450;
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
    


     //Execute whene level is fully loaded
    scene.executeWhenReady(function() {
        EVENTS_COLLECTION[0].toucher = GLOBAL_PARAM.MyRay;
        GAMEEVENTS_StartAttaching();
        GAMEEVENTS_Collisions(GLOBAL_PARAM.scene);
        GLOBAL_PARAM.hero.position.y = 2.0;
        MAIN_HideLoadingScreen();
        CC_GameStartChain();
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
    GlobalParams_MakeCorrectHeight(GLOBAL_PARAM.sWidth);
	MAIN_GFX_Start();
}

