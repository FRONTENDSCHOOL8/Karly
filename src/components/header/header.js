import '/src/styles/style.css';
import '/src/components/header/header.css';
import { getNode, css, addClass, removeClass } from '/src/lib';

(function () {
  window.addEventListener('scroll', () => {
    const navScroll = getNode('.nav_scroll');
    if (window.scrollY >= 190) {
      css(navScroll, 'display', 'flex');
      addClass(navScroll, 'sticky');
    } else if (window.scrollY < 190) {
      css(navScroll, 'display', 'none');
      removeClass(navScroll, 'sticky');
    }
  });

  function handleBannerClose() {
    const topBanner = getNode('.top_banner');
    topBanner.style.transition = 'All 0.5s';
    topBanner.style.transform = 'translateY(-50px)';

    setTimeout(() => {
      topBanner.remove();
    }, 250);
  }

  const topBannerCloseBtn = getNode('.top_banner_close');
  topBannerCloseBtn.addEventListener('click', handleBannerClose);
})();
