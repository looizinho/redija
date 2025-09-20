import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Box, AppBar, Toolbar, Typography, IconButton, Input } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { makeTheme } from './theme';
import EditorPane from './components/EditorPane';
import DocList from './components/DocList';

export default function App() {
  const [seed, setSeed] = useState('#6750A4');
  const theme = useMemo(() => makeTheme(seed), [seed]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Material You Editor (demo)</Typography>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ColorLensIcon />
            <Input
              type="color"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              sx={{ width: 40, height: 40, padding: 0 }}
            />
          </label>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        <Box sx={{ width: 320, borderRight: '1px solid rgba(0,0,0,0.08)', overflow: 'auto' }}>
          <DocList />
        </Box>
        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
          <EditorPane />
        </Box>
      </Box>
    </ThemeProvider>
  );
}