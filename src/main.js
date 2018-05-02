const config = {
    Output,
    History,
    standardButtons: [
        [new Button("7"), new Button("8"), new Button("9")],
        [new Button("4"), new Button("5"), new Button("6")],
        [new Button("1"), new Button("2"), new Button("3")],
        [AbstractButton.empty(), new Button("0"), new Button(".")],
    ],
    arithmeticButtons: [
        [new Button("/"), new Button("%")],
        [new Button("*"), new Button("**")],
        [new Button("-")],
        [new Button("+")],
    ],
    commandButtons: [
        [new clearButton('C'), new backspaceButton('←')],
        [new Button("(")],
        [new Button(")")],
        [new doButton('=')]
    ],
};

const defaultState = {
    output: '0',
    history: ['0', '0', '0', '0', '0']
};

let display = new Display(document.querySelector("#calculator"), defaultState, config);