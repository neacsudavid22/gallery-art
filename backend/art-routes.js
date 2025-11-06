import express from 'express';
import multer from 'multer';
import { AppDataSource } from './db-connection.js';

const upload = multer({ storage: multer.memoryStorage() }); // fișier în memorie
const artRouter = express.Router();

// Repository
const getArtRepo = () => AppDataSource.getRepository('Art');

// CREATE
artRouter.post('/', upload.single('image_blob'), async (req, res) => {
  try {
    const { title, description, style, author, year } = req.body;
    const image_blob = req.file ? req.file.buffer : null;

    const repo = getArtRepo();
    const newArt = repo.create({ 
      title, 
      description, 
      style, 
      author, 
      year: year ? parseInt(year) : null,
      image_blob 
    });
    const savedArt = await repo.save(newArt);

    res.status(201).json(savedArt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
artRouter.get('/', async (req, res) => {
  try {
    const arts = await getArtRepo().find();
    const artsWithBase64 = arts.map(a => ({
      ...a,
      image_blob: a.image_blob ? a.image_blob.toString('base64') : null
    }));
    res.json(artsWithBase64);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// READ BY STYLE
artRouter.get('/style/:style', async (req, res) => {
  try {
    const style = req.params.style;
    const arts = await getArtRepo().find({ where: { style } });
    const artsWithBase64 = arts.map(a => ({
      ...a,
      image_blob: a.image_blob ? a.image_blob.toString('base64') : null
    }));
    res.json(artsWithBase64);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
artRouter.get('/:id', async (req, res) => {
  try {
    const art = await getArtRepo().findOneBy({ id_art: parseInt(req.params.id) });
    if (!art) return res.status(404).json({ error: 'Art not found' });

    res.json({
      ...art,
      image_blob: art.image_blob ? art.image_blob.toString('base64') : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// UPDATE
artRouter.put('/:id', upload.single('image_blob'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const repo = getArtRepo();
    const art = await repo.findOneBy({ id_art: id });
    if (!art) return res.status(404).json({ error: 'Art not found' });

    const { title, description, style, author, year } = req.body;
    if (title) art.title = title;
    if (description) art.description = description;
    if (style) art.style = style;
    if (author) art.author = author;
    if (year) art.year = parseInt(year);
    if (req.file) art.image_blob = req.file.buffer;

    const updatedArt = await repo.save(art);

    res.json({
      ...updatedArt,
      image_blob: updatedArt.image_blob ? updatedArt.image_blob.toString('base64') : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// DELETE
artRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const repo = getArtRepo();
    const art = await repo.findOneBy({ id_art: id });
    if (!art) return res.status(404).json({ error: 'Art not found' });

    await repo.remove(art);
    res.json({ message: 'Art deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export { artRouter };
