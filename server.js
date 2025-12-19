require('dotenv').config();

const express = require('express');
const app = express();


/*app.use(express.json());
app.use(express.urlencoded({ extended: true }));*/

const noteRouter = require('./routes/notes');

app.use('/notes', noteRouter);


/*app.post('/upload', multer().single('file'), (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    res.json({
        message: 'File uploaded successfully',
        content: req.file.buffer.toString('utf-8')
    })
});*/

/*app.post('/text', (req,res) => {
    if(!req.body.text) {
        return res.status(400).send('No text provided.');
    }

    res.json({
        message: 'Text received successfully',
        text: req.body.text
    })
});
*/

async function startServer() {
    try{

        const PORT = process.env.PORT || 3900;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();



