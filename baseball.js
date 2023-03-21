//시계 !!
function setClock() {
  let dateInfo = new Date();
  let hour = modifyNumber(dateInfo.getHours());
  let min = modifyNumber(dateInfo.getMinutes());
  let sec = modifyNumber(dateInfo.getSeconds());
  document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
}
function modifyNumber(time) {
  if (parseInt(time) < 10) {
    return "0" + time;
  } else return time;
}
window.onload = function () {
  setClock();
  setInterval(setClock, 1000); //1초마다 setClock 함수 실행
};
//시계 끝
