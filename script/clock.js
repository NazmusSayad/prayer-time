{let e,t,n,o,c;const r=e=>e<10?"0"+e:String(e),a=e=>{t=e.getSeconds(),g.textContent=r(t),config.done&&update_nextPrayer_time()},d=e=>{n=e.getMinutes(),_.textContent=r(n),config.done&&update_next_and_current_prayer()},l=e=>{o=e.getHours(),o||i(e),c=o>=12?"PM":"AM",o%=12,o=o||12,s.textContent=r(o),y.textContent=c},i=e=>{S.textContent=e.toLocaleString("en-US",{day:"2-digit",year:"numeric",month:"long",weekday:"long"}),update_time_database()},u=()=>{const e=new Date;a(e),d(e),l(e),i(e)},m=()=>{e=new Date,a(e),t||(d(e),n||l(e))},s=document.querySelector("#clock .time_h"),_=document.querySelector("#clock .time_m"),g=document.querySelector("#clock .time_s"),y=document.querySelector("#clock .time_t"),S=document.querySelector("#clock .date");u();const w=window.setInterval((()=>{Math.round((new Date).getMilliseconds()/100)||(window.clearInterval(w),m(),setInterval((()=>{m()}),1e3))}),1)}