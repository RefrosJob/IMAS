import { RootState } from '../store';
import { DefaultTheme } from '../types/theme';
import { slice } from './sliceHelper';

const theme = slice<DefaultTheme>('theme', {} as DefaultTheme);

export const { set: setTheme } = theme.actions;

export const selectFormat = (state: RootState): DefaultTheme => state.theme.value;

export default theme.reducer;
