async function extractText(req) {

    if(req.file?.buffer) {
        return req.file.buffer.toString('utf-8');
    }

    if(req.body?.text) {
        return req.body.text;
    }

    return null;
}

module.exports = extractText;