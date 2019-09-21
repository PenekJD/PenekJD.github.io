MAIN_GENERATOR_STARTER('mainnews');

_PUBLIC_MAIN_LOADER_HTML_DOC_ = `
    <div class="NEWS_CONTAINER_CLASS" id="NEWS_CONTAINER" align="center"></div>
`;
    GENERATE_EXTRA_HTML_DOC('MAIN_PUBLIC_ID_3');


function GENERATE_NEWS(_PUB_DB_NEWS_, INJECT_NEWS) { 
    for (a=0; a<_PUB_DB_NEWS_.length; a++) {
        N_TITLE = _PUB_DB_NEWS_[a].title;
        N_CONTENT = _PUB_DB_NEWS_[a].content;
        N_PIC_URL = _PUB_DB_NEWS_[a].pic_url;
        NewsBlock = document.createElement('div');
        NewsBlock.innerHTML = `
            <div align="left" class="NEWS_BLOCK_DIV">
                <div class="NC_TITLE" style="font-weight:bold;"><h2>`+N_TITLE+`</h2></div>
                <div class="NC_CONTENT" style="font-weight:normal;">`+N_CONTENT+`</div>
            </div>
        `;
        INJECT_NEWS.appendChild(NewsBlock);
    }
}

function AddNewsByPublic(id_element) {
    INJECT_NEWS = document.getElementById(id_element);  
    _call_it = true;
    function Call_1() {
        try { _ARRAY_NEWS_ = _PUB_DB_NEWS_; }catch(no) { _ARRAY_NEWS_=undefined; }
        if (_ARRAY_NEWS_==undefined) {
            Call_2();
        } else {
            _call_it = false;
            GENERATE_NEWS(_ARRAY_NEWS_, INJECT_NEWS);
        }
    }
    function Call_2() {
        setTimeout(function() {
            if (_call_it==true) { Call_1(); }
        }, 50);
    }
    Call_1();
}

AddNewsByPublic('NEWS_CONTAINER');