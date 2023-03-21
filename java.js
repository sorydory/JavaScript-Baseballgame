let out_count = 0; //아웃카운터 변수선언
let strike_count = 0; //스트라이크 카운터 변수선언
let ball_count = 0; //볼 카운터 변수선언
let gamecount = 0; //경기횟수 변수언(3아웃기준 한경기)
let score = 0;
let comscore = 0;
let userscore = 0;
let score1 = document.querySelector("#one");
let score2 = document.querySelector("two");
let time = document.querySelector("#moment"); //전광판 현재상황변수선언
let scount = document.querySelector("#yellow_strike"); //전광판 스트라이크 변수선언
let bcount = document.querySelector("#green_ball"); //전광판 볼 변수선언
let ocount = document.querySelector("#red_out"); //전광판 아웃 변수선언
let run = document.querySelector("#run"); //홈에서 달리는 모션을 변수선언
let run1 = document.querySelector("#run1"); //1루에서 달리는 모션을 변수선언
let run2 = document.querySelector("#run2"); //2루에서 달리는 모션을 변수선언
let run3 = document.querySelector("#run3"); //3루에서 달리는 모션을 변수선언
let wait2 = document.querySelector("#wait2"); //타자를 변수선언
let wait1 = document.querySelector("#wait1"); //1루에 서있는 사람
let base2 = document.querySelector("#base2"); //2루에 서있는 사람
let base3 = document.querySelector("#base3"); //3루에 서있는사람
let changeimg = document.querySelector("#change");
let scoreview = document.querySelector("#score");
let situatiomview = document.querySelector("#situatiom");
let nowview = document.querySelector("#now");
let endingview = document.querySelector("#ending");
let baseroo1 = 0; //1루에 있는지 확인용 변수선언
let baseroo2 = 0; //2루에 있는지 확인용 변수선언
let baseroo3 = 0; //3루에 있는지 확인용 변수선언
const scountcolor = document.createElement("div"); //전광판에 스트라이크 표시1 변수선언
const scountcolor1 = document.createElement("div"); //전광판에 스트라이크 표시2 변수선언
const bcountcolor = document.createElement("div"); //전광판에 볼 표시1 변수선언
const bcountcolor1 = document.createElement("div"); //전광판에 볼 표시2 변수선언
const bcountcolor2 = document.createElement("div"); //전광판에 볼 표시3 변수선언
const ocountcolor = document.createElement("div"); //전광판에 아웃 표시1 변수선언
const ocountcolor1 = document.createElement("div"); //전광판에 아웃 표시2 변수선언
let home = document.querySelectorAll(".home");
let away = document.querySelectorAll(".away");
let total1 = document.querySelector(".total1");
let total2 = document.querySelector(".total2");
let com = false;
let i = 0;
let j = 0;

//볼 버튼 클릭시
function ball() {
  let ball = Math.random(); //확률을 위한 랜덤숫자
  roo1remove(); //홈에서 1루가는 모션 삭제
  roo2remove(); //홈에서 2루가는 모션 삭제
  roo3remove(); //홈에서 3루가는 모션 삭제
  homerunremove(); //홈런 모션 삭제
  roo1toroo2remove();
  roo1toroo3remove();
  roo1tohomeremove();
  roo2toroo3remove();
  roo2tohomeremove();
  roo3tohomeremove();
  scoreborad();
  run.classList.remove("on");
  wait2.classList.remove("off"); //타자 이미지 삭제
  changeimg.classList.remove("on");
  if (baseroo1 == 1) {
    baseon1();
  }
  if (baseroo2 == 1) {
    baseon2();
  }
  if (baseroo3 == 1) {
    baseon3();
  }
  if (ball < 0.1) {
    //25퍼 확률로 타격
    hit(); //타격함수호출
    strike_count = 0; //타격했기 때문에 스트라이크 카운터를 0
    ball_count = 0; //타격했기 때문에 볼 카운터를 0
  } else if (ball < 0.64) {
    //39퍼 확률로 파울
    foul(); //파울함수 호출
    time.innerHTML = "파울"; //현재상황에 파울표시
  } else if (ball < 0.641) {
    //0.1퍼 확률로 헛스윙
    time.innerHTML = "헛스윙";
    strikecount(); //헛스윙이라 스트라이크 카운터함수 호출
    time.innerHTML = `${strike_count}스트라이크 ${ball_count}볼`; //현재상황 표시
  } else if (ball < 0.642) {
    //0.1퍼 확률로 데드볼
    time.innerHTML = "데드볼"; //현재상황에 데드볼 표시
    strike_count = 0; //데드볼로 인해 스트라이크 카운터 0
    ball_count = 0; //데드볼로 인해 볼 카운터 0
  } else {
    //나머지 확률 볼
    ballcount(); //볼카운터 함수 호출
    time.innerHTML = `${strike_count}스트라이크 ${ball_count}볼`; //현재상황 표시
  }
}

//스트라이크 버튼 클릭시
function strike() {
  let strike = Math.random(); //스트라이크 확률을 위한 랜덤숫자
  roo1remove();
  roo2remove();
  roo3remove();
  homerunremove();
  roo1toroo2remove();
  roo1toroo3remove();
  roo1tohomeremove();
  roo2toroo3remove();
  roo2tohomeremove();
  roo3tohomeremove();
  scoreborad();
  run.classList.remove("on");
  wait2.classList.remove("off");
  changeimg.classList.remove("on");
  if (baseroo1 == 1) {
    baseon1();
  }
  if (baseroo2 == 1) {
    baseon2();
  }
  if (baseroo3 == 1) {
    baseon3();
  }
  if (strike < 0.12) {
    //타격 12퍼
    hit(); //타격함수호출
    strike_count = 0;
    ball_count = 0;
  } else if (strike < 0.55) {
    //스트라이크 43퍼
    //스트라이크 카운터 ++
    strikecount();
    time.innerHTML = `${strike_count}스트라이크 ${ball_count}볼`;
  } else {
    //파울 45퍼
    foul();
    time.innerHTML = `파울`;
  }
}

// 스윙 버튼 눌렸을때
function swing() {
  let swing = Math.random(); //스윙했을때 확률 계산 랜덤숫자
  roo1remove();
  roo2remove();
  roo3remove();
  homerunremove();
  roo1toroo2remove();
  roo1toroo3remove();
  roo1tohomeremove();
  roo2toroo3remove();
  roo2tohomeremove();
  roo3tohomeremove();
  run.classList.remove("on");
  wait2.classList.remove("off");
  changeimg.classList.remove("on");
  j = 1;
  if (baseroo1 == 1) {
    baseon1();
  }
  if (baseroo2 == 1) {
    baseon2();
  }
  if (baseroo3 == 1) {
    baseon3();
  }
  if (swing < 0.5) {
    //50퍼 확률로 타격
    hit();
    strike_count = 0;
    ball_count = 0;
  } else if (swing < 0.6) {
    //10퍼 확률로 번트
    let bent = Math.random(); //번트 성공 실패 랜덤숫자
    if (bent < 0.5) {
      //50퍼로 성공
      time.innerHTML = `번트성공`;
      roo1(); //1루로 가는 모션 함수 호출
      baseroo1 = 1;
    } else {
      //50퍼 확률로 실패
      strikecount(); //번트 실패로 인해 스트라이크 카운터 함수호출
      time.innerHTML = `${strike_count}스트라이크 ${ball_count}볼`;
    }
  } else {
    //나머지 확률 헛스윙
    strikecount(); //스트라이크 함수 호출
    time.innerHTML = `${strike_count}스트라이크 ${ball_count}볼`;
  }
}

// 웨이트 버튼 눌렸을때
function wait() {
  let wait = Math.random(); //wait시 확률계산 랜덤숫자
  roo1remove();
  roo2remove();
  roo3remove();
  homerunremove();
  roo1toroo2remove();
  roo1toroo3remove();
  roo1tohomeremove();
  roo2toroo3remove();
  roo2tohomeremove();
  roo3tohomeremove();
  scoreborad();
  run.classList.remove("on");
  wait2.classList.remove("off");
  changeimg.classList.remove("on");
  j = 1;
  if (baseroo1 == 1) {
    baseon1();
  }
  if (baseroo2 == 1) {
    baseon2();
  }
  if (baseroo3 == 1) {
    baseon3();
  }
  if (wait < 0.5) {
    //50퍼 확률로 스트라이크
    console.log("스트라이크");
    strikecount();
    time.innerHTML = `${strike_count}스트라이크 ${ball_count}볼`;
  } else {
    //50퍼확률로 볼
    console.log("볼");
    ballcount();
    time.innerHTML = `${strike_count}스트라이크 ${ball_count}볼`;
  }
}

//공을 타격했을때
function hit() {
  let hit = Math.random(); //hit시 확률계산 랜덤숫자
  bcountcolor.remove();
  bcountcolor1.remove();
  bcountcolor2.remove();
  scountcolor.remove();
  scountcolor1.remove();
  scoreborad();
  if (hit < 0.45) {
    //1루 진루 확률 45퍼
    console.log("1루진루");
    run.classList.add("on"); //1루로 달리는 모션추가
    wait2.classList.add("off"); //타자 이미지 삭제
    time.innerHTML = `1루진루`;
    roo1();
    baseon1remove();
    baseon2remove();
    baseon3remove();
    if (baseroo3 == 1) {
      baseon3remove();
      roo3tohome();
      score += 1;
      totalscore();
      baseroo3 = 0;
    }
    if (baseroo2 == 1) {
      baseon2remove();
      roo2toroo3();
      baseroo2 = 0;
      baseroo3 = 1;
    }
    if (baseroo1 == 1) {
      baseon1remove();
      roo1toroo2();
      baseroo2 = 1;
    }
    baseroo1 = 1;
  } else if (hit < 0.82) {
    //아웃 확률 37퍼
    out();
  } else if (hit < 0.96) {
    //2루 진루 14퍼
    console.log("2루진루");
    run.classList.add("on");
    wait2.classList.add("off");
    time.innerHTML = `2루진루`;
    roo2();
    baseon1remove();
    baseon2remove();
    baseon3remove();
    if (baseroo3 == 1) {
      baseon3remove();
      roo3tohome();
      score += 1;
      totalscore();
      baseroo3 = 0;
    }
    if (baseroo2 == 1) {
      baseon2remove();
      roo2tohome();
      score += 1;
      totalscore();
      baseroo2 = 0;
    }
    if (baseroo1 == 1) {
      baseon1remove();
      roo1toroo3();
      baseroo1 = 0;
      baseroo3 = 1;
    }
    baseroo2 = 1;
  } else if (hit < 0.98) {
    //3루진루 2퍼
    console.log("3루진루");
    run.classList.add("on");
    wait2.classList.add("off");
    time.innerHTML = `3루진루`;
    baseon1remove();
    baseon2remove();
    baseon3remove();
    if (baseroo3 == 1) {
      baseon3remove();
      roo3tohome();
      score += 1;
      totalscore();
      baseroo3 = 0;
    }
    if (baseroo2 == 1) {
      baseon2remove();
      roo2tohome();
      score += 1;
      totalscore();
      baseroo2 = 0;
    }

    if (baseroo1 == 1) {
      baseon1remove();
      roo1tohome();
      score += 1;
      totalscore();
      baseroo1 = 0;
    }
    baseroo3 = 1;
    roo3();
  } else {
    //홈런 2퍼
    console.log("홈런");
    run.classList.add("on");
    wait2.classList.add("off");
    homerun();
    baseon1remove();
    baseon2remove();
    baseon3remove();
    score += 1;
    totalscore();
    if (baseroo3 == 1) {
      roo3tohome();
      baseroo3 = 0;
      score += 1;
      totalscore();
    }
    if (baseroo2 == 1) {
      roo2tohome();
      baseroo2 = 0;
      score += 1;
      totalscore();
    }

    if (baseroo1 == 1) {
      roo1tohome();
      baseroo1 = 0;
      score += 1;
      totalscore();
    }
  }
}

//아웃 카운터
function out() {
  out_count++; //아웃카운터
  if (out_count == 1) {
    //아웃카운터1일때
    time.innerHTML = "1아웃!!";
    strike_count = 0; //스트라이크 카운터 0
    ball_count = 0; //볼카운터 0
    console.log("1아웃");
    ocount.append(ocountcolor); // 아웃카운터 빨간색불 등장
  }
  if (out_count == 2) {
    //아웃카운터 2일때
    time.innerHTML = "2아웃!!";
    strike_count = 0;
    ball_count = 0;
    console.log("2아웃");
    ocount.append(ocountcolor1); //아웃카운터 두번째불 등장
  }
  if (out_count == 3) {
    strike_count = 0;
    ball_count = 0;
    time.innerHTML = `${strike_count}스트라이크 ${ball_count}볼`;
    bcountcolor.remove(); //볼카운터 ,스트라이크 카운터 불 삭제
    bcountcolor1.remove();
    bcountcolor2.remove();
    scountcolor.remove();
    scountcolor1.remove();
    changeimg.classList.add("on");
    change(); // 초,말 변경함수
    out_count = 0; //아웃카운터 0
    j++;
  }
}

//볼카운터
function ballcount() {
  ball_count++; //볼카운터 증가
  if (ball_count == 1) {
    bcount.append(bcountcolor); //볼카운터 첫번째 불등장
  }
  if (ball_count == 2) {
    bcount.append(bcountcolor1); //볼카운터 두번째 불등장
  }
  if (ball_count == 3) {
    bcount.append(bcountcolor2); //볼카운터 세번째 불등장
  }
  if (ball_count == 4) {
    //볼카운터 4개면
    ball_count = 0;
    strike_count = 0;
    console.log("4볼");
    run.classList.add("on");
    roo1();
    bcountcolor.remove(); //볼카운터 ,스트라이크 카운터 불 삭제
    bcountcolor1.remove();
    bcountcolor2.remove();
    scountcolor.remove();
    scountcolor1.remove();
    baseon1remove();
    if (baseroo3 == 1) {
      if (baseroo2 == 1) {
        if (baseroo1 == 1) {
          baseon3remove();
          roo3tohome();
          score += 1;
          totalscore();
          baseroo3 = 0;
        }
      }
    }
    if (baseroo2 == 1) {
      if (baseroo1 == 1) {
        baseon2remove();
        roo2toroo3();
        baseroo3 = 1;
        baseroo2 = 0;
      }
    }
    if (baseroo1 == 1) {
      //1루주자가 있다고 인식
      // 1루에서2루(1루타라서 값1유지), 1루에서3루(2루타라서 값0) 1루에서홈(3루타라서0)
      // 홈런(홈런이니 값0)나누고
      roo1toroo2();
      baseroo2 = 1;
    }
    baseroo1 = 1;
  } else {
  }
}

//파울 함수
function foul() {
  if (strike_count == 2) {
    //스트라이크2일경우 그대로 유지
    strike_count == 2;
  } else {
    strikecount(); //아닐경우 하나씩 카운터
  }
}

//스트라이크 카운터함수
function strikecount() {
  strike_count++; //스트라이크 카운터 증가
  if (strike_count == 1) {
    //1스트라이크시  불등장
    scount.append(scountcolor);
  }
  if (strike_count == 2) {
    //2스트라이크시 두번째 불등장
    scount.append(scountcolor1);
  }
  if (strike_count == 3) {
    //3스트라이크시 불 다꺼지 아웃함수 호충
    scountcolor.remove();
    scountcolor1.remove();
    out();
  }
}
//팀교체 함수
function change() {
  gamecount++; //변수 게임카운터 숫자증가
  if (j == 1) {
    i++;
  }
  if (out_count % 3 == 0) {
    //아웃카운터가3이면 버튼 변경 볼,스트라이크 > 스윙 웨이트
    document.querySelector("#ballicons").classList.toggle("off");
    document.querySelector("#ballicons2").classList.toggle("on");
    document.querySelector("#wait1").classList.toggle("off");
    ocountcolor.remove();
    ocountcolor1.remove();
    baseon1remove();
    baseon2remove();
    baseon3remove();
    baseroo3 = 0;
    baseroo2 = 0;
    baseroo1 = 0;
    score = 0;
    com = !com;
    if (gamecount == 18) {
      //게임카운터가 18이되면 버튼 삭제
      document.querySelector("#ballicons").classList.add("off");
      changeimg.classList.remove("on");
      ending();
    }
  }
}

function scoreborad() {
  if (com == false) {
    away[i].innerHTML = score;
    total1.innerHTML = comscore;
  }
  if (com == true) {
    home[i].innerHTML = score;
    total2.innerHTML = userscore;
  }
}

function totalscore() {
  if (com == false) {
    comscore += 1;
  }
  if (com == true) {
    userscore += 1;
  }
}

//달리는 모션 추가 삭제부분
//1루타
function roo1() {
  run.classList.add("roo1");
}
function roo1remove() {
  run.classList.remove("roo1");
}
//2루타
function roo2() {
  run.classList.add("on");
  run.classList.add("roo2");
}
function roo2remove() {
  run.classList.remove("roo2");
}
//3루타
function roo3() {
  run.classList.add("on");
  run.classList.add("roo3");
}
function roo3remove() {
  run.classList.remove("roo3");
}
//홈런
function homerun() {
  run.classList.add("on");
  run.classList.add("homerun");
}
function homerunremove() {
  run.classList.remove("homerun");
}
//1루에 서있는 사람
function baseon1() {
  wait1.classList.add("on");
}
function baseon1remove() {
  wait1.classList.remove("on");
}
//2루에 서있는 사람
function baseon2() {
  base2.classList.add("on");
}
function baseon2remove() {
  base2.classList.remove("on");
}
//3루에 서있는 사람
function baseon3() {
  base3.classList.add("on");
}
function baseon3remove() {
  base3.classList.remove("on");
}

//1루에서 2루
function roo1toroo2() {
  run1.classList.add("on");
  run1.classList.add("onetotwo");
}
function roo1toroo2remove() {
  run1.classList.remove("on");
  run1.classList.remove("onetotwo");
}
//1루에서 3루
function roo1toroo3() {
  run1.classList.add("on");
  run1.classList.add("onetothree");
}
function roo1toroo3remove() {
  run1.classList.remove("on");
  run1.classList.remove("onetothree");
}
//1루에서 홈
function roo1tohome() {
  run1.classList.add("on");
  run1.classList.add("onetohome");
}
function roo1tohomeremove() {
  run1.classList.remove("on");
  run1.classList.remove("onetohome");
}
//2루에서 3루
function roo2toroo3() {
  run2.classList.add("on");
  run2.classList.add("twotothree");
}
function roo2toroo3remove() {
  run2.classList.remove("on");
  run2.classList.remove("twotothree");
}
//2루에서 홈
function roo2tohome() {
  run2.classList.add("on");
  run2.classList.add("twotohome");
}
function roo2tohomeremove() {
  run2.classList.remove("on");
  run2.classList.remove("twotohome");
}
//3루에서 홈
function roo3tohome() {
  run3.classList.add("on");
  run3.classList.add("threetohome");
}
function roo3tohomeremove() {
  run3.classList.remove("on");
  run3.classList.remove("threetohome");
}

let first = document.querySelector("#first_bg");
let gamebtn = document.querySelector(".gamebtn");

function goback() {
  gamebtn.addEventListener("click", function () {
    first_bg.style.display = "none";
  });
}

function ending() {
  scoreview.classList.add("off");
  situatiomview.classList.add("off");
  nowview.classList.add("off");
  endingview.classList.add("on");
  if (comscore > userscore) {
    endingview.innerHTML = "컴퓨터 승리";
  } else if (comscore < userscore) {
    endingview.innerHTML = "유저 승리";
  } else {
    endingview.innerHTML = "무승부";
  }
}
