export interface AppRoute {
    path: string;
    component: JSX.Element;
}

export enum IMASKeys {
    home = 'home',
    create = 'create',
    createInvoice = 'createInvoice',
    createTemplate = 'createTemplate',
    createDataTemplate = 'createDataTemplate',
    userManagement = 'userManagement',
}

export type AppRoutes = AppRoute[];
