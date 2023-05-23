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

  // THE FOLLOWING CODE WORKS BUT IS NOT EFFICIENT
  // if (req.url === "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "index.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  // }
  // if (req.url === "/about") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "about.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  // }

  // if (req.url === "/api/users") {
  //   const users = [
  //     { name: "Bob Smith", age: 40 },
  //     { name: "Cindy Lauper", age: 55 },
  //   ];
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(users));
  // }

  // BUILD FILE PATH
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  // GET EXTENSION OF FILE
  let extName = path.extname(filePath);

  // INITIAL CONTENT TYPE
  let contentType = "text/html";

  // CHECK EXTENSION AND SET CONTENT TYPE
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "text/javascript";
      break;
    case ".js":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // READ FILE
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // PAGE NOT FOUND
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // SOME SERVER ERROR
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
