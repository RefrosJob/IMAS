import { Button, Col, Input, Modal, Row, Space, Tabs, TabsProps, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { IMASCreateTemplateHeaders } from './Headers/IMASCreateTemplateHeaders';
import { IMASCreateTemplatePersistantData } from './PersistantData/IMASCreateTemplatePersistantData';
import Wrapper from './styles';
import { IMASCreateTemplateContentLayout } from './ContentLayout/IMASCreateTemplateContentLayout';
import { InvoiceData, InvoiceFull, InvoiceLayout, InvoiceStyling } from '../../../types/invoice';
import {
    invoiceLayoutTemplate,
    getInvoiceTemplate,
    invoiceStylingTemplate,
} from '../../../microservices/helpers/invoiceHelper';
import { IMASCreateTemplateStyling } from './Styling/IMASCreateTemplateStyling';
import { getFromLS, setToLS } from '../../../microservices/storage';
import { useNavigate } from 'react-router-dom';
import { IMASInvoicePreview } from '../InvoicePreview/IMASInvoicePreview';
import { IMASCreateTemplateBase } from './Base/IMASCreateTemplateBase';

const { Title } = Typography;

export function IMASCreateTemplate(): JSX.Element {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInputError, setIsInputError] = useState(false);

    const [templateName, setTemplateName] = useState('');
    const [baseId, setBaseId] = useState(0);
    const [invoiceLayout, setInvoiceLayout] = useState<InvoiceLayout>(invoiceLayoutTemplate);
    const [invoiceData, setInvoiceData] = useState<InvoiceData>(getInvoiceTemplate(invoiceLayout));
    const [invoiceStyling, setInvoiceStyling] = useState<InvoiceStyling>(invoiceStylingTemplate);

    function handleSave() {
        if (templateName === '') {
            return setIsInputError(true);
        }
        try {
            const currentTemplates = getFromLS<InvoiceFull[]>('invoice-list');
            setToLS<InvoiceFull[]>(
                'invoice-list',
                currentTemplates.length
                    ? [
                          ...currentTemplates,
                          {
                              invoiceName: templateName,
                              invoiceLayout,
                              invoiceData,
                              invoiceStyling,
                          },
                      ]
                    : [
                          {
                              invoiceName: templateName,
                              invoiceLayout,
                              invoiceData,
                              invoiceStyling,
                          },
                      ],
            );
        } catch {
            message.error('Invoice Save Failed!');
        }
        setIsModalOpen(false);
        setIsInputError(false);
        navigate('/IMAS/Create/Invoice');
    }

    function handleCancel() {
        setIsModalOpen(!isModalOpen);
        return setIsInputError(false);
    }

    function handleBack() {
        navigate('/IMAS/Create/Invoice');
    }

    useEffect(() => {
        setInvoiceData(getInvoiceTemplate(invoiceLayout));
    }, [invoiceLayout]);

    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Base',
            children: <IMASCreateTemplateBase />,
        },
        {
            key: '2',
            label: 'Content Layout',
            children: (
                <IMASCreateTemplateContentLayout
                    invoiceLayout={invoiceLayout}
                    setInvoiceLayout={setInvoiceLayout}
                />
            ),
        },
        {
            key: '3',
            label: 'Headers',
            children: (
                <IMASCreateTemplateHeaders
                    newInvoice={invoiceData}
                    setNewInvoice={setInvoiceData}
                />
            ),
        },
        {
            key: '4',
            label: 'Persistant Data',
            children: (
                <IMASCreateTemplatePersistantData
                    invoiceData={invoiceData}
                    setInvoiceData={setInvoiceData}
                />
            ),
        },
        {
            key: '5',
            label: 'Styling',
            children: (
                <IMASCreateTemplateStyling
                    invoiceStyling={invoiceStyling}
                    setInvoiceStyling={setInvoiceStyling}
                />
            ),
        },
    ];

    return (
        <Wrapper>
            <Row>
                <Col span={10}>
                    <div className='template-editor'>
                        <Title>Create your template</Title>
                        <Space
                            direction='vertical'
                            className='inner-template-editor custom-scrollbar'
                        >
                            <Tabs items={tabItems}></Tabs>
                        </Space>
                    </div>
                </Col>
                <Col span={14}>
                    <div className='invoice-preview'>
                        <Row justify='space-between'>
                            <Col>
                                <Title>Preview</Title>
                            </Col>
                            <Col>
                                <Space>
                                    <Button onClick={() => handleBack()}> BACK </Button>
                                    <Button onClick={() => setIsModalOpen(!isModalOpen)}>
                                        SAVE
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                        <IMASInvoicePreview
                            invoiceData={invoiceData}
                            invoiceStyling={invoiceStyling}
                        />
                    </div>
                </Col>
            </Row>
            <Modal
                title='Almost Done!'
                open={isModalOpen}
                okText='Save'
                onCancel={() => handleCancel()}
                onOk={() => handleSave()}
            >
                <Space direction='vertical'>
                    <Input
                        addonBefore='Template Name: '
                        status={isInputError ? 'error' : undefined}
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                    />
                </Space>
            </Modal>
        </Wrapper>
    );
}
