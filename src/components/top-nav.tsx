import { Menu, Layout } from 'antd';


const { Header, Content, Sider } = Layout;

export default function TopNav() {
    return (
        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                <Menu.Item key="1">MGTV短链系统</Menu.Item>
            </Menu>
        </Header>
    )
}