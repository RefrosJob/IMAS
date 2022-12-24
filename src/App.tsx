import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import { AppPage } from './pages/MainPage/MainPage';
import { GlobalStyles, Wrapper } from './AppStyle';
import { AppRouter } from './components/AppRouter/AppRouter';
import { AppRoutes } from './types/appRouter';
import { useTheme } from './microservices/theme';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './hooks';
import { setTheme } from './stores/themeStore';

function App(): JSX.Element {
    const routes: AppRoutes = [{ path: '/', component: <AppPage /> }];
    const { theme, themeLoaded, getFonts } = useTheme();
    const dispatch = useAppDispatch();
    const selectedTheme = useAppSelector((state) => state.theme.value || theme);
    const setSelectedTheme = (theme: DefaultTheme) => dispatch(setTheme(theme));

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
                        <AppRouter routes={routes} />
                    </Wrapper>
                </ThemeProvider>
            )}
        </>
    );
}

export default App;
