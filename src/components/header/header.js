import '/src/styles/style.css';
import '/src/components/header/header.css';
import { getNode, css, addClass, removeClass } from '/src/lib';

(function () {
  const navScroll = getNode('.nav_scroll');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 190) {
      css(navScroll, 'display', 'flex');
      addClass(navScroll, 'sticky');
    } else if (window.scrollY < 190) {
      css(navScroll, 'display', 'none');
      removeClass(navScroll, 'sticky');
    }
  });

  const topBanner = getNode('.top_banner');
  const topBannerCloseBtn = getNode('.top_banner_close');

  function handleBannerClose() {
    topBanner.style.transition = 'All 0.5s';
    topBanner.style.transform = 'translateY(-50px)';

    setTimeout(() => {
      topBanner.remove();
    }, 250);
  }

  topBannerCloseBtn.addEventListener('click', handleBannerClose);
})();
