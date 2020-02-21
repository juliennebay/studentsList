//THIS FILE CREATES THE SERVER & DEFINES THE ROUTES

const http = require("http");
const path = require("path");
const fs = require("fs");

const FILES = {
  ".js": "students.js",
  ".css": "students.css"
};

const server = http.createServer((request, response) => {
  if (request.url === "/studentApi") {
    const studentsFile = fs.readFileSync("./studentsApi.json");
    const allStudents = JSON.parse(studentsFile);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(allStudents), "utf-8");
  } else {
    const fileName = FILES[path.extname(request.url)] || "index.html";
    const contentType = `text/${path.extname(request.url).replace(".", "") ||
      "html"}`;
    const responseContent = fs.readFileSync(`./${fileName}`);
    response.writeHead(200, { "Content-Type": contentType });
    response.end(responseContent, "utf-8");
  }
});

server.listen(3000);
