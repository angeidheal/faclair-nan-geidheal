import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  IconButton,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NavButton from './NavButton';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  gd: {
    home: 'Dachaigh',
    browse: 'Brabhsaich',
    about: 'Mu dheidhinn',
    skipToContent: 'Skip to main content',
    copyright: '© {year} Faclair nan Gèidheal. All rights reserved.',
  },
  ga: {
    home: 'Baile',
    browse: 'Brabhsáil',
    about: 'Faoi',
    skipToContent: 'Skip to main content',
    copyright: '© {year} Faclair nan Gèidheal. Gach ceart ar cosaint.',
  },
};

interface LayoutProps {
  children: React.ReactNode;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onThemeToggle, isDarkMode }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Skip link for keyboard users */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          top: -9999,
          left: 50,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : 'primary.main',
          color: (theme) => theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
          padding: '8px 16px',
          zIndex: 9999,
          textDecoration: 'none',
          borderRadius: 1,
          transition: 'top 0.2s ease-in-out',
          '&:focus': {
            top: 8,
            outline: '2px solid currentColor',
            outlineOffset: '2px',
          },
        }}
      >
        {t.skipToContent}
      </Box>

      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar 
          sx={{ 
            justifyContent: { xs: 'center', sm: 'flex-end' },
            gap: 2,
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            minHeight: { xs: 'auto', sm: '64px' },
            py: { xs: 1, sm: 0 }
          }}
        >
          <NavButton
            onClick={() => navigate('/')}
            ariaLabel="Go to home page"
            isDarkMode={isDarkMode}
          >
            {t.home}
          </NavButton>
          <NavButton
            onClick={() => navigate('/brabhsaich')}
            ariaLabel="Browse all words"
            isDarkMode={isDarkMode}
          >
            {t.browse}
          </NavButton>
          <NavButton
            onClick={() => navigate('/mu-dheidhinn')}
            ariaLabel="About the dictionary"
            isDarkMode={isDarkMode}
          >
            {t.about}
          </NavButton>
          <LanguageSwitcher />
          <IconButton 
            onClick={onThemeToggle}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            sx={{ 
              color: isDarkMode ? 'inherit' : '#121212',
              '&:hover': {
                backgroundColor: 'transparent',
              },
              '&:focus': {
                backgroundColor: 'transparent',
              },
            }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container 
        id="main-content"
        component="main" 
        sx={{ 
          mt: 4, 
          mb: 4, 
          flex: 1,
          maxWidth: '800px !important',
          px: 2,
        }}
      >
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'transparent',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            {t.copyright.replace('{year}', new Date().getFullYear().toString())}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 