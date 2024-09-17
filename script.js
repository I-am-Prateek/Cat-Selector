document.getElementById("first-option").checked = true;

function getcat(){

    const jsonUrl ="https://api.thecatapi.com/v1/breeds";
    const cname = document.getElementById("outputarea")
    const catCount = document.getElementById('catCount')
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
    const output = "";
    
//  function catHealthIssue(){
//     const jsonUrl ="https://api.thecatapi.com/v1/breeds";
//     const outputArea = document.getElementById("outputArea");
//     const healthIssueLevel = parseInt(document.getElementById("input").value);

//     if (isNaN(healthIssueLevel) || healthIssueLevel < 1 || healthIssueLevel > 5) 
//         {
//             outputArea.innerHTML = "Please enter a valid Health issue level";
//         }
//         return;
//     }
//     fetch(jsonUrl)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Something went wrong.');
//         }
//     return response.json();
//     })
//     .then(data => {
//         outputArea.innerHTML = ''; 
//         let catNum = 0;

//         data.forEach(cat => {
//             if (cat.health_issues === healthIssueLevel) {
//                 outputArea.innerHTML += cat.name + '<br>';
//                 catNum++;
//             }
//         });

//         outputArea.innerHTML += `Cats with health issue level ${healthIssueLevel}: ${catNum}`;
//     })
//     .catch(error => {
//         console.error('Error fetching JSON:', error);
//         outputArea.innerHTML = "Error fetching data. Please try again.";
//     });
