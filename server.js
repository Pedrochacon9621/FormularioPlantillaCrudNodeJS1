const express = require ('express');
const fs = require ('fs');
const path = require ('path');

const app =  express();
const router = require ('./router/routes.js');
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({'extended': false}));

//app.use(express.static(path.join(__dirname + '/paginaWeb')))
app.use(express.static('paginaWeb'));


app.get('/', (req, res) =>{
    fs.readFile('./pagina/index.html',(data, error)=>{
        if (error) {
            res.writeHead(404);
            res.write('Archivo no encontrado');
            console.log('Archivo no encontrado');
        }else {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
        }
        res.end();
    })
})



app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
