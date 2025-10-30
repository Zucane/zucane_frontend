import React, { useEffect, useMemo, useState } from "react";
import TopNavBar from "../../TopNavBar";
import { FaSync, FaSearch, FaCopy, FaExternalLinkAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { getCompanies } from "../../../service/companyService";
import { getBusinessBalance } from "../../../service/balance";

// helpers
const shortKey = (k = "") => (k ? `${k.slice(0, 5)}…${k.slice(-5)}` : "");
const copy = (t) => navigator.clipboard?.writeText(t);

export default function TokensManage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [balances, setBalances] = useState({});
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [status, setStatus] = useState("activo");
  const [total, setTotal] = useState(0);
  // estado extra por-card
const [balLoading, setBalLoading] = useState({});
const [balError,   setBalError]   = useState({}); // { [pk]: 'mensaje' }

// pedir balance de UNA empresa
const fetchBalanceFor = async (publicKey) => {
  const pk = String(publicKey || '').trim();
  if (!pk) return 0;

  setBalLoading(s => ({ ...s, [pk]: true }));
  setBalError(s => ({ ...s, [pk]: '' }));

  try {
    const res = await getBusinessBalance(pk);        // <-- usa api (.9:8022)
    // suele venir string/decimal, lo normalizamos:
    const val = Number(res?.asset_balance);
    if (!Number.isFinite(val)) {
      setBalError(s => ({ ...s, [pk]: 'asset_balance inválido' }));
      return 0;
    }
    return val;
  } catch (e) {
    // deja huella en consola y UI
    console.error('Error balance', pk, e);
    setBalError(s => ({ ...s, [pk]: e?.response?.statusText || e?.message || 'Error' }));
    return 0;
  } finally {
    setBalLoading(s => ({ ...s, [pk]: false }));
  }
};

// refrescar todos
const refreshAll = async () => {
  if (!companies.length) return;
  const next = {};
  await Promise.all(
    companies.map(async (c) => {
      const pk = c.stellar_public_key;
      next[pk] = await fetchBalanceFor(pk);
    })
  );
  setBalances(next);
};

useEffect(() => {
  if (companies.length) refreshAll();
}, [companies]);


  // progress bar
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || 0;
      const dh = (document.documentElement?.scrollHeight || 0) - window.innerHeight;
      setScrollProgress(dh > 0 ? (st / dh) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // helper para querystring (si tu getCompanies admite ?page=...&size=...)
  const qs = (obj) =>
    Object.entries(obj)
      .filter(([, v]) => v !== undefined && v !== null && v !== "" && v !== "todos")
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");

      const loadCompanies = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await getCompanies({ page, size, status }); // <-- params reales
          const { empresas, total: tot } = data || {};
          setCompanies(empresas || []);
          setTotal(Number(tot || 0));
        } catch (e) {
          console.error(e);
          setError('No se pudieron cargar las empresas.');
          setCompanies([]);
          setTotal(0);
        } finally {
          setLoading(false);
        }
      };
      

  useEffect(() => {
    loadCompanies();
  }, [page, size, status]);

  // const fetchBalanceFor = async (publicKey) => {
  //   if (!publicKey) return "—";
  //   try {
  //     const res = await getBusinessBalance(publicKey);
  //     return typeof res?.asset_balance === "number" ? res.asset_balance : "0";
  //   } catch (e) {
  //     console.error("Balance error:", publicKey, e);
  //     return "—";
  //   }
  // };

  // const refreshAll = async () => {
  //   if (!companies.length) return;
  //   const next = {};
  //   await Promise.all(
  //     companies.map(async (c) => {
  //       const pk = c.stellar_public_key;
  //       next[pk] = await fetchBalanceFor(pk);
  //     })
  //   );
  //   setBalances(next);
  // };

  // useEffect(() => {
  //   if (companies.length) refreshAll();
  // }, [companies]);

  // filtro local
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) =>
      [c?.nombre, c?.rfc, c?.email].some((v) => String(v || "").toLowerCase().includes(q))
    );
  }, [companies, query]);

  return (
    <div className="landing-container tokens-bg">
      <div className="scroll-indicator" style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      <section className="section tokens-hero">
        <h1 className="tokens-title">Gestionar tokens</h1>
        <div className="tokens-underline" />
        <p className="tokens-sub">Empresas registradas y su balance de <strong>ZUCOIN</strong> en Stellar.</p>

        {/* Controles (búsqueda, estado, tamaño, refresh) */}
        <div className="tokens-controls">
          <div className="ctrl-group">
            <div className="ctrl">
              <label>Status</label>
              <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="todos">Todos</option>
              </select>
            </div>

            <div className="ctrl">
              <label>Tamaño</label>
              <select value={size} onChange={(e) => { setPage(1); setSize(Number(e.target.value)); }}>
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>

            <div className="search">
              <FaSearch />
              <input
                placeholder="Buscar por nombre, RFC o email…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <button className="refresh-btn" onClick={refreshAll} title="Refrescar balances">
              <FaSync /> Refrescar
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        {error && <div className="tokens-error">{error}</div>}

        <div className="tokens-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div className="tokens-card skeleton" key={`sk-${i}`}>
                  <div className="row"><div className="sk-chunk" style={{ width: "60%" }} /><div className="sk-badge" /></div>
                  <div className="row"><div className="sk-chunk" style={{ width: "40%" }} /></div>
                  <div className="row"><div className="sk-chunk" style={{ width: "80%" }} /></div>
                  <div className="row"><div className="sk-chunk" style={{ width: "50%" }} /></div>
                </div>
              ))
            : filtered.map((c) => {
                const pk = c.stellar_public_key;
                const bal = balances[pk];
                const statusOk = String(c.status || "").toLowerCase() === "activo";
                const expert = `https://stellar.expert/explorer/testnet/account/${pk}`;

                return (
                  <article className="tokens-card" key={c.empresa_id}>
                    <div className="row header">
                      <h3 className="company-name">{c.nombre}</h3>
                      <span className={`status-pill ${statusOk ? "ok" : "bad"}`}>
                        {statusOk ? <FaCheckCircle /> : <FaTimesCircle />}
                        {statusOk ? "Activo" : "Inactivo"}
                      </span>
                    </div>

                    <div className="row meta">
                      <div className="meta-item"><strong>RFC:</strong> {c.rfc}</div>
                      <div className="meta-item"><strong>Email:</strong> {c.email}</div>
                    </div>

                    <div className="row key">
                      <div className="pubkey">
                        <strong>Public Key:</strong>
                        <code title={pk}>{shortKey(pk)}</code>
                        <button className="icon-btn" onClick={() => copy(pk)} title="Copiar public key">
                          <FaCopy />
                        </button>
                        {pk && (
                          <a className="icon-btn" href={expert} target="_blank" rel="noreferrer" title="Ver en StellarExpert">
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="row balance">
                      <div className={`balance-box ${balError[pk] ? 'has-error' : ''}`}>
                        <span className="label">Balance ZUCOIN</span>
                        <span className="value">
                          {balLoading[pk] ? 'Cargando…' : (Number.isFinite(balances[pk]) ? balances[pk] : 0)}
                        </span>
                      </div>
                    </div>

                  </article>
                );
              })}
        </div>

        {!loading && filtered.length === 0 && (
          <div className="tokens-empty">No hay empresas que coincidan con tu búsqueda.</div>
        )}

        {/** Paginación */}
        {!loading && total > 0 && (
          <div className="tokens-pager">
            <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>← Anterior</button>
            <span>Página {page} de {Math.max(1, Math.ceil(total / size))}</span>
            <button disabled={page >= Math.ceil(total / size)} onClick={() => setPage((p) => p + 1)}>Siguiente →</button>
          </div>
        )}
      </section>
    </div>
  );
}