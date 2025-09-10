"use client";

import React, { useEffect, useState } from "react";

// TODO: reemplazá por tus valores reales
const WHATSAPP_LINK = "https://wa.me/XXXXXXXXXXX";
const FORMS_ENDPOINT = "/api/forms"; // o el endpoint real donde recibís el form

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function LandingEnzoReboredo() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  // Smooth scroll a anclas con offset del header
  useEffect(() => {
    const header = document.querySelector("header");
    const getOffsetTop = (el) => {
      const headerH = (header && /** @type {HTMLElement} */ (header).offsetHeight) || 0;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rect.top + scrollTop - headerH - 8; // 8px de margen
    };

    /** @param {Event} e */
    const onClick = (e) => {
      const a = e.currentTarget;
      if (a instanceof HTMLAnchorElement && a.hash && a.hash.startsWith("#")) {
        const target = document.querySelector(a.hash);
        if (target instanceof HTMLElement) {
          e.preventDefault();
          window.scrollTo({ top: getOffsetTop(target), behavior: "smooth" });
          if (a.hash === "#contacto") {
            const first = document.querySelector(
              "#contacto form input, #contacto form textarea"
            );
            if (first instanceof HTMLElement) first.focus();
          }
        }
      }
    };

    const anchors = Array.from(
      document.querySelectorAll('a[href^="#"]')
    );
    anchors.forEach((a) => a.addEventListener("click", onClick));
    return () => anchors.forEach((a) => a.removeEventListener("click", onClick));
  }, []);

  // Smoke tests simples (no rompen producción)
  useEffect(() => {
    try {
      console.assert(
        !!document.querySelector('a[href="#contacto"]'),
        "[TEST] Falta al menos un CTA a #contacto"
      );
      ["#servicios", "#como-funciona", "#testimonios", "#faqs", "#contacto"].forEach(
        (id) => {
          console.assert(
            !!document.querySelector(id),
            `[TEST] Falta la sección ${id}`
          );
        }
      );
      const h1 = document.querySelector("h1");
      console.assert(
        !!h1 && (h1.textContent ?? "").length > 0,
        "[TEST] <h1> debería tener contenido"
      );
    } catch {}
  }, []);

  /** @param {React.FormEvent<HTMLFormElement>} e */
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "landing-enzo",
          timestamp: new Date().toISOString(),
          ...data,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo enviar. Probá de nuevo o escribime por WhatsApp."
      );
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header / Nav */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">ER</span>
            <span className="font-semibold">Enzo Reboredo — Automatizaciones con IA</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#servicios" className="hover:text-white">Servicios</a>
            <a href="#como-funciona" className="hover:text-white">Cómo funciona</a>
            <a href="#testimonios" className="hover:text-white">Testimonios</a>
            <a href="#faqs" className="hover:text-white">Preguntas</a>
            <a href="#contacto" className="hover:text-white">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Liberá tiempo y delegá lo repetitivo con <span className="text-emerald-400">Agentes IA</span>.
            </h1>
            <p className="mt-5 text-neutral-300 text-lg">
              Descubrí en minutos cómo un agente puede ahorrarte horas y simplificar tus tareas diarias. Personas y empresas que adoptan IA y automatización logran hasta un <strong>60%</strong> de crecimiento en productividad. No te quedes atrás.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className="px-5 py-3 rounded-2xl bg-emerald-500 text-neutral-950 font-medium hover:bg-emerald-400 transition">Reservá ahora</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl border border-neutral-700 hover:border-neutral-500">Hablemos por WhatsApp</a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-2xl">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check /> Agenda inteligente: coordina, reasigna y confirma por vos.</li>
                <li className="flex items-center gap-2"><Check /> Atención al cliente en WhatsApp/IG: respuestas rápidas y con contexto.</li>
                <li className="flex items-center gap-2"><Check /> Prospección automática: encuentra, califica y escribe a potenciales clientes.</li>
                <li className="flex items-center gap-2"><Check /> Integración con Google Calendar, Gmail, Shopify y más.</li>
                <li className="flex items-center gap-2"><Check /> Tu marca y tu tono: mensajes personalizados con tu estilo.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de confianza */}
      <section className="mx-auto max-w-6xl px-4 pt-4 pb-2">
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400 px-2 py-1 text-xs">&lt; 60 min</span>
            <div className="text-neutral-300">Primera respuesta garantizada</div>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400 px-2 py-1 text-xs">Sin permanencia</span>
            <div className="text-neutral-300">Seguimos sólo si ves valor</div>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400 px-2 py-1 text-xs">Global</span>
            <div className="text-neutral-300">Trabajamos remoto para cualquier país</div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Servicios</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
            <h3 className="text-lg font-semibold">Automatización de procesos</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li className="flex items-center gap-2"><Check /> Flujos con n8n/Make/Zapier + APIs</li>
              <li className="flex items-center gap-2"><Check /> Extracción y limpieza de datos</li>
              <li className="flex items-center gap-2"><Check /> Notificaciones y reportes automáticos</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
            <h3 className="text-lg font-semibold">Chatbots & Agentes</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li className="flex items-center gap-2"><Check /> Agenda inteligente (Google Calendar)</li>
              <li className="flex items-center gap-2"><Check /> Soporte en WhatsApp/IG con memoria</li>
              <li className="flex items-center gap-2"><Check /> Prospección y calificación automática</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
            <h3 className="text-lg font-semibold">Estrategia y Funnels</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li className="flex items-center gap-2"><Check /> Mapas de conversión y landing pages</li>
              <li className="flex items-center gap-2"><Check /> E‑mail/SMS automations</li>
              <li className="flex items-center gap-2"><Check /> Medición y dashboards</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <a href="#contacto" className="px-5 py-3 rounded-2xl bg-emerald-500 text-neutral-950 font-medium hover:bg-emerald-400">Hablemos ahora</a>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Cómo funciona</h2>
        <div className="mt-6 grid md:grid-cols-4 gap-6 text-sm">
          {[
            { step: "01", t: "Diagnóstico", d: "15–30 min para entender tu proceso y detectar quick wins." },
            { step: "02", t: "Prototipo", d: "En pocos días probás el agente en tu propio flujo." },
            { step: "03", t: "Integración", d: "Conecto tus apps (Calendar, Gmail, Shopify, etc.)." },
            { step: "04", t: "Escala", d: "Monitoreo, mejoras y nuevas reglas según métricas." },
          ].map((s) => (
            <div key={s.step} className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
              <div className="text-neutral-400">Paso {s.step}</div>
              <div className="mt-1 font-semibold">{s.t}</div>
              <p className="mt-2 text-neutral-300">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Lo que dicen clientes</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { q: "Bajamos 80% el tiempo de respuesta y subieron las ventas.", a: "Sergio — E‑commerce" },
            { q: "La agenda dejó de chocar y liberé varias horas a la semana.", a: "Mariana — Servicios" },
            { q: "8 reuniones por mes con prospección automatizada.", a: "Valeria — Consultoría" },
          ].map((t) => (
            <div key={t.a} className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
              <p className="text-neutral-200">“{t.q}”</p>
              <div className="mt-3 text-sm text-neutral-400">— {t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Preguntas frecuentes</h2>
        <div className="mt-6 space-y-3">
          <details className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="font-medium">¿Cuánto tiempo tarda en implementarse la IA?</span>
              <span className="text-neutral-400">+</span>
            </summary>
            <p className="mt-3 text-neutral-300 text-sm">
              En días ya podés tener un prototipo funcional. Un agente administrativo o de soporte se monta en menos de una semana. Proyectos más complejos pueden llevar algunas semanas, pero siempre arrancamos con un piloto rápido.
            </p>
          </details>
          <details className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="font-medium">¿Hay cláusulas de permanencia?</span>
              <span className="text-neutral-400">+</span>
            </summary>
            <p className="mt-3 text-neutral-300 text-sm">
              No. Trabajo por valor: si no ves impacto, paramos. Prefiero relaciones de largo plazo por resultados, no por contrato.
            </p>
          </details>
          <details className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="font-medium">¿Desde dónde trabajás?</span>
              <span className="text-neutral-400">+</span>
            </summary>
            <p className="mt-3 text-neutral-300 text-sm">
              Remoto, con clientes en varios países. Coordinamos por WhatsApp/Meet y me integro a tus herramientas.
            </p>
          </details>
          <details className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="font-medium">¿Por qué contratarme?</span>
              <span className="text-neutral-400">+</span>
            </summary>
            <p className="mt-3 text-neutral-300 text-sm">
              Porque combino experiencia técnica en desarrollo y automatización con cercanía humana. No vendo plantillas genéricas: diseño agentes a medida de tu negocio, con soporte directo y flexibilidad. Mi objetivo es que veas resultados rápidos y claros, sin complicaciones.
            </p>
          </details>
          <details className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="font-medium">¿Cómo empezamos?</span>
              <span className="text-neutral-400">+</span>
            </summary>
            <p className="mt-3 text-neutral-300 text-sm">
              Primero evaluamos si tu negocio encaja con el tipo de proyectos que trabajo. Completás el formulario al final de esta página y en menos de 60 minutos me pongo en contacto. Si vemos potencial, agendamos una reunión más larga para profundizar y diseñar un plan de acción concreto.
            </p>
          </details>
        </div>
      </section>

      {/* Contacto / Form */}
      <section id="contacto" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">¿Listo para ganar horas y clientes?</h2>
          <p className="mt-2 text-neutral-300">Dejame tu contacto y te respondo en menos de 60 minutos.</p>
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
              <input
                name="name"
                required
                placeholder="Nombre"
                className="rounded-2xl bg-neutral-950 border border-neutral-800 px-3 py-2 focus:outline-none focus:border-emerald-600"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="Email"
                className="rounded-2xl bg-neutral-950 border border-neutral-800 px-3 py-2 focus:outline-none focus:border-emerald-600"
              />
              <input
                name="phone"
                required
                placeholder="Teléfono de contacto"
                className="rounded-2xl bg-neutral-950 border border-neutral-800 px-3 py-2 focus:outline-none focus:border-emerald-600 md:col-span-2"
              />
              <input
                name="company"
                placeholder="Nombre de la empresa (opcional)"
                className="rounded-2xl bg-neutral-950 border border-neutral-800 px-3 py-2 focus:outline-none focus:border-emerald-600 md:col-span-2"
              />
              <input
                name="role"
                placeholder="Rol en la empresa"
                className="rounded-2xl bg-neutral-950 border border-neutral-800 px-3 py-2 focus:outline-none focus:border-emerald-600 md:col-span-2"
              />
              <textarea
                name="help"
                placeholder="¿Cómo te puedo ayudar?"
                rows={4}
                className="rounded-2xl bg-neutral-950 border border-neutral-800 px-3 py-2 focus:outline-none focus:border-emerald-600 md:col-span-2"
              />
              <button
                disabled={status === "loading"}
                className="md:col-span-2 rounded-2xl bg-emerald-500 text-neutral-950 font-medium px-5 py-2 hover:bg-emerald-400 disabled:opacity-60"
              >
                {status === "loading" ? "Enviando…" : "Contactame ya"}
              </button>
            </form>
            {status === "success" && (
              <p className="text-emerald-400 text-sm pt-2">¡Listo! Te escribo a la brevedad.</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm pt-2">{error}</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-400 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Enzo Reboredo — Automatizaciones con IA</div>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#faqs">FAQs</a>
            <a className="hover:text-white" href="#servicios">Servicios</a>
            <a className="hover:text-white" href="#contacto">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

