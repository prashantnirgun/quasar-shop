(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"18f6":function(t,e,s){"use strict";s("fb6a");e["a"]={methods:{chunk(t,e){const s=[];let a=0;while(a<t.length)s.push(t.slice(a,e+a)),a+=e;return s}}}},"313b":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-12 q-mt-sm"},[t._m(0),s("q-carousel",{staticClass:"rounded-borders",attrs:{"transition-prev":"slide-right","transition-next":"slide-left",swipeable:"",animated:"","control-color":"primary",navigation:"",padding:"",arrows:"",height:"260px"},model:{value:t.trending_slide,callback:function(e){t.trending_slide=e},expression:"trending_slide"}},t._l(t.lists,(function(e,a){return s("q-carousel-slide",{key:a,staticClass:"column no-wrap",attrs:{name:a}},[s("div",{staticClass:"row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"},t._l(e,(function(e){return s("q-img",{key:e.category_id,staticClass:"rounded-borders col-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height",staticStyle:{border:"1px solid lightgrey"},attrs:{src:e.image_filename},on:{click:function(e){return t.$router.push("/category")}}},[s("div",{staticClass:"absolute-bottom custom-caption",staticStyle:{"background-color":"rgba(0, 0, 0, .5)"}},[s("div",{staticClass:"text-caption text-weight-bolder"},[t._v("\n              "+t._s(e.category_name)+"\n            ")])])])})),1)])})),1)],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"q-pl-md bg-white q-pt-sm "},[s("span",{staticClass:"text-grey-9 text-h6 text-weight-bold"},[t._v("Category")]),s("a",{staticClass:"text-primary q-ml-sm cursor-pointer"},[t._v("[see all]")])])}],r=s("18f6"),n={mixins:[r["a"]],data(){return{trending_slide:1,lists:[]}},mounted(){this.$axios.get("http://localhost:8080/data/category.json").then(t=>{this.lists=this.chunk(t.data,4)}).catch(t=>{console.error(t)})}},l=n,o=s("2877"),c=s("880c"),u=s("62cd"),d=s("068f"),g=s("eebe"),m=s.n(g),h=Object(o["a"])(l,a,i,!1,null,null,null);e["default"]=h.exports;m()(h,"components",{QCarousel:c["a"],QCarouselSlide:u["a"],QImg:d["a"]})}}]);