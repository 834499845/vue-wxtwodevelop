webpackJsonp([1,7],{165:function(e,t,a){(function(e){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(174),s=i(n),o=a(32),r=i(o),l=a(31),d=a(48);a(59),t.default={name:"type",data:function(){return{textHeight:"1.4rem",textSize:"1.2rem",textHeightMax:"1.7rem",siteObj:{name:"",site:"",phone:""},siteText:"",sitePlObj:{namePl:"暂无",sitePl:"暂无",phonePl:"暂无"}}},filters:{ctimeFun:function(e){var t=new Date(e),a=t.getYear()-100,i=t.getMonth()+1;i=i>9?i:"0"+i;var n=t.getDate();n=n>9?n:"0"+n;var s=t.getHours();s=s>9?s:"0"+s;var o=t.getMinutes();return o=o>9?o:"0"+o,"20"+a+"-"+i+"-"+n},imgUrlFun:function(t){return t?"http://"+e.logIp+":"+e.logFileport+"/files"+t:"/static/img/errimg.png"},strFun:function(e){return e.length>0?e:"暂无信息"}},computed:(0,l.mapState)(["regUserObj"]),created:function(){var e=this;if(sessionStorage.openedsite){var t=localStorage.getItem("id");e.regUserObj.id=t,console.log("窗口是刷新页面,不是新打开")}else console.log("窗口是新打开");sessionStorage.setItem("openedsite","true"),e.$emit("appchildsay","site"),e.getSiteList({consumerid:e.regUserObj.id}).then(function(t){console.log(t),"200"==t.data.code&&(null==t.data.data||(e.sitePlObj.namePl=t.data.data.contact,e.sitePlObj.phonePl=t.data.data.mobile,e.sitePlObj.sitePl=t.data.data.address,e.siteObj.name=t.data.data.contact,e.siteObj.phone=t.data.data.mobile,e.siteText=t.data.data.address,e.siteObj.site=t.data.data.address))}).catch(function(e){console.log(e)})},beforeDestroy:function(){sessionStorage.removeItem("openedsite")},methods:(0,r.default)({addTouchstart:function(e,t){var a=this;a.siteObj.phone.length>0&&a.siteObj.name.length>0?(a.siteObj.site=a.siteText,a.getUpdateSite({consumerId:a.regUserObj.id,mobile:a.siteObj.phone,contact:a.siteObj.name,address:a.siteObj.site}).then(function(e){console.log(e),"200"==e.data.code?((0,d.Toast)({message:"修改成功",className:"toastLoad"}),a.sitePlObj.namePl="",a.sitePlObj.phonePl="",a.sitePlObj.sitePl="",a.getSiteList({consumerid:a.regUserObj.id}).then(function(e){console.log(e),"200"==e.data.code&&(null==e.data.data||(a.sitePlObj.namePl=e.data.data.contact,a.sitePlObj.phonePl=e.data.data.mobile,a.sitePlObj.sitePl=e.data.data.address))}).catch(function(e){console.log(e),(0,d.Toast)({message:"服务器错误",className:"toastLoad"})})):(0,d.Toast)({message:"修改失败",className:"toastLoad"})}).catch(function(e){alert((0,s.default)(e)),(0,d.Toast)({message:"服务器错误",className:"toastLoad"})})):0==a.siteObj.phone.length?(0,d.Toast)({message:"手机号为必填项",className:"toastLoad"}):0==a.siteObj.name.length&&(0,d.Toast)({message:"收货人为必填项",className:"toastLoad"})},numberFun:function(e){return"NaN"!=parseFloat(e).toString()}},(0,l.mapActions)(["getSiteList","getUpdateSite"])),watch:{siteText:function(e,t){var a=1*e;0==this.numberFun(a)?1.2*e.length<20?(this.textHeight="1.5rem",this.textHeightMax="1.7rem"):1.2*e.length>20&&1.2*e.length<40?(this.textHeight="3rem",this.textHeightMax="3.2rem"):1.2*e.length>40&&1.2*e.length<60?(this.textHeight="4.5rem",this.textHeightMax="4.7rem"):1.2*e.length>60&&1.2*e.length<80?(this.textHeight="6rem",this.textHeightMax="6.2rem"):1.2*e.length>80&&1.2*e.length<100?(this.textHeight="7.5rem",this.textHeightMax="7.7rem"):1.2*e.length>100&&1.2*e.length<120?(this.textHeight="9rem",this.textHeightMax="9.2rem"):1.2*e.length>120&&1.2*e.length<140&&(this.textHeight="10.5rem",this.textHeightMax="10.7rem"):e.length>5&&(0,d.Toast)({message:"收获地址不能为纯数字",className:"toastLoad"})}}}}).call(t,function(){return this}())},174:function(e,t,a){e.exports={default:a(180),__esModule:!0}},180:function(e,t,a){var i=a(33),n=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},400:function(e,t,a){t=e.exports=a(47)(),t.push([e.id,"#app[data-v-8f5a475e]{background-color:#f5f5f6;height:100vh;width:100vw;overflow-x:hidden}.main>ul>li[data-v-8f5a475e]{min-height:4.5rem;border-bottom:1px solid #e7e7e7;background-color:#fff;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.main>ul>li>div[data-v-8f5a475e]:first-child{width:9rem;text-align:center;font-size:1.2rem;color:#a7a7a7}.main>ul>li:nth-child(3)>div[data-v-8f5a475e]:first-child{min-height:4.5rem;line-height:4.5rem}.main>ul>li:nth-child(3)>div[data-v-8f5a475e]:nth-child(2){height:7.4rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding-top:.2rem;padding-bottom:.2rem}.main>ul>li:nth-child(3)>div:nth-child(2) textarea[data-v-8f5a475e]{width:22rem;border:0;resize:none;overflow:hidden;padding-top:.2rem;padding-bottom:.2rem;padding-left:0}.main>ul>li>div[data-v-8f5a475e]:nth-child(2){width:calc(100vw - 11rem)}.main>ul>li>div:nth-child(2) input[data-v-8f5a475e]{border:0;padding:0;font-size:1.2rem}.addBut[data-v-8f5a475e]{width:100%;height:4.3rem;margin-top:9rem;overflow:hidden}.addBut>div[data-v-8f5a475e]{margin:0 auto;width:95%;background-color:#1aac19;height:100%;line-height:4.3rem;color:#fff;font-size:1.4rem;text-align:center;border-radius:.2rem}.bounce-enter-active[data-v-8f5a475e]{transition:all .7s ease}.bounce-enter[data-v-8f5a475e],.bounce-leave-active[data-v-8f5a475e]{transform:translateY(30px);opacity:0}",""])},408:function(e,t,a){var i=a(400);"string"==typeof i&&(i=[[e.id,i,""]]);a(49)(i,{});i.locals&&(e.exports=i.locals)},425:function(e,t,a){a(408);var i=a(37)(a(165),a(428),"data-v-8f5a475e",null);e.exports=i.exports},428:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"bounce"}},[a("div",{staticClass:"site",attrs:{id:"app"}},[a("div",{staticClass:"main"},[a("ul",[a("li",[a("div",[e._v("\n                        收货人\n                    ")]),e._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.siteObj.name,expression:"siteObj.name"}],attrs:{type:"text",placeholder:e._f("strFun")(e.sitePlObj.namePl)},domProps:{value:e.siteObj.name},on:{input:function(t){t.target.composing||(e.siteObj.name=t.target.value)}}})])]),e._v(" "),a("li",[a("div",[e._v("\n                        手机号\n                    ")]),e._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.siteObj.phone,expression:"siteObj.phone"}],attrs:{type:"number",placeholder:e._f("strFun")(e.sitePlObj.phonePl)},domProps:{value:e.siteObj.phone},on:{input:function(t){t.target.composing||(e.siteObj.phone=t.target.value)},blur:function(t){e.$forceUpdate()}}})])]),e._v(" "),a("li",[a("div",[e._v("\n                        详细地址\n                    ")]),e._v(" "),a("div",{style:{height:e.textHeightMax}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.siteText,expression:"siteText"}],style:{height:e.textHeight,fontSize:e.textSize},attrs:{name:"",id:"",placeholder:e._f("strFun")(e.sitePlObj.sitePl)},domProps:{value:e.siteText},on:{input:function(t){t.target.composing||(e.siteText=t.target.value)}}})])])])]),e._v(" "),a("div",{staticClass:"addBut",on:{touchstart:function(t){e.addTouchstart(t)}}},[a("div",[e._v("保存")])])])])},staticRenderFns:[]}}});