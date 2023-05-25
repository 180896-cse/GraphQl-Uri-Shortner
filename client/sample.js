function prducRand(){
const result = Math.random().toString(36).substring(2,7);
console.log(result);
return result;
}
const val = [];
val.length= 1002;
for(let i=0;i<1000;i++){
    if(val.includes(prducRand())){console.log(`err!`); break;}else{
   val[i] = prducRand();}
}
