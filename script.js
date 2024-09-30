const loadingText = document.getElementById('loading');
  let dots = 1;

  setInterval(() => {
    loadingText.textContent = '.'.repeat(dots);
    dots = (dots % 3) + 1;
  }, 500);


const modeBtn = document.getElementById("mode")
const mode = document.getElementById("mode-btn")

modeBtn.addEventListener('click',()=>{
    const body = document.body;
    body.classList.toggle('dark');
})

modeBtn.addEventListener('mouseenter', ()=>{
    gsap.to(cursor,{
        scale: 2,
    })
})
modeBtn.addEventListener('mouseleave', ()=>{
    gsap.to(cursor,{
        scale:1,
    })
})


const cursor = document.getElementById("cursor")

var xScale = 1;
var yScale = 1;

var xPrev = 0;
var yPrev = 0;
window.addEventListener("mousemove", (dets)=>{
    
    xScale = gsap.utils.clamp(.1, 1.2, dets.clientX -xPrev)
    yScale = gsap.utils.clamp(.1, 1.2, dets.clientY -yPrev)
    
    xPrev = dets.clientX
    yPrev = dets.clientY

    gsap.to(cursor,{
        x: dets.x,
        y: dets.y,
        duration: 0.4,
        ease: Expo,
    })
    cursor.style.transform = `scale(${xScale},${yScale})`
})

const logo = document.getElementById('name-box')
const logoName = document.getElementById('name')
logo.addEventListener('mouseenter', ()=>{
    gsap.to(cursor,{
        scale: 5,
        borderRadius: "0%"
    })
    gsap.to(logoName,{
        
    })
})
logo.addEventListener('mouseleave', ()=>{
    gsap.to(cursor,{
        scale:1,
        borderRadius: "50%"
    })
})