import { DownOutlined } from '@ant-design/icons';
import { Avatar, Col, Dropdown, MenuProps, Row, Space, Typography } from 'antd';
import React from 'react';
import Wrapper from './style';

const { Title } = Typography;

export function AppHeader() {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
                    Sign In
                </a>
            ),
        },
        {
            key: '2',
            danger: true,
            label: 'Sign Out',
        },
    ];

    return (
        <Wrapper>
            <Row className='full-width-height'>
                <Col span={4}>
                    <Space>
                        <Title level={4}>IMAS | your invoice solution</Title>
                    </Space>
                </Col>
                <Col span={16}></Col>
                <Col span={4}>
                    <Space direction='vertical' className='header-user-space'>
                        <Dropdown menu={{ items }} placement='bottom'>
                            <Space>
                                <Avatar></Avatar>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
        </Wrapper>
    );
}
