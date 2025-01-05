import * as vscode from 'vscode';
import fs from 'fs';
import { converSize, } from "./utils";
import sharp from "sharp";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('my-extension.test', (uri) => {

    const filePath = uri.path.substring(1);
    fs.stat(filePath, async (err: any, stats: any) => {
      if (err) {
        console.error(err);
        return;
      }
      if (stats.isDirectory()) {
        // 选中目录 todo 批量压缩
        vscode.window.showInformationMessage("当前选中了目录，请选择图片！");
      }
      if (stats.isFile()) {
        let tempPath: string = filePath.toString();
        let lastFileLevelIndex: number = tempPath.lastIndexOf("/");// 从后向前匹配
        let fileName: string = tempPath.substring(lastFileLevelIndex + 1, tempPath.length);
        let suffix: string = `(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg)`;
        var regular = new RegExp(`.*\.${suffix}`, "ig"); // 忽略大小写
        let isPic: boolean = regular.test(fileName);// 根据文件名匹配是否是图片
        if (!isPic) { return; }
        vscode.window.showInformationMessage(`选中图片：${fileName},压缩前图片大小：${converSize(stats.size)}`);
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.log("读文件发生异常:", err);
            return;
          }
          sharp(fileName)
            .resize(1000)
            .jpeg({ quality: 80 });
        });

      }
    });
  });
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
