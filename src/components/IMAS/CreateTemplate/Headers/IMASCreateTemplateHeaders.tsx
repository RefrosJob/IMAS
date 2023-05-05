import { Collapse, Input } from 'antd';
import React from 'react';
import { InvoiceData } from '../../../../types/invoice';

const { Panel } = Collapse;

interface Props {
    newInvoice: InvoiceData;
    setNewInvoice: (invoice: InvoiceData) => void;
}

export function IMASCreateTemplateHeaders({ newInvoice, setNewInvoice }: Props): JSX.Element {
    const { header, companyData, clientContact, termsAndConditions } = newInvoice;

    function setTitleLeft(titleLeft: string) {
        if (header && titleLeft) {
            setNewInvoice({ ...newInvoice, header: { ...header, titleLeft } });
        }
    }

    function setTitleCenter(titleCenter: string) {
        if (header && titleCenter) {
            setNewInvoice({ ...newInvoice, header: { ...header, titleCenter } });
        }
    }

    function setCompanyDataTitle(title: string) {
        if (companyData && title) {
            setNewInvoice({ ...newInvoice, companyData: { ...companyData, title } });
        }
    }

    function setClientContactFirstColTitle(title: string) {
        if (clientContact.firstColumn && title) {
            setNewInvoice({
                ...newInvoice,
                clientContact: {
                    ...clientContact,
                    firstColumn: { ...clientContact.firstColumn, title },
                },
            });
        }
    }

    function setClientContactSecondColTitle(title: string) {
        if (clientContact.secondColumn && title) {
            setNewInvoice({
                ...newInvoice,
                clientContact: {
                    ...clientContact,
                    secondColumn: { ...clientContact.secondColumn, title },
                },
            });
        }
    }

    function setTermsAndConditionsTitle(title: string) {
        if (termsAndConditions && title) {
            setNewInvoice({ ...newInvoice, termsAndConditions: { ...termsAndConditions, title } });
        }
    }

    return (
        <Collapse className='editor-collapse' bordered={false} defaultActiveKey={['1', '2', '3']}>
            <Panel header='Main Header' key='1'>
                {header.titleLeft && (
                    <Input
                        addonBefore='Title left: '
                        allowClear
                        value={header.titleLeft}
                        onChange={(e) => setTitleLeft(e.target.value || ' ')}
                    />
                )}
                <Input
                    addonBefore='Title center: '
                    allowClear
                    value={header.titleCenter}
                    onChange={(e) => setTitleCenter(e.target.value || ' ')}
                />
            </Panel>
            <Panel header='Company Data' key='2'>
                <Input
                    addonBefore='Title: '
                    value={companyData.title}
                    allowClear
                    onChange={(e) => setCompanyDataTitle(e.target.value || ' ')}
                />
            </Panel>
            <Panel header='Client Contact' key='3'>
                <Collapse
                    className='editor-collapse'
                    bordered={false}
                    defaultActiveKey={['1', '2', '3']}
                >
                    <Panel header='Contact column #1' key='4'>
                        <Input
                            addonBefore='Title: '
                            allowClear
                            value={clientContact.firstColumn.title}
                            onChange={(e) => setClientContactFirstColTitle(e.target.value || ' ')}
                        />
                    </Panel>
                    {clientContact.secondColumn?.lines.length ? (
                        <Panel header='Contact column #2' key='5'>
                            <Input
                                addonBefore='Title: '
                                allowClear
                                value={clientContact.secondColumn.title}
                                onChange={(e) =>
                                    setClientContactSecondColTitle(e.target.value || ' ')
                                }
                            />
                        </Panel>
                    ) : (
                        ''
                    )}
                </Collapse>
            </Panel>
            <Panel header='Terms And Conditions' key='4'>
                <Collapse
                    className='editor-collapse'
                    bordered={false}
                    defaultActiveKey={['1', '2', '3']}
                >
                    <Input
                        addonBefore='Title: '
                        allowClear
                        value={termsAndConditions.title}
                        onChange={(e) => setTermsAndConditionsTitle(e.target.value || ' ')}
                    />
                </Collapse>
            </Panel>
        </Collapse>
    );
}
