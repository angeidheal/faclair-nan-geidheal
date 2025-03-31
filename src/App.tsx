import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import SearchPage from './pages/SearchPage';
import { EntryPage } from './pages/EntryPage';
import AboutPage from './pages/AboutPage';
import BrowsePage from './pages/BrowsePage';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#90caf9' : '#1976d2', // Ensures 4.5:1 contrast ratio
        dark: isDarkMode ? '#648dae' : '#1565c0',
        light: isDarkMode ? '#a6d4fa' : '#42a5f5',
      },
      error: {
        main: isDarkMode ? '#f48fb1' : '#d32f2f', // Ensures 4.5:1 contrast ratio
        dark: isDarkMode ? '#ab647b' : '#c62828',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000', // Maximum contrast
        secondary: isDarkMode ? '#b3b3b3' : '#424242', // Ensures 4.5:1 contrast ratio
      },
      background: {
        default: isDarkMode ? '#121212' : '#ffffff',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontSize: '2rem',
        '@media (max-width:600px)': {
          fontSize: '1.75rem',
        },
      },
      h3: {
        fontSize: '1.75rem',
        '@media (max-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      h4: {
        fontSize: '1.5rem',
        '@media (max-width:600px)': {
          fontSize: '1.25rem',
        },
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        '@media (max-width:600px)': {
          fontSize: '0.95rem',
        },
      },
      body2: {
        fontSize: '0.95rem',
        lineHeight: 1.6,
        '@media (max-width:600px)': {
          fontSize: '0.875rem',
        },
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            // Improve text rendering
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            // Ensure proper zooming
            '@media (max-width: 600px)': {
              minWidth: '320px',
              overflowX: 'hidden',
            },
          },
          // Ensure proper content reflow
          '#root': {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            '@media (max-width: 600px)': {
              width: '100%',
            },
          },
          // Improve link accessibility
          a: {
            color: isDarkMode ? '#90caf9' : '#1976d2',
            textDecorationThickness: '1px',
            textUnderlineOffset: '2px',
            '&:hover': {
              textDecorationThickness: '2px',
            },
            '&:focus': {
              outline: '2px solid currentColor',
              outlineOffset: '2px',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: isDarkMode 
              ? '0px 2px 4px rgba(0, 0, 0, 0.2)'
              : '0px 2px 4px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontSize: '1rem',
            '@media (max-width:600px)': {
              fontSize: '0.95rem',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:focus': {
              outline: '2px solid currentColor',
              outlineOffset: '2px',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout onThemeToggle={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/:id" element={<EntryPage />} />
            <Route path="/mu-dheidhinn" element={<AboutPage />} />
            <Route path="/brabhsaich" element={<BrowsePage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
