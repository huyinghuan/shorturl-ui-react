import { FC, useState } from 'react';


import { Input } from 'antd';
import QRCode from "@components/qrcode"
const QRCodePage: FC = () => {
    const [qr , setQR] = useState("https://www.mgtv.com")
    return (
        <div className="qrcode-page" style={{ margin: "20px 50px"}} >
            <h1>二维码生成工具</h1>
            <div style={{marginBottom:"20px"}}>
                <Input value={qr} onChange={(e)=>{setQR(e.currentTarget.value)}} />
            </div>
            <QRCode data={qr} />
        </div>
    )
}

export default QRCodePage;