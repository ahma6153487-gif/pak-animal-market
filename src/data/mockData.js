import { useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import {
  firebaseEnabled,
  loginWithEmail,
  logoutUser,
  signUpWithEmail,
  subscribeAuth,
} from './firebase';
import { demoUser, defaultListings } from './data/mockData';

const currency = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
});

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pak-animal-market-user');
    return saved ? JSON.parse(saved) : demoUser;
  });
  const [listings, setListings] = useState(defaultListings);
  const [toast, setToast] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({
    email: 'demo@pak-animal-market.com',
    password: 'demo1234',
    name: 'Bilal Ahmed',
    phone: '+92 300 1234567',
    city: 'Lahore',
  });

  useEffect(() => {
    const unsub = subscribeAuth((nextUser) => {
      if (nextUser) {
        const normalizedUser = {
          uid: nextUser.uid,
          email: nextUser.email || 'demo@pak-animal-market.com',
          displayName: nextUser.displayName || nextUser.email?.split('@')[0] || 'Market Buyer',
          city: nextUser.city || 'Karachi',
          phone: nextUser.phone || '+92 300 1112233',
          role: nextUser.role || 'buyer',
        };
        setUser(normalizedUser);
        localStorage.setItem('pak-animal-market-user', JSON.stringify(normalizedUser));
      }
    });

    return () => unsub && unsub();
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const filteredListings = useMemo(() => {
    const term = authForm?.search || '';
    return listings.filter((item) => {
      const matchesTerm = item.title.toLowerCase().includes(term.toLowerCase()) || item.location.toLowerCase().includes(term.toLowerCase());
      const matchesCategory = item.category === 'All' || item.category === item.category;
      return matchesTerm && matchesCategory;
    });
  }, [authForm, listings]);

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = authMode === 'signup'
        ? await signUpWithEmail(authForm.email, authForm.password, authForm.name, authForm.city, authForm.phone)
        : await loginWithEmail(authForm.email, authForm.password);

      const userData = result?.user
        ? {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName || authForm.name || authForm.email.split('@')[0],
            city: authForm.city || 'Lahore',
            phone: authForm.phone || '+92 300 0000000',
            role: 'buyer',
          }
        : {
            uid: 'demo-user',
            email: authForm.email,
            displayName: authForm.name || authForm.email.split('@')[0],
            city: authForm.city,
            phone: authForm.phone,
            role: 'buyer',
          };

      setUser(userData);
      localStorage.setItem('pak-animal-market-user', JSON.stringify(userData));
      setToast('Logged in successfully');
    } catch (error) {
      setToast(error.message || 'Authentication failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('pak-animal-market-user');
      setToast('Logged out successfully');
    } catch (error) {
      setToast(error.message || 'Logout failed.');
    }
  };

  const handleAddListing = (listing) => {
    setListings((current) => [listing, ...current]);
    setToast('Your animal listing is now live.');
  };

  const handleBuyListing = (listingId) => {
    setListings((current) =>
      current.map((item) =>
        item.id === listingId
          ? {
              ...item,
              status: 'sold',
              soldTo: user?.displayName || 'Buyer',
            }
          : item
      )
    );
    setToast('Purchase confirmed. Seller has been notified.');
  };

  const handleUpdateListingStatus = (listingId, status) => {
    setListings((current) =>
      current.map((item) => (item.id === listingId ? { ...item, status } : item))
    );
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">🐐</div>
          <div>
            <h1>PAK ANIMAL MARKET</h1>
            <small>Trusted animal trade in Pakistan</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/">Marketplace</NavLink>
          <NavLink to="/sell">Sell</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              <span className="user-pill">{user.displayName}</span>
              <button className="secondary-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <NavLink to="/auth" className="primary-button">Login</NavLink>
          )}
        </div>
      </header>

      <main className="page-wrap">
        <Routes>
          <Route
            path="/"
            element={
              <MarketplacePage
                user={user}
                listings={listings}
                handleBuyListing={handleBuyListing}
                toast={toast}
              />
            }
          />
          <Route
            path="/sell"
            element={<SellPage user={user} onAddListing={handleAddListing} />}
          />
          <Route
            path="/profile"
            element={<ProfilePage user={user} listings={listings} />}
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                listings={listings}
                onUpdateListingStatus={handleUpdateListingStatus}
              />
            }
          />
          <Route
            path="/auth"
            element={
              <AuthPage
                authMode={authMode}
                setAuthMode={setAuthMode}
                authForm={authForm}
                setAuthForm={setAuthForm}
                onSubmit={handleAuthSubmit}
                firebaseEnabled={firebaseEnabled}
              />
            }
          />
        </Routes>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function MarketplacePage({ user, listings, handleBuyListing, toast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory && item.status !== 'pending';
    });
  }, [listings, searchTerm, selectedCategory]);

  const topStats = [
    { label: 'Animals Listed', value: listings.length },
    { label: 'Verified Sellers', value: '120+' },
    { label: 'Live Orders', value: '84' },
    { label: 'Cities', value: '18' },
  ];

  return (
    <>
      <section className="hero-card">
        <div>
          <p className="eyebrow">Farm-to-market trusted network</p>
          <h2>Buy, sell, and trade healthy animals across Pakistan.</h2>
          <p>
            From dairy cattle and goats to poultry and pets, connect with verified sellers in your city.
          </p>
          <div className="hero-actions">
            <a href="#market" className="primary-button">Browse animals</a>
            <a href="/sell" className="secondary-button">Sell an animal</a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="mini-stat">
            <span>Today</span>
            <strong>37 new listings</strong>
          </div>
          <div className="mini-stat">
            <span>Average price</span>
            <strong>PKR 42,500</strong>
          </div>
          <div className="mini-stat">
            <span>Response time</span>
            <strong>Under 20 mins</strong>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {topStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section id="market" className="toolbar-panel">
        <div className="search-box">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by animal, city, or breed"
            aria-label="Search animals"
          />
        </div>

        <div className="filter-row">
          {['All', 'Cow', 'Goat', 'Bull', 'Poultry', 'Sheep', 'Pet'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={selectedCategory === cat ? 'chip active' : 'chip'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="listings-grid">
        {filteredListings.map((listing) => (
          <article key={listing.id} className="listing-card">
            <img src={listing.image} alt={listing.title} />
            <div className="listing-body">
              <div className="card-topline">
                <span className="badge">{listing.category}</span>
                <span className={`status ${listing.status}`}>{listing.status}</span>
              </div>
              <h3>{listing.title}</h3>
              <p className="meta-line">{listing.location} • {listing.breed}</p>
              <p className="desc">{listing.description}</p>
              <div className="price-row">
                <strong>{currency.format(listing.price)}</strong>
                <span>{listing.age}</span>
              </div>
              <div className="seller-row">
                <div>
                  <small>Seller</small>
                  <strong>{listing.seller}</strong>
                </div>
                <button
                  type="button"
                  className="primary-button small"
                  onClick={() => handleBuyListing(listing.id)}
                  disabled={listing.status === 'sold'}
                >
                  {listing.status === 'sold' ? 'Sold' : 'Buy now'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {!filteredListings.length && (
        <div className="empty-state">
          <h3>No animals match your current filters.</h3>
          <p>Try expanding the search or explore another category.</p>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

function SellPage({ user, onAddListing }) {
  const [form, setForm] = useState({
    title: '',
    category: 'Goat',
    breed: '',
    age: '8 months',
    price: '42000',
    location: 'Lahore',
    description: '',
    image: 'https://images.unsplash.com/photo-1551970634-747846a548cb?auto=format&fit=crop&w=900&q=80',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      window.location.href = '/auth';
      return;
    }

    const newListing = {
      id: Date.now().toString(),
      title: form.title,
      category: form.category,
      breed: form.breed || 'Healthy stock',
      age: form.age,
      price: Number(form.price),
      location: form.location,
      description: form.description || 'Healthy and well-cared-for animal ready for a new home.',
      image: form.image,
      seller: user.displayName || 'Verified Seller',
      status: 'pending',
    };

    onAddListing(newListing);
    setForm({
      title: '',
      category: 'Goat',
      breed: '',
      age: '8 months',
      price: '42000',
      location: 'Lahore',
      description: '',
      image: 'https://images.unsplash.com/photo-1551970634-747846a548cb?auto=format&fit=crop&w=900&q=80',
    });
  };

  return (
    <section className="panel-card form-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Sell your animal</p>
          <h2>List a new animal for sale</h2>
        </div>
      </div>

      <form className="sell-form" onSubmit={handleSubmit}>
        <div className="field-grid">
          <label>
            Animal title
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Example: Healthy Buffalo Cow"
            />
          </label>

          <label>
            Category
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="Cow">Cow</option>
              <option value="Goat">Goat</option>
              <option value="Bull">Bull</option>
              <option value="Sheep">Sheep</option>
              <option value="Poultry">Poultry</option>
              <option value="Pet">Pet</option>
            </select>
          </label>

          <label>
            Breed
            <input
              value={form.breed}
              onChange={(e) => setForm({ ...form, breed: e.target.value })}
              placeholder="Sahiwal, Boer, etc."
            />
          </label>

          <label>
            Age
            <input
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              placeholder="8 months"
            />
          </label>

          <label>
            Price (PKR)
            <input
              type="number"
              min="1000"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </label>

          <label>
            City
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Lahore, Karachi, etc."
            />
          </label>

          <label className="full-span">
            Description
            <textarea
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Share health details, vaccination history, and any special notes."
            />
          </label>

          <label className="full-span">
            Photo URL
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </label>
        </div>

        <div className="form-footer">
          <button type="submit" className="primary-button">Publish listing</button>
          <span className="helper-text">Before publishing, your listing will be reviewed by an admin.</span>
        </div>
      </form>
    </section>
  );
}

function ProfilePage({ user, listings }) {
  if (!user) {
    return (
      <section className="panel-card empty-state small-panel">
        <h3>Please log in to view your profile.</h3>
      </section>
    );
  }

  const soldItems = listings.filter((item) => item.soldTo === user.displayName).length;
  const activeListings = listings.filter((item) => item.seller === user.displayName && item.status !== 'sold').length;

  return (
    <section className="profile-grid">
      <article className="panel-card profile-card">
        <div className="avatar">{user.displayName?.slice(0, 1).toUpperCase() || 'U'}</div>
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
        <ul>
          <li><strong>City:</strong> {user.city}</li>
          <li><strong>Phone:</strong> {user.phone}</li>
          <li><strong>Role:</strong> {user.role || 'Buyer'}</li>
        </ul>
      </article>

      <article className="panel-card stats-card">
        <div className="mini-row">
          <span>Listings</span>
          <strong>{activeListings}</strong>
        </div>
        <div className="mini-row">
          <span>Purchases</span>
          <strong>{soldItems}</strong>
        </div>
        <div className="mini-row">
          <span>Trust score</span>
          <strong>4.9/5</strong>
        </div>
      </article>

      <article className="panel-card full-span">
        <h3>Recent activity</h3>
        <div className="activity-list">
          <div><span>Seller verification</span><strong>Approved</strong></div>
          <div><span>Identity review</span><strong>Complete</strong></div>
          <div><span>Security status</span><strong>Protected</strong></div>
        </div>
      </article>
    </section>
  );
}

function AdminPage({ listings, onUpdateListingStatus }) {
  const pendingListings = listings.filter((item) => item.status === 'pending');
  const activeListings = listings.filter((item) => item.status === 'available');
  const soldListings = listings.filter((item) => item.status === 'sold');

  return (
    <section className="admin-layout">
      <div className="stats-grid admin-stats">
        <article className="stat-card">
          <strong>{pendingListings.length}</strong>
          <span>Pending review</span>
        </article>
        <article className="stat-card">
          <strong>{activeListings.length}</strong>
          <span>Live listings</span>
        </article>
        <article className="stat-card">
          <strong>{soldListings.length}</strong>
          <span>Closed deals</span>
        </article>
      </div>

      <div className="panel-card">
        <h3>Moderation queue</h3>
        {pendingListings.length === 0 ? (
          <p className="muted">No pending listings right now.</p>
        ) : (
          <div className="admin-list">
            {pendingListings.map((item) => (
              <div key={item.id} className="admin-item">
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.seller} • {item.location}</small>
                </div>
                <div className="action-group">
                  <button type="button" className="secondary-button" onClick={() => onUpdateListingStatus(item.id, 'available')}>
                    Approve
                  </button>
                  <button type="button" className="ghost-button" onClick={() => onUpdateListingStatus(item.id, 'rejected')}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AuthPage({ authMode, setAuthMode, authForm, setAuthForm, onSubmit, firebaseEnabled }) {
  return (
    <section className="panel-card auth-card">
      <div className="auth-toggle">
        <button
          type="button"
          className={authMode === 'login' ? 'active' : ''}
          onClick={() => setAuthMode('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={authMode === 'signup' ? 'active' : ''}
          onClick={() => setAuthMode('signup')}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={onSubmit} className="auth-form">
        {authMode === 'signup' && (
          <>
            <label>
              Full name
              <input
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                placeholder="Your full name"
              />
            </label>
            <label>
              Phone
              <input
                value={authForm.phone}
                onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                placeholder="+92 300 1234567"
              />
            </label>
            <label>
              City
              <input
                value={authForm.city}
                onChange={(e) => setAuthForm({ ...authForm, city: e.target.value })}
                placeholder="Lahore"
              />
            </label>
          </>
        )}

        <label>
          Email
          <input
            type="email"
            value={authForm.email}
            onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={authForm.password}
            onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
            placeholder="••••••••"
            required
          />
        </label>

        <div className="auth-side-note">
          {firebaseEnabled ? 'Firebase authentication is enabled.' : 'Demo mode active. Firebase can be connected via .env values.'}
        </div>

        <button type="submit" className="primary-button full-width">
          {authMode === 'login' ? 'Login to marketplace' : 'Create account'}
        </button>
      </form>
    </section>
  );
}

export default App;
