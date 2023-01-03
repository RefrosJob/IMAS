import { Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { generateTemplate } from '../../../microservices/templateGenerator';
import Wrapper from './styles';

const { Title } = Typography;

export function IMASCreateTemplate(): JSX.Element {
    return (
        <Wrapper>
            <Row>
                <Col span={10}>
                    <Title>Create your template</Title>
                </Col>
                <Col span={14}>
                    <Space direction='vertical'>
                        <Title>Preview</Title>
                        <Card>
                            <div dangerouslySetInnerHTML={{ __html: generateTemplate('hello') }} />
                        </Card>
                    </Space>
                </Col>
            </Row>
        </Wrapper>
    );
}
