# RSSHub 故障排除指南

本指南提供了在部署和使用 RSSHub 过程中可能遇到的常见问题及解决方法。

## Docker 相关问题

### Docker Desktop 无法启动

1. **检查系统要求**
   - 确保您的 Windows 版本兼容（Windows 10/11 64位）
   - 检查 BIOS/UEFI 中是否启用了硬件虚拟化

2. **重启 Docker 服务**
   - 右键点击系统托盘中的 Docker 图标
   - 选择 "Restart"

3. **检查 WSL 2**
   - 如果使用 WSL 2 后端，确保已正确安装 WSL 2
   - 在命令提示符中运行 `wsl --status` 检查 WSL 状态

4. **重新安装 Docker Desktop**
   - 卸载 Docker Desktop
   - 重新启动计算机
   - 重新安装 Docker Desktop

### 容器无法启动

1. **检查错误日志**
   - 运行 `docker-compose logs` 查看详细错误信息

2. **检查端口冲突**
   - 确保端口 1200 没有被其他应用占用
   - 可以通过修改 `docker-compose.yml` 文件中的端口映射来更改端口

3. **检查磁盘空间**
   - 确保有足够的磁盘空间用于 Docker 镜像和容器

## RSSHub 相关问题

### 无法访问 RSSHub

1. **检查 RSSHub 服务状态**
   - 运行 `check-status.bat` 脚本检查服务状态
   - 确保 Docker 容器正在运行

2. **检查网络连接**
   - 尝试访问 http://localhost:1200/
   - 如果无法访问，检查防火墙设置

3. **重启 RSSHub 服务**
   - 运行 `stop-rsshub.bat` 停止服务
   - 然后运行 `start-rsshub.bat` 重新启动服务

### RSS 源无法获取内容

1. **检查网站是否支持**
   - 访问 http://localhost:1200/ 查看支持的网站列表
   - 确保使用正确的路由格式

2. **代理问题**
   - 如果目标网站需要代理才能访问，检查 `docker-compose.yml` 中的代理设置
   - 取消注释并配置 `PROXY_URI` 环境变量

3. **网站结构变化**
   - 网站可能更改了其 HTML 结构，导致 RSSHub 无法正确抓取
   - 检查 RSSHub 是否有更新版本

### 错误消息: "Error: get a did infer"

这个错误通常与代理设置有关：

1. 打开 `docker-compose.yml` 文件
2. 找到 `PROXY_URI` 环境变量
3. 如果已取消注释，请将其注释掉（在行首添加 `#`）
4. 如果已注释，可能需要配置正确的代理
5. 重启 RSSHub 服务

## RSSHub Radar 扩展问题

### 扩展无法检测到 RSS 源

1. **检查配置**
   - 确保在扩展设置中正确配置了 RSSHub 域名（http://localhost:1200）
   - 尝试重新加载页面

2. **切换页面**
   - 有时需要切换到其他页面再切回来才能检测到 RSS 源

3. **检查网站支持**
   - 不是所有网站都支持 RSSHub，查看官方文档确认支持列表

### 订阅源无法使用

1. **检查 URL 格式**
   - 确保 URL 格式正确，包含完整的路径

2. **检查 RSSHub 服务**
   - 确保 RSSHub 服务正在运行
   - 尝试直接在浏览器中访问 RSS 源 URL

3. **清除浏览器缓存**
   - 清除浏览器缓存和 Cookie
   - 重新启动浏览器

## 性能优化

如果 RSSHub 运行缓慢：

1. **调整缓存设置**
   - 在 `config.js` 中增加缓存时间

2. **限制订阅源数量**
   - 减少同时使用的订阅源数量

3. **增加资源分配**
   - 如果可能，为 Docker 分配更多的 CPU 和内存资源

## 获取帮助

如果以上方法无法解决您的问题：

1. **查阅官方文档**
   - 访问 [RSSHub 官方文档](https://docs.rsshub.app/)

2. **GitHub Issues**
   - 在 [RSSHub GitHub 仓库](https://github.com/DIYgod/RSSHub/issues) 搜索或提交问题

3. **社区支持**
   - 加入 [RSSHub Telegram 群组](https://t.me/rsshub) 寻求帮助 