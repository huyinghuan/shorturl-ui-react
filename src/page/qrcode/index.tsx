import { FC, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '@src/hook'
import { load } from "@store/short-slice"
import { useParams, Link } from "react-router-dom"
import QRCode from "@components/qrcode"
const QRCodePage: FC = () => {
    const dispatch = useAppDispatch()
    const info: any = useAppSelector((state) => { return state.shortInfo.info })
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        dispatch(load(id))
    }, [id, dispatch]);
    return (
        <div style={{ margin: "50px"}} >
            <h1 style={{textAlign: "center"}}>{info.short}</h1>
            <h3 style={{textAlign: "center", marginBottom:"10px"}}>
                <Link to='/qrcode'> 点我生成自定义二维码</Link>
            </h3>
            <QRCode data={info.short}/>
        </div>
    )
}

export default QRCodePage;