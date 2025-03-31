import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DictionaryEntry } from '../types/DictionaryEntry';
import { searchDictionary } from '../services/dictionaryService';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  gd: {
    searchPlaceholder: 'Cuir a-steach facal...',
    searchLabel: 'Lorg facal',
    searching: "A' lorg...",
    clearSearch: 'clear search',
    noResults: 'Chan eil toradh ann',
    searchDescription: 'Lorg ann an Gàidhlig, Gaeilge, Gàidhlig Mhanainn no Beurla.',
    searchNote: "Thoir an àire ge-tà nach eil Gàidhlig Mhanainn air a' chuid as motha de dh'fhaclan.",
    by: 'leis',
    author: "a' Ghèidheal Ùr",
    authorLink: 'https://angeidhealur.scot/',
  },
  ga: {
    searchPlaceholder: 'Cuir isteach focal...',
    searchLabel: 'Lorg focal',
    searching: 'Ag lorg...',
    clearSearch: 'clear search',
    noResults: 'Níl toradh ann',
    searchDescription: 'Lorg i nGaeilge, Gàidhlig, Gaeilge Mhanainn nó Béarla.',
    searchNote: 'Tabhair faoi deara nach bhfuil Gaeilge Mhanainn ar an gcuid is mó de na focail.',
    by: 'le',
    author: 'an Gheal Úr',
    authorLink: 'https://angeidhealur.scot/',
  },
};

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchDictionary(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setResults([]);
  };

  // Update results when search query changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500); // Increased debounce time to 500ms

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            gap: 2,
          }}
        >
          <Link 
            href="/" 
            sx={{ 
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt=""
              onError={(e) => {
                console.error('Error loading logo:', e);
                const img = e.target as HTMLImageElement;
                console.log('Attempted logo URL:', img.src);
              }}
              sx={{
                width: { xs: 80, sm: 100 },
                height: 'auto',
                mb: 1,
                borderRadius: { xs: '10px', sm: '13px' },
                WebkitBorderRadius: { xs: '10px', sm: '13px' },
              }}
            />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: 'text.primary', 
                textAlign: 'center',
                fontSize: { xs: '1.75rem', sm: '2.125rem' },
                wordWrap: 'break-word',
                fontFamily: '"Lemonada", cursive !important',
                fontWeight: '700 !important',
                letterSpacing: '-0.5px',
              }}
            >
              Faclair nan Gèidheal
            </Typography>
          </Link>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{
              fontFamily: '"Lemonada", cursive',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              textAlign: 'center',
            }}
          >
            {t.by}{' '}
            <Link
              href={t.authorLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontFamily: '"Lemonada", cursive',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'primary.dark',
                },
                '&:focus': {
                  outline: '2px solid currentColor',
                  outlineOffset: '2px',
                },
              }}
            >
              {t.author}
            </Link>
          </Typography>
        </Box>
      </Box>

      <Paper
        sx={{ 
          p: 4,
          mb: 4,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputProps={{
            'aria-label': t.searchLabel,
            'aria-expanded': searchQuery.length >= 2,
            'aria-controls': 'search-results-list',
            'aria-describedby': 'search-description',
            style: { fontSize: '1rem' },
          }}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: { xs: '1rem', sm: '1.1rem' },
            },
            '& .MuiInputLabel-root': {
              fontSize: { xs: '1rem', sm: '1.1rem' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon 
                  color="action" 
                  aria-hidden="true"
                  sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress size={20} aria-label={t.searching} />
                ) : (
                  <IconButton 
                    onClick={handleClear} 
                    edge="end" 
                    aria-label={t.clearSearch}
                    sx={{
                      '&:focus': {
                        outline: '2px solid currentColor',
                        outlineOffset: '2px',
                      },
                    }}
                  >
                    <ClearIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        <Typography 
          id="search-description"
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mt: 2,
            textAlign: 'center',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            lineHeight: 1.6,
          }}
        >
          {t.searchDescription}
          <br />
          {t.searchNote}
        </Typography>
      </Paper>

      {searchQuery.length >= 2 && (
        <Paper
          sx={{ 
            p: 4,
            mb: 4,
          }}
        >
          <List
            id="search-results-list"
            role="region"
            aria-label="Toraidhean"
            aria-live="polite"
            sx={{
              width: '100%',
              '& > *': {
                breakInside: 'avoid',
              },
            }}
          >
            {results.length > 0 ? (
              results.map((entry) => (
                <ListItemButton
                  key={entry.id}
                  onClick={() => navigate(`/${entry.id}`, { state: { from: '/' } })}
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
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    },
                    '&:active': {
                      transform: 'translateX(2px)',
                    },
                    '&:focus': {
                      outline: '2px solid currentColor',
                      outlineOffset: '2px',
                    },
                    '@media (max-width: 600px)': {
                      px: 2,
                      py: 1.5,
                    },
                  }}
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
                      opacity: 0.5,
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }} 
                  />
                </ListItemButton>
              ))
            ) : (
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  textAlign: 'center',
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                }}
              >
                {t.noResults}
              </Typography>
            )}
          </List>
        </Paper>
      )}
    </>
  );
};

export default SearchPage; 