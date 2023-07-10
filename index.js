$(function () {
  var $hat = $(".spin_container");
  var token = true;
  var prizeCount = 8; // Số lượng phần thưởng
  var angleMultiplier = 45; // Bội số của 45
  var spinCount = localStorage.getItem("spinCount") || 0; // Lấy giá trị spinCount từ localStorage, nếu không có thì mặc định là 0
  var previousPrizeElement = null; // Phần tử hiển thị phần thưởng của lần quay trước đó

  $(".count").on("click", function () {
    $(".notification__child").hide();
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
      var resultElement = $("#result");

      if (previousPrizeElement) {
        previousPrizeElement.remove(); // Xóa phần tử hiển thị phần thưởng của lần quay trước đó
      }

      setTimeout(function () {
        var html = `
          <div class="notification__child" style="display:block">
            <p style="margin:0;">Chúc mừng bạn đã nhận được dịch vụ</p>
            <p style="margin:0; padding-top:5px;">${prize}</p>
          </div>
        `;
        resultElement.html(html);

        if (spinCount === 1) {
          $(".count_title").text("Bạn còn 2 lượt quay");
        } else if (spinCount === 2) {
          $(".count_title").text("Bạn còn 1 lượt quay");
        } else if (spinCount >= 3) {
          $(".count_title").text("Bạn đã hết lượt quay");
          $(".count_button").prop("disabled", true);
        }
      }, 2000); // Đặt khoảng thời gian hiển thị phần thưởng sau khi vòng quay hoàn thành

      // Lưu trữ phần tử hiển thị phần thưởng của lần quay hiện tại

      if (spinCount >= 3) {
        $(".count_button").prop("disabled", true); // Vô hiệu hóa nút quay khi đã quay đủ 3 lần
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
    "Xóa xăm chân mày 299k",
    "Tắm trắng whitening 699k",
    "Xóa xăm hình nghệ thuật 99k",
    "Phun môi 999k",
    "Xóa nám 499k",
    "Xóa mụn thịt 50k",
    "Chăm sóc da Relax Skin 199k",
    "Triệt lông OPT 199k",
  ];
  // var prizeName = prizeNames[prizeIndex];

  var prizeName = prizeNames[prizeIndex];

  return prizeName;
}

function showResult(prize) {
  var resultElement = document.getElementById("result");

  if (previousPrizeElement) {
    previousPrizeElement.remove(); // Xóa phần tử hiển thị phần thưởng của lần quay trước đó
  }
  const html = `
      <div class="notification__child">
            <p style="margin:0;">Chúc mừng bạn đã nhận được dịch vụ</p>
            <p style="margin:0; padding-top:5px;">${prize}</p>
      </div>
  `;
  resultElement.innerHTML = html;
  previousPrizeElement = resultElement.children(); // Lưu trữ phần tử hiển thị phần thưởng của lần quay hiện tại
}

function resetUI() {
  var resultElement = $("#result");

  if (previousPrizeElement) {
    previousPrizeElement.remove(); // Xóa phần tử hiển thị phần thưởng của lần quay trước đó
  }
  resultElement.empty(); //
}
