const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  // Caminho dos arquivos a serem salvos
  // __dirname = config: ../../tmp/uploads
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({
    // detino dos arquivos
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    // hash para garantir a uncidade do arquivo
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);
        const filename = `${hash.toString("hex")}-${file.originalname}`;
        callback(null, filename);
      });
    },
  }),
  // limites para os arquivos
  limits: {
    // tamanho do arquivo
    fileSize: 100 * 1024 * 1024,
  },
  // filtro dos arquivos
  fileFilter: (req, file, callback) => {
    // req: requisição do express
    // file: arquivo
    // callback: chamada depois da verificação

    // tipos de arquivos a serem aceitos
    const allowedMimes = [
      //"image/jpeg",
      //"image/png",
      //'image/gif'
      "application/pdf",
    ];

    // se o mimetype do file estiver em allowedMimes
    if (allowedMimes.includes(file.mimetype)) {
      // sem erro, com sucessos
      callback(null, true);
    } else {
      // erro no mimetype do file
      callback(new Error("Invalid file type."));
    }
  },
};
