import { stringify } from 'querystring';
import * as vscode from 'vscode';
import { Z_ASCII } from 'zlib';

export function activate(context: vscode.ExtensionContext) {
	function format(line: string, toFormat: string) {
		var arr = ["<" + toFormat + ">", 
				line.replace("#" + toFormat + " ", ""),
				"</" + toFormat + ">"];
		return arr;
	}

	console.log('It\'s alive');

	let disposable = vscode.commands.registerTextEditorCommand('dt-some.activate', (textEditor) => {
		var document = textEditor.document;
		var text = document.getText();
		var lines = text.split('\n');
		var newLines = Array();
		lines.forEach(line => {
			let begin = "", end = "";
			while (line.startsWith('#')) {
				if (line.startsWith('#uc ')) {
					line = line.replace('#uc ', '').toUpperCase();
				} else if (line.startsWith('#lc ')) {
					line = line.replace('#lc ', '').toLowerCase();
				} else if (line.startsWith('#b ')) {
					let toFormat = 'b';
					let arr = format(line, toFormat);
					begin = arr[0] + begin;
					line = arr[1];
					end = end + arr[2];
				} else if (line.startsWith('#u')) {
					let toFormat = 'u';
					let arr = format(line, toFormat);
					begin = arr[0] + begin;
					line = arr[1];
					end = end + arr[2];
				} else if (line.startsWith('#i')) {
					let toFormat = 'i';
					let arr = format(line, toFormat);
					begin = arr[0] + begin;
					line = arr[1];
					end = end + arr[2];
				} else if (line.startsWith('#h1')) {
					let toFormat = 'h1';
					let arr = format(line, toFormat);
					begin = arr[0] + begin;
					line = arr[1];
					end = end + arr[2];
				} else if (line.startsWith('#h2')) {
					let toFormat = 'h2';
					let arr = format(line, toFormat);
					begin = arr[0] + begin;
					line = arr[1];
					end = end + arr[2];
				}
			}
			newLines.push(begin + line + end);
		});
		text = "<body>\n" + newLines.join('<br>\n') + "\n</body>";
		console.log(text);
		
		var title = "<head>\n<title>" + document.fileName + "</title>\n</head>\n";

		textEditor.edit((editBuilder) => {
			var lastLine = document.lineAt(document.lineCount - 1);
		  
			var start = new vscode.Position(0, 0);
		  
			var end = new vscode.Position(document.lineCount - 1, lastLine.text.length);
			
			var range = new vscode.Range(start, end);
			
			editBuilder.delete(range);
			editBuilder.insert(start, "<html>\n" + title + text + "\n</html>");
		  });
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log('Done');
}
