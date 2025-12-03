import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const port = 3000;


app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://admin:admin@datarepcluster.ofryorq.mongodb.net/KitVault?appName=DataRepCluster')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });


const kitSchema = new mongoose.Schema({
  name: String,
  club: String,
  season: String,
  player: String,
  brand: String,
  condition: String,
  value: Number,
  imageUrl: String,
  dateAdded: { type: Date, default: Date.now },
});

const kitModel = mongoose.model('Kit', kitSchema);


app.get('/api/kits', async (req, res) => {
  try {
    const kits = await kitModel.find({});
    res.json({ kits: kits });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch kits', error: error.message });
  }
});


app.get('/api/kits/:id', async (req, res) => {
  try {
    const kit = await kitModel.findById(req.params.id);
    if (!kit) {
      return res.status(404).json({ message: 'Kit not found' });
    }
    res.json(kit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch kit', error: error.message });
  }
});


app.post('/api/kits', async (req, res) => {
  try {
    const newKit = new kitModel(req.body);
    const savedKit = await newKit.save();
    res.status(201).json(savedKit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add kit', error: error.message });
  }
});


app.put('/api/kits/:id', async (req, res) => {
  try {
    const updatedKit = await kitModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedKit) {
      return res.status(404).json({ message: 'Kit not found' });
    }

    res.json(updatedKit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update kit', error: error.message });
  }
});

app.delete('/api/kits/:id', async (req, res) => {
  try {
    const kit = await kitModel.findByIdAndDelete(req.params.id);

    if (!kit) {
      return res.status(404).json({ message: 'Kit not found' });
    }

    res.status(200).json({ message: 'Kit deleted successfully', kit });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting kit', error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
