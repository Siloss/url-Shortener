(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3514bce3"],{"0f8b":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal",attrs:{id:"modal"}},[n("div",{staticClass:"modal-content"},[n("ul",[n("li",[n("h5",[t._v("URL:")]),t._v(" "+t._s(t.linkData.url)+" ")]),n("li",[n("h5",[t._v("shortened URL:")]),t._v(" "+t._s(t.getShortenedUrl(t.linkData.hash))+" ")]),n("li",[n("h5",[t._v("hash:")]),t._v(" "+t._s(t.linkData.hash)+" ")]),n("li",[n("h5",[t._v("clicks:")]),t._v(" "+t._s(t.clicksCount)+" ")]),n("li",[n("h5",[t._v("created:")]),t._v(" "+t._s(t.formatDate(t.linkData.created))+" ")])])]),n("div",{staticClass:"modal-footer"},[n("button",{staticClass:"waves-effect waves-light btn-flat red white-text",on:{click:function(e){return t.close()}}},[t._v(" Close ")])])])},i=[],s=(n("96cf"),n("1da1")),c=n("c1df"),o=n.n(c),r=n("4ec3"),l={name:"linkModal",data:function(){return{MaterialInstance:null,linkData:{},clicksCount:0}},mounted:function(){this.MaterialInstance=M.Modal.init(this.$el,{})},beforeDestroy:function(){this.MaterialInstance.destroy()},methods:{formatDate:function(t){return o()(t).format("MMMM Do YYYY, h:mm a")},getShortenedUrl:function(t){return window.location.origin+"/r/"+t},getClicksCount:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var a,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=new r["a"]("/api/click/getCount/"+t,"Bearer "+localStorage.getItem("jwt")),n.next=3,a.GET();case 3:i=n.sent,console.log(i),e.clicksCount=i.count;case 6:case"end":return n.stop()}}),n)})))()},open:function(t){this.linkData=t,this.MaterialInstance.open(),this.getClicksCount(t._id)},close:function(){this.url="https://",this.MaterialInstance.close()},destroy:function(){this.MaterialInstance.destroy()}}},u=l,h=(n("ae7c"),n("2877")),f=Object(h["a"])(u,a,i,!1,null,"f529c9b6",null);e["default"]=f.exports},ae7c:function(t,e,n){"use strict";var a=n("fbe3"),i=n.n(a);i.a},fbe3:function(t,e,n){}}]);
//# sourceMappingURL=chunk-3514bce3.e8cf6256.js.map