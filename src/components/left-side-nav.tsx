import { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import { MenuClickEventHandler } from 'rc-menu/lib/interface'
import { useAppSelector } from '@src/hook';
import { UserOutlined, LaptopOutlined, CoffeeOutlined, SearchOutlined } from '@ant-design/icons';

import { useLocation, useHistory, useRouteMatch, Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function LeftSideNav() {
    const { path } = useRouteMatch()
    const user: any = useAppSelector((state) => { return state.user.info })
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
        let key = location.pathname.replace("/home/", "")
        setCurrentKey(key)
    }, [location])

    return (
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                selectedKeys={[currentKey]}
                defaultOpenKeys={['user-short', 'app-short']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={menuClick}
            >
                <Menu.Item key="anyone-short" icon={<SearchOutlined />}><span>任意短链查询</span></Menu.Item>
                <SubMenu key="user-short" icon={<UserOutlined />} title="我的短链">
                    <Menu.Item key="user-short-gen">短链生成</Menu.Item>
                    {/* <Menu.Item key="user-short-edit">短链编辑</Menu.Item> */}
                    <Menu.Item key={`short/type/user/list/${user.username}`}>短链列表</Menu.Item>
                </SubMenu>
                <SubMenu key="app-short" icon={<LaptopOutlined />} title="我的应用接入">
                    <Menu.Item key="app">应用申请与列表</Menu.Item>
                </SubMenu>
                <SubMenu key="help-doc" icon={<CoffeeOutlined />} title="使用帮助">
                    <Menu.Item key={`doc/api-v2.md`}>API生成短链</Menu.Item>
                    <Menu.Item key={`doc/batch-import.md`}>批量导入生成</Menu.Item>
                    <Menu.Item key={`doc/safe.md`}>API安全!必读!</Menu.Item>
                </SubMenu>
                <Menu.Item key="qrcode" icon={<SearchOutlined />}>
                    <Link to='/qrcode' target='qrcode'> 二维码生成工具 </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}