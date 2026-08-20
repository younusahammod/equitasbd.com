import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import NotFound from "@/pages/not-found";
import logo from "@assets/WhatsApp_Image_2026-04-06_at_11.59.45_1776372697723.jpeg";
import teamWasiur from "@assets/team/wasiur-rahman.jpeg";
import teamLulu from "@assets/team/lulu-garbia-hasan.jpeg";
import teamKaffi from "@assets/team/kaffi-abdullah-khan.jpeg";
import teamRaton from "@assets/team/md-raton-ali.jpeg";
import teamMusfiq from "@assets/team/anm-musfiq-uzzaman.jpeg";
import teamSadikul from "@assets/team/sadikul-islam.jpeg";
import teamFaisal from "@assets/team/faisal-anabil.jpg";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronUp,
  Clock,
  FileText,
  Gavel,
  Home as HomeIcon,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";


const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/team", label: "Our Team" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const practiceAreas = [
  {
    title: "Criminal Litigation",
    description:
      "Careful defense strategy, bail matters, trial preparation, and rights-focused representation in criminal proceedings.",
    icon: ShieldCheck,
  },
  {
    title: "Civil Litigation",
    description:
      "Strategic representation in civil disputes, recovery claims, injunctions, appeals, and negotiated settlements.",
    icon: Gavel,
  },
  {
    title: "Writ Litigation",
    description:
      "Constitutional remedies and writ petitions before the High Court Division, fundamental rights enforcement, and administrative law challenges.",
    icon: FileText,
  },
  {
    title: "Labour and Employment Litigation",
    description:
      "Workplace dispute resolution, wrongful termination claims, labour court representation, and employment compliance advisory.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Corporate Law",
    description:
      "Entity formation, governance, commercial contracts, regulatory advice, and transaction support for growing companies.",
    icon: Building2,
  },
  {
    title: "Property Law",
    description:
      "Due diligence, land documentation, registration, lease matters, real estate disputes, and property transfer guidance.",
    icon: HomeIcon,
  },
  {
    title: "Family Law",
    description:
      "Confidential counsel for marriage, divorce, guardianship, inheritance, custody, and sensitive family disputes.",
    icon: Users,
  },
  {
    title: "Banking Law",
    description:
      "Loan recovery, banking regulatory compliance, financial disputes, security enforcement, and advisory on banking transactions.",
    icon: Landmark,
  },
];

const values = [
  "Integrity in every matter",
  "Professional discipline",
  "Client-focused strategy",
  "Clear and timely communication",
];

type TeamMember = {
  name: string;
  role: string;
  credential: string;
  initials: string;
  photo: string | null;
  featured?: boolean;
  slug?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Md. Wasiur Rahman",
    role: "Managing Partner",
    credential: "Advocate, Supreme Court of Bangladesh",
    initials: "WR",
    photo: teamWasiur,
    featured: true,
    slug: "/team/wasiur-rahman",
  },
  {
    name: "Lulu Garbia Hasan",
    role: "Partner",
    credential: "Advocate, Supreme Court of Bangladesh",
    initials: "LH",
    photo: teamLulu,
  },
  {
    name: "Faisal Mahmud Anabil",
    role: "External Counsel",
    credential: "Barrister-at-Law, Advocate, Supreme Court of Bangladesh",
    initials: "FA",
    photo: teamFaisal,
    slug: "/team/faisal-anabil",
  },
  {
    name: "Kaffi Abdullah Khan",
    role: "Senior Associate",
    credential: "Advocate, Supreme Court of Bangladesh",
    initials: "KK",
    photo: teamKaffi,
    slug: "/team/kaffi-abdullah-khan",
  },
  {
    name: "Md. Raton Ali",
    role: "Associate",
    credential: "Advocate, Supreme Court of Bangladesh",
    initials: "RA",
    photo: teamRaton,
  },
  {
    name: "ANM Musfiq Uzzaman",
    role: "Associate",
    credential: "Advocate, Dhaka Judge Court",
    initials: "AU",
    photo: teamMusfiq,
  },
  {
    name: "Sadikul Islam",
    role: "Intern",
    credential: "",
    initials: "SI",
    photo: teamSadikul,
  },
];

const insights = [
  {
    title: "Understanding Commercial Contracts in Bangladesh",
    category: "Corporate Law",
    excerpt:
      "A practical overview of clauses business owners should review before signing high-value agreements.",
    date: "April 2026",
  },
  {
    title: "Property Due Diligence Before Purchase",
    category: "Property Law",
    excerpt:
      "Key documents, ownership checks, and risk signals to evaluate before completing a land or apartment transaction.",
    date: "March 2026",
  },
  {
    title: "Preparing for a Civil Dispute Consultation",
    category: "Litigation",
    excerpt:
      "How to organize records, correspondence, and timelines so your first meeting is productive and focused.",
    date: "February 2026",
  },
];

const SITE_URL = "https://equitasbd.com";

function PageSeo({
  title,
  description,
  path,
  schema,
}: {
  title: string;
  description: string;
  path?: string;
  schema?: Record<string, unknown>;
}) {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute("content", description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute("content", title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogDescription?.setAttribute("content", description);
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = logo;
      favicon.type = "image/jpeg";
    }

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    const canonicalUrl = `${SITE_URL}${path ?? ""}`;
    canonicalLink.href = canonicalUrl;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    ogUrl?.setAttribute("content", canonicalUrl);

    const existingSchema = document.getElementById("page-schema");
    if (existingSchema) existingSchema.remove();
    if (schema) {
      const script = document.createElement("script");
      script.id = "page-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [description, title, path, schema]);

  return null;
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061a2f]/95 text-white shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="EQUITAS home">
          <img src={logo} alt="EQUITAS Law Firm logo" className="h-14 w-14 rounded-full bg-white object-cover p-1 shadow-lg" />
          <div>
            <p className="font-serif text-2xl font-bold tracking-[0.18em] text-white">EQUITAS</p>
            <p className="text-xs uppercase tracking-[0.32em] text-[#c7a052]">A Law Firm</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition hover:text-[#d4af62] ${
                location === item.href ? "text-[#d4af62]" : "text-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-[#c7a052] px-5 py-3 text-sm font-bold text-[#061a2f] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#dcb86c] lg:inline-flex"
        >
          Book Consultation
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex rounded-full border border-white/20 p-2 lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#061a2f] px-4 py-4 lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 hover:text-[#d4af62]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#051321] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <img src={logo} alt="EQUITAS Law Firm logo" className="h-16 w-16 rounded-full bg-white object-cover p-1" />
            <div>
              <p className="font-serif text-3xl font-bold tracking-[0.18em]">EQUITAS</p>
              <p className="text-sm uppercase tracking-[0.3em] text-[#d4af62]">Justice, Integrity, Excellence.</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            EQUITAS is a Bangladesh-based law firm providing disciplined advocacy, thoughtful legal advisory, and client-focused representation across business and personal matters.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-serif text-lg text-[#d4af62]">Quick Links</h3>
          <div className="grid gap-3 text-sm text-slate-300">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-serif text-lg text-[#d4af62]">Contact</h3>
          <div className="grid gap-3 text-sm text-slate-300">
            <a className="flex items-center gap-2 hover:text-white" href="mailto:info@equitasbd.com">
              <Mail className="h-4 w-4 text-[#d4af62]" /> info@equitasbd.com
            </a>
            <div className="flex items-start gap-2">
              <Phone className="mt-1 h-4 w-4 text-[#d4af62]" />
              <div className="flex flex-col gap-0.5">
                <a href="tel:+8801911065363" className="hover:text-white">+880 1911-065363</a>
                <a href="tel:+8801737056336" className="hover:text-white">+880 1737-056336</a>
              </div>
            </div>
            <p className="flex items-start gap-2">
              <MapPin className="mt-1 h-4 w-4 text-[#d4af62]" /> Suite-4B, Silver Rain, 48 Bijoynagar (Behind Hotel-71), Dhaka-1000, Bangladesh
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} EQUITAS Law Firm. All rights reserved.</p>
        <p className="mt-1">
          Developed by{" "}
          <a href="https://cloudlax.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-300 hover:text-white">
            Cloudlax IT
          </a>
        </p>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c7a052]/30 bg-[#c7a052]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#8b6824]">
      <Scale className="h-4 w-4" /> {children}
    </p>
  );
}

function CtaBand() {
  return (
    <section className="bg-[#061a2f] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(199,160,82,0.12))] p-8 shadow-2xl md:flex-row md:items-center lg:p-12">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#d4af62]">Need legal clarity?</p>
          <h2 className="max-w-3xl font-serif text-3xl font-bold md:text-5xl">Speak with a focused legal team before your next decision.</h2>
        </div>
        <Link href="/contact" className="rounded-full bg-[#d4af62] px-7 py-4 font-bold text-[#061a2f] shadow-lg transition hover:-translate-y-1 hover:bg-[#f0cf82]">
          Contact Us
        </Link>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <PageSeo title="EQUITAS Law Firm Bangladesh | Justice, Integrity, Excellence." description="EQUITAS is a professional Bangladesh law firm offering criminal, civil, writ, and labour litigation alongside corporate, property, family, and banking legal services." path="/" />
      <section className="relative overflow-hidden bg-[#061a2f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,175,98,0.24),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="reveal">
            <p className="mb-5 inline-flex rounded-full border border-[#d4af62]/30 bg-white/5 px-4 py-2 text-sm font-semibold text-[#e2c37d]">Bangladesh legal counsel for decisive matters</p>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">Justice, Integrity, Excellence.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
              EQUITAS combines disciplined advocacy with practical legal strategy for individuals, families, entrepreneurs, and institutions across Bangladesh.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4af62] px-7 py-4 font-bold text-[#061a2f] shadow-xl transition hover:-translate-y-1 hover:bg-[#f0cf82]">
                Book Consultation <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/practice-areas" className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-[#d4af62] hover:text-[#d4af62]">
                Explore Services
              </Link>
            </div>
          </div>
          <div className="reveal rounded-[2.5rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <div className="rounded-[2rem] bg-white p-8 text-[#061a2f]">
              <img src={logo} alt="EQUITAS logo" className="mx-auto mb-8 h-44 w-44 rounded-full object-cover shadow-xl" />
              <div className="grid gap-4">
                {["Client-first legal strategy", "Clear communication", "Courtroom and advisory experience"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f7f2e8] p-4">
                    <CheckCircle2 className="h-5 w-5 text-[#a87924]" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionLabel>About Equitas</SectionLabel>
              <h2 className="font-serif text-4xl font-bold text-[#061a2f] md:text-5xl">Measured counsel for moments that matter.</h2>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              EQUITAS provides dependable legal services rooted in preparation, discretion, and respect for each client’s objective. From commercial advisory to sensitive family matters and litigation, our work is structured around clarity, accountability, and results.
            </p>
          </div>
        </div>
      </section>

      <StatsStrip />
      <PracticePreview limit={6} />
      <TeamCarousel />
      <HowWeWork />
      <WhyChooseUs />
      <ContactPreview />
      <CtaBand />
    </>
  );
}

function StatsStrip() {
  const stats = [
    { value: String(practiceAreas.length), label: "Practice Areas", size: "text-4xl md:text-5xl" },
    { value: String(teamMembers.length), label: "Advocates & Associates", size: "text-4xl md:text-5xl" },
    { value: "Dhaka, Bangladesh", label: "Chamber Location", size: "text-2xl md:text-3xl" },
  ];
  return (
    <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className={`font-serif font-bold text-[#061a2f] ${stat.size}`}>{stat.value}</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[#a87924]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const workSteps = [
  { title: "Consultation", text: "Share the details of your matter so our team can understand your objective and constraints." },
  { title: "Case Assessment", text: "We review the facts, documents, and applicable law to identify the strongest path forward." },
  { title: "Strategy & Preparation", text: "A clear strategy is prepared, with pleadings, filings, and negotiations handled with careful attention to detail." },
  { title: "Resolution", text: "We represent your interests through to resolution, keeping you informed at every step." },
];

function HowWeWork() {
  return (
    <section className="bg-[#f7f2e8] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="font-serif text-4xl font-bold text-[#061a2f] md:text-5xl">A clear process from first call to resolution.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((step, index) => (
            <div key={step.title} className="rounded-[1.75rem] border border-[#e4d3ab] bg-white p-7 shadow-sm">
              <p className="mb-4 font-serif text-3xl font-bold text-[#d4af62]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mb-3 font-serif text-xl font-bold text-[#061a2f]">{step.title}</h3>
              <p className="leading-7 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PracticePreview({ limit, showViewAll = true }: { limit?: number; showViewAll?: boolean }) {
  const areas = limit ? practiceAreas.slice(0, limit) : practiceAreas;
  return (
    <section className="bg-[#f7f2e8] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Practice Areas</SectionLabel>
            <h2 className="font-serif text-4xl font-bold text-[#061a2f] md:text-5xl">Comprehensive legal services.</h2>
          </div>
          {showViewAll && (
            <Link href="/practice-areas" className="inline-flex items-center gap-2 font-bold text-[#8b6824] hover:text-[#061a2f]">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <article key={area.title} className="group rounded-[1.75rem] border border-[#e4d3ab] bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
                <Icon className="mb-5 h-10 w-10 text-[#a87924]" />
                <h3 className="mb-3 font-serif text-2xl font-bold text-[#061a2f]">{area.title}</h3>
                <p className="leading-7 text-slate-600">{area.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="font-serif text-4xl font-bold text-[#061a2f] md:text-5xl">A firm built on trust, preparation, and practical results.</h2>
        </div>
        <div className="grid gap-5">
          {[
            ["Experience", "Legal guidance across advisory, transactional, and courtroom matters."],
            ["Trust", "Confidential, transparent communication from consultation to resolution."],
            ["Results", "Strategy shaped around the client’s legal, personal, and commercial goals."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-serif text-2xl font-bold text-[#061a2f]">{title}</h3>
              <p className="leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPreview() {
  return (
    <section className="bg-[#061a2f] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#d4af62]">Contact Preview</p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Start with a confidential consultation.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Share your matter and a member of our team will respond with the next practical step.</p>
        </div>
        <div className="rounded-[1.75rem] bg-white p-7 text-[#061a2f] shadow-xl">
          <p className="mb-3 flex items-center gap-2 font-semibold"><Mail className="h-5 w-5 text-[#a87924]" /> info@equitasbd.com</p>
          <div className="mb-3 flex items-center gap-2 font-semibold">
            <Phone className="h-5 w-5 text-[#a87924]" />
            <div className="flex flex-col">
              <a href="tel:+8801911065363" className="hover:text-[#8b6824]">+880 1911-065363</a>
              <a href="tel:+8801737056336" className="hover:text-[#8b6824]">+880 1737-056336</a>
            </div>
          </div>
          <Link href="/contact" className="mt-5 inline-flex rounded-full bg-[#061a2f] px-6 py-3 font-bold text-white transition hover:bg-[#12345a]">
            Send a Message
          </Link>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <PageSeo title="About EQUITAS | Bangladesh Law Firm" description="Learn about EQUITAS, our mission, vision, values, and client-focused approach to legal services in Bangladesh." path="/about" />
      <PageHero label="About Us" title="A modern Bangladeshi law firm with principled foundations." text="We combine professionalism, discretion, and strategic preparation to support clients through complex legal decisions." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-[#f7f2e8] p-8 lg:p-12">
            <h2 className="mb-5 font-serif text-3xl font-bold text-[#061a2f]">Firm Background</h2>
            <p className="leading-8 text-slate-700">
              EQUITAS was formed to deliver careful, ethical, and commercially aware legal counsel for clients in Bangladesh. The firm assists private clients, entrepreneurs, families, and organizations with advocacy and advisory services across key practice areas.
            </p>
          </div>
          <div className="grid gap-5">
            <InfoCard title="Mission" text="To provide clear, responsible legal representation that protects client interests and strengthens confidence in every step of the process." />
            <InfoCard title="Vision" text="To be recognized as a trusted Bangladesh law firm known for integrity, preparation, and professional excellence." />
          </div>
        </div>
      </section>
      <section className="bg-[#061a2f] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#d4af62]">Our Values</p>
          <div className="grid gap-5 md:grid-cols-4">
            {values.map((value) => (
              <div key={value} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <CheckCircle2 className="mb-4 h-7 w-7 text-[#d4af62]" />
                <p className="font-serif text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TeamGrid limit={3} showViewAll />
      <CtaBand />
    </>
  );
}

function PracticeAreas() {
  return (
    <>
      <PageSeo title="Practice Areas | EQUITAS Law Firm" description="Explore EQUITAS legal services including criminal litigation, civil litigation, writ litigation, labour and employment litigation, corporate law, property law, family law, and banking law." path="/practice-areas" />
      <PageHero label="Practice Areas" title="Focused legal support across essential areas of law." text="Each matter is approached with careful preparation, clear advice, and a strategy aligned with the client’s objective." />
      <PracticePreview showViewAll={false} />
      <CtaBand />
    </>
  );
}

function Team() {
  const featuredMember = teamMembers.find((member) => member.featured);
  return (
    <>
      <PageSeo title="Our Team | EQUITAS Law Firm" description="Meet the EQUITAS legal team serving clients across Bangladesh with professionalism and disciplined advocacy." path="/team" />
      <PageHero label="Our Team" title="Experienced counsel. Careful preparation. Client-focused service." text="Meet the advocates and associates representing EQUITAS clients before Bangladesh's courts." />
      {featuredMember && <TeamSpotlight member={featuredMember} />}
      <TeamGrid />
      <CtaBand />
    </>
  );
}

function TeamPhoto({ member, className = "" }: { member: (typeof teamMembers)[number]; className?: string }) {
  return (
    <div className={`aspect-[4/5] w-full overflow-hidden bg-[linear-gradient(135deg,#061a2f,#12345a)] ${className}`}>
      {member.photo ? (
        <img src={member.photo} alt={member.name} className="h-full w-full object-cover object-top" />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#d4af62]/60 bg-white/10 font-serif text-3xl font-bold text-[#d4af62]">
            {member.initials}
          </div>
        </div>
      )}
    </div>
  );
}

function TeamSpotlight({ member }: { member: (typeof teamMembers)[number] }) {
  const primary = member.credential || member.role;
  const secondary = member.credential ? member.role : null;
  return (
    <section className="bg-[#f7f2e8] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] border-4 border-[#d4af62]/60 shadow-2xl">
          <TeamPhoto member={member} />
        </div>
        <div>
          <h2 className="font-serif text-4xl font-bold text-[#061a2f] md:text-5xl">{member.name}</h2>
          <p className="mt-3 text-lg font-semibold text-[#a87924]">{primary}</p>
          {secondary && <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-[#8b6824]">{secondary}</p>}
          {member.slug && (
            <Link href={member.slug} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#061a2f] px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#12345a]">
              View Full Profile <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: (typeof teamMembers)[number] }) {
  const primary = member.credential || member.role;
  const secondary = member.credential ? member.role : null;
  const cardContent = (
    <>
      <TeamPhoto member={member} />
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-[#061a2f]">{member.name}</h3>
        <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-[#a87924]">{primary}</p>
        {secondary && <p className="mt-4 leading-7 text-slate-600">{secondary}</p>}
        {member.slug && <p className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#8b6824]">View profile <ArrowRight className="h-3.5 w-3.5" /></p>}
      </div>
    </>
  );
  return (
    <article className="h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
      {member.slug ? <Link href={member.slug}>{cardContent}</Link> : cardContent}
    </article>
  );
}

function TeamGrid({ limit, showViewAll = false }: { limit?: number; showViewAll?: boolean }) {
  const members = limit ? teamMembers.slice(0, limit) : teamMembers.filter((member) => !member.featured);
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Legal Team</SectionLabel>
            <h2 className="font-serif text-4xl font-bold text-[#061a2f] md:text-5xl">Meet our lawyers.</h2>
          </div>
          {showViewAll && (
            <Link href="/team" className="inline-flex items-center gap-2 font-bold text-[#8b6824] hover:text-[#061a2f]">
              Meet the full team <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Legal Team</SectionLabel>
            <h2 className="font-serif text-4xl font-bold text-[#061a2f] md:text-5xl">Meet our lawyers.</h2>
          </div>
          <Link href="/team" className="inline-flex items-center gap-2 font-bold text-[#8b6824] hover:text-[#061a2f]">
            Meet the full team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Carousel opts={{ loop: true, align: "start" }} setApi={setApi}>
          <CarouselContent>
            {teamMembers.map((member) => (
              <CarouselItem key={member.name} className="sm:basis-1/2 lg:basis-1/4">
                <TeamCard member={member} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 border-none bg-white shadow-lg hover:bg-[#f7f2e8]" />
          <CarouselNext className="right-2 border-none bg-white shadow-lg hover:bg-[#f7f2e8]" />
        </Carousel>
      </div>
    </section>
  );
}

const wasiurExpertise = [
  "Labour Law",
  "Civil Law",
  "Criminal Law",
  "Banking Law",
  "Writ Matters",
  "Land Law",
  "Company Law",
  "ICT & Cyber Law",
  "Telecommunication Law",
  "Government & Corporation Law",
  "Employment & Service Law",
  "Revenue Law",
];

const wasiurCredentials = [
  { label: "Date of Enrollment", value: "18 October 2014" },
  { label: "District Bar Association", value: "Dhaka Bar Association, Membership No. 19463" },
  { label: "High Court Division Practice", value: "Permitted to practice since 1 January 2017" },
  { label: "Supreme Court Bar Association", value: "Membership No. 9008" },
];

const wasiurExperience = [
  { role: "Registrar, Third Labour Court, Dhaka", period: "September 2019 – August 2024" },
  { role: "Registrar, Labour Court, Cumilla", period: "August 2024 – October 2024" },
];

const wasiurEducation = [
  { degree: "Masters in Human Resource Development and Industrial Relations", institution: "Department of Public Administration, Jahangirnagar University", year: "2024" },
  { degree: "LL.M", institution: "University of Rajshahi", year: "2013" },
  { degree: "LL.B (Hons)", institution: "University of Rajshahi", year: "2012" },
  { degree: "H.S.C", institution: "New Govt. Degree College, Rajshahi", year: "2007" },
  { degree: "S.S.C", institution: "Masjid Mission Academy, Rajshahi", year: "2005" },
];

const wasiurPanelClients = [
  "Biman Bangladesh Airlines",
  "Bangladesh Inland Water Transport Corporation (BIWTC)",
  "Ekushey Television Limited",
  "Transcom Limited",
  "Al-Arafah Islami Bank PLC",
  "Agrani Bank PLC",
  "Islami Bank Bangladesh PLC",
];

function WasiurRahmanProfile() {
  const member = teamMembers.find((item) => item.slug === "/team/wasiur-rahman");
  if (!member) return null;

  return (
    <>
      <PageSeo
        title="Md. Wasiur Rahman | Managing Partner | EQUITAS Law Firm"
        description="Md. Wasiur Rahman, Managing Partner at EQUITAS, is an Advocate of the Supreme Court of Bangladesh specializing in Labour Law, Civil Law, Banking Law, and Writ matters."
        path="/team/wasiur-rahman"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Md. Wasiur Rahman",
          jobTitle: "Managing Partner",
          url: `${SITE_URL}/team/wasiur-rahman`,
          image: `${SITE_URL}${teamWasiur}`,
          email: "mailto:wrahman108@gmail.com",
          telephone: ["+8801911065363", "+8801737056336"],
          worksFor: { "@type": "LegalService", name: "EQUITAS Law Firm", url: SITE_URL },
          alumniOf: ["University of Rajshahi", "Jahangirnagar University"],
          memberOf: { "@type": "Organization", name: "Supreme Court Bar Association, Bangladesh" },
        }}
      />
      <ProfileHero member={member} tagline="Specializing in Labour Law, Civil Law, Banking Law, and Writ matters." />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link href="/team" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-[#8b6824] hover:text-[#061a2f]">
            ← Back to Our Team
          </Link>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] border-4 border-[#d4af62]/60 shadow-2xl lg:mx-0">
                <TeamPhoto member={member} />
              </div>
              <div className="mt-8 space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Mail className="h-4 w-4 shrink-0 text-[#a87924]" />
                  <a href="mailto:wrahman108@gmail.com" className="hover:text-[#061a2f]">wrahman108@gmail.com</a>
                </p>
                <p className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#a87924]" />
                  <span className="flex flex-col gap-1">
                    <a href="tel:+8801911065363" className="hover:text-[#061a2f]">+880 1911-065363</a>
                    <a href="tel:+8801737056336" className="hover:text-[#061a2f]">+880 1737-056336</a>
                  </span>
                </p>
                <p className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#a87924]" />
                  <span>Room No. 5010 (Annex), Supreme Court Bar Building, Shahbag, Dhaka</span>
                </p>
              </div>
            </div>

            <div>
              <p className="leading-8 text-slate-600">
                Wasiur Rahman began practicing law with the Dhaka Bar Association in 2014 and has appeared before the Supreme Court of Bangladesh since receiving permission to practice before the High Court Division in 2017. He specializes in Labour Law, having served as Registrar of the Labour Court for more than five years, and holds a Master's degree in Human Resource Development and Industrial Relations from Jahangirnagar University. His practice also spans Civil, Criminal, Banking, Writ, Land, Company, ICT and Cyber, Telecommunications, Government and Corporation, Employment and Service, and Revenue law.
              </p>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {wasiurExpertise.map((item) => (
                  <span key={item} className="rounded-full border border-[#d4af62]/40 bg-[#f7f2e8] px-4 py-2 text-sm font-semibold text-[#8b6824]">
                    {item}
                  </span>
                ))}
              </div>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Professional Credentials</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {wasiurCredentials.map((item) => (
                  <div key={item.label} className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a87924]">{item.label}</p>
                    <p className="mt-1 font-semibold text-[#061a2f]">{item.value}</p>
                  </div>
                ))}
              </div>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Experience</h2>
              <div className="space-y-4">
                {wasiurExperience.map((item) => (
                  <div key={item.role} className="rounded-[1.25rem] border-l-4 border-[#d4af62] bg-white p-5 shadow-sm">
                    <p className="font-semibold text-[#061a2f]">{item.role}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.period}</p>
                  </div>
                ))}
              </div>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Education</h2>
              <div className="space-y-4">
                {wasiurEducation.map((item) => (
                  <div key={item.degree} className="flex flex-col gap-1 border-b border-slate-200 pb-4 last:border-none">
                    <p className="font-semibold text-[#061a2f]">{item.degree}</p>
                    <p className="text-sm text-slate-500">{item.institution} · {item.year}</p>
                  </div>
                ))}
              </div>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Panel Lawyer For</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {wasiurPanelClients.map((client) => (
                  <li key={client} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#a87924]" /> {client}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

const faisalExpertise = [
  "Corporate & Commercial Law",
  "Contracts & Commercial Agreements",
  "Regulatory Compliance",
  "Civil Litigation & Dispute Resolution",
  "Land & Property Matters",
  "Intellectual Property",
  "Company Law",
  "VAT & Taxation",
  "Labour Matters",
  "Arbitration & Mediation",
];

const faisalCredentials = [
  { label: "Call to the Bar", value: "Barrister-at-Law, The Honourable Society of Lincoln's Inn" },
  { label: "Court Practice", value: "Advocate, The Supreme Court of Bangladesh" },
  { label: "Mediation Accreditation", value: "Accredited Mediator, ADR-ODR International, UK" },
  { label: "Arbitration Membership", value: "Member, Bangladesh International Arbitration Centre (BIAC)" },
];

const faisalEducation = [
  { degree: "Barrister-at-Law", institution: "The Honourable Society of Lincoln's Inn" },
  { degree: "Bar Professional Training Course (BPTC)", institution: "University of the West of England, Bristol, UK" },
  { degree: "LL.B (Hons)", institution: "University of London, UK" },
  { degree: "Diploma in Law", institution: "University of London, UK" },
  { degree: "Master's in Criminology and Criminal Justice", institution: "University of Dhaka" },
];

function FaisalAnabilProfile() {
  const member = teamMembers.find((item) => item.slug === "/team/faisal-anabil");
  if (!member) return null;

  return (
    <>
      <PageSeo
        title="Faisal Mahmud Anabil | External Counsel | EQUITAS Law Firm"
        description="Faisal Mahmud Anabil is a Barrister-at-Law and Advocate of the Supreme Court of Bangladesh, focused on corporate and commercial law, contracts, regulatory matters, civil litigation, and dispute resolution."
        path="/team/faisal-anabil"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Faisal Mahmud Anabil",
          jobTitle: "External Counsel, Barrister-at-Law",
          url: `${SITE_URL}/team/faisal-anabil`,
          image: `${SITE_URL}${teamFaisal}`,
          worksFor: { "@type": "LegalService", name: "EQUITAS Law Firm", url: SITE_URL },
          alumniOf: ["University of London", "University of the West of England, Bristol", "University of Dhaka"],
          memberOf: [
            { "@type": "Organization", name: "The Honourable Society of Lincoln's Inn" },
            { "@type": "Organization", name: "Bangladesh International Arbitration Centre (BIAC)" },
          ],
        }}
      />
      <ProfileHero member={member} tagline="Specializing in Corporate & Commercial Law and Dispute Resolution." />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link href="/team" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-[#8b6824] hover:text-[#061a2f]">
            ← Back to Our Team
          </Link>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] border-4 border-[#d4af62]/60 shadow-2xl lg:mx-0">
                <TeamPhoto member={member} />
              </div>
              <div className="mt-8 space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#a87924]" />
                  <a href="mailto:info@equitasbd.com" className="hover:text-[#061a2f]">info@equitasbd.com</a>
                </p>
              </div>
            </div>

            <div>
              <p className="leading-8 text-slate-600">
                Faisal Mahmud Anabil is a Barrister-at-Law and Advocate of the Supreme Court of Bangladesh, with professional work focused primarily on corporate and commercial law, contracts, regulatory matters, civil litigation, and dispute resolution.
              </p>
              <p className="mt-5 leading-8 text-slate-600">
                His practice covers a broad range of corporate and commercial matters, including the drafting, review, and negotiation of commercial agreements, joint ventures, memoranda of understanding, business arrangements, and other contractual documents. He regularly advises on corporate governance, regulatory compliance, commercial transactions, land and property matters, intellectual property, and legal issues arising from business operations — with particular attention to contractual rights and obligations, commercial risk, regulatory requirements, and the prevention of future disputes. Legal issues are considered not only from a strictly legal position, but also in light of their practical and commercial consequences.
              </p>
              <p className="mt-5 leading-8 text-slate-600">
                He maintains considerable involvement in civil, corporate, and commercial litigation and dispute resolution, handling matters before the Supreme Court of Bangladesh and other courts, tribunals, and regulatory authorities — including contractual disputes, civil proceedings, company matters, land disputes, intellectual property matters, VAT and taxation issues, labour matters, and regulatory proceedings. His litigation work spans developing case strategy, drafting and reviewing pleadings and applications, preparing cases for hearing, briefing senior counsel, and coordinating settlement and dispute resolution processes.
              </p>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {faisalExpertise.map((item) => (
                  <span key={item} className="rounded-full border border-[#d4af62]/40 bg-[#f7f2e8] px-4 py-2 text-sm font-semibold text-[#8b6824]">
                    {item}
                  </span>
                ))}
              </div>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Professional Credentials</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {faisalCredentials.map((item) => (
                  <div key={item.label} className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a87924]">{item.label}</p>
                    <p className="mt-1 font-semibold text-[#061a2f]">{item.value}</p>
                  </div>
                ))}
              </div>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Education</h2>
              <div className="space-y-4">
                {faisalEducation.map((item) => (
                  <div key={item.degree} className="flex flex-col gap-1 border-b border-slate-200 pb-4 last:border-none">
                    <p className="font-semibold text-[#061a2f]">{item.degree}</p>
                    <p className="text-sm text-slate-500">{item.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

const kaffiExpertise = [
  "Corporate & Commercial Law",
  "Contract Drafting & Vetting",
  "Employment & Termination Matters",
  "Trademark & IP Matters",
  "Land & Property Documentation",
  "Banking Law",
  "Civil Litigation",
];

const kaffiCredentials = [
  { label: "Date of Enrollment", value: "18 October 2014" },
  { label: "High Court Division Practice", value: "Permitted to practice since 4 November 2019" },
  { label: "Bar Council Registration", value: "Advocate, Bangladesh Bar Council" },
  { label: "District Bar Association", value: "Dhaka Bar Association, Membership No. 21649" },
];

const kaffiExperience = [
  { role: "Assistant Manager (Legal), Eskayef Pharmaceuticals Limited", period: "July 2019 – Present", text: "Drafts and vets international and local commercial agreements, and handles employment, trademark, and counterfeit-product matters for the company." },
  { role: "Senior Executive (Legal), Urban Design & Developments Ltd.", period: "January 2018 – June 2019", text: "Provided opinions on land documentation, drafted legal documents including deeds, MOUs, and POAs, and represented the company in court as required." },
  { role: "Senior Executive (Legal), Manama Developments Ltd.", period: "September 2016 – December 2017", text: "Prepared legal documents, vetted land documents, negotiated dues settlements, and represented the company in court as required." },
  { role: "Associate Lawyer, Azad & Company", period: "March 2015 – August 2016", text: "Drafted legal opinions for One Bank Ltd, Mercantile Bank Ltd, and Dhaka Bank Ltd, and monitored cases before the concerned courts." },
];

const kaffiEducation = [
  { degree: "LL.M", institution: "University of Rajshahi", year: "2013" },
  { degree: "LL.B (Hons)", institution: "University of Rajshahi", year: "2012" },
  { degree: "H.S.C", institution: "Badshah Faisal Institute", year: "2007" },
  { degree: "S.S.C", institution: "Badshah Faisal Institute", year: "2005" },
];

function KaffiAbdullahKhanProfile() {
  const member = teamMembers.find((item) => item.slug === "/team/kaffi-abdullah-khan");
  if (!member) return null;

  return (
    <>
      <PageSeo
        title="Kaffi Abdullah Khan | Senior Associate | EQUITAS Law Firm"
        description="Kaffi Abdullah Khan is an Advocate of the Supreme Court of Bangladesh with experience in commercial litigation and corporate legal practice, including contracts, employment, IP, and land matters."
        path="/team/kaffi-abdullah-khan"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Kaffi Abdullah Khan",
          jobTitle: "Senior Associate",
          url: `${SITE_URL}/team/kaffi-abdullah-khan`,
          image: `${SITE_URL}${teamKaffi}`,
          email: "mailto:mekaffi13@gmail.com",
          telephone: "+8801788017130",
          worksFor: { "@type": "LegalService", name: "EQUITAS Law Firm", url: SITE_URL },
          alumniOf: "University of Rajshahi",
          memberOf: { "@type": "Organization", name: "Dhaka Bar Association" },
        }}
      />
      <ProfileHero member={member} tagline="Experienced in commercial litigation, contracts, and corporate legal practice." />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link href="/team" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-[#8b6824] hover:text-[#061a2f]">
            ← Back to Our Team
          </Link>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] border-4 border-[#d4af62]/60 shadow-2xl lg:mx-0">
                <TeamPhoto member={member} />
              </div>
              <div className="mt-8 space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Mail className="h-4 w-4 shrink-0 text-[#a87924]" />
                  <a href="mailto:mekaffi13@gmail.com" className="hover:text-[#061a2f]">mekaffi13@gmail.com</a>
                </p>
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Phone className="h-4 w-4 shrink-0 text-[#a87924]" />
                  <a href="tel:+8801788017130" className="hover:text-[#061a2f]">+880 1788-017130</a>
                </p>
              </div>
            </div>

            <div>
              <p className="leading-8 text-slate-600">
                Kaffi Abdullah Khan is an Advocate enrolled with the Bangladesh Bar Council and a member of the Dhaka Bar Association, with experience spanning both commercial litigation and corporate legal practice. His work covers drafting and vetting international and domestic commercial agreements, employment and termination matters, trademark registration and infringement issues, land document vetting, and court representation in civil and commercial matters.
              </p>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {kaffiExpertise.map((item) => (
                  <span key={item} className="rounded-full border border-[#d4af62]/40 bg-[#f7f2e8] px-4 py-2 text-sm font-semibold text-[#8b6824]">
                    {item}
                  </span>
                ))}
              </div>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Professional Credentials</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {kaffiCredentials.map((item) => (
                  <div key={item.label} className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a87924]">{item.label}</p>
                    <p className="mt-1 font-semibold text-[#061a2f]">{item.value}</p>
                  </div>
                ))}
              </div>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Experience</h2>
              <div className="space-y-4">
                {kaffiExperience.map((item) => (
                  <div key={item.role} className="rounded-[1.25rem] border-l-4 border-[#d4af62] bg-white p-5 shadow-sm">
                    <p className="font-semibold text-[#061a2f]">{item.role}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.period}</p>
                    <p className="mt-2 leading-6 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>

              <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-[#061a2f]">Education</h2>
              <div className="space-y-4">
                {kaffiEducation.map((item) => (
                  <div key={item.degree} className="flex flex-col gap-1 border-b border-slate-200 pb-4 last:border-none">
                    <p className="font-semibold text-[#061a2f]">{item.degree}</p>
                    <p className="text-sm text-slate-500">{item.institution} · {item.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Insights() {
  return (
    <>
      <PageSeo title="Legal Insights | EQUITAS Law Firm" description="Legal insights from EQUITAS on corporate contracts, property due diligence, and dispute preparation for clients in Bangladesh." path="/insights" />
      <PageHero label="Insights" title="Practical legal articles for informed decisions." text="Guidance from the EQUITAS team on corporate contracts, property transactions, and preparing for litigation." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {insights.map((post) => (
            <article key={post.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
              <BookOpen className="mb-5 h-9 w-9 text-[#a87924]" />
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#a87924]">{post.category} · {post.date}</p>
              <h2 className="mb-4 font-serif text-2xl font-bold text-[#061a2f]">{post.title}</h2>
              <p className="leading-7 text-slate-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function Contact() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    toast({
      title: "Message submitted",
      description: "Thank you for reaching out. For urgent matters, please call us directly.",
    });
    event.currentTarget.reset();
  }

  return (
    <>
      <PageSeo title="Contact EQUITAS | Book a Legal Consultation" description="Contact EQUITAS Law Firm in Bangladesh at info@equitasbd.com or send a consultation request through the contact form." path="/contact" />
      <PageHero label="Contact" title="Request a confidential consultation." text="Tell us about your matter and our team will respond with the next practical step." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={submitContact} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl lg:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" name="name" type="text" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Subject" name="subject" type="text" />
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-bold text-[#061a2f]">Message</span>
              <textarea name="message" required rows={7} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#c7a052] focus:ring-4 focus:ring-[#c7a052]/15" placeholder="Briefly describe your legal matter" />
            </label>
            <button type="submit" className="mt-6 rounded-full bg-[#061a2f] px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#12345a]">
              Send Message
            </button>
            {sent && <p className="mt-4 text-sm font-semibold text-[#8b6824]">Thank you for reaching out. Our team will review your message and respond shortly. For urgent matters, please call us directly.</p>}
          </form>

          <div className="grid gap-5">
            <InfoPanel icon={Mail} title="Email" text="info@equitasbd.com" />
            <InfoPanel icon={Phone} title="Phone" text="+880 1911-065363, +880 1737-056336" />
            <InfoPanel icon={MapPin} title="Chamber Address" text="Suite-4B, Silver Rain, 48 Bijoynagar (Behind Hotel-71), Dhaka-1000, Bangladesh" />
            <InfoPanel icon={Clock} title="Business Hours" text="Sunday–Thursday, 9:30 AM–9:00 PM" />
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-lg">
              <iframe
                title="EQUITAS chamber location map"
                src="https://www.google.com/maps?q=Silver+Rain%2C+48+Bijoynagar%2C+Dhaka+1000&output=embed"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type, required = false }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#061a2f]">{label}</span>
      <input name={name} type={type} required={required} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#c7a052] focus:ring-4 focus:ring-[#c7a052]/15" />
    </label>
  );
}

function InfoPanel({ icon: Icon, title, text }: { icon: typeof Mail; title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <Icon className="mb-4 h-7 w-7 text-[#a87924]" />
      <h3 className="font-serif text-xl font-bold text-[#061a2f]">{title}</h3>
      <p className="mt-2 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <BriefcaseBusiness className="mb-5 h-8 w-8 text-[#a87924]" />
      <h3 className="mb-3 font-serif text-3xl font-bold text-[#061a2f]">{title}</h3>
      <p className="leading-8 text-slate-600">{text}</p>
    </div>
  );
}

function PageHero({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <section className="relative overflow-hidden bg-[#061a2f] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(212,175,98,0.22),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-[#d4af62]">{label}</p>
        <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{text}</p>
      </div>
    </section>
  );
}

function ProfileHero({ member, tagline }: { member: (typeof teamMembers)[number]; tagline?: string }) {
  const primary = member.credential || member.role;
  const secondary = member.credential ? member.role : null;
  return (
    <section className="relative overflow-hidden bg-[#061a2f] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(212,175,98,0.22),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl">
        <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight md:text-6xl">{member.name}</h1>
        <p className="mt-5 max-w-3xl text-lg font-semibold text-[#d4af62]">{primary}</p>
        {secondary && <p className="mt-1 text-sm font-bold uppercase tracking-[0.28em] text-slate-300">{secondary}</p>}
        {tagline && <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{tagline}</p>}
      </div>
    </section>
  );
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-[#c7a052] p-4 text-[#061a2f] shadow-xl transition hover:-translate-y-1 hover:bg-[#f0cf82]"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

function Router() {
  const routes = useMemo(
    () => (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/practice-areas" component={PracticeAreas} />
        <Route path="/team" component={Team} />
        <Route path="/team/wasiur-rahman" component={WasiurRahmanProfile} />
        <Route path="/team/faisal-anabil" component={FaisalAnabilProfile} />
        <Route path="/team/kaffi-abdullah-khan" component={KaffiAbdullahKhanProfile} />
        <Route path="/insights" component={Insights} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    ),
    [],
  );

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-slate-900">
      <Header />
      <main>{routes}</main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
