let firstName="Parth";
let lastName="Chauhan";
// let name ="Full Name: "+firstName+" "+lastName;
// let name =  `Full Name: ${firstName} ${lastName}`;
// console.log(name);
let city="Mumbai"
let form =document.querySelector("form");
form.addEventListener("submit",function(e){
    e.preventDefault();
    let input=document.querySelector(".searchField");
    city=input.value;
    console.log(city);
    fetchData(city);
})

async function fetchData(){
    try {
        let url=`https://api.weatherapi.com/v1/current.json?key=848a5b7887e94207871120946231006&q=${city}&aqi=no`;
        let response= await fetch(url);
        // console.log(response);
        let data=await response.json();
        let timeStamp=data.location.localtime;
        // console.log(data);
        let currentTemp=data.current.temp_c;
        let currentCondn=data.current.condition.text;
        let locationName=data.location.name;
        let conditionEmoji=data.current.condition.icon;
        // console.log(locationName,timeStamp,currentTemp,currentCondn,conditionEmoji);
        updateDOM(timeStamp,locationName,currentTemp,currentCondn,conditionEmoji);
    } 
    catch (error) {
        alert("Please put a valid Location");
        console.log(error);
    }
    }   
    
fetchData();
let place= document.querySelector(".time_location p");
let time =document.querySelector(".time_location span");
let temp=document.querySelector(".temp");
let currCondn=document.querySelector(".weather_condition span");
let emoji=document.querySelector(".weather_condition img");

function updateDOM(timeStamp,locationName,currentTemp,currentCondn,conditionEmoji) {
    temp.innerText=currentTemp;
    place.innerText=locationName;
    currCondn.innerText=currentCondn;
    emoji.src=conditionEmoji;
    console.log(timeStamp.split(" "));
    let exactDate=timeStamp.split(" ")[0];
    let exactTime=timeStamp.split(" ")[1];
    let countOfDay= new Date(exactDate).getDay();
    let nameOfDay=getNameOfDay(countOfDay);
    console.log(getNameOfDay(countOfDay));
    console.log(exactDate);
    time.innerText=`${exactTime} ${nameOfDay} ${exactDate}`;
}
let dayObject={
    0:"Sunday",
    1:"Monday",
    2:"Tuesday",
    3:"Wednesday",
    4:"Thursday",
    5:"Friday",
    6:"Saturday"

}

function getNameOfDay(num){
    // return dayObject[num];
    switch(num){
        case 0:return "Sunday";
        case 1:return "Monday";
        case 2:return "Tuesday";
        case 3:return "Wednesday";
        case 4:return "Thursday";
        case 5:return "Friday";
        case 6:return "Saturday";
        default: "Don't know";
    }
}