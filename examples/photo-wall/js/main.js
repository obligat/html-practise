window.onload = function () {
  var oCover = getByClassName("div", "cover");
  var prePic = oCover[0].parentNode;    // Store the last picture when pictures switching.
  var body = document.getElementsByTagName("body")[0];
  resize();
  window.onresize = resize;
  function resize() {
    var view_sizeH = view_size("height");
    var view_sizeW = view_size("width");
    body.style.width = view_sizeW;
    body.style.height = view_sizeH;
    for (var i = 0; i < oCover.length; i++) {
      var left = Math.random() * (view_sizeW - 1.3 * oCover[i].offsetWidth);
      var top = Math.random() * (view_sizeH - oCover[i].offsetHeight);
      var deg = Math.random() * 45;
      if (i % 2 == 0) {
        deg = -deg;  //picture clockwise and anti-clockwise by turns.
      }
      oCover[i].parentNode.style.left = left + "px";
      oCover[i].parentNode.style.top = top + "px";
      oCover[i].parentNode.style.webkitTransform = "rotate(" + deg + "deg)";
      oCover[i].parentNode.style.mozTransform = "rotate(" + deg + "deg)";
      oCover[i].parentNode.style.oTransform = "rotate(" + deg + "deg)";
      oCover[i].parentNode.style.msTransform = "rotate(" + deg + "deg)";
      oCover[i].parentNode.style.transform = "rotate(" + deg + "deg)";
      oCover[i].onmousedown = function () {

        console.log("prePic is : " + prePic.innerHTML);
        console.log("this.parentNode is : " + this.parentNode.innerHTML);

        prePic.style.zIndex = 0;
        this.parentNode.style.zIndex = 1000;
        drag(this.parentNode);
        prePic = this.parentNode;    // Update this picture turns prePic now .

        console.log("new prePic is: " + prePic.innerHTML);
      }
    }
  }

  document.onkeydown = function (e) {
    var deg = css(prePic, "rotate")[0];
    if (e.keyCode == 37) {
      deg--;
      if (deg < -90) {
        deg++;
      }
    } else if (e.keyCode == 39) {
      deg++;
      if (deg > 90) {
        deg--;
      }
    } else {
      return false;
    }
    prePic.style.webkitTransform = "rotate(" + deg + "deg)";
    prePic.style.mozTransform = "rotate(" + deg + "deg)";
    prePic.style.oTransform = "rotate(" + deg + "deg)";
    prePic.style.msTransform = "rotate(" + deg + "deg)";
    prePic.style.transform = "rotate(" + deg + "deg)";
  }
};