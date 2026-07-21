import './SiteFooter.css';

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__eyebrow">Mori More</span>
          <h2>Matcha cakes, coffee and refined drinks for Karlsruhe.</h2>
          <p>
            Mori More brand identity, website copy, layout treatments and product presentation are protected
            works. Unauthorized copying, redistribution or commercial reuse is prohibited without prior consent.
          </p>
        </div>

        <div className="site-footer__column">
          <span className="site-footer__title">Contact Us</span>
          <a href="mailto:hello@morimore.de">hello@morimore.de</a>
          <a href="tel:+4972198764520">+49 721 9876 4520</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">@morimore.karlsruhe</a>
        </div>

        <div className="site-footer__column">
          <span className="site-footer__title">Visit The Store</span>
          <p>Kaiserstrasse 145, 76133 Karlsruhe, Germany</p>
          <p>Mon-Sun · 09:00-20:30</p>
          <p>Custom celebration cakes with 24h advance notice.</p>
        </div>
      </div>

      <div className="site-footer__legal">
        <span>{`© ${year} Mori More. All rights reserved.`}</span>
        <span>Website visuals and menu content are maintained for brand, copyright and consumer contact compliance.</span>
      </div>
    </footer>
  );
}

export default SiteFooter;
