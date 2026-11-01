:root {
  --bg: #f3f7f2;
  --surface: #ffffff;
  --surface-soft: #eef7f0;
  --primary: #1d8f5f;
  --primary-dark: #126b45;
  --secondary: #123b3a;
  --accent: #f6c65b;
  --text: #11212d;
  --muted: #5b6d7a;
  --border: rgba(17, 33, 45, 0.08);
  --success: #1c9d72;
  --warning: #d97706;
  --danger: #dc2626;
  --shadow: 0 14px 32px rgba(12, 34, 32, 0.08);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(180deg, #effaf4 0%, #f5faf7 100%);
  color: var(--text);
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}

img {
  max-width: 100%;
  display: block;
}

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 18px 60px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid var(--border);
  border-radius: 22px;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 12px;
  z-index: 20;
  box-shadow: var(--shadow);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), #6bd6a9);
  color: white;
  font-size: 1.5rem;
}

.brand-wrap h1 {
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.45rem);
}

.brand-wrap small {
  color: var(--muted);
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.main-nav a {
  padding: 10px 14px;
  border-radius: 999px;
  color: var(--muted);
  font-weight: 600;
  transition: 0.2s ease;
}

.main-nav a.active,
.main-nav a:hover {
  background: var(--surface-soft);
  color: var(--secondary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-pill {
  padding: 10px 12px;
  background: #ecfdf5;
  color: var(--primary-dark);
  border-radius: 999px;
  font-weight: 700;
  border: 1px solid rgba(29, 143, 95, 0.15);
}

.page-wrap {
  padding-top: 22px;
}

.hero-card,
.panel-card,
.listing-card,
.stat-card,
.toolbar-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.hero-card {
  display: grid;
  grid-template-columns: 1.5fr 0.9fr;
  gap: 24px;
  padding: 28px;
  border-radius: 26px;
  background: linear-gradient(135deg, rgba(29, 143, 95, 0.96), rgba(20, 75, 57, 0.92));
  color: white;
  overflow: hidden;
}

.eyebrow {
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.76rem;
  line-height: 1;
  opacity: 0.8;
}

.hero-card h2 {
  margin: 0;
  font-size: clamp(2rem, 3.5vw, 3.2rem);
  line-height: 1.05;
}

.hero-card p {
  opacity: 0.96;
  font-size: 1.02rem;
  max-width: 680px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
}

.hero-panel {
  display: grid;
  gap: 14px;
  align-content: center;
}

.mini-stat {
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.mini-stat span {
  display: block;
  opacity: 0.8;
  font-size: 0.82rem;
}

.mini-stat strong {
  display: block;
  margin-top: 4px;
  font-size: 1.2rem;
}

.stats-grid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.stat-card {
  border-radius: 18px;
  padding: 18px 20px;
  display: flex;
  gap: 6px;
  flex-direction: column;
}

.stat-card strong {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
}

.stat-card span {
  color: var(--muted);
}

.toolbar-panel {
  margin-top: 26px;
  border-radius: 18px;
  padding: 18px;
}

.search-box input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 16px;
  background: #f9fbfa;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.chip,
.primary-button,
.secondary-button,
.ghost-button {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.chip {
  background: #f3f6f6;
  color: var(--muted);
  padding: 9px 14px;
  font-weight: 700;
}

.chip.active {
  background: rgba(29, 143, 95, 0.12);
  color: var(--primary-dark);
}

.primary-button,
.secondary-button,
.ghost-button {
  padding: 11px 16px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.primary-button {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.primary-button.small {
  padding: 9px 12px;
  font-size: 0.88rem;
}

.secondary-button {
  background: #edf8f3;
  color: var(--primary-dark);
}

.ghost-button {
  background: #fef2f2;
  color: var(--danger);
}

.primary-button:hover,
.secondary-button:hover,
.ghost-button:hover,
.chip:hover {
  transform: translateY(-1px);
}

.listings-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.listing-card {
  border-radius: 20px;
  overflow: hidden;
}

.listing-card img {
  width: 100%;
  height: 230px;
  object-fit: cover;
}

.listing-body {
  padding: 18px;
}

.card-topline {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.badge,
.status {
  font-size: 0.74rem;
  border-radius: 999px;
  padding: 7px 10px;
  font-weight: 700;
}

.badge {
  background: #edf7f3;
  color: var(--primary-dark);
}

.status.available {
  background: #ecfdf5;
  color: var(--success);
}

.status.pending {
  background: #fff7ed;
  color: var(--warning);
}

.status.sold {
  background: #fef2f2;
  color: var(--danger);
}

.listing-card h3 {
  margin: 14px 0 8px;
  font-size: 1.35rem;
}

.meta-line,
.desc,
.helper-text,
.muted {
  color: var(--muted);
}

.price-row,
.seller-row,
.mini-row,
.activity-list > div,
.admin-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.price-row {
  margin-top: 16px;
  font-size: 1.2rem;
}

.seller-row {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.seller-row small {
  display: block;
  color: var(--muted);
}

.form-card {
  padding: 22px;
  border-radius: 24px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 0;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--secondary);
  font-weight: 600;
}

input,
select,
textarea {
  border: 1px solid rgba(16, 24, 40, 0.08);
  border-radius: 12px;
  padding: 12px 14px;
  background: #f8fafb;
  color: var(--text);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.full-span {
  grid-column: 1 / -1;
}

.form-footer {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;
}

.profile-card,
.stats-card,
.full-span {
  border-radius: 22px;
  padding: 22px;
}

.full-span {
  grid-column: 1 / -1;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--primary), #8ad8b5);
  color: white;
  font-size: 1.6rem;
  font-weight: 800;
}

.profile-card h2 {
  margin: 16px 0 0;
}

.profile-card p,
.profile-card ul {
  color: var(--muted);
}

.profile-card ul {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: grid;
  gap: 8px;
}

.stats-card {
  display: grid;
  gap: 16px;
}

.activity-list {
  display: grid;
  gap: 12px;
}

.activity-list > div {
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.admin-layout {
  display: grid;
  gap: 18px;
}

.admin-stats {
  margin-top: 0;
}

.admin-list {
  display: grid;
  gap: 14px;
}

.admin-item {
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}

.admin-item strong,
.admin-item small {
  display: block;
}

.admin-item small {
  margin-top: 6px;
  color: var(--muted);
}

.action-group {
  display: flex;
  gap: 10px;
}

.auth-card {
  max-width: 520px;
  margin: 32px auto 0;
  padding: 24px;
  border-radius: 22px;
}

.auth-toggle {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 18px;
  gap: 10px;
  background: #f5f7f8;
  padding: 6px;
  border-radius: 12px;
}

.auth-toggle button {
  border: none;
  background: transparent;
  border-radius: 10px;
  padding: 12px 10px;
  font-weight: 700;
  color: var(--muted);
  cursor: pointer;
}

.auth-toggle button.active {
  background: white;
  color: var(--secondary);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.auth-form {
  display: grid;
  gap: 16px;
}

.full-width {
  width: 100%;
}

.auth-side-note {
  color: var(--muted);
  font-size: 0.9rem;
}

.empty-state {
  margin-top: 26px;
  padding: 28px;
  border-radius: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
  text-align: center;
}

.toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: rgba(17, 33, 45, 0.95);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  z-index: 80;
}

@media (max-width: 980px) {
  .hero-card,
  .profile-grid,
  .listings-grid,
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .hero-card {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-wrap: wrap;
  }
}

@media (max-width: 700px) {
  .app-shell {
    padding: 12px 12px 44px;
  }

  .topbar {
    position: static;
  }

  .main-nav {
    justify-content: space-between;
    width: 100%;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .stats-grid,
  .listings-grid,
  .field-grid,
  .profile-grid {
    grid-template-columns: 1fr;
  }

  .hero-card {
    padding: 20px;
  }

  .section-heading,
  .form-footer,
  .seller-row,
  .price-row,
  .card-topline,
  .admin-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-group {
    width: 100%;
  }

  .action-group button {
    flex: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

