// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
    
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name:${name} </li>
                     <li>Diameter:${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons:${moons} </li>
                 </ol>
                 <img src="${imageUrl}">
    `
 }
 
 function validateInput(testInput) {
    if (testInput === "" || testInput === null) {
        return `Empty`
    } else if ((!isNaN(Number(testInput)))) {
        return `Is a Number`
    } else {
        return `Not a Number`
    }
    
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');

    let isAlertShown = false;

    //check all fields are filled
    if (validateInput(pilot) === `Empty`|| validateInput(copilot) === `Empty`|| 
    validateInput(fuelLevel) === `Empty`||validateInput(cargoLevel) === `Empty`) {
        isAlertShown = true;
        alert(`All fields are required`);
    } //check that fuelLevel and cargoLevel are numbers and pilot and co-pilot are strings
    else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        isAlertShown = true;
        alert(`Please enter numerical values for Fuel Level and Cargo Mass`);
    } else if (validateInput(pilot)===`Is a Number`||validateInput(copilot)===`Is a Number`) {
        isAlertShown = true;
        alert('Please do not enter numbers for name of pilot or co-pilot');
    }  else {   
        //update pilot/copilot status
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = 'hidden';
    }


     //check fuel levels and update faulty items
     if(!isAlertShown){

        if (Number(cargoLevel) <= 10000 && Number(fuelLevel) >= 10000) {
            list.style.visibility = 'visible';
            launchStatus.style.color = 'green';
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            launchStatus.innerHTML = 'Shuttle is Ready for Launch';
            
    
        }else if (Number(cargoLevel) > 10000 &&  Number(fuelLevel) >= 10000) {
            cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            list.style.visibility = 'visible';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
    
        }else if(Number(fuelLevel) < 10000 && Number(cargoLevel) > 10000){
            fuelStatus.innerHTML = 'Fuel level too low for launch';
            cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
            list.style.visibility = 'visible';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
    
        } else if (Number(fuelLevel) < 10000 && Number(cargoLevel) < 10000) {
            fuelStatus.innerHTML = 'Fuel level too low for launch';
            list.style.visibility = 'visible';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            launchStatus.style.color = 'red';
    
        }
     }
     
}
    
 
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
         });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let id = Math.floor(Math.random() * planets.length);
    return planets[id];

 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;