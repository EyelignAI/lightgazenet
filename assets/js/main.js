(function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  function copyText(text){
    if(navigator.clipboard && window.isSecureContext){
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try{ document.execCommand('copy'); }catch(e){}
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  document.querySelectorAll('[data-copy-target]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const sel = btn.getAttribute('data-copy-target');
      const el = document.querySelector(sel);
      if(!el) return;
      await copyText(el.textContent);
      const prev = btn.textContent;
      btn.textContent = 'Copied ✓';
      setTimeout(()=> btn.textContent = prev, 1200);
    });
  });
})();