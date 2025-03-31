import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'gd' ? 'ga' : 'gd');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outlined"
      size="small"
      sx={{
        minWidth: 'auto',
        px: 2,
        py: 1,
        borderRadius: 2,
        borderColor: 'primary.main',
        color: 'primary.main',
        '&:hover': {
          borderColor: 'primary.dark',
          backgroundColor: 'primary.light',
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: '"Lemonada", cursive',
          fontWeight: 500,
        }}
      >
        {language === 'gd' ? 'Gàidhlig' : 'Gaeilge'}
      </Typography>
    </Button>
  );
};

export default LanguageSwitcher; 