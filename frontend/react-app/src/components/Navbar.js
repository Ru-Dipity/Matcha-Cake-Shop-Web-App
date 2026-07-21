import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import logo from '../assets/mori_more.png';
import './Navbar.css';

function Navbar({ signOut, user, onSignInClick }) {
  const displayName = user?.signInDetails?.loginId || user?.username || 'User';
  const { cartCount } = useCart();
  
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          <img src={logo} alt="Mori More Logo" className="logo" />
          <div className="brand-copy">
            <span className="brand-title">Mori More</span>
            <span className="brand-subtitle">Matcha cakes, coffee and crafted drinks</span>
          </div>
        </Link>
      </div>
      <div className="nav-center">
        <Link to="/">Menu</Link>
        <Link to="/cart" className="cart-link">
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <Link to="/orders">Orders</Link>
      </div>
      <div className="nav-right">
        <div className="delivery-badge">
          <span className="delivery-title">Karlsruhe Matcha Studio</span>
          <span className="delivery-subtitle">Kyoto-inspired cakes, cafe moments and refreshing drinks</span>
        </div>
        {user ? (
          <div className="user-info">
            <span className="user-name">{displayName}</span>
            <button onClick={signOut} className="signout-btn">Sign Out</button>
          </div>
        ) : (
          <button onClick={onSignInClick} className="signout-btn">Sign In</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
