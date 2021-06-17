import { notification } from 'antd'
import { AxiosResponse } from 'axios'
export const resultHandler = function (resp: AxiosResponse) {
    const data = resp.data
    switch (resp.status) {
        case 200:
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