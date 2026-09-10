
(function(){
 const langSel=document.querySelector('[data-lang-select]');
 if(langSel){langSel.addEventListener('change',()=>{const target=langSel.value; const rel=document.body.dataset.rel||'index.html'; location.href='/'+target+'/'+rel;});}
 const input=document.querySelector('[data-scam-search]'), box=document.querySelector('[data-search-results]');
 if(input&&box&&window.SCAM_DATA){
   const draw=()=>{const q=input.value.trim().toLowerCase(); if(!q){box.classList.remove('show');box.innerHTML='';return;} const hits=window.SCAM_DATA.filter(x=>(x.title+' '+x.keys).toLowerCase().includes(q)).slice(0,7); box.innerHTML=hits.length?hits.map(x=>`<a href="${x.url}"><span>${x.icon}</span><b>${x.title}</b></a>`).join(''):`<a href="types.html"><span>🔎</span><b>…</b></a>`; box.classList.add('show');};
   input.addEventListener('input',draw); document.querySelector('[data-search-button]')?.addEventListener('click',draw);
 }
 const checks=[...document.querySelectorAll('[data-redflag]')], score=document.querySelector('[data-score]');
 if(checks.length&&score){const update=()=>{let n=checks.filter(x=>x.checked).length; const low=score.dataset.low,mid=score.dataset.mid,high=score.dataset.high; score.textContent=`${n}/${checks.length} — `+(n<=1?low:n<=3?mid:high);}; checks.forEach(x=>x.addEventListener('change',update)); update();}
 document.querySelectorAll('[data-quiz]').forEach(q=>{q.querySelectorAll('button[data-answer]').forEach(btn=>btn.addEventListener('click',()=>{const out=q.querySelector('.quizanswer');out.classList.add('show');out.textContent=btn.dataset.answer===q.dataset.correct?'✅ '+out.dataset.good:'🚨 '+out.dataset.bad;}));});
})();
