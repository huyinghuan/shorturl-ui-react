import { FC, useState } from 'react';
import { API, resultHandler } from "@src/service"
import { useParams } from "react-router-dom"
import { Form, InputNumber, Switch, Input, Button } from "antd"

const ImportAndGetPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [allowPost, setAllowPost] = useState(true)
    const [form] = Form.useForm();
    const [hasExpired, setHasExpired] = useState(false)
    const [expire, setExpired] = useState(7 * 24)
    const onExpireChange = (hour: number) => {
        setExpired(hour)
    }
    const onSwitchChange = (checked: boolean) => {
        setHasExpired(checked)
    }
    const onFinish = (valuse: any) => {
        setAllowPost(false)
        API.post(`/api/token/${id}/import-and-gen`, valuse).then((response) => {
            const result = resultHandler(response, true) || []
            form.resetFields()
            const resultContent: any = []
            result.forEach((row: any) => {
                resultContent.push(row.short + "   " + row.url)
            })
            form.setFieldsValue({
                content: resultContent.join("\n")
            })
        }).catch((e) => {
            setAllowPost(true)
            console.log(e)
        })
    }
    const onReset = () => {
        form.resetFields()
        setAllowPost(true)
    }
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onFinish}
            form={form}
            initialValues={{
                expire: expire,
            }}
        >
            <Form.Item label="热点时长(小时)" name="expire" tooltip="该时间内短链访问速度最快【谨慎设置，默认为7*24小时,最大值30*24】">
                <InputNumber onChange={onExpireChange} value={expire} max={30 * 24} />
            </Form.Item>
            <Form.Item label="长链列表,一行一个" name="content" tooltip="必须是合法链接">
                <Input.TextArea autoSize={{ minRows: 16, maxRows: 16 }} />
            </Form.Item>
            <Form.Item label="超过热点时长后是否失效?" name="has_expired">
                <Switch checked={hasExpired} onChange={onSwitchChange} />
            </Form.Item>
            {hasExpired ?
                (
                    <Form.Item label="失效后跳转地址" name="expire_url">
                        <Input />
                    </Form.Item>
                )
                : null}
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button type="primary" htmlType="submit" disabled={!allowPost} style={{ marginRight: 20 }}>提交</Button>
                <Button onClick={onReset}>重置</Button>
            </Form.Item>
        </Form>

    )
}


export default ImportAndGetPage;