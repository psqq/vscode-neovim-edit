import * as vscode from 'vscode';

const utils = {
	escapeShell(arg: string) {
		return '"'+arg.replace(/(["'$`\\])/g,'\\$1')+'"';
	},
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('nvim-edit.edit-file', () => {
		const editor = vscode.window.activeTextEditor
		if (!editor) {
			vscode.window.showInformationMessage('No active editor.');
			return;
		}
		const filename = editor.document.fileName;
		const cursor = editor.selection.active;
		const configuration = vscode.workspace.getConfiguration('nvim-edit');
		const terminalSendTextValueTemplate = configuration.get('terminalSendTextValue');
		const templateFunction = new Function(
			'filename, cursor, utils',
			`return \`${terminalSendTextValueTemplate}\``
		);
		const terminalSendTextValue = templateFunction(filename, cursor, utils);

		const terminalLocation = configuration.get('terminalLocation');
		let terminal = vscode.window.createTerminal({
			name: "nvim " + filename,
			hideFromUser: false,
			location: terminalLocation === 'Editor' ? vscode.TerminalLocation.Editor : vscode.TerminalLocation.Panel,
		});

		terminal.show();
		terminal.sendText(terminalSendTextValue);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
