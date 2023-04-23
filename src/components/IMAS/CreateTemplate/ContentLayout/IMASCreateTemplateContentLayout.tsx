import { Checkbox, Collapse, Space } from 'antd';
import React from 'react';
import { InvoiceLayout } from '../../../../types/invoice';

const { Panel } = Collapse;

interface Props {
    invoiceLayout: InvoiceLayout;
    setInvoiceLayout: (invoiceLayout: InvoiceLayout) => void;
}

export function IMASCreateTemplateContentLayout({ invoiceLayout, setInvoiceLayout }: Props) {
    function handleTitleLeftChange(isTitleLeft: boolean) {
        setInvoiceLayout({ ...invoiceLayout, isTitleLeft });
    }

    function handleSecondColumnChange(isSecondColumn: boolean) {
        setInvoiceLayout({ ...invoiceLayout, isSecondColumn });
    }

    return (
        <Collapse className='editor-collapse' bordered={false} defaultActiveKey={['1', '2', '3']}>
            <Panel header='Main Header' key='1'>
                <Space direction='vertical'>
                    <Checkbox
                        checked={invoiceLayout.isTitleLeft}
                        onChange={(e) => handleTitleLeftChange(e.target.checked)}
                    >
                        Title Left
                    </Checkbox>
                </Space>
            </Panel>
            <Panel header='Client Contact' key='3'>
                <Space direction='vertical'>
                    <Checkbox
                        checked={invoiceLayout.isSecondColumn}
                        onChange={(e) => handleSecondColumnChange(e.target.checked)}
                    >
                        Second Column
                    </Checkbox>
                </Space>
            </Panel>
        </Collapse>
    );
}
