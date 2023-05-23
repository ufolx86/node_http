const http = require("http");
const path = require("path");
const fs = require("fs");

// CREATE SERVER
// http
//   .createServer((req, res) => {
//     res.write("Hello World");
//     res.end();
//   })
//   .listen(5000, () => console.log("Server running at http://localhost:5000"));

// USING VAR
const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    res.end("<h1>Home</h1>");
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
