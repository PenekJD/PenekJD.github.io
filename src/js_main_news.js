MAIN_GENERATOR_STARTER('mainnews');

_PUBLIC_MAIN_LOADER_HTML_DOC_ = `
    <div class="NEWS_CONTAINER_CLASS" id="NEWS_CONTAINER"></div>
`;
    GENERATE_EXTRA_HTML_DOC('MAIN_PUBLIC_ID_3');


setTimeout( function(){
    INJECT_NEWS = document.getElementById("NEWS_CONTAINER");  
    for (a=0; a<_PUB_DB_NEWS_.length; a++) {
        N_TITLE = _PUB_DB_NEWS_[a].title;
        N_CONTENT = _PUB_DB_NEWS_[a].content;
        N_PIC_URL = _PUB_DB_NEWS_[a].pic_url;
        NewsBlock = document.createElement('div');
        NewsBlock.innerHTML = `
            <div align="left" class="NEWS_BLOCK_DIV">
                <div style="font-weight:bold;">`+N_TITLE+`</div>
                <br>
                <div style="font-weight:normal;">`+N_CONTENT+`</div>
            </div>
        `;
        INJECT_NEWS.appendChild(NewsBlock);
    }
}, 100);