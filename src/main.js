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
        [new Button({value: "-"})],
        [new Button({value: "+"})],
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

const defaultState = {
    output: [],
    history: [emptyHistory, emptyHistory, emptyHistory, emptyHistory, emptyHistory]
};

let display = new Display(document.querySelector("#calculator"), defaultState, config);