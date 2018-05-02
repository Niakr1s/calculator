const config = {
    Output,
    History,
    standardButtons: [
        [new Button({value: "7"}), new Button({value: "8"}), new Button({value: "9"})],
        [new Button({value: "4"}), new Button({value: "5"}), new Button({value: "6"})],
        [new Button({value: "1"}), new Button({value: "2"}), new Button({value: "3"})],
        [AbstractButton.empty(), new Button({value: "0"}), new Button({value: "."})],
    ],
    arithmeticButtons: [
        [new Button({value: ":", innerValue: "/"}), new Button({value: "%"})],
        [new Button({value: "x", innerValue: "*"}), new Button({value: "^", innerValue: "**"})],
        [new Button({value: "-"}), new FunctionButton({value: "√", innerValue: Math.sqrt})],
        [new Button({value: "+"}), new FunctionButton({value: "1/x", innerValue: (x) => 1 / x})],
    ],
    commandButtons: [
        [new clearButton({value: "C"}), new backspaceButton({value: "←"})],
        [new Button({value: "("})],
        [new Button({value: ")"})],
        [new doButton({value: "="})]
    ],
};

const emptyHistory = {
    output: [],
    result: ''
};

makeHistory = (max) => {
    let history = new Array(max);
    history.fill(emptyHistory);
    return history;
};

const defaultState = {
    output: [],
    history: makeHistory(5)
};

let display = new Display(document.querySelector("#calculator"), defaultState, config);