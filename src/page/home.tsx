import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import LeftSideNav from "@components/left-side-nav"
import TopNav from "@components/top-nav"

import AppRegisterPage from "@pages/app/register"
import MyAppListPage from "@pages/app/my-app-list"
import AppURLListPage from "@pages/app/url-list"

import UserShortGenPage from "@pages/user/gen"
import UserURLListPage from "@pages/user/url-list"
import EditShortPage from "@pages/user/edit-short"
import AnyoneQueryPage from "@pages/anyone-short"


import { useRouteMatch } from 'react-router-dom';


import "./home.scss"
const { Header, Content, Sider } = Layout;
export default function Home() {

    const path = useRouteMatch()

    console.log(path, 9999)

    return (
        <Layout>
            <TopNav />
            <Layout>
                <LeftSideNav />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path={`${path}/anyone-short`} component={AnyoneQueryPage} />

                            <Route exact path={`${path}/user/gen`} component={UserShortGenPage} />
                            <Route exact path={`${path}/user/:id/edit`} component={EditShortPage} />
                            <Route exact path={`${path}/user/url-list`} component={UserURLListPage} />

                            <Route exact path={`${path}/app/register`} component={AppRegisterPage} />
                            <Route exact path={`${path}/app/list`} component={MyAppListPage} />
                            <Route exact path={`${path}/app/:id/url-list`} component={AppURLListPage} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}