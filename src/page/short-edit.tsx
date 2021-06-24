import { FC, useEffect } from "react"
import { Form, Input, Button, Divider, Row, Col, Select } from "antd"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '@src/hook'
import { load, update } from "@store/short-slice"
import ABTagList from "@components/ab-tag"
const { Option } = Select;


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
        dispatch(load(type, id))
    }, [type, id, dispatch]);

    useEffect(() => {
        console.log("data get")
        form.setFieldsValue(info)
    }, [info, form])

    // TODO
    const apply = function () {

    }
    const onFinish = (values: any) => {
        dispatch(update(type, id, values))
    };

    // TODO
    const addTag = (values: any) => {
        console.log(values)
    }
    let greenBtnCss = { marginRight: 20, backgroundColor: "#21ba45", color: "white" }
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
                <Form.Item
                    name="params"
                    label="分流参数"
                >
                    <Select style={{ width: 120 }}>
                        <Option value="">禁用</Option>
                        <Option value="ua">UA</Option>
                        <Option value="ip">IP</Option>
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button style={greenBtnCss} htmlType="submit" loading={isLoading}>保存</Button>
                    <Button type="primary" onClick={apply}>应用</Button>
                </Form.Item>
            </Form>
            <Divider orientation="left">分流设置</Divider>
            <Form
                layout="inline"
                onFinish={addTag}
            >
                <Form.Item label="描述" name="desc">
                    <Input placeholder="长链描述" />
                </Form.Item>
                <Form.Item label="长链" name="url">
                    <Input style={{ width: 340 }} placeholder="输入长链地址" />
                </Form.Item>
                <Form.Item
                    name="proportion"
                    label="分流比例"
                >
                    <Input type="number" style={{ width: 120 }} placeholder="0-100" />
                </Form.Item>
                <Form.Item >
                    <Button style={greenBtnCss} htmlType="submit">添加</Button>
                </Form.Item>
            </Form>
            <Divider orientation="left">分流列表</Divider>
            <Row>
                <Col span={24}>
                    <ABTagList />
                </Col>
            </Row>
        </>
    )
}

export default ShortEdit