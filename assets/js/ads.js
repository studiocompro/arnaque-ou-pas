/* AdSense placement map — keep layout visible until real slot IDs are added.
   Put each new ad unit's numeric slot ID below. The publisher ID is already yours.
   Side rails are automatically extended to the same height as the page content,
   so there is no empty advertising column when a page is long. */
window.AOP_ADS = {
  client: 'ca-pub-8281021937433044',
  slots: { left1:'', left2:'', left3:'', left4:'', right1:'', right2:'', right3:'', right4:'', mobile1:'', mobile2:'' }
};
(function(){
 const cfg=window.AOP_ADS;if(!cfg)return;

 // Fill both desktop side rails for the full height of the central content.
 // Four configured ad units are cycled when more vertical placements are needed.
 const fillRails=()=>{
   if(window.matchMedia('(max-width:1230px)').matches)return;
   const main=document.querySelector('.main');
   const rails=[...document.querySelectorAll('.rail')];
   if(!main||rails.length<2)return;
   const mainHeight=Math.max(main.offsetHeight,700);
   const gap=22, targetHeight=230;
   const count=Math.max(4,Math.ceil((mainHeight+gap)/(targetHeight+gap)));
   rails.forEach((rail,idx)=>{
     const side=idx===0?'left':'right';
     rail.innerHTML='';
     rail.style.height=mainHeight+'px';
     rail.style.setProperty('--rail-count',count);
     for(let i=0;i<count;i++){
       const slotNo=(i%4)+1;
       const el=document.createElement('div');
       el.className='adbox';
       el.dataset.adKey=side+slotNo;
       el.innerHTML='PUBLICITÉ<small>emplacement latéral '+(i+1)+'</small>';
       rail.appendChild(el);
     }
   });
 };
 fillRails();

 const ready=Object.values(cfg.slots).some(Boolean); if(!ready)return;
 const s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+cfg.client;document.head.appendChild(s);
 document.querySelectorAll('[data-ad-key]').forEach(el=>{const key=el.dataset.adKey,slot=cfg.slots[key];if(!slot)return;el.innerHTML=`<ins class="adsbygoogle" style="display:block;width:100%;height:100%" data-ad-client="${cfg.client}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;el.style.display='block'; try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){} });
})();
