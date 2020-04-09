layui.use('element', function(){
  var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
  //监听导航点击
  element.on('nav(demo)', function(elem){
  	var id = '';
  	var ids = elem[0].getAttribute("data-animal-type");
  	if(ids.indexOf("-") == -1){
  		id = ids;
  	}else{
  		ides = ids.split("-");
		if(isManage){
			id = ides[0];
		}else{
			id = ides[1];
		}
  	}
  	$("#iframe").attr("src",id);
    //layer.msg(elem.text());
  });
});