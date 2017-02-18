window.onload = function () {

  var pics = document.getElementById("pics");
  var pics_pre = getbyclass(pics, "pics_pre")[0];
  var pics_next = getbyclass(pics, "pics_next")[0];
  var pics_list = getbyclass(pics, "pics_list")[0];
  var pics_ul = pics.getElementsByTagName("ul")[0];
  var pics_lis = pics_ul.getElementsByTagName("li");
  var num = pics_lis.length;
  var i_now = 0;
  var btn = true;                   // Resolve  delete the element problem when click double.

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
    if (i_now < num - 1) {
      i_now++;
    } else {
      i_now = 0;
    }
    show_next();
  }, 3000);

  pics_pre.onclick = function () {
    show_pre();
  };
  pics_next.onclick = function () {
    show_next();
  };

  function show_pre() {
    if (btn) {
      btn = false;
      var new_li = pics_lis[num - 1].cloneNode(true);
      pics_ul.insertBefore(new_li, pics_lis[0]);
      pics_ul.style.left = -pics_lis[1].offsetLeft + "px";
      move(pics_ul, {left: 0}, "buffer", function () {
        pics_ul.removeChild(pics_lis[num]);
        btn = true;
      });

      if (i_now > 0) {
        i_now--;
      } else {
        i_now = num - 1;
      }
      for (var i = 0; i < num; i++) {
        list_li[i].style.background = "#FFFFFF";
      }
      list_li[i_now].style.background = "#EE7600";
    }
  }

  function show_next() {
    if (btn) {
      btn = false;
      var new_li = pics_lis[0].cloneNode(true);
      pics_ul.appendChild(new_li);
      var l = pics_lis[0].offsetWidth;
      move(pics_ul, {left: -l}, "buffer", function () {
        pics_ul.removeChild(pics_lis[0]);
        pics_ul.style.left = 0;
        btn = true;
      });
      if (i_now < num - 1 ) {
        i_now++;
      } else {
        i_now = 0;
      }
      for (var i = 0; i < num; i++) {
        list_li[i].style.background = "#FFFFFF";
      }
      list_li[i_now].style.background = "#EE7600";
    }
  }

  function show(i_now) {
    var l = pics_lis[i_now].offsetLeft;
    for (var i = 0; i < num; i++) {
      list_li[i].style.background = "#FFFFFF";
    }
    list_li[i_now].style.background = "#EE7600";
    move(pics_ul, {left: -l}, "buffer");
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
        show_next();
        i_now++;
      } else {
        i_now = 0;
      }
    }, 3000);
  }
};