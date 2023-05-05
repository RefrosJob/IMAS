import {
    DollarCircleOutlined,
    HomeOutlined,
    LayoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps, Space, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IMASKeys } from '../../types/appRouter';
import Wrapper from './styles';

const { Title } = Typography;

export function IMAS(): JSX.Element {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);
    const [selection, setSelection] = useState('1');
    const navigate = useNavigate();
    const currLocation = location.pathname;

    type MenuItem = Required<MenuProps>['items'][number];

    function getSelection(currLocation: string) {
        if (currLocation === '/IMAS/Home') {
            return [IMASKeys.home];
        }
        if (currLocation === '/IMAS/Create/Invoice') {
            return [IMASKeys.create, IMASKeys.createInvoice];
        }
        if (currLocation === '/IMAS/Create/Template') {
            return [IMASKeys.create, IMASKeys.createTemplate];
        }
        return ['2'];
    }

    const items: MenuItem[] = [
        getItem('Home', IMASKeys.home, <HomeOutlined />),
        getItem('Create new', IMASKeys.create, <PlusOutlined />, [
            getItem('Invoice', IMASKeys.createInvoice, <DollarCircleOutlined />),
            getItem('Template', IMASKeys.createTemplate, <LayoutOutlined />),
            getItem('Data Template', IMASKeys.createDataTemplate, <LayoutOutlined />),
        ]),
        getItem('User Management', IMASKeys.userManagement, <UserOutlined />),
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
        if (e.key === IMASKeys.home) {
            navigate('/IMAS/Home');
        }
        if (e.key === IMASKeys.createInvoice) {
            navigate('/IMAS/Create/Invoice');
        }
        if (e.key === IMASKeys.createTemplate) {
            navigate('/IMAS/Create/Template');
        }
    };

    function createBreadCrumbs() {
        const locationElements = location.pathname.split('/');
        if (locationElements.length && locationElements.includes('IMAS')) {
            return locationElements.map((item, index) => (
                <Breadcrumb.Item key={`${item}-${index}`}>{item}</Breadcrumb.Item>
            ));
        }
    }

    return (
        <Wrapper>
            <Layout className='imas-layout'>
                <Sider
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    className='imas-sider'
                    onMouseOver={() => setCollapsed(false)}
                    onMouseOut={() => setCollapsed(true)}
                >
                    <Menu
                        className='imas-sider-menu'
                        defaultSelectedKeys={['1']}
                        selectedKeys={getSelection(currLocation)}
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
                                {createBreadCrumbs()}
                            </Breadcrumb>
                        </Space>
                        <div className='imas-content'>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Wrapper>
    );
}
