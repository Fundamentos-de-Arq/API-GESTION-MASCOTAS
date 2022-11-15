const dynamodb = require('aws-sdk/clients/dynamodb');
const db = new dynamodb.DocumentClient();

const mascotasTable = process.env.MASCOTAS_TABLE;

exports.listarMascotas = async (event, context, callback) => {

    let params = {
        TableName : mascotasTable,
    };

   
    const response = {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"           
        }
    };

    return response;
}
