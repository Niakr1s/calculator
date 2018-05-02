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
        let value;
        try {
            value = eval(state.output.map(e => {
                return e.innerValue;
            }).join(''));
            console.log(`result: ${value}`);
            if (!Number.isInteger(value)) value = value.toFixed(2);
        } catch (e) {
            value = `Error`;
        }
        value = value + "";
        let history = state.history.slice();
        history.pop();
        history.unshift({output: state.output, result: value});
        let output = value === "Error" || value === "0" ? [] : [{value: value, innerValue: value}];
        console.log(output);
        dispatch({output, history});
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