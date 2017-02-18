window.onload = function () {
  var pics = document.getElementById("pics");
  var pics_pre = getbyclass(pics, "pics_pre")[0];
  var pics_next = getbyclass(pics, "pics_next")[0];
  var pics_list = getbyclass(pics, "pics_list")[0];
  var pics_ul = pics.getElementsByTagName("ul")[0];
  var pics_lis = pics_ul.getElementsByTagName("li");
  var i_now = 0;
  for (var i = 0; i < pics_lis.length; i++) {
    var list = document.createElement("li");
    pics_list.appendChild(list);
  }
  var list_li = pics_list.getElementsByTagName("li");
  for (var i = 0; i < list_li.length; i++) {
    list_li[i].onclick = function () {
      i_now = index(this, list_li);
      show(i_now);
    }
  }
  show(0);
  var timer = setInterval(function () {
    if (i_now < pics_lis.length - 1) {
      i_now++;
    } else {
      i_now = 0;
    }
    show(i_now);
  }, 3000);
  pics_pre.onclick = function () {
    if (i_now > 0) {
      i_now -= 1;
    } else {
      i_now = pics_lis.length - 1;
    }
    show(i_now);
  };
  pics_next.onclick = function () {
    if (i_now < pics_lis.length - 1) {
      i_now += 1;
    } else {
      i_now = 0;
    }
    show(i_now);
  };
  function show(i_now) {
    var left = pics_lis[i_now].offsetLeft;
    move(pics_ul, {left: -left});
    for (var i = 0; i < pics_lis.length; i++) {
      list_li[i].style.background = "#ffffff";
    }
    list_li[i_now].style.background = "#EE7600";
  }

  pics.onmouseover = function () {
    pics_pre.style.display = "block";
    pics_next.style.display = "block";
    pics_list.style.display = "block";
    clearInterval(timer);
  };

  pics.onmouseout = function () {
    pics_pre.style.display = "none";
    pics_next.style.display = "none";
    pics_list.style.display = "none";
    timer = setInterval(function () {
      if (i_now < pics_lis.length) {
        show(i_now);
        i_now++;
      } else {
        i_now = 0;
      }
    }, 3000);
  }
};