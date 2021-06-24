import { FC, useEffect } from 'react';
import { Input, Divider, Form, Button, Row, Col } from 'antd';
import { useAppDispatch, useAppSelector } from '@src/hook'
import { create } from "@store/short-slice"
import { emptyList } from "@store/short-slice"
import ShortList from "@components/short-list"

const AnyShortPage: FC = () => {
    const isLoading = useAppSelector((state) => { return state.shortInfo.loading })
    const dispatch = useAppDispatch()
    const gen = (form: any) => {
        dispatch(create(form.url))
    }
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            url: ""
        })
    }, [isLoading, form])

    useEffect(() => {
        dispatch(emptyList())
    }, [dispatch])
    return (<>
        <Form
            layout="inline"
            onFinish={gen}
            form={form}
        >
            <Form.Item label="长链" name="url">
                <Input style={{ width: 340 }} placeholder="输入长链地址" />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" loading={isLoading} >生成</Button>
            </Form.Item>
        </Form>
        <Divider orientation="left">短链</Divider>
        <Row>
            <Col span={24}>
                <ShortList />
            </Col>
        </Row>
    </>)
};

export default AnyShortPage;