import{d as g,u as V,r as s,a as D,V as B,o as y,c as C,b as e,w as c,v as p,e as b,f as I}from"./index-db5b081f.js";const S={class:"ms-5 bg-light",id:"wrapper"},U=e("div",{class:"top-bar",style:{"padding-left":"15px"}},[e("i",{class:"bi bi-arrow-left align-middle",style:{"font-size":"1.5rem","margin-right":"10px"}}),e("span",{class:"align-middle",style:{"line-height":"1.5rem"}},"Iestatījumi")],-1),j={class:"bottom-bar"},z={class:"mb-3"},F=e("label",{for:"name",class:"form-label"},"Vārds",-1),A={class:"mb-3"},E=e("label",{for:"username",class:"form-label"},"Lietotājvārds",-1),L={class:"mb-3"},M=e("label",{for:"email",class:"form-label"},"E-pasts",-1),T={class:"mb-3"},J=e("label",{for:"password",class:"form-label"},"Parole",-1),N={class:"mb-3"},P=e("span",{class:"me-3"},"Mainīt profila bildi",-1),R=e("label",{for:"file-upload",class:"btn btn-secondary"}," Lejupielādēt ",-1),$=g({__name:"Settings",setup(w){const m="https://harmony.northeurope.cloudapp.azure.com",o=V(),n=s(null),{cookies:f}=D(),v=s(f.get("token"));let _=B.decode(v.value);const i=s(null),u=s(null),r=s(null),d=s(null),h={headers:{Authorization:"Bearer "+v.value,"content-type":"multipart/form-data"}};async function k(){if(n.value!=null){const a=new FormData;a.append("avatar",n.value),a.append("userId",_.userId),b.post(m+"/api/users/update-avatar",a,h).then(async function(l){await console.log(l.data),i.value==null&&r.value==null&&d.value==null&&u.value==null&&(await o.push({name:"home"}),await o.go(0))}).catch(function(l){console.log(n.value),console.log(l)})}const t=new FormData;i.value!=null&&t.append("name",i.value),u.value!=null&&t.append("email",u.value),r.value!=null&&t.append("username",r.value),d.value!=null&&t.append("name",d.value),Array.from(t.keys()).length>0&&(t.append("userId",_.userId),b.post(m+"/api/users/update-data",t,h).then(async function(a){await console.log(a),f.remove("token"),await o.push({name:"home"}),await o.go(0)}).catch(function(a){console.log(a)}))}function x(t){var a=t.target.files||t.dataTransfer.files;a.length&&(n.value=a[0],console.log(n.value))}return(t,a)=>(y(),C("div",S,[U,e("div",j,[e("form",null,[e("div",z,[F,c(e("input",{type:"text",class:"form-control",id:"name","onUpdate:modelValue":a[0]||(a[0]=l=>i.value=l)},null,512),[[p,i.value]])]),e("div",A,[E,c(e("input",{type:"text",class:"form-control",id:"username","onUpdate:modelValue":a[1]||(a[1]=l=>r.value=l)},null,512),[[p,r.value]])]),e("div",L,[M,c(e("input",{type:"email",class:"form-control",id:"email","onUpdate:modelValue":a[2]||(a[2]=l=>u.value=l)},null,512),[[p,u.value]])]),e("div",T,[J,c(e("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":a[3]||(a[3]=l=>d.value=l)},null,512),[[p,d.value]])]),e("div",N,[P,R,e("input",{id:"file-upload",class:"d-none",type:"file",onChange:x},null,32)]),e("button",{type:"button",class:"btn btn-primary",onClick:k},"Submit")])])]))}});const G=g({__name:"SettingsView",setup(w){return(m,o)=>(y(),I($))}});export{G as default};
