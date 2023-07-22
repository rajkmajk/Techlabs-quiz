window.addEventListener('load', () => {
    const logo = document.getElementById('logo');
  
    function fadeIn() {
      let opacity = 0;
      const totalSteps = 30; // Adjust the number of steps
      const stepDuration = 50; // Adjust the duration of each step
  
      const interval = setInterval(() => {
        opacity += 2 / totalSteps;
        logo.style.opacity = opacity;
  
        if (opacity >= 1) {
          clearInterval(interval);
        }
      }, stepDuration);
    }
  
    fadeIn();
  });
  