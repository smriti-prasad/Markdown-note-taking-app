const express = require('express');
const multer = require('multer');
const checkGrammar = require('../services/grammar');
const extractText= require('../utils/extract-text');
const { saveNote, getNoteById } = require('../utils/storage');
const renderMarkdown = require('../services/markdown');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', multer().single('file'), async(req, res) => {
    //extracting the text from file to work with
    const text = await extractText(req);

    if(!text) {
        return res.status(400).send('No text provided.');
    }

    const note = saveNote(text);

    res.json({
        id: note.id,
        message: 'Text received successfully',
        text: text
    })

});

router.post('/', async(req,res) => {
    const text = await extractText(req);
    if(!req.body.text) {
        return res.status(400).send('No text provided.');
    }

    const note = saveNote(text);
    
    res.json({
        id: note.id,
        message: 'Text received successfully',
        text:text
    })
})


router.post('/:id/grammar', async (req, res) => {
  const note = getNoteById(req.params.id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const result = await checkGrammar(note.content);
  res.json(result);
});

//markdown rendering endpoint
router.get('/:id/html', (req, res) => {
  const note = getNoteById(req.params.id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const html = renderMarkdown(note.content);
  res.send(html);
});

module.exports = router;
