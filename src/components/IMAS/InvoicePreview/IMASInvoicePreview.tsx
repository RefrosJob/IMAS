import React, { useState } from 'react';
import { generateTemplate } from '../../../microservices/templateGenerator';
import { InvoiceData, InvoiceStyling } from '../../../types/invoice';
import Wrapper from './styles';
import { Select } from 'antd';

interface Props {
    invoiceData: InvoiceData;
    invoiceStyling: InvoiceStyling;
}

export function IMASInvoicePreview({ invoiceData, invoiceStyling }: Props): JSX.Element {
    const [scale, setScale] = useState(0.5);
    const scaleSelectOptions = [
        { value: 1, label: '100%' },
        { value: 0.75, label: '75%' },
        { value: 0.5, label: '50%' },
        { value: 0.25, label: '25%' },
    ];

    function handleScaleChange(scale: number): void {
        return setScale(scale);
    }

    return (
        <Wrapper>
            <Select
                className='floating-select'
                defaultValue={0.5}
                onChange={handleScaleChange}
                options={scaleSelectOptions}
            />
            <div className='invoice-preview-wrapper custom-scrollbar'>
                <div
                    style={{
                        transform: `scale(${scale})`,
                        translate:
                            scale < 1 ? `0 -${(scale < 0.5 ? 2.5 : 0.8 / scale) * 10}rem` : '0',
                    }}
                    dangerouslySetInnerHTML={{
                        __html: generateTemplate(invoiceData, invoiceStyling),
                    }}
                />
            </div>
        </Wrapper>
    );
}
