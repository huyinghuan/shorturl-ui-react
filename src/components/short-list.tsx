import { FC } from 'react';
import { Table } from "antd"

interface ShortListProps {
    dataSource: any[]
}

const ShortListComponent: FC<ShortListProps> = ({ dataSource }: ShortListProps) => {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '短链',
            dataIndex: 'short',
            key: 'short',
        },
        {
            title: '长链',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '分流A/B',
            dataIndex: 'params',
            key: 'params',
        },
    ];
    return (
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
    )
}
export default ShortListComponent