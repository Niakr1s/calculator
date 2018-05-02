function elt(type, attrs, props, ...children) {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        if (typeof child != "string") dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
    }
    return dom;
}