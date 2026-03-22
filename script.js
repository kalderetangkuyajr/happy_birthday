document.addEventListener("DOMContentLoaded", () => {

  let typingInterval = null;

  const inputs = document.querySelectorAll(".password-box input");
  let isUnlocked = false;

  inputs.forEach((input, index) => {

    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
      checkPassword();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        inputs[index - 1].focus();
      }
    });

  });

  inputs[0].focus();

  function checkPassword() {
    if (isUnlocked) return;

    let password = "";
    inputs.forEach(i => password += i.value);

    if (password.length === 4) {
      if (password === "2028") {
        isUnlocked = true;

        const login = document.getElementById("loginPage");
        const birthdayPage = document.getElementById("birthdayPage");
        const tulipBG = document.getElementById("tulipBG");
        const moon = document.querySelector(".moon");
        const music = document.getElementById("birthdayMusic");

        login.style.display = "none";

        [birthdayPage, tulipBG, moon].forEach(el => {
          el.classList.remove("hidden");
        });

        requestAnimationFrame(() => {
          document.body.classList.remove("login-mode");
          document.body.classList.add("main-mode");

          moon.classList.add("show");

      
          createStars();
          startSkyEffects();

          music.volume = 0;
          music.play();

          let volume = 0;
          const fade = setInterval(() => {
            volume += 0.01;
            if (volume >= 0.5) {
              volume = 0.5;
              clearInterval(fade);
            }
            music.volume = volume;
          }, 100);
        });

      } else {
        inputs.forEach(i => i.value = "");
        inputs[0].focus();
      }
    }
  }

const messages = [

`I’ll turn on all the lights
and stay awake through the night
waiting for the morning light
just to read the story of our life.

I smile softly at each page,
yet without you, seconds feel like ages.
If only we could weave a few more chapters, 
perhaps no questions would remain unanswered.

My hands tremble at the final page,
my beating heart confined in a cage.
I still linger on your name, like a moth to a flame.
And though you’ve chosen a different lane, 
I still hope that if we meet again, your embrace feels the same.`,

`It does not matter how many times I’ve had to comfort you for another man,
nor how many times I may have to—
for every ache it brings me and every moment it takes,
I know it will all be worth it.`,

`If we once again meet—
my heart will beat the same way
as the night we first met.`,

`We might be walking on different paths,
but at least I know
that we're staring at the same moon.`,

`Hihigugmaon ko ikaw kada adlaw.`,

 `Nahihidlaw ako ha imo.`

];

  let shuffledMessages = [];
let messageIndex = 0;

function shuffleMessages() {
  shuffledMessages = [...messages];

  for (let i = shuffledMessages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledMessages[i], shuffledMessages[j]] =
    [shuffledMessages[j], shuffledMessages[i]];
  }

  messageIndex = 0;
}

shuffleMessages();
  
function typeText() {


  if (typingInterval) clearInterval(typingInterval);

  if (messageIndex >= shuffledMessages.length) {
    shuffleMessages();
  }

  const message = shuffledMessages[messageIndex++];
  const el = document.getElementById("typedText");

  el.innerHTML = "";
  let i = 0;

  typingInterval = setInterval(() => {
    el.innerHTML += message.charAt(i);
    i++;
    if (i >= message.length) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
  }, 70);
}

window.toggleLetter = function () {
  const letter = document.getElementById("letter");
  letter.classList.toggle("show");

  if (!letter.classList.contains("show")) {
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
    document.getElementById("typedText").innerHTML = "";
    return;
  }

  typeText();
};

  const tulips = document.querySelectorAll('.tulip');
  const overlay = document.getElementById('polaroidOverlay');
  const polaroidImg = document.getElementById('polaroidImg');

  const photos = [
    "1.jpg","2.jpeg","3.jpeg","4.jpeg","5.jpeg",
    "6.jpeg","7.jpeg","8.jpeg","9.jpeg","10.jpg",
    "11.jpg","12.jpeg","13.jpeg"
  ];

  let shuffledPhotos = [];
  let currentIndex = 0;

  function shufflePhotos() {
    shuffledPhotos = [...photos];
    for (let i = shuffledPhotos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPhotos[i], shuffledPhotos[j]] = [shuffledPhotos[j], shuffledPhotos[i]];
    }
    currentIndex = 0;
  }

  shufflePhotos();

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  tulips.forEach(tulip => {
    tulip.addEventListener('click', () => {
      if (currentIndex >= shuffledPhotos.length) shufflePhotos();

      const photo = shuffledPhotos[currentIndex++];
      polaroidImg.src = `pics/${photo}`;

      const tilt = randomRange(-15, 15);
      polaroidImg.style.transform = `rotate(${tilt}deg)`;

      overlay.style.display = 'flex';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    polaroidImg.src = '';
  });

  function createStars() {
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';

      const size = Math.random() * 2 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';

      const duration = Math.random() * 3 + 1;
      const delay = Math.random() * 5;

      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;

      document.body.appendChild(star);
    }
  }

  function createShootingStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * (window.innerHeight * 0.4) + "px";

    document.body.appendChild(star);

    setTimeout(() => star.remove(), 1200);
  }

  function createFirefly() {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';

    firefly.style.left = Math.random() * window.innerWidth + 'px';
    firefly.style.top = Math.random() * (window.innerHeight * 0.6) + 'px';

    const dx = (Math.random() - 0.5) * 100;
    const dy = (Math.random() - 0.5) * 100;

    firefly.style.setProperty('--x', dx + 'px');
    firefly.style.setProperty('--y', dy + 'px');

    const duration = 3 + Math.random() * 3;
    firefly.style.animationDuration = duration + 's';

    document.body.appendChild(firefly);

    setTimeout(() => firefly.remove(), duration * 1000);
  }

  function startSkyEffects() {
    setInterval(() => {
      createShootingStar();
    }, 2000 + Math.random() * 4000);

    setInterval(() => {
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) createFirefly();
    }, 1000);
  }

});
