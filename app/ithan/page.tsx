import type { Metadata } from 'next';
import Home from '../dossier';
export const metadata: Metadata = { title: 'Ithan New York — Hub oficial', description: 'Encuentra a Ithan New York: Spotify, YouTube, Instagram, TikTok, Apple Music, videos y booking.', alternates: { canonical: '/ithan' } };
export default function IthanPage() { return <Home hub />; }
