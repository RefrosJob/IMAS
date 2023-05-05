import { Button, Col, Collapse, Input, Modal, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFromLS, setToLS } from '../../../../microservices/storage';
import { InvoiceFull, InvoiceInfo } from '../../../../types/invoice';
import { IMASInvoicePreview } from '../../InvoicePreview/IMASInvoicePreview';
import { IMASCreateNewInvoiceDetailInput } from './DetailInput/IMASCreateNewInvoiceDetailInput';
import { IMASCreateNewInvoiceItemInput } from './ItemInput/IMASCreateNewInvoiceItemInput';
import Wrapper from './styles';
import { IMASCreateNewInvoiceTaxInput } from './TaxInput/IMASCreateNewInvoiceTaxInput';

const { Title } = Typography;
const { Panel } = Collapse;

export function IMASCreateNewInvoice(): JSX.Element | null {
    const navigate = useNavigate();
    const { templateId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInputError, setIsInputError] = useState(false);
    const [invoiceFull, setInvoiceFull] = useState(
        getFromLS<InvoiceFull[]>('invoice-list')[Number(templateId)],
    );
    const { invoiceData, invoiceStyling } = invoiceFull;
    const { invoiceDetails } = invoiceData;

    if (!templateId) {
        navigate('/IMAS/Home');
        return null;
    }

    function handleInvoiceNumberChange(invoiceNr: string) {
        setInvoiceFull({
            ...invoiceFull,
            invoiceData: { ...invoiceData, invoiceDetails: { ...invoiceDetails, invoiceNr } },
        });
    }

    function saveToHistory(invoiceInfo: InvoiceInfo) {
        const invoiceHistory = getFromLS<InvoiceInfo[]>('invoice-history');
        if (invoiceHistory.length) {
            return setToLS<InvoiceInfo[]>('invoice-history', [...invoiceHistory, invoiceInfo]);
        }
        return setToLS<InvoiceInfo[]>('invoice-history', [invoiceInfo]);
    }

    function valiedateEmail(email: string): boolean {
        const validationRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return Boolean(email.toLowerCase().match(validationRegex));
    }

    function handleSend() {
        const isValidEmail = valiedateEmail(recipientEmail);
        if (!isValidEmail) {
            return setIsInputError(true);
        }

        const invoiceInfo: InvoiceInfo = {
            templateId: Number(templateId),
            invoiceFull: invoiceFull,
            recipientEmail,
        };

        saveToHistory(invoiceInfo);
        setIsLoading(true);
        // Send simulation
        setTimeout(() => {
            setIsLoading(false);
            navigate('/IMAS/Home');
        }, 1000);
    }

    function handleCancel() {
        setIsModalOpen(false);
    }

    function handleBack() {
        navigate('/IMAS/Create/Invoice');
    }

    return (
        <Wrapper>
            <Row>
                <Col span={10}>
                    <div className='invoice-editor'>
                        <Title>Fill out the data</Title>
                        <Collapse
                            className='editor-collapse custom-scrollbar-data inner-invoice-editor'
                            bordered={false}
                            defaultActiveKey={['1', '2', '3']}
                        >
                            <Panel header='Invoice Data' key='1'>
                                <Space direction='vertical'>
                                    <Input
                                        addonBefore='Invoice Nr:'
                                        value={invoiceDetails.invoiceNr}
                                        onChange={(e) => handleInvoiceNumberChange(e.target.value)}
                                    />
                                    <IMASCreateNewInvoiceDetailInput
                                        invoiceFull={invoiceFull}
                                        setInvoiceFull={setInvoiceFull}
                                    />
                                </Space>
                            </Panel>
                            <Panel header='Item List' key='2'>
                                <IMASCreateNewInvoiceItemInput
                                    invoiceFull={invoiceFull}
                                    setInvoiceFull={setInvoiceFull}
                                />
                            </Panel>
                            <Panel header='Tax Info' key='3'>
                                <Space direction='vertical'>
                                    <IMASCreateNewInvoiceTaxInput
                                        invoiceFull={invoiceFull}
                                        setInvoiceFull={setInvoiceFull}
                                    />
                                </Space>
                            </Panel>
                        </Collapse>
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
                                    <Button onClick={() => handleBack()}>BACK</Button>
                                    <Button onClick={() => setIsModalOpen(true)}>SEND</Button>
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
                okText='Send'
                confirmLoading={isLoading}
                onCancel={() => handleCancel()}
                onOk={() => handleSend()}
            >
                <Space direction='vertical'>
                    <Input
                        addonBefore='Recipient E-mail: '
                        status={isInputError ? 'error' : undefined}
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                </Space>
            </Modal>
        </Wrapper>
    );
}
