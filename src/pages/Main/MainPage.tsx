import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { Wrapper } from './style';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export function AppPage(): JSX.Element {
    const { Header, Content } = Layout;
    const navigation = useNavigate();
    const location = useLocation();

    useEffect(() => {
        init();
    }, []);

    function init(): void {
        if (location.pathname === '/') {
            navigation('IMAS');
        }
    }

    return (
        <Wrapper>
            <Layout className='layout app-layout'>
                <Header className='app-header'>
                    <AppHeader />
                </Header>
                <Content className='app-content'>
                    <Outlet />
                </Content>
            </Layout>
        </Wrapper>
    );
}
