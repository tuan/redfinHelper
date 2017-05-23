var customCssClass = "tunguy-redfin-ext-hide";
var pushpinClass = "PushpinContent"; // as currently implemented on redfin page
var xoutSelector = "svg.xout-alt";
var googleMapView = document.querySelector(".GoogleMapView");
if (googleMapView) {
    // Initial processing
    setTimeout(function () {
        var list = googleMapView.querySelectorAll("." + pushpinClass);
        for (var i = 0; i < list.length; i++) {
            var element = list[i];
            processPin(element);
        }
    }, 5000);
    // setup watch
    var observer = new MutationObserver(function (mutations) {
        mutations
            .map(function (mutation) { return mutation.target; })
            .forEach(function (target) { return processPin(target); });
    });
    var config = { childList: true, subtree: true };
    observer.observe(googleMapView, config);
}
function processPin(target) {
    var xoutElements = target.querySelectorAll(xoutSelector + ", :scope > " + xoutSelector);
    if (xoutElements.length > 0) {
        for (var i = 0; i < xoutElements.length; i++) {
            var element = xoutElements[i];
            var pushpin = findAncestor(element, pushpinClass);
            if (pushpin) {
                pushpin.classList.add(customCssClass);
            }
        }
    }
    else {
        target.classList.remove(customCssClass);
    }
}
function findAncestor(element, cls) {
    while ((element = element.parentElement) && !element.classList.contains(cls))
        ;
    return element;
}
