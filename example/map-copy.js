import DocLoadable from './components/loadable';

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
                "children": [{
                        "groupName": "common",
                        "groupAlias": "通用",
                        "children": []
                    },
                    {
                        "groupName": "layout",
                        "groupAlias": "布局",
                        "children": []
                    },    
                    {
                        "groupName": "navigation",
                        "groupAlias": "导航",
                        "children": []
                    },
                    {
                        "groupName": "dataEntry",
                        "groupAlias": "数据录入",
                        "children": []
                    },
                    {
                        "groupName": "dataDisplay",
                        "groupAlias": "数据展示",
                        "children": [
                            {
                                "name": "badge",
                                "alias": "标记",
                                "source": DocLoadable({ loader: () => import('../src/components/badge/index_zh-CN.md') }),
                            }
                        ]
                    },
                    {
                        "groupName": "other",
                        "groupAlias": "其他",
                        "children": []
                    }
                ]
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
                "children": [{
                        "groupName": "common",
                        "children": []
                    },
                    {
                        "groupName": "layout",
                        "children": []
                    },
                    {
                        "groupName": "navigation",
                        "children": []
                    },
                    {
                        "groupName": "dataEntry",
                        "children": []
                    },
                    {
                        "groupName": "dataDisplay",
                        "children": [
                            {
                                "name": "badge",
                                "source": DocLoadable({ loader: () => import('../src/components/badge/index_en-US.md') }),
                            }
                        ]
                    },
                    {
                        "groupName": "other",
                        "children": []
                    }
                ]
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
