var LEVEL_LOAD = {
	editable_mode:true,
	outline_mode:true,
	cellshading_mode:false,
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
	start_marker: {
		"p":[0,0,-30], "r":Math.PI/180
	},
	skybox:{
		"scale":10000,
		"files":"./img/skybox2/skybox",
		"r":[0, Math.PI/180*30, 0],
		"sun_p":[450,1400,850],
		"sun_s":[190, 190, 190],
		"sun_layers":30
	},
	fog: {
		"fstart":90, "fend":250, "clr":[0.85, 0.65, 0.45]
	},
	lights: [
		{
			"type": "DirectionalLight",
			"r": [-0.8,-1,-1], "p":[700, 1000, 1000],
			"shadows":true, "quality":1024,
			"specular":[1,1,1], "diffuse":[0,0,0]
		}
	],
	materials: [
		{
			"id":"collision_mark",
			"texture": "./img/collision_mark.png",
			"normal": "",
			"detail": "",
			"t_s": [1, 1], "n_s": [1, 1], "d_s": [1, 1],
			"alpha": true, "opacity":true,
			"reflection": ""
		},
		{
			"id":"collision_mark_red",
			"texture": "./img/collision_mark_red.png",
			"normal": "",
			"detail": "",
			"t_s": [1, 1], "n_s": [1, 1], "d_s": [1, 1],
			"alpha": true, "opacity":true,
			"reflection": ""
		},
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
			"id":"column",
			"texture": "./models/egypt/column.png",
			"normal": "./models/egypt/column_nm.png",
			"detail": "",
			"t_s": [1, 1], "n_s": [1, 1], "d_s": [1, 1],
			"alpha": false,
			"reflection": ""
		},
		{
			"id":"palm",
			"texture": "./models/egypt/palm512.png",
			"normal": "",
			"detail": "",
			"t_s": [1, 1], "n_s": [1, 1], "d_s": [1, 1],
			"alpha": true,
			"reflection": ""
		},
		{
			"id":"sam",
			"texture": "./models/chars/SeriousSam.png",
			"normal": "",
			"detail": "",
			"t_s": [1, 1], "n_s": [1, 1], "d_s": [1, 1],
			"alpha": true,
			"reflection": ""
		},
		{
			"id":"sam_smile",
			"texture": "./models/chars/SeriousSam_smile.png",
			"normal": "",
			"detail": "",
			"t_s": [1, 1], "n_s": [1, 1], "d_s": [1, 1],
			"alpha": true,
			"reflection": ""
		},
		{
			"id":"wall_1",
			"texture": "./img/bricks2.png",
			"normal": "./img/bricks_nm.png",
			"detail": "./img/stain2.png",
			"t_s": [1, 8], "n_s": [1, 8], "d_s": [1, 1],
			"alpha": false,
			"reflection": ""
		},
		{
			"id":"floor_1",
			"texture": "./img/floor.png",
			"normal": "./img/floor_nm.png",
			"detail": "",
			"t_s": [16, 2], "n_s": [16, 2], "d_s": [0.2, 0.2],
			"alpha": false,
			"reflection": ""
		}
	],
	touch_fields:[
		{
			"p":[0,0,-40], "r":[0,0,Math.PI], "s":[5,5,5],
			"touch_events":[
				{
					"callFunc" : "LEVEL_FirstTouchField",
	                "helpText" : "", "arg": ""
	            }
	        ]
		}
	],
	brushes: [
		{
			"name":"", "mat_id": "wall_1",
			"p":[0,7.2,-60], "r":[0,0,Math.PI], "s":[40,5,0.5],
			"shadow":"in"
		},
		{
			"name":"", "mat_id": "wall_1",
			"p":[0,7.2,60], "r":[Math.PI*2,0,Math.PI*2], "s":[40,5,0.5],
			"shadow":"out"
		},
		{
			"name":"", "mat_id": "wall_1",
			"p":[60,7.2,0],	"r":[0,Math.PI/180*90,Math.PI*2], "s":[40,5,0.5],
			"shadow":"out"
		},
		{
			"name":"", "mat_id": "wall_1",
			"p":[-60,7.2,0], "r":[0,Math.PI/180*270,Math.PI*2], "s":[40,5,0.5],
			"shadow":"in"
		}
	],
	models:[
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"column.glb",
			"mat_id":["column"],
			"scaling":[6,6,6], "position":[20,0,60],
			"rotation":[0,0,0],
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[
				{
	                "helpText" : "Это первая модель",
	                "callFunc" : "LEVEL_SayHello",
	                "arg": "Привет, крошка..."
	            }
			],
			"render_distance":130
		},
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"column.glb",
			"mat_id":["column"],
			"scaling":[6,6,6], "position":[-20,0,60],
			"rotation":[0,0,0],
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[
				{
	                "helpText" : "Украсть модель",
	                "callFunc" : "LEVEL_Snitch",
	                "arg": "Вот и нет Вашей колонны :)"
	            }
			],
			"render_distance":130
		},
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"column.glb",
			"mat_id":["column"],
			"scaling":[6,6,6], "position":[-20,0,-60],
			"rotation":[0,0,0],
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[],
			"render_distance":130
		},
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"column.glb",
			"mat_id":["column"],
			"scaling":[6,6,6], "position":[20,0,-60],
			"rotation":[0,0,0],
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[],
			"render_distance":130
		},
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"palm.glb",
			"mat_id":["palm"],
			"scaling":[1,1,1], "position":[11, 0, -12],
			"rotation":[Math.PI/180*90, Math.PI/180*90, 0],
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[
				{
	                "helpText" : "Телепортнуться",
	                "callFunc" : "LEVEL_LoadLevel",
	                "arg": "level_1"
	            }
			],
			"render_distance":70
		},
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"palm.glb",
			"mat_id":["palm"],
			"scaling":[0.8, 0.8, 1.2], "position":[-11, 0, -12],
			"rotation":[Math.PI/180*90, Math.PI/180*200, 0],
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[
				{
	                "helpText" : "",
	                "callFunc" : "LEVEL_SpinDatBitch",
	                "arg": ""
	            }
			],
			"render_distance":70
		},
		{
			"name":"",
			"folder":"./models/chars/",
			"model":"Sam.glb",
			"mat_id":["sam"],
			"scaling":[2, 2, 2], "position":[0, 0, 8],
			"rotation":[0, 0, 0],
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":false,
			"touch_events":[
				{
	                "helpText" : "Press E to talk",
	                "callFunc" : "LEVEL_GameStartChain",
	                "arg": ""
	            }
			],
			"render_distance":70
		}
	]
};




//PublicGameFunctions
// All game functions have agrument "arg". It's array where first element
// always is mesh

//This function starts after loading screen DOM element loaded
function LEVEL_LoadingScreenChanger() {
	var LOADING_SCREEN = document.getElementById("LOADING_SCREEN");
	var TITLE = document.getElementById("LS_TITLE_ID");
	var DESC = document.getElementById("LS_DESC_ID");
	TITLE.innerHTML = "Загрузка";
	DESC.innerHTML = "";
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
		MonologChain.push(["<span><sam>Sam:</sam> Привет,путник!</span>", 3]);
		MonologChain.push(["<span><sam>Sam:</sam> Как мне к тебе обращаться?</span>", 4]);
		MonologChain.push([" ", 4, 'LEVEL_NewMission', [Model]]);
	CC_SubtitlesChain(MonologChain);

    const Anim = GLOBAL_PARAM.scene.getAnimationGroupByName("Speak");
    Anim.start(false, 1.0, Anim.from, Anim.to, false);
    Model.material = GLOBAL_PARAM.materials["sam_smile"];
}

function LEVEL_NewMission(arg) {
	let Model = arg[0];
		Model.material = GLOBAL_PARAM.materials["sam"];
	//GAMEEVENTS_DisableToucher(true);
	//CC_OpenCloseMenu("MENU_HUD");
}

function LEVEL_LoadLevel(arg) {
	let levelname = arg[1];
	window.location.href = "/BabylonProject/?level="+levelname;
}

function LEVEL_FirstTouchField(arg) {
	let TouchField = arg[0];
		TouchField.position.y = -100;
	CC_SubtitleControl("Кажется... я во что-то вляпался", 5);
};

