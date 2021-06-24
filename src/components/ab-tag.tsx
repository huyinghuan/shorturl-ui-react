import { FC } from 'react';
import { Table, Button } from "antd"
import { useAppSelector } from '@src/hook'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'short',
    },
    {
        title: '长链',
        dataIndex: 'url',
        key: 'url',
    }, {
        title: '比例',
        dataIndex: 'proportion',
        key: 'proportion',
    }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (value: string, item: any) => {
            return (<Button>删除</Button>)
        }
    },
];

const ShortTagListComponent: FC = () => {
    const dataSource = useAppSelector(state => state.abTag.list)
    return (
        <Table dataSource={dataSource} columns={columns} rowKey="id" locale={{
            "emptyText": "暂无数据"
        }} />
    )
}
export default ShortTagListComponent