document.getElementById("first-option").checked = true;

const jsonUrl ="https://api.thecatapi.com/v1/breeds";
const cname = document.getElementById("outputarea")
const catCount = document.getElementById('catCount');
const outputArea = document.getElementById("outputarea");


function getcat(){
    console.log("OutputArea: " + cname);
    let catNum= 0;

    fetch(jsonUrl)
             .then(response => {
                 if (!response.ok) {
                     throw new Error('Something went wrong.');
                 }
                 return response.json();
             })
             
             .then(data => {
                 Object.values(data).forEach(value => {
                     const lineBreak = document.createElement('br');
                     cname.appendChild(document.createTextNode(value.name));
                     cname.appendChild(lineBreak);  
                     catNum ++;   
                     console.log(catNum);
                     catCount.innerHTML = `Total:${catNum}cats.`     
                 });        
             })
             .catch(error => {
                 console.error('Error fetching JSON:', error);
             });
            }  
  

function getHealthIssues(){
    let dataArray = []
    const healthInput = document.getElementById('health-input').value
    fetch(jsonUrl)
        .then(response => {
            if(!response.ok){
                throw new Error('Something went wrong.')
            } return response.json()
        })
        .then( data => {
            data.forEach(catData => {
                if(catData.health_issues == healthInput){
                dataArray.push(catData.name)
            }})    
            cname.innerHTML = dataArray
        })
}

function getWeights() {
    const isMetric = document.getElementById("first-option").checked;

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong.');
            }
            return response.json();
        })
        .then(data => {
            outputArea.innerHTML = ''; 
            data.forEach(cat => {
                const weightRange = isMetric ? cat.weight.metric : cat.weight.imperial;
                const unit = isMetric ? 'kg' : 'lbs';
                outputArea.innerHTML += `${weightRange} ${unit}<br>`;
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
            outputArea.innerHTML = "Error fetching data. Please try again.";
        });
}

function isintelligent() {
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong.');
            }
            return response.json();
        })
        .then(data => {
            outputArea.innerHTML = ''; 
            outputArea.innerHTML += '<strong>I - F </strong><br><br>';
            
            data.forEach(cat => {
                const intelligence = cat.intelligence;
                const childFriendly = cat.child_friendly;
                outputArea.innerHTML += `${intelligence} - ${childFriendly}<br>`;
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
            outputArea.innerHTML = "Error fetching data. Please try again.";
        });
}

function avginteligent() {
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong.');
            }
            return response.json();
        })
        .then(data => {
            let totalIntelligence = 0;
            let catCount = 0;

            data.forEach(cat => {
                if (cat.intelligence) {
                    totalIntelligence += cat.intelligence;
                    catCount++;
                }
            });

            const averageIntelligence = (totalIntelligence / catCount).toFixed(2);

            outputArea.innerHTML = `<strong>Average Intelligence: ${averageIntelligence}</strong><br><br>`;
            outputArea.innerHTML += `Total cats considered: ${catCount}`;
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
            outputArea.innerHTML = "Error fetching data. Please try again.";
        });
}

