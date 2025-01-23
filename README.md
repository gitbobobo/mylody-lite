# Mylody Lite

**Mylody Lite 目前正处于早期开发阶段，不建议自己部署，等功能基本稳定后会制作 Docker 镜像以供用户使用。**

Mylody Lite 作为 Mylody 的技术探索版本，目标是成为一个高性能的网页版音乐标签管理服务，同时提供音流自定义 API 的接口作为现有音乐服务的补充。

## 开发计划

- [x] 单用户验证机制
- [ ] 分区浏览文件
- [ ] 提供自定义 API
- [ ] 支持修改音乐标签

## Docker 部署

等待功能稳定后提供。

## 本地开发环境部署

本项目需要 Rust 开发环境以及 Nodejs 开发环境，数据库使用 Postgres，在执行以下步骤前请先配置好运行环境。

```bash
# 1. 克隆项目到本地
git clone https://github.com/gitbobobo/mylody-lite.git

# 2. 安装依赖
cd mylody-lite
cargo install loco
cargo install sea-orm-cli
cd frontend
pnpm install
pnpm build

# 3. 创建数据库 mylody_lite

# 4. 生成开发环境配置文件
cd ../config
cp test.yaml developments.yaml

# 5. 修改配置文件 development.yaml
# 邮件配置 mailer.smtp
# 数据库配置 database.uri

# 6. 启动后端服务
cargo loco start
# 7. 调试前端服务（可选）
cd frontend
pnpm dev
```
