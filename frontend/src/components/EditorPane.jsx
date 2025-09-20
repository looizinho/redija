import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Stack, IconButton, Tooltip, TextareaAutosize } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import TitleIcon from '@mui/icons-material/Title';
import ListIcon from '@mui/icons-material/FormatListBulleted';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function wrapSelection(textarea, wrapLeft, wrapRight = wrapLeft) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const before = value.substring(0, start);
  const selected = value.substring(start, end);
  const after = value.substring(end);
  const newValue = before + wrapLeft + selected + wrapRight + after;
  textarea.value = newValue;
  // restore selection
  textarea.selectionStart = start + wrapLeft.length;
  textarea.selectionEnd = start + wrapLeft.length + selected.length;
  textarea.focus();
}

export default function EditorPane() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('## Bem vindo\n\nEscreva sua redação aqui.');
  const taRef = useRef();

  useEffect(() => {
    // placeholder: could load last doc...
  }, []);

  const insert = (left, right) => {
    const ta = taRef.current;
    wrapSelection(ta, left, right);
    setContent(ta.value);
  };

  async function saveDoc() {
    try {
      const res = await axios.post('/api/docs', { title: title || 'Sem título', content });
      alert(`Salvo: ${res.data.id}`);
    } catch (e) {
      console.error(e);
      alert('Erro ao salvar (ver console).');
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <TextField label="Título" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <Tooltip title="Salvar">
          <IconButton color="primary" onClick={saveDoc}><SaveIcon /></IconButton>
        </Tooltip>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Tooltip title="Negrito"><IconButton onClick={() => insert('**', '**')}><BoldIcon /></IconButton></Tooltip>
        <Tooltip title="Itálico"><IconButton onClick={() => insert('*', '*')}><ItalicIcon /></IconButton></Tooltip>
        <Tooltip title="Título"><IconButton onClick={() => insert('# ', '')}><TitleIcon /></IconButton></Tooltip>
        <Tooltip title="Lista"><IconButton onClick={() => insert('- ', '')}><ListIcon /></IconButton></Tooltip>
      </Stack>

      <Box sx={{ display: 'flex', gap: 2, flex: 1, overflow: 'hidden' }}>
        <Box sx={{ flex: 1 }}>
          <TextareaAutosize
            ref={taRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', height: '100%', padding: 12, boxSizing: 'border-box', fontFamily: 'monospace', fontSize: 14 }}
          />
        </Box>

        <Box sx={{ width: '50%', borderLeft: '1px solid rgba(0,0,0,0.06)', p: 2, overflow: 'auto' }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
}