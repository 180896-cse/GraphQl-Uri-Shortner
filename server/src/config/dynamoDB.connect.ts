import  AWS  from "aws-sdk";
import path from "path";





// without class format export

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey:  process.env.secretAccessKey,
    region:"us-east-1"
})

const Table:string = "urlDB";
const DynamoDB = new AWS.DynamoDB.DocumentClient();
console.log(`connection with dynamoDB is sucess!!`);

if(!DynamoDB){
    console.log(`error occured at building connection to DynamoDB`);
}

export{Table, DynamoDB};




// interface DBConnn{
//     DynamoDBConn():{};
// }



// export class dbConnnection implements DBConnn{
        
//     public DynamoDBConn() {
//         AWS.config.update({
//             accessKeyId: process.env.accessKeyId,
//             secretAccessKey:  process.env.secretAccessKey,
//             region:"us-east-1"
//         })
        
//         const Table:string = "urlDB";
//         var DynamoDB:AWS.DynamoDB.DocumentClient | undefined;
//         try {
//              DynamoDB = new AWS.DynamoDB.DocumentClient();
//             console.log(`connection with Dynamo DB build Sucessfully!`);
             
//         } catch (error) {
//             console.log(`error handled at dynamoDb Connection building ${error}`);
            
//         }
        
        
//         return {Table,DynamoDB};
//     }


// }

