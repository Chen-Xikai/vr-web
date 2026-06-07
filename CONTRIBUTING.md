# 贡献指南

感谢您对周鲁烈士故居数字化全景展示项目的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议，请通过以下方式提交：

1. 在 GitHub 上创建 Issue
2. 详细描述问题或建议
3. 提供复现步骤（如果是 bug）
4. 附上相关截图或日志

### 提交代码

1. **Fork 项目**
   ```bash
   # 克隆您的 fork
   git clone https://github.com/your-username/VR_WEB.git
   cd VR_WEB
   ```

2. **创建分支**
   ```bash
   # 创建并切换到新分支
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **进行修改**
   - 遵循项目的代码规范
   - 确保代码通过 ESLint 检查
   - 添加必要的注释

5. **测试**
   ```bash
   # 启动开发服务器测试
   npm run dev
   
   # 代码检查
   npm run lint
   
   # 代码格式化
   npm run format
   ```

6. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   # 或
   git commit -m "fix: 修复某个问题"
   ```

7. **推送并创建 PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   然后在 GitHub 上创建 Pull Request。

## 代码规范

### 基本规范

- 使用 ESLint + Prettier 进行代码格式化
- 无分号、单引号、100 字符行宽
- 使用 Vue 3 Composition API（`<script setup>`）

### 命名规范

- **组件文件**: PascalCase（如 `PanoramaView.vue`）
- **composable 文件**: camelCase，以 `use` 开头（如 `useAudioManager.js`）
- **配置文件**: camelCase（如 `scenes.js`）
- **CSS 类名**: kebab-case（如 `panorama-wrapper`）

### 提交消息规范

使用 Conventional Commits 格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）**:
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响逻辑）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 添加测试
- `chore`: 构建/工具变更

**示例**:
```
feat(panorama): 添加新场景 a15

- 在 scenes.js 中添加场景配置
- 添加对应的展板数据
- 更新场景拓扑图

Closes #123
```

## 开发流程

### 添加新场景

1. 将全景图片放入 `public/imgs/vr/`（WebP 格式）
2. 在 `src/config/scenes.js` 中添加场景配置
3. 如有展板，在 `public/imgs/board/` 放入展板图片，在 `src/config/boards.js` 添加数据
4. 在相关场景的 `hotSpots` 中添加跳转连接
5. 测试场景间的导航是否正常

### 添加新组件

1. 在 `src/components/` 下创建组件文件
2. 遵循现有组件的代码风格
3. 添加必要的 Props/Events 文档
4. 在需要的地方引入并使用

### 修改现有功能

1. 先了解相关组件的职责和依赖关系
2. 修改后测试所有相关功能
3. 确保不会影响其他场景

## 分支策略

- `main`: 生产分支，保持稳定
- `develop`: 开发分支，新功能合并到此
- `feature/*`: 功能分支
- `fix/*`: 修复分支
- `docs/*`: 文档分支

## 环境要求

- Node.js >= 18.x
- npm 或 pnpm

## 获取帮助

如有任何问题，可以通过以下方式获取帮助：

- 查看 [项目文档](PROJECT_DOC.md)
- 提交 GitHub Issue
- 联系项目维护者

感谢您的贡献！