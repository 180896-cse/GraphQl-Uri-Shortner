let getCurntURL = document.location.href;

let usrUrl =  document.getElementById("usrUrlInput");
let sbmtBtn = document.getElementById("sbmtBtn");
let finalUrl = document.getElementById("finalUrl");
let srvrStsChkBtn = document.getElementById("serverChkBtn");
let srvrUpRespBox = document.getElementById("isServerUpMsg");


//helper Function

// function to crate random id every time
function prducRand(){
  const result = Math.random().toString(36).substring(2,7);
  return result;
}


// getting query from url which is "ID" in our case
function getQuryFrmCurrUrl() {
  let resUrlQuery = document.location.search;
  const urlParams = new URLSearchParams(resUrlQuery);
  resID = urlParams.get("id");
  return resID;
}






async function isServerUp() {
  const response = await fetch("http://localhost:3004/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: "{isServerUp}" }),
  });
  const resp = await response.json();
  // console.log(resp.data.isServerUp);
  return resp;
}

srvrStsChkBtn.addEventListener("click", async () => {
  const resp =  await isServerUp();
  srvrUpRespBox.value = resp.data.isServerUp;
});




// function for adding usrl to DB Backend
async function addURL() {
  const response = await fetch("http://localhost:3004/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify( {query:`mutation {addUrl(id:"${prducRand()}",Link:"${url.value}"){id}}`}),
  });
  const resp = await response.json();
  return resp;
}

sbmtBtn.addEventListener("click", async () => {
  let val = usrUrl.value.trim();
  if((val!=null) && (val!="")){
  const resp =  await addURL();
  finalUrl.value = getCurntURL+`?id=${resp.data.addUrl.id}`;
 
   return resp;
  }else{alert("Please Enter URL")}
});




// Function for getting shortend URL
async function getSrtURL(){
 const response = await fetch("http://localhost:3004/",{
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify( {query:`query {getUrl(id:"${getQuryFrmCurrUrl()}"){Link}}`}),
 });
 const resp = await response.json();
return resp.data.getUrl.Link;
}



async function checkQuryID(){
  if(getQuryFrmCurrUrl()){document.location = await getSrtURL();}
}


function outrFunc(){
  let Avar = 0;
  function innFunc(){
      console.log(++Avar);
  }
  return innFunc();
}
function clntFunc(param1){
  param1;
}
clntFunc(outrFunc());