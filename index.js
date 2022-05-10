var slots_available = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3']

const winning_comb = [['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3'], ['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3'], ['A1', 'B2', 'C3'], ['C1', 'B2', 'A3']];

var user_slots = [];
var cpu_slots = [];

const user_symbol = "X"
const cpu_symbol = "O"

var stopGame = false;

$(".game-btn").on("click", function() {
  var userSlot = this.id;
  playerMark(userSlot);
});

function checkWin(slots, who) {

  var winner = false;

  for(var n = 0; n < winning_comb.length; n++){
    var [n1, n2, n3] = winning_comb[n];

    slots.includes(n1) && slots.includes(n2) && slots.includes(n3) && (winner = true);

    if (winner) {
      var message = "";
      var tileColor = "#B4FF9F";
      who === "player" ? message = "🎉You Win!🎉" : message = "😔You lose.😔";
      who === "player" ? tileColor = "#B4FF9F" : tileColor = "#FFA1A1";
      $(".game-btn").unbind();
      $("#" + n1).css("background-color", tileColor);
      $("#" + n2).css("background-color", tileColor);
      $("#" + n3).css("background-color", tileColor);
      setTimeout(function() {
        $("#score").text(message);
        $("#game").hide();
        $(".scoreboard").show();
      }, 1000);
      stopGame = true;
      break;
    }

    if (n + 1 === winning_comb.length) {
      checkDraw(winner);
    }
  }
}

function checkDraw(condicion) {
  if(condicion === false) {
    if(slots_available.length === 0){
      setTimeout(function() {
        $("#score").text("🤝It's a draw.🤝");
        $("#game").hide();
        $(".scoreboard").show();
      }, 1000);
    }
  }
}

function chooseSlot() {
  const chosenSlot = slots_available[Math.floor(Math.random() * slots_available.length)];
  const slotToRemove = slots_available.indexOf(chosenSlot);
  slots_available.splice(slotToRemove, 1);
  return chosenSlot;
}

function cpuMark() {
  const slot = chooseSlot();
  const tile = $("#" + slot);
  cpu_slots.push(slot);
  tile.text("O");
  tile.attr("disabled", true);
  checkWin(cpu_slots, "cpu");
}

function playerMark(userSlot) {
  const tile = $("#" + userSlot);
  tile.text("X");
  tile.attr("disabled", true);
  const slotIndex = slots_available.indexOf(userSlot);
  slots_available.splice(slotIndex, 1);
  user_slots.push(userSlot);
  checkWin(user_slots, "player");
  if (stopGame === false){
    cpuMark();
  }
}
