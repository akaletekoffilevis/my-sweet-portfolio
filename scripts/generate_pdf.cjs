const fs = require("fs");
const path = require("path");

const cvPath = path.join(__dirname, "..", "public", "cv_koffi_levis_akalete.pdf");

if (!fs.existsSync(cvPath)) {
  console.error("ERREUR : public/cv_koffi_levis_akalete.pdf est manquant. Ajoute le CV avant de builder.");
  process.exit(1);
}

console.log("CV présent :", cvPath);
