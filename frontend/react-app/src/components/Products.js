import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { useCart } from '../CartContext';
import './Products.css';
import heroBg from '../assets/matcha.jpg';

const currencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});


function Products({ user, onSignInClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { refreshCartCount } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      setMessage('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      onSignInClick();
      return;
    }
    try {
      await api.addToCart(product.product_id, 1, product.price);
      setMessage(`Added ${product.name} to cart!`);
      refreshCartCount(); // Update cart badge
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding to cart');
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    return ['All', ...uniqueCategories];
  }, [products]);

  const featuredProducts = useMemo(() => products.slice(0, 3), [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  const formatCategory = (category) => {
    if (category === 'All') return 'All';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products">
      {message && <div className="message">{message}</div>}

      <section className="hero-shell">
        <div className="hero-backdrop" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="hero-mist" aria-hidden="true" />
        <div className="hero-lines" aria-hidden="true" />

        <div className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Karlsruhe Matcha Patisserie</span>
            <h1>Refined matcha cakes, quiet cafe moments and crafted drinks for the Mori More table.</h1>
            <p>
              Mori More is shaped as a light-filled matcha destination in Karlsruhe, bringing together
              Uji-inspired layer cakes, signature cafe creations and refreshing drinks in a calm luxury setting.
            </p>
            <div className="hero-highlights">
              <span>Minimalist luxury atmosphere</span>
              <span>Matcha cakes, cafe and drinks</span>
              <span>Daily service in central Karlsruhe</span>
            </div>
            <div className="hero-actions">
              <a href="#menu" className="hero-link hero-link-primary">Explore The Menu</a>
              <a href="#visit-us" className="hero-link">Plan Your Visit</a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card">
              <span className="panel-label">Brand Story</span>
              <strong>Kyoto tea rituals, translated into a modern Karlsruhe storefront.</strong>
              <p>
                Every Mori More collection is designed around soft matcha tones, restrained presentation
                and a menu that feels both elegant and approachable from morning coffee to evening gifting.
              </p>
            </div>
            <div className="hero-stats">
              <div>
                <strong>{products.length}</strong>
                <span>Curated Menu Items</span>
              </div>
              <div>
                <strong>{categories.length - 1}</strong>
                <span>Signature Categories</span>
              </div>
              <div>
                <strong>09:00-20:30</strong>
                <span>Daily Opening Hours</span>
              </div>
            </div>
            <div className="store-card">
              <span className="panel-label">Signature Experience</span>
              <strong>Seasonal gift cakes and calm afternoon pairings.</strong>
              <p>
                Reserve celebration cakes ahead of time, discover coffee pairings for matcha desserts
                and stop by for an all-day menu designed for both quick visits and relaxed table service.
              </p>
              <div className="store-note-row">
                <span>Karlsruhe city centre pick-up</span>
                <span>Custom cakes with 24h notice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="store-info-band" id="visit-us">
        <article className="info-card">
          <span className="info-icon" aria-hidden="true">◷</span>
          <div>
            <span className="info-label">Opening Hours</span>
            <strong>Mon-Sun · 09:00-20:30</strong>
            <p>Fresh counter desserts in the morning, cafe service through the afternoon and curated gift boxes into the evening.</p>
          </div>
        </article>
        <article className="info-card">
          <span className="info-icon" aria-hidden="true">⌂</span>
          <div>
            <span className="info-label">Karlsruhe Store</span>
            <strong>Kaiserstrasse 145, 76133 Karlsruhe</strong>
            <p>Placed in the city centre for walk-ins, gifting pick-up and easy coffee breaks throughout the day.</p>
          </div>
        </article>
        <article className="info-card">
          <span className="info-icon" aria-hidden="true">✆</span>
          <div>
            <span className="info-label">Contact Us</span>
            <strong>+49 721 9876 4520</strong>
            <p>
              <a href="mailto:hello@morimore.de">hello@morimore.de</a>
              <span className="contact-divider">·</span>
              <a href="tel:+4972198764520">Call the store</a>
            </p>
          </div>
        </article>
      </section>

      <section className="featured-strip">
        {featuredProducts.map((product) => (
          <article key={product.product_id} className="featured-pill">
            <span className="featured-category">{formatCategory(product.category)}</span>
            <strong>{product.name}</strong>
            <span>{currencyFormatter.format(product.price)}</span>
          </article>
        ))}
      </section>

      <section className="catalog-header" id="menu">
        <div>
          <span className="eyebrow">Menu Categories</span>
          <h2>Choose from matcha cakes, cafe favorites and refreshing drinks.</h2>
        </div>
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? 'filter-chip active' : 'filter-chip'}
              onClick={() => setActiveCategory(category)}
            >
              {formatCategory(category)}
            </button>
          ))}
        </div>
      </section>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.product_id} className="product-card">
            <div className="card-image-wrap">
              <img src={product.image_url} alt={product.name} />
              <span className="category-tag">{formatCategory(product.category)}</span>
            </div>
            <div className="card-body">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
            <div className="product-footer">
              <div className="price-group">
                <span className="price">{currencyFormatter.format(product.price)}</span>
                <span className="product-note">Freshly crafted for the Mori More menu</span>
              </div>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
