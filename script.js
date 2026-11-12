const pages = [...document.querySelectorAll(".page")];
const dots = [...document.querySelectorAll(".dot")];
let current = 0;

function showPage(index) {
 current = (index + pages.length) % pages.length;
 pages.forEach((page,i) => page.classList.toggle("active",i===current));
 dots.forEach((dot,i) => dot.classList.toggle("active",i===current));
 document.getElementById("prev").disabled = current===0;
 document.getElementById("next").textContent =
   current===pages.length-1 ? "Start Again ↻" : "Next Memory →";
}

document.getElementById("prev").onclick = () => showPage(current-1);
document.getElementById("next").onclick = () => showPage(current+1);
dots.forEach((dot,i) => dot.onclick = () => showPage(i));

const song = document.getElementById("song");
const play = document.getElementById("play");
const topPlay = document.getElementById("musicTop");
const seek = document.getElementById("seek");

async function toggleSong() {
 if(song.paused) {
   try { await song.play(); }
   catch(e) { alert("Song file nahi mili. MP3 folder check karo."); }
 } else song.pause();
}

function updateButtons() {
 play.textContent = song.paused ? "▶" : "Ⅱ";
 topPlay.textContent = song.paused ? "♫ Play Song" : "Ⅱ Pause Song";
}
play.onclick = toggleSong;
topPlay.onclick = toggleSong;
song.onplay = updateButtons;
song.onpause = updateButtons;

function fmt(s) {
 if(!Number.isFinite(s)) return "00:00";
 return String(Math.floor(s/60)).padStart(2,"0")+":"+
 String(Math.floor(s%60)).padStart(2,"0");
}
song.onloadedmetadata = () => {
 document.getElementById("duration").textContent = fmt(song.duration);
};
song.ontimeupdate = () => {
 document.getElementById("time").textContent = fmt(song.currentTime);
 if(song.duration) seek.value = song.currentTime/song.duration*100;
};
seek.oninput = () => {
 if(song.duration) song.currentTime = seek.value/100*song.duration;
};
showPage(0);
