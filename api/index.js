const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ url: fileUrl });
});
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/uploads', express.static(uploadDir));
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
