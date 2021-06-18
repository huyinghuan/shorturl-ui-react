import { FC, useEffect } from "react"
import { Form, Input, Button, Divider, Row, Col } from "antd"
import { useParams, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '@src/hook'
import { loadInfo } from "@store/short-slice"
const ShortEdit: FC = function () {
    const { type, id } = useParams<{ type: string, id: string }>();
    const [form] = Form.useForm();

    const isLoading = useAppSelector((state) => { return state.shortInfo.loading })
    const info = useAppSelector((state) => { return state.shortInfo.info })

    const dispatch = useAppDispatch()

    //  dispatch(loadInfo(type, id))
    // let location = useLocation();
    useEffect(() => {
        console.log("update")
        dispatch(loadInfo(type, id))
    }, [type, id, dispatch]);

    useEffect(() => {
        console.log("data get")
        form.setFieldsValue(info)
    }, [info, form])


    const onFinish = (values: any) => {

    };
    return (
        <>
            <Form
                layout="inline"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item label="短链" name="short">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="长链" name="url">
                    <Input style={{ width: 340 }} placeholder="输入长链地址" />
                </Form.Item>
                <Form.Item >
                    <Button style={{ marginRight: 20, backgroundColor: "#39e839", color: "white" }}>保存</Button>
                    <Button type="primary">应用</Button>
                </Form.Item>
            </Form>
            <Divider />
            <Row>
                <Col span={24}>
                </Col>
            </Row>
        </>
    )
}

export default ShortEdit