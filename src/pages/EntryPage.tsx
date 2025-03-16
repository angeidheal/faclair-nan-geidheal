import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Howl } from 'howler';
import {
  Box,
  Typography,
  Paper,
  Link,
  IconButton,
  CircularProgress,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { DictionaryEntry } from '../types/DictionaryEntry';
import { getEntryById } from '../services/dictionaryService';
import BackButton from '../components/BackButton';

export const EntryPage = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Howl | null>(null);
  const [hasAudio, setHasAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) return;
      
      try {
        const result = await getEntryById(id);
        if (!result) return;
        
        setEntry(result);
        
        // Initialize audio if URL exists
        if (result.audioUrl) {
          try {
            // Adjust the audio URL for GitHub Pages
            const baseUrl = process.env.PUBLIC_URL || '';
            const audioUrl = `${baseUrl}${result.audioUrl}`;
            
            console.log('Loading audio from:', audioUrl);
            
            const newSound = new Howl({
              src: [audioUrl],
              html5: true,
              onload: () => {
                console.log('Audio loaded successfully');
                setHasAudio(true);
                setLoading(false);
              },
              onloaderror: (id, error) => {
                console.error('Error loading audio:', error);
                setAudioError('Failed to load audio file');
                setHasAudio(false);
                setLoading(false);
              },
              onplay: () => {
                setIsPlaying(true);
              },
              onend: () => {
                setIsPlaying(false);
              },
              onstop: () => {
                setIsPlaying(false);
              },
            });
            setSound(newSound);
          } catch (error) {
            console.error('Error creating Howl instance:', error);
            setAudioError('Failed to initialize audio player');
            setHasAudio(false);
            setLoading(false);
          }
        } else {
          setHasAudio(false);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching entry:', error);
        setLoading(false);
      }
    };

    fetchEntry();

    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [id]);

  const handlePlayAudio = () => {
    if (sound) {
      if (isPlaying) {
        sound.stop();
      } else {
        sound.play();
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!entry) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h5" gutterBottom>
          Cha deach am facal a lorg
        </Typography>
        <BackButton variant="contained" sx={{ mb: 0 }} />
      </Box>
    );
  }

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 3 }}>
        <Box 
          display="flex" 
          alignItems="center" 
          mb={3}
          role="article"
          aria-labelledby="word-heading"
        >
          <Typography 
            variant="h3" 
            component="h1" 
            id="word-heading"
            sx={{ flexGrow: 1 }}
          >
            {entry.gaelic}
          </Typography>
          {hasAudio && (
            <IconButton
              onClick={handlePlayAudio}
              size="large"
              aria-label={isPlaying ? "Sguir dhen fhuaim" : "Cluich am fuaim"}
              aria-pressed={isPlaying}
              role="button"
              sx={{ 
                backgroundColor: isPlaying ? 'error.main' : 'primary.light',
                color: 'white',
                '&:hover': {
                  backgroundColor: isPlaying ? 'error.dark' : 'primary.main',
                }
              }}
            >
              <VolumeUpIcon aria-hidden="true" />
            </IconButton>
          )}
          {audioError && (
            <Typography 
              color="error" 
              variant="caption" 
              sx={{ ml: 1 }}
              role="alert"
            >
              {audioError}
            </Typography>
          )}
        </Box>

        <Typography variant="h6" gutterBottom id="translations-heading">
          Eadar-theangachaidhean
        </Typography>
        <Box role="region" aria-labelledby="translations-heading">
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="subtitle1" aria-label="Gaeilge">🇮🇪</Typography>
            {entry.translations.gaeilge ? (
              <Typography>{entry.translations.gaeilge}</Typography>
            ) : (
              <Link 
                href="mailto:fios@angeidhealur.scot"
                sx={{ 
                  textDecoration: 'none',
                  color: 'error.main',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'error.dark'
                  }
                }}
                aria-label="Chan eil eadar-theangachadh Gaeilge againn. Cuir moladh dhuinn."
              >
                Chan eil eadar-theangachadh againn. Cuir moladh dhuinn.
              </Link>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="subtitle1" aria-label="Gàidhlig Mhanainn">🇮🇲</Typography>
            {entry.translations.gaidhligMhanainn ? (
              <Typography>{entry.translations.gaidhligMhanainn}</Typography>
            ) : (
              <Link 
                href="mailto:fios@angeidhealur.scot"
                sx={{ 
                  textDecoration: 'none',
                  color: 'error.main',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'error.dark'
                  }
                }}
                aria-label="Chan eil eadar-theangachadh Gàidhlig Mhanainn againn. Cuir moladh dhuinn."
              >
                Chan eil eadar-theangachadh againn. Cuir moladh dhuinn.
              </Link>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="subtitle1" aria-label="Beurla">🏴󠁧󠁢󠁥󠁮󠁧󠁿</Typography>
            {entry.translations.beurla ? (
              <Typography>{entry.translations.beurla}</Typography>
            ) : (
              <Link 
                href="mailto:fios@angeidhealur.scot"
                sx={{ 
                  textDecoration: 'none',
                  color: 'error.main',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'error.dark'
                  }
                }}
                aria-label="Chan eil eadar-theangachadh Beurla againn. Cuir moladh dhuinn."
              >
                Chan eil eadar-theangachadh againn. Cuir moladh dhuinn.
              </Link>
            )}
          </Box>
        </Box>
      </Paper>
      <Box display="flex" justifyContent="center">
        <BackButton />
      </Box>
    </Box>
  );
}; 