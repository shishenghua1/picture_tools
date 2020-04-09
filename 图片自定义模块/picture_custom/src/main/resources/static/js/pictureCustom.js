$(document).ready(function () {
	var picture_height;
	var picture_width;
	var background_color;
	drawPicture("icon");
	$("#picture-height").bind("input propertychange",function () {
			drawPicture("icon");
    });
    $("#picture-width").bind("input propertychange",function () {
			drawPicture("icon");
    });
    $("#icon-width").bind("input propertychange",function () {
			drawPicture("icon");
	});
	$("#icon-height").bind("input propertychange",function () {
			drawPicture("icon");
	});
    $("#icon-top-height").bind("input propertychange",function () {
			drawPicture("icon");
    });
    $("#icon-left-height").bind("input propertychange",function () {
			drawPicture("icon");
    });
    $("#text").bind("input propertychange",function () {
			drawPicture("icon");
    });
    $("#text-size").bind("input propertychange",function () {
			drawPicture("icon");
    });
    $("#text-top-height").bind("input propertychange",function () {
			drawPicture("icon");
    });
    $("#text-left-height").bind("input propertychange",function () {
			drawPicture("icon");
    });
    $("#border-width").bind("input propertychange",function () {
			drawPicture("icon");
    });
});

var canvas = document.getElementById("myCanvas");
//用HTML5的canvas画图,type为icon表示对小图标切换有影响，other表示无
function drawPicture(type){
	clearCanvas();
	var picture_height = $("#picture-height").val();//图片高度
	var picture_width = $("#picture-width").val();//图片宽度
	if(picture_height==null || picture_height=="" || picture_height=='undefined'){
		picture_height = 32;
		$("#picture-height").attr("value",32);
	}
	if(picture_width==null || picture_width=="" || picture_width=='undefined'){
		picture_width = 32;
		$("#picture-width").attr("value",32);
	}
	var background_color = $("#background-color").val();				//图片背景颜色
	if(background_color==null || background_color=="" || background_color=='undefined'){
		background_color="#0000ff";
	}
	var img = document.getElementById("iconId");						//获取图像对象
	console.log("111"+img);
	var icon_width = $("#icon-width").val() == ""?"30":$("#icon-width").val();							//获取图标宽度
	var icon_height = $("#icon-height").val() == ""?"30":$("#icon-height").val();						//获取图标高度
	var icon_top_height = $("#icon-top-height").val() == ""?"0":$("#icon-top-height").val();			//获取图标距图片上边框距离
	var icon_left_height = $("#icon-left-height").val() == ""?"0":$("#icon-left-height").val();			//获取图标距图片左边框距离
	var picture_text = $("#text").val();																//图片文字
	var text_typeFace = $("#text-typeFace").val();						//文字字体
	var text_size = $("#text-size").val() == ""?"14":$("#text-size").val();															//文字大小
	var text_color= $("#text-color").val() == ""?"#000000":$("#text-color").val();													//文字颜色
	var text_top_height = $("#text-top-height").val() == ""?"0":$("#text-top-height").val();			//文字距图片上边框距离
	var text_left_height = $("#text-left-height").val() == ""?"0":$("#text-left-height").val();			//文字距图片左边框距离
	var border_width = $("#border-width").val() == ""?"0":$("#border-width").val();						//边框宽度
	var border_color = $("#border-color").val();						//边框颜色
	var start_left = (296-picture_width)/2;								//起始位置距左边距离
	var start_top = (568-picture_height)/2;								//起始位置距上边距离
	canvas.width = parseInt(picture_width)+parseInt(border_width);		//设置画板宽度
	canvas.height = parseInt(picture_height)+parseInt(border_width);	//设置画板高度
	canvas.style.top = start_top+"px";
	canvas.style.left = start_left+"px";
	var context=canvas.getContext("2d");								//创建 context 对象
	context.beginPath();
	context.lineJoin='round';
	context.moveTo(0+parseInt(border_width)/2,0+parseInt(border_width)/2);
	context.lineTo(0+parseInt(border_width)/2,0+parseInt(border_width)/2+parseInt(picture_height));
	context.lineTo(0+parseInt(border_width)/2+parseInt(picture_width),0+parseInt(border_width)/2+parseInt(picture_height));
	context.lineTo(0+parseInt(border_width)/2+parseInt(picture_width),0+parseInt(border_width)/2);
	context.fillStyle = background_color;	//填充颜色
  	context.fill();							//开始填充  
  	context.closePath();
  	context.lineWidth = border_width;
  	context.strokeStyle = border_color;
  	context.stroke();
  	context.font = text_size+"px "+text_typeFace;
  	context.fillStyle = text_color;
	context.fillText(picture_text, 0+parseInt(border_width)/2+parseInt(text_left_height)+1, 0+parseInt(border_width)/2+parseInt(text_top_height)+12);
	if(type=='icon'){
		context.drawImage(img,0+parseInt(border_width)/2+parseInt(icon_left_height), 0+parseInt(border_width)/2+parseInt(icon_top_height),parseInt(icon_width),parseInt(icon_height));
	}else{
		img.onload = function(){
			context.drawImage(img,0+parseInt(border_width)/2+parseInt(icon_left_height), 0+parseInt(border_width)/2+parseInt(icon_top_height),parseInt(icon_width),parseInt(icon_height));
		}
	}
}
	
//清空canvas画布
function clearCanvas(){  
    var c=document.getElementById("myCanvas");  
    var cxt=c.getContext("2d");  
    c.height=c.height;  
}

// 验证表单是否为空
function checkConfig(){
	var name = $("#name").val();
	var pictureType = $("#pictureType").val();

	if(typeof name == "undefined" || name == null || name == ""){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图片名字不能为空");
		});
		return false;
	}else{
        var pattern = "^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$";
        if(name.match(pattern)==null){
			layui.use("layer", function () {
				var layer = layui.layer;
				layer.msg("图片名字只含有汉字、数字、字母、下划线且不能以下划线开头和结尾");
			});
            return false;
        }
    }

	//表单提交校验功能
	//图片宽高
	var pictureHeight = $("#picture-height").val();
	var pictureWidth = $("#picture-width").val();
	if(typeof pictureHeight == "undefined" || pictureHeight == null || pictureHeight == ""){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图片长度不能为空");
		});
		return false;
	}else{
		if(isNaN(pictureHeight)){
			layui.use("layer", function () {
				var layer = layui.layer;
				layer.msg("图片长度只能填写数字");
			});
			return false;
		}
	}
	if(typeof pictureWidth == "undefined" || pictureWidth == null || pictureWidth == ""){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图片宽度不能为空");
		});
		return false;
	}else{
		if(isNaN(pictureWidth)){
			layui.use("layer", function () {
				var layer = layui.layer;
				layer.msg("图片宽度只能填写数字");
			});
			return false;
		}
	}
	if(pictureHeight>250){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图片长度最大250px");
		});
		return false;
	}
	if(pictureWidth>250){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图片宽度最大250px");
		});
		return false;
	}
	if(pictureHeight<32){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图片长度最小32px");
		});
		return false;
	}
	if(pictureWidth<32){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图片宽度最小32px");
		});
		return false;
	}

	//图标宽度
	var iconWidth = $("#icon-width").val();
	if(typeof iconWidth != "undefined" && iconWidth != null && iconWidth != "" && isNaN(iconWidth)){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图标宽度只能填写数字");
		});
		return false;
	}
	//图标高度
	var iconHeight = $("#icon-height").val();
	if(typeof iconHeight != "undefined" && iconHeight != null && iconHeight != "" && isNaN(iconHeight)){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图标高度只能填写数字");
		});
		return false;
	}
	//图标距上
	var iconTopHeight = $("#icon-top-height").val();
	if(typeof iconTopHeight != "undefined" && iconTopHeight != null && iconTopHeight != "" && isNaN(iconTopHeight)){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图标距上只能填写数字");
		});
		return false;
	}
	//图标距上
	var iconLeftHeight = $("#icon-left-height").val();
	if(typeof iconLeftHeight != "undefined" && iconLeftHeight != null && iconLeftHeight != "" && isNaN(iconLeftHeight)){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("图标距上只能填写数字");
		});
		return false;
	}
	//文字大小
	var textSize = $("#text-size").val();
	if(typeof textSize != "undefined" && textSize != null && textSize != "" && isNaN(textSize)){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("文字大小只能填写数字");
		});
		return false;
	}
	//文字距上
	var textTopHeight = $("#text-top-height").val();
	if(typeof textTopHeight != "undefined" && textTopHeight != null && textTopHeight != "" && isNaN(textTopHeight)){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("文字距上只能填写数字");
		});
		return false;
	}
	//文字距左
	var textLeftHeight = $("#text-left-height").val();
	if(typeof textLeftHeight != "undefined" && textLeftHeight != null && textLeftHeight != "" && isNaN(textLeftHeight)){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("文字距左只能填写数字");
		});
		return false;
	}
	//边框宽度
	var borderWidth = $("#border-width").val();
	if(typeof borderWidth != "undefined" && borderWidth != null && borderWidth != "" && isNaN(borderWidth)){
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("边框宽度只能填写数字");
		});
		return false;
	}

	download(name,pictureType);

	//下载成功并保存下载记录
	$.ajax({
		//几个参数需要注意一下
		type: "POST",//方法类型
		dataType: "json",//预期服务器返回的数据类型
		url: "savePictureDetails" ,//url
		data: $('#saveData').serialize(),
		success: function (result) {
		},
		error : function() {
		}
	});
	return false;
}

var isExistIconPage = "false";
//图片下载操作,指定图片类型
function download(name,type) {
	//设置图片名字
	var filename = name + '.' + type;
    //设置保存图片的类型
    var imgdata = canvas.toDataURL(type);
	// 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
	if (window.navigator.msSaveOrOpenBlob) {
		var bstr = atob(imgdata.split(',')[1])
		var n = bstr.length
		var u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		var blob = new Blob([u8arr])
		window.navigator.msSaveOrOpenBlob(blob, filename);
	} else {
		// 这里就按照chrome等新版浏览器来处理
		//将mime-type改为image/octet-stream,强制让浏览器下载
		var fixtype = function (type) {
			type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
			var r = type.match(/png|jpeg|bmp|gif/)[0];
			return 'image/' + r;
		}
		imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
		//将图片保存到本地
		var saveFile = function (data, filename) {
			debugger
			var link = document.createElement('a');
			link.href = data;
			link.download = filename;
			var event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			link.dispatchEvent(event);
		}
		saveFile(imgdata, filename);
	}
}

try{
	if (window.ActiveXObject !== undefined){  //兼容IE
	   var xmlDoc= new ActiveXObject("Microsoft.XMLDOM");
	   xmlDoc.async = "false";  
	   xmlDoc.load("../xml/img_address.xml"); 
	}else if(document.implementation&& document.implementation.createDocument){  //兼容火狐
       	try{  
           var xmlDoc = document.implementation.createDocument('', '', null);  
           xmlDoc.async = false;  
           xmlDoc.load("../xml/img_address.xml");  
       	} catch(e){  
           var xmlhttp = new window.XMLHttpRequest();  
           xmlhttp.open("GET","../xml/img_address.xml",false);  
           xmlhttp.send(null);  
           xmlDoc = xmlhttp.responseXML;  
       	}  
	}else{
		layui.use("layer", function () {
			var layer = layui.layer;
			layer.msg("load data error");
		});
 	}
}catch(e){
	layui.use("layer", function () {
		var layer = layui.layer;
		layer.msg(e.message);
	});
}
var nodes=xmlDoc.documentElement.getElementsByTagName("img");
var countValue = nodes.length;
var page = 0;
if(countValue <= 20){
	page = 1;
}else{
	page = Math.ceil(countValue/20);
}
$("#page").val("1");
$("#countPage").val(page);
//console.log(page);

layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;
  
  //创建一个编辑器
  var editIndex = layedit.build('LAY_demo_editor');
  
  $('#imgSelect').on('click', function(){
	  var that = this;
	  var mainHtml = "<div id=\"mainDiv\" style=\"width:190px;height:130px;border:1px solid #666666;\"></div>";
	  var pagHtml = "<div style=\"text-align:right;padding-top:3px;\">"+
		  						"<button style=\"position: absolute;left: 15px;line-height:18px;bottom: 8px;height: 22px;\" class=\"layui-btn layui-btn-primary layui-btn-xs\" onclick=\"closeCanvas()\">关闭</button>"+
	  							"<button style=\"line-height:18px;\" class=\"layui-btn layui-btn-primary layui-btn-xs\" onclick=\"changePage('upward')\"><</button>"+
	  							"<button style=\"margin-left:10px;line-height:18px;\" class=\"layui-btn layui-btn-primary layui-btn-xs\" onclick=\"changePage('next')\">></button>"+
	  							"</div>";
	  if(isExistIconPage=="false"){
		  layer.tips(mainHtml+pagHtml, that,{
			  tips: [3, '#ECECEC'],
			  area: ['221px', 'auto'],
			  time: 0
		  })
	  }
	  isExistIconPage = "true";
	  Initialization(1);
	});
  //自定义验证规则
  form.verify({
    title: function(value){
      if(value.length < 5){
        return '标题至少得5个字符啊';
      }
    }
  });
  form.on('select(typeFace)', function(data){			//字体下拉选事件
	  drawPicture("icon");
  });
  form.on('select(type)', function(data){			//字体下拉选事件
	  
  });
  //监听提交
  form.on('submit(demo1)', function(data){
    layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })
    return false;
  });
 
});

//图标数据初始化
function Initialization(obj){
	$("#mainDiv").empty();
	console.log(obj);
	console.log(obj * 20 > nodes.length);
	var start= (obj-1) * 20;
	var end = obj * 20 > nodes.length ? nodes.length : obj * 20;
	/*if (window.ActiveXObject !== undefined){
		start = (obj-1) * 20;
		end = obj * 20 > nodes.length ? nodes.length : obj * 20;
	}else if(document.implementation&& document.implementation.createDocument){
		start = (obj-1) * 40;
		end = obj * 40 > nodes.length ? nodes.length:obj * 40;
	}*/
	console.log(start);
	console.log(end);
	var contentHtml="";
	for (var i = start ; i < end; i++) {
		if (window.ActiveXObject !== undefined){ 
			var images = nodes.item(i).text;
			console.log(images+"111");
			contentHtml = contentHtml + "<a onclick=\"surebutton(this)\"><img class=\"icon_image\" src=\"../icon_images/"+images+"\"></img><input type=\"hidden\" value=\""+images+"\"></input></a>";
		}else if(document.implementation&& document.implementation.createDocument){ 
			var images = "";
			if(nodes[i].textContent.indexOf(".")>-1){
				images = nodes[i].textContent;
				console.log(images+"2222");
				contentHtml = contentHtml + "<a onclick=\"surebutton(this)\"><img class=\"icon_image\" src=\"../icon_images/"+images+"\"></img><input type=\"hidden\" value=\""+images+"\"></input></a>";
			}
		}else{
			layui.use("layer", function () {
				var layer = layui.layer;
				layer.msg("load data error");
			});
		}
	}
	$(contentHtml).appendTo($("#mainDiv"));
}

//图标点击事件
function surebutton(obj){
	var value = obj.lastChild.value;
	console.log(value.value);
	$("#imgSelect").css("background-image",'url(../icon_images/' + value + ')');
	$("#picture-icon").attr("value",value);
	$("#iconId").attr("src","../icon_images/"+value);
	//设置小图标页面不存在
	isExistIconPage = "false";
	layer.closeAll('tips'); //关闭所有的tips层
	drawPicture("other");
}
//画布关闭事件
function closeCanvas(){
	isExistIconPage = "false";
	layer.closeAll('tips'); //关闭所有的tips层
}

//图标分页
function changePage(obj){
	var page = parseInt($("#page").val());
	var countPage = parseInt($("#countPage").val());
	if(obj == 'upward'){
		if(page == 1){
			return;
		}else{
			page -= 1;
			$("#page").val(page);
			Initialization(page);
		}
	}else{
		var nowPage = page + 1;
		if(nowPage > countPage){
			return;
		}else{
			$("#page").val(nowPage);
			Initialization(nowPage);
		}
	}
}

if(id != ''){
	$.ajax({ 
		  type: "POST",
		  url: "findPicture",
		  data : {
	  			id : id
	  	  },
	  	  dataType: "json",
		  success: function(data){
			  var pictureData = data.data;
			  $("#imgSelect").css("background-image",'url(../icon_images/' + pictureData.icon_name + ')'); 
			  $("#iconId").attr("src","../icon_images/"+pictureData.icon_name);
			  $("#name").val(pictureData.name);
			  $("#picture-height").val(pictureData.height);
			  $("#picture-width").val(pictureData.width);
			  $("#background-color").val(pictureData.background_color);
			  $("#picture-icon").val(pictureData.icon_name);
			  $("#icon-left-height").val(pictureData.icon_left_height);
			  $("#icon-top-height").val(pictureData.icon_top_height);
			  $("#text").val(pictureData.text);
			  $("#text-size").val(pictureData.font_size);
			  $("#text-typeFace").val(pictureData.font_typeface);
			  $("#text-color").val(pictureData.font_color);
			  $("#text-left-height").val(pictureData.text_left_height);
			  $("#text-top-height").val(pictureData.text_top_height);
			  $("#border-width").val(pictureData.border_width);
			  $("#border-color").val(pictureData.border_color);
			  $("#pictureType").val(pictureData.type);
			  $("#icon-width").val(pictureData.icon_width);
			  $("#icon-height").val(pictureData.icon_height);
			  iconId.onload = function() {
				  drawPicture("other");
			   }
		  }
	});
}
