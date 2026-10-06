const prompt=document.getElementById('prompt'), createBtn=document.getElementById('createBtn'), toast=document.getElementById('toast'), recentList=document.getElementById('recentList');
const suggestions=[...document.querySelectorAll('[data-prompt]')];
function notify(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(window.novaToast);window.novaToast=setTimeout(()=>toast.classList.remove('show'),2200)}
function addCreation(text,tool='NOVA Studio'){const empty=recentList.querySelector('.empty');if(empty)empty.remove();const item=document.createElement('div');item.className='recent-item';item.innerHTML='<strong>'+escapeHtml(text)+'</strong><span>'+escapeHtml(tool)+' · just now</span>';recentList.prepend(item);saveCreation(text,tool)}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function saveCreation(text,tool){const items=JSON.parse(localStorage.getItem('novaCreations')||'[]');items.unshift({text,tool});localStorage.setItem('novaCreations',JSON.stringify(items.slice(0,6)))}
function loadCreations(){const items=JSON.parse(localStorage.getItem('novaCreations')||'[]');items.reverse().forEach(x=>addCreation(x.text,x.tool))}
suggestions.forEach(b=>b.addEventListener('click',()=>{prompt.value=b.dataset.prompt;prompt.focus()}));
createBtn.addEventListener('click',()=>{const value=prompt.value.trim();if(!value){notify('Tell NOVA what you want to create ✦');prompt.focus();return}addCreation(value);prompt.value='';notify('Creation added to your NOVA workspace ✦')});
prompt.addEventListener('keydown',e=>{if(e.key==='Enter')createBtn.click()});
document.querySelectorAll('.tool-card').forEach(card=>card.addEventListener('click',()=>{document.querySelectorAll('.tool-card').forEach(x=>x.classList.remove('active'));card.classList.add('active');notify(card.dataset.tool+' selected')}));
document.getElementById('startBtn').addEventListener('click',()=>{document.getElementById('workspace').scrollIntoView({behavior:'smooth'});setTimeout(()=>prompt.focus(),600)});
document.getElementById('themeBtn').addEventListener('click',()=>{document.body.classList.toggle('light');document.getElementById('themeBtn').textContent=document.body.classList.contains('light')?'☾':'☼'});
loadCreations();