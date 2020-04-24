document.onreadystatechange = function first() {
  if (document.readyState !== 'complete') {
    document.querySelector('body').style.visibility = 'hidden';
    document.querySelector('#loader').style.visibility = 'visible';
  } else {
    setTimeout(() => {
      document.querySelector('#loader').style.display = 'none';
      document.querySelector('body').style.visibility = 'visible';

      // CODE HERE
      (function toggleMainMenu() {
        const toggleMenu = document.getElementsByClassName('toggle-menu')[0];
        const header = document.getElementsByTagName('header')[0];
        const main = document.getElementsByTagName('main')[0];
        toggleMenu.addEventListener('click', () => {
          toggleMenu.classList.toggle('active');
          header.classList.toggle('active');
          if (main) main.classList.toggle('active');
        });
      })();

      (function selectMainMenuItem() {
        const toggleMenu = document.getElementsByClassName('toggle-menu')[0];
        const header = document.getElementsByTagName('header')[0];
        const main = document.getElementsByTagName('main')[0];
        const mainMenuItem = Array.from(
          document.getElementsByClassName('main-menu__item')
        );
        mainMenuItem.forEach(item => {
          item.addEventListener('click', () => {
            mainMenuItem.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            toggleMenu.classList.toggle('active');
            header.classList.toggle('active');
            if (main) main.classList.toggle('active');
          });
        });
      })();
    }, 500);
  }
};
