import { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import { MenuClickEventHandler } from 'rc-menu/lib/interface'
import {
    AppstoreOutlined, UnorderedListOutlined, AppstoreAddOutlined,
    TeamOutlined, UserOutlined, UserAddOutlined, HomeOutlined, LaptopOutlined
} from '@ant-design/icons';

import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function LeftSideNav() {
    const { path } = useRouteMatch()

    let history = useHistory();
    const menuClick: MenuClickEventHandler = function ({ key }) {
        console.log(key);
        const targetPath = `/home/${key}`
        console.log(targetPath);
        if (targetPath !== path) {
            history.push(`/home/${key}`)
        }
    }

    const [currentKey, setCurrentKey] = useState("")

    let location = useLocation();
    useEffect(() => {
        let arr = location.pathname.split("/")
        let key = ""
        if (arr.length === 2) {
            key = arr[1]
        } else if (arr.length > 1) {
            key = arr[2]
        }
        setCurrentKey(key)
    }, [location])

    return (
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={[currentKey]}
                defaultOpenKeys={['user-short', 'app-short']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={menuClick}
            >
                <Menu.Item key="anyone-short"><span>任意短链查询</span></Menu.Item>
                <SubMenu key="user-short" icon={<UserOutlined />} title="我的短链">
                    <Menu.Item key="user-short-gen">短链生成</Menu.Item>
                    <Menu.Item key="user-short-edit">短链编辑</Menu.Item>
                    <Menu.Item key="user-short-list">查询与列表</Menu.Item>
                </SubMenu>
                <SubMenu key="app-short" icon={<LaptopOutlined />} title="我的应用接入">
                    <Menu.Item key="app-token-list">应用列表</Menu.Item>
                    <Menu.Item key="app-token-create">应用申请</Menu.Item>
                    <Menu.Item key="app-short-query">应用短链查询</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
}