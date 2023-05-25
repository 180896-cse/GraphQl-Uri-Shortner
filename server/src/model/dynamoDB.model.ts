// here we define schema for our sevice it contains typesdefs and and what all action that service gone perform

interface IdbModel {
  DynamoDBModel(): any;
}

export class dbModel implements IdbModel {
  public DynamoDBModel() {
    const typedefs = `#graphql

                type Url{
                    id: String!
                    Link: String!
                }


                type Query{
                    isServerUp:String
                    getUrl(id:String!): Url
                    getUrls:[Url]
                    }

                type Mutation{
                    addUrl(id:String!
                        Link:String!):Url

                    deleteUrl(id:String!):Url    
                }
            
            
            `;
    return typedefs;
  }
}
