# Office Viewer

## 介绍

该扩展在vscode内集成[Vditor](https://github.com/Vanessa219/vditor)(针对VSCode做了些[兼容性改动](https://github.com/vscode-ext-studio/vditor)), 实现了对markdown的所见即所得编辑, 相比typora的优缺点:

- 开源免费无广告无隐私追踪 (如果对你有帮助考虑点下star(●'◡'●))
- vscode内置了git, 创建一个git仓库就可以对markdown进行版本管理
- 支持多窗口打开markdown (typora只支持mac)
- 相比typora的缺点: 对代码块和图形支持不友好.

扩展名字叫做Office Viewer因为最初是为了增强VSCode的预览功能, 增加了Excel, svg, pdf等的支持, 后来才增加markdown编辑器, 同时为了精简本人安装的扩展, 集成了一个文件主题和颜色主题.

使用说明:

- 编辑方式: 直接通过vscode打开md文件.
- 通过Ctrl+单击或者双击可打开超链接.
- 配置`vscode-office.autoTheme": false`可将编辑器设置为亮白色.
- 通过右键菜单可以导出为html, pdf和docx.
- 点击以下按钮可打开VSCode内置编辑器.
  ![img](image/README-CN/1640579182342.png)
- 点击以下按钮可将Markdown导出为PDF, 需要机器上有安装Chrome或Edge, 可通过配置`vscode-office.chromiumPath`指定浏览器位置.
  ![img](image/README-CN/1640579380584.png)

## 其他功能

- 文件主题: 内置了Material Icon Theme部分icon
- Excel: 支持对xlsx, csv等excel文件进行预览和保存(注意xlsx保存会丢失格式, csv则不支持gbk中文)
- html: 编辑HTML的过程中按下ctrl+shift+v可实时预览.
- Pdf: 支持直接预览pdf文件
- http: 用于发送http请求, 由于REST Client本地请求有bug, 修改后进行集成.
