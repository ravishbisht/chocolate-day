// import gsap from "gsap"

document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.getElementById("hearts");
  const cta = document.getElementById("cta");
//   const celebrationMessage = document.getElementById("celebration-message");
  const fireworksCanvas = document.getElementById("fireworks");
  const ctx = fireworksCanvas.getContext("2d");

  // Set canvas size
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;

  // Animate title
  gsap.from("#title", {
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)",
  });

  // Animate message
  gsap.from("#message", {
    opacity: 0,
    y: -50,
    duration: 1.5,
    delay: 0.5,
    ease: "elastic.out(1, 0.5)",
  });

  // Animate CTA button
  gsap.from("#cta", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    delay: 1,
    ease: "elastic.out(1, 0.5)",
  });

  // Heart rain animation
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = "-30px";
    hearts.appendChild(heart);

    gsap.to(heart, {
      y: "100vh",
      rotation: Math.random() * 360 + 45,
      duration: Math.random() * 3 + 2,
      ease: "power1.in",
      onComplete: () => {
        heart.remove();
      },
    });
  }

  // Create hearts periodically
  const heartInterval = setInterval(createHeart, 1000);

  // Hover effect for CTA button
  cta.addEventListener("mouseenter", () => {
    gsap.to(cta, {
      scale: 1.1,
      duration: 0.3,
    });
  });
  cta.addEventListener("mouseleave", () => {
    gsap.to(cta, {
      scale: 1,
      duration: 0.3,
    });
  });

  // Click effect for CTA button
  cta.addEventListener("click", (e) => {
    gsap.to(cta, {
      scale: 0.9,
      yoyo: true,
      repeat: 1,
      duration: 0.1,
    });
    // showCelebrationMessage();
    createFireworks();
  });

//   function showCelebrationMessage() {
//     celebrationMessage.classList.remove("hidden");

//     gsap.to(celebrationMessage, {
//       opacity: 1,
//       y: 20,
//       duration: 1,
//       ease: "bounce.out",
//       onComplete: () => {
//         gsap.to(celebrationMessage, {
//           opacity: 0,
//           y: -20,
//           duration: 1,
//           delay: 2,
//           onComplete: () => {
//             celebrationMessage.classList.add("hidden");
//           },
//         });
//       },
//     });
//   }

  // Fireworks animation
  function createFireworks() {
    const fireworks = [];
    const particleCount = 100;
    const gravity = 0.1;
    const friction = 0.99;

    for (let i = 0; i < particleCount; i++) {
      fireworks.push({
        x: window.innerWidth / 2,
        y: window.innerHeight,
        vx: Math.random() * 6 - 3,
        vy: Math.random() * -15 - 10,
        radius: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 50%, 50%)`,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

      fireworks.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += gravity;
        particle.vx *= friction;
        particle.vy *= friction;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        if (particle.y > window.innerHeight) {
          fireworks.splice(index, 1);
        }
      });

      if (fireworks.length > 0) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
      }
    }

    animate();
  }

  // Clean up on page unload
  window.addEventListener("beforeunload", () => {
    clearInterval(heartInterval);
  });
});
