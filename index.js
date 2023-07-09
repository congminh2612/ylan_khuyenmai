$(function () {
  var $hat = $(".spin_container");
  var token = true;
  var prizeCount = 8; // Số lượng phần thưởng
  var angleMultiplier = 45; // Bội số của 45
  var spinCount = localStorage.getItem("spinCount") || 0; // Lấy giá trị spinCount từ localStorage, nếu không có thì mặc định là 0

  $(".m-game").on("click", function () {
    if (!token || spinCount >= 3) return; // Kiểm tra nếu không được phép quay hoặc đã quay đủ 3 lần

    token = false;
    spinCount++; // Tăng số lần đã quay lên 1

    var oldDeg = $hat.data("rotate") ? $hat.data("rotate") : 0;
    console.log(oldDeg);

    var deg =
      Math.floor(Math.random() * prizeCount) * angleMultiplier +
      360 * 7 +
      oldDeg;

    $hat.data("rotate", deg);
    $hat.css("transform", `rotate(${deg}deg)`);

    setTimeout(function () {
      token = true;
      var prize = calcResult(deg);
      setTimeout(function () {
        showResult(prize);
      }, 2000); // Đặt khoảng thời gian hiển thị phần thưởng sau khi vòng quay hoàn thành

      if (spinCount >= 3) {
        $(".m-game").prop("disabled", true); // Vô hiệu hóa nút quay khi đã quay đủ 3 lần
      }

      // localStorage.setItem("spinCount", spinCount); // Lưu giá trị spinCount vào localStorage
    }, 3000);
  });

  // Kiểm tra giá trị spinCount khi trang web được tải lại
  if (spinCount >= 3) {
    $(".m-game").prop("disabled", true); // Vô hiệu hóa nút quay khi đã quay đủ 3 lần
  }
});

function calcResult(deg) {
  var prizeCount = 8;
  var angleMultiplier = 45;
  var prizeIndex = Math.floor(deg / angleMultiplier) % prizeCount;

  var prizeNames = [
    "xóa xăm chân mày 299k",
    "tắm trắng whitening 699k",
    "xóa xăm hình nghệ thuật 99k",
    "phun môi 999k",
    "xóa nám 499k",
    "xóa mụn thịt 50k",
    "chăm sóc da Relax Skin 199k",
    "triệt lông OPT 166k",
  ];
  // var prizeName = prizeNames[prizeIndex];

  var prizeName = prizeNames[prizeIndex];

  return prizeName;
}

function showResult(prize) {
  var resultElement = document.getElementById("result");
  resultElement.innerText = "Chúc mừng bạn đã nhận được dịch vụ " + prize;
  resultElement.style.display = "block";
}
