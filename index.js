$(function () {
  var $hat = $(".m-game__wrapper");
  var token = true;

  $(".m-game").on("click", function () {
    if (!token) return;
    token = false;

    var oldDeg = $hat.data("rotate") ? $hat.data("rotate") : 0;
    console.log(oldDeg);

    var deg = Math.floor(Math.random() * 360) + 720 + oldDeg;

    $hat.data("rotate", deg);
    $hat.css("transform", `rotate(${deg}deg)`);

    setTimeout(function () {
      token = true;
      calcResult(deg);
    }, 10000);
  });
});

function calcResult(deg) {
  var rewards = [
    "Phần thưởng 1",
    "Phần thưởng 2",
    "Phần thưởng 3",
    "Phần thưởng 4",
    "Phần thưởng 5",
    "Phần thưởng 6",
    "Phần thưởng 7",
    "Phần thưởng 8",
  ];

  var uiElements = document.querySelectorAll(".m-game__text");
  var rewardIndex = Math.floor(deg / (360 / rewards.length));

  var randomReward = rewards[rewardIndex];
  // var randomUI = uiElements[rewardIndex].textContent;

  // Sử dụng randomReward và randomUI để thực hiện các hành động tương ứng

  console.log("Phần thưởng ngẫu nhiên: " + randomReward);
}
