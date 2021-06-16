import { FC, useState } from 'react';
import { Input, Row, Col, Divider } from 'antd';
import ShortList from "@components/short-list"

const { Search } = Input;
const AnyShortPage: FC = () => {
    const [isSearching, setIsSearching] = useState(false)
    const [dataSource, setDatasource] = useState([] as any[])
    const search = (short: string) => {
        console.log(short)
        setIsSearching(true)
        setTimeout(() => {
            setDatasource([{
                id: 1,
                short: "a"
            }])
            setIsSearching(false)
        }, 1000)
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
                <ShortList dataSource={dataSource} />
            </Col>
        </Row>
    </>)
};

export default AnyShortPage;