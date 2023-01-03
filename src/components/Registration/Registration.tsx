import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export function Registration(): JSX.Element {
    return (
        <Space
            direction='vertical'
            style={{ display: 'flex', justifyContent: 'center', margin: '3rem' }}
        >
            <Space>
                <Title level={2}>
                    <Button
                        type='link'
                        href='/Welcome'
                        size='large'
                        icon={
                            <ArrowLeftOutlined
                                style={{ fontSize: '1.2rem', paddingBottom: '2rem' }}
                            />
                        }
                    />
                    Registration Form
                </Title>
            </Space>

            <Form labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} size='large'>
                <Form.Item
                    name='email'
                    label='E-mail'
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='first_name'
                    label='First Name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='last_name'
                    label='Last Name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='password'
                    label='Password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name='confirm'
                    label='Confirm Password'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The two passwords that you entered do not match!'),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name='phone'
                    label='Phone Number'
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                {/* <Form.Item
                    name='agreement'
                    valuePropName='checked'
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                >
                    <Checkbox>
                        I have read the <a href=''>agreement</a>
                    </Checkbox>
                </Form.Item> */}
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    );
}
