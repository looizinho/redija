import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { makeTheme } from './theme';
import Homepage from './components/Homepage';
import EditorPage from './components/EditorPage';

export default function App() {
  const [seed, setSeed] = useState('#6750A4');
  const theme = useMemo(() => makeTheme(seed), [seed]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Redija
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}