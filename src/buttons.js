const emptySymbol = '␀';

class AbstractButton {
    constructor(value, attrs={class: 'btn btn-outline-primary'}, props={}) {
        this.value = value;
        this.dom = elt('button', attrs, props, this.value);
    }
    static empty() {
        return new AbstractButton(emptySymbol, {class: 'btn btn-outline-primary, disabled: true', disabled: true});
    }
    setState(state, dispatch) {
        let newOutput = state.output === '0' ? 
            this.value : state.output.search(/(\d|\.)$/) !== -1 && this.value.search(/(\d|\.)$/) !== -1 ? 
                `${state.output}${this.value}` : `${state.output} ${this.value}` ;
        dispatch({output: newOutput});
    }
}

class Button extends AbstractButton {}

class doButton extends AbstractButton {
    setState(state, dispatch) {
        let result;
        try {
            result = eval(state.output);
            if (!Number.isInteger(result)) result = result.toPrecision(2);
        } catch (e) {
            result = `Error`;
        }
        let history = state.history.slice();
        history.unshift(`${state.output} = ${result}`);
        history.pop();
        dispatch({output: '0', history: history});
    }
}

class clearButton extends AbstractButton {
    setState(state, dispatch) {
        dispatch({output: '0'});
    }
}

class backspaceButton extends AbstractButton {
    setState(state, dispatch) {
        let output = state.output.slice(0, state.output.search(/\s*\S$/));
        if (output.length === 0) output = '0';
        dispatch({output});
    }
}