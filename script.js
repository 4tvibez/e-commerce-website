
const products=[
{id:1,n:"Nova X Wireless Headphones",c:"Electronics",p:129.99,o:159.99,r:4.8,e:"🎧"},
{id:2,n:"AeroFit Smart Watch",c:"Electronics",p:89.99,o:119.99,r:4.7,e:"⌚"},
{id:3,n:"Urban Classic Sneakers",c:"Fashion",p:74.99,o:94.99,r:4.6,e:"👟"},
{id:4,n:"Minimal Leather Backpack",c:"Fashion",p:59.99,o:null,r:4.5,e:"🎒"},
{id:5,n:"Pulse Mechanical Keyboard",c:"Electronics",p:99.99,o:129.99,r:4.9,e:"⌨️"},
{id:6,n:"Studio Desk Lamp",c:"Home",p:39.99,o:49.99,r:4.4,e:"💡"},
{id:7,n:"CloudSoft Hoodie",c:"Fashion",p:44.99,o:null,r:4.7,e:"🧥"},
{id:8,n:"BrewMate Coffee Maker",c:"Home",p:69.99,o:84.99,r:4.6,e:"☕"},
{id:9,n:"ProCharge Power Bank",c:"Electronics",p:34.99,o:44.99,r:4.5,e:"🔋"},
{id:10,n:"Everyday Ceramic Set",c:"Home",p:29.99,o:null,r:4.3,e:"🍽️"},
{id:11,n:"TrailFlex Running Shoes",c:"Sports",p:84.99,o:104.99,r:4.8,e:"🏃"},
{id:12,n:"Active Resistance Kit",c:"Sports",p:24.99,o:34.99,r:4.6,e:"🏋️"}];
let cat="All",q="",sort="featured",cart=JSON.parse(localStorage.cart||"[]");
const $=s=>document.querySelector(s),money=n=>"$"+n.toFixed(2);
function renderCats(){let cs=["All",...new Set(products.map(p=>p.c))];$("#cats").innerHTML=cs.map(x=>`<button class="category ${cat===x?"active":""}" data-cat="${x}"><b>${x}</b><small>${x==="All"?products.length:products.filter(p=>p.c===x).length} products</small></button>`).join("");$("#filters").innerHTML=cs.map(x=>`<button class="chip ${cat===x?"active":""}" data-cat="${x}">${x}</button>`).join("")}
function list(){let a=products.filter(p=>(cat==="All"||p.c===cat)&&p.n.toLowerCase().includes(q.toLowerCase()));if(sort==="low")a.sort((x,y)=>x.p-y.p);if(sort==="high")a.sort((x,y)=>y.p-x.p);if(sort==="rating")a.sort((x,y)=>y.r-x.r);return a}
function render(){let a=list();$("#products").innerHTML=a.length?a.map(p=>`<article class="card"><div class="visual">${p.e}<button data-add="${p.id}">♡</button></div><div class="info"><div class="cat">${p.c}</div><h3>${p.n}</h3><div class="rating">★ ${p.r} <span>verified reviews</span></div><div class="price"><strong>${money(p.p)}</strong>${p.o?"<del>"+money(p.o)+"</del>":""}</div><button class="add" data-add="${p.id}">Add to cart</button></div></article>`).join(""):`<div class="empty">No products match your search.</div>`;renderCart()}
function renderCart(){let count=cart.reduce((s,x)=>s+x.qty,0);$("#count").textContent=count;$("#items").innerHTML=cart.length?cart.map(x=>{let p=products.find(y=>y.id===x.id);return `<div class="item"><div class="thumb">${p.e}</div><div><b>${p.n}</b><small>${money(p.p)}</small><div class="qty"><button data-q="${p.id}" data-d="-1">−</button><b>${x.qty}</b><button data-q="${p.id}" data-d="1">+</button><button data-r="${p.id}" style="border:0;background:none;color:#888">Remove</button></div></div></div>`}).join(""):`<div class="empty">🛒<h3>Your cart is empty</h3><p>Add products to start your order.</p></div>`;$("#total").textContent=money(cart.reduce((s,x)=>{let p=products.find(y=>y.id===x.id);return s+p.p*x.qty},0));localStorage.cart=JSON.stringify(cart)}
document.addEventListener("click",e=>{let c=e.target.closest("[data-cat]");if(c){cat=c.dataset.cat;renderCats();render()}let a=e.target.closest("[data-add]");if(a){let id=+a.dataset.add,x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});renderCart();open()}let b=e.target.closest("[data-q]");if(b){let x=cart.find(i=>i.id===+b.dataset.q);x.qty+=+b.dataset.d;if(x.qty<1)cart=cart.filter(i=>i.id!==x.id);renderCart()}let r=e.target.closest("[data-r]");if(r){cart=cart.filter(i=>i.id!==+r.dataset.r);renderCart()}});
$("#search").oninput=e=>{q=e.target.value;render()};$("#sort").onchange=e=>{sort=e.target.value;render()};function open(){$("#drawer").classList.add("open");$("#overlay").classList.add("show")}function close(){$("#drawer").classList.remove("open");$("#overlay").classList.remove("show")}$("#cartBtn").onclick=open;$("#close").onclick=close;$("#overlay").onclick=close;$("#searchBtn").onclick=()=>{$("#search").focus();$("#shop").scrollIntoView({behavior:"smooth"})};$("#checkout").onclick=()=>alert(cart.length?"Checkout module coming next — your cart is working and saved.":"Your cart is empty.");renderCats();render();
