class Display {
    constructor(parent, state, config) {
        this.parent = parent;
        this.state = state;
        this.output = new config.Output();
        this.history = new config.History(this.state.history, 
            (action) => this.dispatch(action));

        // creating dom
        this.dom = elt('div', {class: "display"}, {}, 
            elt('p', {style: "text-align: center"}, {}, 'Супер простой калькулятор'), elt('br', {}),
            this.history.dom,
            elt('div', { id: 'output'}, {}, this.output.dom), elt('br', {}),
            elt('table', { id: "buttons" }, {})
        );

        this.appendButtons(config.buttons, this.dom.querySelector('#buttons'));

        // this.dom.querySelector('#buttons').appendChild(elt('div', { id: 'history' }, {}, this.history.dom));

        // this.setState(state);
        this.parent.appendChild(this.dom);
    }

    appendButtons(buttons, dom) {
        let concatted = [];
        Object.values(buttons).map((block) => {
            block.map((row, i) => {
                if (concatted[i]) concatted[i] = concatted[i].concat(row);
                else concatted.push(row);
            });
        });
        console.log(concatted);
        for (let row of concatted) {
            let tr = elt('tr', {});
            for (let item of row) {
                item.dom.addEventListener('click', (e) => {
                    item.setState(this.state, (action) => this.dispatch(action));
                });
                tr.appendChild(item.dom);
            }
            console.log(tr);
            console.log(dom);
            dom.appendChild(tr);
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
        this.dom = elt('p', {}, {}, '0');
    }
    setState(state) {
        if (state.output.length === 0) {
            this.dom.innerText = '0';
            return;
        } else {
            this.dom.innerText = state.output.map(e => {
                return e.innerValue;
            }).join(' ');
        }
    }
}

class History {
    constructor (history, dispatch) {
        this.dom = elt('div', {id: "history"});
        this.appendHistory(history);
        this.dispatch = dispatch;
    }
    setState(state) {
        this.dom.innerText = '';
        this.appendHistory(state.history);
    }
    appendHistory(history) {
        for (let item of history) {
            this.dom.appendChild(elt('p', {}, {
                onclick: (e) => {
                    this.dispatch({
                        output: item.output
                    });
                }
            }, item.output.length === 0 ? '' : `${item.output.map(e => e.value).join(' ')} = ${item.result}`));
        }
    }
}


function updateState(state, action) {
    return Object.assign({}, state, action);
}