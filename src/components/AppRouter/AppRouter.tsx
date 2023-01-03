import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../types/appRouter';

interface Props {
    routes: AppRoutes;
    navigation?: JSX.Element;
}

export function AppRouter({ routes, navigation }: Props): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, component }, id) => (
                    <Route key={id} path={path} element={component} />
                ))}
            </Routes>
            {navigation}
        </BrowserRouter>
    );
}
