# 部署指南

## 方案对比

| 方案 | 难度 | 费用 | 速度 | 推荐度 |
|------|------|------|------|--------|
| **Vercel** | ⭐ | 免费 | 快 | ⭐⭐⭐⭐⭐ |
| **Netlify** | ⭐ | 免费 | 快 | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ⭐⭐ | 免费 | 中 | ⭐⭐⭐⭐ |
| **Cloudflare Pages** | ⭐⭐ | 免费 | 很快 | ⭐⭐⭐⭐ |
| **Streamlit** | ⭐⭐⭐ | 免费 | 慢 | ⭐⭐ |
| **Nginx + 服务器** | ⭐⭐⭐⭐ | 付费 | 可控 | ⭐⭐⭐ |

---

## 方案一：Vercel（最推荐）

### 优点
- 免费额度充足
- 全球CDN，访问速度快
- 自动HTTPS
- 支持自定义域名
- 一键部署

### 部署步骤

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   # 在项目根目录执行
   vercel
   ```

4. **按照提示操作**
   - Set up and deploy? → Y
   - Which scope? → 选择你的账户
   - Link to existing project? → N
   - Project name? → vr-web（或自定义名称）
   - Directory where code is located? → ./
   - Override settings? → N

5. **访问部署结果**
   - Vercel 会给你一个 URL，如 `https://vr-web-xxx.vercel.app`

### 方式二：GitHub 集成

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "New Project"
4. 导入 GitHub 仓库
5. 点击 "Deploy"

---

## 方案二：Netlify

### 部署步骤

1. **构建项目**
   ```bash
   npm run build
   ```

2. **访问 [netlify.com](https://netlify.com)**

3. **拖拽部署**
   - 登录后，直接将 `dist` 文件夹拖拽到页面上
   - 等待部署完成

4. **获取链接**
   - Netlify 会给你一个 URL，如 `https://xxx.netlify.app`

### 通过 CLI 部署

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod --dir=dist
```

---

## 方案三：GitHub Pages

### 部署步骤

1. **创建 GitHub 仓库**

2. **推送代码**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/VR_WEB.git
   git push -u origin main
   ```

3. **配置 GitHub Actions**
   
   创建 `.github/workflows/deploy.yml`：
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '18'
             
         - name: Install dependencies
           run: npm install
           
         - name: Build
           run: npm run build
           
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

4. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `gh-pages` 分支
   - 保存

5. **访问**
   - URL 格式：`https://YOUR_USERNAME.github.io/VR_WEB/`

---

## 方案四：Streamlit（快速演示）

### 优点
- 快速部署，无需配置
- 适合内部演示

### 缺点
- 性能较差
- 可能有兼容性问题
- 不适合正式生产环境

### 部署步骤

1. **安装 Python 和 Streamlit**
   ```bash
   pip install streamlit
   ```

2. **构建 Vue 项目**
   ```bash
   npm run build
   ```

3. **运行 Streamlit 应用**
   ```bash
   streamlit run deploy_streamlit.py
   ```

4. **访问本地地址**
   - 默认：`http://localhost:8501`

### 部署到 Streamlit Cloud

1. 将代码推送到 GitHub
2. 访问 [share.streamlit.io](https://share.streamlit.io)
3. 登录并部署

---

## 方案五：Nginx + 云服务器

### 适用场景
- 需要完全控制
- 有域名和服务器

### 部署步骤

1. **购买云服务器**
   - 阿里云、腾讯云、AWS 等

2. **安装 Nginx**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nginx
   
   # CentOS
   sudo yum install nginx
   ```

3. **上传构建文件**
   ```bash
   # 本地构建
   npm run build
   
   # 上传到服务器
   scp -r dist/* user@server:/var/www/vr-web/
   ```

4. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/vr-web;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       location /assets {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

5. **重启 Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

6. **配置域名和SSL（可选）**
   ```bash
   # 安装 Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # 获取 SSL 证书
   sudo certbot --nginx -d your-domain.com
   ```

---

## 常见问题

### Q: 为什么 Streamlit 不是最佳选择？
A: Streamlit 主要用于数据科学应用，它的渲染机制与传统前端框架不同。Vue 全景应用需要大量 DOM 操作和事件处理，Streamlit 可能无法完美支持。

### Q: Vercel/Netlify 免费吗？
A: 是的，对于个人项目和小型应用，免费额度完全够用。

### Q: 如何绑定自定义域名？
A: 在 Vercel/Netlify 的项目设置中添加自定义域名，然后配置 DNS 解析即可。

### Q: 构建后资源路径错误怎么办？
A: 检查 `vite.config.js` 中的 `base` 配置，确保与部署路径一致。

---

## 推荐选择

| 场景 | 推荐方案 |
|------|----------|
| 个人项目/学习 | Vercel 或 Netlify |
| 公司内部演示 | Streamlit 或局域网 Nginx |
| 正式生产环境 | Vercel/Netlify Pro 或云服务器 |
| 完全控制 | Nginx + 云服务器 |