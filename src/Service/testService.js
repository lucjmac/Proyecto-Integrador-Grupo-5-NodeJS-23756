import conn from '../config/conn.js';

const testService = {
    /**
     * Consulta por tabla
     * @param {consulta}
     */
    consulta: async (tabla) => {
        try {
            console.log("Consulta a la tabla "+tabla);
            const query = "select * from "+tabla;
            const consulta = await conn.query(query);
        
            return consulta;
            } catch (error) {
                console.log("Error al realizar conexion con BBDD: "+error);
            }
    },
    insertar: async (valor)=> {
        try {
            const query = "INSERT INTO sql10668848.TEST (NAME) VALUES('"+valor+"');";
            const consulta = await conn.query(query);
        
            return consulta;
            } catch (error) {
                console.log("Error al realizar conexion con BBDD: "+error);
            }
    }
  
  };
  

  export default testService;