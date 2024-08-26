// const accountId = 12;
// let accountName = "Suha"
// var accountCity = "Karachi"

// console.table([accountId, accountName, accountCity])

// let createddate= new Date(2023,1,23)
// console.log(createddate.toDateString());
// createddate.toLocaleString('default' , {
//     weekday:"long"
// })

// for (let i=0;i<=100;i++){
//     if(i%2===0){
//         console.log(i);
//     }
// }
// let str="012345678";
// str.slice(1,5);     //output 1234
//str.slice(3);     //output 345678

// slice main end ki term inclusive nhi hoti
//splice (startindex,deletedindex,newElement)

// DOM Manipulation

// const newBtn=document.createElement("button");
// newBtn.innerText="Click Me!";

// newBtn.style.backgroundColor="white";
// newBtn.style.color="red";

// newBtn.addEventListener('click',nextButton)

// function nextButton(){
//     alert("button clicked");
// }

// document.querySelector("body").prepend(newBtn)
// let para = document.querySelector("p")
// para.classList.add("newClass")

// class myClass {
//     constructor(parameters) {

//     }

// }

// function getData(dataId){
//     setTimeout(() => {
//         console.log("Data",dataId);
//     }, 4000);
// }

// //synchronous
// function greet(name, callback) {
//     console.log('Hello ' + name);
//     callback();
// }

// function sayGoodbye() {
//     console.log('Goodbye!');
// }

// greet('John', sayGoodbye);

// //asynchronous

// function fetchData(callback) {
//     setTimeout(() => {
//         console.log('Data fetched');
//         callback();
//     }, 2000);
// }

// fetchData(() => {
//     console.log('Callback executed after data fetch');
// });

//example from gpt
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetched data");
      resolve("Data");
    }, 1000);
  });
}

function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Processed data");
      resolve(`Processed ${data}`);
    }, 1000);
  });
}

function displayData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Displaying: ${data}`);
      resolve("Done");
    }, 1000);
  });
}

// Chaining Promises
fetchData()
  .then((data) => {
    return processData(data);
  })
  .then((processedData) => {
    return displayData(processedData);
  })
  .then((result) => {
    console.log(result); // "Done"
  })
  .catch((error) => {
    console.error("Error:", error);
  });
