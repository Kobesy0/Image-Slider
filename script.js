const slider = document.querySelectorAll('.slider img');
const imgId = document.querySelector(".img-id");
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn");
const gallary = document.querySelector('.gallary-container')
const github = document.querySelector(".github")
const pause = document.querySelector(".pause");
const play = document.querySelector(".play")
gallary.style.gridTemplateColumns = `repeat(${slider.length} , 1fr)`;

let currentSlider = 0;
let interval;

// make sure play is auto in case the brower press next or previous
function makeSureOfPlay(){
    if(pause.style.display  == "none"){
        pause.style.display = "block"
        play.style.display = "none"
    }
}
autoSlider();
sliderDisapled()
function goToSlider(n){
    slider[currentSlider].classList.remove("active");
    // this is the important in the Code we use it to not get out of the number of the images
    currentSlider = (n + slider.length) % slider.length; 
    slider[currentSlider].classList.add("active");
    sliderDisapled()
    updateThumbnailactiveState(currentSlider)
}
// Make the images auto after 2.5 Scondes 
function autoSlider(){
    interval = setInterval(() => {
        goToSlider(currentSlider + 1)
    }, 2500);
}

// Back to the previous image
prevBtn.addEventListener("click" , () => {
    goToSlider(currentSlider - 1);
    clearInterval(interval)
    autoSlider()
    makeSureOfPlay()
});

// Move to the next image 
nextBtn.addEventListener("click" , ()=> {
    goToSlider(currentSlider + 1);
    clearInterval(interval);
    autoSlider();
    makeSureOfPlay()
});



function sliderDisapled(){
    prevBtn.disabled  = currentSlider === 0; // disabled before the first image
    nextBtn.disabled   = currentSlider === slider.length - 1; // disabled after the last image 
    imgId.innerHTML = `${currentSlider + 1} / ${slider.length}`; // write the number of image in Id 
};


slider.forEach((img , index) => {
    let thumbnail = img.cloneNode();
    gallary.appendChild(thumbnail);
    thumbnail.addEventListener("click" , ()=> {
        goToSlider(index)
    })
})


function updateThumbnailactiveState(index){
    gallary.querySelectorAll("img").forEach((img , i)=> {
        img.classList.toggle("active" , i === index)
    })
}

// Button to go to my Github 
github.addEventListener("click" , () => {
    const link = `https://github.com/Kobesy0`;
    window.open(link , "_blank")
})


// ----------------------------------------------
// To play or pause the image
pause.addEventListener("click" , ()=> {
    pause.style.display = "none";
    clearInterval(interval)
    play.style.display = "block";
})

play.addEventListener("click" , ()=> {
    play.style.display = 'none';
    autoSlider()
    pause.style.display = "block"
})