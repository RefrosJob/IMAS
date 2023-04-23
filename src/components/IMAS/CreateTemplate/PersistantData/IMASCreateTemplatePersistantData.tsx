import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Collapse, Input, Space, Typography, Upload, UploadProps, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import React, { useState } from 'react';
import { InvoiceData } from '../../../../types/invoice';

const { Panel } = Collapse;
const { Title } = Typography;

interface Props {
    invoiceData: InvoiceData;
    setInvoiceData: (invoiceData: InvoiceData) => void;
}

export function IMASCreateTemplatePersistantData({ invoiceData, setInvoiceData }: Props) {
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const { companyData, clientContact, termsAndConditions } = invoiceData;

    function handleCompanyDataLineChange(line: string, index: number) {
        const lines = companyData.lines;
        lines[index] = line;
        setInvoiceData({ ...invoiceData, companyData: { ...companyData, lines } });
    }

    function handleClientContactFirstColumnLineChange(line: string, index: number) {
        const lines = clientContact.firstColumn.lines;
        lines[index] = line;
        setInvoiceData({
            ...invoiceData,
            clientContact: {
                ...clientContact,
                firstColumn: { ...clientContact.firstColumn, lines },
            },
        });
    }

    function handleClientContactSecondColumnLineChange(line: string, index: number) {
        if (clientContact.secondColumn?.lines.length) {
            const lines = clientContact.secondColumn.lines;
            lines[index] = line;
            setInvoiceData({
                ...invoiceData,
                clientContact: {
                    ...clientContact,
                    secondColumn: { ...clientContact.secondColumn, lines },
                },
            });
        }
    }

    function handleTermsAndConditionsBodyChange(body: string) {
        setInvoiceData({ ...invoiceData, termsAndConditions: { ...termsAndConditions, body } });
    }

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setIsUploadLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setIsUploadLoading(false);
            /* getBase64(info.file.originFileObj as RcFile, (url) => {
                setIsUploadLoading(false);
                setImageUrl(url); 
            }); */
        }
    };

    /* const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    }; */

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

    return (
        <Collapse className='editor-collapse' bordered={false} defaultActiveKey={['1', '2', '3']}>
            <Panel header='Main Header' key='1'>
                <Space direction='vertical'>
                    <Space>
                        <Title level={5}>Logo: </Title>
                        <Upload
                            name='logo'
                            showUploadList={true}
                            action='service/fileupload'
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            <Button icon={<UploadOutlined />}>
                                {isUploadLoading ? <LoadingOutlined /> : 'Upload'}
                            </Button>
                        </Upload>
                    </Space>
                </Space>
            </Panel>
            <Panel header='Company Data' key='2'>
                {companyData.lines.map((_, index) => {
                    return (
                        <Input
                            value={companyData.lines[index]}
                            key={`company-line-${index}`}
                            addonBefore={`Line #${index + 1}`}
                            onChange={(e) => handleCompanyDataLineChange(e.target.value, index)}
                        />
                    );
                })}
            </Panel>
            <Panel header='Client Contact' key='3'>
                <Collapse
                    className='editor-collapse'
                    bordered={false}
                    defaultActiveKey={['1', '2', '3']}
                >
                    <Panel header='Contact column #1' key='4'>
                        {clientContact.firstColumn.lines.map((_, index) => {
                            return (
                                <Input
                                    value={clientContact.firstColumn.lines[index]}
                                    key={`company-line-${index}`}
                                    addonBefore={`Line #${index + 1}`}
                                    onChange={(e) =>
                                        handleClientContactFirstColumnLineChange(
                                            e.target.value,
                                            index,
                                        )
                                    }
                                />
                            );
                        })}
                    </Panel>
                    {clientContact.secondColumn ? (
                        <Panel header='Contact column #2' key='5'>
                            {clientContact.secondColumn.lines.map((_, index) => {
                                if (clientContact.secondColumn?.lines.length) {
                                    return (
                                        <Input
                                            value={clientContact.secondColumn.lines[index]}
                                            key={`company-line-${index}`}
                                            addonBefore={`Line #${index + 1}`}
                                            onChange={(e) =>
                                                handleClientContactSecondColumnLineChange(
                                                    e.target.value,
                                                    index,
                                                )
                                            }
                                        />
                                    );
                                }
                            })}
                        </Panel>
                    ) : (
                        ''
                    )}
                </Collapse>
            </Panel>
            <Panel header='Terms And Conditions' key='4'>
                <TextArea
                    value={termsAndConditions.body}
                    placeholder='Terms and conditions '
                    onChange={(e) => handleTermsAndConditionsBodyChange(e.target.value)}
                />
            </Panel>
        </Collapse>
    );
}
