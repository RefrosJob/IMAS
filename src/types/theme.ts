export interface DefaultTheme {
    id: string;
    name: string;
    colors: Colors;
    font: string;
}

export interface UseTheme {
    theme: DefaultTheme;
    themeLoaded: boolean;
    setMode: (mode: DefaultTheme) => void;
    getFonts: () => string[];
}

export interface FullTheme {
    data: { [themeName: string]: DefaultTheme };
}

interface Colors {
    header: string;
    body: string;
    bodyAccent: string;
    bodyAccent2: string;
    text: string;
    textAccent: string;
}
