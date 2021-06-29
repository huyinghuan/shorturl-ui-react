import { Menu, Layout, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@src/hook'
import { load as loadUserInfo } from "@store/user"
import { useEffect } from 'react';
import { UserOutlined, LogoutOutlined } from "@ant-design/icons"
const { Header } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;
export default function TopNav() {
    const dispatch = useAppDispatch()
    const userInfo: any = useAppSelector((state) => { return state.user.info })
    useEffect(() => {
        dispatch(loadUserInfo())
    }, [dispatch])

    const menuClick = function (item: any) {
        switch (item.key) {
            case "signOut":
                //signOut()
                break
            default:
        }
    }
    return (
        <Header className="header">
            <div className="logo"><Title level={4}>短链系统</Title></div>
            <Menu
                mode="horizontal"
                style={{ lineHeight: '64px', float: "right" }}
                onClick={(item: any) => { menuClick(item) }}
            >
                {!userInfo.username ? (<Menu.Item key="3">未登录</Menu.Item>) :
                    <SubMenu key="sub1" title={
                        <span><UserOutlined /><span>{userInfo.username}</span></span>
                    }>
                        <Menu.Item key="signOut"><span><LogoutOutlined /><span>退出系统</span></span></Menu.Item>
                    </SubMenu>
                }
            </Menu>
        </Header>
    )
}