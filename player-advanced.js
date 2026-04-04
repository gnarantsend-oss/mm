// ============================================================
// player-advanced.js — PiP болон Ambient Mode
// ============================================================

// Одоо байгаа openPlayer функцийг өргөтгөх (Хуучныг нь устгахгүй)
const originalOpenPlayer = window.openPlayer;

window.openPlayer = (m) => {
  originalOpenPlayer(m); // Хуучин логикоо ажиллуулна
  
  setTimeout(() => {
    const wrap = document.getElementById('playerWrap');
    const video = wrap.querySelector('video');
    
    if (video) {
      // 1. Picture-in-Picture товч нэмэх
      const pipBtn = document.createElement('button');
      pipBtn.innerHTML = '🔲 PiP Горим';
      pipBtn.className = 'btn-volume'; // Одоо байгаа CSS-ийг ашиглах
      pipBtn.style.position = 'absolute';
      pipBtn.style.top = '15px';
      pipBtn.style.right = '15px';
      pipBtn.style.zIndex = '999';
      
      pipBtn.onclick = async () => {
        try {
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          } else {
            // Metadata ачаалж дуусаагүй бол хүлээх
            if (video.readyState < 1) {
              await new Promise(resolve =>
                video.addEventListener('loadedmetadata', resolve, { once: true })
              );
            }
            await video.requestPictureInPicture();
          }
        } catch (e) {
          console.warn('PiP алдаа:', e.message);
        }
      };
      wrap.appendChild(pipBtn);

      // 2. Ambient Mode (Гэрэлтэлт)
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.inset = '-20px';
      canvas.style.width = 'calc(100% + 40px)';
      canvas.style.height = 'calc(100% + 40px)';
      canvas.style.filter = 'blur(40px) opacity(0.6)';
      canvas.style.zIndex = '-1';
      canvas.style.pointerEvents = 'none';
      wrap.style.position = 'relative';
      wrap.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      function drawAmbient() {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(drawAmbient);
      }
      video.addEventListener('play', () => {
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        drawAmbient();
      });
    }
  }, 1000); // Видео ачааллахыг хүлээх
};