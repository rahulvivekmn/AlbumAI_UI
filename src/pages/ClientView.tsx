import type { Album } from '../types';
import './ClientView.css';

type ClientViewProps = {
  albums: Album[];
  onSelectAlbum: (albumId: number) => void;
};

export function ClientView({ albums, onSelectAlbum }: ClientViewProps) {
  return (
    <>
      <div className="card">
        <h3>Your assigned albums</h3>
        <p>Only albums shared with your client account are visible here.</p>
      </div>
      <div className="album-list">
        {albums.map((album) => (
          <button key={album.id} type="button" className="album-card album-card-button" onClick={() => onSelectAlbum(album.id)}>
            <img src={album.cover} alt={album.title} />
            <div>
              <h4>{album.title}</h4>
              <p>{album.clientName}</p>
              <p>{album.driveLink}</p>
              <span className="pill">Published</span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
