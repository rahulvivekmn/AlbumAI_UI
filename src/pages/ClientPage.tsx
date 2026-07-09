import { AppLayout } from '../components/AppLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { ClientView } from './ClientView';
import type { Album, User } from '../types';

type ClientPageProps = {
  activeUser: User | null;
  albums: Album[];
  onLogout: () => void;
  onSelectAlbum: (albumId: number) => void;
};

export function ClientPage({ activeUser, albums, onLogout, onSelectAlbum }: ClientPageProps) {
  return (
    <ProtectedRoute user={activeUser} role="client">
      <AppLayout activeUser={activeUser} onLogout={onLogout}>
        <ClientView albums={albums} onSelectAlbum={onSelectAlbum} />
      </AppLayout>
    </ProtectedRoute>
  );
}
