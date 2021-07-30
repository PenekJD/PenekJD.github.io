_PUBLIC_TITLE = "Добро пожаловать";

document.title = _PUBLIC_TITLE;

_PUBLIC_MAIN_LOADER_HTML_DOC_ = `
    <div class="main_grid_block" id="MAIN_PUBLIC_ID_1"></div>
    <div class="main_grid_block" id="MAIN_PUBLIC_ID_2"></div>
    <div class="main_grid_block" align="center">
        <div align="center" class="CONTAINER_MAIN_PAGE" id="MAIN_PUBLIC_ID_3"></div>
    </div>
`;
    GENERATE_EXTRA_HTML_DOC();

MAIN_GENERATOR_STARTER('js_frame_1');
MAIN_GENERATOR_STARTER('js_head_mp');
MAIN_GENERATOR_STARTER('js_main_news');