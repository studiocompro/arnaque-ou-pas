
/* AdSense placement map — keep layout visible until real slot IDs are added.
   Put each new ad unit's numeric slot ID below. The publisher ID is already yours.
   Once a slot has a number, this script converts the matching placeholder into AdSense. */
window.AOP_ADS = {
  client: 'ca-pub-8281021937433044',
  slots: { left1:'', left2:'', left3:'', left4:'', right1:'', right2:'', right3:'', right4:'', mobile1:'', mobile2:'' }
};
(function(){
 const cfg=window.AOP_ADS;if(!cfg)return;
 const ready=Object.values(cfg.slots).some(Boolean); if(!ready)return;
 const s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+cfg.client;document.head.appendChild(s);
 document.querySelectorAll('[data-ad-key]').forEach(el=>{const key=el.dataset.adKey,slot=cfg.slots[key];if(!slot)return;el.innerHTML=`<ins class="adsbygoogle" style="display:block;width:100%" data-ad-client="${cfg.client}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;el.style.display='block'; try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){} });
})();
