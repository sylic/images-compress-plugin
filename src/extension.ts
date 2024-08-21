/*
 * @Author: 周星梅
 * @Date: 2024-08-19 20:49:51
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-21 22:21:26
 * @Description: .
 */
import * as vscode from 'vscode';
const fs = require('fs');

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('my-extension.test', (uri) => {
		const filePath = uri.path.substring(1);
		fs.stat(filePath, (err:any, stats:any) => {
			if (err) {
				console.error(err);
				return;
			}
			if (stats.isDirectory()) {  
				// 选中目录
				vscode.window.showInformationMessage("当前选中了目录，请选择图片！");
				console.log("🚢 ~选中目录 " );  
			}

			if (stats.isFile()) {
				let tempPath: string = filePath.toString();
				let lastFileLevelIndex:number = tempPath.lastIndexOf("/");
				let fileName: string = tempPath.substring(lastFileLevelIndex+1, tempPath.length);
				let suffix:string = `(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg)`;
				var regular = new RegExp(`.*\.${suffix}`);
				let isPic: boolean = regular.test(fileName);// 根据文件名匹配是否是图片
    			console.log("🚢 ~ 是否是图片 ~ isPic:", isPic);
			}
		});
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
