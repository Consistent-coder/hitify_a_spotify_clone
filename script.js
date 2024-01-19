
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songplay = Array.from(document.getElementsByClassName("songplay"));
let containerSong = document.querySelector(".containersong");

let songsP = [

    { songname: "Drunk Text- Henry Moore", filePath: "./songs/1.mp3", coverPath: "./covers/image.avif" ,timeStamp:"3:08"},
    { songname: "When You're Gone- Shawn Mendes", filePath: "./songs/2.mp3", coverPath: "./covers/image.avif",timeStamp:"2:50" },
    { songname: "Leave Before You Love me- Marshmello", filePath: "./songs/3.mp3", coverPath: "./covers/image.avif" ,timeStamp:"2:45"},
    { songname: "Love to Lose- Sandro Cavaza", filePath: "./songs/4.mp3", coverPath: "./covers/image.avif" ,timeStamp:"2:58"},
    { songname: "Stiches- Shawn Mendes", filePath: "./songs/5.mp3", coverPath: "./covers/image.avif" ,timeStamp:"4:28"},
    { songname: "Hua Main- Arijit Singh", filePath: "./songs/6.mp3", coverPath: "./covers/image.avif" ,timeStamp:"4:36"},
    { songname: "Satranga -Arijit Singh", filePath: "./songs/7.mp3", coverPath: "./covers/image.avif" ,timeStamp:"4:31"},
    { songname: "Nadaan Parindey - Mohit Chauhan", filePath: "./songs/8.mp3", coverPath: "./covers/image.avif" ,timeStamp:"6:26"},
    { songname: "Tum Ho- Mohit Chauhan", filePath: "./songs/9.mp3", coverPath: "./covers/image.avif"  ,timeStamp:"5:18"},
    { songname: "Shawn Mendes- Treat You Better", filePath: "./songs/10.mp3", coverPath: "./covers/image.avif"  ,timeStamp:"3:08"},
    { songname: "Shayad- Arijit Singh", filePath: "./songs/11.mp3", coverPath: "./covers/image.avif" ,timeStamp:"4:08"},
    { songname: "Deva Deva- Arijit Singh", filePath: "./songs/12.mp3", coverPath: "./covers/image.avif" ,timeStamp:"4:39"},
    { songname: "Deva Shree Ganesha - Ajay-Atul", filePath: "./songs/13.mp3", coverPath: "./covers/image.avif" ,timeStamp:"5:57"},
    { songname: "Hardum humdum- Arijit Singh", filePath: "./songs/14.mp3", coverPath: "./covers/image.avif" ,timeStamp:"3:07"},
    { songname: "Rasiya Reprise- Arijit Singh", filePath: "./songs/15.mp3", coverPath: "./covers/image.avif" ,timeStamp:"4:45"},
    { songname: "Rait Zara Si-Arijit Singh", filePath: "./songs/16.mp3", coverPath: "./covers/image.avif" ,timeStamp:"4:50"},
    { songname: "Hymn For The Weekend- ColdPlay", filePath: "./songs/17.mp3", coverPath: "./covers/image.avif" ,timeStamp:"4:27"}
]

let songs = [...songsP];



let totalSong = 17; //0 to n-1
let counter = 0;
let audio = new Audio(songs[counter].filePath);
let playbarSongname = document.getElementById("PlaybarSongname");
let loop = document.querySelector(".loop");
let looper = false;
function main() {

    function shuffleArray(songs) {
        for (let i = songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [songs[i], songs[j]] = [songs[j], songs[i]];
        }
        return songs;
    }

    let shuffle = document.querySelector(".shuffle");
    shuffle.addEventListener("click", (e) => {
        audio.pause();
        if (shuffle.textContent === "SHUFFLE") {
            songs = shuffleArray(songs);
            songplay.forEach((s, i) => {
                console.log(s, i);
                s.getElementsByTagName("img")[0].src = songs[i].coverPath; //first img tag will get all
                //for each sonplay class.
                s.getElementsByTagName("span")[0].innerText = songs[i].songname;
            })
            totalSong = 17; //0 to n-1
            counter = 0;
            nextSong();
            shuffle.textContent = "UNSHUFFLE";
        }
        else {
            songs = [...songsP];
            songplay.forEach((s, i) => {
                console.log(s, i);
                s.getElementsByTagName("img")[0].src = songs[i].coverPath; //first img tag will get all
                //for each sonplay class.
                s.getElementsByTagName("span")[0].innerText = songs[i].songname;
            })
            totalSong = 17; //0 to n-1;
            counter = 0;
            nextSong();
            shuffle.textContent = "SHUFFLE";
        }

    })
    let changeProgressBar = () => {
        myProgressBar.addEventListener("change", () => {
            //myProgressBar.value=progress;
            audio.currentTime = parseInt((myProgressBar.value / 100) * audio.duration);
        })


        let remainingTimeInSeconds = parseFloat(audio.duration - audio.currentTime);

        // Calculate minutes and seconds
        let remainingMinutes = parseFloat(Math.floor(remainingTimeInSeconds / 60));
        let remainingSeconds = parseFloat(Math.floor(remainingTimeInSeconds % 60).toFixed(2));
        if(remainingSeconds>60){
            remainingSeconds=(remainingSeconds-60);
            remainingMinutes+=1;
        }
        // Format the remaining time as "mm:ss"
        document.querySelectorAll(".timestamp")[counter].textContent = `${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    }

    let checkProgressBar = () => {
        audio.addEventListener('timeupdate', () => {
            //console.log("time updates");

            let remainingTimeInSeconds = parseFloat(audio.duration - audio.currentTime);

        // Calculate minutes and seconds
        let remainingMinutes = parseFloat(Math.floor(remainingTimeInSeconds / 60));
        let remainingSeconds = parseFloat(Math.floor(remainingTimeInSeconds % 60).toFixed(2));
        if(remainingSeconds>60){
            remainingSeconds=(remainingSeconds-60);
            remainingMinutes+=1;
        }
        // Format the remaining time as "mm:ss"
        document.querySelectorAll(".timestamp")[counter].textContent = `${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

            progress = parseInt((audio.currentTime / audio.duration) * 100);
            //console.log(progress);
            myProgressBar.value = progress;

            if (myProgressBar.value === "100" && looper == false) {
                counter += 1;
                nextSong();
            }
            else if (myProgressBar.value === "100" && looper == true) {
                /*myProgressBar.value=0;*/
                nextSong();
            }
        })

    }

    let playSongs = () => {
        document.querySelector(".act").addEventListener("click", (e) => {

            checkProgressBar();
            changeProgressBar();
            songplay[counter].style.border = "5px solid green"
            document.querySelectorAll(".musicplay")[counter].style.fill = "green";
            if (e.target.id === "cirpause" || audio.currentTime <= 0) {
                audio.play();
                document.querySelector("#cirpause").classList.add("hide");
                document.querySelector("#cirplay").classList.remove("hide");
                gif.style.opacity = 1;
                playbarSongname.textContent = songs[counter].songname;
            }
            else {
                console.log(e.target.id);
                audio.pause();
                document.querySelector("#cirpause").classList.remove("hide");
                document.querySelector("#cirplay").classList.add("hide");
                gif.style.opacity = 0;

            }
        });

    }

    let nextSong = () => {
        if (counter == totalSong) {
            counter = 0;
        }
        if(counter<0){
            counter=0;
        }
        for (let i = 1; i <= totalSong; i++) {
            document.getElementById(i).style.border = "5px solid rgba(0, 0, 255, 0.431)";
            document.querySelectorAll(".musicplay")[i - 1].style.fill = "red";
            document.getElementById(i).getElementsByClassName("timestamp")[0].textContent=songs[i-1].timeStamp;
        }
        audio = new Audio(songs[counter].filePath);
        audio.play();
        document.querySelector("#cirpause").classList.add("hide");
        document.querySelector("#cirplay").classList.remove("hide");
        gif.style.opacity = 1;
        checkProgressBar();
        changeProgressBar();
        playbarSongname.textContent = songs[counter].songname;
        document.querySelectorAll(".musicplay")[counter].style.fill = "green";
        /*************** */
        let currentSongDiv = document.getElementById(`${counter + 1}`);
        if (currentSongDiv) {
            currentSongDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            currentSongDiv.style.border = "5px solid green";
        }

        /***************** */

    }


    let forward = document.querySelector(".forward");
    forward.addEventListener("click", () => {
        audio.pause();
        counter += 1;
        nextSong(counter);

    });

    let backward = document.querySelector(".backward");
    backward.addEventListener("click", () => {
        audio.pause();
        if (counter > 0) {
            counter -= 1;
        }
        else if (counter === totalSong) {
            counter = 0;
        }
        audio = new Audio(songs[counter].filePath);
        nextSong();
        checkProgressBar();
    });

    songplay.forEach((s, i) => {
        console.log(s, i);
        s.getElementsByTagName("img")[0].src = songs[i].coverPath; //first img tag will get all
        //for each sonplay class.
        s.getElementsByTagName("span")[0].innerText = songs[i].songname;
        s.getElementsByClassName("timestamp")[0].textContent=songs[i].timeStamp;
    })

    playSongs();

    containerSong.addEventListener("click", (e) => {
        if (e.target.classList.contains("songplay")) {
            counter = parseInt(e.target.id);
            audio.pause();
            counter--;
            nextSong(counter);
        }
    })

    loop.addEventListener("click", () => {
        if (loop.style.backgroundColor != "green") {
            loop.style.backgroundColor = "green";
            looper = true;
        }
        else {
            loop.style.backgroundColor = "black";
            looper=false;
        }
    })


    Array.from(document.querySelectorAll(".musicplay")).forEach((s) => {
        s.addEventListener("click", (e) => {
            if(audio.played){
            audio.pause();
            }
            counter = parseInt(e.target.parentNode.parentNode.id);
            counter--;
            nextSong();
        });
    });
}
main()