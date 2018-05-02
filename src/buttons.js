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
        let newOutput = state.output === '0' ? this.value : 
            state.output.search(/\d$/) !== -1 && this.value.search(/\d$/) !== -1 ? `${state.output}${this.value}` : `${state.output} ${this.value}` ;
        dispatch({output: newOutput});
        
    }
}

class Button extends AbstractButton {}

class doButton extends AbstractButton {
    setState(state, dispatch) {
        let result = `${state.output} = ${eval(state.output)}`;
        let history = state.history.slice();
        history.unshift(result);
        history.pop();
        dispatch({output: '0', history: history});
    }
}

class clearButton extends AbstractButton {
    setState(state, dispatch) {
        dispatch({output: '0'});
    }
}