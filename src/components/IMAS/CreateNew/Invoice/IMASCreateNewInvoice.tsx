import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from './styles';
import { Button, Col, Collapse, Input, Row, Space, Typography } from 'antd';
import { getFromLS } from '../../../../microservices/storage';
import { DetailLine, DetailLines, InvoiceFull } from '../../../../types/invoice';
import { IMASInvoicePreview } from '../../InvoicePreview/IMASInvoicePreview';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';

const { Title } = Typography;
const { Panel } = Collapse;

export function IMASCreateNewInvoice() {
    const { invoiceId } = useParams();
    const [invoiceFull, setInvoiceFull] = useState(
        getFromLS<InvoiceFull[]>('invoice-list')[Number(invoiceId)],
    );
    const { invoiceData, invoiceStyling } = invoiceFull;
    const { invoiceDetails } = invoiceData;
    const { detailLines } = invoiceDetails;

    function handleRemoveInvoiceDetailLine(indexToRemove: number) {
        console.log(indexToRemove);
        if (detailLines) {
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
        if (detailLines?.length && detailLines.length > index + 1) {
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

    return (
        <Wrapper>
            <Row>
                <Col span={10}>
                    <Title>Fill out the data</Title>
                    <Collapse
                        className='editor-collapse'
                        bordered={false}
                        defaultActiveKey={['1', '2', '3']}
                    >
                        <Panel header='Invoice Data' key='1'>
                            <Space direction='vertical'>
                                <Input addonBefore='Invoice Nr:' />
                                {invoiceDetails.detailLines
                                    ? invoiceDetails.detailLines.map((detailLine, index) => {
                                          if (detailLine) {
                                              return (
                                                  <>
                                                      <Space>
                                                          <Title level={5}>
                                                              Detail Line #{index + 1}
                                                          </Title>
                                                          <Button
                                                              icon={<MinusOutlined />}
                                                              onClick={() =>
                                                                  handleRemoveInvoiceDetailLine(
                                                                      index,
                                                                  )
                                                              }
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
                                                  </>
                                              );
                                          }
                                      })
                                    : null}
                                {!invoiceDetails.detailLines?.length ||
                                invoiceDetails.detailLines?.length < 4 ? (
                                    <Button
                                        icon={<PlusOutlined />}
                                        onClick={() => handleAddInvoiceDetailLine()}
                                    />
                                ) : null}
                            </Space>
                        </Panel>
                        <Panel header='Item List' key='3'>
                            <Space direction='vertical'></Space>
                        </Panel>
                        <Panel header='Tax Info' key='3'>
                            <Space direction='vertical'> </Space>
                        </Panel>
                    </Collapse>
                </Col>
                <Col span={14}>
                    <Row justify='space-between'>
                        <Col>
                            <Title>Preview</Title>
                        </Col>
                        <Col>
                            <Space>
                                <Button>BACK</Button>
                                <Button>SEND</Button>
                            </Space>
                        </Col>
                    </Row>
                    <IMASInvoicePreview invoiceData={invoiceData} invoiceStyling={invoiceStyling} />
                </Col>
            </Row>
        </Wrapper>
    );
}
