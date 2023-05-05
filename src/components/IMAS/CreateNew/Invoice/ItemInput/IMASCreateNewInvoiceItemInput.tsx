import React from 'react';
import { InvoiceFull, SaleItem, SaleItems } from '../../../../../types/invoice';
import { Button, Input, InputNumber, Space, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';

interface Props {
    invoiceFull: InvoiceFull;
    setInvoiceFull: (InvoiceFull: InvoiceFull) => void;
}

const { Title } = Typography;

export function IMASCreateNewInvoiceItemInput({
    invoiceFull,
    setInvoiceFull,
}: Props): JSX.Element | null {
    const { invoiceData } = invoiceFull;
    const { saleData } = invoiceData;
    const { items } = saleData;

    if (!saleData?.items.length) {
        return null;
    }

    function handleRemoveItem(indexToRemove: number): void {
        if (items?.length) {
            const newItems = cloneDeep<SaleItem[]>(items).filter(
                (_, index) => index !== indexToRemove,
            );
            return setInvoiceFull({
                ...invoiceFull,
                invoiceData: {
                    ...invoiceData,
                    saleData: { ...saleData, items: newItems },
                },
            });
        }
    }

    function handleItemChange(item: SaleItem, index: number): void {
        if (items[index]) {
            const newItems = cloneDeep<SaleItem[]>(items);
            newItems[index] = item;
            return setInvoiceFull({
                ...invoiceFull,
                invoiceData: { ...invoiceData, saleData: { ...saleData, items: newItems } },
            });
        }
    }

    function handleAddSaleItem(): void {
        const item: SaleItem = {
            title: 'Item #1',
            price: 5,
        };
        if (items?.length) {
            const item: SaleItem = {
                title: `Item #${items.length + 1}`,
                price: 5,
            };
            const newItems = [...cloneDeep<SaleItems>(items), item];
            return setInvoiceFull({
                ...invoiceFull,
                invoiceData: { ...invoiceData, saleData: { ...saleData, items: newItems } },
            });
        }
        return setInvoiceFull({
            ...invoiceFull,
            invoiceData: { ...invoiceData, saleData: { ...saleData, items: [item] } },
        });
    }

    return (
        <Space direction='vertical'>
            {saleData.items.map((item, index) => (
                <div key={`sale-item-${index}`}>
                    <Space>
                        <Title level={5}>Item Line #{index + 1}</Title>
                        {index !== 0 ? (
                            <Button
                                icon={<MinusOutlined />}
                                onClick={() => handleRemoveItem(index)}
                            />
                        ) : null}
                    </Space>
                    <Input
                        addonBefore='Name: '
                        value={item?.title}
                        onChange={(e) =>
                            handleItemChange({ ...item, title: e.target.value }, index)
                        }
                    />
                    <InputNumber
                        addonBefore='Price: '
                        value={item.price}
                        onChange={(number) =>
                            handleItemChange({ ...item, price: number || 0 }, index)
                        }
                    />
                </div>
            ))}

            <Button icon={<PlusOutlined />} onClick={() => handleAddSaleItem()} />
        </Space>
    );
}
