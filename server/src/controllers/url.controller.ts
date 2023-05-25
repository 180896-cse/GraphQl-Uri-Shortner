import {urlShortnerClass} from "../services/urlShortner.servce"


//making instance of urlShortner class
const urlService = new urlShortnerClass;


interface IurlController{
    typedefsResolver():object;
}


export class urlSchemaResolver implements IurlController{
   public typedefsResolver() {
        const resolvers ={
            Query:{
                isServerUp:()=>{ return `server UP!!`},
                
                getUrl: async (parents:any,args:any,context:any)=>{
                    // const key = context.query.id;
                    // console.log(`key: ${key}`);
                    const resp = await urlService.getOneUrl(args.id);
                    // console.log(`resp: ${resp}`);
                    return resp;
                },

                getUrls: async (parents:any, args:any, context:any)=>{
                       return await urlService.getUrls();
                }
            },

            Mutation:{
                addUrl: async (parents:any, args:any) => {
                   const res = await urlService.addUrl(args.id,args.Link).catch((err)=>console.log(`error occured at addURL function: ${err}`));
                   return res;
                },
                deleteUrl: async (parents:any, args:any) => {
                   return await urlService.deleteUrl(args.id); 
                }
            }
        }
        return resolvers;
    }
}