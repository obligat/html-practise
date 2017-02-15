$(function () {
  var lis = $(".waterfall").children("ul").children("li");//获取所有li元素
  var li_height = {C1: [], C2: [], C3: []};//元素高度暂存数组
  for (var i = 0; i < lis.length; i++) {
    var col = i % 3;//计算出元素应在的列
    switch (col)//分情况
    {
      case 0://第一列
        lis.eq(i).css("left", "5px");
        li_height.C1.push(parseInt(lis.eq(i).css("height")));//把当前元素的高度存入第一列数组C1中
        var row = Math.floor(i / 3);//向下取整求排数
        if (!row)//第一排
        {
          lis.eq(i).css("top", "0");
        } else//非第一排
        {
          var top = 0;//top值暂存器
          for (var j = 0; j < row; j++) {
            top += li_height.C1[j];//累加元素上方所有排元素的高度值
          }
          lis.eq(i).css("top", top + "px");
        }
        break;
      case 1://第2列
        lis.eq(i).css("left", "236px");
        li_height.C2.push(parseInt(lis.eq(i).css("height")));//把当前元素的高度存入第2列数组C2中
        var row = Math.floor(i / 3);
        if (!row) {
          lis.eq(i).css("top", "0");
        } else {
          var top = 0;
          for (var j = 0; j < row; j++) {
            top += li_height.C2[j];
          }
          lis.eq(i).css("top", top + "px");
        }
        break;
      case 2:
        lis.eq(i).css("left", "472px");
        li_height.C3.push(parseInt(lis.eq(i).css("height")));//把当前元素的高度存入第3列数组C3中
        var row = Math.floor(i / 3);
        if (!row) {
          lis.eq(i).css("top", "0");
        } else {
          var top = 0;
          for (var j = 0; j < row; j++) {
            top += li_height.C3[j];
          }
          lis.eq(i).css("top", top + "px");
        }
        break;
    }

  }
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