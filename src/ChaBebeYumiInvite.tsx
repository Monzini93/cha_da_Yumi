import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Baby, CalendarDays, Clock3, Gift, Heart, MapPin, Phone, Send, Sparkles, User } from "lucide-react";

const WHATSAPP_NUMBER = "5511930671383";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getCountdown() {
  const target = new Date("2026-09-05T15:00:00-03:00").getTime();
  const diff = target - Date.now();
  if (diff <= 0) return "O chá de bebê já começou 💖";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return `${days} dia(s), ${hours} hora(s) e ${minutes} minuto(s)`;
}

export default function ChaBebeYumiInvite() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bring, setBring] = useState("");
  const [countdown, setCountdown] = useState(getCountdown());

  const eventDate = "05/09/2026";
  const eventTime = "15h";
  const eventAddress = "Rua João Ruel, 128";
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Rua+Jo%C3%A3o+Ruel%2C+128";

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Olá! Quero confirmar presença no chá de bebê da Yumi.",
      `Nome: ${name || "—"}`,
      `Telefone: ${phone || "—"}`,
      `Vou levar: ${bring || "—"}`,
    ];
    return encodeURIComponent(lines.join("\n"));
  }, [name, phone, bring]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#fffafc_0%,_#fff3f7_40%,_#fff9fb_72%,_#fffdf8_100%)] text-slate-700">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Float shape="✦" className="left-[6%] top-[10%] text-pink-200" />
        <Float shape="✧" className="right-[8%] top-[12%] text-sky-200" />
        <Float shape="♡" className="left-[10%] bottom-[14%] text-rose-200" />
        <Float shape="✿" className="right-[14%] bottom-[18%] text-amber-100" />
        <Float shape="🎀" className="left-[18%] top-[22%] text-rose-200" />
        <Float shape="🧸" className="right-[18%] top-[34%] text-amber-100" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.75rem] border border-white/80 bg-white/88 p-8 shadow-[0_28px_100px_rgba(244,114,182,0.12)] backdrop-blur"
          >
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-rose-200/30 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-sky-200/25 blur-3xl" />
            <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-pink-100/70 blur-2xl" />

            <div className="relative flex items-center gap-2 text-rose-400">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]">Convite de chá de bebê</span>
            </div>

            <div className="relative mt-5 flex flex-wrap items-center gap-4">
              <div className="flex h-18 w-18 items-center justify-center rounded-full border border-rose-100 bg-gradient-to-b from-rose-50 to-white shadow-sm">
                <Baby className="h-9 w-9 text-rose-300" />
              </div>
              <div>
                <h1 className="text-4xl font-bold leading-tight text-slate-800 sm:text-5xl">
                  Chá de bebê da <span className="text-rose-400">Yumi</span>
                </h1>
              </div>
            </div>

            <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-2 text-sm text-rose-500 shadow-sm">
              <span>🐻</span>
              <span>🎀</span>
              <span>✨</span>
              <span>🧸</span>
              <span>✨</span>
            </div>

            <p className="relative mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A nossa pequena Yumi está chegando, e queremos celebrar esse momento tão fofo com você.
              Vai ser um dia cheio de carinho, alegria, laços, brilhinhos e aquela energia gostosa de bebê chegando.
            </p>

            <div className="relative mt-8 rounded-[2.25rem] border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-sky-50 p-5 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-3">
                <InfoCard icon={<CalendarDays className="h-5 w-5" />} title="Data" value={eventDate} />
                <InfoCard icon={<Clock3 className="h-5 w-5" />} title="Horário" value={eventTime} />
                <InfoCard icon={<MapPin className="h-5 w-5" />} title="Local" value={eventAddress} />
              </div>
            </div>

            <div className="relative mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2.25rem] border border-rose-100 bg-white/90 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-rose-400">
                  <Heart className="h-4 w-4 fill-current" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">Contagem regressiva</span>
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-800">{countdown}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Estamos contando os dias para receber você nesse momento tão especial.
                </p>
              </div>

              <div className="rounded-[2.25rem] border border-rose-100 bg-gradient-to-b from-pink-50 via-white to-sky-50 p-6 shadow-sm">
                <div className="flex items-center justify-center">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-sm ring-8 ring-rose-50">
                    <div className="absolute -left-2 top-9 text-2xl">🐻</div>
                    <div className="absolute -right-3 top-11 text-2xl">🧸</div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">🎀</div>
                    <div className="absolute bottom-2 left-4 text-lg text-amber-300">✦</div>
                    <div className="absolute bottom-4 right-5 text-lg text-sky-300">✧</div>
                    <div className="absolute left-8 top-4 text-lg text-rose-200">✿</div>
                    <Baby className="h-14 w-14 text-rose-300" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 rounded-[2.25rem] border border-rose-100 bg-rose-50/70 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <Gift className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em]">Você está convidado(a)</span>
              </div>
              <p className="text-base leading-8 text-slate-700">
                Esperamos você para compartilhar carinho, risadas e muitos momentos lindos nesse dia especial.
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Use o botão abaixo para abrir o local no Google Maps.
              </p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-3xl border border-pink-200 bg-white px-4 py-3 text-sm font-semibold text-rose-500 shadow-sm transition hover:bg-rose-50"
              >
                <MapPin className="h-4 w-4" />
                Abrir no Google Maps
              </a>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2.75rem] border border-rose-100 bg-white/92 p-8 shadow-[0_28px_100px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center gap-3 text-rose-400">
              <Gift className="h-5 w-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">Confirmação de presença</span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-800">Preencha seus dados</h2>
            <p className="mt-2 text-slate-600">A mensagem vai abrir no WhatsApp pronta para enviar.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Field
                label="Nome"
                icon={<User className="h-4 w-4" />}
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Field
                label="Telefone"
                icon={<Phone className="h-4 w-4" />}
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Leve a sua bebida e um presentinho para a Yumi 🧡</label>
                <textarea
                  rows={4}
                  value={bring}
                  onChange={(e) => setBring(e.target.value)}
                  placeholder="Ex.: docinhos, refrigerante, fraldas, prato salgado..."
                  className="w-full rounded-3xl border border-rose-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-200 focus:ring-4 focus:ring-rose-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-rose-400 via-pink-400 to-sky-300 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-rose-200 transition hover:brightness-105 active:scale-[0.99]"
              >
                <Send className="h-4 w-4" />
                Confirmar no WhatsApp
              </button>
            </form>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

function Float({ shape, className }: { shape: string; className: string }) {
  return (
    <motion.div
      aria-hidden
      initial={{ y: 0, scale: 1, opacity: 0.75 }}
      animate={{ y: [-8, 8, -8], scale: [1, 1.03, 1], opacity: [0.55, 0.85, 0.55] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute text-2xl ${className}`}
    >
      {shape}
    </motion.div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-4 shadow-sm">
      <div className="flex items-center gap-3 text-rose-400">
        {icon}
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{title}</span>
      </div>
      <p className="mt-3 text-sm font-medium leading-6 text-slate-800">{value}</p>
    </div>
  );
}

function Field({
  label,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        <input
          {...props}
          className="w-full rounded-3xl border border-rose-100 bg-white/95 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-rose-200 focus:ring-4 focus:ring-rose-100"
        />
      </div>
    </div>
  );
}
