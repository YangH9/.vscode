# 支付宝小程序开发助手

详细文档请参考：[vscode-alipay-minicode](https://github.com/ant-mini-program/vscode-alipay-minicode)。

---

支付宝小程序开发助手。本扩展在 VS Code 内提供了以下能力：

- axml 组件和 snippets 的自动补全，并在 hover 时提供相应信息
  ![组件补全](https://gw.alipayobjects.com/mdn/rms_b84a32/afts/img/A*iGQ4QqJA1iQAAAAAAAAAAAAAARQnAQ)

- 提供支付宝小程序 API 的补全和 hover 提示
  ![JSApi 补全](https://gw.alipayobjects.com/mdn/rms_d70b9b/afts/img/A*We7nQ4gnx_EAAAAAAAAAAABkARQnAQ)

- 文件树右键可以快速新建小程序页面和组件
  ![新建页面](https://gw.alipayobjects.com/mdn/rms_b84a32/afts/img/A*f3sDTY2qNBIAAAAAAAAAAAAAARQnAQ)

- 支持修改 app.json 后自动创建新页面
- 提供小程序配置文件 JSON 补全和 hover 提示
- 提供 axml、acss 的高亮、语法检测、格式化

## 插件启动时机

插件只会在有效的小程序项目中启动，也就是说你的项目目录需要有以下文件之一：

- app.json
- app.js
- mini.project.json
- ext.json
- plugin.json

## 插件功能反馈

- 给我们提 issue：<https://github.com/ant-mini-program/vscode-alipay-minicode/issues>
