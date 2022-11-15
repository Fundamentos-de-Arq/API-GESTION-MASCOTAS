const dynamodb = require('aws-sdk/clients/dynamodb');
const db = new dynamodb.DocumentClient();

const mascotasTable = process.env.MASCOTAS_TABLE;

exports.crearMascotas = async (event, context, callback) => {

    let validaData = validar_datos_registro(event);
    const requestBody = validaData.data_validada;

    requestBody.id = create_UUID();

    let params = {
        TableName : mascotasTable,
        Item: requestBody
    };


    try {
        await db.put(params).promise();
        console.log("Registro correcto");
    }
    catch (e) {
        console.error("ERROR: ", e);
        errorResponse('InternalServerError', 'Error interno al registrar.', e.message, context.awsRequestId, callback, 500);
        return;
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"           
        }
    };

    return response;

    function validar_datos_registro(event) {
        let response_validacion = { codigo: 200, mensaje: 'Datos validos', data_validada: {} };
        let requestBody = JSON.parse(event.body);
        response_validacion.data_validada = requestBody;
        return response_validacion;
    }

    function create_UUID(){
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
}
