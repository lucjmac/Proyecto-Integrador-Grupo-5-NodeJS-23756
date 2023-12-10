import path from "path";

import testService from "../service/testService.js"

export class testController {

  constructor() { }

    async consulta(req, res) {
        const tabla = req.params.tabla
       var rs = await  testService.consulta(tabla);
        console.log(rs);
        res.setHeader("Content-Type", "text/plain");
        res.send("Proceso ejecutado, Tabla consultada "+tabla);
    }

    async insertTest(req, res) {
        const valor = req.params.valor
        var rs = await  testService.insertar(valor);
        console.log(rs);
        res.setHeader("Content-Type", "text/plain");
        res.send("Insercion de valor en tabla TEST, Valor:  "+valor);
    }


}





