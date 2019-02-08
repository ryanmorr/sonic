const elements = [];

afterEach(() => {
    elements.forEach((el) => {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });
});

function parseHTML(html) {
    const frag = document.createDocumentFragment();
    const div = document.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) {
        frag.appendChild(div.firstChild);
    }
    return frag;
}

export function append(html, expected) {
    const frag = parseHTML(html);
    for (const child of frag.childNodes) {
        elements.push(child);
    }
    document.body.appendChild(frag);
    if (expected) {
        return document.querySelectorAll(expected);
    }
}
