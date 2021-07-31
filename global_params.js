function GlobalParams_MakeCorrectHeight(sWidth) {
	let RetParam;
	let CANVAS = document.getElementById("main_babylon_canvas");
	let WindScale = document.getElementById("game_window_scale");
	let CurH = WindScale.getBoundingClientRect().height;
	let CurW = WindScale.getBoundingClientRect().width;
	let Proportions = CurW/CurH;
		RetParam = sWidth/Proportions;
	GLOBAL_PARAM.sHeight = RetParam;
}


var GLOBAL_PARAM = {};
	//GLOBAL_PARAM.sWidth = 1280;	GLOBAL_PARAM.sHeight = 720;
	GLOBAL_PARAM.sWidth = 1024;
	GLOBAL_PARAM.sHeight = 576;
	GLOBAL_PARAM.scene;		//Main scene
	GLOBAL_PARAM.camera;	//Player Camera
	GLOBAL_PARAM.maxZ = 100;	
	GLOBAL_PARAM.MyRay;		//Ray from eyes
	GLOBAL_PARAM.hero;

var SHADOWS_ELEMENTS = [];
var SHADOWS_CONTAINS = [];
var PHYSICS_COLLISIONS = [];
var MODELS_COLLISION = [];
var EVENTS_COLLECTION = [];	//Game events
	EVENTS_COLLECTION.push({
            "toucher" : GLOBAL_PARAM.MyRay,
            "touchElements": []
        });