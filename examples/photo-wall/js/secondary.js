function getByClassName(parentname, classname) {
  var result = [];
  var allClass = document.getElementsByTagName(parentname);
  for (var i = 0; i < allClass.length; i++) {

    if (classname == allClass[i].className)
      result.push(allClass[i]);
  }
  return result;
}

function view_size(attr) {
  var viewHeight, viewWidth;
  switch (attr) {
    case "height":
      if (window.innerHeight) {
        viewHeight = window.innerHeight;
        return viewHeight;
      } else if ((document.body) && (document.body.clientHeight)) {
        viewHeight = document.body.clientHeight;
        return viewHeight;
      }
      break;
    case "width":
      if (window.innerWidth) {
        viewWidth = window.innerWidth;
        return viewWidth;
      } else if ((document.body) && (document.body.clientWidth)) {
        viewWidth = document.body.clientWidth;
        return viewWidth;
      }
      if (document.documentElement && document.documentElement.clientWidth) {
        viewWidth = document.documentElement.clientWidth;
        return viewWidth;
      }
      break;
    case "scrollTop":
      var scrollTop;
      if (typeof window.pageYOffset != 'undefined') {
        scrollTop = window.pageYOffset;
      }
      else if (typeof document.compatMode != 'undefined' &&
          document.compatMode != 'BackCompat') {
        scrollTop = document.documentElement.scrollTop;
      }
      else if (typeof document.body != 'undefined') {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
      break;
    default :
      return 0;
      break;
  }
}

function css(obj, attr) {
  var re = [];
  switch (attr) {
    case 'rotate':
      var transformStr = obj.currentStyle ? obj.currentStyle['transform'] : document.defaultView.getComputedStyle(obj, false)['webkitTransform'] || document.defaultView.getComputedStyle(obj, false)['msTransform'] || document.defaultView.getComputedStyle(obj, false)['MozTransform'] || document.defaultView.getComputedStyle(obj, false)['OTransform'] || document.defaultView.getComputedStyle(obj, false)['transform'] + "";
      var matrixArray = transformStr.split(",");
      re.push(Math.asin(matrixArray[1]) / Math.PI * 180);
      return re;
      break;
    default :
      re.push(parseInt(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]));
      return re;
      break;
  }
}

function drag(obj) {//实现拖拽，参数为对象
  obj.onmousedown = function (ev) {//按下鼠标
    var oev = ev || event;
    var disX = oev.clientX - obj.offsetLeft;
    var disY = oev.clientY - obj.offsetTop;
    document.onmousemove = function (ev) {//拖动鼠标
      var oev = ev || event;
      var left = oev.clientX - disX;
      var top = oev.clientY - disY;
      obj.style.left = left + 'px';//更新对象的位置
      obj.style.top = top + 'px';
    };
    document.onmouseup = function () {//抬起鼠标
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
}