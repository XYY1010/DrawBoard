var canvas = document.getElementById('canvas');

var context = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

//获取工具按钮的标签
//获取画笔标签
var Brush=document.getElementById('means_brush');//获取油漆桶标签
var Paint=document.getElementById('means_paint');
//获取橡皮标签
var Eraser=document.getElementById('means_eraser');
//获取吸管标签
var Rotate=document.getElementById('means_rotate');
//获取放大标签
var ZoomIn=document.getElementById('means_zoom_in');
//获取缩小标签
var ZoomOut=document.getElementById('means_zoom_out');

//获取形状按钮的标签
//获取画线标签
var Line=document.getElementById('shape_line');
//获取画圆圈的标签
var Arc=document.getElementById('shape_arc');
//获取画方框的标签
var Rect=document.getElementById('shape_rect');
//获取画多标签的标签
var Poly=document.getElementById('shape_poly');
//获取画圆形(填充)
var ArcFill=document.getElementById('shape_arcfill');
//获取画矩形的标签
var RectFill=document.getElementById('shape_rectfill');
//把12个工具和形状标签放到一个数组中
var actions=[Paint,Brush,Eraser,Rotate,ZoomIn,ZoomOut,Line,Arc,Rect,Poly,ArcFill,RectFill];

//获取颜色按钮
var ColorRed=document.getElementById('red');
var ColorGreen=document.getElementById('green');
var ColorBlue=document.getElementById('blue');
var ColorYellow=document.getElementById('yellow');
var ColorWhite=document.getElementById('white');
var ColorBlack=document.getElementById('black');
var ColorPink=document.getElementById('pink');
var ColorPurPle=document.getElementById('purple');
var ColorCyan=document.getElementById('cyan');
var ColorOrange=document.getElementById('orange');
//把10中颜色标签对象放到一个数组中
var colors=[ColorRed,ColorGreen,ColorBlue,ColorYellow,ColorWhite,ColorBlack,ColorPink,ColorPurPle,ColorCyan,ColorOrange];

//获取线宽标签
var Width_1=document.getElementById('width_1');
var Width_3=document.getElementById('width_3');
var Width_5=document.getElementById('width_5');
var Width_8=document.getElementById('width_8');
var lineWidths=[Width_1,Width_3,Width_5,Width_8];

// 设置初始值
// 默认选中画笔工具
drawPencil(0);
// 设置默认颜色
setColor(ColorRed, 0);
// 设置默认线宽
setLineWidth(0);

function setStatus(Arr, num, type) {
  for (var i = 0; i < Arr.length; i++) {
    // 设置选中的标签改变 CSS 属性
    if (i == num) {
      // 设置改变 CSS 的样式是背景色还是边框
      if (type == 1) {
        Arr[i].style.background = 'yellow';
      } else {
        Arr[i].style.border = '1px solid #FFF';
      }
    } else {  // 设置未选中的组中的其他标签改变颜色
      if (type == 1) {
        Arr[i].style.background = '#ccc';
      } else {
        Arr[i].style.border = '1px solid #000';
      }
    }
  }
}

function clearImg() {
  // 画布清除方法
  context.clearRect(0, 0, canvas.width, canvas.height);
}

$('#file').change(function () {
  var file = this.files[0];
  if (window.FileReader) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    // 监听文件读取结束后事件
    reader.onloadend = function (e) {
      var newImage = new Image();
      newImage.src = e.target.result;
      newImage.onload = function () {
        var pattern = context.createPattern(newImage, 'no-repeat');
        context.fillStyle = pattern;
        context.fillRect(0, 0, canvas.width, canvas.height);
      };
    };
  }
});

// 列出所有的按钮对应的函数
// 铅笔工具的函数
function drawPencil(num) {
  setStatus(actions, num, 1);
  var flag = 0;
  canvas.onmousedown = function (evt) {
    evt = window.event || evt;
    var startX = evt.pageX - this.offsetLeft;
    var startY = evt.pageY - this.offsetTop;
    context.beginPath();
    context.moveTo(startX, startY);
    flag = 1;
  };

  canvas.onmousemove = function (evt) {
    evt = window.event || evt;
    var endX = evt.pageX - this.offsetLeft;
    var endY = evt.pageY - this.offsetTop;
    if (flag) {
      context.lineTo(endX, endY);
      context.stroke();
    }
  };

  canvas.onmouseup = function () {
    flag = 0;
  };
}

function drawBrush(num) {
  setStatus(actions, num, 1);
  var flag = 0;         // 设置标志位 -> 检测鼠标是否按下
  canvas.onmousedown = function (evt) {
    evt = window.event || evt;
    var startX = evt.pageX - this.offsetLeft;
    var startY = evt.pageY - this.offsetTop;
    context.save();
    context.lineWidth = 20;
    context.beginPath();
    context.moveTo(startX, startY);
    flag = 1;
  };

  // 鼠标移动的时候 -> 不同的绘图（获取鼠标的位置）
  canvas.onmousemove = function (evt) {
    evt = window.event || evt;
    var endX = evt.pageX - this.offsetLeft;
    var endY = evt.pageY - this.offsetTop;
    // 判断一下鼠标是否按下
    if (flag) {
      // 移动的时候设置路径并画出来
      context.lineTo(endX, endY);
      context.stroke();
    }
  };

  // 鼠标抬起的时候结束绘图
  canvas.onmouseup = function () {
    flag = 0;
    context.restore();
  };
}

function drawEraser(num) {
  setStatus(actions, num, 1);
  var flag = 0;
  canvas.onmousedown = function (evt) {
    evt = evt ? evt : window.event;
    var startX = evt.pageX - this.offsetLeft;
    var startY = evt.pageY = this.offsetTop;
    flag = 1;
    context.clearRect(startX-10, startY-10, 10, 10);
  };

  canvas.onmousemove = function(evt) {
    evt = evt ? evt : window.event;
    var endX = evt.pageX - this.offsetLeft;
    var endY = evt.pageY - this.offsetTop;
    if (flag) {
      context.clearRect(endX-10, endY-10, 10, 10);
    }
  }

  canvas.onmouseup = function (evt) {
    flag = 0;
  };

  canvas.onmouseout = function (evt) {
    flag = 0;
  };
}

function drawRotate(num) {
  setStatus(actions,num,1);
  context.save();
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData);
  context.rotate(-Math.PI*0.5);
  context.putImageData(imageData, 0, 0);
  context.restore();
}

function drawZoomIn(num){
  setStatus(actions,num,1);
  width = width + 10;
  height = height + 10;
  canvas.style.width=parseInt(width) +'px';
  canvas.style.height=parseInt(height) +'px';
}

function drawZoomOut(num){
  setStatus(actions,num,1);
  width = width - 10;
  height = height - 10;
  canvas.style.width=parseInt(width) +'px';
  canvas.style.height=parseInt(height) +'px';
}

function line(num){
  var startX, startY, endX, endY;
  setStatus(actions,num,1);
  canvas.onmousedown=function(evt){
    evt=evt?evt:window.event;
    startX = evt.pageX - this.offsetLeft;
    startY = evt.pageY - this.offsetTop;
    context.closePath();
    context.beginPath();
    context.moveTo(startX,startY); //��ʼλ��
  };
  canvas.onmouseup=function(evt){
    evt=evt?evt:window.event;
    endX = evt.pageX - this.offsetLeft;
    endY = evt.pageY - this.offsetTop;
    context.lineTo(endX,endY);
    context.stroke();
  };
  canvas.onmousemove=null;
  canvas.onmouseout=null;
}

function arc(num){
  var startX, startY, endX, endY;
  setStatus(actions,num,1);
  canvas.onmousedown=function(evt){
    evt=evt?evt:window.event;
    startX = evt.pageX - this.offsetLeft;
    startY = evt.pageY - this.offsetTop;
    context.closePath();
    context.beginPath();
  }
  canvas.onmouseup=function(evt){
    evt=evt?evt:window.event;
    endX = evt.pageX - this.offsetLeft;
    endY = evt.pageY - this.offsetTop;
    context.arc(startX,startY,Math.sqrt(Math.pow((endX-startX),2)+Math.pow((endY-startY),2)),0,360,false);
    context.stroke();
  }
  canvas.onmousemove=null;
  canvas.onmouseout=null;
}

function rect(num){
  var startX, startY, endX, endY;
  setStatus(actions,num,1);
  canvas.onmousedown=function(evt){
    evt=evt?evt:window.event;
    startX = evt.pageX - this.offsetLeft;
    startY = evt.pageY - this.offsetTop;
  }
  canvas.onmouseup=function(evt){
    evt=evt?evt:window.event;
    endX = evt.pageX - this.offsetLeft;
    endY = evt.pageY - this.offsetTop;
    context.strokeRect(startX,startY,endX-startX,endY-startY);
  }
  canvas.onmousemove=null;
  canvas.onmouseout=null;
}

function poly(num){
  var startX, startY, endX, endY;
  setStatus(actions,num,1);
  canvas.onmousedown=function(evt){
    evt=evt?evt:window.event;
    startX = evt.pageX - this.offsetLeft;
    startY = evt.pageY - this.offsetTop;

    context.beginPath();
  }
  canvas.onmouseup=function(evt){
    evt=evt?evt:window.event;
    endX = evt.pageX - this.offsetLeft;
    endY = evt.pageY - this.offsetTop;
    context.moveTo(endX,endY);
    context.lineTo(startX-(endX-startX),endY);
    context.lineTo(startX,startY-Math.sqrt(Math.sqrt(endX-startX,2)+Math.sqrt(endY-startY,2)));
    context.closePath();
    context.stroke();

  }
  canvas.onmousemove=null;
  canvas.onmouseout=null;
}

function arcFill(num){
  var startX, startY, endX, endY;
  setStatus(actions,num,1);
  canvas.onmousedown=function(evt){
    evt=evt?evt:window.event;
    startX = evt.pageX - this.offsetLeft;
    startY = evt.pageY - this.offsetTop;
    context.closePath();
    context.beginPath();
  }
  canvas.onmouseup=function(evt){
    evt=evt?evt:window.event;
    endX = evt.pageX - this.offsetLeft;
    endY = evt.pageY - this.offsetTop;
    context.arc(startX,startY,Math.sqrt(Math.pow((endX-startX),2)+Math.pow((endY-startY),2)),0,360,false);
    context.fill();
  }
  canvas.onmousemove=null;
  canvas.onmouseout=null;
}

function rectFill(num){
  var startX, startY, endX, endY;
  setStatus(actions,num,1);
  canvas.onmousedown=function(evt){
    evt=evt?evt:window.event;
    startX = evt.pageX - this.offsetLeft;
    startY = evt.pageY - this.offsetTop;
  }
  canvas.onmouseup=function(evt){
    evt=evt?evt:window.event;
    endX = evt.pageX - this.offsetLeft;
    endY = evt.pageY - this.offsetTop;
    context.fillRect(startX,startY,endX-startX,endY-startY);
  }
  canvas.onmousemove=null;
  canvas.onmouseout=null;
}

function setLineWidth(num) {
  setStatus(lineWidths, num, 1);
  switch (num) {
    case 0:
      context.lineWidth = 1;
      break;
    case 1:
      context.lineWidth = 3;
      break;
    case 2:
      context.lineWidth = 5;
      break;
    case 3:
      context.lineWidth = 8;
      break;
    default:
      break;
  }
}

function setColor(obj,num){
  setStatus(colors,num);
  context.strokeStyle=obj.id;
  context.fillStyle=obj.id;
}
