import { FC, useEffect } from "react"
import { Form, Input, Button, Divider, Row, Col, Select, InputNumber } from "antd"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '@src/hook'
import { load as loadTags, create as createTag } from "@store/abtag-slice"
import { load as loadShort, update as updateShort, deploy } from "@store/short-slice"
import ABTagList from "@components/ab-tag"
const { Option } = Select;


const ShortEdit: FC = function () {
    const { idraw } = useParams<{ idraw: string }>();
    const [form] = Form.useForm();
    const [tagForm] = Form.useForm();
    const isLoading = useAppSelector((state) => { return state.shortInfo.loading })
    const doing = useAppSelector((state) => { return state.shortInfo.doing })
    const info = useAppSelector((state) => { return state.shortInfo.info })

    const dispatch = useAppDispatch()

    //  dispatch(loadInfo(type, id))
    // let location = useLocation();
    useEffect(() => {
        dispatch(loadTags(idraw))
        dispatch(loadShort(idraw))
    }, [idraw, dispatch]);

    useEffect(() => {
        form.setFieldsValue(info)
    }, [info, form])

    const apply = function () {
        dispatch(deploy(idraw))
    }

    const onFinish = (values: any) => {
        dispatch(updateShort(idraw, values))
    };

    const addTag = (values: any) => {
        dispatch(createTag(idraw, values))
        tagForm.setFieldsValue({
            url: "",
            url_desc: "",
            proportion: 0,
        })
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
                    <Button type="primary" onClick={apply} loading={doing}>应用</Button>
                </Form.Item>
            </Form>
            <Divider orientation="left">分流设置</Divider>
            <Form
                layout="inline"
                onFinish={addTag}
                form={tagForm}
            >
                <Form.Item label="描述" name="url_desc">
                    <Input placeholder="长链描述" />
                </Form.Item>
                <Form.Item label="长链" name="url">
                    <Input style={{ width: 340 }} placeholder="输入长链地址" />
                </Form.Item>
                <Form.Item
                    name="proportion"
                    label="分流比例"
                >
                    <InputNumber type="number" style={{ width: 120 }} placeholder="0-100" />
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