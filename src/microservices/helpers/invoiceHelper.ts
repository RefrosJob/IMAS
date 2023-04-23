import {
    ClientContact,
    CompanyData,
    DetailLine,
    DetailLines,
    InvoiceData,
    InvoiceDetails,
    InvoiceLayout,
    InvoiceStyling,
    Lines,
    SaleData,
    SaleItem,
    SaleTax,
    TermsAndConditionsData,
} from '../../types/invoice';

export const invoiceLayoutTemplate: InvoiceLayout = {
    isSecondColumn: true,
    isTitleLeft: true,
};

export const invoiceStylingTemplate: InvoiceStyling = {
    backgroundColor: 'rgba(255,255,255,1)',
    fontSize: 16,
    fontName: 'Helvetica',
    fontFamily: 'sans-serif',
};

const getHeaderTemplate = ({ isTitleLeft }: Pick<InvoiceLayout, 'isTitleLeft'>) => {
    return {
        titleLeft: isTitleLeft ? 'TITLE' : '',
        titleCenter: 'TITLE_CENTER',
    };
};

const getLines = (number: number): Lines =>
    Array.from(new Array(number).keys()).map((number) => `LINE #${number}`) as Lines;

const companyDataTemplate: CompanyData = {
    title: 'COMPANY DATA',
    lines: getLines(4),
};

const clientContactFirstColumnTemplate: CompanyData = {
    title: 'FIRST COLUMN',
    lines: getLines(4),
};

const clientContactSecondColumnTemplate: CompanyData = {
    title: 'SECOND COLUMN',
    lines: getLines(4),
};

const getClientContactTemplate = ({
    isSecondColumn,
}: Pick<InvoiceLayout, 'isSecondColumn'>): ClientContact => {
    return {
        firstColumn: clientContactFirstColumnTemplate,
        secondColumn: isSecondColumn ? clientContactSecondColumnTemplate : undefined,
    };
};

const saleItemTemplate: SaleItem = {
    title: 'ITEM #1',
    price: 10,
};

const saleTaxesTemplate: SaleTax = {
    taxName: 'Kaibemaks',
    taxPercent: 20,
};

const saleDataTemplate: SaleData = {
    items: [saleItemTemplate],
    taxes: [saleTaxesTemplate],
};

const termsAndConditionsTemplate: TermsAndConditionsData = {
    title: 'TERMS & CONDITIONS',
    // eslint-disable-next-line quotes
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};

const invoiceDetailsTemplate: InvoiceDetails = {
    invoiceNr: '123456',
};

export const getInvoiceTemplate = ({ isSecondColumn, isTitleLeft }: InvoiceLayout): InvoiceData => {
    return {
        header: getHeaderTemplate({ isTitleLeft }),
        companyData: companyDataTemplate,
        clientContact: getClientContactTemplate({ isSecondColumn }),
        saleData: saleDataTemplate,
        termsAndConditions: termsAndConditionsTemplate,
        invoiceDetails: invoiceDetailsTemplate,
        logoUrl: '/logo512.png',
    };
};
