let curntURL = document.location.href;
let srvrChKBtn = document.getElementById("serverChkBtn");
let srvrUpRespBox = document.getElementById("ServerUpMsg");
let sbmtBtn = document.getElementById("sbmt");
let urlID = document.getElementById("urlID");
let url =  document.getElementById("urlBox");
let resShrtUrl = document.getElementById("shortUrl");
// let srtURL = document.getElementById("shrtURL");
// let actualUrl = document.getElementById("actualUrl");




// getting query from url which is "ID" in our case
function getQueryVal() {
  let resUrlQuery = document.location.search;
  const urlParams = new URLSearchParams(resUrlQuery);
  resID = urlParams.get("id");
  return resID;
}



async function loadisServerUp() {
  const response = await fetch("http://localhost:3004/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: "{isServerUp}" }),
  });
  const resp = await response.json();
  console.log(resp.data.isServerUp);
  return resp;
}

srvrChKBtn.addEventListener("click", async () => {
  const resp =  await loadisServerUp();
  srvrUpRespBox.value = resp.data.isServerUp;
});





async function loadaddURL() {
  const response = await fetch("http://localhost:3004/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify( {query:`mutation {addUrl(id:"${urlID.value}",Link:"${url.value}"){id}}`}),
  });
  const resp = await response.json();
  return resp;
}

sbmtBtn.addEventListener("click", async () => {
  const resp =  await loadaddURL();
  resShrtUrl.value = curntURL+`?id=${resp.data.addUrl.id}`;
 
   return resp;
});





async function getSrtURL(){
 const response = await fetch("http://localhost:3004/",{
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify( {query:`query {getUrl(id:"${getQueryVal()}"){Link}}`}),
 });
 const resp = await response.json();
return resp.data.getUrl.Link;
}

// srtURL.addEventListener("click", async () => {
//   const resp =  await getSrtURL();
//   actualUrl.value = resp;
// });




async function checkQuryID(){

  if(getQueryVal()){document.location = await getSrtURL();}

}


