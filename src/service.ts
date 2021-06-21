import { notification } from 'antd'
import axios, { AxiosResponse } from 'axios'
export const resultHandler = function (resp: AxiosResponse, isOperation?: boolean) {
    const data = resp.data
    console.log(resp.headers, resp.request)
    switch (resp.status) {
        case 200:
            if (isOperation) {
                notification.success({
                    message: '操作成功',
                    placement: 'bottomRight',
                    duration: 3,
                });
            }
            break
        case 401:
            notification.warning({
                message: '401',
                description: data || "用户未登录",
                placement: 'bottomRight',
                duration: 3,
            });
            throw new Error("错误:" + resp.statusText)
        case 403:
            notification.warning({
                message: '403',
                description: data || "此操作无权限",
                placement: 'bottomRight',
                duration: 3,
            });
            throw new Error("错误:" + resp.statusText)
        case 404:
            notification.warning({
                message: '404',
                description: data || "找不到数据",
                placement: 'bottomRight',
                duration: 3,
            });
            throw new Error("错误:" + resp.statusText)
        case 406:
            notification.error({
                message: '406',
                description: data || "提交数据错误",
                placement: 'bottomRight',
                duration: 3,
            });
            throw new Error("错误:" + resp.statusText)
        default:
            notification.error({
                message: resp.status,
                description: data || ("未知错误:" + resp.statusText),
                placement: 'bottomRight',
                duration: 3,
            });
            throw new Error("错误:" + resp.statusText)
    }
    return data
}

export const API = axios.create({
    validateStatus: function (status) {
        return true
    },
})