import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import {
  Search,
  Loader2,
  AlertCircle,
  LogOut,
  Inbox,
  MousePointerClick,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import { getAdminEnquiries } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";

const logo = "/favicon.png";

const title = "Enquiry Dashboard | BPMR SAP FICO Admin";
const description = "Search and review contact enquiries submitted on the BPMR SAP FICO website.";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Enquiry Dashboard | BPMR SAP FICO" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchEnquiries = useServerFn(getAdminEnquiries);
  const [term, setTerm] = useState("");

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: () => fetchEnquiries(),
  });

  const filtered = useMemo(() => {
    if (!data || !data.ok) return [];
    const q = term.trim().toLowerCase();
    if (!q) return data.inquiries;
    return data.inquiries.filter((i) =>
      [i.name, i.email, i.phone, i.service, i.company, i.message, i.status]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q)),
    );
  }, [data, term]);

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 min-w-0">
            <img
              src={logo}
              alt="BPMR SAP FICO logo"
              className="w-10 h-10 object-contain bg-white rounded-lg p-1"
            />
            <div className="leading-tight min-w-0">
              <div className="font-bold text-sm sm:text-base truncate">
                BPMR <span className="text-gold-400">SAP FICO</span>
              </div>
              <div className="text-navy-300 text-[10px] sm:text-xs uppercase tracking-widest">
                Enquiry Dashboard
              </div>
            </div>
          </a>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading enquiries…
          </div>
        ) : error ? (
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            {error instanceof Error ? error.message : "Could not load enquiries."}
          </div>
        ) : !data?.ok ? (
          <div className="max-w-lg bg-white border border-slate-200 rounded-2xl p-6">
            <h1 className="font-bold text-navy-900">Admin access required</h1>
            <p className="mt-2 text-sm text-slate-500">
              Your account is signed in but has not been granted admin access, so enquiries stay
              hidden. Ask for the admin role to be added to this account.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total enquiries", value: data.inquiries.length, icon: Inbox },
                {
                  label: "Form impressions",
                  value: data.stats.impressions,
                  icon: MousePointerClick,
                },
                {
                  label: "Conversion rate",
                  value: `${data.stats.conversionRate}%`,
                  icon: TrendingUp,
                },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      {label}
                    </span>
                    <Icon className="w-4 h-4 text-gold-500" />
                  </div>
                  <div className="mt-2 text-2xl font-bold text-navy-900">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Search by name, email, phone, interest or message…"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none text-sm text-slate-900 bg-white"
                />
              </div>
              <button
                onClick={() => void refetch()}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Showing {filtered.length} of {data.inquiries.length} enquiries
            </p>

            {/* Mobile cards */}
            <div className="grid gap-3 md:hidden">
              {filtered.map((i) => (
                <div key={i.id} className="bg-white rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-bold text-navy-900">{i.name}</div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-gold-50 text-gold-700 border border-gold-200">
                      {i.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-slate-600 break-words">{i.email}</div>
                  <div className="text-sm text-slate-600">{i.phone ?? "—"}</div>
                  <div className="mt-2 text-xs text-slate-500">
                    {i.service ?? "—"} · {i.company ?? "—"}
                  </div>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">{i.message}</p>
                  <div className="mt-2 text-xs text-slate-400">
                    {new Date(i.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      {["Name", "Email", "Phone", "Interest", "Mode", "Message", "Received"].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left font-bold uppercase text-xs tracking-wider px-4 py-3"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((i) => (
                      <tr key={i.id} className="hover:bg-slate-50/70 align-top">
                        <td className="px-4 py-3 font-semibold text-navy-900 whitespace-nowrap">
                          {i.name}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{i.email}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                          {i.phone ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{i.service ?? "—"}</td>
                        <td className="px-4 py-3 text-slate-600">{i.company ?? "—"}</td>
                        <td className="px-4 py-3 text-slate-600 max-w-sm">{i.message}</td>
                        <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                          {new Date(i.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filtered.length === 0 && (
              <div className="mt-6 text-center text-sm text-slate-500 py-10">
                No enquiries match your search.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
