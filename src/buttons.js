const emptySymbol = '␀';

class AbstractButton {
    constructor({value, innerValue}, attrs={class: 'btn btn-outline-primary'}, props={}) {
        this.value = value;
        this.innerValue = innerValue ? innerValue : value;
        this.dom = elt('button', attrs, props, this.value);
    }
    static empty() {
        return new AbstractButton({value: emptySymbol}, {class: 'btn btn-outline-primary, disabled: true', disabled: true});
    }
    setState(state, dispatch) {
        let output = state.output.slice();
        if (output.length === 0) {
            output = [{value: this.value, innerValue: this.innerValue}];
        } else {
            let lastOutput = output[output.length - 1];
            if (output[output.length - 1].innerValue.search(/(\d|\.)$/) !== -1 && this.innerValue.search(/(\d|\.)/) !== -1) {
            // if last output ends with . or digit
            output[output.length - 1] = {value: output[output.length - 1].value + this.value, 
                innerValue: output[output.length - 1].innerValue + this.innerValue};
            } else {
                output.push({value: this.value, innerValue: this.innerValue});
            }
        }
        console.log('output after', output);
        dispatch({output});
    }
}

class Button extends AbstractButton {}

class doButton extends AbstractButton {
    setState(state, dispatch) {
        let result;
        try {
            result = eval(state.output.map(e => {
                return e.innerValue;
            }).join(''));
            console.log(`result: ${result}`);
            if (!Number.isInteger(result)) result = result.toFixed(2);
        } catch (e) {
            result = `Error`;
        }
        let history = state.history.slice();
        history.pop();
        history.unshift({output: state.output, result: result});
        dispatch({output: [], history});
    }
}

class clearButton extends AbstractButton {
    setState(state, dispatch) {
        dispatch({output: []});
    }
}

class backspaceButton extends AbstractButton {
    setState(state, dispatch) {
        let output = state.output.slice();
        output.pop();
        dispatch({output});
    }
}