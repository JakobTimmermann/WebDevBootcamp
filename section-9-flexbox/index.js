$("#checkbox-column").change(function (e) { 
   if (e.currentTarget.checked) {
      $(".container").css("flex-direction", "column")
   }  else {
      $(".container").css("flex-direction", "row")
   }
});


$("#checkbox-basis").change(function (e) { 
   if (e.currentTarget.checked) {
      $(".container>div").css("flex-basis", "200px")
   }  else {
      $(".container>div").css("flex-basis","auto") 
   }
});
