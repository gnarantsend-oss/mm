if (window.matchMedia("(hover: hover)").matches) {
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.mcard');
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.zIndex = '100';
    card.style.transition = 'transform 0.1s ease-out';
  });

  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.mcard');
    if (!card) return;
    card.style.transform = '';
    card.style.zIndex = '1';
    card.style.transition = 'transform 0.5s ease';
  });
}