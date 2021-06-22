import { Menu, Layout } from 'antd';
import { useAppDispatch } from '@src/hook'
import { load as loadUserInfo } from "@store/user"
import { useEffect } from 'react';
const { Header } = Layout;

export default function TopNav() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loadUserInfo())
    }, [dispatch])
    return (
        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                <Menu.Item key="1">MGTV短链系统</Menu.Item>
            </Menu>
        </Header>
    )
}