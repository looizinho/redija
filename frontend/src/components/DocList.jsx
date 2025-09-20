import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function DocList() {
  const [docs, setDocs] = useState([]);

  async function load() {
    try {
      const res = await axios.get('/api/docs');
      setDocs(res.data);
    } catch (e) { console.error(e); }
  }
  useEffect(() => { load(); }, []);

  async function remove(id) {
    try {
      await axios.delete(`/api/docs/${id}`);
      load();
    } catch (e) { console.error(e); }
  }

  return (
    <List>
      {docs.map(d => (
        <ListItem key={d.id} secondaryAction={<IconButton edge="end" onClick={() => remove(d.id)}><DeleteIcon /></IconButton>}>
          <ListItemText primary={d.title} secondary={new Date(d.createdAt).toLocaleString()} />
        </ListItem>
      ))}
    </List>
  );
}