import type { Metadata } from 'next';
import Home from '../dossier';
export const metadata: Metadata = { title: 'Ithan New York — Hub oficial', description: 'Encuentra a Ithan New York: Spotify, YouTube, Instagram, TikTok, Apple Music, videos y booking.', alternates: { canonical: '/ithan' }, openGraph: { title: 'Ithan New York — Hub oficial', description: 'Música, Placeres, videos y booking. Todos los enlaces oficiales de Ithan NY.', url: 'https://www.flownewyork.cl/ithan', images: ['/media/hero-poster.webp'] }, twitter: { card: 'summary_large_image', title: 'Ithan New York — Hub oficial', description: 'Todos los enlaces oficiales de Ithan NY.', images: ['/media/hero-poster.webp'] } };
export default function IthanPage() { return <Home hub />; }
