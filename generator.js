function PAGE_GENERATOR(src_frame, extra_params_array){
    inject_obj = document.getElementsByTagName('jdparams')[0];
    _NS_ = CreateScriptPage(src_frame);
    inject_obj.appendChild(_NS_);
}

function CreateScriptPage(src_frame){
    _NewScript_ = document.createElement('script');
    _NewScript_.src = ""+src_frame+"";
    return _NewScript_;
}

function MAIN_GENERATOR_STARTER(src_file) { 
    URL_GET_STRING = window.location.href+'';
    if (src_file==undefined || src_file=="") {
        main_param_string = "js_frame_1";
    } else { main_param_string = src_file; }
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

function GENERATE_EXTRA_HTML_DOC(injectblockid) {  
    GEN_DIV = document.createElement("div");
    GEN_DIV.innerHTML = _PUBLIC_MAIN_LOADER_HTML_DOC_;
    if (injectblockid==undefined || injectblockid=="") {
       document.body.appendChild(GEN_DIV);  
    } else {
        document.getElementById(injectblockid).innerHTML = _PUBLIC_MAIN_LOADER_HTML_DOC_;
    }
}

/* Page creation by parts */
MAIN_GENERATOR_STARTER('js_head_mp');
MAIN_GENERATOR_STARTER('js_frame_1');