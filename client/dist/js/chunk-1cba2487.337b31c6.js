(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1cba2487"],{"0f8b":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"modal",attrs:{id:"modal"}},[e("div",{staticClass:"modal-content"},[e("ul",[e("li",[e("h5",[t._v("URL:")]),t._v(" "+t._s(t.linkData.url)+" ")]),e("li",[e("h5",[t._v("shortened URL:")]),t._v(" "+t._s(t.getShortenedUrl(t.linkData.hash))+" ")]),e("li",[e("h5",[t._v("hash:")]),t._v(" "+t._s(t.linkData.hash)+" ")]),e("li",[e("h5",[t._v("clicks:")]),t._v(" "+t._s(t.clicksCount)+" ")]),e("li",[e("h5",[t._v("created:")]),t._v(" "+t._s(t.formatDate(t.linkData.created))+" ")])])])])},i=[],r=(e("96cf"),e("1da1")),c=e("c1df"),o=e.n(c),s=e("4ec3"),l={name:"linkModal",data:function(){return{MaterialInstance:null,linkData:{},clicksCount:0}},mounted:function(){this.MaterialInstance=M.Modal.init(this.$el,{})},beforeDestroy:function(){this.MaterialInstance.destroy()},methods:{formatDate:function(t){return o()(t).format("MMMM Do YYYY, h:mm a")},getShortenedUrl:function(t){return window.location.origin+"/r/"+t},getClicksCount:function(t){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=new s["a"]("/api/click/getCount/"+t,"Bearer "+localStorage.getItem("jwt")),e.next=3,a.GET();case 3:i=e.sent,console.log(i),n.clicksCount=i.count;case 6:case"end":return e.stop()}}),e)})))()},open:function(t){this.linkData=t,this.MaterialInstance.open(),this.getClicksCount(t._id)},destroy:function(){this.MaterialInstance.destroy()}}},u=l,d=(e("163b"),e("2877")),h=Object(d["a"])(u,a,i,!1,null,"26cab2f9",null);n["default"]=h.exports},"163b":function(t,n,e){"use strict";var a=e("cde6"),i=e.n(a);i.a},cde6:function(t,n,e){}}]);
//# sourceMappingURL=chunk-1cba2487.337b31c6.js.map