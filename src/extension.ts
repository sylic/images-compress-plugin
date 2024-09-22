import * as vscode from 'vscode';
import fs from 'fs';
import { converSize, } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('my-extension.test', (uri) => {

    const filePath = uri.path.substring(1);
    fs.stat(filePath, async (err: any, stats: any) => {
      if (err) {
        console.error(err);
        return;
      }
      if (stats.isDirectory()) {
        // 选中目录
        vscode.window.showInformationMessage("当前选中了目录，请选择图片！");
      }
      if (stats.isFile()) {
        let tempPath: string = filePath.toString();
        let lastFileLevelIndex: number = tempPath.lastIndexOf("/");// 从后向前匹配
        let fileName: string = tempPath.substring(lastFileLevelIndex + 1, tempPath.length);
        console.log(`选中${fileName},压缩前图片大小：${converSize(stats.size)}`);
        let suffix: string = `(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg)`;
        var regular = new RegExp(`.*\.${suffix}`);
        let isPic: boolean = regular.test(fileName);// 根据文件名匹配是否是图片
        //压缩
        // let file = await compressImage(stats);
        // console.log(file);
      }
    });
  });
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
