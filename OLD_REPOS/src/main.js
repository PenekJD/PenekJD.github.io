
function AllLoaded() {
	let LoadingDiv = document.getElementById("LOADING_SCREEN");
	$(LoadingDiv).fadeOut(500);
}

function sFirstMeet(btn) {
	let UserName = btn.parentNode.parentNode.getElementsByTagName("input")[0].value+"";
	localStorage.setItem("username", UserName);
	PopUpBehavior();
}
function sSecMeet(btn) {
	PopUpBehavior();
}

window.onload = function() {
	AllLoaded();
	let UserName = localStorage.getItem("username");

	function FirstMeet() {
		let HiObj = {};
			HiObj.put1 = "Приветствую!";
			HiObj.put2 = "Как мне к Вам обращаться?";
			HiObj.put3 = "Подтвердить";
		PopUpContentGenerator(1, HiObj, false, 'jd_t_btn', 0, 'sFirstMeet');
	}
	function SecMeer() {
		let HiObj = {};
			HiObj.put1 = "Привет, "+UserName;
			HiObj.put2 = "С возвращением! :)";
			HiObj.put3 = "ОК";
		PopUpContentGenerator(2, HiObj, false, 'jd_t_btn', 0, 'sSecMeet');
	}
	setTimeout(function(){
		if (UserName==null || UserName==undefined || UserName=="") 
		{	FirstMeet();	} else {	SecMeer();		}
	}, 1000);

	StartSky();
	SkyRGBGradientChanger(20,69,101, 244,104,105, 10000);
}