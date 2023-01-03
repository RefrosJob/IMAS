import {
    DollarCircleOutlined,
    LayoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { IMASKeys } from '../../types/appRouter';
import Wrapper from './styles';

const { Title } = Typography;

export function IMAS(): JSX.Element {
    const [collapsed, setCollapsed] = useState(false);
    const [selection, setSelection] = useState('1');
    const navigate = useNavigate();

    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        getItem('Create new', 'create', <PlusOutlined />, [
            getItem('Invoice', IMASKeys.createInvoice, <DollarCircleOutlined />),
            getItem('Template', IMASKeys.createTemplate, <LayoutOutlined />),
        ]),
        getItem('User', '4', <UserOutlined />, [
            getItem('Tom', '5'),
            getItem('Bill', '6'),
            getItem('Alex', '7'),
        ]),
    ];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const handleSelection: MenuProps['onClick'] = (e) => {
        setSelection(e.key);
        if (e.key === IMASKeys.createInvoice) {
            navigate('/IMAS/Create/Invoice');
        }
        if (e.key === IMASKeys.createTemplate) {
            navigate('/IMAS/Create/Template');
        }
    };

    return (
        <Wrapper>
            <Layout className='imas-layout'>
                <Sider
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    className='imas-sider'
                >
                    <Title level={3}> IMAS </Title>
                    <Menu
                        className='imas-sider-menu'
                        defaultSelectedKeys={['1']}
                        selectedKeys={[selection]}
                        onClick={handleSelection}
                        mode='inline'
                        items={items}
                    />
                </Sider>
                <Layout className='site-layout'>
                    <Content style={{ margin: '0 16px' }}>
                        <Space className='imas-content-head'>
                            {React.createElement(
                                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                },
                            )}
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                        </Space>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Wrapper>
    );
}
