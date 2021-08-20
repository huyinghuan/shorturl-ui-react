import { FC } from 'react';
import { Table, notification } from "antd"
import { Link } from "react-router-dom"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAppSelector, useAppDispatch } from '@src/hook'
import { CopyOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom"
import { loadOwnerList } from "@store/short-slice"

const ShortListComponent: FC = () => {
    const dataSource = useAppSelector(state => state.shortInfo.list)
    const pager: any = useAppSelector(state => state.shortInfo.pager)
    const isLoading = useAppSelector((state) => { return state.shortInfo.loading })
    const { shortType, owner } = useParams<{ shortType: string, owner: string }>();


    const dispatch = useAppDispatch()

    const pageChange = (page: number, pageSize?: number | undefined) => {
        if (shortType && owner) {
            dispatch(loadOwnerList(shortType, owner, { page: page, pageSize: pageSize }))
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
        },
        {
            title: '短链',
            dataIndex: 'short',
            key: 'short',
            width: 230,
            render: (value: string) => {
                return (<CopyToClipboard text={value}
                    onCopy={() => {
                        notification.success({ message: "复制成功!", duration: 1 })
                    }}>
                    <span><CopyOutlined style={{ cursor: "copy" }} /> {value} </span>
                </CopyToClipboard>)
            }
        },
        {
            title: '长链',
            dataIndex: 'url',
            key: 'url',
            ellipsis: true,
        },
        // {
        //     title: '归属',
        //     dataIndex: 'owner',
        //     key: 'owner',
        // },
        // {
        //     title: '类型',
        //     dataIndex: 'type',
        //     key: 'type',
        //     width: 80,
        // },
        // {
        //     title: '状态',
        //     dataIndex: 'status',
        //     key: 'status',
        //     width: 80,
        //     render: (value: boolean) => {
        //         return value ? "正常" : "禁用"
        //     }
        // },
        {
            title: '分流A/B',
            dataIndex: 'params',
            key: 'params',
            render: (value: string) => {
                return value || "无分流"
            },
            width: 100,
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            width: 100,
            render: (value: string, item: any) => {
                const idRaw = item.short.split("/").pop()
                return (<span>
                    <Link
                        to={{
                            pathname: `/home/anyone-short/edit/${idRaw}`,
                        }}
                    >编辑</Link>
                </span>)
            }
        },
    ];
    return (
        <Table dataSource={dataSource}
            columns={columns}
            loading={isLoading}
            rowKey="id"
            locale={{
                "emptyText": "暂无数据"
            }}
            pagination={{
                current: pager.index,
                pageSize: pager.pageSize,
                total: pager.total,
                onChange: pageChange
            }}
            scroll={{ y: 600 }}
        />
    )
}
export default ShortListComponent