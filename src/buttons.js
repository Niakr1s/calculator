const emptySymbol = '␀';
const TOFIXED = 5;
const DEFAULTbutton = '';

class AbstractButton {
    constructor({value, innerValue}, attrs={class: DEFAULTbutton}, props={}) {
        this.value = value;
        this.innerValue = innerValue ? innerValue : value;
        this.dom = elt('td', attrs, props, this.value);
    }
    static empty() {
        return new AbstractButton({value: emptySymbol}, {class: DEFAULTbutton, disabled: true});
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

class NumberButton extends AbstractButton {}

class Button extends AbstractButton {
    setState(state, dispatch) {
        let output = state.output.slice();
        console.log(output);
        if (output.length !== 0 && Number.isNaN(+output[output.length - 1].innerValue)) return;
        else super.setState(state, dispatch);
    }
}

class doButton extends AbstractButton {
    setState(state, dispatch) {
        let value;
        try {
            value = eval(state.output.map(e => {
                return e.innerValue;
            }).join(''));
            console.log(`result: ${value}`);
            if (!Number.isInteger(value)) value = value.toFixed(TOFIXED);
        } catch (e) {
            value = `Error`;
        }
        value = value + "";
        let history = state.history.slice();
        history.shift();
        history.push({output: state.output, result: value});
        let output = Number.isNaN(+value) || +value === Infinity || value === "0" ? [] : [{value: value, innerValue: value}];
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

class HistoryButton extends AbstractButton {
    // here innerValue can be -1 or 1 to step back or forward history
    setState(state, dispatch) {
        dispatch(undefined, {statesWalkStep: +this.innerValue});
    }
}

class FunctionButton extends AbstractButton {
    // here innerValue is function
    setState (state, dispatch) {
        if (state.output.length === 0) return;
        let output = state.output.slice();
        let result = this.innerValue(+output[output.length - 1].innerValue);
        if (Number.isNaN(+result)) return;
        result = !Number.isInteger(result) ? result.toFixed(TOFIXED) : result;
        output[output.length - 1].value = output[output.length - 1].innerValue = result + "";
        dispatch({output});
    }
}

class ConstantButton extends AbstractButton {
    setState(state, dispatch) {
        let output = state.output.slice();
        if (output.length === 0 || Number.isNaN(+output[output.length - 1].innerValue)) {
            output.push({value: this.value, innerValue: this.innerValue});
            dispatch({output});
        }
    }
}