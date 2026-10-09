"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const reachStats = [
  { value: "8.9M", label: "Streams Spotify · 28 días" },
  { value: "1.6M", label: "Oyentes mensuales" },
  { value: "477K", label: "Seguidores en Spotify" },
  { value: "9.4M", label: "Vistas YouTube · 28 días" },
];

const socialLinks = [
  { label: "Spotify", short: "SP", href: "https://open.spotify.com/intl-es/artist/0LshXUmIub6xKvOq4QmtNs?si=74095eb76b96453f" },
  { label: "YouTube", short: "YT", href: "https://www.youtube.com/channel/UCHUwaZ29fbxOHBmk32U-Xdw" },
  { label: "Instagram", short: "IG", href: "https://www.instagram.com/ithannewyork/" },
  { label: "TikTok", short: "TK", href: "https://www.tiktok.com/@ithannewyork?lang=es-419" },
  { label: "Apple Music", short: "AM", href: "https://music.apple.com/ar/artist/ithan-ny/1491820864" },
];

const audiences = [
  {
    number: "01",
    title: "Marcas",
    copy: "Alianzas culturales, campañas, cápsulas y experiencias con una identidad que no se confunde.",
  },
  {
    number: "02",
    title: "Productoras",
    copy: "Un universo visual listo para videoclips, contenidos, documentales y formatos originales.",
  },
  {
    number: "03",
    title: "Medios",
    copy: "Historia, cifras, narrativa y material editorial reunidos en una sala de prensa viva.",
  },
  {
    number: "04",
    title: "Eventos",
    copy: "Shows y apariciones construidos para audiencias que viven la música como cultura.",
  },
];

const chapters = [
  ["01", "Villa Francia", "Originario de Estación Central, construyó su identidad desde la calle y su comunidad."],
  ["02", "Jaguar", "Su colaboración con Pablo Chill-E en 2021 marcó un punto de inflexión en su carrera."],
  ["03", "Tu Diablo", "El fenómeno viral en TikTok amplificó su sonido y lo conectó con una audiencia masiva."],
  ["04", "Sin fronteras", "Colaboraciones nacionales e internacionales proyectan el Flow New York fuera de Chile."],
];

const journey = [
  { year: "2020", title: "Con Roni", copy: "El primer capítulo. Una voz propia comienza a tomar forma desde Villa Francia." },
  { year: "2021", title: "Jaguar", copy: "La colaboración con Pablo Chill-E marca el salto y expande el alcance de Ithan NY." },
  { year: "2022", title: "Tu Diablo / X5", copy: "Viralidad, premios y consolidación dentro de la nueva escena urbana chilena." },
  { year: "2023–24", title: "Expansión", copy: "Millonarios Juntos, nuevos públicos y colaboraciones que cruzan fronteras." },
  { year: "2025", title: "Del Lune al Finde", copy: "Una etapa de madurez sonora, identidad visual y crecimiento sostenido." },
  { year: "2026", title: "Suéltala / Placeres", copy: "Una nueva etapa del proyecto: música e identidad visual dentro del universo de Placeres." },
];

export default function Home({ hub = false }: { hub?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroPaused, setHeroPaused] = useState(false);

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("_subject", "Nueva solicitud profesional · Dossier Ithan NY");
    formData.append("_template", "table");
    formData.append("_url", window.location.href);
    setFormStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/flownewyorkinc@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !(result?.success === true || result?.success === "true")) {
        throw new Error("No fue posible enviar la solicitud.");
      }

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const sync = () => {
      if (heroPaused || reduced.matches || connection?.saveData || document.hidden) { video.pause(); return; }
      if (!video.getAttribute('src')) video.src = '/media/hero-loop.mp4';
      void video.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) sync(); else video.pause();
    }, { threshold: 0.15 });
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync); };
  }, [heroPaused]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <main id="contenido">
      <a className="skip-link" href="#top">Saltar al contenido</a>
      <div className="page-noise" aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />

      <header className="site-header">
        <Link className="brand" href="/" aria-label="Flow New York, inicio">
          <span className="brand-mark">F</span>
          <span>FLOW</span>
          <span className="brand-orbit">NEW YORK</span>
        </Link>

        <nav id="main-menu" className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegación principal">
          <Link href="/ithan" onClick={() => setMenuOpen(false)}>Ithan New York ↗</Link>
          <a href="#sound" onClick={() => setMenuOpen(false)}>Placeres</a>
          <a href="#journey" onClick={() => setMenuOpen(false)}>Trayectoria</a>
          <a href="#live" onClick={() => setMenuOpen(false)}>Shows</a>
          <a href="#press" onClick={() => setMenuOpen(false)}>Prensa</a>
          <a href="#flow" onClick={() => setMenuOpen(false)}>Flow New York</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Booking</a>
        </nav>

        <Link className="header-cta" href="/ithan">
          Ithan <span>↗</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="top">
        <video
          ref={heroVideoRef}
          className="hero-video"
          muted
          loop
          preload="none"
          playsInline
          poster="/media/hero-poster.webp"
          aria-label="Visual animado de Ithan New York"
        />
        <div className="hero-scrim" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="ember ember-one" aria-hidden="true" />
        <div className="ember ember-two" aria-hidden="true" />
        <div className="ember ember-three" aria-hidden="true" />

        <div className="hero-copy">
          <div className="eyebrow"><span /> {hub ? "Hub oficial / Ithan NY" : "Flow New York / El artista"}</div>
          <h1>
            <span>Ithan</span>
            <strong>New York</strong>
          </h1>
          <p className="hero-statement">De Villa Francia para el mundo.<br />Música. Identidad. <em>Flow New York.</em></p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="https://open.spotify.com/artist/0LshXUmIub6xKvOq4QmtNs"
              target="_blank"
              rel="noreferrer"
            >
              <span className="play-icon" aria-hidden="true">▶</span> Escuchar en Spotify
            </a>
            <a className="button button-ghost" href="#sound"><span aria-hidden="true">↗</span> Universo Placeres</a>
          </div>
        </div>



        <div className="hero-footer">
          <button className="motion-toggle" onClick={() => setHeroPaused(value => !value)} aria-pressed={heroPaused}>{heroPaused ? "Reanudar fondo" : "Pausar fondo"}</button>
          <div className="social-row">
            <span>Sigue a Ithan</span>
            <div aria-label="Plataformas">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                  {social.short}
                </a>
              ))}
            </div>
          </div>

        </div>

        <a className="scroll-cue" href="#artist">
          <span>↓</span> Baja para explorar
        </a>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          ITHAN NEW YORK ✦ FLOW NEW YORK ✦ MOVIMIENTO GLOBAL ✦ CHILE PARA EL MUNDO ✦&nbsp;
          ITHAN NEW YORK ✦ FLOW NEW YORK ✦ MOVIMIENTO GLOBAL ✦ CHILE PARA EL MUNDO ✦&nbsp;
        </div>
      </div>

      <section className="platform-hub section" id="platforms">
        <p className="kicker">Ithan New York · En todas partes</p>
        <h2>Conecta con <em>Ithan.</em></h2>
        <div className="platform-links">
          {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer"><span>{social.short}</span>{social.label}<i>↗</i></a>)}
        </div>
      </section>

      <section className="sound section" id="sound">
        <div className="section-index">01 / La música</div>
        <div className="placeres-feature">
          <a className="placeres-art" href="https://Ithann-NY.lnk.to/PLACERES" target="_blank" rel="noreferrer" aria-label="Explorar Placeres de Ithan NY en plataformas">
            <Image src="/placeres-cover.png" alt="Placeres: Ithan NY bajo el título plateado y rosas rojas" width={297} height={296} sizes="(max-width: 720px) 84vw, 440px" />
            <span>ITHAN NY / PLACERES <span aria-hidden="true">↗</span></span>
          </a>
          <div className="placeres-copy">
            <p className="kicker">Álbum disponible · Ithan NY</p>
            <h2>PLACERES</h2>
            <p className="lead">Otro capítulo.<br />La misma esencia.</p>
            <p>Del origen en Villa Francia a un universo propio. PLACERES reúne la música y la visión de Ithan NY: una nueva etapa que se vive con el mismo código.</p>
            <a className="button button-primary" href="https://Ithann-NY.lnk.to/PLACERES" target="_blank" rel="noreferrer">Escuchar Placeres <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="https://www.youtube.com/channel/UCHUwaZ29fbxOHBmk32U-Xdw" target="_blank" rel="noreferrer">Ver el canal oficial en YouTube ↗</a>
          </div>
        </div>
        <div className="track-card">
          <div className="track-cover">
            <div className="disc"><span>I</span></div>
          </div>
          <div className="track-meta">
            <span>Single · 25.06.2026</span>
            <h3>Suéltala</h3>
            <p>Ithan NY</p>
          </div>
          <div className="wave" aria-hidden="true">
            {Array.from({ length: 34 }).map((_, index) => <i key={index} />)}
          </div>
          <a
            className="round-play"
            href="https://open.spotify.com/track/0gQXTP6fdYbJIMpHsDXFkZ"
            target="_blank"
            rel="noreferrer"
            aria-label="Escuchar Suéltala de Ithan NY en Spotify"
          >▶</a>
        </div>
        <div className="platform-links" aria-label="Escuchar y seguir a Ithan NY">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              <span>{social.short}</span>
              {social.label}
              <i>↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className="manifesto section" id="artist">
        <div className="section-index">02 / El artista</div>
        <div className="manifesto-layout">
          <figure className="artist-portrait"><Image src="/media/ithan-portrait.webp" alt="Retrato de Ithan New York con chaqueta negra y su cadena FNY" width={1200} height={1800} sizes="(max-width: 720px) 90vw, 34vw" /><figcaption>Ithan NY / Villa Francia, Chile</figcaption></figure>
          <div>
            <p className="kicker">Ithan New York · Artista chileno</p>
            <h2>No sigue el movimiento.<br /><em>Lo convierte en cultura.</em></h2>
            <p className="lead">
              Ithan NY es un artista chileno originario de Villa Francia, Estación Central. Durante la pandemia
              encontró su voz fusionando trap y reggaetón, con una propuesta nacida desde la experiencia real
              de la calle y una visión creativa propia.
            </p>
            <p className="lead lead-secondary">
              “Con Roni”, “Molly” y “Gitano” abrieron el camino. “Jaguar”, junto a Pablo Chill-E, consolidó
              su avance en 2021; luego “Tu Diablo” se convirtió en un fenómeno viral. Con “X5”, colaboraciones
              como Angel Dior y una búsqueda constante de nuevos sonidos, Ithan NY lleva el Flow New York
              desde Chile hacia una audiencia internacional.
            </p>
          </div>
        </div>
        <div className="chapters">
          {chapters.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <i>↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="live section" id="live">
        <div className="section-index">Live / Shows</div>
        <div className="live-heading"><h2>Se escucha.<br /><em>Se vive.</em></h2><a className="button button-ghost" href="#contact">Booking ↗</a></div>
        <figure className="live-banner"><Image src="/media/live-crowd.webp" sizes="(max-width: 720px) 100vw, 88vw" alt="Ithan New York frente a su público, visto desde el escenario" width={1600} height={1066} loading="lazy" decoding="async" /><figcaption>Escenario. Comunidad. Presencia real.</figcaption></figure>
        <figure className="live-film"><video controls playsInline preload="none" poster="/media/off-poster.webp" aria-label="Película de Ithan New York: detrás del escenario y en vivo"><source src="/media/ithan-film.mp4" type="video/mp4" /></video><figcaption>Ithan NY / Dentro y fuera del escenario · 57 segundos</figcaption></figure>
        <div className="live-reels" aria-label="Videos de shows">
          {[{id: 2, title: 'De cerca'}, {id: 4, title: 'La misma energía'}, {id: 6, title: 'Una sola voz'}, {id: 7, title: 'En movimiento'}].map(clip => <figure key={clip.id}><video controls playsInline preload="none" poster={`/media/clip-${clip.id}.webp`} aria-label={`Ithan New York en vivo: ${clip.title}`}><source src={`/media/clip-${clip.id}.mp4`} type="video/mp4" /></video><figcaption>{clip.title}</figcaption></figure>)}
        </div>
      </section>

      <section className="visual-story section" id="visual-story">
        <p className="kicker">Visual story / Dentro del movimiento</p>
        <div className="story-grid"><div><h2>El camino<br /><em>deja huella.</em></h2><p className="lead">Del estudio al escenario. Una mirada al universo de Ithan New York, contada desde adentro.</p><a className="button button-ghost" href="#journey">Conoce la trayectoria ↗</a></div><figure><Image src="/media/ithan-awards.webp" alt="Ithan NY junto a los discos y reconocimientos de su carrera" width={1400} height={1400} sizes="(max-width: 720px) 90vw, 45vw" /><figcaption>El trabajo se escucha. La historia queda.</figcaption></figure></div>
        <div className="editorial-gallery">
          <figure><Image src="/media/ithan-night.webp" alt="Ithan NY en una sesión nocturna con su cadena Flow New York" width={1000} height={1500} sizes="(max-width: 720px) 50vw, 30vw" /><figcaption>01 / Identidad</figcaption></figure>
          <figure><Image src="/media/ithan-set.webp" alt="Ithan NY durante una producción visual en un set de luces rojas" width={854} height={1280} sizes="(max-width: 720px) 50vw, 30vw" /><figcaption>02 / Visión</figcaption></figure>
          <figure><Image src="/media/ithan-chile.webp" alt="Ithan New York frente a la bandera de Chile" width={854} height={1280} sizes="(max-width: 720px) 90vw, 30vw" /><figcaption>03 / Origen</figcaption></figure>
        </div>
      </section>

      <section className="journey section" id="journey">
        <div className="section-index">03 / La trayectoria</div>
        <div className="journey-heading">
          <div>
            <p className="kicker">Con Roni → Placeres</p>
            <h2>Una historia<br /><span>en movimiento.</span></h2>
          </div>
          <p>
            Del primer lanzamiento a “Placeres”: los capítulos que convirtieron persistencia,
            calle y visión en una carrera de alcance internacional.
          </p>
        </div>
        <div className="timeline">
          <div className="timeline-track" aria-hidden="true" />
          {journey.map((moment, index) => (
            <article key={moment.year}>
              <div className="timeline-dot"><span>0{index + 1}</span></div>
              <time>{moment.year}</time>
              <h3>{moment.title}</h3>
              <p>{moment.copy}</p>
            </article>
          ))}
        </div>
        <div className="journey-footer">
          <span>Villa Francia · Estación Central</span>
          <strong>Chile → El mundo</strong>
          <span>Flow New York · 2026</span>
        </div>
      </section>

      <section className="reach section" id="reach">
        <div className="section-index">04 / El alcance</div>
        <div className="reach-heading">
          <h2>Cifras con<br /><em>peso real.</em></h2>
          <p>Una audiencia consolidada en streaming, video y comunidad digital. Cifras del dossier de julio de 2026; no corresponden a una medición en tiempo real.</p>
        </div>
        <div className="stats-grid">
          {reachStats.map((stat, index) => (
            <article key={stat.label}>
              <span>0{index + 1}</span>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-about section" id="flow"><p className="kicker">Flow New York</p><h2>Desde Chile.<br /><em>Hacia el mundo.</em></h2><p className="lead">Música, identidad y comunidad alrededor de Ithan New York. Un espacio para conectar al artista con su audiencia y dar forma a nuevas colaboraciones.</p><a className="button button-ghost" href="#contact">Hablemos ↗</a></section>

      <section className="partners section" id="press">
        <div className="section-index">Partnerships / La oportunidad</div>
        <div className="partners-heading">
          <p className="kicker">Creado para colaborar</p>
          <h2>Más que exposición.<br /><span>Relevancia cultural.</span></h2>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => (
            <article key={audience.number}>
              <span>{audience.number}</span>
              <h3>{audience.title}</h3>
              <p>{audience.copy}</p>
              <a href="#contact" aria-label={`Conectar para ${audience.title}`}>↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-intro">
          <p className="kicker">Booking · Representación · Prensa</p>
          <h2>Movamos<br />la cultura.</h2>
          <p className="contact-note">
            Cuéntanos sobre tu propuesta. Flow New York revisará la solicitud y contactará
            a las oportunidades que encajen con el proyecto.
          </p>
          <a className="contact-email" href="mailto:flownewyorkinc@gmail.com">flownewyorkinc@gmail.com ↗</a>
        </div>
        <form className="contact-form" onSubmit={submitContactForm}>
          <div className="form-heading">
            <span>Solicitud profesional</span>
            <small>Respuesta directa de Flow New York</small>
          </div>
          <input
            className="form-honeypot"
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <label>
            Nombre y apellido *
            <input type="text" name="name" autoComplete="name" required placeholder="Tu nombre" />
          </label>
          <label>
            Empresa u organización *
            <input type="text" name="company" required placeholder="Nombre de la empresa" />
          </label>
          <label>
            Email profesional *
            <input type="email" name="email" autoComplete="email" required placeholder="nombre@empresa.com" />
          </label>
          <label>
            Tipo de solicitud *
            <select name="requestType" required defaultValue="">
              <option value="" disabled>Selecciona una opción</option>
              <option value="brand">Marca / colaboración</option>
              <option value="production">Productora / contenido</option>
              <option value="press">Medio / prensa</option>
              <option value="booking">Evento / contratación</option>
              <option value="other">Otra propuesta</option>
            </select>
          </label>
          <label>
            Ciudad / país
            <input type="text" name="location" placeholder="Santiago, Chile" />
          </label>
          <label>
            Fecha estimada
            <input type="date" name="date" />
          </label>
          <label className="form-wide">
            Cuéntanos sobre la propuesta *
            <textarea name="message" required rows={5} placeholder="Objetivo, alcance, fechas y presupuesto estimado." />
          </label>
          <label className="form-consent form-wide">
            <input type="checkbox" name="consent" required />
            <span>Acepto que Flow New York use estos datos para responder esta solicitud.</span>
          </label>
          <button className="button form-submit form-wide" type="submit" disabled={formStatus === "sending"}>
            {formStatus === "sending" ? "Enviando solicitud…" : "Enviar solicitud"}
          </button>
          <p className={`form-status form-wide ${formStatus}`} aria-live="polite">
            {formStatus === "success" && "Solicitud enviada. Flow New York se pondrá en contacto contigo."}
            {formStatus === "error" && "No pudimos enviar la solicitud. Inténtalo nuevamente en unos minutos."}
          </p>
        </form>
        <div className="contact-orbit" aria-hidden="true"><span>ITHAN</span></div>
      </section>

      <nav className="mobile-dock" aria-label="Accesos rápidos"><Link href="/ithan"><span aria-hidden="true">✦</span>Ithan</Link><a href="#sound"><span aria-hidden="true">♫</span>Música</a><a href="#live"><span aria-hidden="true">▷</span>Shows</a><a href="#contact"><span aria-hidden="true">↗</span>Contacto</a></nav>
      <footer>
        <div className="brand">
          <span className="brand-mark">F</span>
          <span>FLOW</span>
          <span className="brand-orbit">NEW YORK</span>
        </div>
        <p>Ithan New York · Sitio oficial · 2026</p>
        <div className="distrikt-signature">
          <Image
            src="/distrikt-official-logo.jpeg"
            alt="D!STR!KT — Estrategia, Música, Contenido y Tecnología"
            width={200}
            height={100}
            sizes="200px"
          />
        </div>
      </footer>
    </main>
  );
}

