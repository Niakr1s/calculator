const config = {
    Output,
    History,
    buttons: 
    {
        trigonometryButtons: [
            [new ConstantButton({value: "pi", innerValue: Math.PI+""})],
            [new FunctionButton({value: "sin", innerValue: (x) => Math.sin(x)})],
            [new FunctionButton({value: "cos", innerValue: (x) => Math.cos(x)})],
            [new FunctionButton({value: "tan", innerValue: (x) => Math.tan(x)})]
        ],
        standardButtons: [
            [new NumberButton({value: "7"}), new NumberButton({value: "8"}), new NumberButton({value: "9"})],
            [new NumberButton({value: "4"}), new NumberButton({value: "5"}), new NumberButton({value: "6"})],
            [new NumberButton({value: "1"}), new NumberButton({value: "2"}), new NumberButton({value: "3"})],
            [new FunctionButton({value: "±", innerValue: (x) => -x}), new NumberButton({value: "0"}), new NumberButton({value: "."})],
        ],
        arithmeticButtons: [
            [new Button({value: "/"})],
            [new Button({value: "x", innerValue: "*"})],
            [new Button({value: "-"})],
            [new Button({value: "+"})],
        ],
        arithmeticButtons2: [
            [new Button({value: "%"})],
            [new Button({value: "^", innerValue: "**"})],
            [new FunctionButton({value: "√", innerValue: Math.sqrt})],
            [new FunctionButton({value: "1/x", innerValue: (x) => 1 / x})],
        ],
        commandButtons: [
            [new clearButton({value: "C"}), new backspaceButton({value: "←"})],
            [new HistoryButton({value: '↶', innerValue: '-1'}), new HistoryButton({value: '↷', innerValue: '1'})],
            [new Button({value: ")"}), new Button({value: "("})],
            [new doButton({value: "="})]
        ],
    }
};

const emptyHistory = {
    output: [],
    result: '',
};

makeHistory = (max) => {
    let history = new Array(max);
    history.fill(emptyHistory);
    return history;
};

const defaultState = {
    output: [],
    history: makeHistory(5),
};

let display = new Display(document.querySelector("#calculator"), defaultState, config);