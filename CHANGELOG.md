# 变更日志

本文档记录项目的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本控制](https://semver.org/lang/zh-CN/)。

## [未发布]

### 新增
- 完整的项目技术文档
- 组件 API 文档
- 贡献指南 (CONTRIBUTING.md)
- 变更日志 (CHANGELOG.md)

### 变更
- 更新 README.md 目录结构，使其与实际代码一致
- 修正组件列表，添加缺失的组件说明
- 更新 PROJECT_DOC.md 中的项目统计信息

## [0.0.0] - 2026-06-07

### 新增
- 22 个全景场景的 360° 虚拟导览
- 63 块展板的图文信息展示
- 中文 / 英语 / 潮汕话三语言音频讲解
- 在线献花互动动画
- 视频介绍播放
- 手机 / 电脑双端响应式适配

### 技术栈
- Vue 3 (Composition API) + Vue Router + Pinia
- Vite 7 构建工具
- Vuetify 3 UI 框架
- Pannellum 全景引擎
- video.js 视频播放
- ESLint 9 + Prettier 代码规范

### 核心组件
- PanoramaView.vue - 全景视图核心组件
- BoardDialog.vue - 展板弹窗组件
- FlowerOffering.vue - 献花动画组件
- JumpSpot.vue - 跳转热点组件
- GeneralSpot.vue - 展板热点组件
- NoneSpot.vue - 禁区热点组件

### 配置系统
- scenes.js - 22 个场景的全景配置
- boards.js - 63 条展板数据

### Composables
- useAudioManager.js - 全局音频管理
- useI18n.js - 多语言切换

### 状态管理
- language.js - 语言偏好 Pinia store

### 页面视图
- HomeView.vue - 首页
- DetailView.vue - 详情页
- NotFoundView.vue - 404 页面

### 工具脚本
- convert.py - JPG→WebP 批量转换脚本
- cwebp.exe - WebP 编码器

---

## 版本说明

### 版本号格式

本项目使用语义化版本控制：

- **主版本号 (MAJOR)**: 不兼容的 API 变更
- **次版本号 (MINOR)**: 向下兼容的功能性新增
- **修订号 (PATCH)**: 向下兼容的问题修正

### 变更类型

- **新增 (Added)**: 新功能
- **变更 (Changed)**: 对现有功能的变更
- **弃用 (Deprecated)**: 即将移除的功能
- **移除 (Removed)**: 已移除的功能
- **修复 (Fixed)**: 任何 bug 修复
- **安全 (Security)**: 安全相关的变更

### 贡献指南

请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何为本项目做出贡献。

---

## 历史版本

由于项目处于初始开发阶段，暂无历史版本记录。

后续版本将按照以下格式记录：

```
## [x.y.z] - YYYY-MM-DD

### 新增
- 新功能描述

### 变更
- 变更描述

### 修复
- 修复描述
```

---

## 链接

- [项目文档](PROJECT_DOC.md)
- [贡献指南](CONTRIBUTING.md)
- [GitHub Issues](https://github.com/your-username/VR_WEB/issues)
- [GitHub Releases](https://github.com/your-username/VR_WEB/releases)