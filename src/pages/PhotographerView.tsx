import type { FormEvent } from 'react';
import type { Album } from '../types';
import './PhotographerView.css';

type PhotographerViewProps = {
  albums: Album[];
  form: { title: string; clientName: string; driveLink: string; status: Album['status'] };
  onChange: (field: string, value: string) => void;
  onSubmit: (event: FormEvent) => void;
};

export function PhotographerView({ albums, form, onChange, onSubmit }: PhotographerViewProps) {
  return (
    <>
      <div className="card">
        <h3>Create a new album</h3>
        <form onSubmit={onSubmit} className="form-grid">
          <input placeholder="Album title" value={form.title} onChange={(event) => onChange('title', event.target.value)} />
          <input placeholder="Client name" value={form.clientName} onChange={(event) => onChange('clientName', event.target.value)} />
          <input placeholder="Google Drive link" value={form.driveLink} onChange={(event) => onChange('driveLink', event.target.value)} />
          <select value={form.status} onChange={(event) => onChange('status', event.target.value)}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
          <button type="submit">Create album</button>
        </form>
      </div>

      <div className="card">
        <h3>All albums</h3>
        <div className="album-list">
          {albums.map((album) => (
            <article key={album.id} className="album-card">
              <img src={album.cover} alt={album.title} />
              <div>
                <h4>{album.title}</h4>
                <p>{album.clientName}</p>
                <p>{album.driveLink}</p>
                <span className="pill">{album.status}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
