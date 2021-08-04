import { FC } from 'react';
import { Table, Button, Tag } from "antd"
import { useAppSelector, useAppDispatch } from '@src/hook'
import { deleteTag } from '@src/store/abtag-slice';


const ShortTagListComponent: FC<{ idraw: string }> = (props: { idraw: string }) => {

    const dataSource = useAppSelector(state => state.abTag.list)
    const dispatch = useAppDispatch()
    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: '描述',
            dataIndex: 'url_desc',
            key: 'short',
            width: 200,
        },
        {
            title: '长链',
            dataIndex: 'url',
            key: 'url',
        }, {
            title: '比例',
            dataIndex: 'proportion',
            key: 'proportion',
            width: 80,
        }, {
            title: '应用',
            dataIndex: 'effective',
            key: 'effective',
            render: (value: number) => {
                return value === 0 ? <Tag color="#f50">待应用</Tag> : <Tag color="#87d068">应用中</Tag>
            },
            width: 80,
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (value: number) => {
                return value === -1 ? <Tag color="#f50">已删除</Tag> : <Tag color="#87d068">正常</Tag>
            },
            width: 80,
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (value: string, item: any) => {
                return (<Button onClick={() => {
                    dispatch(deleteTag(props.idraw, item.id))
                }}>删除</Button>)
            },
            width: 100,
        },
    ];

    return (
        <Table dataSource={dataSource} columns={columns} rowKey="id" locale={{
            "emptyText": "暂无数据"
        }} />
    )
}
export default ShortTagListComponent