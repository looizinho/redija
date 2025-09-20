// backend/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const app = express();
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const DOCS_FILE = path.join(DATA_DIR, 'docs.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DOCS_FILE)) fs.writeFileSync(DOCS_FILE, JSON.stringify([]));

function readDocs() {
  return JSON.parse(fs.readFileSync(DOCS_FILE, 'utf8') || '[]');
}
function writeDocs(docs) {
  fs.writeFileSync(DOCS_FILE, JSON.stringify(docs, null, 2));
}

app.get('/api/docs', (req, res) => {
  res.json(readDocs());
});

app.get('/api/docs/:id', (req, res) => {
  const docs = readDocs();
  const doc = docs.find(d => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

app.post('/api/docs', (req, res) => {
  const { title = 'Untitled', content = '' } = req.body;
  const docs = readDocs();
  const newDoc = { id: nanoid(), title, content, createdAt: new Date().toISOString() };
  docs.unshift(newDoc);
  writeDocs(docs);
  res.status(201).json(newDoc);
});

app.put('/api/docs/:id', (req, res) => {
  const docs = readDocs();
  const idx = docs.findIndex(d => d.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  docs[idx] = { ...docs[idx], ...(req.body || {}), updatedAt: new Date().toISOString() };
  writeDocs(docs);
  res.json(docs[idx]);
});

app.delete('/api/docs/:id', (req, res) => {
  let docs = readDocs();
  const origLen = docs.length;
  docs = docs.filter(d => d.id !== req.params.id);
  if (docs.length === origLen) return res.status(404).json({ error: 'Not found' });
  writeDocs(docs);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));