import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AppLayout } from '../components/AppLayout';
import './ClientAlbumDetailPage.css';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useParams } from 'react-router-dom';
import type { Album, AgentMessage, User } from '../types';

type ClientAlbumDetailPageProps = {
  album: Album;
  activeUser: User | null;
  onLogout: () => void;
};

export function ClientAlbumDetailPage({ album, activeUser, onLogout }: ClientAlbumDetailPageProps) {
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(album.photos[0]?.id ?? null);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<number[]>([]);
  const [likedPhotoIds, setLikedPhotoIds] = useState<number[]>([]);
  const [dislikedPhotoIds, setDislikedPhotoIds] = useState<number[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [filter, setFilter] = useState<'all' | 'liked' | 'disliked'>('all');
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [agentMessages, setAgentMessages] = useState<AgentMessage[]>([{ id: 1, role: 'assistant', text: 'Ask me for feedback or edit suggestions on this photo.' }]);
  const [agentInput, setAgentInput] = useState('');

  const visiblePhotos = useMemo(() => {
    if (filter === 'liked') {
      return album.photos.filter((photo) => likedPhotoIds.includes(photo.id));
    }

    if (filter === 'disliked') {
      return album.photos.filter((photo) => dislikedPhotoIds.includes(photo.id));
    }

    return album.photos;
  }, [album.photos, dislikedPhotoIds, filter, likedPhotoIds]);

  const activePhoto = visiblePhotos.find((photo) => photo.id === selectedPhotoId) ?? visiblePhotos[0] ?? null;

  const togglePhoto = (photoId: number) => {
    setSelectedPhotoIds((current) => (current.includes(photoId) ? current.filter((id) => id !== photoId) : [...current, photoId]));
  };

  const handleLike = (photoId: number) => {
    setLikedPhotoIds((current) => (current.includes(photoId) ? current.filter((id) => id !== photoId) : [...current, photoId]));
    setDislikedPhotoIds((current) => current.filter((id) => id !== photoId));
  };

  const handleDislike = (photoId: number) => {
    setDislikedPhotoIds((current) => (current.includes(photoId) ? current.filter((id) => id !== photoId) : [...current, photoId]));
    setLikedPhotoIds((current) => current.filter((id) => id !== photoId));
  };

  useEffect(() => {
    if (!visiblePhotos.length) {
      setSelectedPhotoId(null);
      return;
    }

    if (!visiblePhotos.some((photo) => photo.id === selectedPhotoId)) {
      setSelectedPhotoId(visiblePhotos[0].id);
    }
  }, [selectedPhotoId, visiblePhotos]);

  useEffect(() => {
    setShowAgentChat(false);
    setAgentMessages([{ id: 1, role: 'assistant', text: `I can help review ${activePhoto?.title ?? 'this photo'} and suggest edits.` }]);
    setAgentInput('');
  }, [activePhoto?.id]);

  const handleAgentSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = agentInput.trim();

    if (!trimmed) {
      return;
    }

    setAgentMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', text: trimmed },
      { id: Date.now() + 1, role: 'assistant', text: `I can help with “${trimmed}” for ${activePhoto?.title ?? 'this photo'}.` },
    ]);
    setAgentInput('');
  };

  const handleKeyNavigation = (event: React.KeyboardEvent) => {
    if (!activePhoto || !visiblePhotos.length) return;
    const currentIndex = visiblePhotos.findIndex((photo) => photo.id === activePhoto.id);
    if (currentIndex === -1) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextPhoto = visiblePhotos[(currentIndex + 1) % visiblePhotos.length];
      setSelectedPhotoId(nextPhoto.id);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevPhoto = visiblePhotos[(currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length];
      setSelectedPhotoId(prevPhoto.id);
      return;
    }

    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      handleLike(activePhoto.id);
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      handleDislike(activePhoto.id);
    }
  };

  return (
    <ProtectedRoute user={activeUser} role="client">
      <AppLayout activeUser={activeUser} onLogout={onLogout}>
        <>
          <div className="card detail-card">
            <div className="detail-header">
              <div>
                <p className="eyebrow">Album details</p>
                <h3>{album.title}</h3>
                <p>{album.clientName}</p>
              </div>
              <button type="button" className="help-icon" onClick={() => setShowHelp((current) => !current)} aria-label="Ask for help">
                ?
              </button>
            </div>

            <p>{album.driveLink}</p>
            <div className="selection-summary">
              {selectedPhotoIds.length > 0 && <button type="button" className="link-btn secondary" onClick={() => setSelectedPhotoIds([])}>Clear</button>}
            </div>
            <div className="selection-summary">
              <span>{likedPhotoIds.length} liked • {dislikedPhotoIds.length} disliked</span>
            </div>

            {showHelp && (
              <div className="help-panel">
                <h4>Need clarification?</h4>
                <p>This help icon will later connect to an AI agent so you can ask for edits or feedback about the selected photos.</p>
              </div>
            )}
          </div>

          {activePhoto && (
            <div className="preview-card card" tabIndex={0} onKeyDown={handleKeyNavigation}>
              <div className="preview-header">
                <div>
                  <p className="eyebrow">Selected image</p>
                  <h3>{activePhoto.title}</h3>
                </div>
                <div className="preview-hint">Use ← and →, press space to like, or backspace to dislike</div>
              </div>
              <div className="preview-image-shell">
                {showAgentChat && (
                  <div className="preview-chat-panel">
                    <div className="preview-chat-messages">
                      {agentMessages.map((message) => (
                        <div key={message.id} className={`preview-chat-bubble ${message.role}`}>
                          {message.text}
                        </div>
                      ))}
                    </div>
                    <form className="preview-chat-form" onSubmit={handleAgentSubmit}>
                      <input type="text" value={agentInput} onChange={(event) => setAgentInput(event.target.value)} placeholder="Ask for edits or feedback" />
                      <button type="submit" className="preview-chat-send">Send</button>
                    </form>
                  </div>
                )}
                <img src={activePhoto.src} alt={activePhoto.alt} className="preview-image" />
                {!showAgentChat && (
                  <button type="button" className="preview-ai-toggle" onClick={() => setShowAgentChat((current) => !current)} aria-label="Open AI assistant">
                    🤖
                  </button>
                )}
              </div>

              <div className="vote-actions">
                <button type="button" className={`vote-btn ${likedPhotoIds.includes(activePhoto.id) ? 'active-like' : ''}`} onClick={() => handleLike(activePhoto.id)} aria-label="Like photo">👍</button>
                <button type="button" className={`vote-btn ${dislikedPhotoIds.includes(activePhoto.id) ? 'active-dislike' : ''}`} onClick={() => handleDislike(activePhoto.id)} aria-label="Dislike photo">👎</button>
                <button type="button" className={`vote-btn vote-btn-select ${selectedPhotoIds.includes(activePhoto.id) ? 'active-select' : ''}`} onClick={() => togglePhoto(activePhoto.id)}>{selectedPhotoIds.includes(activePhoto.id) ? '✓ Selected' : 'Select for edit'}</button>
              </div>
            </div>
          )}

          <div className="filmstrip-block">
            <div className="filmstrip-toolbar" role="tablist" aria-label="Photo filters">
              <button type="button" className={`filmstrip-filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
              <button type="button" className={`filmstrip-filter-btn ${filter === 'liked' ? 'active' : ''}`} onClick={() => setFilter('liked')}>Liked</button>
              <button type="button" className={`filmstrip-filter-btn ${filter === 'disliked' ? 'active' : ''}`} onClick={() => setFilter('disliked')}>Disliked</button>
            </div>

            <div className="filmstrip" aria-label="Photo filmstrip">
              {visiblePhotos.length > 0 ? (
                visiblePhotos.map((photo) => {
                  const isActive = photo.id === activePhoto?.id;
                  return (
                    <button key={photo.id} type="button" className={`filmstrip-item ${isActive ? 'active' : ''}`} onClick={() => setSelectedPhotoId(photo.id)}>
                      <img src={photo.src} alt={photo.alt} />
                      <span>{photo.title}</span>
                    </button>
                  );
                })
              ) : (
                <div className="filmstrip-empty">No photos match this filter yet.</div>
              )}
            </div>
          </div>
        </>
      </AppLayout>
    </ProtectedRoute>
  );
}

export function ClientAlbumDetailRoute({ activeUser, albums, onLogout }: { activeUser: User | null; albums: Album[]; onLogout: () => void }) {
  const { albumId } = useParams<{ albumId: string }>();
  const album = albums.find((item) => item.id === Number(albumId));

  return album ? <ClientAlbumDetailPage album={album} activeUser={activeUser} onLogout={onLogout} /> : <div className="card">Album not found.</div>;
}
