import { Menu, Layout } from 'antd';
import { useAppDispatch, useAppSelector } from '@src/hook'
import { load as loadUserInfo, signOut } from "@store/user"
import { useEffect, CSSProperties } from 'react';
import { UserOutlined, LogoutOutlined } from "@ant-design/icons"
const { Header } = Layout;
const { SubMenu } = Menu;

export default function TopNav() {
    const dispatch = useAppDispatch()
    const userInfo: any = useAppSelector((state) => { return state.user.info })
    useEffect(() => {
        dispatch(loadUserInfo())
    }, [dispatch])

    const menuClick = function (item: any) {
        switch (item.key) {
            case "signOut":
                dispatch(signOut())
                break
            default:
        }
    }
    const cssStyle: CSSProperties = {
        "color": "#ee6501",
        "fontWeight": "bold",
        "fontSize": "1.5em"
    }
    return (
        <Header className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={cssStyle}>MGTV短链系统</span>
            <span style={{ "color": "white" }}>
                注意该版本不支持查询修改以前的老短链，如有需要请联系 胡瀛寰 处理
            </span>
            <Menu
                mode="horizontal"
                onClick={(item: any) => { menuClick(item) }}
            >
                <SubMenu key="sub1"
                    title={<span><UserOutlined /><span>{userInfo.username || "未登录"}</span></span>}>
                    <Menu.Item key="signOut"><span><LogoutOutlined /><span>退出系统</span></span></Menu.Item>
                </SubMenu>
            </Menu>
        </Header>
    )
}