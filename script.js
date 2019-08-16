let suits=["heart","club","spade","diamond"];
let values=["ace","two","three","four","five","six","seven","eight",
            "nine","ten","queen","king","jack"];

//DOM Variables            
let p=document.getElementById("para");
let newgame=document.getElementById('new-game'); 
let h=document.getElementById('hit');
let s=document.getElementById('stay');


//GAME VARIABLES
let startedgame=false,
    gameover=false,
    playerwon=false,
    dealercard=[],
    playercard=[],
    dealerscore=0,
    playerscore=0,
    deck=[];

h.style.display="none";
s.style.display="none";

newgame.addEventListener('click',function(){
  startedgame=true;
  gameover=false;
  playerwon=false;
  deck=createdeck();
  shuffledeck(deck);
  dealercard=[getnextcard(),getnextcard()];
  playercard=[getnextcard(),getnextcard()];
  p.innerText="started..";
  h.style.display="inline";
  s.style.display="inline";
  newgame.style.display="none";
  showstatus();
});


h.addEventListener('click',function()
{
  playercard.push(getnextcard());
  checkforendofgame();
  showstatus();
}
);

s.addEventListener('click',function(){
  gameover=true;
  checkforendofgame();
  showstatus();
  
});

function checkforendofgame()
{
    updatescore();
    if(gameover)
    {
      while(playerscore>dealerscore
        && playerscore<=21
        && dealerscore<=21)
        {
          dealercard.push(getnextcard());
          updatescore();
        }
    }
        if(playerscore>21)
        {
          playerwon=false;
          gameover=true;
        }
       else if(dealerscore>21)
        {
          playerwon=true;
          gameover=true;
        }
        else
        {
          if(playerscore>dealerscore)
          playerwon=true;
          else
          playerwon=false;
        }
    }
    
    
  




function getnumericvalue(d)
{
  switch(d)
  {
    case "ace":
    return 1;
   
    case "two":
    return 2;
  
    case "three":
    return 3;

    case "four":
    return 4;

    case "five":
    return 5;
   
    case "six":
    return 6;
   
    case "seven":
    return 7;
  
    case "eight":
    return 8;
   
    case "nine":
    return 9;
 
    default:
    return 10;
    
    
  }
}
function getnextcard()
{
  return deck.shift();
}


function createdeck()
{
  let deck=[];
  for(let i=0;i<suits.length;i++)
  {
    for(let j=0;j<values.length;j++)
    {
      //deck.push(suits[i]+"of"+values[j]);
      let card={
        suit:suits[i],
        value:values[j]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffledeck(deck)
{
  for(let i=0;i<deck.length;i++)
  {
    let swap=Math.trunc(Math.random()*deck.length);
    let temp=deck[swap];
    deck[swap]=deck[i];
    deck[i]=temp;
  }
}
function updatescore()
{
   playerscore=getscore(playercard);
    dealerscore=getscore(dealercard);
 
}

function getscore(card)
{
  let sc=0;
  let ace=false;
  for(let i=0;i<card.length;i++)
  { 
    
    sc=sc+getnumericvalue(card[i].value);
    if(card[i].value=="ace")
    ace=true;
  }
  if(ace===true&& sc+10<=21)
   sc=sc+10;
  return sc;
}

function getcardstring(card)
{
  return card.value+" of "+card.suit;
}

function showstatus()
{
  if(!startedgame)
  {
    p.innerText('Welcome to blackjack!');
    return;
  }
  
 let dealer="Dealer has "+'\n';
 for(let i=0;i< dealercard.length;i++)
 {
   dealer=dealer+getcardstring(dealercard[i])+'\n';
   
 }
 
 let player="Player has "+'\n';
 for(let j=0;j<playercard.length;j++)
 {
  player=player+getcardstring(playercard[j])+'\n';
 
 }
 
 updatescore();

 
 p.innerText=dealer+"(score:"+dealerscore+")"+'\n'+'\n'+player+ "(score:"+playerscore+")";
 
 if(gameover)
 {
   if(playerwon)
   {
     p.innerText+="YOU WON";
   }
   else
   {
     p.innerText+="DEALER WON";
   }
   newgame.style.display='inline';
   h.style.display='none';
   s.style.display='none';
 }
  
  
}

//let deck=createarray();
//console.log(deck.length);
//let w=0;
//while(w!=5)
//{
//  w++;
//  let nn=Math.random()*51;
//  nn=Math.trunc(nn);
//  console.log(printval(deck[nn]));
//}

