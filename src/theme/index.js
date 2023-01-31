import { createTheme as createMuiTheme } from '@mui/material/styles';
import { baseThemeOptions } from './base-theme-options';
import { themeOptions } from './theme-options';

export const createTheme = () => {
  let theme = createMuiTheme(baseThemeOptions, themeOptions);

  return theme;
};
