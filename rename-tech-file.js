// Rename technologiesData.js
const fs = require("fs");
const path = require("path");

const oldPath = path.join(process.cwd(), "src", "data", "techStackData.js");
const newPath = path.join(process.cwd(), "src", "data", "technologiesData.js");

if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
    fs.copyFileSync(oldPath, newPath);
    console.log(
        "File berhasil diubah namanya dari techStackData.js menjadi technologiesData.js"
    );
}
