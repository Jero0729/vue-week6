"use strict";(self["webpackChunk_17_week6"]=self["webpackChunk_17_week6"]||[]).push([[338],{3338:function(a,e,n){n.r(e),n.d(e,{default:function(){return $}});var t=n(6252);const s={class:"navbar navbar-expand-lg navbar-dark bg-dark"},o={class:"container-fluid"},l=(0,t.Uk)("Logo"),c=(0,t._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavDropdown","aria-controls":"navbarNavDropdown","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,t._)("span",{class:"navbar-toggler-icon"})],-1),i={class:"collapse navbar-collapse",id:"navbarNavDropdown"},r={class:"navbar-nav"},u={class:"nav-item"},d=(0,t.Uk)("後台首頁"),v={class:"nav-item"},k=(0,t.Uk)("後台產品列表"),h={class:"nav-item"},p=(0,t.Uk)("優惠券"),g={class:"nav-item"},m=(0,t.Uk)("登出");function b(a,e,n,b,_,f){const w=(0,t.up)("router-link"),$=(0,t.up)("router-view");return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("nav",s,[(0,t._)("div",o,[(0,t.Wm)(w,{to:"/",class:"navbar-brand"},{default:(0,t.w5)((()=>[l])),_:1}),c,(0,t._)("div",i,[(0,t._)("ul",r,[(0,t._)("li",u,[(0,t.Wm)(w,{to:"/admin",class:"nav-link"},{default:(0,t.w5)((()=>[d])),_:1})]),(0,t._)("li",v,[(0,t.Wm)(w,{to:"/admin/products",class:"nav-link"},{default:(0,t.w5)((()=>[k])),_:1})]),(0,t._)("li",h,[(0,t.Wm)(w,{to:"/admin/coupon",class:"nav-link"},{default:(0,t.w5)((()=>[p])),_:1})]),(0,t._)("li",g,[(0,t.Wm)(w,{to:"/",class:"nav-link",onClick:f.signout},{default:(0,t.w5)((()=>[m])),_:1},8,["onClick"])])])])])]),(0,t.Wm)($)],64)}var _={data(){return{checkSuccess:!1}},methods:{checkLogin(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)meToken\s*=\s*([^;]*).*$)|^.*$/,"$1");if(a){this.$http.defaults.headers.common.Authorization=`${a}`;const e="https://vue3-course-api.hexschool.io/v2/api/user/check";this.$http.post(e,{api_token:this.token}).then((()=>{this.checkSuccess=!0})).catch((a=>{alert(a.data.message),this.$router.push("/login")}))}else alert("請登入!"),this.$router.push("/login")},signout(){document.cookie="meToken = ; expires = ;",alert("token 已清除 881"),this.$router.push("/login")}},mounted(){this.checkLogin()}},f=n(3744);const w=(0,f.Z)(_,[["render",b]]);var $=w}}]);
//# sourceMappingURL=338.c11412e4.js.map