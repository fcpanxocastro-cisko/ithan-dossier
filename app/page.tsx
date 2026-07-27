"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

const heroStats = [
  { value: "8.9M", label: "Reproducciones · 28 días" },
  { value: "1.6M", label: "Oyentes mensuales" },
  { value: "9.4M", label: "Visualizaciones YouTube · 28 días" },
  { value: "477K", label: "Seguidores Spotify" },
];

const reachStats = [
  { value: "8.9M", label: "Reproducciones en Spotify" },
  { value: "1.6M", label: "Oyentes mensuales" },
  { value: "477K", label: "Seguidores en Spotify" },
  { value: "9.4M", label: "Visualizaciones en YouTube" },
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
  { year: "2026", title: "Suéltala / Placeres", copy: "El presente y el próximo movimiento: un álbum que abre una nueva era." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [presaveOpen, setPresaveOpen] = useState(true);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const restartHeroVideo = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  };

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

      if (!response.ok || result?.success === false || result?.success === "false") {
        throw new Error("No fue posible enviar la solicitud.");
      }

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPresaveOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <main>
      <div className="page-noise" aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />

      {presaveOpen && (
        <div className="presave-backdrop" role="dialog" aria-modal="true" aria-labelledby="presave-title">
          <div className="presave-modal">
            <button className="presave-close" onClick={() => setPresaveOpen(false)} aria-label="Cerrar anuncio">×</button>
            <div className="presave-art">
              <div className="cover-orbit" aria-hidden="true" />
              <video
                className="presave-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/placeres-cover.png"
                aria-label="Teaser visual de Placeres, próximo álbum de Ithan NY"
              >
                <source src="/placeres-teaser.mp4" type="video/mp4" />
              </video>
              <span className="teaser-badge">Teaser · Placeres</span>
            </div>
            <div className="presave-copy">
              <p className="kicker">Próximo álbum · 06.08.2026</p>
              <h2 id="presave-title">Placeres</h2>
              <p>La nueva era de Ithan NY comienza ahora. Guarda el álbum antes de su lanzamiento.</p>
              <a
                className="button button-primary"
                href="https://Ithann-NY.lnk.to/PLACERES"
                target="_blank"
                rel="noreferrer"
              >
                Pre-guardar ahora <span>↗</span>
              </a>
              <button className="presave-later" onClick={() => setPresaveOpen(false)}>Seguir explorando</button>
            </div>
          </div>
        </div>
      )}

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ithan New York, inicio">
          <span className="brand-mark">F</span>
          <span>FLOW</span>
          <span className="brand-orbit">NEW YORK</span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegación principal">
          <a href="#artist" onClick={() => setMenuOpen(false)}>El artista</a>
          <a href="#sound" onClick={() => setMenuOpen(false)}>Su música</a>
          <a href="#journey" onClick={() => setMenuOpen(false)}>Trayectoria</a>
          <a href="#reach" onClick={() => setMenuOpen(false)}>Alcance</a>
          <a href="#press" onClick={() => setMenuOpen(false)}>Prensa</a>
        </nav>

        <a className="header-cta" href="#contact">
          <span>+</span> Contacto
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú"
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="top">
        <video
          ref={heroVideoRef}
          className="hero-video"
          autoPlay
          muted={muted}
          playsInline
          poster="/ithan-orbit-poster.png"
          aria-label="Visual animado de Ithan New York"
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 2.5) restartHeroVideo();
          }}
          onEnded={restartHeroVideo}
        >
          <source src="/ithan-orbit.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="ember ember-one" aria-hidden="true" />
        <div className="ember ember-two" aria-hidden="true" />
        <div className="ember ember-three" aria-hidden="true" />

        <div className="hero-copy">
          <div className="eyebrow"><span /> 01 / El artista</div>
          <h1>
            <span>Ithan</span>
            <strong>New York</strong>
          </h1>
          <p className="hero-statement">
            El sonido de Chile para el mundo.<br />
            Impulsado por <em>Flow New York.</em>
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="https://www.youtube.com/channel/UCHUwaZ29fbxOHBmk32U-Xdw"
              target="_blank"
              rel="noreferrer"
            >
              <span className="play-icon">▶</span> Escuchar ahora
            </a>
            <a className="button button-ghost" href="#artist">
              <span>✦</span> Explorar dossier
            </a>
          </div>
        </div>

        <aside className="stat-panel" aria-label="Cifras principales">
          {heroStats.map((stat) => (
            <div className="stat-row" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
          <a href="#reach">Ver todas las cifras <span>↗</span></a>
        </aside>

        <div className="hero-footer">
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
          <button
            className="sound-toggle"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? "Activar sonido del video" : "Silenciar video"}
          >
            <span className={muted ? "equalizer paused" : "equalizer"}>
              <i /><i /><i /><i />
            </span>
            {muted ? "Sonido desactivado" : "Sonido activado"}
          </button>
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

      <section className="manifesto section" id="artist">
        <div className="section-index">01 / El artista</div>
        <div className="manifesto-layout">
          <div className="orbit-seal" aria-hidden="true">
            <span>NY</span>
            <i />
          </div>
          <div>
            <p className="kicker">Artista · Visión · Cultura</p>
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

      <section className="sound section" id="sound">
        <div className="section-index">02 / La música</div>
        <div className="sound-heading">
          <div>
            <p className="kicker">Último lanzamiento · 2026</p>
            <h2>SUÉL<br /><span>TALA</span></h2>
          </div>
          <p>
            Trap, reggaetón y códigos propios: una discografía que evoluciona sin perder
            el origen. De “Con Roni” y “Jaguar” a una nueva etapa internacional.
          </p>
        </div>
        <div className="track-card">
          <div className="track-cover">
            <div className="disc"><span>I</span></div>
          </div>
          <div className="track-meta">
            <span>Último lanzamiento · 25.06.2026</span>
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

      <section className="journey section" id="journey">
        <div className="section-index">03 / La trayectoria</div>
        <div className="journey-heading">
          <div>
            <p className="kicker">Con Roni → Suéltala</p>
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
          <p>Una audiencia consolidada en streaming, video y comunidad digital.</p>
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

      <section className="partners section" id="press">
        <div className="section-index">05 / La oportunidad</div>
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
          <p className="kicker">Representación · Contratación · Prensa</p>
          <h2>Movamos<br />la cultura.</h2>
          <p className="contact-note">
            Cuéntanos sobre tu propuesta. Flow New York revisará la solicitud y contactará
            a las oportunidades que encajen con el proyecto.
          </p>
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

      <footer>
        <div className="brand">
          <span className="brand-mark">F</span>
          <span>FLOW</span>
          <span className="brand-orbit">NEW YORK</span>
        </div>
        <p>Dossier oficial · 2026</p>
        <div className="distrikt-signature">
          <img
            src="/distrikt-official-logo.jpeg"
            alt="D!STR!KT — Estrategia, Música, Contenido y Tecnología"
          />
        </div>
      </footer>
    </main>
  );
}
