import { FC } from 'react';
import { Table, Button } from "antd"
import { Link } from "react-router-dom"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAppSelector, useAppDispatch } from '@src/hook'
import { CopyOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom"
import { loadOwnerList } from "@store/short-list-slice"

const AppListComponent: FC = () => {
    const dataSource = useAppSelector(state => state.app.list)
    const pager: any = useAppSelector(state => state.app.pager)
    const isLoading = useAppSelector((state) => { return state.app.loading })
    const dispatch = useAppDispatch()
    const pageChange = (page: number, pageSize?: number | undefined) => {
        // if (shortType && owner) {
        //     dispatch(loadOwnerList(shortType, owner, { page: page, pageSize: pageSize }))
        // }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
        },
        {
            title: '应用名称',
            dataIndex: 'app_name',
            key: 'app_name',
            width: 120,
            ellipsis: true,
        },
        {
            title: 'Token',
            dataIndex: 'token',
            key: 'token',
            width: 240,
        },
        {
            title: '域名白名单',
            dataIndex: 'allow_list',
            key: 'allow_list'
        },
        {
            title: '拥有者',
            dataIndex: 'username',
            key: 'username',
            width: 80,
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            width: 180,
            render: (value: string, item: any) => {
                return (<span>
                    <Link
                        to={{
                            pathname: `/home/app/edit/${item.id}`,
                        }}
                    >编辑</Link>
                    <Button type="link">删除</Button>
                    <Link
                        to={{
                            pathname: `/home/short/type/app/list/${item.token}`,
                        }}
                    >短链列表</Link>
                </span>)
            }
        },
    ];
    return (
        <Table dataSource={dataSource}
            size="middle"
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
export default AppListComponent