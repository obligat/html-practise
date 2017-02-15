$(function () {
  var view_height = $(window).height();
  var str;
  $(window).resize(function () {
    view_height = $(window).height();
  });
  $(window).scroll(function () {
    var uls = $(".waterfall").children("ul");
    for (var i = 0; i < uls.length; i++) {
      var last_li = uls.eq(i).children("li").last();
      var top_distance = last_li.offset().top;
      var last_li_height = parseInt(last_li.css("height"));
      var scroll_distance = document.documentElement.scrollTop || document.body.scrollTop;
      console.log("top_distance: " + top_distance + ", last_li_height: " + last_li_height + ", view_height: " + view_height + ", scroll_distance: " + scroll_distance);
      if (top_distance + last_li_height < view_height + scroll_distance) {
        ajax(i);
      }
    }
  });
});

function ajax(num) {
  $.ajax({
    url: "js/data.js",
    success: function (data) {
      str = "";
      data = eval(data);
      var n2 = data[num].src.length;
      for (var j = 0; j < n2; j++) {
        str += "<li><img src=" + data[num].src[j] + " alt='' /><p>" + data[num].title[j] + "</p></li>";
        console.log(str);
      }
      $(".waterfall").children("ul").eq(num).append(str);
    }
  });
}