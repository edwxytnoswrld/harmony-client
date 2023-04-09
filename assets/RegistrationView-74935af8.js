import{d as v,x as h,r as i,e as g,h as x,m as y,o as f,c as w,b as e,w as l,v as d,y as _,n as k,p as V,f as R}from"./index-a88a7c3b.js";const B={class:"d-flex align-items-center w-100 h-100"},D={class:"bg-light",id:"login-wrapper"},L={class:"card-body p-5"},N=e("h1",{class:"fs-4 card-title fw-bold mb-4"},"Reģistrēties",-1),q={class:"needs-validation",novalidate:"",method:"POST",autocomplete:"off"},C={class:"mb-3"},E=e("label",{class:"mb-2 text-muted",for:"name"},"Vārds",-1),I=e("div",{class:"invalid-feedback"}," Ievadiet vārdu! ",-1),U={class:"mb-3"},j=e("label",{class:"mb-2 text-muted",for:"username"},"Lietotājvārds (unikāls)",-1),P=e("div",{class:"invalid-feedback"}," Ievadiet lietotājvārdu! ",-1),T={class:"mb-3"},M=e("label",{class:"mb-2 text-muted",for:"email"},"E-pasts",-1),S=e("div",{class:"invalid-feedback"}," Nepareizs e-pasts! ",-1),$={class:"mb-3"},z=e("label",{class:"mb-2 text-muted",for:"password"},"Parole",-1),A=e("div",{class:"invalid-feedback"}," Ievadiet paroli! ",-1),F={class:"align-items-center d-flex"},J={class:"card-footer py-3 border-0"},O={class:"text-center"},G=v({__name:"Registration",setup(b){const m="http://74.234.122.93:8080";h(()=>{var s=document.getElementsByClassName("needs-validation");Array.prototype.filter.call(s,function(t){t.addEventListener("submit",function(o){t.checkValidity()===!1?(o.preventDefault(),o.stopPropagation()):(p(),o.preventDefault()),t.classList.add("was-validated")},!1)})});const n=i(""),r=i(""),c=i(""),u=i("");function p(){const s=new FormData;s.append("username",r.value),s.append("email",c.value),s.append("password",u.value),s.append("name",n.value),g.post(m+"/api/register",s).then(function(t){console.log(t),x.push({name:"login"})}).catch(function(t){console.log(t)})}return(s,t)=>{const o=y("RouterLink");return f(),w("div",B,[e("div",D,[e("div",L,[N,e("form",q,[e("div",C,[E,l(e("input",{id:"name",type:"text","onUpdate:modelValue":t[0]||(t[0]=a=>n.value=a),class:"form-control",name:"name",required:"",autofocus:""},null,512),[[d,n.value]]),I]),e("div",U,[j,l(e("input",{id:"name",type:"text","onUpdate:modelValue":t[1]||(t[1]=a=>r.value=a),class:"form-control",name:"username",required:""},null,512),[[d,r.value]]),P]),e("div",T,[M,l(e("input",{id:"email",type:"email","onUpdate:modelValue":t[2]||(t[2]=a=>c.value=a),class:"form-control",name:"email",required:""},null,512),[[d,c.value]]),S]),e("div",$,[z,l(e("input",{id:"password",type:"password","onUpdate:modelValue":t[3]||(t[3]=a=>u.value=a),class:"form-control",name:"password",required:""},null,512),[[d,u.value]]),A]),e("div",F,[e("button",{type:"submit",class:"btn btn-primary ms-auto",onSubmit:t[4]||(t[4]=a=>p())}," Reģistrēties ",32)])])]),e("div",J,[e("div",O,[_(" Jau ir konts? "),k(o,{to:"/login",class:"nav-link link-primary","aria-current":"page"},{default:V(()=>[_("Ielogojieties")]),_:1})])])])])}}});const K=v({__name:"RegistrationView",setup(b){return(m,n)=>(f(),R(G))}});export{K as default};