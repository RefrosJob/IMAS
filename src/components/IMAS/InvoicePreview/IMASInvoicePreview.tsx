import React from 'react';
import { generateTemplate } from '../../../microservices/templateGenerator';
import { InvoiceData, InvoiceStyling } from '../../../types/invoice';
import Wrapper from './styles';

interface Props {
    invoiceData: InvoiceData;
    invoiceStyling: InvoiceStyling;
}

export function IMASInvoicePreview({ invoiceData, invoiceStyling }: Props) {
    return (
        <Wrapper>
            <div
                className='invoice-preview custom-scrollbar'
                dangerouslySetInnerHTML={{
                    __html: generateTemplate(invoiceData, invoiceStyling),
                }}
            />
        </Wrapper>
    );
}
