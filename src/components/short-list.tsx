import { FC } from 'react';
import { Table } from "antd"
import { Link } from "react-router-dom"

import { useAppSelector } from '@src/hook'


const ShortListComponent: FC = () => {
    const dataSource = useAppSelector(state => state.shortList.list)

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
            width: 200,
        },
        {
            title: '长链',
            dataIndex: 'url',
            key: 'url',
            ellipsis: true,
        }, {
            title: '归属',
            dataIndex: 'owner',
            key: 'owner',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: 80,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            render: (value: boolean) => {
                return value ? "正常" : "禁用"
            }
        },
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
            render: (value: string, item: any) => {
                return (<span>
                    <Link
                        to={{
                            pathname: `/home/anyone-short/edit/${item.type}/${item.id}`,
                        }}
                    >编辑</Link>
                </span>)
            }
        },
    ];
    return (
        <Table dataSource={dataSource} columns={columns} rowKey="id" locale={{
            "emptyText": "暂无数据"
        }} />
    )
}
export default ShortListComponent