import { FC, useEffect } from 'react';
import { Input, Divider, Form, Button, Row, Col } from 'antd';
import { useAppDispatch, useAppSelector } from '@src/hook'
import { loadList, create } from "@store/app-slice"
import AppList from "@components/app-list"

const AppPage: FC = () => {
    const isLoading = useAppSelector((state) => { return state.shortInfo.loading })
    const user: any = useAppSelector((state) => { return state.user.info })
    const dispatch = useAppDispatch()
    const add = (form: any) => {
        console.log(form)
        dispatch(create(form))
    }
    const search = (form: any) => {
        dispatch(loadList(form))
    }
    const [form] = Form.useForm()
    const [searchForm] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({
            url: ""
        })
    }, [isLoading, form])

    useEffect(() => {
        dispatch(loadList({}))
    })
    return (<>
        <Form
            layout="inline"
            onFinish={add}
            form={form}
        >
            <Form.Item label="应用名称" name="app_name">
                <Input style={{ width: 340 }} placeholder="应用名称" />
            </Form.Item>
            <Form.Item label="域名白名单" name="allow_list">
                <Input style={{ width: 340 }} placeholder="逗号隔开: mgtv.com,d.mgtv.com" />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">注册</Button>
            </Form.Item>
        </Form>
        <Divider orientation="left">查询</Divider>
        <Form
            layout="inline"
            onFinish={search}
            form={searchForm}
        >
            <Form.Item label="关键字" name="search">
                <Input style={{ width: 340 }} placeholder="应用名称或token" />
            </Form.Item>
            {user.isAdmin ? <Form.Item label="用户名" name="username">
                <Input style={{ width: 340 }} placeholder="用户名" />
            </Form.Item> : null}

            <Form.Item >
                <Button type="primary" htmlType="submit">查询</Button>
            </Form.Item>
        </Form>
        <Divider orientation="left">列表</Divider>
        <Row>
            <Col span={24}>
                <AppList />
            </Col>
        </Row>
    </>)
};

export default AppPage;