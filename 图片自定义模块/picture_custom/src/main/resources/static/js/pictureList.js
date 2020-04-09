
searchData();
function searchData(){
	
	layui.use(['form', 'layedit', 'laydate','table'], function(){
		var form = layui.form
		,layer = layui.layer
		,layedit = layui.layedit
		,laydate = layui.laydate;
		var table = layui.table;
	  
		//日期
		laydate.render({
			elem: '#createTime'
		});
		//创建一个编辑器
		var editIndex = layedit.build('LAY_demo_editor');
	  
		//自定义验证规则
		form.verify({
			title: function(value){
				if(value.length < 5){
					return '标题至少得5个字符啊';
				}
			}
		});
		form.on('select(types)', function(data){			//字体下拉选事件
	  	
		});
	  
		table.render({
			elem: '#data'
			,url:'searchPictureList'
			,method: 'post'
		    ,where: { 
				name: $("#name").val(),
				type: $("#type").val(),
				createTime: $("#createTime").val()
			}
			,page: {
				layout: ['count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
				,limit: 8
	      		,groups: 3 //只显示 1 个连续页码
	      		,first: false //不显示首页
	      		,last: false //不显示尾页
	      
			}
	    	,cols: [[
	    		{field:'name', width:'30%', title: '图片名称', align: 'center'}
	    		,{field:'type', width:'10%', title: '图片格式', align: 'center'}
	    		,{field:'cretae_userid', width:'20%', title: '创建人', align: 'center'}
	    		,{field:'create_time', width:'20%', title: '创建时间', align: 'center', templet: '<div>{{ layui.laytpl.toDateString(d.create_time) }}</div>'}
	    		,{field:'sign', width:'20%', title: '操作', align: 'center', toolbar: '#operate'}
	    	]]
	    	,id: 'dataTable'
		});
		
		table.on('tool(dataTable)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		    var data = obj.data //获得当前行数据
		    ,layEvent = obj.event; //获得 lay-event 对应的值
		    console.log(data);
		    if(layEvent === 'edit'){
		    	//window.location.href = "main?userIdDes="+'0e9c5bf1fc575c526e8662b6d7f37c27'+"id="+data.id;
		    	parent.$("#iframe").attr("src","pictureCustom?id="+data.id);
		    }
		    if(layEvent === 'delete'){
		    	$.ajax({ 
		    		  type: "POST",
		    		  url: "deletePicture",
		    		  data : {
			  	  			id : data.id
			  	  	  }, 
		    		  success: function(data){
		    			  if(data){
		    				  table.reload('dataTable', {
		    					  
		    				  });
		    			  }else{
							  layui.use("layer", function () {
								  var layer = layui.layer;
								  layer.msg("删除失败");
							  });
		    			  }
		    		  }
		    	});
		    }
		  });
		
		//时间戳的处理
		layui.laytpl.toDateString = function(d, format){
			var date = new Date(d || new Date())
			,ymd = [
				this.digit(date.getFullYear(), 4)
				,this.digit(date.getMonth() + 1)
				,this.digit(date.getDate())
			]
			,hms = [
				this.digit(date.getHours())
				,this.digit(date.getMinutes())
				,this.digit(date.getSeconds())
			];
		
			format = format || 'yyyy.MM.dd HH:mm:ss'; // yyyy-MM-dd HH:mm:ss
		
			return format.replace(/yyyy/g, ymd[0])
			.replace(/MM/g, ymd[1])
		  	.replace(/dd/g, ymd[2])
		  	.replace(/HH/g, hms[0])
		  	.replace(/mm/g, hms[1])
		  	.replace(/ss/g, hms[2]);
		};
		//数字前置补零
		layui.laytpl.digit = function(num, length, end){
			var str = '';
			num = String(num);
			length = length || 2;
			for(var i = num.length; i < length; i++){
				str += '0';
			}
			return num < Math.pow(10, length) ? str + (num|0) : num;
		};
	  
	});
	
}