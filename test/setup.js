const html = `
    <section id="group-1">
        <div id="element-1" class="class1 class2 class3" attr="value" attr2="some random text" lang="en-us"></div>
        <div>
            <span foo></span>
            <span></span>
            <span foo></span>
            <span foo></span>
        </div>
        <div foo>
            <div foo></div>
            <i foo></i>
            <em></em>
            <span></span>
            <span foo></span>
            <div foo></div>
        </div>
        <div class="class1 class2" lang="en-us"></div>
    </section>
    <section id="group-2">
        <h1>Top Heading</h1>
        <section>
            <h1>Sub Heading</h1>
        </section>
        <div foo></div>
        <ul class="list">
            <li class="list-item"></li>
            <li class="list-item"></li>
            <li class="list-item"></li>
            <li class="list-item"></li>
            <li class="list-item"></li>
        </ul>
        <div attr="value" attr2="some random text"></div>
        <span attr2="some random text"></span>
        <div class="class1 class2"></div>
    </section>
    <section id="group-3">
        <form>
            <input type="checkbox" checked />
            <input type="checkbox" checked />
            <input type="checkbox" />
            <input type="text" disabled />
        </form>
    </section>
`;

// Populate the DOM with test markup
document.body.innerHTML = html;

// Export contextual elements
export const body = document.body;
export const group1 = document.querySelector('#group-1');
export const group2 = document.querySelector('#group-2');
export const group3 = document.querySelector('#group-3');
export const element1 = document.querySelector('#element-1');
