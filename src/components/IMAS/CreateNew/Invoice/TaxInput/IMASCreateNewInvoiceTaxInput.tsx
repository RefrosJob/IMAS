import React from 'react';
import { InvoiceFull, SaleTax, SaleTaxes } from '../../../../../types/invoice';
import { Button, Input, InputNumber, Space, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';

interface Props {
    invoiceFull: InvoiceFull;
    setInvoiceFull: (InvoiceFull: InvoiceFull) => void;
}

const { Title } = Typography;

export function IMASCreateNewInvoiceTaxInput({
    invoiceFull,
    setInvoiceFull,
}: Props): JSX.Element | null {
    const { invoiceData } = invoiceFull;
    const { saleData } = invoiceData;
    const { taxes } = saleData;

    if (!taxes?.length) {
        return null;
    }

    function handleRemoveTax(indexToRemove: number): void {
        if (taxes?.length) {
            const newTaxes = cloneDeep<SaleTaxes>(taxes).filter(
                (_, index) => index !== indexToRemove,
            );
            return setInvoiceFull({
                ...invoiceFull,
                invoiceData: {
                    ...invoiceData,
                    saleData: { ...saleData, taxes: newTaxes },
                },
            });
        }
    }

    function handleTaxChange(tax: SaleTax, index: number): void {
        if (taxes[index]) {
            const newTaxes = cloneDeep<SaleTaxes>(taxes);
            newTaxes[index] = tax;
            return setInvoiceFull({
                ...invoiceFull,
                invoiceData: { ...invoiceData, saleData: { ...saleData, taxes: newTaxes } },
            });
        }
    }

    function handleAddSaleTax(): void {
        const tax: SaleTax = {
            taxName: 'Tax #1',
            taxPercent: 20,
        };
        if (taxes?.length) {
            const tax: SaleTax = {
                taxName: `Tax #${taxes.length + 1}`,
                taxPercent: 5,
            };
            const newTaxes = [...cloneDeep<SaleTaxes>(taxes), tax];
            return setInvoiceFull({
                ...invoiceFull,
                invoiceData: { ...invoiceData, saleData: { ...saleData, taxes: newTaxes } },
            });
        }
        return setInvoiceFull({
            ...invoiceFull,
            invoiceData: { ...invoiceData, saleData: { ...saleData, taxes: [tax] } },
        });
    }

    return (
        <Space direction='vertical'>
            {taxes.map((tax, index) => (
                <div key={`sale-item-${index}`}>
                    <Space>
                        <Title level={5}>Tax Line #{index + 1}</Title>
                        {index !== 0 ? (
                            <Button
                                icon={<MinusOutlined />}
                                onClick={() => handleRemoveTax(index)}
                            />
                        ) : null}
                    </Space>

                    <Input
                        addonBefore='Name: '
                        value={tax?.taxName}
                        onChange={(e) =>
                            handleTaxChange({ ...tax, taxName: e.target.value }, index)
                        }
                    />
                    <InputNumber
                        addonBefore='Rate: '
                        addonAfter='%'
                        value={tax.taxPercent}
                        onChange={(number) =>
                            handleTaxChange({ ...tax, taxPercent: number || 0 }, index)
                        }
                    />
                </div>
            ))}

            <Button icon={<PlusOutlined />} onClick={() => handleAddSaleTax()} />
        </Space>
    );
}
