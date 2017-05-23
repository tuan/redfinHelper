const customCssClass = "tunguy-redfin-ext-hide";
const pushpinClass = "PushpinContent"; // as currently implemented on redfin page
const xoutSelector = "svg.xout-alt";

const googleMapView = document.querySelector(".GoogleMapView");

if (googleMapView) {
    // setup watch
    let observer = new MutationObserver(mutations => {
        mutations
            .map(mutation => mutation.target as Element)
            .forEach(target => processPin(target));
    });

    let config = { childList: true, subtree: true };

    observer.observe(googleMapView, config);
}

function processPin(target: Element) {
    const xoutElements = target.querySelectorAll(`${xoutSelector}, :scope > ${xoutSelector}`);
    if (xoutElements.length > 0) {
        for (let i = 0; i < xoutElements.length; i++) {
            const element = xoutElements[i];
            const pushpin = findAncestor(element, pushpinClass);

            if (pushpin) {
                pushpin.classList.add(customCssClass);
            }
        }
    } else {
        target.classList.remove(customCssClass);
    }
}

function findAncestor(element: Element, cls: string) {
    while ((element = element.parentElement) && !element.classList.contains(cls));
    return element;
}