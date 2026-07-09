import type { Album, User } from './types';

export const photogUser: User = {
  id: 1,
  name: 'Ava Rivera',
  role: 'photographer',
  email: 'ava@studio.com',
};

export const clientUser: User = {
  id: 2,
  name: 'Mina Lewis',
  role: 'client',
  email: 'mina@client.com',
  clientName: 'Northwind Studio',
};

export const mockUsers: Record<string, { password: string; user: User }> = {
  'ava@studio.com': { password: 'password123', user: photogUser },
  'mina@client.com': { password: 'password123', user: clientUser },
};

export const initialAlbums: Album[] = [
  {
    id: 1,
    title: 'Wedding Preview',
    clientName: 'Northwind Studio',
    driveLink: 'https://drive.google.com/drive/folders/1ABC123',
    status: 'Published',
    cover: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    photos: [
      { id: 101, title: 'Ceremony glow', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80', alt: 'Wedding ceremony' },
      { id: 102, title: 'First dance', src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80', alt: 'Couple dancing' },
      { id: 103, title: 'Ring close-up', src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80', alt: 'Ring detail' },
    ],
  },
  {
    id: 2,
    title: 'Family Session',
    clientName: 'Lumen Co.',
    driveLink: 'https://drive.google.com/drive/folders/2XYZ456',
    status: 'Published',
    cover: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80',
    photos: [
      { id: 201, title: 'Playful portrait', src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80', alt: 'Family portrait' },
      { id: 202, title: 'Garden laugh', src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80', alt: 'Family outdoors' },
    ],
  },
  {
    id: 3,
    title: 'Brand Shoot',
    clientName: 'Northwind Studio',
    driveLink: 'https://drive.google.com/drive/folders/3LMN789',
    status: 'Draft',
    cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    photos: [
      { id: 301, title: 'Studio setup', src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', alt: 'Brand shoot setup' },
      { id: 302, title: 'Product detail', src: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80', alt: 'Product detail shot' },
    ],
  },
];
