const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
  for(let currCode in countryList){
     let newOption = document.createElement("option");
     newOption.innerText = currCode;
     newOption.value = currCode;
     select.append(newOption);
     if(select.name==="from" & currCode==="USD"){
         newOption.selected="selected"}
         else if(select.name==="to" & currCode==="INR"){
             newOption.selected="selected";
     }
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  })
}

 const updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
 }

 let exchangeRate = async () => {
  let amount=document.querySelector(".amount input")
  let amtVal=amount.value;
  if(amtVal==="" || amtVal<1){
    amtVal=1;
    amount.value="1";
  }
  // console.log(amtVal);
  let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response= await fetch(URL);
  let data= await response.json();
  let result=data[toCurr.value.toLowerCase()];
  
  let finalAmount= result* amtVal;
  // console.log(result*amtVal);
  msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchangeRate();
})

window.addEventListener("load",() =>{
  exchangeRate();
})
