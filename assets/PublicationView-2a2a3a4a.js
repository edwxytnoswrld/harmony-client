import{d as D,r as u,a as E,i as P,V as g,e as _,o as a,c,b as e,j as f,t as p,k as r,h as b,X as N,l as S,m as q,n as z,p as A,w as T,v as X,F as J,q as K,f as G}from"./index-a88a7c3b.js";const H={class:"reply"},Q={class:"d-flex mb-3"},W=["src"],Y={class:"ms-2 d-flex flex-column justify-content-center"},Z={class:"align-items-center"},ee={class:"ms-auto"},te={class:"d-flex align-items-center"},se={class:"d-flex align-items-center me-4"},le={class:"align-middle",style:{"line-height":"1.5rem"}},oe=D({__name:"Reply",props:["reply"],setup(m){const o=m,n="http://74.234.122.93:8080",I=u("user-photos/0/default.png"),{cookies:v}=E(),t=u(v.get("token")),y=u(!1);let h={headers:{Authorization:"Bearer "+t.value}};console.log(o.reply),o.reply.avatarUrl!=null&&(I.value=o.reply.avatarUrl),P(()=>{x()});function x(){let d=g.decode(t.value).userId;_.get(n+"/api/replies/is-liked?replyId="+o.reply.id+"&userId="+d,h).then(function(i){y.value=i.data}).catch(function(i){console.log(i)})}function C(){const d=new FormData;d.append("userId",g.decode(t.value).userId),d.append("replyId",o.reply.id),_.post(n+"/api/replies/like",d,h).then(function(i){console.log(i.data),b.go(0)}).catch(function(i){console.log(i)})}function w(){const d=new FormData;d.append("userId",g.decode(t.value).userId),d.append("replyId",o.reply.id),_.post(n+"/api/replies/unlike",d,h).then(function(i){console.log(i.data),b.go(0)}).catch(function(i){console.log(i)})}return(d,i)=>(a(),c("div",H,[e("div",Q,[e("img",{src:f(n)+"/api/"+I.value,alt:"",width:"75",height:"75",class:"rounded-circle me-2 object-fit-cover"},null,8,W),e("div",Y,[e("strong",null,p(m.reply.name),1),e("div",Z,"@"+p(m.reply.username),1)]),e("div",ee,p(m.reply.createdDate),1)]),e("p",null,p(m.reply.content),1),e("div",te,[e("div",se,[y.value?r("",!0):(a(),c("i",{key:0,class:"bi bi-heart me-3 align-middle pointer",style:{"font-size":"1.5rem"},onClick:C})),y.value?(a(),c("i",{key:1,class:"bi bi-heart-fill me-3 align-middle pointer",style:{"font-size":"1.5rem"},onClick:w})):r("",!0),e("span",le,p(m.reply.likeCount),1)])])]))}});const ne={class:"ms-5 bg-light",id:"wrapper"},ae={class:"top-bar",style:{"padding-left":"15px"}},ie=e("span",{class:"align-middle",style:{"line-height":"1.5rem"}},"Publicējums",-1),ce={class:"content-bar"},de={class:"d-flex mb-3"},re=["src"],ue={class:"ms-2 d-flex flex-column justify-content-center"},pe={class:"ms-auto"},me={class:"m-0"},_e={key:0,class:"container w-100 mw-100 p-0 m-0"},ve={class:"row w-100 align-items-center p-0 text-start m-0",style:{width:"50%","margin-left":"0px","margin-right":"0px","max-width":"50%"}},he={class:"col p-0"},fe=["src"],ge={class:"col pt-2 ms-3"},ye={key:0},ke=e("div",{class:"accordion",id:"accordionExample",style:{"border-radius":"15px !important"}},[e("div",{class:"accordion-item"},[e("h2",{class:"accordion-header",id:"headingOne"},[e("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseOne","aria-expanded":"true","aria-controls":"collapseOne"}," Skatīt datus ")])])],-1),be=[ke],Ie={key:1,id:"collapseOne",class:"accordion-collapse collapse","aria-labelledby":"headingOne","data-bs-parent":"#accordionExample"},xe={class:"accordion-body"},we={style:{"white-space":"pre"},class:"mb-1 mt-2"},Ue=["id"],Ce={key:2,class:"d-flex align-items-center mt-2"},De=e("i",{class:"bi bi-download me-3 align-middle",style:{"font-size":"1.5rem"}},null,-1),$e={class:"align-middle",style:{"line-height":"1.5rem"}},Be=["href"],Le={key:1},ze=["href"],Ee={key:3},Pe=["href"],Fe={class:"d-flex align-items-center mt-3"},Ve={class:"d-flex align-items-center me-4"},je={class:"align-middle",style:{"line-height":"1.5rem"}},Re={class:"d-flex align-items-center me-3"},Me=e("i",{class:"bi bi-chat-square-text me-3 align-middle",style:{"font-size":"1.5rem"}},null,-1),Oe={class:"align-middle",style:{"line-height":"1.5rem"}},Ne={class:"write-bar form-group"},Se=e("label",{for:"comment-area",class:"mb-2"},"Komentēt: ",-1),qe={class:"d-flex align-items-center"},Ae={class:"replies-bar"},Te=D({__name:"Publication",props:["postId"],setup(m){const o=m,n="http://74.234.122.93:8080",{cookies:I}=E(),v=u(I.get("token")),t=u([]),y=u("user-photos/0/default.png"),h=u(!1),x=u(null),C=u(null),w=u(null);N(x,w,{src:n+"/api/"+t.value.mp3Url,lineColor:"#00b3ff"});const d=u([]),i=u("");let k={headers:{Authorization:"Bearer "+v.value}};function F(){let s=document.getElementById("canvas"+t.value.id);s.classList.add("d-block"),s.classList.remove("d-none")}function $(){let s=document.getElementById("canvas"+t.value.id);s.classList.add("d-none"),s.classList.remove("d-block")}S(()=>{let s=document.getElementById("plyrplay"+o.postId);s!=null&&(console.log("plyrplay"+o.postId),console.log(s),s.addEventListener("playing",()=>F()),s.addEventListener("pause",()=>$()),s.addEventListener("ended",()=>$()))});function B(){b.push({path:"/user/"+t.value.userId})}function V(){let s=g.decode(v.value).userId;_.get(n+"/api/posts/is-liked?postId="+o.postId+"&userId="+s,k).then(function(l){h.value=l.data}).catch(function(l){console.log(l)})}function j(){const s=new FormData;s.append("userId",g.decode(v.value).userId),s.append("postId",o.postId),_.post(n+"/api/posts/like",s,k).then(function(l){console.log(l.data),b.go(0)}).catch(function(l){console.log(l)})}function R(){const s=new FormData;s.append("userId",g.decode(v.value).userId),s.append("postId",o.postId),_.post(n+"/api/posts/unlike",s,k).then(function(l){console.log(l.data),b.go(0)}).catch(function(l){console.log(l)})}function L(){_.get(n+"/api/replies/get-all?postId="+o.postId,k).then(function(s){d.value=s.data,console.log(d.value)}).catch(function(s){console.log(s)})}P(()=>{_.get(n+"/api/posts/get-by-id?postId="+o.postId,k).then(function(s){t.value=s.data,t.value.avatarUrl!=null&&(y.value=t.value.avatarUrl),console.log(t.value)}).catch(function(s){console.log(s)}),V(),L()});function M(){const s=new FormData;s.append("content",i.value),s.append("userId",g.decode(v.value).userId),s.append("postId",o.postId),_.post(n+"/api/replies/publish",s,k).then(function(l){console.log(l.data),L(),i.value=""}).catch(function(l){console.log(l)})}return(s,l)=>{const O=q("vue-plyr");return a(),c("div",ne,[e("div",ae,[e("i",{class:"bi bi-arrow-left align-middle pointer",style:{"font-size":"1.5rem","margin-right":"10px"},onClick:l[0]||(l[0]=U=>f(b).push({path:"/"}))}),ie]),e("div",ce,[e("div",de,[e("img",{src:f(n)+"/api/"+y.value,alt:"",width:"75",height:"75",class:"rounded-circle me-2 object-fit-cover"},null,8,re),e("div",ue,[e("strong",{class:"pointer",onClick:B},p(t.value.name),1),e("div",{class:"align-items-center pointer",onClick:B},"@"+p(t.value.username),1)]),e("div",pe,p(t.value.createdDate),1)]),e("p",me,p(t.value.content),1),t.value.mp3Url?(a(),c("div",_e,[e("div",ve,[e("div",he,[z(O,{ref_key:"plyr",ref:C,id:"plyrplay"+o.postId},{default:A(()=>[e("audio",{ref_key:"player",ref:x,controls:"",crossorigin:"",playsinline:""},[e("source",{src:f(n)+"/api/"+t.value.mp3Url,type:"audio/mp3"},null,8,fe)],512)]),_:1},8,["id"])]),e("div",ge,[t.value.songMetadata?(a(),c("div",ye,be)):r("",!0)])])])):r("",!0),t.value.songMetadata?(a(),c("div",Ie,[e("div",xe,[e("p",we,p(t.value.songMetadata),1)])])):r("",!0),e("canvas",{ref_key:"canvas",ref:w,id:"canvas"+o.postId,class:"d-none"},null,8,Ue),t.value.mp3Url||t.value.pdfUrl||t.value.midiUrl?(a(),c("div",Ce,[De,e("div",$e,[t.value.mp3Url?(a(),c("a",{key:0,href:f(n)+"/api/"+t.value.mp3Url,class:"nav-link link-primary d-inline-block"},"mp3",8,Be)):r("",!0),t.value.mp3Url&&(t.value.pdfUrl||t.value.midiUrl)?(a(),c("span",Le," • ")):r("",!0),t.value.midiUrl?(a(),c("a",{key:2,href:f(n)+"/api/"+t.value.midiUrl,class:"nav-link link-primary d-inline-block"},"midi",8,ze)):r("",!0),t.value.midiUrl&&t.value.pdfUrl?(a(),c("span",Ee," • ")):r("",!0),t.value.pdfUrl?(a(),c("a",{key:4,href:f(n)+"/api/"+t.value.pdfUrl,class:"nav-link link-primary d-inline-block"},"pdf",8,Pe)):r("",!0)])])):r("",!0),e("div",Fe,[e("div",Ve,[h.value?r("",!0):(a(),c("i",{key:0,class:"bi bi-heart me-3 align-middle pointer",style:{"font-size":"1.5rem"},onClick:j})),h.value?(a(),c("i",{key:1,class:"bi bi-heart-fill me-3 align-middle pointer",style:{"font-size":"1.5rem"},onClick:R})):r("",!0),e("span",je,p(t.value.likeCount),1)]),e("div",Re,[Me,e("span",Oe,p(t.value.replyCount),1)])])]),e("div",Ne,[Se,e("div",qe,[T(e("textarea",{class:"form-control",id:"comment-area",rows:"3","onUpdate:modelValue":l[1]||(l[1]=U=>i.value=U)},null,512),[[X,i.value]]),e("button",{type:"submit",class:"btn btn-primary ms-3",style:{height:"60px"},onClick:M},"Submit")])]),(a(!0),c(J,null,K(d.value,U=>(a(),c("div",Ae,[z(oe,{reply:U},null,8,["reply"])]))),256))])}}});const Je=D({__name:"PublicationView",setup(m){return(o,n)=>(a(),G(Te))}});export{Je as default};