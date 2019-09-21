import React, {Component} from 'react';
import { HashRouter as Router, Redirect, Switch, Route, NavLink } from 'react-router-dom';
import connectRoute from './connectRoute';
import Layout from './layout';
import isEmpty from "lodash/isEmpty";
import routesMap from "../map";



const mapi18n = {
    "zh":"zh-CN",
    "en":"en-US"
}
let i18nPath="zh"
let i18n = 'zh-CN';
const getMenuUl=(filter, path)=>{
    return (
        <ul> 
            {filter.map(item=>{
                //展示可点击按钮
                if(item.source){
                    return (
                        <li key={`${path}/${item.name}`}>
                            <NavLink to={`${path}/${item.name}`}>
                            {item.alias || item.name} 
                            </NavLink>
                        </li>
                    );
                }
                //展示组件的组名
                if(item.groupName){
                    return (
                        <li key={`${path}/${item.groupName}`}>
                             <div className="page-docs__group__submenu">
                                <div className="group-title">
                                    {i18nPath==="zh"?item.groupAlias:item.groupName}
                                </div>
                                {getMenuUl(item.children, path)}
                            </div>
                        </li>
                    );
                }
                if(item.alias && !item.name){
                    return (
                        <li key={`${path}/${item.alias}`}>
                            <div className="page-docs__side__submenu">
                                <div className="side-title">
                                    {item.alias}
                                </div>
                                {getMenuUl(item.children, path)}
                            </div>
                        </li>
                    )
                }
            })}
        </ul>
    )
    
} 

const Menu = (props)=>{
    const {match} = props;
    const filter = routesMap[i18n].filter(item=>("/"+i18nPath+item.path)===match.path)[0];
    let ul = null
    if(filter.children){
        ul =    getMenuUl(filter.children, match.path);
    }
    return (<div>
        {ul}
    </div>);
}

const getContent = (list)=>{
    const data= [];
    const recursion = (arr)=>{
        arr.forEach(item=>{
            if(item.source){
                const obj = {
                    path:item.name,
                    component:item.source
                }
                if(item.index){
                    obj.redirect = true;
                }
                data.push(obj)
            }
            if(item.children && !isEmpty(item.children)){
               return  recursion(item.children);
            }
        })
    }
    recursion(list)
    return data;
}

const Content = (props)=>{
    const {match} = props;
    const filter = routesMap[i18n].filter(item=>("/"+i18nPath+item.path)===match.path)[0];
    const routers = getContent(filter.children);
    const redirect = routers.filter(item=>item.redirect)[0];
    return (<div>
                <Switch>
                    {routers.map(item=>{
                       return  <Route key={item.path} exact path={`${match.url}/${item.path}`} exact component={item.component}></Route>
                    })}
                     <Redirect  to={`${match.url}/${redirect.path}`} />
                </Switch>
           </div>);
}

const Common = (props)=>{
    return(<Layout {...props} menu={<Menu {...props}/>} content={<Content {...props}/>}></Layout>)
}
const CommonWrapper = connectRoute(Common);

const I18nContext = React.createContext({i18n, i18nPath});

const RouterMap = (props) => {
    i18nPath = props.match.path.replace("/", "");
    i18n = mapi18n[i18nPath];
    return (
        <I18nContext.Provider value={{i18n, i18nPath}}>
                <Switch>
                    <Route path={`${props.match.path}/docs/guide`} component={CommonWrapper} />
                    <Route path={`${props.match.path}/components`} component={CommonWrapper}/>
                    <Route path={`${props.match.path}/resource`}  component={CommonWrapper}  />
                    <Redirect to={`${props.match.path}/docs/guide`} />
                </Switch>
        </I18nContext.Provider>
    )
}

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/zh" render={RouterMap}/>
                    <Route path="/en" render={RouterMap}/>
                    <Redirect to="/zh" />
                </Switch>
            </Router>
        );
    }
}

export { I18nContext }
