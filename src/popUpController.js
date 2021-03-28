function PopUpBehavior(noBlur) {
	let PopUp = document.getElementById("POPUP_WINDOWS_BLOCK");
	let Content = document.getElementById("MAIN_CONTENT_BLOCK");
	let Status = PopUp.getAttribute("status");
	let CClassName = Content.getAttribute("class");
	let PClassName = PopUp.getAttribute("class");
	if (Status=="opened") {
		CClassName = CClassName.replace(" blury", "");
		PClassName = PClassName+" hidden";
		PopUp.setAttribute("status", "");
		$(PopUp).fadeOut(300);
	} else {
		if (noBlur!=true) {
			CClassName = CClassName+" blury";
		}
		PClassName = PClassName.replace(" hidden", "");
		PopUp.setAttribute("status", "opened");
		$(PopUp).fadeIn(300);
	}
	Content.setAttribute("class", CClassName);
	PopUp.setAttribute("class", PClassName);
}


function PopUpContentGenerator(template, obj, noBlur, elementClass, elemNum, eLisFunc) {
	let PopUp = document.getElementById("POPUP_WINDOWS_BLOCK");
	let templates = document.getElementById("TEMPLATES").getElementsByTagName("jdtemplate");
	let GetTemplate = templates[0];
	if (template!=undefined && template!="" && templates!=null) {
		try { GetTemplate = templates[template]; } catch(no) {	GetTemplate = templates[0];	}
	}
	for (key in obj) {
		putHere = GetTemplate.getElementsByTagName(key)[0];
		putHere.innerHTML = obj[key];
	}
	PopUp.innerHTML = GetTemplate.innerHTML;
	PopUpBehavior(noBlur);

	if (elementClass!=undefined && elementClass!=null && elementClass!="") {
		let Elem = PopUp.getElementsByClassName(elementClass)[elemNum];
		Elem.addEventListener("click", function(){
			window[eLisFunc](this);
		});
	}
}
