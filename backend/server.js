// backend/server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/redija', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DocSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Doc = mongoose.model('Doc', DocSchema);

app.get('/api/docs', async (req, res) => {
  try {
    const docs = await Doc.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/docs/:id', async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/docs', async (req, res) => {
  try {
    const { title = 'Untitled', content = '' } = req.body;
    const newDoc = new Doc({ title, content });
    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/docs/:id', async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    const updatedDoc = await Doc.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedDoc) return res.status(404).json({ error: 'Not found' });
    res.json(updatedDoc);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/docs/:id', async (req, res) => {
  try {
    const deletedDoc = await Doc.findByIdAndDelete(req.params.id);
    if (!deletedDoc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));