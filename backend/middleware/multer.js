import multer from "multer";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Specify the directory where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now()+"-"+file.originalname;
    cb(null, uniqueName); // Set the filename to be used for the uploaded file
  },
});

// Create the multer middleware
const uploadSingle = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validate the file if needed (e.g., check file type, size, etc.)
    // For example, if you only want to allow image files, you can do:
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
}).single("image"); // Specify the field name of the single file upload

export default uploadSingle;
