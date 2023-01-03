export interface AppRoute {
    path: string;
    component: JSX.Element;
}

export enum IMASKeys {
    createInvoice = 'createInvoice',
    createTemplate = 'createTemplate',
}

export type AppRoutes = AppRoute[];
