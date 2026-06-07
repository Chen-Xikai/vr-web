# 周鲁烈士故居数字化全景展示 — 项目文档

## 一、项目概述

基于 Vue 3 + Vite 构建的 360° 全景虚拟导览系统，用于数字化展示周鲁烈士故居的建筑风貌与历史文化。用户可通过全景漫游、展板阅读、音视频播放、在线献花等方式沉浸式体验红色革命教育内容。

**核心功能**:
- 22 个全景场景的 360° 虚拟导览
- 63 块展板的图文信息展示
- 中文 / 英语 / 潮汕话三语言音频讲解
- 在线献花互动动画
- 视频介绍播放
- 手机 / 电脑双端响应式适配

---

## 二、技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 前端框架 | Vue 3 (Composition API) | ^3.5.17 |
| 构建工具 | Vite | ^7.0.0 |
| 路由 | Vue Router (History 模式) | ^4.5.1 |
| 状态管理 | Pinia | ^3.0.3 |
| UI 框架 | Vuetify 3 + MDI SVG Icons | ^3.9.2 |
| 全景引擎 | Pannellum (vue-pannellum) | ^0.5.3 |
| 图片查看 | viewerjs (v-viewer) | ^1.11.7 |
| 视频播放 | video.js + @videojs-player/vue | ^7.21.7 |
| 代码规范 | ESLint 9 + Prettier | ^9.29.0 |
| 语言 | JavaScript (ES Module) | — |

**环境要求**: Node.js >= 18.x

---

## 三、目录结构

```
VR_WEB/
├── public/                          # 静态资源（不经过构建处理）
│   ├── audio/                       # 多语言音频（6章 × 3语言 + 附加音频）
│   ├── imgs/
│   │   ├── board/                   # 展板图片（62张 WebP）
│   │   ├── vr/                      # 全景图片（30张 WebP，等距柱状投影）
│   │   ├── 1.webp, 2.webp, 3.webp   # 详情页轮播图
│   │   ├── post.webp                # 首页背景图
│   │   └── flower.webp              # 献花动画素材
│   └── video/                       # 视频文件 + 海报图
├── image/                           # 全景原始素材（JPG，已 gitignore）
│   ├── 路口/
│   ├── a凤园/
│   ├── b至德堂/
│   └── c易安精舍/
├── script/
│   ├── convert.py                   # JPG→WebP 批量转换脚本
│   └── cwebp.exe                    # WebP 编码器
├── src/
│   ├── assets/                      # 全局样式
│   │   ├── base.css                 # CSS 变量 reset
│   │   └── main.css                 # 全局样式、字体、动画
│   ├── components/                  # 组件
│   │   ├── PanoramaView.vue         # 通用全景视图（核心组件）
│   │   ├── BoardDialog.vue          # 展板弹窗
│   │   ├── FlowerOffering.vue       # 献花动画
│   │   ├── JumpSpot.vue             # 跳转热点
│   │   ├── GeneralSpot.vue          # 展板热点
│   │   └── NoneSpot.vue             # 禁区热点
│   ├── composables/                 # 组合式函数
│   │   ├── useAudioManager.js       # 全局音频管理
│   │   └── useI18n.js               # 多语言切换
│   ├── config/                      # 配置数据
│   │   ├── scenes.js                # 22个场景的全景配置
│   │   └── boards.js                # 63条展板数据
│   ├── router/
│   │   └── index.js                 # 路由配置
│   ├── stores/
│   │   └── language.js              # 语言偏好 Pinia store
│   ├── views/                       # 页面视图
│   │   ├── HomeView.vue             # 首页
│   │   ├── DetailView.vue           # 详情页
│   │   └── NotFoundView.vue         # 404 页面
│   ├── App.vue                      # 根组件
│   └── main.js                      # 入口文件
├── index.html                       # HTML 模板
├── vite.config.js                   # Vite 配置
├── eslint.config.js                 # ESLint 配置
├── jsconfig.json                    # JS 路径别名配置
└── package.json
```

---

## 四、架构设计

### 4.1 应用入口

```
main.js
├── Vue 3 createApp
├── Pinia (状态管理)
├── Vue Router (History 模式)
├── Vuetify 3 (MDI SVG 图标集)
├── VuePannellum (全局组件 VPannellum)
├── VueViewer (图片查看器)
└── video.js (视频播放)
```

### 4.2 路由体系

| 路径 | 名称 | 组件 | 说明 |
|------|------|------|------|
| `/` | home | HomeView | 首页，展示背景图 + 进入按钮 |
| `/detail` | detail | DetailView | 详情页，展示轮播图、视频、人物介绍 |
| `/vr/:sceneId` | vr | PanoramaView | 全景页，动态路由，`:sceneId` 为场景编号 |
| `/:pathMatch(.*)*` | not-found | NotFoundView | 404 页面 |

**路由守卫**: `/vr/:sceneId` 路由有 `beforeEnter` 守卫，校验 `sceneId` 是否存在于 `scenes` 配置中，不存在则重定向首页。

**懒加载**: DetailView、PanoramaView、NotFoundView 均使用 `() => import()` 懒加载。

### 4.3 数据驱动架构

项目采用**配置驱动**设计，22 个场景的全景数据和 63 条展板数据均集中在配置文件中管理：

```
config/scenes.js   →  PanoramaView.vue  →  渲染全景 + 热点
config/boards.js   →  BoardDialog.vue   →  渲染展板弹窗
```

新增场景只需在 `scenes.js` 中添加配置，无需创建新组件文件。

---

## 五、核心组件

### 5.1 PanoramaView.vue（全景视图）

核心组件，替代了原来 22 个独立的 VrView 文件。

**职责**:
- 根据路由参数 `sceneId` 从 `scenes.js` 加载对应场景配置
- 渲染 Pannellum 全景组件
- 根据热点类型分发渲染（JumpSpot / GeneralSpot / NoneSpot / 献花按钮）
- 管理 Loading 状态、展板弹窗、Snackbar 提示

**热点渲染机制**:
```js
// 每个热点通过 createApp() + h() 独立挂载 Vue 实例到 Pannellum DOM
function hotspotMount(hotSpotDiv, spot) {
  if (spot.type === 'jump') { /* 渲染 JumpSpot */ }
  if (spot.type === 'board') { /* 渲染 GeneralSpot */ }
  if (spot.type === 'none') { /* 渲染 NoneSpot */ }
  if (spot.type === 'flower') { /* 渲染 VBtn 献花按钮 */ }
}
```

**Loading 机制**:
- 进入场景时显示黑色遮罩 + 旋转动画
- 轮询检查 Pannellum viewer 是否就绪
- 就绪后延迟 300ms 隐藏遮罩（确保渲染完成）
- 场景切换时重置 loading 状态

**返回导航**: 顶部浮动半透明返回按钮，支持 `router.back()` 或回退到详情页。

### 5.2 BoardDialog.vue（展板弹窗）

**职责**:
- 展示展板图片、标题、文字内容
- 管理多语言音频播放
- 响应式适配（手机全屏 / 电脑居中）

**响应式策略**:
- 使用 Vuetify `useDisplay()` 检测 `mobile` 断点
- 手机端: `fullscreen` 模式，图片+文字垂直排列
- 电脑端: `max-width: 720px`，图片+文字水平排列

### 5.3 热点组件

| 组件 | 功能 | 尺寸策略 |
|------|------|----------|
| JumpSpot | 场景跳转箭头图标 | `clamp(32px, 6vw, 52px)` |
| GeneralSpot | 展板信息热点（放大镜图标） | `clamp(26px, 5vw, 40px)` |
| NoneSpot | 禁区提示（圆形禁用图标） | `clamp(26px, 5vw, 40px)` |

所有热点组件使用 `clamp()` 实现响应式尺寸，确保手机端不会太小、电脑端不会太大。

### 5.4 FlowerOffering.vue（献花动画）

从 a03 场景提取的独立组件。点击"在线献花"按钮后：
1. 锁定全景视角
2. 显示花朵图片的 CSS 缩放+位移动画（6秒）
3. 动画结束后恢复视角

---

## 5.5 组件 API 文档

### BoardDialog.vue

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | Boolean | `false` | 控制弹窗显示/隐藏（v-model） |
| `board` | Object | `null` | 展板数据对象，包含 `image`、`title`、`text`、`audio` 字段 |

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `Boolean` | 弹窗状态变化时触发 |

### JumpSpot.vue

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `spotColor` | String | `'white'` | 箭头图标的填充颜色 |

### FlowerOffering.vue

| 方法 | 说明 |
|------|------|
| `flowerRef` | 通过 `defineExpose` 暴露的 DOM 引用，用于控制动画播放 |

### PanoramaView.vue

无 Props（通过路由参数 `sceneId` 动态加载场景配置）。

### GeneralSpot.vue / NoneSpot.vue

无 Props，纯展示组件。

---

## 六、配置系统

### 6.1 scenes.js（场景配置）

每个场景的数据结构：

```js
{
  image: '/imgs/vr/a03.webp',    // 全景图路径
  hfov: 50,                       // 初始水平视角
  sceneHfov: 45,                  // Pannellum 场景级 hfov
  yaw: -2,                        // 初始偏航角
  pitch: -3,                      // 初始俯仰角
  hasBoards: true,                // 是否有展板热点
  hasFlower: true,                // 是否有献花功能
  hasNoneSpots: true,             // 是否有禁区热点
  hotSpots: [                     // 热点数组
    { type: 'jump', pitch: -10, yaw: 70, target: 'a02' },
    { type: 'board', pitch: 6, yaw: -130, boardId: '3-1' },
    { type: 'none', pitch: 0, yaw: 115 },
    { type: 'flower', pitch: -35, yaw: -3 },
  ]
}
```

**热点类型**:
- `jump`: 场景跳转，`target` 为目标场景 ID
- `board`: 展板热点，`boardId` 关联 `boards.js` 中的数据
- `none`: 禁区提示，点击显示 Snackbar
- `flower`: 献花按钮（仅 a03 场景）

**特殊属性**:
- `spotClass`: 附加到 JumpSpot 组件的 CSS 类（如 `'huge'`）
- `spotColor`: JumpSpot 图标的填充颜色（如 `'gray'`、`'black'`）

### 6.2 boards.js（展板数据）

每条展板的数据结构：

```js
{
  image: '/imgs/board/3-13.webp',           // 展板图片
  text: 'Look! This is the commemorative...', // 展板文字（英文）
  title: 'Chapter 1: The Book-Loving Youth',  // 章节标题
  audio: [                                    // 三语言音频
    '/audio/1-chs.mp3',  // 中文
    '/audio/1-eng.mp3',  // 英语
    '/audio/1-tcw.mp3',  // 潮汕话
  ]
}
```

仅有 `image` 和空 `text` 的展板为纯图片展示，不显示文字和音频控制。

### 6.3 场景网络拓扑

```
首页 (/) → 详情页 (/detail) → 大厅 (a03)
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
               天井 (a02)      大厅侧 (a04)    大厅侧 (a05)
                    │               │               │
            ┌───────┤               │               │
            ▼       ▼               ▼               ▼
     凤园入口(a00)  │          二楼(a09)        二楼(a06)
            │       │           ┌───┴───┐
            ▼       │           ▼       ▼
     至德堂入口(b00) │       a11     a12
            │       │           │
            ▼       │           ▼
       b01-1/b01-2  │          a15
            │       │
            ▼       │
       b02-1/b02-2  │
            │       │
     ┌──────┤       │
     ▼      ▼       ▼
   b04    b05    c00~c04 (易安精舍)
```

---

## 七、Composables

### 7.1 useAudioManager.js

全局音频管理器，确保同一时间只播放一个音频。

```js
const { play, stop } = useAudioManager()
play('/audio/1-chs.mp3')  // 停止当前音频，播放新音频
stop()                     // 停止播放
```

**实现**: 使用模块级 `ref` 持有当前 Audio 实例，`play()` 时先 `stop()` 再创建新实例。

### 7.2 useI18n.js

多语言 composable，封装语言切换逻辑。

```js
const { lang, setLanguage, getAudioSrc } = useI18n()
setLanguage('eng')                    // 切换到英语
const src = getAudioSrc(boardData)    // 获取当前语言的音频路径
```

**语言映射**: `chs` → index 0, `eng` → index 1, `tcw` → index 2

---

## 八、状态管理

### language.js（Pinia Store）

管理用户语言偏好，持久化到 localStorage。

```js
const store = useLanguageStore()
store.lang          // 当前语言 ('chs' | 'eng' | 'tcw')
store.setLang('eng') // 切换语言并保存到 localStorage
```

---

## 九、响应式设计

### 9.1 断点策略

使用 Vuetify 内置的 `useDisplay()` composable：
- `mobile`: < 600px（手机）
- 平板: 600px ~ 960px
- 桌面: > 960px

### 9.2 响应式适配清单

| 组件 | 手机端表现 | 电脑端表现 |
|------|-----------|-----------|
| JumpSpot | 32px | 52px |
| GeneralSpot | 26px | 40px |
| NoneSpot | 26px | 40px |
| .huge 热点 | 48px | 80px |
| BoardDialog | 全屏，图片+文字垂直排列 | 720px 居中，水平排列 |
| 详情页标题 | `clamp(1.1rem, 4vw, 1.8rem)` | 同左 |
| 详情页文字 | `clamp(0.9rem, 2.5vw, 1.15rem)` | 同左 |
| 视频播放器 | height=200 | height=300 |

### 9.3 实现方式

- 热点组件: CSS `clamp()` 函数
- 详情页: CSS `clamp()` + Vuetify `useDisplay()`
- 弹窗: Vuetify `useDisplay()` + `:max-width` / `:fullscreen` 绑定

---

## 十、多媒体交互

### 10.1 展板弹窗

- 点击 GeneralSpot 热点 → 打开 BoardDialog
- 有文字的展板: 图片 + 标题 + 文字 + 三语言切换按钮
- 纯图片展板: 仅显示大图
- 关闭弹窗时自动停止音频

### 10.2 多语言音频

- 三语言按钮: 中文 / 英语 / 潮汕话
- 切换语言时自动切换音频（通过 `useAudioManager`）
- 用户语言偏好通过 `useI18n` + Pinia store 持久化

### 10.3 在线献花

- 仅 a03（大厅）场景有此功能
- 点击后锁定视角 → 播放花朵动画（6秒） → 恢复视角

---

## 十一、资源处理流水线

```
原始素材 (image/*.jpg)
    │
    ▼  script/convert.py (cwebp, q=70, 渐进式JPEG优化)
    │
    ▼  WebP 全景图 (public/imgs/vr/*.webp)
    │
    ▼  Vite 构建 (静态资源原样复制)
    │
    ▼  dist/ 部署
```

**全景图大小**: 1MB ~ 7MB 不等，平均约 3MB。

---

## 十二、开发工作流

### 12.1 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器 (localhost:5173)
npm run lint         # ESLint 检查并自动修复
npm run format       # Prettier 格式化
npm run build        # 构建生产版本 → dist/
npm run preview      # 本地预览构建结果
```

### 12.2 添加新场景

1. 将全景图片放入 `public/imgs/vr/`（WebP 格式）
2. 在 `src/config/scenes.js` 中添加场景配置
3. 如有展板，在 `public/imgs/board/` 放入展板图片，在 `src/config/boards.js` 添加数据
4. 在相关场景的 `hotSpots` 中添加跳转连接

### 12.3 代码规范

- ESLint 9 + Prettier
- 无分号、单引号、100 字符行宽
- Vue 3 Composition API (`<script setup>`)

---

## 十三、构建与部署

### 13.1 构建产物

```
dist/
├── index.html
└── assets/
    ├── index-*.css          # Vuetify 样式 (~344KB)
    ├── index-*.js           # Vue + Vuetify 运行时 (~305KB)
    ├── PanoramaView-*.js    # 全景组件 (~46KB)
    ├── DetailView-*.js      # 详情页 (~667KB, 含 video.js)
    └── ...
```

### 13.2 部署方式

**Nginx**:
```nginx
server {
    listen       80;
    server_name  example.com;
    root         /path/to/VR_WEB/dist;
    index        index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**其他**: Vercel / Netlify 一键部署，或 `npm run preview` + PM2。

---

## 十四、已知问题与优化方向

### 14.1 当前已知问题

| 问题 | 严重度 | 说明 |
|------|--------|------|
| DetailView.js 体积过大 | 中 | 667KB，因包含 video.js，可做懒加载 |
| 全景图未做渐进加载 | 低 | 部分图片 7MB，弱网环境加载慢 |
| Pinia store 未充分利用 | 低 | 仅 language store 在使用 |

### 14.2 可选优化方向

1. **video.js 懒加载**: 仅在用户点击视频时加载播放器
2. **全景图渐进加载**: 先加载低分辨率缩略图，再替换高清图
3. **Service Worker 缓存**: 缓存全景图等大资源，提升二次访问速度
4. **SSR / 预渲染**: 如需 SEO，可对首页和详情页做预渲染
5. **TypeScript 引入**: 提升代码可维护性
6. **自动化测试**: 添加关键路径的 E2E 测试

---

## 十五、项目统计

| 指标 | 数值 |
|------|------|
| 源文件数 | 20 个 |
| 全景场景数 | 22 个 |
| 展板数据 | 63 条 |
| 音频文件 | 26 个（6章 × 3语言 + 8个附加） |
| 全景图片 | 30 张 WebP（约 82MB） |
| 构建时间 | ~8 秒 |
| 构建产物 | ~1.1MB（gzip ~320KB，不含视频/图片） |
