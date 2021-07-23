import { FC } from 'react';
import { Table, Space, Tag } from "antd"
import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '@src/hook'

import { loadList } from "@store/app-slice"

const AppListComponent: FC = () => {
    const dataSource = useAppSelector(state => state.app.list)
    const pager: any = useAppSelector(state => state.app.pager)
    const isLoading = useAppSelector((state) => { return state.app.loading })
    const dispatch = useAppDispatch()
    const pageChange = (page: number, pageSize?: number | undefined) => {
        dispatch(loadList(null, { page: page, pageSize: pageSize }))
    }
    const colors = ["magenta", "red", "purple", "geekblue", "blue", "cyan", "green"]
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
            width: 160,
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
            key: 'allow_list',
            render: (value: string) => {
                return (<>
                    {value.split(",").map((item, idx) => {
                        if (item === "") {
                            return null
                        }
                        return <Tag key={idx} color={colors[idx % colors.length]}>{item}</Tag>
                    })}
                </>)
            }
        },
        {
            title: '是否单表',
            dataIndex: 'is_single_table',
            key: 'is_single_table',
            width: 80,
            render: (value: boolean, item: any) => {
                return value ? "是" : "否"
            }
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
            width: 220,
            render: (value: string, item: any) => {
                return (<Space size="middle">
                    <Link
                        to={{
                            pathname: `/home/app/edit/${item.id}`,
                        }}
                    >编辑</Link>

                    {/* <Button type="link">删除</Button> */}
                    <Link
                        to={{
                            pathname: `/home/short/type/app/list/${item.token}`,
                        }}
                    >短链列表</Link>

                    <Link
                        to={{
                            pathname: `/home/app/${item.id}/import-and-gen`,
                        }}
                    >批量导入</Link>
                </Space>)
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