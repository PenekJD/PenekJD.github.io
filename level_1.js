var LEVEL_LOAD = {
	world_color : {
		"diffuse":[0.85, 0.65, 0.45],
		"specular":[0.2, 0.2, 0.2],
		"emissive":[0.6, 0.6, 0.6],
		"ambient":[0.85, 0.65, 0.45]
	},
	ground: {
		"w":500, "h":500,
		"subdivisions":4,
		"mat_id":"sand_hd_1",
		"r":[0,0,0]
	},
	skybox:{
		"scale":10000,
		"files":"./img/skybox3/skybox",
		"r":[0, Math.PI/180*30, 0],
		"sun_p":[450,600,850],
		"sun_s":[190, 190, 190],
		"sun_layers":30
	},
	fog: {
		"fstart":90, "fend":250, "clr":[0.85, 0.65, 0.45]
	},
	lights: [
		{
			"type": "DirectionalLight",
			"r": [-0.6,-0.5,-1], "p":[700, 1000, 1000],
			"shadows":true, "quality":1024,
			"specular":[1,1,1], "diffuse":[0,0,0]
		}
	],
	materials: [
		{
			"id":"sand_hd_1",
			"texture": "./img/sand_hd.png",
			"normal": "./img/sand_hd_nm.png",
			"detail": "./img/stain.png",
			"t_s": [40, 40], "n_s": [40, 40], "d_s": [1, 1],
			"alpha": false,
			"reflection": ""
		},
		{
			"id":"apartment",
			"texture": "./models/city/Apartment.png",
			"normal": "./models/city/Apartment_nm.png",
			"detail": "",
			"t_s": [1, 1], "n_s": [1, 1], "d_s": [0.2, 0.2],
			"alpha": false,
			"reflection": ""
		}
	],
	touch_fields: [],
	brushes: [],
	models:[
		{
			"name":"",
			"folder":"./models/city/",
			"model":"Apartment.glb",
			"mat_id":["apartment","sand_hd_1"],
			"scaling":[1.5,1.5,1.5], "position":[0,0,0],
			"rotation":[0,0.5,0],
			"collision":false,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":false,
			"touch_events":[],
			"render_distance":130
		}
	]
};




//PublicGameFunctions
// All game functions have agrument "arg". It's array where first element
// always is mesh

function LEVEL_LoadingScreenChanger() {
	var LOADING_SCREEN = document.getElementById("LOADING_SCREEN");
	var IMG = LOADING_SCREEN.getElementsByTagName("img")[0];
		IMG.src = "./img/logos/level_map_0.png";
	var TITLE = document.getElementById("LS_TITLE_ID");
	var DESC = document.getElementById("LS_DESC_ID");
	TITLE.innerHTML = "Где-то в пустыне...";
	DESC.innerHTML = "Невероятно, что ты нашел путь попасть сюда.";
}

function LEVEL_SayHello(arg) {
	CC_SubtitleControl(arg[1], 5);
}

function LEVEL_Snitch(arg) {
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

function LEVEL_SpinDatBitch(arg) {
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

function LEVEL_GameStartChain(arg) {
	var Model = arg[0];

	var MonologChain = [];
		MonologChain.push(["<span><sam>Sam:</sam> Hello, stranger!</span>", 3]);
		MonologChain.push([" ", 4, 'LEVEL_NewMission', [Model]]);
	CC_SubtitlesChain(MonologChain);
}

function LEVEL_NewMission(arg) {
	GAMEEVENTS_DisableToucher(true);
	CC_OpenCloseMenu("MENU_HUD");
}


