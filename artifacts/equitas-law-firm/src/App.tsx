import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import NotFound from "@/pages/not-found";
import logo from "@assets/WhatsApp_Image_2026-04-06_at_11.59.45_1776372697723.jpeg";
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
    title: "Corporate Law",
    description:
      "Entity formation, governance, commercial contracts, regulatory advice, and transaction support for growing companies.",
    icon: Building2,
  },
  {
    title: "Civil Litigation",
    description:
      "Strategic representation in civil disputes, recovery claims, injunctions, appeals, and negotiated settlements.",
    icon: Gavel,
  },
  {
    title: "Criminal Defense",
    description:
      "Careful defense strategy, bail matters, trial preparation, and rights-focused representation in criminal proceedings.",
    icon: ShieldCheck,
  },
  {
    title: "Family Law",
    description:
      "Confidential counsel for marriage, divorce, guardianship, inheritance, custody, and sensitive family disputes.",
    icon: Users,
  },
  {
    title: "Property Law",
    description:
      "Due diligence, land documentation, registration, lease matters, real estate disputes, and property transfer guidance.",
    icon: Landmark,
  },
  {
    title: "Immigration Law",
    description:
      "Visa advisory, documentation support, compliance guidance, appeals, and cross-border personal legal assistance.",
    icon: FileText,
  },
];

const values = [
  "Integrity in every matter",
  "Professional discipline",
  "Client-focused strategy",
  "Clear and timely communication",
];

const teamMembers = [
  {
    name: "Advocate Rahman Chowdhury",
    role: "Managing Partner",
    bio: "Advises businesses, founders, and private clients on corporate, property, and dispute resolution matters.",
    initials: "RC",
  },
  {
    name: "Barrister Nadia Islam",
    role: "Senior Associate",
    bio: "Represents clients in civil litigation, family law proceedings, and complex negotiated settlements.",
    initials: "NI",
  },
  {
    name: "Advocate Farhan Ahmed",
    role: "Associate",
    bio: "Supports criminal defense, immigration documentation, and commercial advisory work with careful case preparation.",
    initials: "FA",
  },
  {
    name: "Barrister Samira Khan",
    role: "Consultant",
    bio: "Provides specialist counsel on regulatory compliance, contracts, and cross-border advisory assignments.",
    initials: "SK",
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

function PageSeo({
  title,
  description,
}: {
  title: string;
  description: string;
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
  }, [description, title]);

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
              <p className="text-sm uppercase tracking-[0.3em] text-[#d4af62]">Justice. Integrity. Excellence.</p>
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
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#d4af62]" /> +880 2 0000 0000
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-1 h-4 w-4 text-[#d4af62]" /> Gulshan Avenue, Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} EQUITAS Law Firm. All rights reserved.
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
      <PageSeo title="EQUITAS Law Firm Bangladesh | Justice. Integrity. Excellence." description="EQUITAS is a professional Bangladesh law firm offering corporate, litigation, criminal defense, family, property, and immigration legal services." />
      <section className="relative overflow-hidden bg-[#061a2f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,175,98,0.24),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="reveal">
            <p className="mb-5 inline-flex rounded-full border border-[#d4af62]/30 bg-white/5 px-4 py-2 text-sm font-semibold text-[#e2c37d]">Bangladesh legal counsel for decisive matters</p>
            <h1 className="font-serif text-5xl font-bold leading-tight md:text-7xl">Justice. Integrity. Excellence.</h1>
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

      <PracticePreview />
      <WhyChooseUs />
      <ContactPreview />
      <CtaBand />
    </>
  );
}

function PracticePreview() {
  return (
    <section className="bg-[#f7f2e8] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Practice Areas</SectionLabel>
            <h2 className="font-serif text-4xl font-bold text-[#061a2f] md:text-5xl">Comprehensive legal services.</h2>
          </div>
          <Link href="/practice-areas" className="inline-flex items-center gap-2 font-bold text-[#8b6824] hover:text-[#061a2f]">
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.slice(0, 6).map((area) => {
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
          <p className="mb-3 flex items-center gap-2 font-semibold"><Phone className="h-5 w-5 text-[#a87924]" /> +880 2 0000 0000</p>
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
      <PageSeo title="About EQUITAS | Bangladesh Law Firm" description="Learn about EQUITAS, our mission, vision, values, and client-focused approach to legal services in Bangladesh." />
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
      <TeamGrid compact />
      <CtaBand />
    </>
  );
}

function PracticeAreas() {
  return (
    <>
      <PageSeo title="Practice Areas | EQUITAS Law Firm" description="Explore EQUITAS legal services including corporate law, civil litigation, criminal defense, family law, property law, and immigration law." />
      <PageHero label="Practice Areas" title="Focused legal support across essential areas of law." text="Each matter is approached with careful preparation, clear advice, and a strategy aligned with the client’s objective." />
      <PracticePreview />
      <CtaBand />
    </>
  );
}

function Team() {
  return (
    <>
      <PageSeo title="Our Team | EQUITAS Law Firm" description="Meet the EQUITAS legal team serving clients across Bangladesh with professionalism and disciplined advocacy." />
      <PageHero label="Our Team" title="Experienced counsel. Careful preparation. Client-focused service." text="Our team profiles are placeholders and can be replaced with final lawyer biographies and photographs." />
      <TeamGrid />
      <CtaBand />
    </>
  );
}

function TeamGrid({ compact = false }: { compact?: boolean }) {
  const members = compact ? teamMembers.slice(0, 3) : teamMembers;
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <SectionLabel>Legal Team</SectionLabel>
          <h2 className="font-serif text-4xl font-bold text-[#061a2f] md:text-5xl">Meet our lawyers.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <article key={member.name} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex h-52 items-center justify-center bg-[linear-gradient(135deg,#061a2f,#12345a)]">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#d4af62]/60 bg-white/10 font-serif text-3xl font-bold text-[#d4af62]">
                  {member.initials}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#061a2f]">{member.name}</h3>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-[#a87924]">{member.role}</p>
                <p className="mt-4 leading-7 text-slate-600">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <>
      <PageSeo title="Legal Insights | EQUITAS Law Firm" description="Read sample legal insights from EQUITAS on corporate contracts, property due diligence, and dispute preparation." />
      <PageHero label="Insights" title="Practical legal articles for informed decisions." text="Sample content for the firm’s future legal updates, client education, and professional commentary." />
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
      title: "Message received",
      description: "Thank you. This demo form has simulated a successful submission.",
    });
    event.currentTarget.reset();
  }

  return (
    <>
      <PageSeo title="Contact EQUITAS | Book a Legal Consultation" description="Contact EQUITAS Law Firm in Bangladesh at info@equitasbd.com or send a consultation request through the contact form." />
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
            {sent && <p className="mt-4 text-sm font-semibold text-[#8b6824]">Demo submission successful. Connect a live form endpoint before production intake.</p>}
          </form>

          <div className="grid gap-5">
            <InfoPanel icon={Mail} title="Email" text="info@equitasbd.com" />
            <InfoPanel icon={MapPin} title="Office Address" text="Level 8, Gulshan Avenue, Dhaka 1212, Bangladesh" />
            <InfoPanel icon={Clock} title="Business Hours" text="Sunday–Thursday, 9:30 AM–6:00 PM" />
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-lg">
              <iframe
                title="EQUITAS office map placeholder"
                src="https://www.google.com/maps?q=Gulshan%20Dhaka%20Bangladesh&output=embed"
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
      <WouterRouter hook={useHashLocation}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
