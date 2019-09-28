/*var list = $("#mainCharSection").find(".imageBox");
console.log(list.length);

$(document).ready(function() {
    $("#restart").hide();
    $(".imageBox").addClass("bg-light");
  $("#mainCharSection .imageBox").click(function() {
    $(".imageBox")
      .not(this)
      .each(function() {
        $(this).appendTo("#enemiesSection");
        $(this).addClass("border-danger");
        $(this)
          .removeClass(".imageClass")
          .addClass("movedImageBox");
      });
    $(this).appendTo("#myCharacterSection");
    $(this).addClass("border-success");
    $(this).removeClass(".imageClass");
  });
  $("#enemiesSection .movedImageBox").click(function(e) {
    e.preventDefault();
    $(".movedImageBox")
      .not(this)
      .each(function() {});
    $(this).appendTo("#defenderSection");
  });
});*/
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
        .removeClass("imageBox")
        .addClass("border-success selectedImageBox");
      $(".imageBox").each(function(e) {
        $(this).off("click");
        $(this).appendTo("#enemiesSection");
        $(this).addClass("border-danger");
        $(this)
          .removeClass("imageBox")
          .addClass("border-danger movedImageBox");
        // gameObj.selectDefender();
        // gameObj.removeDefender();
        // $(this).noop();
        // // e.preventDefault();
      });
      gameObj.selectDefender();
      // $(this).off("click");
    });
  },
  selectDefender: function() {
    // $(".movedImageBox").on("click");

    $(".movedImageBox").on("click", function(e) {
      // e.stopPropagation();
      $(".movedImageBox")
        .not(this)
        .each(function() {
          // $(this).noop();
        });
      if ($("#defenderSection > div").length === 0) {
        $(this).appendTo("#defenderSection");
      }
      // ;
      // $(this).remove();
      // $(this).appendTo("#defenderSection");
    });
    return;
  },
  removeDefender: function() {
    $("#defenderSection").on("click", function() {
      $("#defenderSection .movedImageBox").remove();
    });
  },
  gameInit: function() {
    this.setChar();
    $("#restart").hide();
    $(".imageBox").addClass("bg-light");
    this.selectAttacker();
    this.removeDefender();
    // this.selectDefender();
  }
};

// initiate the Game
$(document).ready(function() {
  gameObj.gameInit();
});
