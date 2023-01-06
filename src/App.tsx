import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import { AppPage } from './pages/Main/MainPage';
import { GlobalStyles, Wrapper } from './AppStyle';
import { useTheme } from './microservices/theme';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './hooks';
import { setTheme } from './stores/themeStore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WelcomePage } from './pages/Welcome/WelcomePage';
import { IMASPage } from './pages/IMAS/IMASPage';
import { RegistrationPage } from './pages/Registration/RegistrationPage';
import { IMASCreateNewPage } from './pages/IMAS/CreateNew/IMASCreateNewPage';
import { IMASCreateTemplatePage } from './pages/IMAS/CreateTemplate/IMASCreateTemplatePage';

function App(): JSX.Element {
    const { theme, themeLoaded, getFonts } = useTheme();
    const dispatch = useAppDispatch();
    const selectedTheme = useAppSelector((state) => state.theme.value || theme);
    const setSelectedTheme = (theme: DefaultTheme) => dispatch(setTheme(theme));
    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppPage />,
            children: [
                {
                    path: 'Welcome',
                    element: <WelcomePage />,
                },
                {
                    path: 'IMAS',
                    element: <IMASPage />,
                    children: [
                        {
                            path: 'Create/Invoice',
                            element: <IMASCreateNewPage />,
                        },
                        {
                            path: 'Create/Template',
                            element: <IMASCreateTemplatePage />,
                        },
                    ],
                },
                {
                    path: 'Registration',
                    element: <RegistrationPage />,
                },
            ],
        },
    ]);

    useEffect(() => {
        setSelectedTheme(theme);
    }, [themeLoaded]);

    useEffect(() => {
        WebFont.load({
            google: {
                families: getFonts(),
            },
        });
    });

    return (
        <>
            {themeLoaded && selectedTheme.colors && (
                <ThemeProvider theme={selectedTheme}>
                    <GlobalStyles />
                    <Wrapper>
                        <RouterProvider router={router} />
                    </Wrapper>
                </ThemeProvider>
            )}
        </>
    );
}

export default App;
