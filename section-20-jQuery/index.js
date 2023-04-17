$("h1").click(function() {
    $("h1").css("color", "purple");
});
$("button.fade-toggle").click( function () {
    $("h1").fadeToggle();
  }
)

$("button.slide-toggle").click( function () {
    $("h1").slideToggle();
  }
)

$("button.animation").click( function () {
    $("h1").css("background-color","purple");
    $("h1").animate({opacity: "0.5"}).animate({margin: "4%"});
    $("h1").animate({margin: "2%"}).animate({opacity: "1.0"});
  }
)

$("button#reset").click( function () {
    $("h1").text("Here we are again.");
    $("h1").css("background-color","black");
  }
)
$(document).keypress(function (e) { 
    $("h1").text(e.key);
    
});

$("input").keypress(function (e) { 
    console.log(e.key);
});

$("h1").on("mouseover", function () {
   $("h1").css("color", "yellow"); 
   $("button#reset").after('<h3 class="so-cool">I am so cool</h3>');
});
$("h1").on("mouseleave", function () {
   $("h3").remove();
   $("h1").css("color", "white"); 
})