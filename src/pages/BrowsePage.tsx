import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  List, 
  ListItemButton, 
  ListItemText,
  CircularProgress,
  Fab,
  Zoom,
  useScrollTrigger,
  Paper,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getAllEntries } from '../services/dictionaryService';
import { DictionaryEntry } from '../types/DictionaryEntry';

const BrowsePage: React.FC = () => {
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Show back to top button when scrolling down 100px
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const allEntries = await getAllEntries();
        const sortedEntries = allEntries.sort((a: DictionaryEntry, b: DictionaryEntry) => 
          a.gaelic.localeCompare(b.gaelic)
        );
        setEntries(sortedEntries);
      } catch (error) {
        console.error('Error loading entries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
        role="status"
        aria-label="A' luchdachadh..."
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            fontFamily: '"Lemonada", cursive',
          }}
        >
          Brabhsaich
        </Typography>
      </Box>

      <Paper 
        sx={{ 
          p: 4,
          mb: 4,
        }}
      >
        <List 
          role="navigation" 
          aria-label="Liosta nam faclan"
          sx={{
            '& > *': {
              breakInside: 'avoid',
            }
          }}
        >
          {entries.map((entry) => (
            <ListItemButton
              key={entry.id}
              onClick={() => navigate(`/${entry.id}`, { state: { from: '/brabhsaich' } })}
              sx={{
                mb: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'translateX(4px)',
                  borderColor: 'primary.main',
                },
                '@media (max-width: 600px)': {
                  px: 2,
                  py: 1.5,
                },
              }}
              role="link"
              aria-label={`Seall mìneachadh airson ${entry.gaelic}`}
            >
              <ListItemText
                primary={entry.gaelic}
                primaryTypographyProps={{
                  variant: 'h6',
                  sx: { 
                    fontWeight: 500,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                  },
                }}
              />
              <ChevronRightIcon 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }} 
                aria-hidden="true" 
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      <Zoom in={trigger}>
        <Box
          role="presentation"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <Fab
            color="primary"
            size="medium"
            aria-label="Till gu mullach na duilleige"
            onClick={handleBackToTop}
            sx={{
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : 'primary.main',
              color: (theme) => theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
              '&:hover': {
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a6d4fa' : 'primary.dark',
              },
              '@media (max-width: 600px)': {
                bottom: 24,
                right: 24,
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Box>
      </Zoom>
    </>
  );
};

export default BrowsePage; 