const RANDOM_QUOTE_API_URL="http://api.quotable.io/random"

const quoteDisplayElement=document.getElementById('quoteDisplay')
const quoteInputElement=document.getElementById('quoteInput')

const timerElement=document.getElementById('timer')
const wps=document.getElementById('wpm')
quoteInputElement.addEventListener('input',()=>{
    const arrayQuate=quoteDisplayElement.querySelectorAll('span')
    const arrayValue=quoteInputElement.value.split('')

    let correct=true;
    let totalcharacter=0;
    arrayQuate.forEach((characterSpan,index)=>{
        const character=arrayValue[index]
        totalcharacter++;
        if(character==null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct=false
        }
       else if(character=== characterSpan.innerText)
        {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
    
        }else{
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct=false
        }
    })
    if(correct){
       const timer=timerElement.innerText
       alert(Math.floor(((totalcharacter/5)/(timer/60))))
      
          
            getNextQuote()
            //wps=(total character/5)/min
    
      
    }

  
    console.log('changed')
})
function getRandomQuote(){
   return fetch(RANDOM_QUOTE_API_URL)
    .then(response=>response.json())
    .then(data=>data.content)
}

async function getNextQuote(){
    const quote=await getRandomQuote();
    quoteDisplayElement.innerHTML='';

    quote.split('').forEach(character => {
        const characterSpan=document.createElement('span')
   
       // characterSpan.classList.add('correct')
        characterSpan.innerText=character   
    quoteDisplayElement.appendChild(characterSpan)     
    });

    quoteInputElement.value=null
    startTimer()
    console.log(quote)
}
let startTime
function startTimer(){
    timerElement.innerText=0
    startTime=new Date()
    setInterval(()=>{
       timerElement.innerText= getTimerTime()
    },1000)
}
function getTimerTime(){
    return Math.floor((new Date()-startTime)/1000)
}
getNextQuote();
