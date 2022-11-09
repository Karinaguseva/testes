import birdsData from '../../data/birds.js';


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  let randomNum = getRandomIntInclusive(0, 5)

const playBtn = document.querySelector('.player__icon');
const audio = new Audio();
let isPlay = false;

let playNum = 0;
audio.src = birdsData[0][randomNum].audio;

function playAudio() {
  audio.play();
  playBtn.style.backgroundImage = `url(../../assets/images/pause.svg)`;
  isPlay = true;
}

audio.onended = (pauseAudio);

function pauseAudio() {
  audio.pause();
  playBtn.style.backgroundImage = `url(../../assets/images/play.svg)`;
  isPlay = false;
}

playBtn.addEventListener('click', () => {
  isPlay == false ? playAudio() : pauseAudio(); 
});

const progressContainer = document.querySelector('.player__progress-wrap');
const progress = document.querySelector('.player__progress');

//движение прогресс-бара
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
  }
  audio.addEventListener('timeupdate', updateProgress)
  
  //нажатие на прогресс-бар
  function setsProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }
  
  progressContainer.addEventListener('click', setsProgress)
  
  const current = document.querySelector('.player__time_current');
  const length = document.querySelector('.player__time_length');
  
  //текущее и общее время трека
  function timeSong(){
    current.innerHTML = (formatTime(audio.currentTime));
    length.innerHTML = birdsData[0][randomNum].duration;
  }
  
  audio.addEventListener('timeupdate', timeSong);
  audio.addEventListener('loadeddata', timeSong);
  
  //форматирование времени
  function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
  };

  //кнопка громкости
const volumeBtn = document.querySelector('.volume__btn')
let isMuted = false

function mute(){
  isMuted = true
  volumeBtn.classList.add('volume__btn_active')
  audio.muted = true
}
function noMute(){
  isMuted = false
  volumeBtn.classList.remove('volume__btn_active')
  audio.muted = false
}

volumeBtn.addEventListener('click', () => {
    if (isMuted === false) {
      mute()
    } else {
      noMute()
    }
})

//слайдер громкости
const volumeProgress = document.querySelector('.volume__progress');

volumeProgress.oninput = function() {
  volumeProgress.value = this.value;
  audio.volume = this.value / 100; 
  if(this.value != 0){
    noMute()
  } else{
    mute()
  }
}

localStorage.setItem('name', 'Karina')