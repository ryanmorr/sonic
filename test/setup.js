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

export function append(html) {
    const frag = parseHTML(html);
    for (const child of frag.childNodes) {
        elements.push(child);
    }
    document.body.appendChild(frag);
}

export function testResults(results, expected) {
    if (typeof expected === 'string') {
        expected = Array.from(document.querySelectorAll(expected));
    }
    expect(results.length).to.be.above(0);
    expect(results).to.deep.equal(expected);
}
