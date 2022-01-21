
import { FC, useEffect, useState } from 'react';
import { Slider, Row, Col, InputNumber, Collapse, Select, Input, Form, Button,Radio } from "antd"
import InputColor from './input-color';

const ColorSettings:FC<{onChange:any, defaultColor:string}> = (props: {onChange:any, defaultColor:string})=>{
    const {defaultColor} = props
    const [gradientType, setGradientType] = useState<string>("linear")
    const [gradientRotation, setGradientRotation] = useState<number>(90)
    const [isSingleColor, setIsSingleColor] = useState(true)
    const [color, setColor] = useState(defaultColor)
    const [starColor, setStartColor] = useState(defaultColor)
    const [endColor, setEndColor] = useState(defaultColor)

    useEffect(()=>{
        const data:any = {color:color}
        if (!isSingleColor) {
            data.gradient = {
                type: gradientType,
                rotation: gradientRotation,
                colorStops:[
                    {color:starColor, offset:0},
                    {color:endColor, offset:1}
                ],
            }
        }
        props.onChange && props.onChange(data)
    }, [gradientType, gradientRotation, isSingleColor, color, starColor, endColor])

    const singleSetting = (
        <Row>
            <Col span={6}>
                <Form.Item label="色值">
                    <InputColor color={color} onChange={(value:string) => { setColor(value) }}/>
                </Form.Item>
            </Col>
        </Row>
       
    )
    const doubeSetting = (
        <>
            {gradientType !=="radial" ? null :
            <Form.Item label="渐变角度" style={{marginBottom: "0px"}}>
                <Input.Group compact> 
                    <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px' }}>
                        <Slider  min={0} max={180} onChange={value => setGradientRotation(value)} value={typeof gradientRotation === 'number' ? gradientRotation : 0}/>
                    </Form.Item>
                    <Form.Item>
                        <InputNumber min={0} max={180} style={{ margin: '0 16px' }} value={gradientRotation} onChange={value => setGradientRotation(value)}/>
                    </Form.Item>
                </Input.Group>
            </Form.Item>
            }
            <Form.Item label="起始色" style={{marginBottom: "0px"}}>
                <Input.Group compact>
                    <Form.Item style={{marginRight: '10px'}}>
                        <InputColor color={starColor} onChange={(value:string) => { setStartColor(value) }}/>
                    </Form.Item>
                    <Form.Item>
                        <InputColor color={endColor} onChange={(value:string) => { setEndColor(value) }}/>
                    </Form.Item>
                </Input.Group>
            </Form.Item>
        </>
    )

    return (
        <Form>
            <Row>
                <Col span={6}>
                    <Form.Item label="背景色">
                        <Radio.Group options={[{label:"单色",value:true}, {label:"渐变",value:false}]} 
                            onChange={(e)=>{setIsSingleColor(e.target.value)}}
                            value={isSingleColor} 
                            optionType="button"
                            buttonStyle="solid"/>
                    </Form.Item>
                </Col>
                
                {isSingleColor ? null : (
                    <Col span={6}>
                    <Form.Item label="渐变方式">
                        <Radio.Group options={[{label:"线性",value:"linear"}, {label:"旋转",value:"radial"}]} 
                            onChange={(e)=>{setGradientType(e.target.value)}}
                            value={gradientType} 
                            optionType="button"
                            buttonStyle="solid"/>
                    </Form.Item>
                    </Col>
                )}
                
            </Row>          
            {isSingleColor ? singleSetting: doubeSetting}
        </Form>
    )
}
export default ColorSettings