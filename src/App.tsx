import { useEffect, useRef, useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  skills: string;
  deadline: string;
  created_at?: string;
  createdAt?: string;
};

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ title: "", description: "", skills: "", deadline: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);

  const loadProjects = async () => {
    try {
      setFetching(true);
      const res = await fetch(`${API}/api/projects`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setProjects(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load projects");
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => { loadProjects(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { title, description, skills, deadline } = form;
      if (!title || !description || !skills || !deadline) return setError("Please fill all fields.");
      const res = await fetch(`${API}/api/projects`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      const created: Project = await res.json();
      setProjects((p) => [created, ...p]);
      setForm({ title: "", description: "", skills: "", deadline: "" });
      projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e: any) {
      setError(e?.message ?? "Submission failed");
    } finally { setLoading(false); }
  };

  const scrollToProjects = () => projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Top nav with green accent */}
      <header className="sticky top-0 z-30 backdrop-blur border-b border-neutral-900/80 bg-gradient-to-r from-emerald-900/40 via-emerald-900/20 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-700 font-bold">W</span>
            <span className="font-semibold">Watson Portal</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-300">
            <button onClick={scrollToProjects} className="hover:text-white">Projects</button>
            <a href="https://www.binghamton.edu/watson/" target="_blank" className="hover:text-white">Watson College</a>
          </nav>
        </div>
      </header>

      {/* Hero — BU green */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-emerald-900/35 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          {/* Bigger banner pill */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-600/20 px-4 py-2 text-emerald-300 text-sm sm:text-base font-semibold border border-emerald-600/40">
            🎓 Demo Live Website for Interview | Created by Sundeep Muthukrishnan Kumaraswamy
          </div>

          {/* Bigger hero headings */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Watson Tech Talent
          </h1>
          <p className="mt-2 text-2xl md:text-3xl text-emerald-200">Micro-Internship Portal</p>

          <p className="mt-4 max-w-2xl text-neutral-300">
            Connecting university sponsors with talented students for meaningful, short-term projects that build real-world experience.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={scrollToProjects}
              className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 font-semibold"
            >
              View Projects →
            </button>
            <a
              href="http://localhost:4000/api/projects"
              target="_blank"
              className="rounded-lg border border-neutral-700 px-4 py-2 font-semibold text-neutral-200 hover:bg-neutral-900"
            >
              Open API
            </a>
          </div>
        </div>

        {/* Feature cards with green borders */}
        <div className="mx-auto max-w-6xl px-4 pb-8 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Real Projects", desc: "Faculty & staff post scoped, skill-based projects." },
            { title: "Build Network", desc: "Students collaborate with sponsors across BU." },
            { title: "Gain Experience", desc: "Short cycles, tangible deliverables, strong resumes." },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-emerald-900/60 bg-neutral-900/60 p-4">
              <div className="text-lg font-semibold">{f.title}</div>
              <p className="text-neutral-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section ref={projectsRef} className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form card */}
          <div className="rounded-2xl border border-emerald-900/60 bg-neutral-900 p-5">
            <h2 className="text-xl font-semibold">Post a New Project</h2>
            <p className="text-neutral-400 text-sm mb-4">Stored in PostgreSQL (Supabase) via Express API.</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input className="w-full rounded-md bg-neutral-800 p-2 outline-none" placeholder="Project title"
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <textarea className="w-full rounded-md bg-neutral-800 p-2 outline-none" placeholder="Description" rows={4}
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              <input className="w-full rounded-md bg-neutral-800 p-2 outline-none" placeholder="Required skills (comma-separated)"
                value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} required />
              <input className="w-full rounded-md bg-neutral-800 p-2 outline-none" type="date"
                value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} required />

              <div className="flex items-center gap-3">
                <button type="submit" disabled={loading}
                        className="rounded-md bg-emerald-600 px-4 py-2 font-semibold hover:bg-emerald-500 disabled:opacity-60">
                  {loading ? "Posting…" : "Post Project"}
                </button>
                <button type="button" onClick={loadProjects}
                        className="rounded-md border border-neutral-700 px-4 py-2 font-semibold hover:bg-neutral-900">
                  Refresh
                </button>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </form>
          </div>

          {/* List card */}
          <div className="rounded-2xl border border-emerald-900/60 bg-neutral-900 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Project Listings</h2>
              <span className="text-xs text-neutral-400">API: <code className="text-neutral-300">/api/projects</code></span>
            </div>

            {fetching ? (
              <p className="text-neutral-400 mt-3">Loading projects…</p>
            ) : projects.length === 0 ? (
              <p className="text-neutral-400 mt-3">No projects yet. Add one on the left.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {projects.map((p) => (
                  <li key={p.id} className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-lg">{p.title}</h3>
                      <span className="text-xs text-neutral-400">Deadline: {p.deadline?.toString().slice(0,10)}</span>
                    </div>
                    <p className="text-neutral-300 mt-1">{p.description}</p>
                    <p className="text-neutral-400 text-sm mt-1">Skills: {p.skills}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-900 py-6 text-center text-sm text-neutral-400">
        Built with React (Vite), Express, and PostgreSQL (Supabase). © {new Date().getFullYear()} Watson College.
      </footer>
    </div>
  );
}