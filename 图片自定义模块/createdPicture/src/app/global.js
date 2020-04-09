import Vue from 'vue'
import axios from "axios"
import VueCookies from 'vue-cookies'
import Fingerprint2 from 'fingerprintjs2'

Vue.use(VueCookies)
Vue.prototype.$ajax=axios;

var reslt
Fingerprint2.get(function (components) {
  var values = components.map(function (component) { return component.value })
  reslt = Fingerprint2.x64hash128(values.join(''), 31)
})

function bro() {
  var is360 = false;
  var isIE = false;
  var isFirefox = false;
  var isChrome = false;
  var isEdge = false;
  var broName = 'Runing';
  var strStart = 0;
  var strStop = 0;
  var temp = '';
    
  var userAgent = window.navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
    
  var lowerUserAgent = navigator.userAgent.toLowerCase();  
    //FireFox
  if (userAgent.indexOf('Firefox') != -1) {
    isFirefox = true;
    /*broName = 'FireFox浏览器';*/
    strStart = userAgent.indexOf('Firefox');
    temp = userAgent.substring(strStart);
    broName = temp.replace('/', '版本号')  
  }

   //Safari
   if (/safari/.test(lowerUserAgent) && !/chrome/.test(lowerUserAgent)) {
    strStart = userAgent.indexOf('Safari');
    temp = userAgent.substring(strStart);
    broName = temp.replace('/', '版本号')  
  }
    
    //Edge
  if (userAgent.indexOf('Edge') != -1) {
    isEdge = true;
    /*broName = 'Edge浏览器';*/
    strStart = userAgent.indexOf('Edge');
    temp = userAgent.substring(strStart);
    broName = temp.replace('/', '版本号');
  }
    
    //IE浏览器
  if (userAgent.indexOf('NET') != -1 && userAgent.indexOf("rv") != -1) {
    isIE = true;
    /*broName = 'IE浏览器'; */
    strStart = userAgent.indexOf('rv');
    strStop = userAgent.indexOf(')');
    temp = userAgent.substring(strStart, strStop);
    broName = temp.replace('rv', 'IE').replace(':', '版本号');
  }
    
    //360极速模式可以区分360安全浏览器和360极速浏览器
  if (userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") < 0 && userAgent.indexOf("Firefox") < 0) {
    if(navigator.javaEnabled()){
    is360 = true;
    broName = '360安全浏览器-极速模式版本号 ';
    }else{
    is360 = true;
    broName = '360极速浏览器-极速模式版本号 ';
    } 
  }

  if(/ucweb/.test(lowerUserAgent)){
    broName = 'UC浏览器版本号 ';
  }
  
  if(/metasr/.test(lowerUserAgent)){
    broName = '搜狗浏览器版本号 ';
  }

  if(/lbbrowser/.test(lowerUserAgent)){
    broName = '猎豹浏览器版本号 ';
  }

  if(/micromessenger/.test(lowerUserAgent)){
    broName = '微信内置浏览器版本号 ';
  }

  if(/qqbrowser/.test(lowerUserAgent)){
    broName = 'QQ浏览器版本号 ';
  }
    //360兼容
  if (userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") != -1 && userAgent.indexOf("MSIE") != -1 && userAgent.indexOf("rv") < 0) {
    is360 = true;
    broName = '360兼容模式版本号 ';
  }
    
  //Chrome浏览器
  if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf("Edge") < 0 && userAgent.indexOf('Chrome') != -1) {
    isChrome = true;
    /*broName = 'Chrome浏览器';*/
    strStart = userAgent.indexOf('Chrome');
    strStop = userAgent.indexOf(' Safari');
    temp = userAgent.substring(strStart, strStop);
    broName = temp.replace('/', '版本号');
  }    
  return broName
}

function detectOS() { 
  var sUserAgent = navigator.userAgent; 
  var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows"); 
  var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel"); 
  if (isMac) return "Mac"; 
  var isUnix = (navigator.platform == "X11") && !isWin && !isMac; 
  if (isUnix) return "Unix"; 
  var isLinux = (String(navigator.platform).indexOf("Linux") > -1); 
  var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
  if (isLinux) {
  if(bIsAndroid) return "Android";
  else return "Linux"; 
  }
  if (isWin) { 
    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1; 
    if (isWin2K) return "Win2000"; 
    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || 
    sUserAgent.indexOf("Windows XP") > -1; 
    if (isWinXP) return "WinXP"; 
    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1; 
    if (isWin2003) return "Win2003"; 
    var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1; 
    if (isWinVista) return "WinVista"; 
    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1; 
    if (isWin7) return "Win7"; 
    var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1; 
    if (isWin10) return "Win10"; 
  }
  return "other"; 
} 

let visitorBrowser = bro()
const visitorBrowserType = visitorBrowser.split("版本号")[0]
const visitorBrowserVersion = visitorBrowser.split("版本号")[1]
let visitorOsVersion = detectOS()
var visitorOs = "";
visitorOsVersion.indexOf("Win") > -1 ? visitorOs = "windows" : visitorOs = visitorOsVersion
var visitorOsBit = navigator.appVersion
visitorOsBit.indexOf("32") > -1 ? visitorOsBit = 32 : visitorOsBit = 64
var visitProductId = "",visitProductName = "",visitToolName = "",visitToolId = "";
var visitorPrimaryKey = "";
let visitorUrl = location.href

function visitFnc(param){
  let path = location.pathname
  switch(path){
    case "/tools":
      if(param.id == 'T02' ){
        visitToolId = "T02"
        visitToolName = "Excel合并"  
      }else{
        visitToolId = "T01"
        visitToolName = "图标生成"
      }
      visitProductId = ""
      visitProductName = ""
      break
    case "/excel":
      if(param.id == 'T02' ){
        visitToolId = "T02"
        visitToolName = "Excel合并"  
      }else{
        visitToolId = "T01"
        visitToolName = "图标生成"
      }
      visitProductId = ""
      visitProductName = ""
      break
    case "/ruleDetails":
      visitProductId = "P01"
      visitProductName = "规则平台"
      visitToolId = ""
      visitToolName = ""
      break
    default:
      visitProductId = ""
      visitProductName = ""
      visitToolId = ""
      visitToolName = ""
      break
  }
  let visitContent = param.name
  let visitOrigin = param.orgin
  let websit_token = VueCookies.get("websit_token")
  websit_token ? visitorPrimaryKey = "" : visitorPrimaryKey = reslt
  const visit = {
    visitContent: visitContent,
    visitOrigin: visitOrigin,
    visitorPrimaryKey: visitorPrimaryKey,
    visitProductId: visitProductId,
    visitProductName: visitProductName,
    visitToolId: visitToolId,
    visitToolName: visitToolName,
    visitWay: '电脑',
    visitorBrowserType: visitorBrowserType,
    visitorBrowserVersion: visitorBrowserVersion,
    visitorIp: '',
    visitorOs: visitorOs,
    visitorOsBit: visitorOsBit, 
    visitorOsVersion: visitorOsVersion,
    visitorUrl: visitorUrl,
    visitWebsitVersion: '1.0' 
  }
  axios.post(`../websit/v1/log`, visit);
}


export default {
  // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function (Vue) {
    Vue.prototype.bro = (param) => bro(param)
    Vue.prototype.detectOS = (param) => detectOS(param)
    Vue.prototype.visitFnc = (param) => visitFnc(param)
  }
}
