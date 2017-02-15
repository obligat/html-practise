function gbc(tparent, tclass) {  //获取指定父元素的指定类的子元素的函数
  var allclass = tparent.getElementsByTagName('*');
  var result = [];
  for (var i = 0; i < allclass.length; i++) {
    if (allclass[i].className == tclass)
      result.push(allclass[i]);
  }
  return result;
}

window.onload = function () {
  var sbp = document.getElementById('show_bigger_pic');
  var c = gbc(sbp, 'cover')[0];
  var fs = gbc(sbp, 'float_span')[0];
  var spd = gbc(sbp, 'small_pic_div')[0];
  var sp = spd.getElementsByTagName('img')[0];
  var bpd = gbc(sbp, 'big_pic_div')[0];
  var bp = bpd.getElementsByTagName('img')[0];
  var spw, sph, bpw, bph;
  var btn = true;
  c.onmouseover = function () {
    fs.style.display = "block";
    bpd.style.display = "block";
    c.style.cursor = "pointer";
    if (btn) {
      spw = sp.offsetWidth;
      sph = sp.offsetHeight;
      bpw = bp.offsetWidth;
      bph = bp.offsetHeight;
      spdw = spd.offsetWidth;
      spdh = spd.offsetHeight;
      var fsw = Math.ceil(spw / bpw * spdw);
      var fsh = Math.ceil(sph / bph * spdh);
      fs.style.width = fsw + 'px';
      fs.style.height = fsh + 'px';
      btn = false;
    }
  };

  c.onmouseout = function () {
    fs.style.display = "none";
    bpd.style.display = "none";
  };

  c.onmousemove = function (ev) {
    var pos = ev || event;
    var left = pos.clientX - sbp.offsetLeft - fs.offsetWidth / 2;
    var top = pos.clientY - sbp.offsetTop - fs.offsetHeight / 2;
    if (left < 0) {
      left = 0;
    }
    else if (left > c.offsetWidth - fs.offsetWidth) {
      left = c.offsetWidth - fs.offsetWidth;
    }
    if (top < 0) {
      top = 0;
    }
    else if (top > c.offsetHeight - fs.offsetHeight) {
      top = c.offsetHeight - fs.offsetHeight;
    }
    fs.style.left = left + 'px';
    fs.style.top = top + "px";
    var percentX = left / c.offsetWidth;
    var percentY = top / c.offsetHeight;
    bp.style.left = -percentX * (bp.offsetWidth) + "px";
    bp.style.top = -percentY * (bp.offsetHeight) + "px";
  }
};
