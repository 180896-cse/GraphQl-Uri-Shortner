import {Table,DynamoDB} from "../config/dynamoDB.connect";

//creating instance of DBConn

interface IurlShortService {
    getOneUrl(key:String):any;
    getUrls():any;
    addUrl(id:String,Link:String):any;
    deleteUrl(id:String):any;
}


export class urlShortnerClass implements IurlShortService {
  // getting sigle url based on id
  async getOneUrl(key: String) {
    const params = {
      TableName: Table,
      Key: {
        id: key,
      },
    };

    const resultUrl = await DynamoDB.get(params).promise();
    return resultUrl.Item;
  }

  // getting allUrls
  async getUrls() {
    const params = {
      TableName: Table,
    };
    const resultUrls = await DynamoDB.scan(params).promise();
    return resultUrls.Items;
  }

  // addUrl Function
  async addUrl(id: String, Link: String) {
    const data = { id, Link };
    const params = {
      TableName: Table,
      Item: data,
      ReturnValue: "ALL_NEW",
    };
    if (await this.getOneUrl(id)) {
      console.log(`user with this id already existed!!`);
    } else {
      await DynamoDB.put(params)
        .promise()
        .catch((err) => {
          console.log(`error handled at adding of URL ${err}`);
        });
      const resp = await this.getOneUrl(id).catch((err) => {
        console.log(`Url not found after creation ${err}`);
      });
      return resp;
    }
  }

  //Delete url function
  async deleteUrl(id: String) {
    const params = {
      TableName: Table,
      Key: {
        id: id,
      },
      ReturnValues: "ALL_OLD",
    };
    let resp: object | undefined | void;
    if (await this.getOneUrl(id)) {
      await DynamoDB.delete(params)
        .promise()
        .catch((err) => console.log(`error ocured at: ${err}`));
      resp = await this.getOneUrl(id).catch((err) => {
        console.log(`Url not found after creation ${err}`);
      });
    } else {
      console.log(`user not present!`);
    }
    return resp;
  }
}