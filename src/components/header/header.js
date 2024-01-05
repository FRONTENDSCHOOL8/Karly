import '/src/styles/style.css';
import '/src/components/header/header.css';
import { getNode, css } from '/src/lib';

(function () {
  const navScroll = getNode('.nav_scroll');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 190) {
      css(navScroll, 'display', 'flex');
    } else if (window.scrollY < 190) {
      css(navScroll, 'display', 'none');
    }
  });
})();
