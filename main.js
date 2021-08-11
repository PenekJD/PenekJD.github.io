
function MAIN_HideLoadingScreen() {
    var LScreen = document.getElementById("LOADING_SCREEN");
    LScreen.classList.add("hidden");
    setTimeout(function(){ LScreen.style.display = "none"; },1000);
}

function MAIN_SceneGenerator(engine, canvas) {

    var DESC = document.getElementById("LS_DESC_ID");

    GLOBAL_PARAM.canvas = canvas;
    canvas.width = GLOBAL_PARAM.sWidth;
    canvas.height = GLOBAL_PARAM.sHeight;

    function MakeOutline(_mesh_) {
        
        _mesh_.outlineWidth = 0.01;
        //_mesh_.backFaceCulling = false;
        _mesh_.renderOutline = true;
        _mesh_.outlineColor = new BABYLON.Color4(0,0,0,1);
        /*
        var HL = new BABYLON.HighlightLayer("", GLOBAL_PARAM.scene);
        HL.addMesh(_mesh_, BABYLON.Color3.Black());
        HL.mainTextureFixedSize = 0;
        HL.blurTextureSizeRatio = 0;
        HL.alphaBlendingMode = 0.9;
        HL.blurVerticalSize = 0;
        HL.blurHorizontalSize = 0;
        */
        
    }

	function MaterialsGenerator(scene, vScale, uScale, img, nmap, detail, hasAlpha, reflection, nsX, nsY, dsX, dsY, opacity) {
        if (nsX==undefined || nsX==null || nsX=="") { nsX = vScale; }
        if (nsY==undefined || nsY==null || nsY=="") { nsY = uScale; }
        if (dsX==undefined || dsX==null || dsX=="") { dsX = vScale; }
        if (dsY==undefined || dsY==null || dsY=="") { dsY = uScale; }
		let NewMaterial = {};
			NewMaterial = new BABYLON.StandardMaterial("sand", scene);
			NewMaterial.diffuseTexture = new BABYLON.Texture(img, scene);
            NewMaterial.diffuseTexture.vScale = vScale;
            NewMaterial.diffuseTexture.uScale = uScale;
            if (nmap!=undefined && nmap!=null && nmap!="") {
                NewMaterial.bumpTexture = new BABYLON.Texture(nmap, scene);
                NewMaterial.bumpTexture.vScale = nsX;
                NewMaterial.bumpTexture.uScale = nsY;
            }
            if (detail!=undefined && detail!=null && detail!="") {
                NewMaterial.detailMap.texture = new BABYLON.Texture(detail, scene);
                NewMaterial.detailMap.isEnabled = true;
                NewMaterial.detailMap.diffuseBlendLevel = 1; // between 0 and 1
                NewMaterial.detailMap.bumpLevel = 0.5; // between 0 and 1
                NewMaterial.detailMap.roughnessBlendLevel = 1; // between 0 and 1
                NewMaterial.detailMap.vScale = dsX;
                NewMaterial.detailMap.uScale = dsY;
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
            NewMaterial.diffuseColor = new BABYLON.Color3(
                    LEVEL_LOAD.world_color.diffuse[0],
                    LEVEL_LOAD.world_color.diffuse[1],
                    LEVEL_LOAD.world_color.diffuse[2]
                );
            NewMaterial.specularColor = new BABYLON.Color3(
                    LEVEL_LOAD.world_color.specular[0],
                    LEVEL_LOAD.world_color.specular[1],
                    LEVEL_LOAD.world_color.specular[2]
                );
            NewMaterial.emissiveColor = new BABYLON.Color3(
                    LEVEL_LOAD.world_color.emissive[0],
                    LEVEL_LOAD.world_color.emissive[1],
                    LEVEL_LOAD.world_color.emissive[2]
                );
            NewMaterial.ambientColor = new BABYLON.Color3(
                    LEVEL_LOAD.world_color.ambient[0],
                    LEVEL_LOAD.world_color.ambient[1],
                    LEVEL_LOAD.world_color.ambient[2]
                );
        if (opacity!=undefined && opacity!=null && opacity!="") {
            NewMaterial.useAlphaFromDiffuseTexture = true;
        }
		return NewMaterial;
	}

    function BuildTheWall(pX, pY, pZ,  rX, rY, rZ,  sX, sY, sZ, mat_id, shadow) {
        var box = BABYLON.Mesh.CreateBox("box", 3.0, GLOBAL_PARAM.scene);
            box.position = new BABYLON.Vector3(pX, pY, pZ);
            box.rotation = new BABYLON.Vector3(rX, rY, rZ);
            box.scaling = new BABYLON.Vector3(sX, sY, sZ);
            box.material = GLOBAL_PARAM.materials[mat_id];
            box.checkCollisions = true;
            if (shadow=="out") {
                SHADOWS_ELEMENTS.push(box);
            } else {
                box.receiveShadows = true;
                //SHADOWS_CONTAINS.push(box);
            }
            PHYSICS_COLLISIONS.push(box);
            MakeOutline(box);
    }

    function BuildTouchField(pX, pY, pZ,  rX, rY, rZ,  sX, sY, sZ, events) {
        var box = BABYLON.Mesh.CreateBox("box", 3.0, GLOBAL_PARAM.scene);
            box.position = new BABYLON.Vector3(pX, pY, pZ);
            box.rotation = new BABYLON.Vector3(rX, rY, rZ);
            box.scaling = new BABYLON.Vector3(sX, sY, sZ);
            box.addLODLevel(40,  null); 
            if (LEVEL_LOAD.editable_mode) {
                box.material = GLOBAL_PARAM.materials["collision_mark"];
                MakeOutline(box);
            } else {
                box.isVisible = false;
            }
        for (b=0; b<events.length; b++) {
            let tEvent = events[b];
            EVENTS_COLLECTION[1].touchElements.push({
                "obj": box,
                "helpText" : tEvent.helpText,
                "callFunc" : tEvent.callFunc,
                "arg": [box, tEvent.arg]
            });
        }
    }

    //Models creation from LEVEL_LOAD
    function LevelStructureCreation() {
        //Creating of materials *_*_*_*_*_*_*_*_*_*_*_*
        for (a=0; a<LEVEL_LOAD.materials.length; a++) {
            let Mat = LEVEL_LOAD.materials[a];
            let CreateMaterial = MaterialsGenerator(
                    GLOBAL_PARAM.scene,
                    Mat.t_s[0], Mat.t_s[1], Mat.texture,
                    Mat.normal, Mat.detail, Mat.alpha,
                    Mat.reflection,
                    Mat.n_s[0], Mat.n_s[1],
                    Mat.d_s[0], Mat.d_s[1],
                    Mat.opacity
                );
            GLOBAL_PARAM.materials[Mat.id] = CreateMaterial;
        }
        //Creating of brushes *_*_*_*_*_*_*_*_*_*_*_*
        for (a=0; a<LEVEL_LOAD.brushes.length; a++) {
            let Brush = LEVEL_LOAD.brushes[a];
            BuildTheWall(
                Brush.p[0],Brush.p[1],Brush.p[2],
                Brush.r[0],Brush.r[1],Brush.r[2],
                Brush.s[0],Brush.s[1],Brush.s[2],
                Brush.mat_id, Brush.shadow
            );
        }
        //Creating of TOUCH FIELDS *_*_*_*_*_*_*_*_*_*_*_*
        for (a=0; a<LEVEL_LOAD.touch_fields.length; a++) {
            let Brush = LEVEL_LOAD.touch_fields[a];
            BuildTouchField(
                Brush.p[0],Brush.p[1],Brush.p[2],
                Brush.r[0],Brush.r[1],Brush.r[2],
                Brush.s[0],Brush.s[1],Brush.s[2],
                Brush.touch_events
            );
        }
        //Creating of models *_*_*_*_*_*_*_*_*_*_*_*
        for (a=0; a<LEVEL_LOAD.models.length; a++) {
            let mdlObj = LEVEL_LOAD.models[a];
            BABYLON.SceneLoader.ImportMesh(mdlObj.name, mdlObj.folder, mdlObj.model, GLOBAL_PARAM.scene, function (newMeshes, particleSystems, skeletons) {
                function MeshGen(_mesh_, mat_id) {
                    _mesh_.scaling = new BABYLON.Vector3(mdlObj.scaling[0], mdlObj.scaling[1], mdlObj.scaling[2]);
                    _mesh_.rotation = new BABYLON.Vector3(mdlObj.rotation[0], mdlObj.rotation[1], mdlObj.rotation[2]);
                    _mesh_.position = new BABYLON.Vector3(mdlObj.position[0], mdlObj.position[1], mdlObj.position[2]);
                    _mesh_.material = GLOBAL_PARAM.materials[mat_id];
                    if (mdlObj.collision) {   _mesh_.checkCollisions = true;  }
                    if (mdlObj.cast_shadow) {   SHADOWS_ELEMENTS.push(_mesh_);  }
                    if (mdlObj.contains_shadow) {   SHADOWS_CONTAINS.push(_mesh_);  }
                    if (mdlObj.create_collision) {   MODELS_COLLISION.push(_mesh_);  }
                    for (b=0; b<mdlObj.touch_events.length; b++) {
                        let tEvent = mdlObj.touch_events[b];
                        EVENTS_COLLECTION[0].touchElements.push({
                            "obj": _mesh_,
                            "helpText" : tEvent.helpText,
                            "callFunc" : tEvent.callFunc,
                            "arg": [_mesh_, tEvent.arg]
                        });
                    }
                    _mesh_.addLODLevel(mdlObj.render_distance,  null); 
                    if (skeletons.length>0) {
                        GLOBAL_PARAM.skeletons = GLOBAL_PARAM.skeletons.concat(skeletons);
                    }
                    MakeOutline(_mesh_);
                }
                for (a=1; a<newMeshes.length; a++) {
                    let _mesh_ = newMeshes[a];
                    let _matNum_ = a-1;
                    let mat_id;
                    if (mdlObj.mat_id[_matNum_]!=undefined && mdlObj.mat_id[_matNum_]!=null && mdlObj.mat_id[_matNum_]!="") {
                        mat_id = mdlObj.mat_id[_matNum_];
                    } else {
                        mat_id = mdlObj.mat_id[0];
                    }
                    MeshGen(_mesh_, mat_id);
                }
            });
            /*
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
                result.meshes[1].addLODLevel(mdlObj.render_distance,  null);                
            });
            */
        }
        //Creating of lights *_*_*_*_*_*_*_*_*_*_*_*
        for (a=0; a<LEVEL_LOAD.lights.length; a++) {
            var LObj = LEVEL_LOAD.lights[a];
            var light = new BABYLON[LObj.type](LObj.type, new BABYLON.Vector3(LObj.r[0], LObj.r[1], LObj.r[2]), GLOBAL_PARAM.scene);
                light.position = new BABYLON.Vector3(LObj.p[0], LObj.p[1], LObj.p[2]);
                //light.groundColor = new BABYLON.Color3(1,1,1);
            if (LObj.shadows) {
                SHADOW_LIGHTS_ELEMENTS.push([light, LObj.quality]);
            }
        }
        //Creating of skybox *_*_*_*_*_*_*_*_*_*_*_*
        var SkBxP = LEVEL_LOAD.skybox;
        if (SkBxP!=undefined && SkBxP!=null && SkBxP!="") {
            var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:SkBxP.scale}, GLOBAL_PARAM.scene);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", GLOBAL_PARAM.scene);
                skyboxMaterial.backFaceCulling = false;
                skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(SkBxP.files, GLOBAL_PARAM.scene);
                skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
                skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
                skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                skybox.material = skyboxMaterial;
                skybox.rotation = new BABYLON.Vector3(SkBxP.r[0], SkBxP.r[1], SkBxP.r[2]);
                skybox.applyFog = false;
            //Godrays from sun *_*_*_*_*_*_*_*_*_*_*_*
            var _LIGHT_MESH_ = BABYLON.Mesh.CreateSphere("origin", 3, 1.0, scene);
            var LightMaterial = new BABYLON.StandardMaterial("light", GLOBAL_PARAM.scene);
            LightMaterial.diffuseColor = LightMaterial.specularColor = LightMaterial.emissiveColor = LightMaterial.ambientColor = new BABYLON.Color3(1,1,1);
                _LIGHT_MESH_.material = LightMaterial; 
                _LIGHT_MESH_.position = new BABYLON.Vector3(SkBxP.sun_p[0],SkBxP.sun_p[1],SkBxP.sun_p[2]);
                _LIGHT_MESH_.scaling = new BABYLON.Vector3(SkBxP.sun_s[0], SkBxP.sun_s[1], SkBxP.sun_s[2]);
            var vls = new BABYLON.VolumetricLightScatteringPostProcess("vls", 1.0, GLOBAL_PARAM.camera, _LIGHT_MESH_, SkBxP.sun_layers, BABYLON.Texture.BILINIER_SAMPLINGMODE, engine, false);
        }
        //Creating of ground *_*_*_*_*_*_*_*_*_*_*_*
        var LLGrnd = LEVEL_LOAD.ground;
        if (LLGrnd!=undefined && LLGrnd!=null && LLGrnd!="") {
            var ground = new BABYLON.MeshBuilder.CreateGround("ground", {height:LLGrnd.h, width:LLGrnd.w, sundivisions:LLGrnd.subdivisions}, GLOBAL_PARAM.scene);
            // ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", heightMapPath, width, height, 10, minHeight, maxHeight, scene, false, onReadyCallback);
                ground.material = GLOBAL_PARAM.materials[LLGrnd.mat_id];
                ground.rotation = new BABYLON.Vector3(LLGrnd.r[0],LLGrnd.r[1],LLGrnd.r[2]);
                ground.checkCollisions = true;
                ground.receiveShadows = true;
                //SHADOWS_CONTAINS.push(ground);
                PHYSICS_COLLISIONS.push(ground);
        }
        //Creating of fog
        var LLFog = LEVEL_LOAD.fog;
        if (LLFog!=undefined && LLFog!=null && LLFog!="") {
            //scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
            //scene.fogDensity = 0.03;
            GLOBAL_PARAM.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
            GLOBAL_PARAM.scene.fogStart = LLFog.fstart;
            GLOBAL_PARAM.scene.fogEnd = LLFog.fend;
            GLOBAL_PARAM.scene.fogColor = new BABYLON.Color3(LLFog.clr[0], LLFog.clr[1], LLFog.clr[2]);
        }
    }


    /*  Отработка сцены    */
    var scene = new BABYLON.Scene(engine);
    	scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        GLOBAL_PARAM.scene = scene;

        CController(canvas, GLOBAL_PARAM.scene);


    //Animated by bones
    /*
    BABYLON.SceneLoader.ImportMesh("", "./models/chars/", "SeriousSam_y.glb", scene,
        function (meshes, particleSystems, skeletons) {
            scene.beginAnimation(skeletons[0], 0, 100, true, 1.0);
        }
    );*/
    
    LevelStructureCreation();


        /*
    var box = new BABYLON.Mesh.CreateBox("box", 3.0, GLOBAL_PARAM.scene);
        box.position = new BABYLON.Vector3(0,7.2,-50);
        box.rotation = new BABYLON.Vector3(0,0,Math.PI);
        box.scaling = new BABYLON.Vector3(40,5,0.5);
        box.material = GLOBAL_PARAM.materials["wall_1"];
        box.receiveShadows = true;
        //SHADOWS_ELEMENTS.push(box);
        //SHADOWS_CONTAINS.push(box);
        //PHYSICS_COLLISIONS.push(box);
        */


    var SM_TextTag = new BABYLON.SpriteManager("spriteManager", "./img/effects/helper.png", 2000, {width:256, height:256}, scene);
    var HelperSprite = new BABYLON.Sprite("helper", SM_TextTag);
        HelperSprite.position = new BABYLON.Vector3(0,5.5,-16);
        HelperSprite.isPickable = true;
        HelperSprite.width = 0;
        HelperSprite.height = 5;


    /*  Постобработка    */
    function Main_POST_SHADOWS() {
        
        for (a=0; a<SHADOW_LIGHTS_ELEMENTS.length; a++) {

            var Light = SHADOW_LIGHTS_ELEMENTS[a][0];
            var Quality = SHADOW_LIGHTS_ELEMENTS[a][1];
            var shadowGenerator = new BABYLON.ShadowGenerator(Quality, Light, true, true);
                shadowGenerator.getShadowMap().renderList = SHADOWS_ELEMENTS;
                for (b=0; b<SHADOWS_CONTAINS.length; b++) {
                    SHADOWS_CONTAINS[b].receiveShadows = true;
                    shadowGenerator.addShadowCaster(SHADOWS_CONTAINS[b], SHADOWS_CONTAINS[b]);
                }
            
            shadowGenerator.useBlurExponentialShadowMap = true;
            //shadowGenerator.frustumEdgeFalloff = 1.0;
            //shadowGenerator.bias = 0.00001;
            //shadowGenerator.forceBackFacesOnly = true;

            shadowGenerator.getShadowMap().refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
            Light.autoUpdateExtends = false; 
        }   

    }

    

     //Execute whene level is fully loaded
    scene.executeWhenReady(function() {
        EVENTS_COLLECTION[0].toucher = GLOBAL_PARAM.MyRay;
        GAMEEVENTS_StartAttaching();
        GAMEEVENTS_Collisions(GLOBAL_PARAM.scene);
        if (LEVEL_LOAD.start_marker!=undefined && LEVEL_LOAD.start_marker!=null && LEVEL_LOAD.start_marker!="") {
            GLOBAL_PARAM.hero.position.x = LEVEL_LOAD.start_marker.p[0];
            GLOBAL_PARAM.hero.position.y = LEVEL_LOAD.start_marker.p[1]+2;
            GLOBAL_PARAM.hero.position.z = LEVEL_LOAD.start_marker.p[2];
        } else {
            GLOBAL_PARAM.hero.position.y = 2;
        }
        Main_POST_SHADOWS();
        MAIN_HideLoadingScreen();
    });
    return scene;

}


function MAIN_GFX_Start() {
	var canvas = document.getElementById("main_babylon_canvas");        
	var engine = new BABYLON.Engine(canvas, true, {stencil:true});

    var scene = MAIN_SceneGenerator(engine, canvas);
    engine.runRenderLoop(function() {
       scene.render();
    });

}

window.onload = function() {
    try { LEVEL_LoadingScreenChanger(); } catch(no) {}
    GlobalParams_MakeCorrectHeight(GLOBAL_PARAM.sWidth);
	MAIN_GFX_Start();
}

