const fetchedText = document.getElementById("fetched-text");
const textInputArea = document.getElementById("input-area");
const startStopBtn = document.getElementById("start-stop-btn");
const timer = document.getElementById("timer");
const tryAgainBtn = document.getElementById("try-again-btn");

const apiURL = 'https://api.quotable.io/random';
let timerStatus ;
let now ;

function fetchAPIText(){
    return fetch(apiURL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderText(){
    const fetchedData = await fetchAPIText();
    fetchedText.innerText = ""
    
    fetchedData.split('').forEach((charc)=>{
        const charcSpan = document.createElement("span");
        charcSpan.innerText = charc;
        charcSpan.classList.add("charcSpan")
        fetchedText.appendChild(charcSpan)
    })
    textInputArea.value = null

    now = new Date()
    timerStatus = true
}

textInputArea.addEventListener("input", ()=>{
    let charcSpanArray =  document.querySelectorAll(".charcSpan")
    let inputTextArray = textInputArea.value.split('')
    let status = false
    
    

    charcSpanArray.forEach((charcSpan, index)=>{
        const charc = inputTextArray[index]
        if(charc == null){
            charcSpan.classList.remove("correct")
            charcSpan.classList.remove("incorrect")
            status = false
        }else if(charc === charcSpan.innerText){
            charcSpan.classList.add("correct")
            charcSpan.classList.remove("incorrect")
            status = true
        }else{
            charcSpan.classList.remove("correct")
            charcSpan.classList.add("incorrect")
            status = false
        }
    })
    
    
    
    
    if(charcSpanArray.length == inputTextArray.length && status == true){
        timerStatus = false
        // clearInterval(timee)
        
    }

    
    

})


let timee = setInterval(calcTime,1000)
function calcTime(){
    if(timerStatus === true){
        timer.innerText = Math.floor(((new Date()) - now)/1000);
    }
}

startStopBtn.addEventListener("click", renderText)
        
        

    

