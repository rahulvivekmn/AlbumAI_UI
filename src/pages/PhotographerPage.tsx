import { useMemo, useState, type FormEvent } from 'react';
import { AppLayout } from '../components/AppLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PhotographerView } from './PhotographerView';
import type { Album, User } from '../types';

type PhotographerPageProps = {
  activeUser: User | null;
  albums: Album[];
  onLogout: () => void;
  onCreateAlbum: (newAlbum: Album) => void;
};

export function PhotographerPage({ activeUser, albums, onLogout, onCreateAlbum }: PhotographerPageProps) {
  const [form, setForm] = useState({ title: '', clientName: '', driveLink: '', status: 'Draft' as Album['status'] });

  const handleCreateAlbum = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title || !form.clientName || !form.driveLink) return;

    const newAlbum: Album = {
      id: Date.now(),
      title: form.title,
      clientName: form.clientName,
      driveLink: form.driveLink,
      status: form.status,
      cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      photos: [],
    };

    onCreateAlbum(newAlbum);
    setForm({ title: '', clientName: '', driveLink: '', status: 'Draft' });
  };

  const handleFormChange = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const visibleAlbums = useMemo(() => albums, [albums]);

  return (
    <ProtectedRoute user={activeUser} role="photographer">
      <AppLayout activeUser={activeUser} onLogout={onLogout}>
        <PhotographerView albums={visibleAlbums} form={form} onChange={handleFormChange} onSubmit={handleCreateAlbum} />
      </AppLayout>
    </ProtectedRoute>
  );
}
