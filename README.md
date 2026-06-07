# 周鲁烈士故居数字化全景展示

基于 Vue 3 + Vite 构建的 360° 全景虚拟导览系统，用于数字化展示周鲁烈士故居的建筑风貌与历史文化。

## 技术栈

| 类型 | 技术 |
|------|------|
| **框架** | Vue 3 (Composition API) + Vue Router + Pinia |
| **构建** | Vite 7 |
| **UI** | Vuetify 3 + Material Design Icons |
| **全景** | Pannellum (vue-pannellum) + @egjs/view360 |
| **图片** | viewerjs (v-viewer) |
| **视频** | video.js |
| **代码规范** | ESLint 9 + Prettier |

## Quick Start

### Windows (Recommended)

Double-click `start.bat` and select:
- **[1] Deploy to Vercel** - Auto build, deploy, and generate QR code
- **[2] Local Preview** - Run project locally
- **[3] QR Code Generator** - Generate QR code for deployed URL

### Manual Vercel Deployment

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod
```

After deployment, copy the URL and open `qrcode.html` to generate a QR code.

---

## 环境要求

- **Node.js** >= 18.x
- **包管理** npm / pnpm

## 环境配置

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

浏览器打开 `http://localhost:5173` 即可访问

## 开发流程

### 目录结构

```
VR_WEB/
├── public/                 # 静态资源（不经过构建处理）
│   ├── audio/              # 多语言音频文件
│   ├── imgs/               # 图片资源
│   │   ├── board/          # 展板图片
│   │   └── vr/             # 全景图片
│   └── video/              # 视频文件
├── image/                  # 全景图片原始素材
│   ├── a凤园/              # 凤园区域各场景
│   ├── b至德堂/            # 至德堂区域各场景
│   ├── c易安精舍/          # 易安精舍区域各场景
│   └── 路口/               # 路口场景
├── script/
│   ├── convert.py          # JPG→WebP 批量转换脚本
│   └── cwebp.exe           # WebP 编码器
├── src/
│   ├── assets/             # 全局样式文件
│   │   ├── base.css        # CSS 变量 reset
│   │   └── main.css        # 全局样式、字体、动画
│   ├── components/         # 通用组件
│   │   ├── PanoramaView.vue    # 核心全景视图组件
│   │   ├── BoardDialog.vue     # 展板弹窗组件
│   │   ├── FlowerOffering.vue  # 献花动画组件
│   │   ├── JumpSpot.vue        # 跳转热点组件
│   │   ├── GeneralSpot.vue     # 展板热点组件
│   │   └── NoneSpot.vue        # 禁区热点组件
│   ├── composables/        # 组合式函数
│   │   ├── useAudioManager.js  # 全局音频管理
│   │   └── useI18n.js          # 多语言切换
│   ├── config/             # 配置数据
│   │   ├── scenes.js       # 22个场景的全景配置
│   │   └── boards.js       # 63条展板数据
│   ├── router/
│   │   └── index.js        # 路由配置
│   ├── stores/             # Pinia 状态管理
│   │   └── language.js     # 语言偏好 store
│   ├── views/              # 页面视图
│   │   ├── HomeView.vue    # 首页
│   │   ├── DetailView.vue  # 详情页
│   │   └── NotFoundView.vue # 404 页面
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
├── eslint.config.js        # ESLint 配置
├── jsconfig.json           # JS 路径别名配置
└── package.json
```

### 场景路由

全景场景对应 URL 路径格式为 `/vr/{场景编号}`，例如：

| 路径 | 对应场景 |
|------|----------|
| `/vr/a00` | 凤园入口 |
| `/vr/a02` | 天井 |
| `/vr/a03` | 大厅 |
| `/vr/a09` | 二楼大厅 |
| `/vr/b00` | 至德堂入口 |
| `/vr/c01` | 易安精舍大厅 |

### 代码检查与格式化

```bash
# ESLint 检查并自动修复
npm run lint

# Prettier 格式化
npm run format
```

### 添加新场景

1. 在 `src/views/` 下新建 `VrView_{编号}.vue` 文件，参照已有场景模板编写全景组件。
2. 在 `src/router/index.js` 中添加对应路由。
3. 在相关跳转热点组件中连接出入口。

## 构建与部署

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 本地预览构建结果

```bash
npm run preview
```

### 部署到服务器

`dist/` 目录为纯静态文件，可部署到任意静态服务器：

**Nginx 示例配置：**

```nginx
server {
    listen       80;
    server_name  example.com;
    root         /path/to/VR_WEB/dist;
    index        index.html;

    # Vue Router history 模式需配置 fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**其他部署方式：**

- 使用 [Vercel](https://vercel.com)、[Netlify](https://netlify.com) 等平台一键部署。
- 使用 `npm run preview` 配合 PM2 等进程管理工具运行。
