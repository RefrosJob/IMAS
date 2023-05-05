export interface InvoiceInfo {
    templateId: number;
    invoiceFull: InvoiceFull;
    recipientEmail: string;
}

export interface TemplateBase {
    id: number;
    html: string;
}

export interface InvoiceFull {
    invoiceName: string;
    invoiceLayout: InvoiceLayout;
    invoiceData: InvoiceData;
    invoiceStyling: InvoiceStyling;
}

export interface InvoiceLayout {
    isTitleLeft: boolean;
    isSecondColumn: boolean;
}

export interface InvoiceStyling {
    backgroundColor: string;
    fontSize: number;
    fontFamily: string;
    fontName: string;
}

export interface InvoiceData {
    baseId: number;
    header: InvoiceHeader;
    companyData: CompanyData;
    clientContact: ClientContact;
    saleData: SaleData;
    invoiceDetails: InvoiceDetails;
    termsAndConditions: TermsAndConditionsData;
    logoUrl: string;
}

export interface InvoiceDetails {
    invoiceNr: string;
    detailLines?: DetailLines;
}

export type DetailLines = DetailLine[];

export interface DetailLine {
    title: string;
    data: string;
}

export interface Line {
    body: string;
}

export interface StandartData {
    lines: string[];
}

export interface InvoiceHeader {
    titleLeft?: string;
    titleCenter?: string;
}

export interface CompanyData extends StandartData {
    title: string;
}

export interface ClientContact {
    firstColumn: CompanyData;
    secondColumn?: CompanyData;
}

export interface SaleItem {
    title: string;
    price: number;
}

export type SaleItems = SaleItem[];

export interface SaleTax {
    taxName: string;
    taxPercent: number;
}

export type SaleTaxes = SaleTax[];

export interface SaleData {
    items: SaleItems;
    taxes: SaleTaxes;
}

export interface TermsAndConditionsData {
    title: string;
    body: string;
}
