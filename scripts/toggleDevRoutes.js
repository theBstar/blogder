const fs = require("fs");
const path = require("path");

const routeFiles = [
  ["src/app/edit/page.tsx", "src/app/edit/prod.tsx"],
  ["src/app/blogs/new/page.tsx", "src/app/blogs/new/prod.tsx"],
];

// iterate through routeFiles and toggle file contents

routeFiles.forEach(([devFile, prodFile]) => {
  const devContent = fs.readFileSync(path.join(process.cwd(), devFile), "utf8");
  const prodContent = fs.readFileSync(
    path.join(process.cwd(), prodFile),
    "utf8"
  );

  try {
    fs.writeFileSync(devFile, prodContent);
    fs.writeFileSync(prodFile, devContent);
  } catch {
    fs.writeFileSync(devFile, devContent);
    fs.writeFileSync(prodFile, prodContent);
  }
});
