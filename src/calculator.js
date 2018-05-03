function updateState({state}, action) {
    return {state: Object.assign({}, state, action)};
}

function updateStateHistory ({state, states}, action) {
    let newState =  Object.assign({}, state, action);
    states.push(newState);
    return {state: states.state, states};
}

class Display {
    constructor(parent, state, config) {
        this.parent = parent;
        this.state = state;
        this.states = new States(state);
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
        for (let row of concatted) {
            let tr = elt('tr', {});
            for (let item of row) {
                item.dom.addEventListener('click', (e) => {
                    item.setState(this.state, (action, statesWalkStep) => this.dispatch(action, statesWalkStep));
                });
                tr.appendChild(item.dom);
            }
            dom.appendChild(tr);
        }
    }

    setState(state) {
        this.state = state;
        console.log(state);
        this.output.setState(state);
        this.history.setState(state);
        console.log(`new state is: `, this.state);
    }
    dispatch(action, commands) {
        // action is state change, command is object with commands
        // {statesWalkStep} = integer: -1 = back in history, 1 is forward history
        if (action) {
            let {state} = updateState({state: this.state}, action);
            this.setState(state);
            this.states.push(state);
        } else {
            if (commands.statesWalkStep) {
                this.states.walk(commands.statesWalkStep);
                console.log(this.states);
                this.setState(this.states.state);
            }
        }
        console.log('states:', this.states);
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

// it's history output window
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


class States {
    constructor (firstState) {
        this.states = [firstState];
        this.at = 0;
    }
    get state() {
        return this.states[this.at];
    }
    // here step = -1 or +1, we are walking in history of states
    walk(step) {
        if (this.at + step < 0 || this.at + step >= this.states.length) {
            return;
        }
        this.at += step;
    }
    push(state) {
        let sliced = this.states.slice(0, this.at+1);
        sliced.push(state);
        this.at++;
        this.states = sliced;
    }
}
