const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const htmlDocx = require('html-docx-js');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/convert', async (req, res) => {
    try {
        const html = req.body.html;
        const docxBlob = htmlDocx.asBlob(html);

        const arrayBuffer = await docxBlob.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=output.docx');
        res.status(200).send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error processing the request");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});