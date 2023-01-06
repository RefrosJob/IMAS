import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card,
    Col,
    Collapse,
    Input,
    InputNumber,
    message,
    Row,
    Space,
    Tabs,
    Typography,
    Upload,
} from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useState } from 'react';
import { generateTemplate } from '../../../microservices/templateGenerator';
import Wrapper from './styles';

const { Title } = Typography;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const { Panel } = Collapse;

interface InvoiceTemplate {
    title: string;
}

export function IMASCreateTemplate(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Wrapper>
            <Row>
                <Col span={10}>
                    <div className='template-editor'>
                        <Title>Create your template</Title>
                        <Space direction='vertical'>
                            <Tabs>
                                <Tabs.TabPane tab='Base'></Tabs.TabPane>
                                <Tabs.TabPane tab='Headers'>
                                    <Collapse
                                        className='editor-collapse'
                                        bordered={false}
                                        defaultActiveKey={['1', '2', '3']}
                                    >
                                        <Panel header='Header' key='1'>
                                            <Input addonBefore='Title: ' />
                                            <Title level={5}>Logo: </Title>
                                            <Upload
                                                name='avatar'
                                                listType='picture-card'
                                                className='avatar-uploader'
                                                showUploadList={false}
                                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                                beforeUpload={beforeUpload}
                                                onChange={handleChange}
                                            >
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt='avatar'
                                                        style={{ width: '100%' }}
                                                    />
                                                ) : (
                                                    uploadButton
                                                )}
                                            </Upload>
                                        </Panel>
                                        <Panel header='Contact line #1' key='2'>
                                            <Input addonBefore='Title: ' />
                                        </Panel>
                                        <Panel header='Contact line #2' key='3'>
                                            <Collapse
                                                className='editor-collapse'
                                                bordered={false}
                                                defaultActiveKey={['1', '2', '3']}
                                            >
                                                <Panel header='Contact column #1' key='4'>
                                                    <Input addonBefore='Title: ' />
                                                </Panel>
                                                <Panel header='Contact column #2' key='5'>
                                                    <Input addonBefore='Title: ' />
                                                </Panel>
                                                <Panel header='Contact column #3' key='6'>
                                                    <Input addonBefore='Title: ' />
                                                    <InputNumber addonBefore='Number of rows:  ' />
                                                </Panel>
                                            </Collapse>
                                        </Panel>
                                    </Collapse>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Style'></Tabs.TabPane>
                            </Tabs>
                        </Space>
                    </div>
                </Col>
                <Col span={14}>
                    <Space direction='vertical'>
                        <Title>Preview</Title>
                        <div
                            className='invoice-preview'
                            dangerouslySetInnerHTML={{ __html: generateTemplate('hello') }}
                        />
                    </Space>
                </Col>
            </Row>
        </Wrapper>
    );
}
