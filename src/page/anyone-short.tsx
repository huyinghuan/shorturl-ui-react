import { FC } from 'react';
import { Input, Row, Col, Divider } from 'antd';
import ShortList from "@components/short-list"
import { useAppDispatch, useAppSelector } from '@src/hook'
import { search as searchAPI } from "@store/short-list-slice"
const { Search } = Input;
const AnyShortPage: FC = () => {
    const isSearching = useAppSelector((state) => { return state.shortList.loading })
    const dispatch = useAppDispatch()
    const search = (short: string) => {

        dispatch(searchAPI(short.split("/").pop() || ""))
    }
    return (<>
        <Row justify="start">
            <Col span={8}>
                <Search placeholder="完整短链地址" enterButton="查询" loading={isSearching} onSearch={search} />
            </Col>
        </Row>
        <Divider />
        <Row>
            <Col span={24}>
                <ShortList />
            </Col>
        </Row>
    </>)
};

export default AnyShortPage;