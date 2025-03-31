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

interface LayoutProps {
  children: React.ReactNode;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onThemeToggle, isDarkMode }) => {
  const navigate = useNavigate();

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
        Skip to main content
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
            Dachaigh
          </NavButton>
          <NavButton
            onClick={() => navigate('/brabhsaich')}
            ariaLabel="Browse all words"
            isDarkMode={isDarkMode}
          >
            Brabhsaich
          </NavButton>
          <NavButton
            onClick={() => navigate('/mu-dheidhinn')}
            ariaLabel="About the dictionary"
            isDarkMode={isDarkMode}
          >
            Mu dheidhinn
          </NavButton>
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
            © {new Date().getFullYear()} Faclair nan Gèidheal. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 