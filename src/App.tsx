import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import type { Album, User } from './types';
import { initialAlbums, mockUsers } from './mockData';
import { LoginPage } from './pages/LoginPage';
import { PhotographerPage } from './pages/PhotographerPage';
import { ClientPage } from './pages/ClientPage';
import { ClientAlbumDetailRoute } from './pages/ClientAlbumDetailPage';

function App() {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  const navigate = useNavigate();

  const visibleAlbums = useMemo(() => {
    if (!activeUser) return [];
    if (activeUser.role === 'photographer') return albums;
    return albums.filter((album) => album.clientName === activeUser.clientName && album.status === 'Published');
  }, [activeUser, albums]);

  const handleLogin = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const match = mockUsers[normalizedEmail];

    if (!match || match.password !== password) {
      return false;
    }

    setActiveUser(match.user);
    navigate(match.user.role === 'photographer' ? '/photographer' : '/client');
    return true;
  };

  const handleLogout = () => {
    setActiveUser(null);
    navigate('/login');
  };

  const handleCreateAlbum = (newAlbum: Album) => {
    setAlbums((current) => [newAlbum, ...current]);
  };

  const handleSelectAlbum = (albumId: number) => {
    navigate(`/client/albums/${albumId}`);
  };

  return (
    <Routes>
      <Route path="/" element={activeUser ? <Navigate to={activeUser.role === 'photographer' ? '/photographer' : '/client'} replace /> : <LoginPage onLogin={handleLogin} />} />
      <Route path="/login" element={activeUser ? <Navigate to={activeUser.role === 'photographer' ? '/photographer' : '/client'} replace /> : <LoginPage onLogin={handleLogin} />} />
      <Route path="/photographer" element={<PhotographerPage activeUser={activeUser} albums={visibleAlbums} onLogout={handleLogout} onCreateAlbum={handleCreateAlbum} />} />
      <Route path="/client" element={<ClientPage activeUser={activeUser} albums={visibleAlbums} onLogout={handleLogout} onSelectAlbum={handleSelectAlbum} />} />
      <Route path="/client/albums/:albumId" element={<ClientAlbumDetailRoute activeUser={activeUser} albums={albums} onLogout={handleLogout} />} />
    </Routes>
  );
}

export default App;
