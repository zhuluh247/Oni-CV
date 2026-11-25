'use client';

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Music4,
  Piano,
  Mic2,
  Calendar,
  MapPin,
  Sparkles,
  Award,
  Users,
  Heart,
  GraduationCap,
  Mail,
  Phone,
  Instagram,
  Youtube,
  ChevronDown,
  Star,
  Disc3,
  Headphones,
  Clock,
  Globe2,
  ArrowUpRight,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

/* ---------- Data ---------- */

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "specialties", label: "Music" },
  { id: "credits", label: "Credits" },
  { id: "productions", label: "Productions" },
  { id: "band", label: "Band" },
  { id: "tour", label: "UK Tour" },
  { id: "contact", label: "Booking" },
];

const STATS = [
  { icon: Calendar, label: "Date of Birth", value: "April 5, 1990" },
  { icon: MapPin, label: "State of Origin", value: "Osun State, Nigeria" },
  { icon: Users, label: "Band Members", value: "10" },
  { icon: Clock, label: "Pro Debut", value: "March 2022" },
  { icon: Disc3, label: "Specialties", value: "4 Genres" },
];

const GENRES = [
  {
    name: "Afrobeats",
    desc: "Modern West-African rhythm, percussion and melodic groove — the heartbeat of contemporary Nigerian sound.",
    color: "from-amber-500/20 to-orange-600/10",
  },
  {
    name: "Gospel",
    desc: "Spirit-filled arrangements rooted in church musicianship — where his musical journey first began.",
    color: "from-yellow-500/20 to-amber-600/10",
  },
  {
    name: "Highlife",
    desc: "Classic West-African guitar-driven sound reimagined with rich keyboard harmonies and brass textures.",
    color: "from-orange-500/20 to-red-600/10",
  },
  {
    name: "Fuji",
    desc: "Yoruba traditional percussive artistry fused with modern keys, calls and rhythmic improvisation.",
    color: "from-rose-500/20 to-amber-600/10",
  },
];

const CREDITS = [
  "T Dollar",
  "Oluwadollarz",
  "Dammie Fire",
  "Otega",
  "Mohbad",
  "Portable",
  "Gb Flex Camaro",
  "Qdot",
];

const NOTABLE_PRODUCTIONS = [
  {
    title: "Alfa and Omega",
    artist: "Haladin, Mohbad & Olatop",
    note: "Featured production credit",
  },
  {
    title: "Big Wave",
    artist: "Gb Flex Camaro",
    note: "Lead production",
  },
  {
    title: "Fuchor Me",
    artist: "Smile T & Oluwadollarz",
    note: "Co-production",
  },
];

const JOURNEY = [
  {
    year: "The Beginning",
    title: "Church Foundations",
    desc: "Musical journey begins in the church — developing keyboard-playing skills, ear training and a deep feel for Gospel harmony that still shapes his sound today.",
  },
  {
    year: "2009",
    title: "Secondary Education",
    desc: "Completes secondary education at Success His and Hers College.",
  },
  {
    year: "March 2022",
    title: "Professional Debut",
    desc: "Launches his professional music career — performing at weddings, concerts, church programmes and corporate events across Nigeria.",
  },
  {
    year: "Present",
    title: "Producer & Band Keyboardist",
    desc: "Becomes the official keyboardist of the Odunayo Akintomide Band and builds an in-demand production catalogue working with leading street and mainstream artistes.",
  },
  {
    year: "Jan – Jul 2027",
    title: "UK Tour",
    desc: "Set to storm the United Kingdom for a six-month tour across major halls in London and beyond — with a collaboration alongside the Eagle Band.",
  },
];

const UK_VENUES = [
  {
    name: "TNLCM Media Hall",
    address: "7 Selina Lane, Greenburn Centre",
    city: "London",
  },
  {
    name: "New Nollywood Entertainment Studio",
    address: "Crown Commercial Center",
    city: "71-73 Nathan Way, London",
  },
  {
    name: "Eagle Band Collaboration Series",
    address: "Special joint concerts",
    city: "United Kingdom",
  },
  {
    name: "More Venues",
    address: "Additional halls to be announced",
    city: "Across the UK",
  },
];

/* ---------- Animation helpers ---------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-8 bg-wine/60" />
      <span className="text-xs font-mono uppercase tracking-[0.35em] text-wine/90">
        {children}
      </span>
    </div>
  );
}

/* ---------- Sections (split for readability) ---------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // active section spy
      const offsets = NAV_ITEMS.map((n) => {
        const el = document.getElementById(n.id);
        if (!el) return { id: n.id, top: Infinity };
        const r = el.getBoundingClientRect();
        return { id: n.id, top: r.top };
      });
      const current =
        offsets
          .filter((o) => o.top <= 140)
          .sort((a, b) => b.top - a.top)[0]?.id || "about";
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-gradient-to-b from-background/80 via-background/30 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-3"
          aria-label="Go to top"
        >
          <span className="grid place-items-center h-10 w-10 rounded-full border border-wine/40 text-wine font-serif text-lg italic">
            O
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-serif text-sm tracking-wide text-foreground">
              Oni Abiodun Ebenezer
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Keyboardist · Producer
            </span>
          </span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                className={`px-3 py-2 text-xs font-mono uppercase tracking-[0.2em] transition-colors ${
                  active === n.id
                    ? "text-wine"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => go("contact")}
            size="sm"
            className="hidden sm:inline-flex bg-wine text-cream hover:bg-wine/90 font-mono uppercase tracking-wider text-xs"
          >
            Book Now
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid place-items-center h-10 w-10 rounded-md border border-border"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-cream transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-cream transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="px-5 py-3 grid grid-cols-2 gap-1">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => go(n.id)}
                    className={`w-full text-left px-3 py-3 text-xs font-mono uppercase tracking-[0.2em] ${
                      active === n.id ? "text-wine" : "text-muted-foreground"
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const [y, setY] = useState(0);
  useEffect(() => {
    return scrollY.on("change", (v) => setY(v));
  }, [scrollY]);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden grain">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${y * 0.4}px) scale(1.05)` }}
      >
        <div className="absolute inset-0 animate-slow-zoom">
          <img
            src="/portfolio/hero-red.jpg"
            alt="Oni Abiodun Ebenezer seated on a red chair in fashion editorial style"
            className="h-full w-full object-cover object-[68%_center] sm:object-[62%_center] md:object-[58%_center]"
            loading="eager"
            // @ts-expect-error fetchPriority is valid HTML but not yet in TS DOM types
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-32 md:pt-40 pb-20 min-h-[100svh] flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-wine" />
            <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-wine">
              Portfolio · Est. 2022
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] text-foreground">
            Oni Abiodun
            <br />
            <span className="text-gold-gradient italic">Ebenezer</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Nigerian musician, professional keyboardist and music producer —
            official keyboardist of the{" "}
            <span className="text-foreground">Odunayo Akintomide Band</span>. Crafting
            Afrobeats, Gospel, Highlife & Fuji from the keys to the booth.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              onClick={() =>
                document.getElementById("tour")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-wine text-cream hover:bg-wine/90 font-mono uppercase tracking-wider text-xs"
            >
              UK Tour 2027
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("credits")?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-wine/40 text-foreground hover:bg-wine/10 hover:text-wine font-mono uppercase tracking-wider text-xs"
            >
              Production Credits
            </Button>
          </div>
        </motion.div>

        <motion.button
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground hover:text-wine transition-colors"
        >
          Scroll
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="relative border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-border/60">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i}
              className="px-4 py-6 md:py-8 text-center"
            >
              <s.icon className="mx-auto h-4 w-4 text-wine/80 mb-3" />
              <div className="font-serif text-lg md:text-xl text-foreground leading-tight">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      <StatsBar />
      <AboutSection />
      <JourneySection />
      <SpecialtiesSection />
      <CreditsSection />
      <ProductionsSection />
      <BandSection />
      <TourSection />
      <PersonalSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

/* ---------- About ---------- */

function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border/60">
                <img
                  src="/portfolio/portrait-pink.jpg"
                  alt="Portrait of Oni Abiodun Ebenezer in red shirt"
                  className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
              {/* Floating quote card */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 max-w-[260px] bg-card border border-wine/30 p-5 rounded-sm shadow-2xl">
                <Quote className="h-5 w-5 text-wine mb-2" />
                <p className="font-serif italic text-sm text-foreground leading-relaxed">
                  From the church keys to the world&apos;s stages — music is the
                  language I speak fluently.
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionLabel>About</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground leading-tight">
                The man behind <span className="text-gold-gradient italic">the keys</span>
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-medium">Oni Abiodun Ebenezer</span>{" "}
                  is a Nigerian musician, professional keyboardist and music
                  producer from <span className="text-foreground">Osun State</span>,
                  born on the <span className="text-foreground">5th of April 1990</span>.
                  He is the official keyboardist of the Odunayo Akintomide Band.
                </p>
                <p>
                  His musical journey began in the church, where he developed
                  his keyboard-playing skills and a deep ear for harmony. He
                  started his professional music career in March 2022 and has
                  since performed at weddings, concerts, church programmes,
                  corporate events and the Soul Winner Annual Crusade.
                </p>
                <p>
                  He specialises in <span className="text-wine">Afrobeats</span>,{" "}
                  <span className="text-wine">Gospel</span>,{" "}
                  <span className="text-wine">Highlife</span> and{" "}
                  <span className="text-wine">Fuji</span> music. As a producer,
                  his catalogue spans work with some of Nigeria&apos;s most
                  distinctive voices — and his ambition is to expand his musical
                  career internationally through live performances, music
                  production and collaborations.
                </p>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Live Performance", "Studio Production", "Arrangement", "Collaboration"].map(
                  (t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="border-wine/30 text-foreground/90 font-mono text-[10px] uppercase tracking-wider"
                    >
                      {t}
                    </Badge>
                  )
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Journey Timeline ---------- */

function JourneySection() {
  return (
    <section id="journey" className="relative py-24 md:py-32 bg-card/30 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>The Journey</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground max-w-2xl">
            From the church piano to international stages
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Timeline column */}
          <div className="relative max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

            <div className="space-y-10 md:space-y-12">
              {JOURNEY.map((item, i) => (
                <Reveal key={item.title} delay={i}>
                  <div className="relative pl-14">
                    {/* Node dot */}
                    <div className="absolute left-4 top-2 -translate-x-1/2 z-10">
                      <span className="block h-3 w-3 rounded-full bg-wine ring-4 ring-background" />
                    </div>
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-wine mb-2">
                      {item.year}
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Sticky visual column */}
          <Reveal delay={1} className="hidden lg:block">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-wine/20">
                <img
                  src="/portfolio/keyboard-yellow.jpg"
                  alt="Oni Abiodun Ebenezer at his Akai MPK mini keyboard"
                  className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Quote className="h-6 w-6 text-wine mb-3" />
                  <p className="font-serif text-xl italic text-foreground leading-snug">
                    Every milestone is a new key on the journey&apos;s keyboard.
                  </p>
                  <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.3em] text-wine">
                    Oni Abiodun Ebenezer
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Specialties ---------- */

function SpecialtiesSection() {
  return (
    <section id="specialties" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <Reveal>
            <SectionLabel>Specialties</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground leading-tight">
              Four genres.<br />
              <span className="text-gold-gradient italic">One signature.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Whether on stage with the band or behind the boards in the studio,
              Oni moves fluently across four pillars of Nigerian music.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {GENRES.map((g, i) => (
              <Reveal key={g.name} delay={i}>
                <Card className={`relative overflow-hidden border-border/60 bg-gradient-to-br ${g.color} hover:border-wine/50 transition-colors group h-full`}>
                  <CardContent className="p-6 md:p-8">
                    <Music4 className="h-6 w-6 text-wine mb-5" />
                    <h3 className="font-serif text-2xl text-foreground mb-2">{g.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {g.desc}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Credits ---------- */

function CreditsSection() {
  return (
    <section id="credits" className="relative py-24 md:py-32 bg-card/30 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel>Production Credits</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground max-w-2xl">
                Artistes he&apos;s built records with
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              A growing catalogue of productions and collaborations with leading
              street, mainstream and emerging Nigerian voices.
            </p>
          </div>
        </Reveal>

        {/* Marquee row */}
        <Reveal>
          <div className="relative overflow-hidden border-y border-border/60 py-5 mb-10 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[...CREDITS, ...CREDITS].map((name, i) => (
                <span
                  key={i}
                  className="font-serif text-2xl md:text-3xl text-foreground/40 hover:text-wine transition-colors flex items-center gap-12"
                >
                  {name}
                  <Sparkles className="h-3 w-3 text-wine/50" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CREDITS.map((name, i) => (
            <Reveal key={name} delay={i % 4}>
              <div className="group relative p-5 border border-border/60 rounded-sm hover:border-wine/50 hover:bg-wine/5 transition-all">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center h-10 w-10 rounded-full bg-wine/10 border border-wine/30">
                    <Mic2 className="h-4 w-4 text-wine" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif text-foreground truncate">{name}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Artiste
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Notable Productions ---------- */

function ProductionsSection() {
  return (
    <section id="productions" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Notable Productions</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground max-w-2xl">
            Selected production work
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {NOTABLE_PRODUCTIONS.map((p, i) => (
            <Reveal key={p.title} delay={i}>
              <Card className="group relative h-full overflow-hidden border-border/60 hover:border-wine/50 transition-all bg-card">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={
                      i === 0
                        ? "/portfolio/akai-yellow.jpg"
                        : i === 1
                        ? "/portfolio/keyboard-yellow.jpg"
                        : "/portfolio/smiling-red.jpg"
                    }
                    alt={p.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="grid place-items-center h-9 w-9 rounded-full bg-wine text-cream">
                      <Disc3 className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/80 bg-background/60 backdrop-blur px-2 py-1 rounded">
                      {p.note}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-wine transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.artist}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-wine">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className="h-3 w-3 fill-wine" />
                      ))}
                    </div>
                    <Headphones className="h-4 w-4 text-muted-foreground group-hover:text-wine transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Band ---------- */

function BandSection() {
  return (
    <section id="band" className="relative py-24 md:py-32 bg-card/30 border-y border-border/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <SectionLabel>The Band</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground leading-tight">
              Official keyboardist of the{" "}
              <span className="text-gold-gradient italic">Odunayo Akintomide Band</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              A ten-piece ensemble bringing together vocalists, percussionists,
              horns and keys — engineered for powerhouse live performances across
              Nigeria and, from 2027, the United Kingdom.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="border border-border/60 p-5 rounded-sm text-center">
                <div className="font-serif text-3xl text-wine">10</div>
                <div className="text-[10px] mt-1 font-mono uppercase tracking-wider text-muted-foreground">
                  Band Members
                </div>
              </div>
              <div className="border border-border/60 p-5 rounded-sm text-center">
                <Piano className="mx-auto h-6 w-6 text-wine" />
                <div className="text-[10px] mt-2 font-mono uppercase tracking-wider text-muted-foreground">
                  Lead Keys
                </div>
              </div>
              <div className="border border-border/60 p-5 rounded-sm text-center">
                <Globe2 className="mx-auto h-6 w-6 text-wine" />
                <div className="text-[10px] mt-2 font-mono uppercase tracking-wider text-muted-foreground">
                  UK Bound
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="relative grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="aspect-[3/4] overflow-hidden rounded-sm border border-border/60">
                  <img
                    src="/portfolio/keyboard-yellow.jpg"
                    alt="Oni Abiodun Ebenezer with Akai MPK mini keyboard"
                    className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
                </div>
                <div className="aspect-square overflow-hidden rounded-sm border border-border/60">
                  <img
                    src="/portfolio/akai-yellow.jpg"
                    alt="Oni Abiodun Ebenezer holding two Akai MPK mini keyboards"
                    className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
                </div>
              </div>
              <div className="space-y-3 mt-8">
                <div className="aspect-square overflow-hidden rounded-sm border border-border/60">
                  <img
                    src="/portfolio/smiling-red.jpg"
                    alt="Oni Abiodun Ebenezer smiling in red shirt"
                    className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-sm border border-border/60">
                  <img
                    src="/portfolio/portrait-pink.jpg"
                    alt="Oni Abiodun Ebenezer portrait"
                    className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- UK Tour ---------- */

function TourSection() {
  return (
    <section
      id="tour"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* BG image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/portfolio/smiling-red.jpg"
          alt=""
          className="h-full w-full object-cover object-top opacity-15"
            loading="lazy"
            decoding="async"
          />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-wine/60" />
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-wine/90">
              UK Tour · 2027
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[0.95] max-w-4xl">
            Storming the UK
            <br />
            <span className="text-gold-gradient italic">Jan – Jul 2027</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Oni Abiodun Ebenezer and his 10-piece band will be in the United
            Kingdom for a six-month tour, performing across major halls in
            London and beyond — with a special collaboration series alongside
            the <span className="text-foreground">Eagle Band</span>.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-8">
          {/* Venues */}
          <Reveal>
            <div className="border border-border/60 rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-card/50">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-wine" />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground">
                    Tour Venues
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  More TBA
                </span>
              </div>
              <ul className="divide-y divide-border/60">
                {UK_VENUES.map((v) => (
                  <li
                    key={v.name}
                    className="px-6 py-5 flex items-start gap-4 hover:bg-wine/5 transition-colors group"
                  >
                    <span className="mt-1 grid place-items-center h-7 w-7 rounded-full bg-wine/10 border border-wine/30 text-wine text-xs font-mono">
                      <Calendar className="h-3 w-3" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-lg text-foreground group-hover:text-wine transition-colors">
                        {v.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{v.address}</div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-wine/70 mt-1">
                        {v.city}
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-wine transition-colors" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Manager / Info */}
          <Reveal delay={1}>
            <div className="space-y-4">
              <Card className="border-wine/30 bg-card/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-5 w-5 text-wine" />
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground">
                      Band Management
                    </span>
                  </div>
                  <div className="font-serif text-2xl text-foreground">
                    Mr. Lawal Taiwo Tomiwa
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Band Manager
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Tour bookings, press and collaboration enquiries are handled
                    directly by the band management office.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-5 w-5 text-wine" />
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground">
                      Tour Highlights
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-wine shrink-0" />
                      Six-month residency: January – July 2027
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-wine shrink-0" />
                      Special collaboration series with the Eagle Band
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-wine shrink-0" />
                      Multiple London venues and halls across the UK
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-wine shrink-0" />
                      Live band production led from the keys
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Education & Personal ---------- */

function PersonalSection() {
  return (
    <section id="personal" className="relative py-24 md:py-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <Card className="h-full border-border/60 bg-card/40">
              <CardContent className="p-8 md:p-10">
                <GraduationCap className="h-7 w-7 text-wine mb-5" />
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  Education
                </h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li>
                    <div className="text-foreground font-medium">Success His and Hers College</div>
                    <div className="text-sm">Secondary education — completed 2009</div>
                  </li>
                  <li>
                    <div className="text-foreground font-medium">National Open University of Nigeria (NOUN)</div>
                    <div className="text-sm">Currently studying Business Administration</div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={1}>
            <Card className="h-full border-border/60 bg-card/40">
              <CardContent className="p-8 md:p-10">
                <Heart className="h-7 w-7 text-wine mb-5" />
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  Personal Life
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Married to{" "}
                  <span className="text-foreground font-medium">
                    Mrs Abiodun Imole Funmilayo
                  </span>
                  , and together they are blessed with{" "}
                  <span className="text-foreground font-medium">two children</span>.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  His ambition is to expand his musical career internationally
                  through live performances, music production and collaborations
                  with other musicians — a vision the 2027 UK tour brings to life.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-card/30 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <SectionLabel>Booking &amp; Enquiries</SectionLabel>
            <h2 className="font-serif text-4xl md:text-6xl font-semibold text-foreground leading-tight">
              Let&apos;s make
              <br />
              <span className="text-gold-gradient italic">music together</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              For live bookings, studio production, collaborations and UK 2027
              tour enquiries, reach out through any of the channels below.
            </p>

            <div className="mt-10 space-y-3">
              <a
                href="tel:+2340000000000"
                className="flex items-center gap-4 p-4 border border-border/60 rounded-sm hover:border-wine/50 hover:bg-wine/5 transition-all group"
              >
                <Phone className="h-5 w-5 text-wine" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Phone (Band Manager)
                  </div>
                  <div className="text-foreground group-hover:text-wine transition-colors">
                    Mr. Lawal Taiwo Tomiwa
                  </div>
                </div>
              </a>
              <a
                href="mailto:booking@oniabiodunebenezer.com"
                className="flex items-center gap-4 p-4 border border-border/60 rounded-sm hover:border-wine/50 hover:bg-wine/5 transition-all group"
              >
                <Mail className="h-5 w-5 text-wine" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Email
                  </div>
                  <div className="text-foreground group-hover:text-wine transition-colors">
                    booking@oniabiodunebenezer.com
                  </div>
                </div>
              </a>
              <a
                href="#tour"
                className="flex items-center gap-4 p-4 border border-border/60 rounded-sm hover:border-wine/50 hover:bg-wine/5 transition-all group"
              >
                <MapPin className="h-5 w-5 text-wine" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Tour Enquiries
                  </div>
                  <div className="text-foreground group-hover:text-wine transition-colors">
                    UK Tour · Jan – Jul 2027
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-8 border-t border-border/60 pt-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Connect
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="grid place-items-center h-11 w-11 rounded-full border border-border/60 hover:border-wine/50 hover:text-wine transition-all"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="grid place-items-center h-11 w-11 rounded-full border border-border/60 hover:border-wine/50 hover:text-wine transition-all"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href="mailto:booking@oniabiodunebenezer.com"
                  aria-label="Email"
                  className="grid place-items-center h-11 w-11 rounded-full border border-border/60 hover:border-wine/50 hover:text-wine transition-all"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href="tel:+2340000000000"
                  aria-label="Phone"
                  className="grid place-items-center h-11 w-11 rounded-full border border-border/60 hover:border-wine/50 hover:text-wine transition-all"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <Card className="border-wine/30 bg-card overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[4/5]">
                  <img
                    src="/portfolio/portrait-pink.jpg"
                    alt="Oni Abiodun Ebenezer"
                    className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-wine mb-2">
                      Available for
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Live Shows", "Studio Sessions", "Collaborations", "UK Tour 2027"].map(
                        (t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="border-wine/30 text-foreground font-mono text-[10px] uppercase tracking-wider"
                          >
                            {t}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="grid place-items-center h-10 w-10 rounded-full border border-wine/40 text-wine font-serif text-lg italic">
                O
              </span>
              <div>
                <div className="font-serif text-foreground">Oni Abiodun Ebenezer</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                  Keyboardist · Producer · Composer
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm mt-4">
              From Osun State, Nigeria — to the United Kingdom. Music without
              borders.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="grid place-items-center h-10 w-10 rounded-full border border-border/60 hover:border-wine/50 hover:text-wine transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="grid place-items-center h-10 w-10 rounded-full border border-border/60 hover:border-wine/50 hover:text-wine transition-all"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                aria-label="Email"
                className="grid place-items-center h-10 w-10 rounded-full border border-border/60 hover:border-wine/50 hover:text-wine transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <Button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-wine text-cream hover:bg-wine/90 font-mono uppercase tracking-wider text-xs"
            >
              Book Now
            </Button>
          </div>
        </div>

        <div className="divider-gold my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          <div>© {new Date().getFullYear()} Oni Abiodun Ebenezer. All rights reserved.</div>
          <div>Official keyboardist · Odunayo Akintomide Band</div>
        </div>
      </div>
    </footer>
  );
}


