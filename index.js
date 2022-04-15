const http = require("http");
const fs = require('fs');
const url = require('url');
const { insertar, consultar, validar } = require('./consultas');

const mensaje = async () => {
    alert('Usuario no encontrado')
}



const port = 3000;

// Crear servidor
http
    .createServer(async (req, res) => {
        // Ruta raíz
        if (req.url == "/" && req.method == "GET") {
            res.setHeader('content-type', 'text/html;charset=utf8')
            const html = fs.readFileSync('index.html', 'utf8')
            res.statusCode = 200;
            res.end(html);

            // Ruta POST de url = '/usuario'
        } else if ((req.url == "/usuario" && req.method == "POST")) {
            try {
                let body = "";
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on("end", async () => {
                    const usuario = (JSON.parse(body));
                    console.log(usuario)
                    const result = await insertar(usuario);
                    res.statusCode = 201;
                    res.end(JSON.stringify(result));
                });
            } catch (error) {
                showError(error, res);
            }

            // Ruta GET de url = '/usuarios'
        } else if (req.url == "/usuarios" && req.method == "GET") {
            try {
                const registros = await consultar();
                res.statusCode = 200;
                res.end(JSON.stringify(registros));
            } catch (error) {
                showError(error, res);
            }
            // Ruta PUT de url = '/usuario'
        }
        else if (req.url == '/login' && req.method == "POST") {

            try {
                let body = "";
                req.on('data', (chunk) => {
                    body += chunk;

                });

                req.on("end", async () => {
                    const datos = Object.values(JSON.parse(body));
                    const respuesta = await validar(datos);

                    if (respuesta.rows[0].count != 0) {
                        res.end()
                    }
                    else {
                        res.statusCode = 404;
                        res.statusMessage = 'Not found';
                        res.end('Usuario no encontrado.')
                    }

                });

            } catch (error) {
                res.statusCode = 404;
                res.statusMessage = 'Not found';
                res.end('Usuario no encontrado.')
            }

        } else {
            res.statusCode = 404;
            const respuesta = 'Recurso no encontrado.';
            console.log(respuesta);
            res.end(respuesta);
        }
    })


    .listen(port, () => console.log('Conectado al puerto:', port));

const showError = (error, res) => {
    console.log(error.message);
    console.log(error.code);
    res.statusCode = 500;
    res.end(JSON.stringify(error));
}