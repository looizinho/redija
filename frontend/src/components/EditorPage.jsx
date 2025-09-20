import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Input } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EditorPane from './EditorPane';
import DocList from './DocList';

export default function EditorPage() {
  const [seed, setSeed] = useState('#6750A4');

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Editor</Typography>
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
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box sx={{ width: 300, borderRight: '1px solid rgba(0,0,0,0.1)' }}>
          <DocList />
        </Box>
        <Box sx={{ flex: 1, p: 2 }}>
          <EditorPane />
        </Box>
      </Box>
    </Box>
  );
}