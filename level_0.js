var LEVEL_LOAD = {
	skybox:{

	},
	brushes: [
		{

		}
	],
	models:[
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"column.glb",
			"scaling":[6,6,6],
			"rotation":[0,0,0],
			"position":[20,0,60],
			"texture": "./models/egypt/column.png",
			"alpha": false,
			"texture_scale": [1, 1],
			"normal": "./models/egypt/column_nm.png",
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[
				{
	                "helpText" : "Это первая модель",
	                "callFunc" : "CC_HelloEmenet",
	                "arg": "Привет, крошка..."
	            }
			],
			"render_distance":130
		},
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"column.glb",
			"scaling":[6,6,6],
			"rotation":[0,0,0],
			"position":[-20,0,60],
			"texture": "./models/egypt/column.png",
			"alpha": false,
			"texture_scale": [1, 1],
			"normal": "./models/egypt/column_nm.png",
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[
				{
	                "helpText" : "Украсть модель",
	                "callFunc" : "CC_Snitch",
	                "arg": "Вот и нет Вашей колонны :)"
	            }
			],
			"render_distance":130
		},
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"column.glb",
			"scaling":[6,6,6],
			"rotation":[0,0,0],
			"position":[-20,0,-60],
			"texture": "./models/egypt/column.png",
			"alpha": false,
			"texture_scale": [1, 1],
			"normal": "./models/egypt/column_nm.png",
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
			"scaling":[6,6,6],
			"rotation":[0,0,0],
			"position":[20,0,-60],
			"texture": "./models/egypt/column.png",
			"alpha": false,
			"texture_scale": [1, 1],
			"normal": "./models/egypt/column_nm.png",
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
			"scaling":[1,1,1],
			"rotation":[Math.PI/180*90, Math.PI/180*90, 0],
			"position":[11, 0, -12],
			"texture": "./models/egypt/palm512.png",
			"alpha": true,
			"texture_scale": [1, 1],
			"normal": undefined,
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[],
			"render_distance":70
		},
		{
			"name":"",
			"folder":"./models/egypt/",
			"model":"palm.glb",
			"scaling":[0.8, 0.8, 1.2],
			"rotation":[Math.PI/180*90, Math.PI/180*200, 0],
			"position":[-11, 0, -12],
			"texture": "./models/egypt/palm512.png",
			"alpha": true,
			"texture_scale": [1, 1],
			"normal": undefined,
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":true,
			"touch_events":[
				{
	                "helpText" : "",
	                "callFunc" : "CC_SpinDatBitch",
	                "arg": ""
	            }
			],
			"render_distance":70
		},
		{
			"name":"",
			"folder":"./models/chars/",
			"model":"SeriousSam.glb",
			"scaling":[2, 2, 2],
			"rotation":[Math.PI/180*90, Math.PI/180, 0],
			"position":[0, 0, 8],
			"texture": "./models/chars/SeriousSam.png",
			"alpha": false,
			"texture_scale": [1, 1],
			"normal": undefined,
			"collision":true,
			"cast_shadow":true,
			"contains_shadow":false,
			"create_collision":false,
			"touch_events":[
				{
	                "helpText" : "Press E to talk",
	                "callFunc" : "CC_GameStartChain",
	                "arg": ""
	            }
			],
			"render_distance":70
		}
	]
}