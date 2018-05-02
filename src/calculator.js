class Display {
    constructor(parent, state, config) {
        this.parent = parent;
        this.state = state;
        this.output = new config.Output();
        this.history = new config.History(this.state.history, (action) => this.dispatch(action));

        // creating dom
        this.dom = elt('div', { class: "" }, {},
            elt('div', { id: 'output'}, {}, this.output.dom),
            elt('div', { id: 'history' }, {}, this.history.dom),
            elt('div', { id: "buttons", class: "d-flex flex-row" }, {},
                elt('div', { id: 'standardButtons', class: "d-flex flex-column" }),
                elt('div', { id: 'arithmeticButtons', class: "d-flex flex-column" }),
                elt('div', { id: 'commandButtons', class: "d-flex flex-column" })
            )
        );

        this.appendButtons(config.standardButtons, '#standardButtons');
        this.appendButtons(config.arithmeticButtons, '#arithmeticButtons');
        this.appendButtons(config.commandButtons, '#commandButtons');

        this.setState(state);
        this.parent.appendChild(this.dom);
    }

    appendButtons (buttons, divClass) {
        for (let row of buttons) {
            let rowDom = elt('div', {}, {});
            for (let item of row) {
                rowDom.appendChild(item.dom);
                item.dom.addEventListener('click', (e) => {
                    item.setState(this.state, (action) => this.dispatch(action));
                });
            }
            this.dom.querySelector(divClass).appendChild(rowDom);
        }
    }

    setState(state) {
        this.state = state;
        this.output.setState(state);
        this.history.setState(state);
    }
    dispatch(action) {
        let state = updateState(this.state, action);
        this.setState(state);
    }
}

// output display
class Output {
    constructor () {
        this.dom = elt('ul', {class: "list-group list-group-flush"}, {}, 
            elt('li', {class: "list-group-item list-group-item-success"}, {}, '0'));
    }
    setState(state) {
        this.dom.querySelector('li').innerText = state.output;
    }
}

class History {
    constructor (history, dispatch) {
        this.dom = elt('ul', {class: "list-group list-group-flush"});
        this.dispatch = dispatch;
    }
    setState(state) {
        this.dom.innerText = '';
        this.appendHistory(state.history);
    }
    appendHistory(history) {
        for (let row of history) {
            this.dom.appendChild(elt('li', {
                class: "list-group-item list-group-item-light"
            }, {
                onclick: (e) => {
                    this.dispatch({
                        output: row.slice(0, row.search(/\s=.*/))
                    });
                }
            }, row));
        }
    }
}


function updateState(state, action) {
    return Object.assign({}, state, action);
}
