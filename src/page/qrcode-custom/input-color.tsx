import React, {useState} from "react";
import {Input, Button, Dropdown} from "antd";
import { SketchPicker, ColorResult } from 'react-color';

export default function InputColor(props:{color:string, onChange:any}) {
  const { color, onChange } = props;

  const [internalColor, setInternalColor] = useState(color);

  const handleChange = (v:ColorResult) => {
    setInternalColor(v.hex);
    if (onChange) {
      onChange(v.hex);
    }
  };

  const overlay = (
    <SketchPicker disableAlpha={true} color={color}   onChangeComplete={handleChange}/>
  );

  return (
      <Input
        value={internalColor || ""}
        onChange={(e) => setInternalColor(e.target.value)}
        suffix={
          <Dropdown trigger={["click"]} overlay={overlay}>
            <Button style={{ background: internalColor, width: "20px", height:"20px" }}> </Button>
          </Dropdown>
        }
      />
  );
}
