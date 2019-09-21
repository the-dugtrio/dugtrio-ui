# Dugtrio-UI

## 开发注意事项

### node命令

组件node命令 Makefile，详情见Makefile文件

帮助命令 make help

主要命令有新增组件，删除组件,本地运行，发布预发等命令

### git提交以及changelog

commitlint+husky规范commit 日志

commit type:

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动
- upgrade： 第三方库升级
- revert：回滚

建议使用git cz 替换 git commit -m'feat: 新增input组件'

### 组件架构

