(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"18f6":function(t,s,e){"use strict";e("fb6a");s["a"]={methods:{chunk(t,s){const e=[];let a=0;while(a<t.length)e.push(t.slice(a,s+a)),a+=s;return e}}}},"1fca":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"col-12 q-mt-sm"},[t._m(0),e("q-carousel",{staticClass:"rounded-borders",attrs:{"transition-prev":"slide-right","transition-next":"slide-left",swipeable:"",animated:"","control-color":"primary",navigation:"",padding:"",arrows:"",height:"260px"},model:{value:t.latest_slide,callback:function(s){t.latest_slide=s},expression:"latest_slide"}},t._l(t.lists,(function(s,a){return e("q-carousel-slide",{key:a,staticClass:"column no-wrap",attrs:{name:a}},[e("div",{staticClass:"row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"},t._l(s,(function(s){return e("div",{key:s.product_id,staticClass:"col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height",on:{click:function(s){return t.$router.push("/details")}}},[e("q-img",{staticClass:"rounded-borders",attrs:{src:s.image_filename}}),e("div",[t._v(t._s(s.product_name))]),e("div",{staticClass:"text-caption text-weight-bold text-green"},[t._v("\n            "+t._s(s.product_name)+"\n          ")]),e("div",[e("span",[t._v("₹"+t._s(s.sale_rate))]),e("span",{staticClass:"q-ml-sm text-grey-6",staticStyle:{"text-decoration":"line-through"}},[t._v("₹"+t._s(s.mrp))])])],1)})),0)])})),1)],1)},l=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"q-pl-md bg-white q-pt-sm "},[e("span",{staticClass:"text-grey-9 text-h6 text-weight-bold"},[t._v("Sale")]),e("a",{staticClass:"text-primary q-ml-sm cursor-pointer"},[t._v("[see all]")])])}],i=e("18f6"),r={mixins:[i["a"]],data(){return{latest_slide:1,lists:[]}},mounted(){this.$axios.get("http://localhost:8080/data/sale.json").then(t=>{this.lists=this.chunk(t.data,6),console.log(this.lists)}).catch(t=>{console.error(t)})}},n=r,o=e("2877"),c=e("880c"),d=e("62cd"),u=e("068f"),m=e("eebe"),h=e.n(m),p=Object(o["a"])(n,a,l,!1,null,null,null);s["default"]=p.exports;h()(p,"components",{QCarousel:c["a"],QCarouselSlide:d["a"],QImg:u["a"]})}}]);