// Página do artista: portfólio inteiro, lightbox com "Quero uma assim" e pedido no WhatsApp dele
(function(){
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const $=id=>document.getElementById(id);
const B=document.body.dataset,A=B.a,N=+B.n,NOME=B.nome,PIER=A==='marcela';
fetch('img/logo.svg').then(r=>r.text()).then(s=>{['selo-nav','selo-ft'].forEach(id=>{const e=$(id);if(e)e.innerHTML=s})});

// fundo do topo: fumaça ao vivo no PC, MP4 no celular
(function(){
 const cv=$('fumo'),vd=$('fumov'),topo=cv.parentNode;
 const cel=matchMedia('(max-width:820px)').matches;
 if(cel||!window.fumacaGL){cv.remove();vd.style.display='block';vd.play&&vd.play().catch(()=>{});return}
 vd.remove();const T=fumacaGL(cv);if(!T)return;
 let vis=true,t0=performance.now();
 const sz=()=>T.tamanho(topo.clientWidth,topo.clientHeight);sz();addEventListener('resize',sz);
 new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(topo);
 const loop=n=>{requestAnimationFrame(loop);if(!vis||document.hidden)return;T.desenhar(RM?0:((n-t0)/40000*6.283185)%6.283185,.5)};
 requestAnimationFrame(loop);
})();

// PORTFÓLIO: 24 à vista, o resto no "Ver mais"
const g=$('grid'),nn=i=>String(i).padStart(2,'0');let lim=24;
function grade(){g.innerHTML=Array.from({length:Math.min(lim,N)},(_,i)=>`<a href="img/g/${A}/${nn(i)}.webp" data-k="${i}"><span><img src="img/g/${A}/s/${nn(i)}.webp" alt="${PIER?'Piercing':'Tatuagem'} de ${NOME}, Di Jesus Tattoo" draggable="false"></span></a>`).join('');$('mais').hidden=N<=lim}
grade();$('mais').onclick=()=>{lim=999;grade()};

// LIGHTBOX
const lb=$('lb'),lbi=$('lbi');let li=0;
const show=k=>{li=(k+N)%N;lbi.src=`img/g/${A}/${nn(li)}.webp`;lbi.alt=`Trabalho de ${NOME}`;lb.hidden=false};
g.onclick=e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();show(+a.dataset.k)};
lb.onclick=e=>{if(e.target.classList.contains('pv'))show(li-1);else if(e.target.classList.contains('nx'))show(li+1);else if(e.target!==lbi&&!e.target.classList.contains('quero'))lb.hidden=true};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key=='Escape')lb.hidden=true;if(e.key=='ArrowLeft')show(li-1);if(e.key=='ArrowRight')show(li+1)});
const qb=document.createElement('button');qb.className='btn quero';qb.textContent=PIER?'Quero um assim':'Quero uma assim';lb.appendChild(qb);
qb.addEventListener('click',e=>{e.stopPropagation();lb.hidden=true;
 const id=$('ideia');id.value=`Vi no site ${PIER?'o piercing':'a tatuagem'} da foto ${li+1} do portfólio e quero algo parecido. `;
 $('agendar').scrollIntoView();setTimeout(()=>id.focus({preventScroll:true}),700)});

// PEDIDO → WhatsApp do artista; cada campo com data-rot entra na mensagem
const form=$('form'),erro=$('erro');
form.addEventListener('submit',e=>{e.preventDefault();const nome=(form.nome.value||'').trim();
 if(!nome){erro.hidden=false;form.nome.focus();return}erro.hidden=true;
 const l=[`Olá, ${NOME.split(' ')[0]}! Sou *${nome}* e ${form.dataset.msg}.`,''];
 form.querySelectorAll('[data-rot]').forEach(c=>{const el=c.querySelector('input:checked,select,input:not([type=radio])');const v=el?(el.value||'').trim():'';l.push(`*${c.dataset.rot}:* ${v||'a definir'}`)});
 const ideia=(form.ideia.value||'').trim();if(ideia)l.push('',`*${PIER?'Observações':'Ideia'}:* `+ideia);l.push('','(pedido enviado pelo site)');
 window.open('https://wa.me/'+B.num+'?text='+encodeURIComponent(l.join('\n')),'_blank','noopener')});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
})();
