# Star-Wars-RPG-Game

    - This game that allows user to pick their Attacker and Enemies and they can fight with each other until All enemies die or Attacker dies

### Technologies Used

- HTML 5
- CSS
- Javascript
- Jquery
- Bootstrap

### Problem

- One click that allows 2 actions (like clicking character moves to Attacker section and rest moves to  enimies)

    ```
    // solution code
        selectAttacker: function() {
            $("#mainCharSection .imageBox")
        .one("click", function(e) {
      e.preventDefault();
      $(this).appendTo("#myCharacterSection");
      $(this)
        .removeClass("imageBox bg-light")
        .addClass("border-success selectedImageBox bg-primary text-light");
      gameObj.attackerPower();
      $(".imageBox").each(function(e) {
        $(this).off("click");
        $(this).appendTo("#enemiesSection");
        $(this).addClass("border-dark");
        $(this)
          .removeClass("imageBox bg-light")
          .addClass("border-danger movedImageBox bg-danger text-light");
      });
      gameObj.selectDefender();
    });
  },

    ```
