/**
 * Created by xc on 2017/2/23 0023.
 */
var lazyImg = [];

window.onload = function(){

    var aImages = document.images;
    for (var i in aImages) {
        if (aImages[i].nodeType == 1) {
            if (aImages[i].getAttribute("class") == "lazy") {
                lazyImg.push(aImages[i]);
            }
        }
    }
    lazyLoadImg(lazyImg);
};

var c = {   //Here the scroll event is diluted
    scrollFun: function(){
        window.removeEventListener('scroll', c.scrollFun, false);
        setTimeout(function(){
            lazyLoadImg(lazyImg);
            window.addEventListener('scroll', c.scrollFun, false);
        }, 500)
    }
};
window.addEventListener('scroll', c.scrollFun, false)

function lazyLoadImg(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i].getBoundingClientRect().top < document.documentElement.clientHeight && !arr[i].isLoad) {
            arr[i].isLoad = true;
            arr[i].style.cssText = "transition: ''; opacity: 0;"
            if (arr[i].dataset) {
                aftLoadImg(arr[i], arr[i].dataset.original);
            } else {
                aftLoadImg(arr[i], arr[i].getAttribute("data-original"));
            }
            (function (i) {
                setTimeout(function () {
                    arr[i].style.cssText = "transition: 1s; opacity: 1;"
                }, 16)
            })(i);
        }
    }
}

function aftLoadImg(obj, url) {
    var oImg = new Image();
    oImg.onload = function () {
        obj.src = oImg.src;
    }
    oImg.src = url;
}