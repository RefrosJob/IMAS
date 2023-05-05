import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import { Col, List, Row, Space, Typography, message } from 'antd';
import { InvoiceInfo } from '../../../types/invoice';
import { getFromLS } from '../../../microservices/storage';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export function IMASHome() {
    const navigate = useNavigate();
    const [invoiceHistory, setInvoiceHistory] = useState<InvoiceInfo[]>();

    useEffect(() => {
        init();
    }, []);

    function init() {
        setInvoiceHistory(getFromLS<InvoiceInfo[]>('invoice-history'));
    }

    function handleHistoryNavigate(invoiceInfo: InvoiceInfo) {
        if (invoiceInfo.templateId !== undefined) {
            return navigate(`/IMAS/Create/Invoice/${invoiceInfo.templateId.toString()}`);
        }
        message.error('Invalid template ID');
    }

    return (
        <Wrapper>
            <Row justify='space-evenly' className='home-body'>
                {invoiceHistory?.length ? (
                    <Col className='history' span={8}>
                        <List
                            className='history-list'
                            header={<Title level={3}>INVOICE HISTORY</Title>}
                            bordered
                            dataSource={invoiceHistory}
                            renderItem={(item) => (
                                <List.Item
                                    className='history-item'
                                    onClick={() => handleHistoryNavigate(item)}
                                >
                                    <Title level={5}>
                                        {`${item.recipientEmail} - ${item.invoiceFull.invoiceName}`.toUpperCase()}
                                    </Title>
                                </List.Item>
                            )}
                        />
                    </Col>
                ) : null}
                <Col
                    className='send-invoice'
                    span={invoiceHistory?.length ? 8 : 12}
                    onClick={() => navigate('/IMAS/Create/Invoice')}
                >
                    <div className='centered-text'>
                        <Title> SEND NEW INVOICE </Title>
                    </div>
                </Col>
                <Col
                    className='create-template'
                    span={invoiceHistory?.length ? 8 : 12}
                    onClick={() => navigate('/IMAS/Create/Template')}
                >
                    <div className='centered-text'>
                        <Title> CREATE NEW TEMPLATE </Title>
                    </div>
                </Col>
            </Row>
        </Wrapper>
    );
}
