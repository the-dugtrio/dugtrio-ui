import DocLoadable from './components/loadable';
import data from './map.json';
//根据map.json读取menu列表
function getComponentsMenu(language){
    return data.map(item=>{
        return {
            ...item,
            children:((item)=>{
                if(Array.isArray(item.children)){
                    if(item.children<1){
                        return [];
                    }
                    // item.children.sort((a, b)=>{
                    //     return a.name - b.name
                    // })
                    return item.children.map(v=>{
                        return{
                            "name": v.name,
                            "alias": v.came,
                            "source": DocLoadable({ loader: () => import(`../src/components/${v.name}/index_${language}.md`) }),
                        }
                    })
                }else{
                    return [];
                }
            })(item)
        }
    })
}

export default {
    "zh-CN":[{
        "path": "/components",
        "children": [{
                "name": "installation",
                "alias": "安装",
                "source": DocLoadable({ loader: () => import('./docs/installation_zh-CN.md') }),
                "index": true,
                "hiddenName": true
            },
            {
                "name": "changelog",
                "alias": "更新日志",
                "source": DocLoadable({ loader: () => import('./components/changelog_zh-CN.jsx') }),
                "hiddenName": true
            }, {
                "alias": "Components",
                "children": getComponentsMenu('zh-CN')
            }
        ]
    },
    {
        "path": "/docs/guide",
        "children": [{
            "name": "introduce",
            "alias": "介绍",
            "source": DocLoadable({ loader: () => import('./docs/introduce_zh-CN.md') }),
            "index": true
        }]
    },
    {
        "path": "/resource",
        "children": [{
            "name": "designresource",
            "alias": "设计资源",
            "source": DocLoadable({ loader: () => import('./docs/designresource_zh-CN.md') }),
            "index": true
        }]
    }],
    "en-US":[{
        "path": "/components",
        "children": [{
                "name": "installation",
                "source": DocLoadable({ loader: () => import('./docs/installation_en-US.md') }),
                "index": true,
                "hiddenName": true
            },
            {
                "name": "changelog",
                "source": DocLoadable({ loader: () => import('./components/changelog_en-US.jsx') }),
                "hiddenName": true
            }, {
                "alias": "Components",
                "children": getComponentsMenu('en-US')
            }
        ]
    },
    {
        "path": "/docs/guide",
        "children": [{
            "name": "introduce",
            "source": DocLoadable({ loader: () => import('./docs/introduce_en-US.md') }),
            "index": true
        }]
    },
    {
        "path": "/resource",
        "children": [{
            "name": "designresource",
            "source": DocLoadable({ loader: () => import('./docs/designresource_en-US.md') }),
            "index": true
        }]
    }],
}
