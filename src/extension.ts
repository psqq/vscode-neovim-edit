import * as vscode from 'vscode';

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

export function deactivate() { }
