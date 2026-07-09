import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { User } from '../types';
import './AppLayout.css';

type AppLayoutProps = {
  activeUser: User | null;
  children: ReactNode;
  onLogout: () => void;
};

export function AppLayout({ activeUser, children, onLogout }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Photo Album Portal</p>
          <h1>Manage client-ready photo albums</h1>
        </div>
        <div className="topbar-actions">
          <Link to="/" className="link-btn">Login</Link>
          <button className="link-btn secondary" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main className="main-grid">
        <aside className="sidebar">
          <div className="card">
            <p className="eyebrow">Signed in as</p>
            <h2>{activeUser?.name ?? 'Guest'}</h2>
            <p>{activeUser?.email ?? 'Choose a role to continue'}</p>
            {activeUser && <p className="pill">{activeUser.role === 'photographer' ? 'Photographer' : 'Client'}</p>}
          </div>

          <div className="card">
            <h3>Quick actions</h3>
            <ul>
              <li>Link Google Drive folder</li>
              <li>Publish albums per client</li>
              <li>Show only assigned collections</li>
            </ul>
          </div>
        </aside>

        <section className="content">{children}</section>
      </main>
    </div>
  );
}
