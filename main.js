// Truy cập vào các thành phần
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const musicImg = document.querySelector(".music-img");
const lyricElement = document.querySelector(".lyric");
const headingElement = document.getElementById("heading");
// tạo hiểu ứng chuyển màu chữ headingElement
function changeColor() {
  const colors = ["red", "green", "blue", "yellow"];
  let index = 0;
  setInterval(function () {
    headingElement.style.color = colors[index];
    index = (index + 1) % colors.length;
  }, 1000);
}

// Tiêu đề bài hát, tương ứng với các file mp3
const songs = [
  {
    name: "laanh",
    lyric:
      "Cùng bên nhau mai sau Là điều ước muốn lớn nhấtBàn tay anh đưa raTựa là nắng ấm lấp lánhNày không gian bao laThuộc về cho riêng hai ta",
  },
  {
    name: "timlaibautroi",
    lyric:
      "Anh khóc vì giờ đây anh đã mất em rồiAnh khóc vì giờ đây em đã xa thật rồiAnh nhớ lời hẹn ước ta không xa rờiMà giờ đây sao chỉ anh lẻ loi",
  },
  {
    name: "ngoai30",
    lyric:
      "Dù mạnh mẽ hay mềm yếuThì em vẫn cười tươi thật tươiTrông như không có gìDù đau đớn em một mìnhÂm thầm em giấu hết trong tim",
  },
];

// Lấy index bất kỳ trong mảng songs để hiện thị
let songIndex = 1;

// Load 1 bài hát theo index
loadSong(songs[songIndex]);

// Cập nhật thông tin bài hát
function loadSong(song) {
  title.innerText = song.name;
  audio.src = `musics/${song.name}.mp3`;
  cover.src = `img/${song.name}.jpg`;
  musicImg.src = `img/${song.name}.jpg`;
  // tạo lyric chạy chữ
  let words = song.lyric.split(" ");
  let count = 0;
  setTimeout(
    setInterval(function () {
      lyricElement.textContent += words[count] + " ";
      count++;
      if (count === words.length) {
        clearInterval(intervalId);
      }
      return lyricElement.textContent;
    }, 1000),
    14000
  );
}
//
// Phát nhạc
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

//  dừng
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Xử lý khi prev bài hát
function prevSong() {
  // Xử lý khi prev bài hát
  songIndex--;
  lyricElement.textContent = "";

  // Nếu đang là bài hát đầu thì quay lại bài hát cuối
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  // Cập nhật thông tin của bài hát lên giao diện
  loadSong(songs[songIndex]);

  // Phát nhạc
  playSong();
}

// Next song
function nextSong() {
  // Tăng index của songIndex lên 1
  songIndex++;
  lyricElement.textContent = "";

  // Nếu đang là bài hát cuối thì quay lại bài hát đầu
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  // Cập nhật thông tin của bài hát lên giao diện
  loadSong(songs[songIndex]);

  // Phát nhạc
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Lắng nghe sự kiện
playBtn.addEventListener("click", () => {
  // Kiểm tra xem musicContainer có chứa class "play" hay không?
  const isPlaying = musicContainer.classList.contains("play");

  // Nếu có thì thực hiện pause
  // Nếu không thì thực hiện play
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Lắng nghe sự kiện khi next và prev bài hát
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Lắng nghe sự kiện khi kết thúc bài hát
audio.addEventListener("ended", nextSong);
// tăng giảm âm lượng
const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.oninput = function () {
  audio.volume = volumeSlider.value;
};
