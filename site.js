(function(){
  // 1) Decorative animated blobs in heroes and CTA bands
  document.querySelectorAll('.page-hero,.hero,.cta-band').forEach(function(sec){
    var wrap=document.createElement('div');wrap.className='bg-blobs';
    ['b1','b2','b3'].forEach(function(c){var d=document.createElement('div');d.className='blob '+c;wrap.appendChild(d)});
    sec.insertBefore(wrap,sec.firstChild);
  });

  // 2) Image fallback: any broken image becomes a branded placeholder
  function guard(img){
    if(img.dataset.guarded)return;img.dataset.guarded='1';
    img.addEventListener('error',function(){
      var f=document.createElement('div');f.className='img-fallback';
      var h=img.getAttribute('height')||img.clientHeight;f.style.height=(h&&h>40?h:280)+'px';
      f.innerHTML='<span>▦ ZelloPOS</span>';
      if(img.parentNode)img.parentNode.replaceChild(f,img);
    });
    if(img.complete&&img.naturalWidth===0){img.dispatchEvent(new Event('error'))}
  }
  document.querySelectorAll('img').forEach(guard);

  // 3) Scroll reveal
  var els=document.querySelectorAll('.card,.step,.plan,.post-card,.stat-cell,.split,.quote-block,.pain-item,.faq details');
  els.forEach(function(e){e.classList.add('rv')});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.08});
    els.forEach(function(e){io.observe(e)});
  } else { els.forEach(function(e){e.classList.add('in')}); }
})();

// Homepage live dashboard simulation
(function(){
  var feed=document.getElementById('txFeed');
  if(!feed)return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rev=248100,tx=1284,net=131600,b=[124000,98000,26100];
  var kinds=[['In-store','#10'],['Online','#10'],['Delivery','#10'],['Self-serve','#10']];
  var n=1042;
  function money(x){return 'Rs '+x.toLocaleString('en-US')}
  function row(){
    var k=kinds[Math.floor(Math.random()*kinds.length)];
    var amt=Math.round(250+Math.random()*3500);
    n++;
    var d=document.createElement('div');d.className='tx';
    d.innerHTML='<div><div class="tx-l">'+k[0]+' · #'+n+'</div><div class="tx-s">just now</div></div>'+
      '<div style="text-align:right"><div class="tx-a">'+money(Math.round(amt))+'</div></div><div class="tx-b">Paid</div>';
    feed.insertBefore(d,feed.firstChild);
    while(feed.children.length>5)feed.removeChild(feed.lastChild);
    rev+=Math.round(amt);tx++;net+=Math.round(amt*0.53);
    var bi=Math.floor(Math.random()*3);b[bi]+=Math.round(amt);
    function set(id,val){var el=document.getElementById(id);if(el){el.textContent=val;el.classList.remove('bump');void el.offsetWidth;el.classList.add('bump');}}
    set('kpiRev',money(rev));
    set('kpiTx',tx.toLocaleString('en-US'));
    set('kpiNet',money(net));
    ['br1','br2','br3'].forEach(function(id,i){var el=document.getElementById(id);if(el)el.textContent=money(b[i])});
  }
  for(var i=0;i<4;i++)row();
  if(!reduce){setInterval(row,2600);}
})();

// Hamburger menu toggle
(function(){
  var btn=document.querySelector('.nav-toggle');
  var links=document.querySelector('.nav-links');
  if(!btn||!links)return;
  btn.addEventListener('click',function(){
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
  // close on link tap
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
  // close on outside tap
  document.addEventListener('click',function(e){
    if(!e.target.closest('.nav')){
      btn.classList.remove('open');
      links.classList.remove('open');
    }
  });
})();
