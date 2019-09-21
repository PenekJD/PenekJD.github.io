function PAGE_GENERATOR(src_frame, extra_params_array){
    main_obj_params = document.getElementsByTagName('jdparams')[0];
    _NS_ = CreateScriptPage(src_frame);
    main_obj_params.appendChild(_NS_);
}

function CreateScriptPage(src_frame){
    _NewScript_ = document.createElement('script');
    _NewScript_.src = ""+src_frame+"";
    return _NewScript_;
}

function MAIN_GENERATOR_STARTER() {
    URL_GET_STRING = window.location.href+'';
    main_param_string = "js_frame_1";
    extra_params_array = [];
    _Values_ = URL_GET_STRING.split('?');
    if (_Values_.length>1) {
        _Values_ = _Values_[1];
        _Values_ = _Values_.split('&');
        for (a=0; a<_Values_.length; a++) {
            try { ParName = _Values_[a].split('=')[0]; } catch(no) { ParName = ""; }
            try { ParValue = _Values_[a].split('=')[1]; } catch(no) { ParValue = ""; }
            if (ParName=="docname") { 
                main_param_string = ParValue;  
            } else {
                main_param_string = "js_frame_1";
            }
        }
    }
    PAGE_GENERATOR('src/'+main_param_string+'.js', extra_params_array);
}

MAIN_GENERATOR_STARTER();

function GENERATE_EXTRA_HTML_DOC() {
    GEN_DIV = document.createElement("div");
    GEN_DIV.innerHTML = _PUBLIC_MAIN_LOADER_HTML_DOC_;
    document.body.appendChild(GEN_DIV);    
}