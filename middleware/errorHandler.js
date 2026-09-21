import multer from "multer"

export function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'Max file size is 10 MB.' });
    }
    return res.status(400).json({ error: err.message }); // e.g. LIMIT_UNEXPECTED_FILE = wrong field name
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong.' }); // don't leak internals
}