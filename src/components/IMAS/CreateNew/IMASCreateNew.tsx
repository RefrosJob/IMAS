import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import Wrapper from './styles';
import { getFromLS } from '../../../microservices/storage';
import { InvoiceFull } from '../../../types/invoice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export function IMASCreateNew(): JSX.Element {
    const navigate = useNavigate();

    const templates = getFromLS<InvoiceFull[]>('invoice-list');
    return (
        <Wrapper>
            <Title>Choose a Template:</Title>
            {templates?.length ? (
                <Row gutter={[8, 8]}>
                    {templates.map((template, index) => (
                        <Col key={index}>
                            <Card
                                hoverable
                                className='template-card'
                                cover={<img alt='example' src='/logo512.png' />}
                                onClick={() => navigate(`/IMAS/Create/Invoice/${index}`)}
                            >
                                <Title level={4}>{`${index + 1}. ${template.invoiceName}`}</Title>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Title level={2}> No templates</Title>
            )}
        </Wrapper>
    );
}
