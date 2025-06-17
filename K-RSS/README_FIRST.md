# RSSHub 部署指南

## 部署步骤

1. **安装 Docker Desktop**
   - 运行 `download-docker.bat` 脚本下载 Docker Desktop
   - 或者访问 [Docker 官网](https://www.docker.com/products/docker-desktop/) 手动下载安装
   - 安装完成后，启动 Docker Desktop 并接受许可协议

2. **启动 RSSHub**
   - 确保 Docker Desktop 正在运行
   - 运行 `start-rsshub.bat` 脚本启动 RSSHub 服务
   - 等待几秒钟，服务启动完成

3. **验证 RSSHub 是否运行**
   - 打开浏览器，访问 http://localhost:1200/
   - 如果看到 RSSHub 的主页，说明部署成功

4. **安装 RSSHub Radar 浏览器扩展**
   - Chrome/Edge 用户：[Chrome Web Store](https://chrome.google.com/webstore/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa)
   - Firefox 用户：[Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/rsshub-radar/)

5. **配置 RSSHub Radar**
   - 点击浏览器工具栏中的 RSSHub Radar 图标
   - 点击设置图标（⚙️）
   - 在"RSSHub 域名"字段中输入：`http://localhost:1200`
   - 点击"保存"

## 常见问题解决

### 如果出现 Socket 代理错误

如果遇到类似 "Error message get a didi infer" 或 "looks like something went wrong" 的错误，可能是由于代理设置问题。解决方法：

1. 打开 `docker-compose.yml` 文件
2. 找到 `PROXY_URI` 环境变量
3. 如果该行已取消注释，请将其注释掉（在行首添加 `#`）
4. 重启服务：运行 `stop-rsshub.bat` 然后运行 `start-rsshub.bat`

### 如果 RSSHub 无法访问

1. 运行 `check-status.bat` 检查服务状态
2. 确保 Docker Desktop 正在运行
3. 检查端口 1200 是否被其他应用占用

## 使用说明

1. 访问支持的网站（如哔哩哔哩、微博等）
2. 点击 RSSHub Radar 扩展图标
3. 扩展会显示当前页面可用的 RSS 源
4. 点击任意源复制其 URL 或直接订阅

## 更多信息

- 详细文档：http://localhost:1200/
- 官方文档：https://docs.rsshub.app/
- 支持的网站列表：https://docs.rsshub.app/routes

## 停止服务

- 运行 `stop-rsshub.bat` 停止 RSSHub 服务 