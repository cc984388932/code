function resize() {
    var clientWidth = document.documentElement.clientWidth;
    clientWidth = clientWidth >= 640 ? 640 : clientWidth;	
    /*  设计图做成750px的  */
    document.documentElement.style.fontSize = 100 * (clientWidth / 750) + 'px';
}
resize();
window.addEventListener('resize', resize);