var list = $("#mainCharSection").find(".imageBox");
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
});
