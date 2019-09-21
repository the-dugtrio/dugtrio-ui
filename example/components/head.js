import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import classNames from "classnames";
import { I18nContext } from "./docs.jsx";
import { FormattedMessage } from "react-intl";

import logoImg from "../assets/images/logo.png";
const CONTROLLS = {
    "zh-CN": "English",
    "en-US": "中文"
};

const Head = props => {
    const {
        match: { path },
        onChangeLang
    } = props;
    const { i18nPath, i18n } = useContext(I18nContext);
    const toggleLanguage = () => {
        const { replace } = props.history;
        const path = props.history.location.pathname.split("/");
        if (path[1] === "en") {
            path[1] = "zh";
        } else {
            path[1] = "en";
        }
        replace(path.join("/"));
    };
    return (
        <header className="header">
            <div className="docs-container">
                <div>
                    <h1 className="docs-logo">
                        <img src={logoImg} />
                        <span>Dugtrio-UI</span>
                    </h1>
                </div>
                <div className="docs-container__right">
                    <ul className="nav">
                        <li className={classNames("nav-item", { active: path === `/${i18nPath}/docs/guide` })}>
                            <NavLink to={`/${i18nPath}/docs/guide`} activeClassName="active">
                                <FormattedMessage id="app.header.menu.guide" />
                            </NavLink>
                        </li>
                        <li className={classNames("nav-item", { active: path === `/${i18nPath}/components` })}>
                            <NavLink to={`/${i18nPath}/components`} activeClassName="active">
                                <FormattedMessage id="app.header.menu.components" />
                            </NavLink>
                        </li>
                        <li className={classNames("nav-item", { active: path === `/${i18nPath}/resource` })}>
                            <NavLink to={`/${i18nPath}/resource`} activeClassName="active">
                                <FormattedMessage id="app.header.menu.resource" />
                            </NavLink>
                        </li>
                    </ul>
                    <a className="a-git" target="_black" href="https://github.com/the-dugtrio/dugtrio-ui">
                        GitLab
                    </a>
                    <button
                        className="neg-btn"
                        onClick={() => {
                            toggleLanguage();
                        }}
                    >
                        <FormattedMessage id="app.header.lang" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Head;
