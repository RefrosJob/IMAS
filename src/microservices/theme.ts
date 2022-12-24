import { mapValues, values } from 'lodash';
import { useEffect, useState } from 'react';
import { DefaultTheme, FullTheme, UseTheme } from '../types/theme';
import { setToLS, getFromLS } from './storage';

export function useTheme(): UseTheme {
    const themes = getFromLS<FullTheme>('all-themes');
    const [theme, setTheme] = useState({} as DefaultTheme);
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        const localTheme = getFromLS<DefaultTheme>('theme');
        console.log('first theme loaded', localTheme);
        if (localTheme?.colors) {
            setTheme(localTheme);
        } else {
            setTheme(themes.data.dark);
        }
        setThemeLoaded(true);
    }, []);

    function setMode(mode: DefaultTheme): void {
        setToLS('theme', mode);
        setTheme(mode);
    }

    function getFonts() {
        const allFonts = values(mapValues(themes.data, 'font'));
        return allFonts;
    }

    return { theme, themeLoaded, setMode, getFonts };
}
