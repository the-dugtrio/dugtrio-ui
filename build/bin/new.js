/* eslint-disable no-console */
const chalk = require("chalk");

process.on('exit', () => {
    console.log();
});

if (!process.argv[2]) {
    console.error(chalk.red('[组件名]必填 - Please enter new component name'));
    process.exit(1);
}
if (!process.argv[3]) {
    console.error(chalk.red('[组件中文名]必填 - Please enter new component Chinese name'));
    process.exit(1);
}
if (!process.argv[4]) {
    console.error(chalk.red('[组件Group]必填 - Please enter the group to which the component belongs. '));
    process.exit(1);
}

var path = require('path');
var fileSave = require('file-save');
var uppercamelcase = require('uppercamelcase');
var componentsFile = require('../../components.json');
var navConfigFile = require('../../example/map.json');

var componentname = process.argv[2];
var chineseName = process.argv[3] || componentname;
var componentGroupName = process.argv[4];
var ComponentName = uppercamelcase(componentname);
var PackagePath = path.resolve(__dirname, '../../src/components', componentname);
var Files = [
    {
        filename: 'index.js',
        content: `import ${ComponentName} from './${componentname}';
export default ${ComponentName};`
    },
    {
        filename: `${componentname}.jsx`,
        content: `import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default class ${ComponentName} extends React.Component {
    render(){
        return(<div>${ComponentName}</div>)
    }
}
`
    },
    {
        filename: 'index_zh-CN.md',
        content: `---
title: ${ComponentName}
path: component/${ComponentName}
group: ${componentGroupName}
--- 

## ${ComponentName} ${chineseName}

描述

### API

#### ${ComponentName}

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| — | — | — | — | — |

### 贡献者

| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |`
    }, {
        filename: 'index_en-US.md',
        content: `---
title: ${ComponentName}
path: component/${ComponentName}
group: ${componentGroupName}
--- 

## ${ComponentName}

describe

### API

#### ${ComponentName}

| Param | Description | Type | Alternative | Default |
| ----- | ----------- | ---- | ----------- | ------- |
| —     | —           | —    | —           | —       |

### Contributor

| Role       | Participant |
| ---------- | ----------- |
| Maintainer | —           |
| Designer   | —           |`
    }, {
        filename: path.join(`./demos`, 'basic.md'),
        content: `---
order: 1
zh-CN:
    title: 基础用法
en-US:
    title: Basic
---

`+"```"+`jsx
import { ${ComponentName} } from 'dugtrio-ui';
ReactDOM.render(
    <div>
        <${ComponentName}>
        </${ComponentName}>
    </div>
    , mountNode
);
`+"```"
    }
];


// 添加到 components.json
if (componentsFile.base[componentname]) {
    console.error(chalk.red(`${componentname} 已存在.`));
    process.exit(1);
}
componentsFile.base[componentname] = `./src/components/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
    .write(JSON.stringify(componentsFile, null, 4), 'utf8')
    .end('\n');

// 创建 package
Files.forEach((file) => {
    fileSave(path.join(PackagePath, file.filename))
        .write(file.content, 'utf8')
        .end('\n');
});

//添加到 map.json
const navList = navConfigFile.map((nav) => {
    if(nav.groupName===componentGroupName){
        return {
            ...nav,
            children:((item)=>{
                if(!Array.isArray(item.children)){
                    item.children=[];
                }
                item.children.push({
                    "name": componentname,
                    "cname": chineseName
                })
                return item.children.sort((a, b)=>{
                    return (a.name + '').localeCompare(b.name + '')
                })
            })(nav)
        }
    }else{
        return nav
    }
});

fileSave(path.join(__dirname, '../../example/map.json'))
    .write(JSON.stringify(navList, null, 4), 'utf8')
    .end('\n');

console.log(chalk.green('DONE!'));
