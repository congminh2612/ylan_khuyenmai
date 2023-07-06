$(function () {
  var $hat = $(".m-game__wrapper");
  var token = true;

  $(".m-game__start").on("click", function () {
    if (!token) return;
    token = false;

    var oldDeg = $hat.data("rotate") ? $hat.data("rotate") : 0;

    var deg = Math.floor(Math.random() * 360) + 1080 + oldDeg;

    $hat.data("rotate", deg);
    $hat.css("transform", `rotate(${deg}deg)`);

    setTimeout(function () {
      token = true;
      calcResult(deg);
    }, 7000);
  });
});

function calcResult(deg) {
  alert("chúc mừng bạn đã nhận được phần thưởng");
}
