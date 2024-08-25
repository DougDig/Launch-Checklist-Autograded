// Write your helper functions here!

require('cross-fetch/polyfill');


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
    document.getElementById("pilotStatus").innerHTML = `Pilot ${inputPilotName} is ready for launch`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${inputCopilotName} is ready for launch`;
    document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
    document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";

    if ((inputFuelLevel) < 10000) {
        ready = 0;
        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
    };
    if ((inputCargoMass) > 10000) {
        ready = 0;
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
    };
    
    if (ready === 0){
        document.getElementById("faultyItems").style = "visibility: visible";
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style = "color : red";
    }else {
        document.getElementById("faultyItems").style = "visibility: visible";
        document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
        document.getElementById("launchStatus").style = "color : green";
        document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
        document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
    };
 }

async function myFetch() {return (await fetch("https://handlers.education.launchcode.org/static/planets.json")).json()}
 
function pickPlanet(planets) {
    return (planets[Math.round(Math.random() * 6)]);
 }

 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;