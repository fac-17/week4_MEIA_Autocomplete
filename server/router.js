const fs = require("fs");
const http = require("http");
const path = require("path");

const router = (request, response) => {

  let endpoint = request.url;
  if (endpoint === '/') {
    endpoint = '/public/index.html'
  }
  const filePath = path.join(__dirname, '..', endpoint);

  const extension = endpoint.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    ico: 'image/x-icon'
  };

  if (endpoint.startsWith("/")) {
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500, {'content-type': 'text/html'});
        response.end("Sorry we had a problem with our server");
      } else {
         response.writeHead(200, {'content-type': extensionType[extension]});
        response.end(file);
      }
    })
  }
}
  //
  // if (endpoint.startsWith("/public")) {
  //   fs.readFile(filePath, (error, file) => {
  //     if (error) {
  //       response.writeHead(500, {'content-type': 'text/html'});
  //       response.end("Sorry we had a problem with our server");
  //     } else {
  //       response.writeHead(200, {'content-type': 'text/css'});
  //       response.end(file);
  //     }
  //   })
  // }

module.exports = router;
