console.log("Welcome to Spotify");

//Initialize the variables
let songIndex=0; 
let audioElement= new Audio('Songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');

let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Ye Dhokhe Pyar Ke Dhoke",filePath:"Songs/1.mp3",coverPath:"ab67616d0000b273fe7698d03ca4b2be0c6c3594.jpg"},
    {songName:"Let me love uh",filePath:"Songs/2.mp3",coverPath:"istockphoto-1.jpg"},
    {songName:"Dhokha",filePath:"Songs/3.mp3",coverPath:"istockphoto-2.jpg"},
    {songName:"Dil Galti kar Baitha hai",filePath:"Songs/4.mp3",coverPath:"3.jpg"},
    {songName:"Bheegi Si Bhaagi Si",filePath:"Songs/5.mp3",coverPath:"4.jpg"},
    {songName:"Gangsta Rollin Mashup",filePath:"Songs/6.mp3",coverPath:"5.jpg"},
    {songName:"Kesariya",filePath:"Songs/7.mp3",coverPath:"6.jpg"},
    {songName:"Mast Nazron Se",filePath:"Songs/8.mp3",coverPath:"7.jpg"},
    {songName:"Raatan Lambiyan",filePath:"Songs/9.mp3",coverPath:"8.jpg"},
    {songName:"Bali",filePath:"Songs/10.mp3",coverPath:"9.jpg"},
    {songName:"Rowdy Baby",filePath:"Songs/11.mp3",coverPath:"10.jpg"},
     
]  

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; //this for cover image set up 
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName; // this is for setting up the names of each song internally
})

//audioElement.play();    

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause(); 
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{    
    //Update Seekbar
    let  progress= parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value=progress;

})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

//for pause and play circle in the song box
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
// for play and pause circle in the song box
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`Songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 10){
        songIndex= 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})