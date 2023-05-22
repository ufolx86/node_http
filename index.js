const http = require("http");

// CREATE SERVER
http
  .createServer((req, res) => {
    res.write("Hello World");
    res.end();
  })
  .listen(5000, () => console.log("Server running at http://localhost:5000"));
