import { Collapse, Input, InputNumber, Space } from 'antd';
import React from 'react';
import { IMASCreateTemplateStylingColorPicker } from './ColorPicker/IMASCreateTemplateStylingColorPicker';
import { InvoiceStyling } from '../../../../types/invoice';

const { Panel } = Collapse;

interface Props {
    invoiceStyling: InvoiceStyling;
    setInvoiceStyling: (invoiceStyling: InvoiceStyling) => void;
}

export function IMASCreateTemplateStyling({ invoiceStyling, setInvoiceStyling }: Props) {
    function handleFontSizeChange(fontSize: number) {
        setInvoiceStyling({ ...invoiceStyling, fontSize });
    }

    function handleFontNameChange(fontName: string) {
        setInvoiceStyling({ ...invoiceStyling, fontName });
    }

    function handleFontFamilyChange(fontFamily: string) {
        setInvoiceStyling({ ...invoiceStyling, fontFamily });
    }

    return (
        <Collapse className='editor-collapse' bordered={false} defaultActiveKey={['1', '2', '3']}>
            <Panel header='Background' key='1'>
                <Space>
                    <IMASCreateTemplateStylingColorPicker
                        invoiceStyling={invoiceStyling}
                        setInvoiceStyling={setInvoiceStyling}
                    />
                </Space>
            </Panel>
            <Panel header='Font' key='2'>
                <Space direction='vertical'>
                    <InputNumber
                        addonBefore='Size: '
                        value={invoiceStyling.fontSize}
                        addonAfter='px'
                        onChange={(e) => handleFontSizeChange(e || 16)}
                    />
                    <Collapse
                        className='editor-collapse'
                        bordered={false}
                        defaultActiveKey={['1', '2', '3']}
                    >
                        <Panel header='Font Family' key='FF-1'>
                            <Space direction='vertical'>
                                <Input
                                    addonBefore='Font Name: '
                                    value={invoiceStyling.fontName}
                                    onChange={(e) => handleFontNameChange(e.target.value)}
                                />
                                <Input
                                    addonBefore='Generic Font Family: '
                                    value={invoiceStyling.fontFamily}
                                    onChange={(e) => handleFontFamilyChange(e.target.value)}
                                />
                            </Space>
                        </Panel>
                    </Collapse>
                </Space>
            </Panel>
        </Collapse>
    );
}
