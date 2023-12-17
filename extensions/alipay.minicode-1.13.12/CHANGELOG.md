# Change Log

All notable changes to this extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.13.12] - 2023-06-19

- 支持多语言
- 支持更多错误检测

## [1.9.8] - 2022-12-15

- 支持新版 formatter（默认开启）
  - 旧版 formatter 可以通过配置项: `"Mini-Program.axml.legacyFormat.enable": true` 开启
- 重命名文件夹支持自动重命名组件依赖路径
- 优化提示的准确性

## [1.8.8] - 2022-11-03

- AXML 支持更多组件内容提示
- 优化 AXML 的一些提示能力
- 修复在 AXML 最后一行无法提示
- 支持校验 navigateTo 等 API 的 url 参数

## [1.8.4] - 2022-09-29

- AXML 支持更多组件内容提示
- 优化 AXML 的一些提示能力

## [1.8.0] - 2022-09-15

- AXML 补全时会过滤已经输入的属性名
- AXML 支持更多报错检测
- AXML 支持更多组件内容提示
- 优化 JSON 补全提示
- 现在会自动下载类型文件到 `~/.minidev/typings` 目录下(可以通过 `Download Latest API Typing` 来主动下载最新类型文件)

## [1.6.15] - 2022-05-24

- 支持校验 JSON
- 支持 Selection Range 操作

## [1.6.14] - 2022-05-17

- 配置项更名：Mini-Program.scaffold -> Mini-Program.scaffold.path

## [1.6.10] - 2022-04-27

- 支持键入时补全 JSON

## [1.6.9] - 2022-04-27

- 优化 snippets 提示

## [1.6.8] - 2022-04-26

- 更新类型文件
- 更新配置文件的补全
- 配置文件支持跳转到开放平台文档
- 支持 AXML 中补全 acss 中的变量
- 优化 AXML 悬浮提示
- 优化性能
- 优化创建 app.json 中页面的逻辑
- 支持 usingComponents 中省略 .axml 拓展名

## [1.6.2] - 2022-02-24

- 更新类型文件

## [1.6.1] - 2022-02-23

- 修复配置项不生效

## [1.6.0] - 2022-01-17

- 合并 AXML Language Features

## [1.5.5] - 2021-10-22

- 修复创建 Page 后打开出错

## [1.5.4] - 2021-10-19

- 优化 `my.xx` 补全
- 更新 JSAPI 补全

## [1.5.3] - 2021-08-27

- 优化询问弹窗逻辑
- 优化 my.xx 补全体验
- revert JSApi 更新

## [1.5.2] - 2021-08-23

- 优化询问自动生成页面逻辑
- 同步现有 JSApi 补全

## [1.5.1] - 2021-08-13

- 修复自动创建的页面多了一层

## [1.5.0] - 2021-08-13

- 修复检测当前是否为项目目录
- 修复生成新页面失败

## [1.4.8] - 2021-07-28

- 支持修改 app.json 后自动生成新页面

## [1.4.7] - 2021-07-23

- 更新插件描述，插件启动时机。

## [1.4.6] - 2021-07-19

- 调整日志输出 Channel 名字
- 支持形如 `/pages/map/xxx` 路径的 import 智能跳转
- 更新插件描述，关键字等。
