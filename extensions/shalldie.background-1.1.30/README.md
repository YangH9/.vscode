# vscode-background

[![Version](https://vsmarketplacebadge.apphb.com/version/shalldie.background.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=shalldie.background)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/shalldie.background.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=shalldie.background)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating/shalldie.background.svg?style=flat-square)](https://vsmarketplacebadge.apphb.com/rating/shalldie.background.svg)
[![Build Status](https://img.shields.io/github/workflow/status/shalldie/vscode-background/ci?label=build&logo=github&style=flat-square)](https://github.com/shalldie/vscode-background/actions)

## Add a lovely background-image to your vscode.

GitHub: [https://github.com/shalldie/vscode-background](https://github.com/shalldie/vscode-background)

Vscode Market: [https://marketplace.visualstudio.com/items?itemName=shalldie.background](https://marketplace.visualstudio.com/items?itemName=shalldie.background)

## It looks like:

![](https://user-images.githubusercontent.com/9987486/40583705-7105dda8-61c6-11e8-935a-3c5d475a1eb1.gif)

## Warns 警告：

> **本插件是通过修改 vscode 的 css 文件的方式运行**
> 所以会在初次安装，或者 vscode 升级的时候，出现以下提示，请选择 【不再提示】:
>
> **This extension works by editting the vscode's css file.**
> So, a warning appears while the first time to install or vscode update. U can click the [never show again] to avoid it.

![](https://user-images.githubusercontent.com/9987486/40583926-b1fb5398-61ca-11e8-8271-4ac650d158d3.png)

This is the reason:

![](https://user-images.githubusercontent.com/9987486/40583775-91d4c8d6-61c7-11e8-9048-8c5538a32399.png)

## Config 配置项

| Name                      |      Type       | Description                                                                         |
| :------------------------ | :-------------: | :---------------------------------------------------------------------------------- |
| `background.enabled`      |    `Boolean`    | 插件是否启用 <br> Enable or disable this plugin                                     |
| `background.useDefault`   |    `Boolean`    | 是否使用默认图片 <br> Whether or not to use default images                          |
| `background.customImages` | `Array<String>` | 自定义图片 <br> Add your custom images                                              |
| `background.style`        |    `Object`     | 自定义样式 <br> Customize style                                                     |
| `background.styles`       | `Array<Object>` | 每个图片的独立样式 <br> Add custom Style for individual image.                      |
| `background.useFront`     |    `Boolean`    | 前景图/背景图。 在代码上面还是下面 <br> Set the image to front or back of your code |
| `background.loop`         |    `Boolean`    | 循环模式，会重复显示图片 <br> `loop` mode, may repeat your images                   |

## Notice 提示

**http** 协议的外链图片在当前版本不能使用(vscode 限制)，需要用 **https** 协议开头的外链地址。

You should use protocol **https** instead of **http** for the image, **http** is not support by vscode any more.

## Uninstall 卸载

    Set the config  {"background.enabled": false}  in settings.json, then uninstall the plugin.

    需要在 settings.json 中设置 {"background.enabled": false} ，然后再删除插件。如果直接删除插件会有遗留，就需要重装vscode，或者把插件装回来再执行该步骤。

### Q&A 常见问题:

---

    Q:How to remove [unsupported] tag?
    Q:怎么去除顶部的[不受信任]的标志？
    A:see here: https://github.com/lehni/vscode-fix-checksums

---

    Q:It seems that nothing happens after installing the extension?
    Q:安装完插件后，似乎没有反应？

    A:Make sure you have the administrator authority！！
    A:如果不能使用，请确保你有管理员权限！！

    A:In Mac, move `vscode` from `Download` to `Applications`.
    A:在 Mac 下，把 vscode 从 `下载` 移动到 `应用` 中

---

    Q:How to get the administrator authority?
    Q:怎么获取管理员权限呢？ =。=

    A:In windows,click right button on the vscode's icon,then check the [run with the administrator authority].
    A:在windows环境中，可以右键单击vscode的图标，选择【以管理员身份运行】。

---

    In ubuntu:[https://github.com/shalldie/vscode-background/issues/6](https://github.com/shalldie/vscode-background/issues/6).

    Press F1,and you can get it by enter **ext install background** in your vscode. (～￣ ▽ ￣)～
    <br />
    <br />
    你可以在 vscode 中，按下 F1，然后输入 **ext install background** 来下载她 (～￣ ▽ ￣)～

---

**Enjoy!**
