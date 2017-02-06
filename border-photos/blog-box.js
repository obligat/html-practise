window.onload = function () {

  var oT = document.getElementsByTagName("textarea")[0];
  var blogText = document.getElementsByClassName("blogText")[0];
  var blogNum = document.getElementById("blogNum");
  var blogNumber = document.getElementById("blogNumber");
  var oA = document.getElementsByClassName("post")[0];
  var ie = !-[1,];  // 判断是否为ie

  oT.onfocus = function () {
    oT.style.border = "1px #40E0D0 solid";
    oT.style.boxShadow = "0 0 10px #5CACEE";
    blogNum.style.opacity = "1";
    var num = Math.ceil(getLength(oT.value) / 2);
    if (num == "") {
      oA.style.background = "#7F7F7F";
    }
  };

  oT.onblur = function () {
    oT.style.boxShadow = "";
    blogNum.style.opacity = "0";
    oA.style.background = "#8bc528";
  };

  if (ie) {
    oT.onpropertychange = toChange;
  }
  else {
    oT.oninput = toChange;
  }

  oA.onmouseover = function () {
    oT.blur();
    oA.style.background = "#7ccd7c";
  };

  oA.onmouseout = function () {
    oA.style.background = "#8bc528";
  };


  oA.onclick = function () {
    var num = Math.ceil(getLength(oT.value) / 2);
    if (num == 0 || num > 140) {
      alert("不符合发布要求，请检查");
    }
    else {
      alert("发布成功");
      oT.value = "";
      blogNumber.innerHTML = "140";
    }
  };

  function toChange() {
    var num = Math.ceil(getLength(oT.value) / 2);

    if (num <= 140) {
      blogNum.innerHTML = "还能输入 <span id = 'blogNumber'></span>字";
      blogNumber = document.getElementById("blogNumber");
      blogNumber.innerHTML = 140 - num;
      blogNumber.style.color = "";
    }
    else {
      blogNum.innerHTML = "超出<span id = 'blogNumber'></span>字,您可以转为<a href='#'>长微博</a>发送 ";
      blogNumber = document.getElementById("blogNumber");
      blogNumber.innerHTML = num - 140;
      blogNumber.style.color = "red";
    }

    if (oT.value == "" || num > 140) {
      oA.style.background = "#7f7f7f";
    }
    else {
      oA.style.background = "#8bc528";
    }
  }

  function getLength(str) {
    return String(str).replace(/[^\x00-\xff]/g, "aa").length;
  }
};