import { sumBy } from 'lodash';
import { InvoiceData, InvoiceStyling } from '../types/invoice';
import DOMPurify from 'dompurify';

export function generateTemplate(invoiceData: InvoiceData, invoiceStyling: InvoiceStyling): string {
    const { header, companyData, clientContact, termsAndConditions, invoiceDetails, logoUrl } =
        invoiceData;
    const { saleData } = invoiceData;
    const { backgroundColor, fontSize, fontName, fontFamily } = invoiceStyling;
    const totalBeforeTaxes = sumBy(saleData.items, (item) => item.price);
    const totalAfterTaxes =
        totalBeforeTaxes - totalBeforeTaxes * sumBy(saleData.taxes, (tax) => tax.taxPercent / 100);

    function getHTMLFriendlyString(strings: string[], extra = '') {
        return strings.join(`${extra}\n`);
    }

    return DOMPurify.sanitize(
        `<!DOCTYPE html>
<style>
    .main-body {
        border-radius: 1em;
        padding: 2em;
        height: 72em;
        font-family: ${fontName}, 'Arial', ${fontFamily};
        font-size: ${fontSize}px;
        margin: 1rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${backgroundColor};
    }

    .heading-text {
        font-size: 1.5rem;
    }

    .container-main {
        display: grid;
        margin: 2rem;
    }

    .header-container {
        display: flex;
    }

    .header-child {
        width: 100%;
    }

    .contact-line {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .contact-line-2 {
        display: grid;
    }

    .inner-contact-text {
        line-height: 0.7rem;
        white-space: pre-line;
    }

    .invoice-info-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        line-height: 0.7rem;
    }

    .commodity-sale-table {
        margin-top: 1rem;
        border-collapse: collapse;
        width: 100%;
    }

    .commodity-sale-table-total {
        border-collapse: collapse;
        width: 100%;
    }

    .table-row {
        height: 3.5rem;
        border: 1px solid black;
    }

    .table-total-row {
        height: 3.5rem;
    }

    .table-column {
        border: 1px solid black;
        padding-left: 0.5rem;
    }

    .table-column-total-lable {
        border: 1px solid black;
        padding-left: 0.5rem;
    }

    .table-column-empty {
        border: none;
    }

    .amount-column {
        width: 20%;
        text-align: end;
        padding-right: 0.5rem;
    }

    .subtotal-column {
        border-top: none !important;
    }

    .total-column {
        font-weight: bold;
    }

    .index-column {
        width: 8%;
    }

    .column-header {
        text-align: left;
        padding-bottom: 1rem;
        padding-left: 0.2rem;
        padding-top: 1rem;
    }

    .cross-border-top {
        border-top: none;
    }

    /* strict */

    .centered-text {
        text-align: center;
    }

    .fb {
        border: 1px solid black;
    }

    .list-element {
        display: inline-flex;
    }


    .logo-container {
        text-align: end;
    }

    .sub-heading-big {
         font-size: 1.8rem;
    }

    .sub-heading {
        font-size: 1.2rem;
    }

    .footer {
        height: 15rem;
        max-height: 15rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .footer-image-container {
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .footer-image {
        padding: 50px;
        height: 300px;
        width: 300px;

    }

    .terms-and-conditions {
        padding: 2rem;
        max-height:90%;
        border-right: 1px solid silver;

    }

    .terms-and-conditions > p {
        line-height: 1.5rem;
    }

    
    
</style>
<body>
<div class="main-body">
    <div class="container-main">
        <div class="header-container">
            <div class="header-child">
                <h1 class="heading-text">${header.titleLeft}</h1>
            </div>
            <div class="header-child centered-text heading-text">
                <h1>${header.titleCenter}</h1>
            </div>
            <div class="header-child logo-container">
                <img height="80px" src="${logoUrl}" alt="LOGO">
            </div>
        </div>
        <div> 
            <h2>${companyData.title}</h2>
            <p class="inner-contact-text">${getHTMLFriendlyString(companyData.lines, '<br/>')}</p>
        </div>
        <div class="contact-line">
            <div>
                <h2>${clientContact.firstColumn.title}</h2>
                <p class="inner-contact-text">${getHTMLFriendlyString(
                    clientContact.firstColumn.lines,
                    '<br/>',
                )}</p>

            </div>
            
                     <div>
                      ${
                          clientContact.secondColumn?.title
                              ? `
                                <h2>${clientContact.secondColumn.title}</h2>
                                <p class="inner-contact-text">${getHTMLFriendlyString(
                                    clientContact.secondColumn.lines,
                                    '<br/>',
                                )}
                                </p> `
                              : ''
                      }
                    </div>

                    <div>
                    <h2><b>Invoice Nr. </b>${invoiceDetails.invoiceNr}</h2>
                      ${
                          invoiceDetails.detailLines
                              ? getHTMLFriendlyString(
                                    invoiceDetails.detailLines.map(
                                        (detailLine) =>
                                            `<p class="inner-contact-text"><b class="sub-heading">${detailLine?.title}: </b>${detailLine?.data}</p>`,
                                    ),
                                )
                              : ''
                      }
                    </div>
            
        </div>
        <div>
            <table class="commodity-sale-table">
                <thead>
                    <tr >
                        <th class="column-header">ID</th>
                        <th class="column-header">Item & Description</th>
                        <th class="column-header">Amount</th>
                    </tr>
                </thead>
                <tbody>
                ${
                    saleData.items.length
                        ? getHTMLFriendlyString(
                              saleData.items.map(
                                  (item, index) => ` <tr class="table-row">
                                <td class="table-column index-column">${index + 1}</td>
                                <td class="table-column">${item.title}</td>
                                <td class="table-column amount-column">${item.price}$</td>
                            </tr>`,
                              ),
                          )
                        : ''
                }
                    <table class="commodity-sale-table-total">
                         <tr class="table-total-row">
                            <td></td>
                            <td class="table-column total-column subtotal-column" width="14%">Subtotal: </td>
                            <td class="table-column total-column amount-column subtotal-column" width="20%">${totalBeforeTaxes}$</td>
                        </tr>
                        ${
                            saleData.taxes.length
                                ? getHTMLFriendlyString(
                                      saleData.taxes.map(
                                          (tax) => `<tr class="table-total-row">
                                                        <td></td>
                                                        <td class="table-column total-column cross-border-top" width="14%">${tax.taxName}: </td>
                                                        <td class="table-column total-column amount-column cross-border-top" width="20%">${tax.taxPercent}%</td>
                                                    </tr>`,
                                      ),
                                  )
                                : ''
                        }
                         <tr class="table-total-row">
                            <td></td>
                            <td class="table-column total-column" width="14%">Total: </td>
                            <td class="table-column total-column amount-column" width="20%">${totalAfterTaxes}$</td>
                        </tr>
                    </table>
                </tbody>
            </table>
        </div>
        
    </div>
    <div class="footer">
        <div class="terms-and-conditions">
            <h2>${termsAndConditions.title}</h2>
            <p>${termsAndConditions.body} </p>
        </div>
        <div class="footer-image-container">
            <img class="footer-image" src="${logoUrl}" />
        </div>
    </div>
    </div>
</body>
</html>
`,
        {
            USE_PROFILES: { html: true },
            FORCE_BODY: true,
        },
    );
}
