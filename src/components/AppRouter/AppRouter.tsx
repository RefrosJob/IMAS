import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

interface Props {
    routes: { path: string; component: JSX.Element }[];
}

export function AppRouter({ routes }: Props): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, component }, id) => (
                    <Route key={id} path={path} element={component} />
                ))}
            </Routes>
        </BrowserRouter>
    );
}
