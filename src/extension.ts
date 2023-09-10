// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('norg.helloWorld', () => {
		const filename = vscode.window.activeTextEditor?.document.fileName;
		if (!filename) {
			vscode.window.showInformationMessage('No filename for open');
			return;
		}
		let terminal = vscode.window.createTerminal({
			name: "nvim " + filename,
			hideFromUser: false
		});
		terminal.show();
		terminal.sendText('nvim ' + filename);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
