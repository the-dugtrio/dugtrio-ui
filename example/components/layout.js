import React, { Component, useState, useEffect, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { I18nContext } from "./docs.jsx";
import enLocale from '../en-US';
import cnLocale from '../zh-CN';

import Head from './head';

const Layout = (props)=>{
    const { match }= props;
    const { i18n, i18nPath }= useContext(I18nContext);
    const [ appLocale, setAppLocale ] = useState(i18n ==='zh-CN'? cnLocale : enLocale);
    useEffect(() => {
        setAppLocale(i18n ==='zh-CN'? cnLocale : enLocale);
    }, [i18n]);
    return (
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <div className="app">
            <Head {...props}/>
            <div className="main container">
                <nav className="side-nav">
                    {props.menu}
                </nav>
                <div className="content">
                    {props.content}
                </div>
            </div>
            <footer className="footer">
            </footer>
        </div>
        </IntlProvider>
);
}

export default Layout;
