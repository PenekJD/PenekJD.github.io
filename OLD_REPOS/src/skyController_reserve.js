let pubSkyOBJ = {};
	pubSkyOBJ.curClr_1 = [255,0,0];
	pubSkyOBJ.curClr_2 = [0,0,0];
	pubSkyOBJ.swithcing = false;

function SkyBehavior(_blocks_) {
	for (let a=0; a<_blocks_.length; a++) {
		_blocks_[a].style.background = "linear-gradient(rgb("+pubSkyOBJ.curClr_1[0]+", "+pubSkyOBJ.curClr_1[1]+", "+pubSkyOBJ.curClr_1[2]+"), rgb("+pubSkyOBJ.curClr_2[0]+", "+pubSkyOBJ.curClr_2[1]+", "+pubSkyOBJ.curClr_2[2]+"))";
	}
}


//SkyNumberTransition(0, 255, 60000, 'curClr_1', 0)
function SkyNumberTransition(startCnt, endCnt, time, key, pos) {
	pubSkyOBJ.swithcing = true;
	let Cycles = endCnt-startCnt;
	 let Delay = time/Cycles;
	 		Delay = Math.floor(Delay);
	 function CallRecourse() {	
	 	startCnt++;
	 	pubSkyOBJ[key][pos] = startCnt;
	 	Recourse();	
	 }
	 function Recourse() {
	 	if (startCnt>=endCnt) {
	 		pubSkyOBJ.swithcing = false;
	 	} else {
	 		setTimeout(function(){	CallRecourse();	}, Delay);
	 	}
	 }
	 CallRecourse();
}


function SkyRGBGradientChanger(r2,g2,b2, R2,G2,B2, time) {
	function ChangePlace(_arr_) {
		let BackArr = [];
		let VAL1 = _arr_[0]*1;
		let VAL2 = _arr_[1]*1;
		if (VAL1>VAL2) { _arr_[0] = VAL2; _arr_[1] = VAL1; }
		BackArr.push(_arr_[0]);
		BackArr.push(_arr_[1]);
		return BackArr;
	}
	let r1 = pubSkyOBJ.curClr_1[0];
	let g1 = pubSkyOBJ.curClr_1[1];
	let b1 = pubSkyOBJ.curClr_1[2];
	let R1 = pubSkyOBJ.curClr_2[0];
	let G1 = pubSkyOBJ.curClr_2[1];
	let B1 = pubSkyOBJ.curClr_2[2];
	let AllValues = [];
		AllValues.push([r1,r2]);
		AllValues.push([g1,g2]);
		AllValues.push([b1,b2]);
		AllValues.push([R1,R2]);
		AllValues.push([G1,G2]);
		AllValues.push([B1,B2]);
	for (let a = 0; a<AllValues.length; a++) {	
		AllValues[a] = ChangePlace(AllValues[a]); 
	}
	SkyNumberTransition(AllValues[0][0], AllValues[0][1], time, 'curClr_1', 0);
	SkyNumberTransition(AllValues[1][0], AllValues[1][1], time, 'curClr_1', 1);
	SkyNumberTransition(AllValues[2][0], AllValues[2][1], time, 'curClr_1', 2);
	SkyNumberTransition(AllValues[3][0], AllValues[3][1], time, 'curClr_2', 0);
	SkyNumberTransition(AllValues[4][0], AllValues[4][1], time, 'curClr_2', 1);
	SkyNumberTransition(AllValues[5][0], AllValues[5][1], time, 'curClr_2', 2);
}


function StartSky() {
	let blocksBGChange = [];
	let SkyBlock = document.getElementsByClassName("MC_BackgroundSky")[0];
		blocksBGChange.push(SkyBlock);
		blocksBGChange.push(document.body);
	let FogBlocks = document.getElementsByClassName("fog");
	for (let a=0; a<FogBlocks.length; a++) {	
		blocksBGChange.push(FogBlocks[a]);	
	}

	let SkyInterval = setInterval(function(){
		if (pubSkyOBJ.swithcing) {
			SkyBehavior(blocksBGChange);
		}
	}, 300);
}