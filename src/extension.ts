import * as vscode from 'vscode';

const utils = {
    escapeShell(arg: string) {
        return '"' + arg.replace(/(["'$`\\])/g, '\\$1') + '"';
    },
};

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('nvim-edit.edit-file', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor.');
            return;
        }

        const filename = editor.document.fileName;
        const cursor = editor.selection.active;
        const configuration = vscode.workspace.getConfiguration('nvim-edit');

        // Creating a string to send to the terminal
        const terminalSendTextValueTemplate = configuration.get('terminalSendTextValue');
        const terminalSendTextValueTemplateFunction = new Function(
            'filename, cursor, utils',
            `return \`${terminalSendTextValueTemplate}\``,
        );
        const terminalSendTextValue = terminalSendTextValueTemplateFunction(
            filename,
            cursor,
            utils,
        );

        // Create a string for the terminal name.
        const terminalNameTemplate = configuration.get('terminalName');
        const terminalNameTemplateFunction = new Function(
            'filename, cursor, utils',
            `return \`${terminalNameTemplate}\``,
        );
        const terminalName = terminalNameTemplateFunction(filename, cursor, utils);

        // Other settings
        const terminalLocation = configuration.get('terminalLocation');
        const alwaysCreateNewTerminal = configuration.get('alwaysCreateNewTerminal');

        // Find or create terminal
        let terminal = vscode.window.terminals.find((terminal) => terminal.name === terminalName);
        if (!terminal || alwaysCreateNewTerminal) {
            terminal = vscode.window.createTerminal({
                name: terminalName,
                hideFromUser: false,
                location:
                    terminalLocation === 'Editor'
                        ? vscode.TerminalLocation.Editor
                        : vscode.TerminalLocation.Panel,
            });
        }

        terminal.show();
        terminal.sendText(terminalSendTextValue);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
