const PHONE="22657086591";
const PRODUCTS=[
{id:"camera",category:"formation",name:"Formation Installation et Configuration des Caméras de Surveillance",description:"Formation professionnelle destinée aux débutants, techniciens et entrepreneurs.",price:1500,oldPrice:15000,promo:"Promotion 48 h",image:"images/produit-camera.jpg"},
{id:"fibre",category:"formation",name:"Formation Fibre Optique",description:"Formation pratique consacrée à l'installation et aux techniques de la fibre optique.",price:null,image:"images/produit-fibre.jpg"},
{id:"ebook",category:"digital",name:"eBook Formation Caméras de Surveillance",description:"Support numérique sur l'installation, la configuration et le dépannage.",price:null,image:"images/ebook-camera.jpg"},
{id:"sacs",category:"physique",name:"Sacs personnalisés pour entreprises",description:"Sacs personnalisables pour restaurants, glaciers et autres commerces.",price:null,image:"images/sacs-personnalises.jpg"}
];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const money=n=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA";
$("#year").textContent=new Date().getFullYear();
$("#menu").onclick=()=>$("#nav").classList.toggle("open");
$$('nav a').forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
function card(p){let price=p.price==null?'<strong>Prix à confirmer</strong>':`${p.oldPrice?`<del>${money(p.oldPrice)}</del>`:''}<strong>${money(p.price)}</strong>${p.promo?`<em>${p.promo}</em>`:''}`;return `<article class="card" data-c="${p.category}"><img class="product-image" src="${p.image}" alt="${p.name}"><small>${p.category==='formation'?'FORMATION':p.category==='digital'?'PRODUIT DIGITAL':'PRODUIT PHYSIQUE'}</small><h3>${p.name}</h3><p>${p.description}</p><div class="price">${price}</div><button class="buy-whatsapp" data-id="${p.id}">💬 Acheter sur WhatsApp</button></article>`}
function render(filter='all'){const list=filter==='all'?PRODUCTS:PRODUCTS.filter(p=>p.category===filter);$("#productGrid").innerHTML=list.map(card).join('');$$('.buy-whatsapp').forEach(b=>b.onclick=()=>openProduct(b.dataset.id))}
function openProduct(id){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;$("#modalImage").src=p.image;$("#modalName").textContent=p.name;$("#modalPrice").textContent=p.price==null?'Prix à confirmer':money(p.price);$("#modalSend").dataset.id=id;$("#productModal").classList.add('show')}
function closeProduct(){$("#productModal").classList.remove('show')}
$("#modalClose").onclick=closeProduct;$("#modalClose2").onclick=closeProduct;$("#productModal").onclick=e=>{if(e.target.id==='productModal')closeProduct()};
$("#modalSend").onclick=()=>{const p=PRODUCTS.find(x=>x.id===$("#modalSend").dataset.id);if(!p)return;const price=p.price==null?'Prix à confirmer':money(p.price);const imageUrl=new URL(p.image,location.href).href;const msg=`Bonjour TUINA BUSINESS,\n\nJe souhaite acheter ce produit :\n📦 ${p.name}\n💰 Prix : ${price}\n\n🖼️ Photo du produit :\n${imageUrl}\n\nMerci de me confirmer la commande.`;window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,'_blank')};
$$('.filters button').forEach(b=>b.onclick=()=>{$$('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.f)});
render();
