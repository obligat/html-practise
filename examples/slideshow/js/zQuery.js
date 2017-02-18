function rgb_color() {
  var r = parseInt(Math.random() * 255);
  var g = parseInt(Math.random() * 255);
  var b = parseInt(Math.random() * 255);
  var newColor = "rgb(" + r + "," + g + "," + b + ")";
  return newColor;
}
function rgba_color() {
  var r = parseInt(Math.random() * 255);
  var g = parseInt(Math.random() * 255);
  var b = parseInt(Math.random() * 255);
  var a = Math.random();
  var newColor = "rgb(" + r + "," + g + "," + b + "," + a + ")";
  return newColor;
}
function getbyclass(parent, classname) {
  var result = new Array();
  var allClass = parent.getElementsByTagName('*');
  for (var i = 0; i < allClass.length; i++) {

    if (classname == allClass[i].className)
      result.push(allClass[i]);
  }
  return result;
}


function css(obj, attr, value) {
  if (arguments.length == 2) {
    if (attr == 'opacity') {
      return Math.round(100 * parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]));
    }
    else if (attr == 'translate') {
      var transformStr = obj.currentStyle ? obj.currentStyle['transform'] : document.defaultView.getComputedStyle(obj, false)['webkitTransform'] || document.defaultView.getComputedStyle(obj, false)['msTransform'] || document.defaultView.getComputedStyle(obj, false)['MozTransform'] || document.defaultView.getComputedStyle(obj, false)['OTransform'] || document.defaultView.getComputedStyle(obj, false)['transform'] + "";
      var matrixArray = transformStr.split(",");
      var result = [];
      result.push(parseInt(matrixArray[4]));
      result.push(parseInt(matrixArray[5]));
      return result;
    } else if (attr == 'translateX') {
      var transformStr = obj.currentStyle ? obj.currentStyle['transform'] : document.defaultView.getComputedStyle(obj, false)['webkitTransform'] || document.defaultView.getComputedStyle(obj, false)['msTransform'] || document.defaultView.getComputedStyle(obj, false)['MozTransform'] || document.defaultView.getComputedStyle(obj, false)['OTransform'] || document.defaultView.getComputedStyle(obj, false)['transform'] + "";
      var matrixArray = transformStr.split(",");
      var result = (parseInt(matrixArray[4]));
      return result;
    } else if (attr == 'translateY') {
      var transformStr = obj.currentStyle ? obj.currentStyle['transform'] : document.defaultView.getComputedStyle(obj, false)['webkitTransform'] || document.defaultView.getComputedStyle(obj, false)['msTransform'] || document.defaultView.getComputedStyle(obj, false)['MozTransform'] || document.defaultView.getComputedStyle(obj, false)['OTransform'] || document.defaultView.getComputedStyle(obj, false)['transform'] + "";
      var matrixArray = transformStr.split(",");
      var result = (parseInt(matrixArray[5]));
      return result;
    }
    else {
      return parseInt(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]);
    }
  }
  else if (arguments.length == 3)
    switch (attr) {
      case 'width':
      case 'height':
      case 'paddingLeft':
      case 'paddingTop':
      case 'paddingRight':
      case 'paddingBottom':
        value = Math.max(value, 0);
      case 'left':
      case 'top':
      case 'marginLeft':
      case 'marginTop':
      case 'marginRight':
      case 'marginBottom':
        obj.style[attr] = value + 'px';
        break;
      case 'opacity':
        obj.style.filter = "alpha(opacity:" + value + ")";
        obj.style.opacity = value / 100;
        break;
      case 'translate':
        obj.style.webkitTransform = "translate(" + value[0] + "px," + value[1] + "px)";
        obj.style.msTransform = "translate(" + value[0] + "px," + value[1] + "px)";
        obj.style.MozTransform = "translate(" + value[0] + "px," + value[1] + "px)";
        obj.style.OTransform = "translate(" + value[0] + "px," + value[1] + "px)";
        obj.style.transform = "translate(" + value[0] + "px," + value[1] + "px)";
        break;
      case 'translateX':
        obj.style.webkitTransform = "translateX(" + value + "px)";
        obj.style.msTransform = "translateX(" + value + "px)";
        obj.style.MozTransform = "translateX(" + value + "px)";
        obj.style.OTransform = "translateX(" + value + "px)";
        obj.style.transform = "translateX(" + value + "px)";
        break;
      case 'translateY':
        obj.style.webkitTransform = "translateY(" + value + "px)";
        obj.style.msTransform = "translateY(" + value + "px)";
        obj.style.MozTransform = "translateY(" + value + "px)";
        obj.style.OTransform = "translateY(" + value + "px)";
        obj.style.transform = "translateY(" + value + "px)";
        break;
      default:
        obj.style[attr] = value;
    }

  return function (attr_in, value_in) {
    css(obj, attr_in, value_in)
  };
}


function stop(obj) {
  clearInterval(obj.timer);
}

function move(obj, oTarget, iType, fnCallBack, fnDuring) {
  var fnMove = null;
  if (obj.timer) {
    clearInterval(obj.timer);
  }
  switch (iType) {
    case "buffer":
      fnMove = do_buffer_move;
      break;
    case "flex":
      fnMove = do_flex_move;
      break;
    default:
      fnMove = do_buffer_move;
      break;
  }

  obj.timer = setInterval(function () {
    fnMove(obj, oTarget, fnCallBack, fnDuring);
  }, 30);
}

function do_buffer_move(obj, oTarget, fnCallBack, fnDuring) {
  var bStop = true;
  var attr = '';
  var speed = 0;
  var cur = 0;

  for (attr in oTarget) {
    cur = css(obj, attr);
    if (oTarget[attr] != cur) {
      bStop = false;
      if (attr == "translate") {
        if (!obj.oSpeed1)obj.oSpeed1 = {};
        if (!obj.oSpeed1[attr])obj.oSpeed1[attr] = 0;
        if (!obj.oSpeed)obj.oSpeed = {};
        if (!obj.oSpeed[attr])obj.oSpeed[attr] = 0;
        cur = css(obj, attr);
        obj.oSpeed[attr] = (oTarget[attr][0] - cur[0]) / 5;
        obj.oSpeed[attr] = obj.oSpeed[attr] > 0 ? Math.ceil(obj.oSpeed[attr]) : Math.floor(obj.oSpeed[attr]);
        var value1 = cur[0] + obj.oSpeed[attr];
        obj.oSpeed1[attr] = (oTarget[attr][1] - cur[1]) / 5;
        obj.oSpeed1[attr] = obj.oSpeed1[attr] > 0 ? Math.ceil(obj.oSpeed1[attr]) : Math.floor(obj.oSpeed1[attr]);
        var value2 = cur[1] + obj.oSpeed1[attr];
        var value = [];
        value.push(value1);
        value.push(value2);
        css(obj, attr, value);
      }
      else {
        speed = (oTarget[attr] - cur) / 5;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        css(obj, attr, cur + speed);
      }
    }
  }

  if (fnDuring)fnDuring.call(obj);

  if (bStop) {
    clearInterval(obj.timer);
    obj.timer = null;

    if (fnCallBack)fnCallBack.call(obj);
  }
}

function do_flex_move(obj, oTarget, fnCallBack, fnDuring) {
  var bStop = true;
  var attr = '';
  var speed = 0;
  var cur = 0;

  for (attr in oTarget) {
    if (!obj.oSpeed)obj.oSpeed = {};
    if (!obj.oSpeed[attr])obj.oSpeed[attr] = 0;

    bStop = false;
    if (attr == "translate") {
      if (!obj.oSpeed1)obj.oSpeed1 = {};
      if (!obj.oSpeed1[attr])obj.oSpeed1[attr] = 0;
      cur = css(obj, attr);
      obj.oSpeed[attr] += (oTarget[attr][0] - cur[0]) / 5;
      obj.oSpeed[attr] *= 0.7;
      var value1 = cur[0] + obj.oSpeed[attr];
      obj.oSpeed1[attr] += (oTarget[attr][1] - cur[1]) / 5;
      obj.oSpeed1[attr] *= 0.7;
      var value2 = cur[1] + obj.oSpeed1[attr];
      var value = [];
      value.push(value1);
      value.push(value2);
      css(obj, attr, value);
    } else {
      if (Math.abs(oTarget[attr] - cur) >= 1 || Math.abs(obj.oSpeed[attr]) >= 1) {
        cur = css(obj, attr);
        obj.oSpeed[attr] += (oTarget[attr] - cur) / 5;
        obj.oSpeed[attr] *= 0.7;

        css(obj, attr, cur + obj.oSpeed[attr]);
      }
    }
  }

  if (fnDuring)fnDuring.call(obj);

  if (bStop) {
    clearInterval(obj.timer);
    obj.timer = null;

    if (fnCallBack)fnCallBack.call(obj);
  }
}
function index(current, obj) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i] == current) {
      return i;
    }
  }
} 