import { Button, Input, Space, Typography } from 'antd';
import { cloneDeep } from 'lodash';
import React from 'react';
import { DetailLine, DetailLines, InvoiceFull } from '../../../../../types/invoice';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface Props {
    invoiceFull: InvoiceFull;
    setInvoiceFull: (invoice: InvoiceFull) => void;
}

const { Title } = Typography;

export function IMASCreateNewInvoiceDetailInput({
    invoiceFull,
    setInvoiceFull,
}: Props): JSX.Element | null {
    const { invoiceData } = invoiceFull;
    const { invoiceDetails } = invoiceData;
    const { detailLines } = invoiceDetails;

    function handleRemoveInvoiceDetailLine(indexToRemove: number) {
        if (detailLines?.length) {
            const newDetailLines = cloneDeep<DetailLines>(detailLines).filter(
                (_, index) => index !== indexToRemove,
            );
            return setInvoiceFull({
                ...invoiceFull,
                invoiceData: {
                    ...invoiceData,
                    invoiceDetails: { ...invoiceDetails, detailLines: newDetailLines },
                },
            });
        }
    }

    function handleAddInvoiceDetailLine() {
        const detailLine: DetailLine = {
            title: 'Option #1',
            data: '1',
        };
        if (detailLines && detailLines.length) {
            const detailLine: DetailLine = {
                title: `Option #${detailLines.length + 1}`,
                data: (detailLines.length + 1).toString(),
            };
            const newDetailLines = [...cloneDeep<DetailLines>(detailLines), detailLine];
            return setInvoiceFull({
                ...invoiceFull,
                invoiceData: {
                    ...invoiceData,
                    invoiceDetails: { ...invoiceDetails, detailLines: newDetailLines },
                },
            });
        }
        return setInvoiceFull({
            ...invoiceFull,
            invoiceData: {
                ...invoiceData,
                invoiceDetails: { ...invoiceDetails, detailLines: [detailLine] },
            },
        });
    }

    function handleInvoiceDetailLinesChange(detailLine: DetailLine, index: number) {
        if (detailLines?.length && detailLines.length >= index + 1) {
            if (detailLines[index]) {
                detailLines[index] = detailLine;
            }
            return setInvoiceFull({
                ...invoiceFull,
                invoiceData: {
                    ...invoiceData,
                    invoiceDetails: { ...invoiceDetails, detailLines },
                },
            });
        }
    }

    if (!detailLines?.length) {
        return <Button icon={<PlusOutlined />} onClick={() => handleAddInvoiceDetailLine()} />;
    }

    return (
        <Space direction='vertical'>
            {detailLines.map((detailLine, index) => {
                if (detailLine) {
                    return (
                        <div key={index}>
                            <Space>
                                <Title level={5}>Detail Line #{index + 1}</Title>
                                <Button
                                    icon={<MinusOutlined />}
                                    onClick={() => handleRemoveInvoiceDetailLine(index)}
                                />
                            </Space>
                            <Input
                                addonBefore='Title: '
                                value={detailLine?.title}
                                onChange={(e) =>
                                    handleInvoiceDetailLinesChange(
                                        {
                                            ...detailLine,
                                            title: e.target.value,
                                        },
                                        index,
                                    )
                                }
                            />
                            <Input
                                addonBefore='Data: '
                                value={detailLine?.data}
                                onChange={(e) =>
                                    handleInvoiceDetailLinesChange(
                                        {
                                            ...detailLine,
                                            data: e.target.value,
                                        },
                                        index,
                                    )
                                }
                            />
                        </div>
                    );
                }
            })}
            {detailLines?.length < 4 ? (
                <Button icon={<PlusOutlined />} onClick={() => handleAddInvoiceDetailLine()} />
            ) : null}
        </Space>
    );
}
