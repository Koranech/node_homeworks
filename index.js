const http = require('node:http');

const anton = async () => {

    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            data: 'Hello Everyone!',
        }));
    });
    server.listen(3000);


    }
    anton()


