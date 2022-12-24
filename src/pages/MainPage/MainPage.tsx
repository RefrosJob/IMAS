import { Layout } from 'antd';
import React from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { Wrapper } from './style';

export function AppPage(): JSX.Element {
    const { Header, Content } = Layout;

    return (
        <Wrapper>
            <Layout className='layout app-layout'>
                <Header className='app-header'>
                    <AppHeader />
                </Header>
                <Content className='app-content'></Content>
            </Layout>
        </Wrapper>
    );
}
