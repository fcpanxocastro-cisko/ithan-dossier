import type { Metadata } from 'next';
import Dossier from './dossier';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() { return <Dossier />; }
