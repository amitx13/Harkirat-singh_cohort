function logData(data){
    console.log(data)
}

function callBackResult(data){
    data.json().then(logData);
}

const sendObj = {
    method: "GET"
}

fetch("http://localhost:3000/handleSum?counter=3",sendObj).then(callBackResult) // By - default method is GET