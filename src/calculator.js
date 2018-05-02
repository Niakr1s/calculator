class Display {
    constructor(parent, state, config) {
        this.parent = parent;
        this.state = state;
        this.output = new config.Output();
        this.history = new config.History(this.state.history, 
            (action) => this.dispatch(action));

        // creating dom
        this.dom = elt('div', {}, {}, elt('br', {}),
            elt('div', { id: 'history' }, {}, this.history.dom), elt('br', {}),
            elt('div', { id: 'output'}, {}, this.output.dom), elt('br', {}),
            elt('div', { id: "buttons", class: "d-inline-flex justify-content-start" }, {})
        );

        this.appendButtons(config.buttons, '#buttons');

        // this.dom.querySelector('#buttons').appendChild(elt('div', { id: 'history' }, {}, this.history.dom));

        // this.setState(state);
        this.parent.appendChild(this.dom);
    }

    appendButtons(buttons, divClass) {
        for (let [type, bigCol] of Object.entries(buttons)) {
            let col = elt('table', {class: "", id: type});
            for (let row of bigCol) {
                let rowDom = elt('tr', {}, {});
                for (let item of row) {
                    rowDom.appendChild(elt('td', {}, {}, item.dom));
                    item.dom.addEventListener('click', (e) => {
                        item.setState(this.state, (action) => this.dispatch(action));
                    });
                }
                col.appendChild(rowDom);
            }
            this.dom.querySelector(divClass).appendChild(elt('div', {}, {}, col));
        }
        
    }

    setState(state) {
        this.state = state;
        this.output.setState(state);
        this.history.setState(state);
        console.log(`NEW STATE IS, `, this.state);
    }
    dispatch(action) {
        let state = updateState(this.state, action);
        this.setState(state);
    }
}

// output display
class Output {
    constructor () {
        this.dom = elt('ul', {class: "list-group list-group-flush w-75"}, {}, 
            elt('li', {class: "list-group-item list-group-item-success"}, {}, '0'));
    }
    setState(state) {
        if (state.output.length === 0) {
            this.dom.querySelector('li').innerText = '0';
            return;
        } else {
            this.dom.querySelector('li').innerText = state.output.map(e => {
                return e.innerValue;
            }).join(' ');
        }
    }
}

class History {
    constructor (history, dispatch) {
        this.dom = elt('ul', {class: "list-group"});
        this.appendHistory(history);
        this.dispatch = dispatch;
    }
    setState(state) {
        this.dom.innerText = '';
        this.appendHistory(state.history);
    }
    appendHistory(history) {
        for (let item of history) {
            this.dom.appendChild(elt('li', {
                class: "list-group-item list-group-item-light w-75"
            }, {
                onclick: (e) => {
                    this.dispatch({
                        output: item.output
                    });
                }
            }, `${item.output.map(e => e.value).join(' ')} = ${item.result}`));
        }
    }
}


function updateState(state, action) {
    return Object.assign({}, state, action);
}