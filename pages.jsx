// pages.jsx — all page components for JK Collective

const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP } = React;

// ─── Home ──────────────────────────────────────────────────────────
function HomePage() {
  return (
    <main className="jk-home">
      <section className="jk-home-hero container">
        <div className="jk-home-figure">
          <Img src="assets/img/just-kidding-hero.webp" alt="Just Kidding — inaugural exhibition" />
        </div>

        <div className="jk-home-text">
          <div className="jk-home-eyebrow mono">Inaugural Exhibition</div>

          <h1 className="jk-home-title">
            Just<br/><span className="italic">Kidding.</span>
          </h1>

          <div className="jk-home-dates">
            <div className="rule" aria-hidden="true"></div>
            <div className="mono">Opening · May 23, 2026</div>
            <div className="mono">On view · May 23 — Jun 19</div>
            <div className="mono">Southampton, NY</div>
          </div>

          <p className="jk-home-body">
            JK Art &amp; Design Projects is pleased to announce the opening of its inaugural exhibition entitled <em>Just Kidding</em>, on view from May 23rd to June 19th in Southampton, NY.
          </p>
          <p className="jk-home-body">
            The exhibition will reflect the gallery&rsquo;s mission to spotlight distinctive voices in contemporary design who push the limits of creative expression through innovative perspectives and material exploration.
          </p>
          <p className="jk-home-body">
            As a nod to the playfulness and sense of wonder inherent in design, the exhibition&rsquo;s title draws on the verb &ldquo;to kid&rdquo; — the works presented demonstrate how design continues to surprise and delight, inviting viewers to reengage with a childlike sense of novelty and imagination.
          </p>

          <div className="jk-home-actions">
            <button className="btn" onClick={()=>window.jkNavigate('visit')}>
              Plan your visit <span className="arr">→</span>
            </button>
            <button className="btn-ghost mono" onClick={()=>window.jkNavigate('exhibitions')}>
              All exhibitions
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ─── Artists index ─────────────────────────────────────────────────
function ArtistsPage() {
  return (
    <main>
      <section className="container" style={{padding:'80px var(--gutter) 24px'}}>
        <div className="meta-label mono" style={{marginBottom: 24}}>Index — {String(window.JK_ARTISTS.filter(a=>!a.hidden).length).padStart(2,'0')} artists</div>
        <h1 className="display d-1" style={{marginBottom: 16}}>
          Artists &<br/><span style={{fontStyle:'italic'}}>Designers.</span>
        </h1>
        <p className="lead" style={{marginTop: 24, marginBottom: 20}}>
          A roster assembled across continents and centuries — united by patience, material intimacy, and a refusal of the fashionable.
        </p>
      </section>
      <section className="artist-index">
        {window.JK_ARTISTS.filter(a=>!a.hidden).map((a, i) => (
          <div key={a.id} className="artist-row" onClick={()=>window.jkNavigate(`artist/${a.id}`)}>
            <div className="num">{String(i+1).padStart(2,'0')}</div>
            <div className="artist-thumb">
              {a.portrait
                ? <img src={(window.JK_IMG_MAP && window.JK_IMG_MAP[a.portrait]) || a.portrait} alt={a.name} loading="lazy" />
                : <div className="artist-thumb-fallback">{a.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>}
            </div>
            <div className="name serif">{a.name}</div>
            <div className="meta">{a.based}</div>
            <div className="meta">{a.medium}</div>
            <div className="arrow">↗</div>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
}

// ─── Artist detail ─────────────────────────────────────────────────
function ArtistDetailPage({ artistId, onOpenWork }) {
  const a = window.JK_ARTISTS.find(x => x.id === artistId);
  if (!a) return <main><div className="container" style={{padding:60}}>Artist not found. <button className="btn-ghost" onClick={()=>window.jkNavigate('artists')}>Back</button></div></main>;
  const works = window.JK_WORKS.filter(w => w.artist === artistId);
  return (
    <main>
      <div className="artist-hero">
        <div className="text">
          <div>
            <button className="mono btn-ghost" onClick={()=>window.jkNavigate('artists')} style={{marginBottom: 40}}>← All artists</button>
            <div className="meta-label mono" style={{marginBottom: 20}}>{[a.born && ('b. ' + a.born), a.based].filter(Boolean).join(', ') || '—'}</div>
            <h1 className="display d-1" style={{marginBottom: 40}}>{a.name}</h1>
            <p className="lead" style={{marginBottom: 24}}>{a.bio}</p>
            <p style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.6, maxWidth:'52ch'}}>
              Working primarily in {a.medium.toLowerCase()}, {a.name.split(' ')[0]} maintains a practice that resists market tempo. Each work is conceived, made, and released on its own schedule — sometimes years in the making.
            </p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 24, paddingTop:40, borderTop:'1px solid var(--rule)'}}>
            <div>
              <div className="mono" style={{color:'var(--ink-3)', marginBottom:6}}>Born</div>
              <div className="serif" style={{fontSize:22}}>{a.born || '—'}</div>
            </div>
            <div>
              <div className="mono" style={{color:'var(--ink-3)', marginBottom:6}}>Works</div>
              <div className="serif" style={{fontSize:22}}>{works.length}</div>
            </div>
            <div>
              <div className="mono" style={{color:'var(--ink-3)', marginBottom:6}}>Represented</div>
              <div className="serif" style={{fontSize:22}}>2024 —</div>
            </div>
          </div>
        </div>
        <div className="img-wrap">
          <Img src={a.portrait} alt={a.name} />
        </div>
      </div>

      <section className="home-section">
        <div className="home-section-head">
          <div className="meta-label mono">Selected works</div>
          <div className="mono" style={{color:'var(--ink-3)'}}>{works.length} objects</div>
        </div>
        <div className="editorial" style={{padding:0}}>
          {works.map((w, i) => {
            const span = i % 3 === 0 ? 7 : i % 3 === 1 ? 5 : 6;
            const ar = w.aspect === 'portrait' ? '3/4' : w.aspect === 'tall' ? '2/3' : w.aspect === 'square' ? '1/1' : w.aspect === 'wide' ? '16/9' : '4/3';
            return (
              <figure key={w.id} style={{gridColumn: `span ${span}`, aspectRatio: ar}}>
                <Img src={w.img} alt={w.title} className="hoverable" onClick={()=>onOpenWork(w)} />
                <figcaption>
                  <span className="t">{w.title}, {w.year}</span>
                  <span className="r">{w.dimensions}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}

// ─── Works index with filters ──────────────────────────────────────
function WorksPage({ onOpenWork }) {
  const [cat, setCat] = useStateP('All');

  // Category buckets — order matters for both nav and grouped display
  const CATS = ['All','Lighting','Seating','Tables','Storage','Mirrors','Ceramics','Art','Objects','Rugs','Desks','Jewelry'];

  const categorize = (w) => {
    const t = (w.title || '').toLowerCase();
    const m = (w.medium || '').toLowerCase();
    const u = (w.img || '').toLowerCase();
    const blob = t + ' ' + m + ' ' + u;
    if (/\b(lamp|sconce|chandelier|pendant|floor light|table light|lantern|candelabra|candlestick)\b/.test(blob)) return 'Lighting';
    if (/\b(rug|carpet|tapestry|tufted)\b/.test(blob)) return 'Rugs';
    if (/\b(mirror)\b/.test(blob)) return 'Mirrors';
    if (/\b(chair|stool|bench|sofa|chaise|settee|loveseat|armchair|ottoman|seating)\b/.test(blob)) return 'Seating';
    if (/\b(desk)\b/.test(blob)) return 'Desks';
    if (/\b(table|console|nightstand|side table|coffee table|cocktail table)\b/.test(blob)) return 'Tables';
    if (/\b(cabinet|sideboard|credenza|shelf|shelving|storage|chest|dresser|armoire|wardrobe)\b/.test(blob)) return 'Storage';
    if (/\b(necklace|ring|earring|bracelet|brooch|cuff|jewelry)\b/.test(blob)) return 'Jewelry';
    if (/\b(canvas|oil paint|acrylic on|watercolor|pastel|drawing|painting|gouache|tempera|print|paper)\b/.test(m)) return 'Art';
    if (/\bwall\b/.test(t) && /\b(bronze|cast|tile|relief)\b/.test(m)) return 'Art';
    if (/\b(vase|vessel|jar|bowl|pot|urn|amphora|sculpture|relief|totem)\b/.test(blob)) return 'Ceramics';
    if (/\b(stoneware|porcelain|earthenware|terracotta|ceramic|glaze)\b/.test(m)) return 'Ceramics';
    return 'Objects';
  };

  // Pre-tag every work once
  const tagged = useMemoP(() => window.JK_WORKS.map(w => ({...w, _cat: categorize(w)})), []);
  const counts = useMemoP(() => {
    const c = { All: tagged.length };
    for (const w of tagged) c[w._cat] = (c[w._cat] || 0) + 1;
    return c;
  }, [tagged]);

  // Build display list: in "All" mode, group sections by category; otherwise filter
  const visible = cat === 'All' ? tagged : tagged.filter(w => w._cat === cat);

  // Choose a span based on aspect (cleaner rhythm than the previous hand-tuned cycle)
  const spanFor = (w, i, total) => {
    const ar = w.aspect;
    // statement piece every ~10 items
    if (i % 10 === 0 && total > 6) return 8;
    if (ar === 'wide') return 6;
    if (ar === 'portrait') return 4;
    return 4;
  };

  const aspectCss = (a) => a === 'portrait' ? '3/4' : a === 'wide' ? '16/10' : '4/3';

  const renderGrid = (items, keyPrefix = '') => (
    <div className="editorial" style={{padding:'0 var(--gutter)', gridGap:'40px 24px'}}>
      {items.map((w, i) => {
        const span = spanFor(w, i, items.length);
        const ar = aspectCss(w.aspect);
        const artist = window.JK_ARTISTS.find(a => a.id === w.artist);
        return (
          <figure key={keyPrefix + w.id} style={{gridColumn:`span ${span}`, aspectRatio: ar, cursor:'pointer'}}
                  onClick={()=>window.jkNavigate(`work/${w.id}`)}>
            <Img src={w.img} alt={w.title} className="hoverable" />
            <figcaption>
              <span>
                <span className="t">{w.title}</span>, {w.year}<br/>
                <span style={{color:'var(--ink-3)', fontSize:11}}>{artist ? artist.name : ''}</span>
              </span>
              <span className="r">{w.price}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );

  return (
    <main>
      <section className="container" style={{padding:'80px var(--gutter) 32px'}}>
        <div className="meta-label mono" style={{marginBottom: 24}}>Archive — {window.JK_WORKS.length} works</div>
        <h1 className="display d-1">
          Works in<br/><span style={{fontStyle:'italic'}}>circulation.</span>
        </h1>
      </section>

      {/* Category nav — editorial type, not chips. Sticks below page header. */}
      <nav style={{
        position:'sticky', top:68, zIndex:20,
        background:'color-mix(in srgb, var(--bg) 92%, transparent)',
        backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
        borderTop:'1px solid var(--rule)', borderBottom:'1px solid var(--rule)',
        padding:'18px var(--gutter)',
        display:'flex', gap:28, flexWrap:'wrap', alignItems:'baseline',
      }}>
        {CATS.filter(c => c === 'All' || (counts[c]||0) > 0).map(c => {
          const active = cat === c;
          return (
            <button key={c} onClick={()=>setCat(c)}
                    style={{
                      fontFamily:"'Gloock', serif",
                      fontSize: active ? 24 : 22,
                      lineHeight:1,
                      color: active ? 'var(--ink)' : 'var(--ink-3)',
                      fontStyle: active ? 'italic' : 'normal',
                      letterSpacing:'-0.01em',
                      transition:'color .2s, font-size .2s',
                      padding:0, background:'none', border:0, cursor:'pointer',
                      display:'inline-flex', alignItems:'baseline', gap:6,
                    }}>
              {c}
              <sup style={{
                fontFamily:"'JetBrains Mono', monospace", fontSize:10, fontStyle:'normal',
                color: active ? 'var(--ink-2)' : 'var(--ink-3)', letterSpacing:'.04em',
              }}>{counts[c] || 0}</sup>
            </button>
          );
        })}
      </nav>

      {cat === 'All' ? (
        // Grouped sections — gallery floor plan
        <div style={{padding:'60px 0 80px'}}>
          {CATS.filter(c => c !== 'All' && (counts[c]||0) > 0).map((c, sectionIdx) => {
            const items = tagged.filter(w => w._cat === c);
            return (
              <section key={c} style={{marginBottom: 80}}>
                <header style={{
                  display:'grid', gridTemplateColumns:'1fr auto', alignItems:'baseline',
                  padding:'0 var(--gutter)', marginBottom: 32,
                  borderBottom:'1px solid var(--rule)', paddingBottom: 18,
                }}>
                  <div style={{display:'flex', alignItems:'baseline', gap:18}}>
                    <span className="mono" style={{color:'var(--ink-3)'}}>
                      {String(sectionIdx + 1).padStart(2,'0')}
                    </span>
                    <h2 className="display" style={{fontSize:'clamp(36px,5vw,72px)', lineHeight:0.95}}>
                      {c}<span style={{fontStyle:'italic', color:'var(--ink-3)'}}>.</span>
                    </h2>
                  </div>
                  <div style={{display:'flex', gap:18, alignItems:'baseline'}}>
                    <span className="mono" style={{color:'var(--ink-3)'}}>
                      {items.length} {items.length === 1 ? 'work' : 'works'}
                    </span>
                    <button className="mono btn-ghost" onClick={()=>setCat(c)} style={{fontSize:10}}>
                      View all →
                    </button>
                  </div>
                </header>
                {/* Show only the first 6 in each section in "All" view to keep scrollability */}
                {renderGrid(items.slice(0, 6), `${c}-`)}
                {items.length > 6 && (
                  <div style={{padding:'24px var(--gutter) 0', textAlign:'right'}}>
                    <button className="mono btn-ghost" onClick={()=>setCat(c)}>
                      + {items.length - 6} more in {c.toLowerCase()}
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        // Focused single-category view
        <section style={{padding:'48px 0 80px'}}>
          <div style={{padding:'0 var(--gutter)', marginBottom:32, display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <div>
              <span className="mono" style={{color:'var(--ink-3)'}}>{cat}</span>
              <h2 className="display d-3" style={{marginTop:8}}>
                {counts[cat]} {counts[cat] === 1 ? 'work' : 'works'} on offer
              </h2>
            </div>
            <button className="mono btn-ghost" onClick={()=>setCat('All')}>← All categories</button>
          </div>
          {renderGrid(visible)}
        </section>
      )}
      <Footer />
    </main>
  );
}

// ─── Work detail ───────────────────────────────────────────────────
function WorkDetailPage({ workId, onOpenWork }) {
  const w = window.JK_WORKS.find(x => x.id === workId);
  if (!w) return <main><div style={{padding:60}}>Work not found. <button className="btn-ghost" onClick={()=>window.jkNavigate('works')}>Back</button></div></main>;
  const artist = window.JK_ARTISTS.find(a => a.id === w.artist);
  const related = window.JK_WORKS.filter(x => x.artist === w.artist && x.id !== w.id).slice(0, 3);
  return (
    <main>
      <div className="work-detail">
        <div className="media" onClick={()=>onOpenWork(w)}>
          <img src={w.img} alt={w.title} />
        </div>
        <div className="info">
          <button className="mono btn-ghost" onClick={()=>window.jkNavigate('works')} style={{marginBottom: 48}}>← All works</button>
          <div className="meta-label mono" style={{marginBottom: 20}}>
            <a href={`#/artist/${artist.id}`} onClick={(e)=>{e.preventDefault();window.jkNavigate(`artist/${artist.id}`)}}>{artist.name}</a>
          </div>
          <h1 className="display d-3">{w.title}<span className="year">, </span></h1>
          <div className="year serif" style={{fontSize: 22}}>{w.year}</div>

          <dl>
            <dt>Medium</dt><dd>{w.medium}</dd>
            <dt>Dimensions</dt><dd>{w.dimensions}</dd>
            <dt>Edition</dt><dd>{w.edition}</dd>
            <dt>Provenance</dt><dd>Studio of the artist</dd>
            <dt>Price</dt><dd className="serif" style={{fontSize: 20}}>{w.price}</dd>
          </dl>

          <p style={{fontSize: 14, color:'var(--ink-2)', lineHeight: 1.6, marginBottom: 20}}>
            This work continues {artist.name.split(' ')[0]}'s ongoing investigation into {w.medium.split(',')[0].toLowerCase()} as a carrier of light, gesture, and time. Click the image to view at full scale.
          </p>

          <div className="cta-row">
            <button className="btn">Inquire <span className="arr">→</span></button>
            <button className="btn" style={{background:'transparent'}}>Save to list</button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="home-section" style={{paddingTop: 80}}>
          <div className="home-section-head">
            <div className="meta-label mono">More by {artist.name}</div>
            <button className="btn-ghost mono" onClick={()=>window.jkNavigate(`artist/${artist.id}`)}>View all →</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 24}}>
            {related.map(r => (
              <figure key={r.id} style={{aspectRatio: '3/4', cursor:'pointer'}} onClick={()=>window.jkNavigate(`work/${r.id}`)}>
                <Img src={r.img} alt={r.title} className="hoverable" />
                <figcaption style={{paddingTop:12, fontSize:12, color:'var(--ink-2)'}}>
                  <em>{r.title}</em>, {r.year}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

// ─── Press ─────────────────────────────────────────────────────────
function PressPage() {
  return (
    <main>
      <section className="container" style={{padding:'80px var(--gutter) 40px'}}>
        <div className="meta-label mono" style={{marginBottom: 24}}>Selected press</div>
        <h1 className="display d-1">
          In<br/><span style={{fontStyle:'italic'}}>conversation.</span>
        </h1>
        <p className="lead" style={{marginTop: 24}}>
          A selection of features, profiles, and interviews from our first eighteen months.
        </p>
      </section>
      <section className="press-list">
        {window.JK_PRESS.map((p, i) => {
          const hasLink = p.url && p.url !== '#';
          const Row = hasLink ? 'a' : 'div';
          const linkProps = hasLink ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {};
          return (
            <Row key={i} className="press-row" {...linkProps}>
              <div className="pub">{p.pub}</div>
              <div className="title serif">{p.title}</div>
              <div className="date">{p.date}</div>
              <div className="arr">↗</div>
            </Row>
          );
        })}
      </section>
      <Footer />
    </main>
  );
}

// ─── Visit ─────────────────────────────────────────────────────────
function VisitPage() {
  return (
    <main>
      <section className="container" style={{padding:'80px var(--gutter) 20px'}}>
        <div className="meta-label mono" style={{marginBottom: 24}}>200 North Sea Road · Southampton, NY</div>
        <h1 className="display d-1">
          Visit<br/><span style={{fontStyle:'italic'}}>the station.</span>
        </h1>
      </section>

      <section className="container" style={{padding:'48px var(--gutter) 0'}}>
        <img src="assets/img/visit/building-line.png" alt="JK Art & Design Projects building" style={{display:'block', width:'100%', height:'auto', marginBottom: 28}} />
        <p style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.7, letterSpacing:'0.06em', margin:'0 0 24px'}}>
          Originally built as the North Sea power station in 1900, the building still bears its steel-truss roof, concrete loading bays, and the layered marks of more than a century of industry. Its restoration, completed in September 2025, was led by architect Niels Torp in collaboration with the founders.
        </p>
      </section>

      <section className="container" style={{padding:'60px var(--gutter) 80px'}}>
        <div className="info-list">
          <div className="row">
            <span className="k">Hours</span>
            <span className="v">
              Thu–Sat · 11:30 — 17:00<br/>
              Sunday · 12:00 — 16:00<br/>
              Mon–Wed · By appointment<br/>
              <span style={{color:'var(--ink-3)', fontSize:13}}>Current winter hours. Closed most holidays.</span>
            </span>
          </div>
          <div className="row">
            <span className="k">Address</span>
            <span className="v">
              200 North Sea Road<br/>
              Southampton, NY 11968<br/>
              <span style={{color:'var(--ink-3)', fontSize:13}}>93 miles east of Manhattan.</span>
            </span>
          </div>
          <div className="row">
            <span className="k">Contact</span>
            <span className="v">
              <a href="mailto:info@collectiveartdesign.com" style={{color:'inherit'}}>info@collectiveartdesign.com</a><br/>
              <a href="tel:+16313533445" style={{color:'inherit'}}>+1 (631) 353 — 3445</a>
            </span>
          </div>
          <div className="row">
            <span className="k">Follow</span>
            <span className="v" style={{display:'flex', flexWrap:'wrap', gap:'4px 18px'}}>
              <a className="mono" style={{color:'inherit', textDecoration:'none', borderBottom:'1px solid var(--rule)'}} href="https://www.instagram.com/jefflincolnartdesign/?hl=en" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              <a className="mono" style={{color:'inherit', textDecoration:'none', borderBottom:'1px solid var(--rule)'}} href="https://www.incollect.com/professionals/dealers/jeff-lincoln-ny" target="_blank" rel="noopener noreferrer">InCollect ↗</a>
              <a className="mono" style={{color:'inherit', textDecoration:'none', borderBottom:'1px solid var(--rule)'}} href="https://www.artsy.net/partner/jeff-lincoln-art-plus-design" target="_blank" rel="noopener noreferrer">Artsy ↗</a>
              <a className="mono" style={{color:'inherit', textDecoration:'none', borderBottom:'1px solid var(--rule)'}} href="https://www.artnet.com/galleries/jeff-lincoln-art-design/" target="_blank" rel="noopener noreferrer">Artnet ↗</a>
            </span>
          </div>
          <div className="row">
            <span className="k">Accessibility</span>
            <span className="v">
              Ground-floor galleries are fully wheelchair accessible. Please call ahead for assistance entering the sculpture campus.
            </span>
          </div>
          <div className="row">
            <span className="k">Private viewings</span>
            <span className="v">
              Available weekdays by request. Please write to the above address for scheduling.
            </span>
          </div>
        </div>
      </section>

      {/* Exhibitions list */}
      <section className="container" style={{padding:'60px var(--gutter)'}}>
        <div className="meta-label mono" style={{marginBottom: 40}}>Exhibitions</div>
        {window.JK_EXHIBITIONS.slice(0, 6).map((ex, i) => {
          const label = ex.section === 'current' ? (ex.year >= 2025 ? 'On view' : 'Recent') : 'Past';
          return (
            <div key={i} style={{display:'grid', gridTemplateColumns:'120px 1fr 120px', gap: 32, padding:'28px 0', borderTop:'1px solid var(--rule)', alignItems:'baseline'}}>
              <span className="mono" style={{color: label === 'On view' ? 'var(--accent)' : 'var(--ink-3)'}}>{label}</span>
              <span className="serif" style={{fontSize:22}}>{ex.title}</span>
              <span className="mono" style={{color:'var(--ink-3)', textAlign:'right'}}>{ex.dates}</span>
            </div>
          );
        })}
        <div style={{borderTop:'1px solid var(--rule)', paddingTop:24, marginTop:8}}>
          <button className="btn-ghost mono" onClick={()=>window.jkNavigate('exhibitions')}>Full exhibition history →</button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ─── Exhibitions ───────────────────────────────────────────────────
function ExhibitionsPage({ onOpenWork }) {
  const all = window.JK_EXHIBITIONS;
  const current = all.filter(e => e.section === 'current');
  const past = all.filter(e => e.section === 'past');

  // Group past by year
  const pastByYear = {};
  past.forEach(e => {
    pastByYear[e.year] = pastByYear[e.year] || [];
    pastByYear[e.year].push(e);
  });
  const pastYears = Object.keys(pastByYear).sort((a,b) => b - a);

  return (
    <main>
      {/* HERO */}
      <section className="container" style={{padding:'96px var(--gutter) 32px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:48, alignItems:'end'}}>
          <div>
            <div className="meta-label mono" style={{marginBottom: 28}}>Exhibitions · 2016 — 2026</div>
            <h1 className="display d-1">
              On <span style={{fontStyle:'italic'}}>view,</span><br/>
              and previously.
            </h1>
          </div>
          <div className="mono" style={{color:'var(--ink-3)', textAlign:'right', whiteSpace:'nowrap'}}>
            <div>{current.length} currently on view</div>
            <div style={{marginTop:4}}>{past.length} in the archive</div>
          </div>
        </div>
        <p className="lead" style={{marginTop:40, maxWidth: '50ch'}}>
          A decade of programming across both galleries, from the founding 2016 season to the current cycle at the Southampton power station.
        </p>
      </section>

      {/* CURRENT — featured grid */}
      <section className="container" style={{padding:'32px var(--gutter) 24px'}}>
        <div className="home-section-head" style={{marginBottom:32}}>
          <div className="meta-label mono">Currently on view</div>
          <span className="mono" style={{color:'var(--ink-3)'}}>{String(current.length).padStart(2,'0')} shows</span>
        </div>

        <div className="exh-feature-grid">
          {current.map((ex, i) => (
            <article key={ex.id} className="exh-card">
              <figure className="img-wrap" style={{aspectRatio: '4/5'}}>
                <Img src={ex.img} alt={ex.title} className="hoverable" />
              </figure>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:18}}>
                <span className="mono" style={{color:'var(--ink-3)'}}>{String(i + 1).padStart(2,'0')} / {String(current.length).padStart(2,'0')}</span>
                <span className="mono" style={{color:'var(--ink-3)'}}>{ex.dates}</span>
              </div>
              <h3 className="serif" style={{fontSize:'clamp(22px,1.9vw,28px)', lineHeight:1.15, marginTop:10, letterSpacing:'-0.01em'}}>
                {ex.title}
              </h3>
              {ex.blurb && (
                <p style={{fontSize:14, lineHeight:1.6, color:'var(--ink-2)', marginTop:12, maxWidth:'42ch'}}>
                  {ex.blurb}
                </p>
              )}
              <button className="btn-ghost mono" style={{marginTop:18}}
                      onClick={()=>window.jkNavigate('works')}>
                View works →
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* PAST — typographic archive */}
      <section className="container" style={{padding:'96px var(--gutter) 80px'}}>
        <div className="home-section-head" style={{marginBottom:32}}>
          <div className="meta-label mono">Past exhibitions</div>
          <span className="mono" style={{color:'var(--ink-3)'}}>{String(past.length).padStart(2,'0')} archived</span>
        </div>

        <div className="exh-archive">
          {pastYears.map(year => (
            <div key={year} className="exh-year-block">
              <div className="exh-year">{year}</div>
              <div className="exh-year-list">
                {pastByYear[year].map((ex, i) => (
                  <div key={ex.id} className="exh-row">
                    <span className="num mono">{String(i+1).padStart(2,'0')}</span>
                    <span className="serif title">{ex.title}</span>
                    <span className="mono dates">{ex.dates}</span>
                    <span className="arr">↗</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ─── About ─────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <main>
      <section className="container" style={{padding:'80px var(--gutter) 32px'}}>
        <div className="meta-label mono" style={{marginBottom: 24}}>About</div>
        <h1 className="display d-1" style={{marginBottom: 40}}>
          About JK Art &amp;<br/><span style={{fontStyle:'italic'}}>Design Projects.</span>
        </h1>
        <p style={{fontFamily:'Inter Tight, sans-serif', fontSize:18, lineHeight:1.6, letterSpacing:'0.02em', color:'var(--ink-2)', maxWidth:'72ch', margin:'0 0 48px'}}>
          Founded by Kate Vogel and Jeff Lincoln, JK Art &amp; Design Projects weaves together past and present seminal voices in art and design with the mission of highlighting multidisciplinary practices that resist categorization. The gallery serves as a platform — and a cultural hub and a springboard for creative exchange — for experimentation, craftsmanship, and evolution in the field. Through exhibitions, workshops, installations, and community-driven programming, this project aims to shed light on the East End&rsquo;s enduring legacy in shaping contemporary art and design discourse.
        </p>
      </section>

      <section className="container" style={{padding:'0 var(--gutter) 80px'}}>
        <img src="assets/img/about/founders.webp" alt="Kate Vogel and Jeff Lincoln" style={{display:'block', width:'100%', height:'auto'}} />
        <p style={{fontSize:13, color:'var(--ink-3)', lineHeight:1.6, letterSpacing:'0.06em', marginTop:14, fontFamily:'Inter Tight, sans-serif'}}>
          Founders Kate Vogel and Jeff Lincoln, Southampton, NY.
        </p>
      </section>

      <Footer />
    </main>
  );
}

Object.assign(window, { HomePage, ArtistsPage, ArtistDetailPage, WorksPage, WorkDetailPage, PressPage, VisitPage, ExhibitionsPage, AboutPage });
