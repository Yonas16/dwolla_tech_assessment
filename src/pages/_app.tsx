import type { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import { createTheme, ThemeProvider } from '@mui/material';
import '@/styles/globals.css';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1f1f32',
        dark: '#151523',
        light: '#4b4b5b',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ca4c24',
        dark: '#8d3519',
        light: '#d46f4f',
        contrastText: '#fff',
      },
      error: {
        main: '#b00020',
        dark: '#7b0016',
        light: '#bf334c',
        contrastText: '#fff',
      },
      warning: {
        main: '#ff9800',
        light: '#ff9800',
      },
      info: {
        main: '#0288d1',
        light: '#0288d1',
      },
      success: {
        main: '#2e7d32',
        light: '#2e7d32',
      },
    },
  });

  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppCacheProvider>
  );
}
