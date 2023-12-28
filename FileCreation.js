const express = require("express"); // Express is  replacement for the core http module ( Web Framework fro Node.js)
const app = express();
const fs = require("fs");
const port = 3000;
const path = require("path");
const folderPath = "./files";

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

app.get("/file-creation", FileCreation);
app.get("/list-files", ListFiles);

const now = new Date();
const fileName = `${now.toISOString().replace(/:/g, "-")}.txt`;
const filePath = path.join(folderPath, fileName);

function FileCreation(req, res) {
  fs.writeFile(filePath, now.toString(), (err) => {
    if (err) {
      res.setHeader(500);
      res.end("server error");
      return;
    }
    res.setHeader("Content-Type", "text/plain");
    res.end(`File Created: ${fileName}`);
  });
}

function ListFiles(req, res) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.setHeader(500);
      res.end("server error");
      return;
    }

    const textfiles = files.filter((file) => path.extname(file) === ".txt");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(textfiles));
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}`));
