// Основные сведения о пустом шаблоне см. в следующей документации:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Для отладки кода на странице загрузите его в cordova-simulate либо в эмулятор или на устройство Android: запустите приложение, задайте точки останова. 
// , а затем запустите "window.location.reload()" в консоли JavaScript.

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Обработка событий приостановки и возобновления Cordova
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Платформа Cordova загружена. Выполните здесь инициализацию, которая требуется Cordova.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: Это приложение приостановлено. Сохраните здесь состояние приложения.
    };

    function onResume() {
        // TODO: Это приложение активировано повторно. Восстановите здесь состояние приложения.
    };


    document.getElementById("BTN_1").addEventListener('click', function () {
        var url_get = "https://penekjd.github.io/app/faq.html";
        var func_name = "frame_1_function";
        XML_HTTP_RQST(url_get, "FRAME_PUT", func_name);
    });

})();

/*
    Функции для прогрузки первого фрейма
 */
function frame_1_function() {
    document.getElementById("INTRO_TABLE").style.display = "none";
}

/*
    Отправка запроса и получения ответа
 */
function XML_HTTP_RQST(url_get, div_id, func_name) {
    var XMLRQST = new XMLHttpRequest();
    XMLRQST.open('GET', url_get, true);
    XMLRQST.onload = function (e) {
        if (XMLRQST.status === 200) {
            document.getElementById(div_id).innerHTML = XMLRQST.responseText;
            window[func_name]();
        } else {
            alert("No response at XMLHttpRequest: Status = " + XMLRQST.status);
        }
    }
    XMLRQST.send();
}
