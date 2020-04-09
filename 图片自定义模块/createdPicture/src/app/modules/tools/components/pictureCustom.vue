<template>
 	<div class="pictureCustom">
        <header></header>  
	    <el-row>
			<el-col  id="iconConfig" :style="{'height':containerHeight}">
				 <el-row id="newIconHeader">
					     创作图标
				  </el-row>
                 <el-form :inline="true" :model="formIcon" :rules="rules"  class="demo-form-inline" id="formCon">
					<el-row class="formRow"  id="iconNameCon">
							<el-form-item label="图标名称" class="setWidth" prop="iconName">
								<el-row>
									<el-input v-model="formIcon.iconName"  @input="pictureNameChange" @focus="inputClick"    @keyup.native="keyCodeEvent"  placeholder="请输入名称"></el-input>					
										<ul id="pictureType" v-show='typeShow' class="ulCon">
											<li @click="selectType">{{formIcon.iconName.replace(/(.jpg|.png)/g,"")}}.jpg</li>
											<li @click="selectType">{{formIcon.iconName.replace(/(.jpg|.png)/g,"")}}.png</li>
										</ul>
								</el-row>						
					       </el-form-item>								
							<el-form-item label="颜色"  class="noWidth">								    
									<el-row id="iconConColor" class="colorCon">
									  <el-input v-model="formIcon.iconConColor" placeholder="" readOnly="readOnly" ></el-input> 
									  <input id="iconCon-colors" class="selectColor"/>
								   </el-row>				
							</el-form-item>
						   <el-form-item label="宽"  class="minWidth"  prop="iconWidth">
								<el-row id="iconWidthCon">
									<el-input v-model="formIcon.iconWidth"   @wheel.native="scrollWidth" placeholder=""></el-input>					
									<i class="el-icon-caret-top addTriangle" @click="addIconWidth"></i>
									<i class="el-icon-caret-bottom reduceTriangle" @click="reduceIconWidth"></i>
								</el-row>						
					       </el-form-item>
						   <el-form-item label="高" class="minWidth">
								<el-row id="iconHeightCon">
									<el-input v-model="formIcon.iconHeight" @wheel.native="scrollHeight" placeholder=""></el-input>					
										<i class="el-icon-caret-top addTriangle" @click="addIconHeight"></i>
									    <i class="el-icon-caret-bottom reduceTriangle" @click="reduceIconHeight"></i>
								</el-row>						
					       </el-form-item>
					</el-row>

					<el-row class="formRow" id="iconCon">
							<el-form-item label="选择图形" class="setWidth" prop="" >
								<el-row >
									<el-input  placeholder="" readOnly="readOnly" @focus="openIconList"></el-input>	
									<img id="selectedIcon" @click="openIconList" :src="formIcon.selectedIconSrc" alt="">
									<el-row id="iconListMark" v-show="chooseIconShow" class="ulCon" >
										   <el-row id="iconListCon" v-show="chooseIconShow" >
												<el-col id="tagChoose">
													<ul>
														<li v-for="(tag,index) in allTagList" :key="index" style="display:inline-block;padding:0 10px;margin-right:10px;">{{tag.name}}</li>
													</ul>
												</el-col>
												<el-col id="iconListParent">
													<ul id="iconList" class="ulCon">
														<template  v-for="(imgSrc,index) in formIcon.iconSrcArr">
																<li v-if="index%6==0"  :key="index">
																	<el-row>
																		<el-col :span="4" v-for="(imgSrc1,index1) in formIcon.iconSrcArr.slice(index,index+6)" :key="index1">
																			<img :src="iconSrcBase+imgSrc1.path"  @click="chooseIcon" class="positonIcon"/>														
																		</el-col>																	
																	</el-row>
																</li>	
														</template>										
													</ul>
												</el-col>
												
											</el-row>
									</el-row>			
									
								</el-row>						
					       </el-form-item>								
							<el-form-item label="颜色"  class="noWidth">
								    <el-row id="iconColor" class="colorCon">
									  <el-input v-model="formIcon.iconColor" placeholder="" readOnly="readOnly"></el-input> 
									  <input id="background-colors" :value="formIcon.iconColor" class="selectColor"/>
								   </el-row>					
							</el-form-item>
						   <el-form-item label="大小"  class="minWidth"  prop="iconSize">
								 <el-select v-model="formIcon.iconSize" placeholder="请选择">
									<el-option label="16*16" value="min"></el-option>
									<el-option label="32*32" value="small"></el-option>
									<el-option label="64*64" value="middle"></el-option>
									<el-option label="128*128" value="big"></el-option>
								</el-select>						
					       </el-form-item>
						   <el-form-item label="位置" class="minWidth">
							   <el-row>
								   <el-input  placeholder="" v-model="formIcon.iconPosition" @focus="iconPositionShow" readOnly="readOnly"></el-input>
									<ul id="iconPosition" v-show="chooseIconPositionShow" class="ulCon">
											<li >
												<el-row>
													<el-col :span="8">
														<i positionId="leftTop"  @click="chooseIconPosition" class="el-icon-set-up positonIcon" ></i>
														<span class="tipInfo">左上</span>
													</el-col>
													<el-col :span="8">
														<i positionId="middleTop" @click="chooseIconPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">中上</span>
													</el-col>
													<el-col :span="8">
														<i positionId="rightTop" @click="chooseIconPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">右上</span>
													</el-col>
												</el-row>
											</li>
											<li >
												<el-row>
													<el-col :span="8">
														<i positionId="leftMiddle" @click="chooseIconPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">左中</span>
													</el-col>
													<el-col :span="8">
														<i positionId="middle" @click="chooseIconPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">居中</span>
													</el-col>
													<el-col :span="8">
														<i positionId="rightMiddle" @click="chooseIconPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">右中</span>
													</el-col>
												</el-row>
											</li>
											<li >
												<el-row>
													<el-col :span="8">
														<i positionId="leftBottom" @click="chooseIconPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">左下</span>
													</el-col>
													<el-col :span="8">
														<i positionId="middleBottom" @click="chooseIconPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">中下</span>
													</el-col>
													<el-col :span="8">
														<i positionId="rightBottom" @click="chooseIconPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">右下</span>
													</el-col>
												</el-row>
											</li>
									</ul>
							   </el-row>
									
					       </el-form-item>
					</el-row>

						<el-row class="formRow"  id="fontCon">
							<el-form-item label="搭配文字" class="setWidth" prop="iconFont" >
								<el-row>
									<el-input  v-model="formIcon.iconFont"></el-input>					
									
								</el-row>						
					       </el-form-item>								
							<el-form-item label="颜色"  class="noWidth">	
								<el-row id="fontColor" class="colorCon">
									<el-input v-model="formIcon.fontColor" placeholder="" readOnly="readOnly"></el-input> 
									<input id="text-colors" class="selectColor"/>
								</el-row>				
							</el-form-item>
						   <el-form-item label="字体"  class="minWidth"  prop="fontFamily">
								 <el-select v-model="formIcon.fontFamily" placeholder="请选择">
									<el-option label="Arial" value="Arial"></el-option>
									<el-option label="宋体" value="song"></el-option>
									<el-option label="黑体" value="hei"></el-option>
									<el-option label="楷书" value="kai"></el-option>
									<el-option label="隶书" value="li"></el-option>
								</el-select>						
					       </el-form-item>
						   <el-form-item label="字号" class="minWidth" prop="fontSize">
								<el-row id="fontSizeCon">
									    <el-input v-model.number="formIcon.fontSize"   @wheel.native="scrollFontSize"  placeholder=""></el-input>					
										<i class="el-icon-caret-top addTriangle" @click="addSize"></i>
									    <i class="el-icon-caret-bottom reduceTriangle" @click="reduceSize"></i>
								</el-row>						
					       </el-form-item>					    
					</el-row>

					<el-row  class="formRow" id="fontPositionCon">
					    <el-form-item label="位置" class="wholeWidth">
							  <el-row>
								   <el-input  placeholder="" readOnly="readOnly"  v-model="formIcon.fontPosition" @focus="fontPositionShow" ></el-input>
									<ul id="fontPosition" v-show="chooseFontPositionShow" class="ulCon">
											<li >
												<el-row>
													<el-col :span="8">
														<i positionId="leftTop"  @click="chooseFontPosition" class="el-icon-set-up positonIcon" ></i>
														<span class="tipInfo">左上</span>
													</el-col>
													<el-col :span="8">
														<i positionId="middleTop" @click="chooseFontPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">中上</span>
													</el-col>
													<el-col :span="8">
														<i positionId="rightTop" @click="chooseFontPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">右上</span>
													</el-col>
												</el-row>
											</li>
											<li >
												<el-row>
													<el-col :span="8">
														<i positionId="leftMiddle" @click="chooseFontPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">左中</span>
													</el-col>
													<el-col :span="8">
														<i positionId="middle" @click="chooseFontPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">居中</span>
													</el-col>
													<el-col :span="8">
														<i positionId="rightMiddle" @click="chooseFontPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">右中</span>
													</el-col>
												</el-row>
											</li>
											<li >
												<el-row>
													<el-col :span="8">
														<i positionId="leftBottom" @click="chooseFontPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">左下</span>
													</el-col>
													<el-col :span="8">
														<i positionId="middleBottom" @click="chooseFontPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">中下</span>
													</el-col>
													<el-col :span="8">
														<i positionId="rightBottom" @click="chooseFontPosition" class="el-icon-set-up positonIcon"></i>
														<span class="tipInfo">右下</span>
													</el-col>
												</el-row>
											</li>
									</ul>
							   </el-row>					
						 </el-form-item>
					</el-row>
					<el-row  class="formRow" id="iconBorderCon">
							<el-form-item label="边框" class="halfWidth">
								<el-row  class="block">		
										<el-slider :step="10" :format-tooltip="formatTooltip" v-model="formIcon.iconBorderWidth"></el-slider>									
								</el-row>													
							</el-form-item>
							<el-form-item label="颜色"  class="noWidth">
								<el-row id="borderColor" class="colorCon">
									<el-input v-model="formIcon.iconBorderColor" placeholder="" readOnly="readOnly" ></el-input> 
									<input id="border-colors" class="selectColor"/>
								</el-row>								
											
							</el-form-item>	
							<el-form-item label="圆角"  class="minWidth">
										<el-switch
											v-model="formIcon.iconRadius"
											active-color="是"
  											inactive-color="否">
										</el-switch>				
							</el-form-item>							
					</el-row>
					<el-row class="formRow">
						<el-form-item label="标签" class="wholeWidth" >
								<el-row>
									<el-input placeholder="" readOnly="readOnly"></el-input>
									<el-row id="selectedTagCon" style="width:calc(100% - 40px)">
										<el-col v-for="(tag,index) in selectedTag"  :key="index" style="margin-right:10px;width:auto">
											<span >{{tag}}</span>
										    <i class="el-icon-close" @click="deleteTag"></i>
										</el-col>
										
									</el-row>
									<i class='el-icon-caret-bottom openSearchBtn' @click="searchListShow"></i>
									<ul id="tagListContainer" v-show="chooseTagShow" class="ulCon">
										<el-col style="width:calc(100% - 20px)">
											<el-input placeholder="请输入名称" v-model="searchTagName" @change="searchTag" id="searchInput"></el-input>	
										</el-col>	
										<ul id="tagList" style="padding-top:50px">
											 <li v-for="(tag,index) in tagList" :key="index"   @click="tagSelect">{{tag.name}}</li>
										</ul>									 
										
									</ul>			
									
								</el-row>						
					    </el-form-item>
					</el-row>
			
				
					</el-form>
			</el-col>
			<el-col  id="iconCreate" :style="{'height':containerHeight}">
				 <el-row id="newIconHeader">
				 </el-row>
				 <el-row id="iconCreateCon">
					 	<el-row id="canvasCon" >
							<img style="display: none;" id="iconId" alt="The Scream" :src="formIcon.selectedIconSrc"/>
							<canvas id="myCanvas" width="0" height="0" :style="{'position':'relative','border-radius':borderRadius}"></canvas>
							<canvas id="iconCanvas" width="0" height="0" :style="{'position':'absolute','border-radius':borderRadius}"></canvas>
						</el-row> 
				        <el-row>
								<el-checkbox label="公开" v-model="checkedIf"></el-checkbox>	
						</el-row>
						 <el-row  class="userInfoRow">
						    <el-col :span="12"> 
								<i class="el-icon-user"></i>
								<span>用户名</span>
							</el-col>						
						    <el-col :span="12">
								<i class="el-icon-date"></i>
								<span>2019-12-09</span>
							</el-col>		
						</el-row>
						<el-row  class="userInfoRow">
						    <el-col :span="12"> 
								<i class="el-icon-download"></i>
								<span>525</span>
							</el-col>						
						    <el-col :span="12">
								<i class="el-icon-printer"></i>
								<span>525</span>
							</el-col>		
						</el-row>
						<el-row id="funBtns">
							  <el-button id="completeBtn" type="primary" @click="saveIconConfig">完成</el-button>							  
							  <el-button id="downLoadBtn" type="primary">下载</el-button>
						</el-row>
				 </el-row>
				
	    	

			</el-col>
		</el-row>
		
	</div>
</template>

<script>

export default({
  components:{
  },
  data(){
      return{
		containerHeight:380,//左右容器高度
		typeShow:false,
		chooseIconPositionShow:false,//矢量图位置选择下拉框是否显示
		chooseFontPositionShow:false,//文字位置选择下拉框是否显示
		chooseIconShow:false,//矢量图选择列表
		chooseTagShow:false,//标签选择列表
		borderRadius:"0",
		iconSrcBase:this.iconSrcBase,
		formIcon:{
			 iconName:"",//图标名称
			 iconWidth:"128",//图标的宽
			 iconHeight:"128",//图标的高
			 iconConColor:"#6aa84f",//图标颜色
			 iconSrcArr:[],//市场图片集合
			 selectedIconSrc:"",//被选中的矢量图
			 iconSize:"small",//矢量图大小
			 iconColor:"",//矢量图颜色
			 iconPosition:"middle",//矢量图位置
			 iconFont:"文字内容",//图标中的文字
			 fontColor:"#000000",//文字的颜色
			 fontFamily:"song",//字体
			 fontSize:14,//字号
			 fontPosition:"middleBottom",//文字位置
			 iconBorderWidth:20,//边框宽度百分比（数值为2）
			 iconBorderColor:"#000000",
			 iconRadius:true,//是否圆角			 
		},
		rules:{
			    "iconName":[									
								{pattern:'^[a-zA-Z0-9\u4e00-\u9fa5_]{1,10}(.jpg|.png){0,1}$',message:'名称由1~10个汉字、字母、数字、下划线组成'},
								{min:1,max:14,message:'名称范围是1~10个字'}, 
						],
				"iconWidth":[	{pattern:'^1[6-9]$|^[2-9][0-9]$|^1[0-9]{2}$|^2[0-3][0-9]$|^240$',message:'宽度为16~240的整数'}],
			    "iconHeight":[	{pattern:'^1[6-9]$|^[2-9][0-9]$|^1[0-9]{2}$|^2[0-3][0-9]$|^240$',message:'高度为16~240的整数'}],				         
				"fontSize":[ { type: 'integer', message: '字号必须是整数'}]
		},
		checkedIf:false,
		tagList:[],//搜索出来的标签类别
		allTagList:[],
		searchTagName:"",
		selectedTag:["123","323"],//被选中的标签
    }
  },  
  watch:{
	   formIcon:{
        deep:true,
        handler:function(newV,oldV){
           this.drawPicture()
        }
	  },
	  'formIcon.iconRadius'(){
		  this.$nextTick(function(){
               if(this.formIcon.iconRadius){
				   this.borderRadius="8px";
			   }else{
				   this.borderRadius="0"
			   }
		   }
	     )
	  }
  }, 
  created(){
/* 	require("../assets/js/layui/css/layui.css"); */
    require("../assets/js/jquery-color-picker/spectrum.css");
    require ("../assets/js/jquery-color-picker/spectrum.js"); 
    require ("../assets/js/jquery-color-picker/docs/docs.js");
   /*  require ("../assets/js/layui/layui.js"); */
  },
  mounted(){
	var thisBodyHeight=document.body.clientHeight>580?document.body.clientHeight:580;
	this.containerHeight=thisBodyHeight-200+"px";	
	window.changeIconConColor = this.changeIconConColor; 
	window.changeIconColor = this.changeIconColor; 
	window.changeIconBorderColor = this.changeIconBorderColor; 
	window.changeIconFontColor = this.changeIconFontColor; 	
	this.drawPicture();

    var vueSelf=this;
	$(document).mousedown(function(e){
		if(!$(e.target).parents().hasClass("ulCon")){
			/* vueSelf.typeShow=false; */
			vueSelf.chooseIconPositionShow=false;//矢量图位置选择下拉框是否显示
			vueSelf.chooseFontPositionShow=false;//文字位置选择下拉框是否显示
			vueSelf.chooseIconShow=false;//矢量图选择列表
			vueSelf.chooseTagShow=false;//标签选择列表
		}
		
	})
 },
  methods:{
	keyCodeEvent(event){
		debugger
		if(event.keyCode==38){
			//向上
			if($("#pictureType li.active").length==1){
				$("#pictureType li.active").removeClass("active").siblings().addClass("active")
			}else{
				$("#pictureType li:last-of-type").addClass("active")
			}			

		}else if(event.keyCode==40){
			//向下
           	if($("#pictureType li.active").length==1){
				$("#pictureType li.active").removeClass("active").siblings().addClass("active")
			}else{
				$("#pictureType li:first-of-type").addClass("active")
			}
		}else if(event.keyCode==13){
			//向下
			var vueSelf=this;
            vueSelf.formIcon.iconName=$("#pictureType li.active").text();
		   vueSelf.typeShow=false;
		   $(event.target).blur();
		}

	},
	changeIconConColor(iconConColor){
        this.formIcon.iconConColor=iconConColor;
	},
	changeIconColor(iconColor){
		this.formIcon.iconColor=iconColor;
	},
	changeIconBorderColor(iconBorderColor){
        this.formIcon.iconBorderColor=iconBorderColor;
	},
	changeIconFontColor(iconFontColor){
        this.formIcon.fontColor=iconFontColor;
	},
    selectType(e){
      var vueSelf=this;
      vueSelf.formIcon.iconName=$(e.target).text();
      vueSelf.typeShow=false;
	},
	inputClick(){
		this.formIcon.iconName=this.formIcon.iconName.replace(/(.jpg|.png)/g,"");
		if(this.formIcon.iconName){
			this.typeShow=true;	
		}		
	},
    pictureNameChange(){
		if(this.formIcon.iconName){			
     		 this.typeShow=true;
		}else{
			this.typeShow=false;
		};
	},
	fontPositionShow(){
      this.chooseFontPositionShow=true;
	},
	chooseFontPosition(e){
      var vueSelf=this;
      vueSelf.formIcon.fontPosition=$(e.target).attr("positionId");
      vueSelf.chooseFontPositionShow=false;
	},
	iconPositionShow(){
      this.chooseIconPositionShow=true;
	},
	chooseIconPosition(e){
      var vueSelf=this;
      vueSelf.formIcon.iconPosition=$(e.target).attr("positionId");
      vueSelf.chooseIconPositionShow=false;
	},
	searchListShow(){
		this.chooseTagShow=true;
	},
	tagSelect(e){
		//选择标签
		var seletedTag=$(event.target).text();
		if(this.selectedTag.indexOf(seletedTag)==-1){
			this.selectedTag.push(seletedTag);
		}else{
			this.selectedTag.splice(this.selectedTag.indexOf(seletedTag),1);
			this.selectedTag.push(seletedTag);
		}		
		this.chooseTagShow=false;
	},
	deleteTag(e){
		//删除标签
		var deleteTag=$(event.target).siblings().text();
		this.selectedTag.splice(this.selectedTag.indexOf(deleteTag),1);
	},
	addIconWidth(){
		if(this.formIcon.iconWidth<240){	
			//校验正则时发现，当时数值型时一直不符合正则表达式，正则表达式校验的是字符型，而强制绑定数值型时，所有校验失效，所以宽高设定为了字符型		
			this.formIcon.iconWidth=parseInt(this.formIcon.iconWidth)+1+""
		}	  	  
	},
	addIconHeight(){
		if(this.formIcon.iconHeight<240){
			 this.formIcon.iconHeight=parseInt(this.formIcon.iconHeight)+1+""
		}		  
	},
	reduceIconWidth(){
	  if(this.formIcon.iconWidth>16){
			this.formIcon.iconWidth=parseInt(this.formIcon.iconWidth)-1+""
		}	  
	},
	reduceIconHeight(){
	    if(this.formIcon.iconHeight>16){
			   this.formIcon.iconHeight=parseInt(this.formIcon.iconHeight)-1+""
		}	  
	},
	addSize(){	
		if(this.formIcon.fontSize<24){
			  this.formIcon.fontSize++;
		}
		  
	},
	reduceSize(){
		if( this.formIcon.fontSize>12){
			this.formIcon.fontSize--;	
		}
	    
	},
	scrollWidth(e){
		if(e.wheelDelta>0){
		 //向上
		 this.addIconWidth()
		}else{
			//向下		
		this.reduceIconWidth()
		}

	},
	scrollHeight(e){
		if(e.wheelDelta>0){
		 //向上
		 this.addIconHeight()
		}else{
			//向下		
		this.reduceIconHeight()
		}

	},
	scrollFontSize(e){
		if(e.wheelDelta>0){
		 //向上
		 this.addSize()
		}else{
			//向下		
		this.reduceSize()
		}

	},
	 formatTooltip(val) {
		 //滑块提示的数值
        return val / 10;
	},
	/* drawroundRect(cxt, width, height, radius) { */
	drawroundRect(x, y, w, h, r,ctx) {

		 if (w< 2 * r) r = w / 2;
			if (h < 2 * r) r = h / 2;
			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.arcTo(x + w, y, x + w, y + h, r);
			ctx.arcTo(x + w, y + h, x, y + h, r);
			ctx.arcTo(x, y + h, x, y, r);
			ctx.arcTo(x, y, x + w, y, r);
			ctx.closePath();

		/* cxt.beginPath(0);
        //从右下角顺时针绘制，弧度从0到1/2PI  
        cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
 
        //矩形下边线  
        cxt.lineTo(radius, height);
 
        //左下角圆弧，弧度从1/2PI到PI  
        cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
 
        //矩形左边线  
        cxt.lineTo(0, radius);
 
        //左上角圆弧，弧度从PI到3/2PI  
        cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
 
        //上边线  
        cxt.lineTo(width - radius, 0);
 
        //右上角圆弧  
        cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
 
        //右边线  
        cxt.lineTo(width, height - radius); */
	},
	hex2Rgb(hex) { //十六进制转为RGB
			var rgb = []; // 定义rgb数组
			if (/^\#[0-9A-F]{3}$/i.test(hex)) { //判断传入是否为#三位十六进制数
			let sixHex = '#';
			hex.replace(/[0-9A-F]/ig, function(kw) {
			sixHex += kw + kw; //把三位16进制数转化为六位
			});
			hex = sixHex; //保存回hex
			}
			if (/^#[0-9A-F]{6}$/i.test(hex)) { //判断传入是否为#六位十六进制数
				hex.replace(/[0-9A-F]{2}/ig, function(kw) {
				rgb.push(eval('0x' + kw)); //十六进制转化为十进制并存如数组
				});
				return `rgb(${rgb.join(',')})`; //输出RGB格式颜色
			} else {
			console.log(`Input ${hex} is wrong!`);
			return 'rgb(0,0,0)';
			}
   },
   updateIconColor(iconX,iconY,iconStartW,iconStartH,context){
		var vueSelf=this;
	/* 	var iconConcolor=vueSelf.formIcon.iconConColor;//记录图片背景颜色，后面要重新赋值
		var fontColor=vueSelf.formIcon.fontColor;//记录文字的颜色，后面要重新赋值
		//将背景颜色和文字颜色改成和市场图标颜色不一样的颜色
		if(vueSelf.formIcon.iconColor){
			vueSelf.formIcon.iconConColor=vueSelf.formIcon.iconColor.replace(vueSelf.formIcon.iconColor[2],parseInt(vueSelf.formIcon.iconColor[2]+1));
		    vueSelf.formIcon.fontColor=vueSelf.formIcon.iconColor.replace(vueSelf.formIcon.iconColor[3],parseInt(vueSelf.formIcon.iconColor[3]+1));
		
		} */
		var imageD = context.getImageData(iconX,iconY,iconStartW,iconStartH);//截取画布		
		var pdata = imageD.data;	
		var startIndex0=parseInt(vueSelf.hex2Rgb(vueSelf.formIcon.iconColor).indexOf("("))+1;
		var endIndex0=vueSelf.hex2Rgb(vueSelf.formIcon.iconColor).indexOf(")"); 			
		var colorArr=vueSelf.hex2Rgb(vueSelf.formIcon.iconColor).substring(startIndex0,endIndex0).split(",");
			
		//要排除的图片的背景颜色
		var startIndex=parseInt(vueSelf.hex2Rgb(vueSelf.formIcon.iconConColor).indexOf("("))+1;
		var endIndex=vueSelf.hex2Rgb(vueSelf.formIcon.iconConColor).indexOf(")");
		var thisIconConColor=vueSelf.hex2Rgb(vueSelf.formIcon.iconConColor).substring(startIndex,endIndex).split(",");
		var r=thisIconConColor[0];
		var g=thisIconConColor[1];
		var b=thisIconConColor[2];	
		//要排除的字体的颜色
		var startIndex1=parseInt(vueSelf.hex2Rgb(vueSelf.formIcon.fontColor).indexOf("("))+1;
		var endIndex1=vueSelf.hex2Rgb(vueSelf.formIcon.fontColor).indexOf(")");
		var thisfontColor=vueSelf.hex2Rgb(vueSelf.formIcon.fontColor).substring(startIndex1,endIndex1).split(",");
		var r1=thisfontColor[0];
		var g1=thisfontColor[1];
		var b1=thisfontColor[2];	
		for (var j = 0; j < pdata.length; j+=4) {								
			/* if(pdata[j]!=r||pdata[j + 1]!=g||pdata[j + 2]!=b){
				 if(pdata[j]!=r1||pdata[j + 1]!=g1||pdata[j + 2]!=b1){   */
					pdata[j]=colorArr[0];
					pdata[j + 1] = colorArr[1];
					pdata[j + 2] =colorArr[2]; 
			/* 	 }  				 	
			} */
		}
	context.putImageData(imageD,iconX,iconY);
	//市场图标颜色改变完成后再重新改回图片的背景色和文字的颜色
	/* vueSelf.formIcon.iconConColor=iconConColor;
	vueSelf.formIcon.fontColor=fontColor; */
   },
	drawPicture(){		
		this.clearCanvas();
		var vueSelf=this;
	    var picture_height = this.formIcon.iconHeight>=16&&this.formIcon.iconHeight<=240?this.formIcon.iconHeight:128;//图片高度
		var picture_width = this.formIcon.iconWidth>=16&&this.formIcon.iconWidth<=240?this.formIcon.iconWidth:128;//图片宽度
		/* this.formIcon.iconWidth=picture_width;
		this.formIcon.iconHeight=picture_height; */
		var background_color =this.formIcon.iconConColor?this.formIcon.iconConColor:"#6aa84f";				//图片背景颜色
	
		var img = document.getElementById("iconId"); 						//获取图像对象
		var thisIconSize=this.formIcon.iconSize;
		var icon_width;						//获取图标宽度
		var icon_height;	 				//获取图标高度
			switch(thisIconSize){
                case "min":
				icon_width=16;
				icon_height=16;
				break;
				case "small":
				icon_width=32;
				icon_height=32;
				break;
				case "middle":
				icon_width=64;
				icon_height=64;
				break;
				case "big":
				icon_width=128;
				icon_height=128;
				break;
		};					
		var icon_top_height;			//获取图标距图片上边框距离
		var icon_left_height;			//获取图标距图片左边框距离
		var iconPosition=this.formIcon.iconPosition?this.formIcon.iconPosition:"middle";
		switch(iconPosition){
			case "leftTop":
				icon_top_height=0;
				icon_left_height = 0;
				break;	
			case "middleTop":
				icon_top_height=0;
				icon_left_height = (this.formIcon.iconWidth-icon_width)/2;
				break;	
			case "rightTop":
				icon_top_height=0;
				icon_left_height = this.formIcon.iconWidth-icon_width;
				break;	
			case "leftMiddle":
				icon_top_height=(this.formIcon.iconHeight-icon_height)/2;
				icon_left_height =0;
			    break;	
			case "middle":
			    icon_top_height=(this.formIcon.iconHeight-icon_height)/2;
				icon_left_height = (this.formIcon.iconWidth-icon_width)/2;
				break;	
			case "rightMiddle":
				icon_top_height=(this.formIcon.iconHeight-icon_height)/2;
				icon_left_height = this.formIcon.iconWidth-icon_width;
				break;	
			case "leftBottom":
				icon_top_height=this.formIcon.iconHeight-icon_height;
				icon_left_height = 0;
				break;	
			case "middleBottom":
				icon_top_height=this.formIcon.iconHeight-icon_height;
				icon_left_height =  (this.formIcon.iconWidth-icon_width)/2;
				break;
			case "rightBottom":
				icon_top_height=this.formIcon.iconHeight-icon_height;
				icon_left_height =  this.formIcon.iconWidth-icon_width;
				break;	

		}
		var picture_text = this.formIcon.iconFont;					//图片文字
		var fontFamilyValue= this.formIcon.fontFamily;
		var text_typeFace;	
		switch(fontFamilyValue){
                case "hei":
				text_typeFace="黑体";
				break;
				case "song":
				text_typeFace="宋体";
				break;
				case "kai":
				text_typeFace="楷书";
				break;
				case "li":
				text_typeFace="隶书";
				break;
				case "Arial":
				text_typeFace="Arial";
				break;
				default:
				text_typeFace="Arial";
				break;
		};	//文字字体
		var text_size = this.formIcon.fontSize?this.formIcon.fontSize:14;								//文字大小
		var text_color= this.formIcon.fontColor == ""?"#000000":this.formIcon.fontColor;				//文字颜色
		var text_top_height;			//文字距图片上边框距离
		var text_left_height;			//文字距图片左边框距离
		var fontPosition=this.formIcon.fontPosition?this.formIcon.fontPosition:"middleBottom";
		var canvas = document.getElementById("myCanvas");
		var context=canvas.getContext("2d");
		context.font = text_size+"px "+text_typeFace;

		//放市场图标的画布		
		var canvasIcon= document.getElementById("iconCanvas");
		var cxt=canvasIcon.getContext("2d");
    
		switch(fontPosition){
			case "leftTop":
				text_top_height=0;
				text_left_height = 0;
				break;	
			case "middleTop":
				debugger
				text_top_height=0;				
				text_left_height = (this.formIcon.iconWidth - context.measureText(this.formIcon.iconFont).width)/2;
				break;	
			case "rightTop":
				text_top_height=0;
				text_left_height = this.formIcon.iconWidth-context.measureText(this.formIcon.iconFont).width;
				break;	
			case "leftMiddle":				
				text_top_height=(this.formIcon.iconHeight-this.formIcon.fontSize)/2;
				text_left_height =0;
			    break;	
			case "middle":
			    text_top_height=(this.formIcon.iconHeight-this.formIcon.fontSize)/2;
				text_left_height =(this.formIcon.iconWidth-context.measureText(this.formIcon.iconFont).width)/2;
				break;	
			case "rightMiddle":
				text_top_height=(this.formIcon.iconHeight-this.formIcon.fontSize)/2;
				text_left_height = this.formIcon.iconWidth-context.measureText(this.formIcon.iconFont).width;
				break;	
			case "leftBottom":
				text_top_height=this.formIcon.iconHeight-(this.formIcon.fontSize+5);
				text_left_height = 0;
				break;	
			case "middleBottom":
				text_top_height=this.formIcon.iconHeight-(this.formIcon.fontSize+5);
				text_left_height =(this.formIcon.iconWidth-context.measureText(this.formIcon.iconFont).width)/2;
				break;
			case "rightBottom":
				text_top_height=this.formIcon.iconHeight-(this.formIcon.fontSize+5);
				text_left_height =this.formIcon.iconWidth-context.measureText(this.formIcon.iconFont).width;
				break;	

		}
		var border_width = this.formIcon.iconBorderWidth/10;					//边框宽度
		var border_color =this.formIcon.iconBorderColor == ""?"#000000":this.formIcon.iconBorderColor;						//边框颜色
		var start_left = (280-picture_width-40)/2;							//起始位置距左边距离
		var start_top = 0;				    								//起始位置距上边距离
		/* var canvas = document.getElementById("myCanvas"); */
		canvas.width =parseInt(picture_width)+parseInt(border_width);		//设置画板宽度
		canvas.height =parseInt(picture_height)+parseInt(border_width);	//设置画板高度
		canvas.style.top = start_top+"px";
		canvas.style.left = start_left+"px";

		canvasIcon.width =parseInt(picture_width)+parseInt(border_width);		//设置画板宽度
		canvasIcon.height =parseInt(picture_height)+parseInt(border_width);	//设置画板高度
		canvasIcon.style.top = start_top+"px";
		canvasIcon.style.left = start_left+"px";
		/* var context=canvas.getContext("2d"); */								//创建 context 对象
		context.beginPath();
		context.lineJoin='round';

		//绘制圆角矩形
		var x=0;
		var y=0;
		var w=0+parseInt(border_width)+parseInt(picture_width);
		var h=0+parseInt(border_width)+parseInt(picture_height);
		var r=this.formIcon.iconRadius?"16":"0";
		var canvasObj=context;
		/* this.drawroundRect(canvasObj,w,h,r);  */
		this.drawroundRect(x,y,w,h,r,canvasObj); 
		
		context.fillStyle = background_color;	//填充颜色
		context.fill();							//开始填充  
		context.closePath();
		context.lineWidth = border_width*2;//暂时不明白哪里导致边框宽度绘制缩小了一倍，现在在数值上扩大一倍;
		context.strokeStyle = border_color;
		context.stroke();
		context.font = text_size+"px "+text_typeFace;
		context.fillStyle = text_color;
		context.fillText(picture_text, 0+parseInt(border_width)/2+parseInt(text_left_height), 0+parseInt(border_width)/2+parseInt(text_top_height)+parseInt(this.formIcon.fontSize));
		
		var iconX=0+parseInt(border_width)/2+parseInt(icon_left_height);
		var iconY=0+parseInt(border_width)/2+parseInt(icon_top_height);
		var iconStartW=icon_width;
		var iconStartH=icon_height;
		var flag=0;
		img.onload = function(){
			 debugger 
				flag=1;
				cxt.clearRect(iconX,iconY,iconStartW,iconStartH);//清空矢量图图层
				cxt.drawImage(img,0+parseInt(border_width)/2+parseInt(icon_left_height), 0+parseInt(border_width)/2+parseInt(icon_top_height),parseInt(icon_width),parseInt(icon_height));
		 		//更改图标颜色				
			    debugger
				if(vueSelf.formIcon.iconColor){
					vueSelf.updateIconColor(iconX,iconY,iconStartW,iconStartH,cxt)
				}
				
		}
		if(flag==0){
			debugger
			cxt.clearRect(iconX,iconY,iconStartW,iconStartH);//清空矢量图图层
			cxt.drawImage(img,0+parseInt(border_width)/2+parseInt(icon_left_height), 0+parseInt(border_width)/2+parseInt(icon_top_height),parseInt(icon_width),parseInt(icon_height));	
		    vueSelf.updateIconColor(iconX,iconY,iconStartW,iconStartH,cxt)
		}
		 		
	
      

	},
	clearCanvas(){
		  var c=document.getElementById("myCanvas");  
		  var cxt=c.getContext("2d");  
		  c.height=c.height; 
	},
	openIconList(){
	   this.chooseIconShow=true;
	    var obj={
					"limit": "20",
					"name": "",
					"offset": "0"
				};
		//所有标签		
		this.$ajax.post('/tag/list',obj).then(response=>{
				   debugger
			      if(response.status=="200"){
						if(response.data.rows.length>0){
							this.allTagList=response.data.rows
						}else{
							this.$message({
								message:"标签内容为空",
								type: 'warning'
							});
						}
				  }

		});
		//市场图标
		var objParams={
			
			"tagId": "00334d66709f411095b4a07a098f37e0"
		}
		this.$ajax.post('/market/list',objParams).then(response=>{
				   debugger
			      if(response.status=="200"){
						if(response.data.rows.length>0){
							this.formIcon.iconSrcArr=response.data.rows
						}else{
							this.$message({
								message:"市场图标为空",
								type: 'warning'
							});
						}
				  }

		});
	},
	chooseIcon(e){
		this.formIcon.selectedIconSrc=$(event.target).attr("src");
		this.chooseIconShow=false;
	},
	saveIconConfig(){
		 var obj={
			"backColor": this.formIcon.iconConcolor,
			"borderColor": this.formIcon.iconBorderColor,
			"borderWidth": this.formIcon.iconBorderWidth,
			"fontColor":  this.formIcon.fontColor,
			"fontContent": "",
			"fontPosition": "左上",
			"fontSize": this.formIcon.fontSize,
			"fontType": this.formIcon.fontFamily,
			"height": this.formIcon.iconHeight,
			"isFillet": this.formIcon.iconRadius,//是否圆角
			"isOpen": this.checkedIf,//是否公开
			"marketColor": this.formIcon.iconcolor,
			"marketId": "7eb90bc4036145bc80dcbaba5176496c",
			"marketPosition": "左上",
			"marketSize":this.formIcon.iconSize,
			"name": this.formIcon.iconName.split(".")[0],
			"suffix": this.formIcon.iconName.split(".")[1],
			"tagId": "7eb90bc4036145bc80dcbaba5176496c",//标签的id,可能多个,用,隔开 
			"width":  this.formIcon.iconwidth,
			};
			if(this.formIcon.iconName){
				this.$ajax.post('/detail/save',JSON.stringify(obj),{
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
                }).then(
					(result) => {
							if(result.status == 200){
								console.log('成功')
							}
						}
					).catch(error => {    
						console.log(error)
					})
			}else{
				this.$message({
					"type":"warning",
					"message":"请填写名称"
				})
			}
		  
	},
	searchTag(){
		        var obj={
					"limit": "20",
					"name": this.searchTagName,
					"offset": "0"
					}			
			   this.$ajax.post('/tag/list',obj).then(response=>{
				   debugger
			      if(response.status=="200"){
						if(response.data.rows.length>0){
							this.tagList=response.data.rows
						}else{
							this.$message({
								message:"搜索内容为空",
								type: 'warning'
							});
						}
				  }

				})
	}
	
  }
}) 


</script>

<style scoped>
#iconConfig{
	background:#fff;
	/* border:1px solid #ccc; */
	box-shadow:1px 1px 5px rgba(153,153,153,0.3);
    padding:0!important;
	width:calc(100% - 300px);
}
#iconCreate{
	width:280px;
	margin-left:20px;
	box-shadow:1px 1px 5px rgba(153,153,153,0.3);	
}
#iconCreate #iconCreateCon{
	padding:20px;
}
#iconCreateCon .userInfoRow{
	margin-top:10px;
}
.pictureCustom header{
  background:#3484f0;
  height:60px;
  position:fixed;
  top:0;
  right:0;
  left:0;
}
.pictureCustom{
  margin-top:60px;
  padding:20px 100px;
}
#newIconHeader{
	height:40px;
	background:#80b0f9;
	font-size:14px;
	color:#fff;
	line-height:40px;
	padding:0 20px;
}
#iconNameCon{
  position:relative;
}
#pictureType,#tagListContainer{
  position:absolute;
  top:32px;
  left:0;
  right:0;
  z-index:10;
  background:#fff;
  border:1px solid #ccc;
  border-radius:4px;
}
#pictureType li,#tagList li{
  padding:10px;
  /* text-align:center; */
  height:30px;
  line-height:14px;
  cursor:pointer;
  overflow:hidden;
}
#pictureType li:hover,#tagList li:hover{
  background:#80b0f9;
  color:#fff;
}
#pictureType li.active{
  background:#80b0f9;
  color:#fff;
}
#formCon{
 padding:20px;
}
.formRow{
	/* width:100%;
	border:1px solid #ccc; */
	margin-bottom:20px;
	height:30px;
}
#iconWidthCon,#iconHeightCon{
	position:relative;
}
.addTriangle{
	position:absolute;
	top:0;
	right:10px;
	font-size:18px;
}
.reduceTriangle{
	position:absolute;
	bottom:0;
	right:10px;
	font-size:18px;
}
#canvasCon{
	margin-bottom:20px;
}
.colorCon{
	position:relative;
}
/* 矢量图、文字的位置、图形选择列表 */
#iconPosition,#fontPosition{
  position:absolute;
  top:32px;
  left:0;
  right:0;
  z-index:10;
  background:#fff;
  border:1px solid #ccc;
  border-radius:4px;
  z-index:1111;
  max-width:240px;
}
#iconListParent{
	margin-top:30px;
	padding:0 20px;
}
#iconPosition .el-col,#fontPosition .el-col,#iconList .el-col{
	position:relative;
	text-align:center;
	cursor:pointer;
}
#iconList .el-col{
	padding:10px 0;
}
#iconList .el-col img{
	width:20px;
	height:20px;
}
#selectedIcon{
	width:20px;
	height:20px;
	position:absolute;
	left:10px;
	top:50%;
	transform:translateY(-50%);
}
#iconPosition .tipInfo,#fontPosition .tipInfo{
	font-size:12px;
	position:absolute;
	top:-10px;
	left:50%;
	transform: translateX(-50%);
	display:none;
	width: 40px;
    height: 20px;
    line-height: 20px;
}
#iconPosition .el-col:hover .tipInfo,#fontPosition .el-col:hover .tipInfo{
   display:inline-block;
}
#selectedTagCon{
	position:absolute;
	top:0;
	left:0;
	padding-left:10px;
}
.openSearchBtn{
	position:absolute;
	right:10px;
	top:50%;
	transform:translateY(-50%);
	font-size:20px;
}
/* 选择矢量图 */
#iconListMark{
	position:fixed;
	top:0;
	left:0;
	right:0;
	bottom:0;
	background:rgba(153,153,153,0.3);
	z-index:9999;
}
#iconListCon{
	width:640px;
	height: 495px;
    border: 1px solid rgb(128, 176, 249);
    background: rgb(255, 255, 255);
    border-radius: 4px;
    overflow: hidden;
    float: left;
	display: block;
	position:absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%)
}
#tagChoose{
	width: 100%;
    height: 40px;
    padding: 10px 10px 0 15px;
    background: #80b0f9;
    font-family: Arial;
}
/* 	.layui-input{
		cursor: pointer;
	}
	.layui-row{
		margin: 18px 0px;
	}
	.rowDiv{
		height : 578px;
		padding: 4px 10px;
		margin-top: 0px;
		overflow:hidden;
	}
	.formDiv{
		border: 1px solid #D9D9D9;
		height: 100%;
		padding: 10px 10px;
	}
	.label{
		margin-top: 8px;
		text-align:center;
	}
	.layui-form-select dl{
		height: 204px;
	}
	.icon_image{
		width: 28px;
		height: 28px;
		padding: 2px 5px;
	}
	#imgSelect{
		width:27px; 
		height:27px;  
		border:0; 
		background-image:url("../assets/images/cascades.png"); 
		background-size:27px 27px;
		background-repeat:no-repeat;
	}
	.input-prompt{
		line-height: 38px;
		color: red;
		padding-left: 5px;
	}
	.layui-btn + .layui-btn{
		margin-left:0;
	} */
</style>
