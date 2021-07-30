let pubSkyOBJ = {};
	pubSkyOBJ.curClr_1 = [0,0,0];
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
	let Cycles;
	if (endCnt>startCnt) {	
		Cycles = endCnt-startCnt;	} else {
		Cycles = startCnt-endCnt;
	}
	 let Delay = time/Cycles;
	 		Delay = Math.floor(Delay);
	 function CallRecourse() {	
	 	if (endCnt>startCnt) { startCnt++; } else { startCnt--; }
	 	pubSkyOBJ[key][pos] = startCnt;
	 	Recourse();	
	 }
	 function Recourse() {
	 	if (startCnt==endCnt) {
	 		pubSkyOBJ.swithcing = false;
	 	} else {
	 		setTimeout(function(){	CallRecourse();	}, Delay);
	 	}
	 }
	 CallRecourse();
}


function SkyRGBGradientChanger(r2,g2,b2, R2,G2,B2, time) {
	let r1 = pubSkyOBJ.curClr_1[0];
	let g1 = pubSkyOBJ.curClr_1[1];
	let b1 = pubSkyOBJ.curClr_1[2];
	let R1 = pubSkyOBJ.curClr_2[0];
	let G1 = pubSkyOBJ.curClr_2[1];
	let B1 = pubSkyOBJ.curClr_2[2];
	SkyNumberTransition(r1, r2, time, 'curClr_1', 0);
	SkyNumberTransition(g1, g2, time, 'curClr_1', 1);
	SkyNumberTransition(b1, b2, time, 'curClr_1', 2);
	SkyNumberTransition(R1, R2, time, 'curClr_2', 0);
	SkyNumberTransition(G1, G2, time, 'curClr_2', 1);
	SkyNumberTransition(B1, B2, time, 'curClr_2', 2);
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