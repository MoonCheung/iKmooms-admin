# CHANGELOG

## 1.1.0

- 优化缩略图上传至七牛云

## 1.0.0

- 添加登录
- 添加用户配置
- 添加首页统计
- 添加文章管理，增删改查功能
- 从 api 服务器获取授权 Token,让每个请求携带 token 发送得到验证
- axios 请求拦截器
- 七牛云上传配置
- 优化 相关框架及其组件不让打包，将 CDN 插入静态页面
- 优化 gzip 压缩性能
- 优化 element-ui 按需引入
- 优化 DllPlugin，DllReferencePlugin webpack 插件
- 移除 mock 假数据
- 使用 codemirror 创建一个 Markdown 编辑器
- 适当的创建按钮实现 markdown 语法，`markdown-it` + `highlight.js`用于预览解析
- 添加 markdown 模块的文件功能用于视频，音频上传至七牛云 CDN
