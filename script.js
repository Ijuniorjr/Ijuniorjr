// Ano no footer
document.getElementById('ano').textContent = new Date().getFullYear();

// Mobile menu (minimal)
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav nav');
toggle?.addEventListener('click', ()=>{
  const open = nav.style.display === 'flex';
  nav.style.display = open ? 'none' : 'flex';
  nav.style.flexDirection = 'column';
  nav.style.gap = '1rem';
});

// IntersectionObserver para revelar seções
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('reveal-active');
  });
},{ threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Canvas de fundo com partículas suaves
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let w, h, particles;
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  particles = Array.from({length: Math.min(80, Math.floor(w*h/18000))}, ()=>({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2 + 0.6,
    vx: (Math.random()-.5)*0.25,
    vy: (Math.random()-.5)*0.25,
    a: Math.random()*0.6+0.2
  }));
}
window.addEventListener('resize', resize); resize();

function tick(){
  ctx.clearRect(0,0,w,h);
  ctx.globalCompositeOperation = 'lighter';
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>w) p.vx*=-1;
    if(p.y<0||p.y>h) p.vy*=-1;
    const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*18);
    g.addColorStop(0, `rgba(106,227,255,${p.a})`);
    g.addColorStop(1, 'rgba(106,227,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r*10,0,Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(tick);
}
tick();


// Mobile nav open/close
document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav nav');
  if(btn && nav){
    btn.addEventListener('click', ()=> nav.classList.toggle('open'));
  }
});
