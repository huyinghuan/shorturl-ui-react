import { FC, useEffect, useRef, useState } from 'react';
import { Space, Button, Slider, Row, Col, InputNumber, Input } from "antd"
import "./index.scss"
import { useAppSelector, useAppDispatch } from '@src/hook'
import { load } from "@store/short-slice"
import { useParams } from "react-router-dom"
import QRCode from 'qrcode.react'

const QRCodeComponents: FC = () => {
    const dispatch = useAppDispatch()
    const canvasRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<HTMLDivElement>(null)
    const info: any = useAppSelector((state) => { return state.shortInfo.info })
    const { id } = useParams<{ id: string }>();
    const [size, setSize] = useState(512);
    const [bgColor, setBgColor] = useState("#FFFFFF")
    const [fgColor, setFgColor] = useState("#000000")
    useEffect(() => {
        dispatch(load(id))
    }, [id, dispatch]);

    const downloadPng = () => {
        const canvas = canvasRef.current?.querySelector("canvas")
        if (!canvas) {
            return
        }
        var link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL()
        link.click();
    }
    const downloadSVG = () => {
        const svg = svgRef.current?.querySelector("svg")
        if (!svg) {
            return
        }
        //get svg source.
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svg);

        //add name spaces.
        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }
        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        //convert svg source to URI data scheme.
        var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        var link = document.createElement('a');
        link.download = 'qrcode.svg';
        link.href = url
        link.click();
    }
    return (
        <div className="qrcode-page" style={{ margin: "50px", width: "100%" }} >
            <h1>{info.short}</h1>
            <div style={{ width: "50%", marginBottom: "20px" }}>
                <Row style={{ marginBottom: "20px" }}>
                    <Col span={1}>大小</Col>
                    <Col span={12}>
                        <Slider
                            min={50} max={512}
                            onChange={value => setSize(value)}
                            value={typeof size === 'number' ? size : 0}
                        />
                    </Col>
                    <Col span={3}>
                        <InputNumber
                            min={50}
                            max={512}
                            style={{ margin: '0 16px' }}
                            value={size}
                            onChange={value => setSize(value)}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                    <Col span={2}>背景色</Col>
                    <Col span={12}>
                        <Input
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row >
                    <Col span={2}>颜色</Col>
                    <Col span={12}>
                        <Input
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                        />
                    </Col>
                </Row>
            </div>

            <Space size={100}>
                <div className="qrcode-item" ref={canvasRef}>
                    <QRCode value={info.short || ''} renderAs="canvas" size={size} level={'H'} bgColor={bgColor} fgColor={fgColor} />
                    <Button style={{ marginTop: 20 }} onClick={downloadPng}>下载png</Button>
                </div>
                <div className="qrcode-item" ref={svgRef}>
                    <QRCode value={info.short || ''} renderAs="svg" size={size} level={'H'} bgColor={bgColor} fgColor={fgColor} />
                    <Button style={{ marginTop: 20 }} onClick={downloadSVG}>下载svg</Button>
                </div>
            </Space>
        </div>
    )
}

export default QRCodeComponents;