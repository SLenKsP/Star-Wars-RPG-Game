var attackerScore = 0;
var defenderScore = 0;
var damageToDefender = 0;
var damageToAttacker = 0;
var updatedAttackScore = 0;
var attackerStatus;
var defenderStatus;
var remainingEmenies = 2;
var damageIncrement = 0;
var gameObj = {
  characters: [
    {
      name: "Obi Wan Kenobi",
      imgSrc: "assets/images/obi_wan_kenobi.png",
      initScore: 110,
      attackPower: 8,
      counterAttack: 10
    },
    {
      name: "Luke Skywalker",
      imgSrc: "assets/images/luke_skywalker.png",
      initScore: 100,
      attackPower: 6,
      counterAttack: 15
    },
    {
      name: "Darth Sidious",
      imgSrc: "assets/images/darth_sidious.png",
      initScore: 150,
      attackPower: 12,
      counterAttack: 25
    },
    {
      name: "Darth Maul",
      imgSrc: "assets/images/darth_maul.png",
      initScore: 120,
      attackPower: 10,
      counterAttack: 20
    }
  ],
  setChar: function() {
    for (var i = 0; i < this.characters.length; i++) {
      console.log(this.characters[i].name);
      var charSection = $("<div class='imageBox border'></div>");
      var name = $("<p>" + this.characters[i].name + "</p>");
      var img = $("<img class = 'charImg'>");
      img.attr("src", this.characters[i].imgSrc);
      var score = $("<p>" + this.characters[i].initScore + "</p>");
      $("#mainCharSection")
        .hide()
        .fadeIn(1000)
        .append(charSection)
        .hide()
        .fadeIn(2000);
      charSection.append(name);
      charSection.append(img);
      charSection.append(score);
    }
  },
  selectAttacker: function() {
    $("#mainCharSection .imageBox").one("click", function(e) {
      e.preventDefault();
      $(this).appendTo("#myCharacterSection");
      $(this)
        .removeClass("imageBox bg-light")
        .addClass("border-success selectedImageBox bg-primary text-light");
      gameObj.attackerPower();
      $(".imageBox").each(function(e) {
        $(this).off("click");
        $(this).appendTo("#enemiesSection");
        $(this).addClass("border-danger");
        $(this)
          .removeClass("imageBox bg-light")
          .addClass("border-danger movedImageBox bg-danger text-light");
      });
      gameObj.selectDefender();
    });
  },
  selectDefender: function() {
    $(".movedImageBox").on("click", function(e) {
      $(".movedImageBox")
        .not(this)
        .each(function() {});
      if ($("#defenderSection > div").length === 0) {
        $(this).appendTo("#defenderSection");
        gameObj.counterAttackPower();
        $(this)
          .removeClass("bg-light")
          .addClass("selectedDefender bg-dark text-light");
        console.log("remaining enemies count: " + remainingEmenies);
      }
      $("#attackBtn").prop("enabled", true);
    });
  },
  attackerPower: function() {
    var attackerName = $("#myCharacterSection div p:first-child").text();
    for (var j = 0; j < gameObj.characters.length; j++) {
      if (attackerName === gameObj.characters[j].name) {
        console.log(attackerName);
        console.log(gameObj.characters[j].attackPower);
        return parseInt(gameObj.characters[j].attackPower);
      }
    }
  },
  attackerName: function() {
    return $("#myCharacterSection div p:first-child").text();
  },
  defenderName: function() {
    return $("#defenderSection .movedImageBox p:first-child").text();
  },

  attackerScore: function() {
    return parseInt($("#myCharacterSection div p:last-child").text());
  },
  defenderScore: function() {
    return parseInt($("#defenderSection .movedImageBox p:last-child").text());
  },
  counterAttackPower: function() {
    var defenderName = $(
      "#defenderSection .movedImageBox p:first-child"
    ).text();
    for (var j = 0; j < gameObj.characters.length; j++) {
      if (defenderName === gameObj.characters[j].name) {
        console.log(defenderName);
        console.log(gameObj.characters[j].counterAttack);
        console.log("attacker Score:" + gameObj.attackerScore());
        console.log("defender Score:" + gameObj.defenderScore());
        return parseInt(gameObj.characters[j].counterAttack);
      }
    }
  },
  attack: function() {
    $("#attackBtn").on("click", function() {
      if ($("#defenderSection > div").length === 0) {
        alert("select defender first");
      } else {
        damageToDefender = parseInt(gameObj.attackerPower());
        damageIncrement += damageToDefender;
        console.log("damage increment: " + damageIncrement);
        damageToAttacker = gameObj.counterAttackPower();
        attackerScore = gameObj.attackerScore() - damageToAttacker;
        defenderScore = gameObj.defenderScore() - damageIncrement;
        attackerStatus = `You attacked ${gameObj.defenderName()} for ${damageIncrement} damage`;
        defenderStatus = `${gameObj.defenderName()} attacked you back for ${damageToAttacker} damage`;
        console.log("updated attacker score" + attackerScore);
        $("#myCharacterSection div p:last-child").text("");
        $("#defenderSection .movedImageBox p:last-child").text("");
        $("#attackStatus").text(attackerStatus);
        $("#defendStatus").text(defenderStatus);
        $("#myCharacterSection div p:last-child").text(attackerScore);
        $("#defenderSection .movedImageBox p:last-child").text(defenderScore);
        if (attackerScore > 0 && defenderScore <= 0) {
          $("#defenderSection .movedImageBox").remove();
          $("#winLossStatus").text("select another enemy");
          if (remainingEmenies === 0) {
            $("#winLossStatus").text("You won");
            $("#attackBtn").hide();
            $("#restart").show();
          } else {
            gameObj.selectDefender();
          }
          remainingEmenies--;
        } else if (attackerScore <= 0 && defenderScore > 0) {
          $("#winLossStatus").text("you lose");
          $("#restart").show();
          $("#attackBtn").hide();
        }
      }
    });
  },
  removeDefender: function() {
    $("#defenderSection").on("click", function() {
      $("#defenderSection .movedImageBox").remove();
    });
  },

  clickRestart: function() {
    $("#restart").on("click", function() {
      location.reload();
    });
  },
  gameInit: function() {
    this.setChar();
    $("#restart").hide();
    $(".imageBox").addClass("bg-light");
    this.selectAttacker();
    this.attack();
    this.clickRestart();
  }
};

// initiate the Game
$(document).ready(function() {
  gameObj.gameInit();
});
