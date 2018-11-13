var calculatSeize = function () {
    var BASE_FONT_SIZE = 100;
    var roat =1;
    var docEl = document.documentElement,
        clientWidth = docEl.clientWidth;
        clientHeight = docEl.clientHeight;
    if (!clientWidth) return;
    var html_font_size = BASE_FONT_SIZE * ((clientWidth*roat) / 750);
    docEl.style.fontSize = html_font_size+'px';
    if (html_font_size-parseFloat(getComputedStyle(docEl).fontSize)<0.01&&html_font_size-parseFloat(getComputedStyle(docEl).fontSize)>-0.01) {
        return;
    } 
    else {
        var again_html_font_size = html_font_size/(parseInt(getComputedStyle(docEl).fontSize)/html_font_size);
        docEl.style.fontSize = again_html_font_size + 'px';
    }
};
if (document.addEventListener) {
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, calculatSeize, false);
    document.addEventListener('DOMContentLoaded', calculatSeize, false);
    calculatSeize();
}