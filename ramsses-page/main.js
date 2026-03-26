import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const buttonText = button.textContent.trim();

      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);

      console.log(`Button clicked: ${buttonText}`);
    });
  });

  const infoLinks = document.querySelectorAll('.info-link');
  infoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const linkText = link.textContent.trim();
      console.log(`Info link clicked: ${linkText}`);
    });
  });

});
