
 express = require('express');
const cors = require('cors');
const Url = require('./models/Url');
const { connectDb } = require('./mongoDb/connectDb');
const morgan = require('morgan')


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


connectDb()

// POST route to shorten a URL
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const url = new Url({ originalUrl });
    await url.save();
    res.json({ shortUrl: url.shortUrl });
  } catch (err) {
    res.status(500).json('Server error');
  }
});

// GET route to redirect to the original URL
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      res.status(404).json('URL not found');
    }
  } catch (err) {
    res.status(500).json('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
