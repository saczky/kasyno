var chamber = 6;
let available_multipliers = [1.1, 1.3, 1.7, 3, 5];
var win = false
var gun_wrapper = document.getElementById("gun-wrapper");
var game_wrapper = document.getElementById("game-wrapper");
var bang = document.getElementById('bang');
var bet_input = document.getElementById('bet');
var multiplier = document.getElementById('curr-multiplier');
var curr_win = document.getElementById('curr-win');
var error = document.getElementById('error');
var dividers = document.getElementsByClassName('divider');
var multiplier_div = document.getElementById('multiplier-div');
var hidden = document.getElementById('hidden_input')
var lost = false;

function reset(){
  chamber=6
  multiplier.innerText='1x'
  curr_win.innerText=`${bet_input.value}`
  multiplier_div.style.animation = ''
  lost = false
  win = false
  bet_input.readOnly = false;
  bang.style.display='none';
  game_wrapper.style.background='#4e6b20';
  for (div of dividers){
    div.style.background='#4e6b20'
  }
}

document.getElementById("game-wrapper").onclick = function(){
  console.log(chamber)
  if (lost){
    return false;
  }
  if (win){
    return false;
  }
  if (Number(bet.value) == 0){
    error.innerText = 'Ustaw zakład'
    error.style.display='block';
    return false;
  } else {
    error.style.display='none';
  }
  if (!bet_input.disabled){
    bet_input.readOnly = true;
  }

  if ((chamber == 0) || (Math.random()*100<(100/chamber))) {
    chamber = 6;
    // document.head.style.display='block';
    game_wrapper.style.background='darkred';
    bang.style.display='block';
    lost = true
    for (div of dividers){
      div.style.background='darkred'
    }
  } else {
    bang.style.display='none';
    game_wrapper.style.background='#4e6b20';
    for (div of dividers){
      div.style.background='#4e6b20'
    }
  }
  gun_wrapper.style.cssText='-webkit-transform:rotate('+chamber*60+'deg);-moz-transform:rotate('+chamber*60+'deg);transform:rotate('+chamber*60+'deg)';
  chamber--;

  if (6-chamber == 0){
    multiplier_div.style.animation = ''
  } else if (6-chamber > 0 && 6-chamber-1 <=1){
    multiplier_div.style.animation = 'multiplier1 ease 1s infinite'
  } else if (6-chamber <=3) {
    multiplier_div.style.animation = 'multiplier2 ease 1s infinite'
  } else {
    multiplier_div.style.animation = 'multiplier3 ease 1s infinite'
  }

  if (lost){
    multiplier.innerText='LOSS'
    curr_win.innerText='0$'
    multiplier_div.style.animation = ''
    hidden.value = -1
  } else {
    var curr_multi = available_multipliers[6-chamber-1]
    multiplier.innerText=`${curr_multi}x`
    curr_win.innerText=`${(Number(bet.value) * curr_multi).toFixed(2)}$`
    hidden.value = curr_multi
  }

  if (chamber == 1){
    var curr_multi = available_multipliers[6-chamber-1]
    multiplier.innerText=`WIN`
    curr_win.innerText=`${(Number(bet.value) * curr_multi).toFixed(2)}$`
    win = true
    hidden.value = curr_multi
  }
}

function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57)))
    return false;
  return true;
}

function changeWinnings(){
  var winnings = document.getElementById('winnings');
  var bet = document.getElementById('bet').value;
  // if (bet != ''){
  //   bet = 0
  // }

  console.log(bet)
  bet = Number(bet)
  console.log(bet)

  var one = bet * 1.1
  var two = bet * 1.3
  var three = bet * 1.7
  var four = bet * 3
  var five = bet * 5
  
  winnings.innerText = `1 strzał -- 1.1x: ${one.toFixed(2)}$ \n 2 strzał -- 1.3x: ${two.toFixed(2)}$ \n 3 strzał -- 1.7x: ${three.toFixed(2)}$ \n 4 strzał -- 3x: ${four.toFixed(2)}$ \n 5 strzał -- 5x: ${five.toFixed(2)}$`;
}

function payout(){

}

