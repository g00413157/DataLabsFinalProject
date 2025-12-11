import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(uploadDir));

mongoose
  .connect(
    "mongodb+srv://admin:admin@datarepcluster.ofryorq.mongodb.net/KitVault?appName=DataRepCluster"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

const kitSchema = new mongoose.Schema({
  name: String,
  club: String,
  season: String,
  player: String,
  brand: String,
  condition: String,
  value: Number,
  imageUrl: String,
  dateAdded: { type: Date, default: Date.now }
});

const Kit = mongoose.model("Kit", kitSchema);

app.get("/api/kits", async (req, res) => {
  const kits = await Kit.find();
  res.json({ kits });
});

app.get("/api/kits/:id", async (req, res) => {
  const kit = await Kit.findById(req.params.id);
  if (!kit) return res.status(404).json({ message: "Kit not found" });
  res.json(kit);
});

app.post("/api/kits", upload.single("image"), async (req, res) => {
  try {
    const imageUrl =
      req.file
        ? `/uploads/${req.file.filename}`
        : req.body.imageUrl || "";

    const kit = new Kit({
      name: req.body.name,
      club: req.body.club,
      season: req.body.season,
      player: req.body.player,
      brand: req.body.brand,
      condition: req.body.condition,
      value: req.body.value,
      imageUrl
    });

    await kit.save();
    res.status(201).json(kit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/kits/:id", upload.single("image"), async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      club: req.body.club,
      season: req.body.season,
      player: req.body.player,
      brand: req.body.brand,
      condition: req.body.condition,
      value: req.body.value
    };

    if (req.file) {
      update.imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      update.imageUrl = req.body.imageUrl;
    }

    const updatedKit = await Kit.findByIdAndUpdate(req.params.id, update, {
      new: true
    });

    if (!updatedKit) {
      return res.status(404).json({ message: "Kit not found" });
    }

    res.json(updatedKit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/kits/:id", async (req, res) => {
  const kit = await Kit.findByIdAndDelete(req.params.id);
  if (!kit) return res.status(404).json({ message: "Kit not found" });
  res.json({ message: "Kit deleted successfully" });
})

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: v => v.length === 4
  },
  correctAnswer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: "jerseys"
  },
  difficulty: {
    type: String,
    default: "easy"
  }
});


const QuizQuestion = mongoose.model(
  "QuizQuestion",
  quizSchema,
  "quizQuestions"
);


app.get("/api/quiz", async (req, res) => {
  try {
    const questions = await QuizQuestion.aggregate([
      { $sample: { size: 10 } }
    ]);

    res.json({ questions });
  } catch (err) {
    console.error("Quiz fetch error:", err);
    res.status(500).json({ message: "Failed to load quiz questions" });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
