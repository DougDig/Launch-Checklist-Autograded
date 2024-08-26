// Write your JavaScript code here!

// const { pickPlanet, myFetch, validateInput, addDestinationInfo, formSubmission } = require("./scriptHelper");

// require statement seems to break event listeners for some reason, below statement to be commented in for demonstration
// const myFetch = require("./scriptHelper")

window.addEventListener("load", function() {
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        //sucessful submission behaviour not fully defined, comment out below line to change to submit on success
        event.preventDefault();
        formReset();
        
        const inputPilotName = (document.querySelector("input[name=pilotName]")).value;
        const inputCopilotName = (document.querySelector("input[name=copilotName]")).value;
        const inputFuelLevel = Number((document.querySelector("input[name=fuelLevel]")).value);
        const inputCargoMass = Number((document.querySelector("input[name=cargoMass]")).value);
        
        if (!(validateInput(inputPilotName) === "Not a Number" &&
            validateInput(inputCopilotName) === "Not a Number" &&
            validateInput(inputFuelLevel) === "Is a Number" &&
            validateInput(inputCargoMass) === "Is a Number")) {           
            window.alert("Invalid Input, Use Names and Numbers");
            event.preventDefault();
            return;  
        };

    formSubmission(document, "", inputPilotName, inputCopilotName, inputFuelLevel, inputCargoMass);
    
    return;
    });
});

//formatting functions
function notReadyForLaunch(){
    document.getElementById("faultyItems").style = "visibility: visible";
    document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
    document.getElementById("launchStatus").style = "color : red";
};

function readyForLaunch(){
    document.getElementById("faultyItems").style = "visibility: visible";
    document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
    document.getElementById("launchStatus").style = "color : green";
    document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
    document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
};

function formReset(){
    readyForLaunch();
    document.getElementById("launchStatus").style = "color : black";
    document.getElementById("faultyItems").style = "visibility: hidden";
    document.getElementById("launchStatus").innerHTML = "Awaiting Information Before Launch";
    document.getElementById("pilotStatus").innerHTML = "Pilot Ready";
    document.getElementById("copilotStatus").innerHTML = "Co-pilot Ready";
};
//fetch code

let listedPlanets;
let listedPlanetsResponse = myFetch();
listedPlanetsResponse.then(function (result) {
    listedPlanets = result.json();
    listedPlanets.then(function (json) {
        const targetPlanet = pickPlanet(json);
        addDestinationInfo(document,targetPlanet.name, targetPlanet.diameter, targetPlanet.star, targetPlanet.distance, targetPlanet.moons, targetPlanet.image);
    })    
    });

//Script Helper begins

function validateInput(testInput) {
    if (testInput == false || testInput === undefined){
        return "Empty";
    } else if ((isNaN(testInput) === false)){
        return "Is a Number";
    } else if (typeof(testInput) === "string"){
        return "Not a Number";
    } else {
        return "Not a Number or String";
    };
};

 function formSubmission(document, list, inputPilotName, inputCopilotName, inputFuelLevel, inputCargoMass) {
    let ready = 1;
    document.getElementById("pilotStatus").innerHTML = "Pilot " + inputPilotName + " is ready for launch";
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${inputCopilotName} is ready for launch`;

    if ((inputFuelLevel) < 10000) {
        ready = 0;
        document.getElementById("fuelStatus").innerHTML = "Insufficient Fuel";
    };
    if ((inputCargoMass) > 10000) {
        ready = 0;
        document.getElementById("cargoStatus").innerHTML = "Too Heavy to Launch";
    };
    
    if (ready === 0){notReadyForLaunch()}else{readyForLaunch()};
 }

 //comment out this line for demonstration of problem
 async function myFetch() {return await fetch("https://handlers.education.launchcode.org/static/planets.json")}

 function pickPlanet(planets) {
    return (planets[(Math.round(Math.random() * (planets.length -1)))]);
 }

 function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementById("missionTarget").innerHTML = (
                 `<h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">`
            );
                 return;
 }
