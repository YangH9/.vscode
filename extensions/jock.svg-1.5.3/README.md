# svg

A Powerful SVG Language Support Extension.
Almost all the features you need to handle SVG.

## Caution

**There have been multiple reports that the minimization feature may break your SVG, and we are still looking for a better library replacement for SVGO, so back up your SVG documentation when using the minimize feature.**

## Pause update announcements

SVG extensions have been available for 6 years.

Based on this version developed with the base code 4 years ago is already older and cannot use newer technologies.

I'm pausing the update for now, will wait until I have time for a third rewrite.

You can keep Issus, but there won't be a quick response.

We look forward to your continued support.

2023.4.15

## Features

### SVG Full Auto Completion

![feature 1](https://github.com/lishu/vscode-svg2/raw/HEAD/images/f1s.gif)

> Tip: All Completion list is context, will only show enable items.

### Document Symbol tree

![feature 2](https://github.com/lishu/vscode-svg2/raw/HEAD/images/f3.png)

### SVG Live Preview and Export PNG

![feature 3](https://github.com/lishu/vscode-svg2/raw/HEAD/images/f2s.gif)

### MDN Reference for fast learn

![feature 4](https://github.com/lishu/vscode-svg2/raw/HEAD/images/f3s.gif)

> Tip: Configure Trusted Domains add MDN to it get more fast action.

### Fast Color Picker

![feature 4](https://github.com/lishu/vscode-svg2/raw/HEAD/images/f4s.gif)

### Rename Tag Name or Id Reference

Cursor in Tag Name or Id Attribute or url(#id) Hit F2(Windows) Key, Rename it!

### In Id Reference Click Goto id="" element

Hot Ctrl Key and Move mouse to a url(#id), That it!

### SVG Format Support

Default formatting support is HTML Language Serivce for compatible with complex svg content

### Minify SVG with SVGO

Open the **Command Palette** (`⇧⌘P` on Mac and `Ctrl+Shift+P` on Win/Linux) and run `Minify SVG`. This will reduce the filesize significantly by removing all unnecessary code from the image.

## Contributors

* [Laurent Tréguier](https://github.com/LaurentTreguier) for sharing SVG formatting features
* [Björn Ganslandt](https://github.com/Ansimorph) for sharing Minify SVG features
* [Amelia Bellamy-Royds](https://github.com/AmeliaBR) for Add the xmlns and xmlns:xlink attributes
* [Evan Demaris](https://github.com/evandemaris)
* [Trevor Burnham](https://github.com/TrevorBurnham)
* [Philipp Kief](https://github.com/PKief)
* [rioj7](https://github.com/rioj7)

## Known Issues

SVG Version 2.0 is not included.

## Changelog

### 1.5.3 - 2023-07-02

* Fixed No Ascii text context in `<img>` mode show error.

### 1.5.2 - 2023-03-18

* Fixed Preview external file reference support

### 1.5.1 - 2023-03-12

* Fixed `tspan`, `mask` lost attributes defineds.

### 1.5.0 - 2023-01-28

* Fixed Preview now can show `<image href` local image.

### 1.4.25 - 2022-12-17

* Fixed format not handle `<?xml ... ?>` newline.

### 1.4.23 - 2022-11-18

* Dependent package security updates
* Public `svg.showSvg` command so user can add hotkey.

### 1.4.21 - 2022-10-15

* Add `<style>` css color picker support.

### [MORE](https://github.com/lishu/vscode-svg2/blob/HEAD/Changelog.md)

## Donations

[支持我](https://github.com/lishu/vscode-svg2/blob/HEAD/Donations.md).

-----------------------------------------------------------------------------------------------------------

## For more information

* [MDN SVG Reference](https://developer.mozilla.org/en-US/docs/Web/SVG)

**Enjoy!**
