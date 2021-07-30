import { FC, useEffect, useState } from "react"
import { Form, Input, Button, Divider, Tag, Switch, Typography, Space, Modal } from "antd"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '@src/hook'
import { load, update, enableSingleTable } from "@store/app-slice"
import { API, resultHandler } from "@src/service"

const AppEdit: FC = function () {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [domainForm] = Form.useForm();
    const [allowList, setAllowList] = useState("")
    const info: any = useAppSelector((state) => { return state.app.singleInfo })
    const userInfo: any = useAppSelector((state) => { return state.user.info })
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(load(id))
    }, [id, dispatch]);

    useEffect(() => {
        form.setFieldsValue(info)
        setAllowList(info.allow_list || "")
    }, [info, form])


    const addDomain = function (data: any) {
        if (allowList === "") {
            setAllowList(data.domain)
            return
        }
        let arr = allowList.split(",")
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === data.domain || !data.domain) {
                return
            }
        }
        setAllowList([allowList, data.domain].join(","))
        domainForm.setFieldsValue({ domain: "" })
    }

    const removeDomain = function (idx: number) {
        const queue: Array<string> = []
        allowList.split(",").forEach((item, i) => {
            if (i !== idx) {
                queue.push(item)
            }
        })
        setAllowList(queue.join(","))
    }
    const onFinish = (values: any) => {
        dispatch(update(id, {
            app_name: values.app_name,
            allow_list: allowList
        }))
    };

    const OnSave = () => {
        onFinish({
            app_name: form.getFieldValue("app_name")
        })
    }

    const onChange = function (checked: boolean) {
        dispatch(enableSingleTable(id, checked))
    }

    const showSQL = function () {
        API.get(`/api/token/${id}/new-table-sql`).then((response) => {
            const result = resultHandler(response) || ""
            console.log(result)
            Modal.info({
                title: "SQL",
                content: (
                    <pre>{result}</pre>
                ),
                width: 800,
            })
        }).catch((e) => {
            console.log(e)
        })
    }

    const colors = ["magenta", "red", "purple", "geekblue", "blue", "cyan", "green"]
    let greenBtnCss = { marginRight: 20, backgroundColor: "#21ba45", color: "white" }
    return (
        <>
            <Form
                layout="inline"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item label="应用名称" name="app_name">
                    <Input />
                </Form.Item>
                <Form.Item label="Token" name="token">
                    <Input style={{ width: 340 }} disabled />
                </Form.Item>
                <Form.Item >
                    <Button style={greenBtnCss} type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
            <Divider orientation="left">分表 <Typography.Link href="http://git.hunantv.com/huyinhuan/shorturl" style={{ fontSize: 12 }}>什么是分表?</Typography.Link></Divider>
            <Form>
                <Space>
                    <Form.Item label="启用分表">
                        <Switch onChange={onChange} checked={info.is_single_table} />
                    </Form.Item>
                    {!userInfo.isAdmin ? null : <Form.Item><Button style={greenBtnCss} onClick={showSQL}>查看建表语句</Button></Form.Item>}
                </Space>
            </Form>

            <Divider orientation="left">域名白名单</Divider>
            <Form
                layout="inline"
                onFinish={addDomain}
                form={domainForm}
            >
                <Form.Item label="域名" name="domain">
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" style={greenBtnCss} htmlType="submit">添加</Button>
                    <Button style={{ backgroundColor: "#1890ff", color: "white" }} onClick={OnSave}>保存</Button>
                </Form.Item>
            </Form>

            <Divider orientation="left">白名单列表</Divider>
            <div>
                {allowList.split(",").map((item, idx) => {
                    if (item === "") {
                        return null
                    }
                    return <Tag key={item + "_" + idx} color={colors[idx % colors.length]} closable={true} onClose={() => { removeDomain(idx) }}>{item}</Tag>
                })}
            </div>
        </>
    )
}

export default AppEdit