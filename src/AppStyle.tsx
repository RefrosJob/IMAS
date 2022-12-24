import styled, { createGlobalStyle } from 'styled-components';
import { DefaultTheme } from './types/theme';

export const GlobalStyles = createGlobalStyle<{ theme: DefaultTheme }>`
  :root {
    --header-color: ${({ theme }) => theme.colors.header};
    --body-color: ${({ theme }) => theme.colors.body};
    --body-accent-color: ${({ theme }) => theme.colors.bodyAccent};
    --body-accent-color-2: ${({ theme }) => theme.colors.bodyAccent2};
    --text-color: ${({ theme }) => theme.colors.text};
    --text-accent-color: ${({ theme }) => theme.colors.textAccent};
  }

  * {
    font: ${({ theme }) => theme.font} !important;
    color: var(--text-color) !important;
  }

  .full-width-height {
    width: 100%;
    height: 100%;
  }

  .full-width {
    width: 100%;
  }

  //dev related classes

  .full-border-white {
    border: 1px solid white;
  }

  .full-border-black {
    border: 1px solid black;
  }
`;

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;

    .app-header {
        background-color: var(--header-color) !important;
    }
`;
