import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import LeftSideNav from "@components/left-side-nav"
import TopNav from "@components/top-nav"

import MyAppListPage from "@pages/app/my-app-list"

import UserShortGenPage from "@pages/user/gen"
import URLListPage from "@pages/url-list"
import AnyoneQueryPage from "@pages/anyone-short"
import EditShortPage from "@pages/short-edit"
import EditAppPage from "@pages/app/app-edit"
import ImportAndGenPage from "@pages/app/import-and-gen"
import DocsPages from '@pages/doc';
import { useRouteMatch, useLocation } from 'react-router-dom';


import "./home.scss"
const { Content, Footer } = Layout;
export default function Home() {

    const { path } = useRouteMatch()
    const { pathname } = useLocation()

    return (
        <Layout style={{ height: "100vh" }}>
            <TopNav />
            <Layout>
                <LeftSideNav />
                <Layout style={{ padding: '0 24px 24px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {pathname === path ? <div>hello</div> :

                            <Switch>
                                <Route exact path={`${path}/anyone-short`} component={AnyoneQueryPage} />
                                <Route exact path={`${path}/anyone-short/edit/:idraw`} component={EditShortPage} />
                                <Route exact path={`${path}/user-short-gen`} component={UserShortGenPage} />
                                <Route exact path={`${path}/short/type/:shortType/list/:owner`} component={URLListPage} />
                                <Route exact path={`${path}/app`} component={MyAppListPage} />
                                <Route exact path={`${path}/app/edit/:id`} component={EditAppPage} />
                                <Route exact path={`${path}/app/:id/import-and-gen`} component={ImportAndGenPage} />
                                <Route exact path={`${path}/doc/:doc`} component={DocsPages} />
                            </Switch>
                        }
                    </Content>
                </Layout>
            </Layout>
            <Footer></Footer>
        </Layout>
    )
}