import { FC, useEffect, useRef, useState, ChangeEvent } from 'react';
import { Slider, Row, Col, InputNumber, Collapse, Select, Input,Form, Button,Radio } from "antd"

import InputColor from './input-color';
import ColorSetting from "./color-setting"
import QRCodeStyling, {
    DotType,
    CornerSquareType,
    CornerDotType,
    FileExtension,
    Options
  } from "qr-code-styling";
const { Panel } = Collapse;
const { Option } = Select;

const QRCodeComponents: FC<{data:string}> = (props:{data:string}) => {
    const [size, setSize] = useState(256); // 二维码大小
    const [image, setImage] = useState("")
    const [imageSize, setImageSize] = useState(4) // 图片系数？
    const [imageMargin, setImageMargin] = useState(0)
    const [qrMargin, setQrMargin] = useState(0)
    
    const [bgOptions, setBgOptions] = useState<any>({color: "#FFFFFF"})

    const [dotType, setDotType] = useState("square") // 'rounded' 'dots' 'classy' 'classy-rounded' 'square' 'extra-rounded'
    const [dotColorOptions, setDotColorOptions] = useState({color:"#000000"}) 
    const [cornerSquareType, setCornerSquareType] = useState("square") // 'dot' 'square' 'extra-rounded'
    const [cornerSquareColorOptions, setCornerSquareColorOptions] = useState({color:"#000000"}) 
 

    const [cornerDotType, setCornerDotType] = useState("square") // 'dot' 'square'
    const [cornerDotColorOptions, setCornerDotColorOptions] =  useState({color:"#000000"}) 
    const [errorLevel, setErrorLevel] = useState("Q")

    const ref = useRef<HTMLDivElement>(null);

    const [options, setOptions] = useState<Options>({
        width: 300,
        height: 300,
        dotsOptions: {
            color: "#4267b2",
            type: "rounded"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    });
    const [fileExt, setFileExt] = useState<FileExtension>("png");
    const [fileName, setFileName] = useState("");
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
    useEffect(() => {
        if (ref.current) {
          qrCode.append(ref.current);
        }
      }, [qrCode, ref]);
    
    useEffect(() => {
        if (!qrCode) return;
        qrCode.update(options);
    }, [qrCode, options]);

   
    useEffect(()=>{
        setOptions({
            height: size,
            width: size,
            image: image,
            margin: qrMargin,
            imageOptions: {
                imageSize: imageSize / 10,
                margin: imageMargin,                
            },
            dotsOptions:{
                ...dotColorOptions,
                type: dotType as DotType,
            },
            cornersSquareOptions:{
                ...cornerSquareColorOptions,
                type: cornerSquareType as CornerSquareType,
            },
            cornersDotOptions:{
                ...cornerDotColorOptions,
                type: cornerDotType as CornerDotType,
            },
            backgroundOptions: bgOptions,
            qrOptions:{
                errorCorrectionLevel: errorLevel as "L" | "M" | "Q" | "H",
            },
            data: props.data
        });
    }, [props.data, size, bgOptions, imageSize, imageMargin, qrMargin, dotColorOptions, dotType, cornerSquareColorOptions, cornerSquareType, cornerDotColorOptions, cornerDotType, errorLevel, image])


    const getBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

    const onDownloadClick = () => {
        if (!qrCode) return;
        qrCode.download({
            name:"qr",
            extension: fileExt
        });
    };
    return (
            <Row>
                <Col span={14}>
                <Collapse defaultActiveKey={['1','2']}>
                    <Panel header="基本配置" key="1">
                        <Form>
                            <Row>
                                <Col span={9}>
                                    <Form.Item label="大小">
                                        <Input.Group compact> 
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px' }}>
                                                <Slider  min={50} max={512} onChange={value => setSize(value)} value={typeof size === 'number' ? size : 0}/>
                                            </Form.Item>
                                            <Form.Item>
                                                <InputNumber min={50} max={512} style={{ margin: '0 16px' }} value={size} onChange={value => setSize(value)}/>
                                            </Form.Item>
                                        </Input.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Form.Item label="外边距">
                                        <Input.Group compact>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px' }}>
                                                <Slider  min={0} max={size/4} onChange={value => setQrMargin(value)} value={typeof qrMargin === 'number' ? qrMargin : 0}/>
                                            </Form.Item>
                                            <Form.Item>
                                                <InputNumber min={0} max={size/4} style={{ margin: '0 16px' }} value={qrMargin} onChange={value => setQrMargin(value)}/>
                                            </Form.Item>
                                        </Input.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="纠错级别">
                                        <Select defaultValue={errorLevel} style={{ width: 120 }} onChange={(v)=>{setErrorLevel(v)}}>
                                            <Option value="L">L</Option>
                                            <Option value="M">M</Option>
                                            <Option value="Q">Q</Option>
                                            <Option value="H">H</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                           <Row>
                                <Col span={12}>
                                    <Form.Item label="Logo">
                                        <Input.Group compact>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                                                <Input type="file" value={fileName} onChange={(e)=>{
                                                    if(e.currentTarget.files){
                                                        getBase64(e.currentTarget.files[0]).then(res=>{
                                                            setImage(res as string)
                                                        })
                                                    }
                                                    setFileName(e.currentTarget.value)
                                                }} accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" />
                                            </Form.Item>
                                            <Form.Item><Button onClick={()=>{ setImage("");  setFileName("")}}>清除</Button></Form.Item>
                                        </Input.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="logo比例">
                                        <InputNumber min={0} max={5} value={imageSize} onChange={value => setImageSize(value)}/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="logo边距">
                                    <InputNumber min={0} max={5} value={imageMargin} onChange={value => setImageMargin(value)}/>
                                    </Form.Item>
                                </Col>
                           </Row>
                        </Form>
                    </Panel>
                    <Panel header="背景" key="2">
                        <ColorSetting defaultColor='#FFFFFF' onChange={(options:any)=>{
                            setBgOptions(options)
                        }} />
                    </Panel>
                    <Panel header="内部图形" key="3">
                        <Form>
                            <Form.Item label="样式">
                                <Select defaultValue={dotType} style={{ width: 120 }} onChange={(v)=>{setDotType(v)}}>
                                    <Option value="square">正方形</Option>
                                    <Option value="dots">圆</Option>
                                    <Option value="rounded">样式3</Option>
                                    <Option value="classy">样式4</Option>
                                    <Option value="classy-rounded">样式5</Option>
                                    <Option value="extra-rounded">样式6</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                        <ColorSetting defaultColor='#000000' onChange={(options:any)=>{
                            setDotColorOptions(options)
                        }} />
                    </Panel>
                    <Panel header="三角定位外圈" key="4">
                        <Form>
                            <Form.Item label="样式">
                                <Select defaultValue={cornerSquareType} style={{ width: 120 }} onChange={(v)=>{setCornerSquareType(v)}}>
                                    <Option value="square">正方形</Option>
                                    <Option value="dot">圆</Option>
                                    <Option value="extra-rounded">圆角正方形</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                        <ColorSetting defaultColor='#000000' onChange={(options:any)=>{
                            setCornerSquareColorOptions(options)
                        }} />
                    </Panel>
                    <Panel header="三角定位内圈" key="5">
                        <Form>
                            <Form.Item label="样式">
                                <Select defaultValue={cornerDotType} style={{ width: 120 }} onChange={(v)=>{setCornerDotType(v)}}>
                                    <Option value="square">正方形</Option>
                                    <Option value="dot">圆</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                        <ColorSetting defaultColor='#000000' onChange={(options:any)=>{
                            setCornerDotColorOptions(options)
                        }} />
                    </Panel>

                </Collapse>
                </Col>
                <Col span={1}></Col>
                <Col span={8}>
                    <Row>
                        <Col span={24}>
                            <div ref={ref}/>
                        </Col>
                    </Row>
                   <Row>
                       <Col span={24}>
                            <Form layout='inline'>
                                <Form.Item>
                                    <Button onClick={onDownloadClick}>下载</Button>
                                </Form.Item>
                                <Form.Item >
                                    <Select value={fileExt} onChange={(v)=>{
                                        console.log(v,88877)
                                        setFileExt(v as FileExtension)}
                                        }>
                                        <Option value="png">PNG</Option>
                                        <Option value="jpeg">JPEG</Option>
                                        <Option value="svg">SVG</Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                       </Col>
                       <Col  style={{ marginTop:"10px"}}>
                        <span style={{color:"red"}}>注意:!!! 配置越复杂,二维码识别难度越大，生成二维码后请多扫描测试几次!!! </span>
                       </Col>
                   </Row>
                    
                    
                </Col>
            </Row>
    )
}

export default QRCodeComponents;