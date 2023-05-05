import React, { useState } from 'react';
import Wrapper from './styles';
import { SketchPicker } from 'react-color';
import { InvoiceStyling } from '../../../../../types/invoice';
import { Input, Space } from 'antd';

interface Props {
    invoiceStyling: InvoiceStyling;
    setInvoiceStyling: (invoiceStyling: InvoiceStyling) => void;
}

export function IMASCreateTemplateStylingColorPicker({
    invoiceStyling,
    setInvoiceStyling,
}: Props): JSX.Element {
    const { backgroundColor } = invoiceStyling;
    const [isShowColorPicker, setIsShowColorPicker] = useState(false);

    function handleBackGroundColorChange(backgroundColor: string) {
        setInvoiceStyling({ ...invoiceStyling, backgroundColor });
    }

    return (
        <Wrapper color={backgroundColor}>
            <Space>
                <Input addonBefore='Color: ' disabled value={backgroundColor} />
                <div
                    className='color-picker-button'
                    onClick={() => setIsShowColorPicker(!isShowColorPicker)}
                ></div>
                {isShowColorPicker ? (
                    <div className='color-picker'>
                        <div
                            className='color-picker-bg'
                            onClick={() => setIsShowColorPicker(false)}
                        ></div>
                        <SketchPicker
                            color={backgroundColor}
                            onChangeComplete={(color) => handleBackGroundColorChange(color.hex)}
                        />
                    </div>
                ) : (
                    ''
                )}
            </Space>
        </Wrapper>
    );
}
