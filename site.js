const app=document;
const openDialog=(id)=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());app.querySelector(id) .showModal()}
for(const [button,id] of [['.header-menu','#menu-dialog'],['.header-search','#search-dialog'],['.mail-toggle','#mail-dialog']]) {
  app.querySelector(button) .addEventListener('click',()=>openDialog(id))
}
app.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close') .addEventListener('click',()=>dialog.close())
  dialog.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>dialog.close()))
  dialog.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close()}})
})
app.querySelector('#site-search') .addEventListener('input',event=>{
  const query=event.target.value.trim().toLowerCase();let count=0
  app.querySelectorAll('.search-results a').forEach(a=>{a.hidden=!(a.dataset.terms+' '+a.textContent).toLowerCase().includes(query);if(!a.hidden)count++})
  app.querySelector('.search-empty') .hidden=count>0
})
const reducedQuery=matchMedia('(prefers-reduced-motion: reduce)')
let reduced=reducedQuery.matches
reducedQuery.addEventListener('change',()=>{reduced=reducedQuery.matches})

// Optional quiet, generated ambience starts only after the visitor presses play.
let audio, gain
const music=app.querySelector('.music-toggle')!
music.addEventListener('click',async()=>{
  try {
    if(!audio){audio=new AudioContext();gain=audio.createGain();gain.gain.value=0;gain.connect(audio.destination)
      for(const frequency of [110,164.81,220.12]){const oscillator=audio.createOscillator();oscillator.type='sine';oscillator.frequency.value=frequency;oscillator.connect(gain);oscillator.start()}}
    const playing=music.getAttribute('aria-pressed')!=='true'
    await audio.resume();gain .gain.setTargetAtTime(playing?.012:0,audio.currentTime,.6)
    music.setAttribute('aria-pressed',String(playing));music.setAttribute('aria-label',playing?'Mute ambient sound':'Play ambient sound')
  } catch {music.setAttribute('aria-label','Ambient sound unavailable')}
})


window.addEventListener("scroll",()=>document.querySelector(".site-header").classList.toggle("is-scrolled",scrollY>30),{passive:true});