/* Main app — hero, nav, all sections rendered from FRAMEWORK data */

const { FRAMEWORK, COLORS, Pill, Check, Bullet, Section, Prose, Card, StageCard, Reveal, FloatingBlob, SideParticles, useRipple, RippleContainer } = window;

function HeroButton({ href, style, children }) {
  const { ripples, onMouseDown } = useRipple();
  const [hovered, setHovered] = React.useState(false);
  return React.createElement("a", {
    href: href,
    onMouseDown: onMouseDown,
    onMouseEnter: function() { setHovered(true); },
    onMouseLeave: function() { setHovered(false); },
    style: Object.assign({
      position: "relative",
      overflow: "hidden",
      transform: hovered ? "scale(1.04)" : "scale(1)",
      transition: "transform 0.2s cubic-bezier(0.22, 0.61, 0.36, 1)"
    }, style)
  }, React.createElement(RippleContainer, { ripples: ripples }), React.createElement("span", { style: { position: "relative", zIndex: 1 } }, children));
}

function Hero() {
  return React.createElement("div", {
    style: {
      background: "#FBF6E9",
      position: "relative",
      overflow: "hidden",
      padding: "80px 0 90px",
      borderBottom: "2px solid #2A2418"
    }
  },
    React.createElement(FloatingBlob, { speed: 0.7, amplitude: 14, style: { top: 60, left: "8%", background: COLORS.butter.bg, width: 110, height: 110 } }),
    React.createElement(FloatingBlob, { speed: 0.9, amplitude: 10, style: { top: 220, right: "10%", background: COLORS.peach.bg, width: 80, height: 80, borderRadius: 18 } }),
    React.createElement(FloatingBlob, { speed: 0.6, amplitude: 16, style: { bottom: 80, left: "12%", background: COLORS.lilac.bg, width: 70, height: 70 } }),
    React.createElement(FloatingBlob, { speed: 1.1, amplitude: 8, style: { top: 120, right: "22%", background: COLORS.sage.bg, width: 50, height: 50, borderRadius: 14 } }),
    React.createElement(FloatingBlob, { speed: 0.8, amplitude: 12, style: { bottom: 130, right: "8%", background: COLORS.sky.bg, width: 90, height: 90 } }),

    React.createElement("div", { style: { maxWidth: 980, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 2 } },
      React.createElement(Pill, { color: "sage", small: true }, "★ ", FRAMEWORK.version),
      React.createElement("h1", {
        style: {
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "clamp(48px, 8vw, 96px)",
          lineHeight: 0.98,
          letterSpacing: "-0.02em",
          margin: "20px 0 22px",
          color: "#2A2418",
          textWrap: "balance"
        }
      },
        "The AI-Powered", React.createElement("br"),
        React.createElement("span", { style: { color: COLORS.peach.deep, fontStyle: "italic" } }, "Development"), " ",
        React.createElement("span", { style: { color: COLORS.sage.deep, fontStyle: "italic" } }, "Framework")
      ),
      React.createElement("p", {
        style: {
          fontSize: 22,
          lineHeight: 1.45,
          maxWidth: 720,
          color: "#5C4416",
          margin: "0 0 30px",
          fontFamily: "Inter, sans-serif",
          textWrap: "balance"
        }
      }, FRAMEWORK.subtitle),
      React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } },
        React.createElement(HeroButton, { href: "#what", style: btnPrimary }, "start reading →"),
        React.createElement(HeroButton, { href: "#stages", style: btnGhost }, "jump to the 5 stages")
      )
    )
  );
}

const btnPrimary = {
  display: "inline-block",
  padding: "14px 24px",
  background: "#2A2418",
  color: "#FBF6E9",
  borderRadius: 999,
  textDecoration: "none",
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: 16,
  border: "2px solid #2A2418"
};
const btnGhost = {
  display: "inline-block",
  padding: "14px 24px",
  background: "transparent",
  color: "#2A2418",
  borderRadius: 999,
  textDecoration: "none",
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: 16,
  border: "2px solid #2A2418"
};

function StickyNav() {
  const items = [
    ["#what", "Intro"],
    ["#stages", "5 Stages"],
    ["#security", "Security"],
    ["#privacy", "Privacy"],
    ["#stack", "Stack"],
    ["#models", "Models"],
    ["#starting", "Get Started"]
  ];
  const [active, setActive] = React.useState("#what");

  React.useEffect(function() {
    function onScroll() {
      var y = window.scrollY + 120;
      var cur = items[0][0];
      for (var i = 0; i < items.length; i++) {
        var el = document.querySelector(items[i][0]);
        if (el && el.offsetTop <= y) cur = items[i][0];
      }
      setActive(cur);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return function() { window.removeEventListener("scroll", onScroll); };
  }, []);

  return React.createElement("nav", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(251, 246, 233, 0.92)",
      backdropFilter: "blur(8px)",
      borderBottom: "1.5px solid #2A2418",
      padding: "12px 0"
    }
  },
    React.createElement("div", {
      style: {
        maxWidth: 980,
        margin: "0 auto",
        padding: "0 28px",
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        alignItems: "center"
      }
    },
      React.createElement("div", {
        style: {
          fontFamily: "'DM Serif Display', serif",
          fontSize: 18,
          color: "#2A2418",
          marginRight: 16
        }
      }, "✦ ai-dev-framework"),
      items.map(function(item) {
        var href = item[0], label = item[1];
        var isActive = active === href;
        return React.createElement(NavLink, { key: href, href: href, active: isActive, label: label });
      })
    )
  );
}

function NavLink({ href, active, label }) {
  const [hovered, setHovered] = React.useState(false);
  return React.createElement("a", {
    href: href,
    onMouseEnter: function() { setHovered(true); },
    onMouseLeave: function() { setHovered(false); },
    style: {
      padding: "7px 14px",
      borderRadius: 99,
      fontFamily: "Inter, sans-serif",
      fontSize: 14,
      fontWeight: 600,
      textDecoration: "none",
      color: active ? "#FBF6E9" : "#2A2418",
      background: active ? "#2A2418" : "transparent",
      transform: hovered && !active ? "translateY(-1px)" : "none",
      transition: "all 0.2s cubic-bezier(0.22, 0.61, 0.36, 1)"
    }
  }, label);
}

function App() {
  return React.createElement("div", { style: { background: "#FBF6E9", color: "#2A2418", paddingBottom: 80 } },
    React.createElement(SideParticles),
    React.createElement(Hero),
    React.createElement(StickyNav),

    /* WHAT THIS IS */
    React.createElement(Section, { id: "what", eyebrow: "What This Is", title: "A workflow you can actually trust.", color: "butter", big: true },
      React.createElement(Reveal, null,
        React.createElement(Prose, null,
          FRAMEWORK.whatThisIs.map(function(p, i) {
            return React.createElement("p", { key: i, style: { marginBottom: 18 } }, p);
          })
        )
      )
    ),

    /* CORE PRINCIPLE */
    React.createElement(Section, { eyebrow: "The Core Principle", title: "The right model. The right stage. Always a human.", color: "sage" },
      React.createElement(Reveal, null,
        React.createElement(Card, { color: "sage" },
          React.createElement(Prose, null, FRAMEWORK.corePrinciple)
        )
      )
    ),

    /* THE 5 STAGES */
    React.createElement(Section, {
      id: "stages",
      eyebrow: "The Five Stages",
      title: "Five stops between an idea and a live app.",
      color: "peach"
    },
      React.createElement(Reveal, null,
        React.createElement(Prose, null,
          React.createElement("p", { style: { marginBottom: 28, fontSize: 17, opacity: 0.8 } },
            "Click any card to expand it — every word here is exactly as written in the framework."
          )
        )
      ),
      FRAMEWORK.stages.map(function(s, i) {
        return React.createElement(Reveal, { key: s.n, delay: i * 80 },
          React.createElement(StageCard, { stage: s })
        );
      })
    ),

    /* SECURITY */
    React.createElement(Section, { id: "security", eyebrow: "Security Standards", title: "Non-negotiable. All of them.", color: "lilac" },
      React.createElement(Reveal, null,
        React.createElement(Prose, null,
          React.createElement("p", { style: { marginBottom: 24 } }, FRAMEWORK.security.intro)
        )
      ),
      React.createElement(Reveal, { delay: 100 },
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: 16 } },
          FRAMEWORK.security.groups.map(function(g, i) {
            return React.createElement(SecurityGroup, { key: i, group: g, idx: i });
          })
        )
      ),

      /* OWASP */
      React.createElement(Reveal, { delay: 150 },
        React.createElement("div", { style: { marginTop: 28 } },
          React.createElement(Card, { color: "lilac" },
            React.createElement("h3", {
              style: {
                fontFamily: "'DM Serif Display', serif",
                fontSize: 28,
                margin: "0 0 8px"
              }
            }, FRAMEWORK.security.owasp.title),
            React.createElement("p", { style: { fontSize: 16, margin: "0 0 16px", opacity: 0.8 } }, FRAMEWORK.security.owasp.intro),
            React.createElement("ul", { style: { padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" } },
              FRAMEWORK.security.owasp.items.map(function(it, i) {
                return React.createElement(Check, { key: i, color: "lilac" }, it);
              })
            )
          )
        )
      )
    ),

    /* PRIVACY */
    React.createElement(Section, { id: "privacy", eyebrow: "Privacy & Legal", title: "Real users mean real laws.", color: "sky" },
      React.createElement(Reveal, null,
        React.createElement(Prose, null,
          React.createElement("p", { style: { marginBottom: 24 } }, FRAMEWORK.privacy.intro)
        )
      ),

      React.createElement(Reveal, { delay: 80 },
        React.createElement(Card, { color: "sky", style: { marginBottom: 16 } },
          React.createElement(SubHead, { glyph: "✺" }, FRAMEWORK.privacy.gdpr.title),
          React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, margin: "0 0 16px", fontFamily: "Inter, sans-serif" } }, FRAMEWORK.privacy.gdpr.lede),
          React.createElement(Label, { color: "sky" }, FRAMEWORK.privacy.gdpr.requiredLabel),
          React.createElement("ul", { style: { padding: 0, margin: 0 } },
            FRAMEWORK.privacy.gdpr.items.map(function(x, i) { return React.createElement(Check, { key: i, color: "sky" }, x); })
          )
        )
      ),

      React.createElement(Reveal, { delay: 120 },
        React.createElement(Card, { color: "sky", style: { marginBottom: 16 } },
          React.createElement(SubHead, { glyph: "◉" }, FRAMEWORK.privacy.ccpa.title),
          React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, margin: "0 0 16px", fontFamily: "Inter, sans-serif" } }, FRAMEWORK.privacy.ccpa.lede),
          React.createElement(Label, { color: "sky" }, FRAMEWORK.privacy.ccpa.requiredLabel),
          React.createElement("ul", { style: { padding: 0, margin: 0 } },
            FRAMEWORK.privacy.ccpa.items.map(function(x, i) { return React.createElement(Check, { key: i, color: "sky" }, x); })
          )
        )
      ),

      React.createElement(Reveal, { delay: 160 },
        React.createElement(Card, { color: "sky" },
          React.createElement(SubHead, { glyph: "✦" }, FRAMEWORK.privacy.practical.title),
          React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, margin: "0 0 16px", fontFamily: "Inter, sans-serif" } }, FRAMEWORK.privacy.practical.body),
          React.createElement(Label, { color: "sky" }, FRAMEWORK.privacy.practical.docsLabel),
          React.createElement("ul", { style: { padding: 0, margin: 0 } },
            FRAMEWORK.privacy.practical.docs.map(function(x, i) { return React.createElement(Check, { key: i, color: "sky" }, x); })
          )
        )
      )
    ),

    /* STACK */
    React.createElement(Section, { id: "stack", eyebrow: "The Tech Stack", title: "Opinionated by design.", color: "butter" },
      React.createElement(Reveal, null,
        React.createElement(Prose, null,
          React.createElement("p", { style: { marginBottom: 24 } },
            "Every choice has a reason. Alternatives are listed where the tradeoff is real."
          )
        )
      ),
      React.createElement("div", { style: { display: "grid", gap: 14 } },
        FRAMEWORK.stack.map(function(s, i) {
          return React.createElement(Reveal, { key: i, delay: i * 60 },
            React.createElement(StackRow, { item: s, idx: i })
          );
        })
      )
    ),

    /* MODELS + CHECKPOINTS */
    React.createElement(Section, { id: "models", eyebrow: "Models & Checkpoints", title: "Who does what — and what you check.", color: "sage" },
      React.createElement(Reveal, null,
        React.createElement(SubHead, { glyph: "◐" }, "The AI Models and Their Roles"),
        React.createElement(DataTable, {
          color: "sage",
          headers: ["Stage", "Model", "Role"],
          rows: FRAMEWORK.modelTable
        }),
        FRAMEWORK.modelNotes.map(function(n, i) {
          return React.createElement("p", { key: i, style: { fontSize: 16, lineHeight: 1.6, margin: "16px 0 0", fontFamily: "Inter, sans-serif" } }, n);
        })
      ),

      React.createElement("div", { style: { height: 36 } }),

      React.createElement(Reveal, null,
        React.createElement(SubHead, { glyph: "♥" }, "Human Checkpoints Summary"),
        React.createElement(DataTable, {
          color: "peach",
          headers: ["After Stage", "What You Check", "Pass Condition"],
          rows: FRAMEWORK.checkpoints
        })
      ),

      React.createElement("div", { style: { height: 36 } }),

      React.createElement(Reveal, null,
        React.createElement(SubHead, { glyph: "✕" }, "Common Mistakes This Framework Prevents")
      ),
      React.createElement("div", { style: { display: "grid", gap: 12 } },
        FRAMEWORK.mistakes.map(function(m, i) {
          return React.createElement(Reveal, { key: i, delay: i * 80 },
            React.createElement(Card, { color: "peach" },
              React.createElement("div", { style: { display: "flex", gap: 16 } },
                React.createElement("div", {
                  style: {
                    flexShrink: 0,
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: COLORS.peach.deep,
                    color: COLORS.peach.soft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 20
                  }
                }, i + 1),
                React.createElement("div", { style: { flex: 1 } },
                  React.createElement("div", { style: { fontFamily: "'DM Serif Display', serif", fontSize: 22, lineHeight: 1.2, marginBottom: 6 } }, m.t),
                  React.createElement("div", { style: { fontSize: 16, lineHeight: 1.55, fontFamily: "Inter, sans-serif" } }, m.b)
                )
              )
            )
          );
        })
      )
    ),

    /* GET STARTED */
    React.createElement(Section, { id: "starting", eyebrow: "Starting a New Project", title: "Nine steps. Pinned to your wall.", color: "lilac" },
      React.createElement(Reveal, null,
        React.createElement("ol", { style: { padding: 0, margin: 0, counterReset: "step" } },
          FRAMEWORK.starting.map(function(s, i) {
            return React.createElement("li", {
              key: i,
              style: {
                listStyle: "none",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
                padding: "14px 18px",
                marginBottom: 10,
                background: COLORS.lilac.soft,
                borderRadius: 16,
                border: "2px solid " + COLORS.lilac.deep
              }
            },
              React.createElement("div", {
                style: {
                  flexShrink: 0,
                  width: 38,
                  height: 38,
                  borderRadius: 99,
                  background: COLORS.lilac.deep,
                  color: COLORS.lilac.soft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 18
                }
              }, i + 1),
              React.createElement("div", { style: { fontSize: 17, lineHeight: 1.5, paddingTop: 7, fontFamily: "Inter, sans-serif" } }, s)
            );
          })
        )
      ),

      /* live prompt */
      React.createElement(Reveal, { delay: 100 },
        React.createElement("div", { style: { marginTop: 36 } },
          React.createElement(SubHead, { glyph: "✦" }, "Using This Framework as a Live Prompt"),
          React.createElement(Card, { color: "lilac" },
            React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", fontFamily: "Inter, sans-serif" } }, FRAMEWORK.livePrompt.intro),
            React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, margin: "0 0 14px", fontFamily: "Inter, sans-serif" } },
              React.createElement("strong", null, "How to use it:"), " ", FRAMEWORK.livePrompt.how
            ),
            React.createElement("blockquote", {
              style: {
                margin: "12px 0",
                padding: "16px 22px",
                background: COLORS.lilac.bg,
                borderRadius: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15,
                lineHeight: 1.5,
                color: COLORS.lilac.ink
              }
            }, "\"", FRAMEWORK.livePrompt.quote, "\""),
            React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, margin: "14px 0 14px", fontFamily: "Inter, sans-serif" } }, FRAMEWORK.livePrompt.after),
            React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, margin: 0, fontFamily: "Inter, sans-serif" } }, FRAMEWORK.livePrompt.closing),
            React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" } },
              React.createElement("a", {
                href: "/ai-dev-framework.md",
                download: true,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: COLORS.lilac.deep,
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: 10,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }
              }, "↓ Download .md"),
              React.createElement("button", {
                onClick: function() {
                  fetch("/ai-dev-framework.md").then(function(r) { return r.text(); }).then(function(text) {
                    navigator.clipboard.writeText(text);
                    var btn = document.getElementById("copy-btn");
                    btn.textContent = "✓ Copied!";
                    setTimeout(function() { btn.textContent = "Copy to Clipboard"; }, 2000);
                  });
                },
                id: "copy-btn",
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: "2px solid " + COLORS.lilac.deep,
                  color: COLORS.lilac.deep,
                  padding: "10px 18px",
                  borderRadius: 10,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }
              }, "Copy to Clipboard")
            )
        )
      ),

      /* solo dev */
      React.createElement(Reveal, { delay: 150 },
        React.createElement("div", { style: { marginTop: 36 } },
          React.createElement(SubHead, { glyph: "✺" }, FRAMEWORK.solo.title),
          React.createElement(Prose, null,
            React.createElement("p", { style: { marginBottom: 18 } }, FRAMEWORK.solo.intro)
          ),
          FRAMEWORK.solo.points.map(function(p, i) {
            return React.createElement(Card, { key: i, color: "butter", style: { marginBottom: 12 } },
              React.createElement("div", { style: { fontFamily: "'DM Serif Display', serif", fontSize: 22, lineHeight: 1.2, marginBottom: 8 } }, p.t),
              React.createElement("div", { style: { fontSize: 16, lineHeight: 1.6, fontFamily: "Inter, sans-serif" } }, p.b)
            );
          }),

          React.createElement(Card, { color: "peach", style: { marginBottom: 12 } },
            React.createElement(Label, { color: "peach" }, FRAMEWORK.solo.skipLabel),
            React.createElement("ul", { style: { padding: 0, margin: 0 } },
              FRAMEWORK.solo.skip.map(function(x, i) { return React.createElement(Bullet, { key: i, color: "peach" }, x); })
            )
          ),

          React.createElement(Card, { color: "sage", style: { marginBottom: 12 } },
            React.createElement(Label, { color: "sage" }, FRAMEWORK.solo.scaleLabel),
            React.createElement("ul", { style: { padding: 0, margin: 0 } },
              FRAMEWORK.solo.scale.map(function(x, i) { return React.createElement(Bullet, { key: i, color: "sage" }, x); })
            )
          ),

          React.createElement(Card, { color: "lilac" },
            React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, margin: 0, fontFamily: "Inter, sans-serif", fontStyle: "italic" } }, FRAMEWORK.solo.closing)
          )
        )
      )
    ),

    /* footer */
    React.createElement(Reveal, { as: "div", style: { textAlign: "center", padding: "60px 28px 20px", color: "#5C4416" } },
      React.createElement("div", {
        style: {
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          margin: "0 auto 10px",
          maxWidth: 560,
          lineHeight: 1.2,
          color: "#2A2418"
        }
      }, FRAMEWORK.tagline),
      React.createElement("div", { style: { fontFamily: "Inter, sans-serif", fontSize: 14, opacity: 0.7 } },
        "Framework ", FRAMEWORK.version, " · ",
        React.createElement("a", {
          href: "https://github.com/AlosMarkets/AiDevFramework",
          target: "_blank",
          rel: "noopener noreferrer",
          style: { color: "#2A2418", textDecoration: "underline" }
        }, "GitHub")
      )
    )
  );
}

function SubHead({ glyph, children }) {
  return React.createElement("h3", {
    style: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: 32,
      lineHeight: 1.1,
      margin: "0 0 18px",
      display: "flex",
      gap: 14,
      alignItems: "baseline",
      color: "#2A2418"
    }
  },
    React.createElement("span", { style: { fontSize: 22, opacity: 0.5 } }, glyph),
    children
  );
}

function Label({ color, children }) {
  var c = COLORS[color];
  return React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.2em",
      color: c.deep,
      fontWeight: 700,
      marginBottom: 8,
      fontFamily: "Inter, sans-serif",
      textTransform: "uppercase"
    }
  }, children);
}

function SecurityGroup({ group, idx }) {
  var palette = ["lilac", "sage", "peach", "sky", "butter"];
  var color = palette[idx % palette.length];
  var c = COLORS[color];
  var [open, setOpen] = React.useState(idx === 0);
  return React.createElement("div", {
    style: {
      background: c.soft,
      borderRadius: 18,
      border: "2px solid " + c.deep,
      overflow: "hidden"
    }
  },
    React.createElement("button", {
      onClick: function() { setOpen(function(o) { return !o; }); },
      style: {
        width: "100%",
        textAlign: "left",
        background: c.bg,
        border: "none",
        padding: "16px 22px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "inherit"
      }
    },
      React.createElement("span", {
        style: {
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: c.ink
        }
      }, group.title),
      React.createElement("span", {
        style: {
          width: 32,
          height: 32,
          borderRadius: 99,
          background: c.soft,
          border: "1.5px solid " + c.deep,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: c.ink,
          transition: "transform 0.25s",
          transform: open ? "rotate(45deg)" : "none"
        }
      }, "+")
    ),
    open && React.createElement("ul", { style: { padding: "16px 24px 22px", margin: 0 } },
      group.items.map(function(it, i) { return React.createElement(Check, { key: i, color: color }, it); })
    )
  );
}

function StackRow({ item, idx }) {
  var palette = ["sage", "butter", "peach", "lilac", "sky"];
  var color = palette[idx % palette.length];
  var c = COLORS[color];
  return React.createElement(Card, { color: color },
    React.createElement("div", { style: { display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" } },
      React.createElement("div", { style: { flexShrink: 0, minWidth: 140 } },
        React.createElement(Label, { color: color }, item.name),
        React.createElement("div", { style: { fontFamily: "'DM Serif Display', serif", fontSize: 26, lineHeight: 1.1, color: c.ink } }, item.pick)
      ),
      React.createElement("div", { style: { flex: 1, minWidth: 280 } },
        React.createElement("p", { style: { fontSize: 16, lineHeight: 1.55, margin: "0 0 10px", fontFamily: "Inter, sans-serif" } },
          React.createElement("strong", null, "Why:"), " ", item.why
        ),
        item.cost && React.createElement("p", { style: { fontSize: 15, lineHeight: 1.55, margin: "0 0 10px", fontFamily: "Inter, sans-serif", opacity: 0.85 } },
          React.createElement("strong", null, "Cost note:"), " ", item.cost
        ),
        item.switchLabel && [
          React.createElement(Label, { key: "sl", color: color }, item.switchLabel),
          React.createElement("ul", { key: "su", style: { padding: 0, margin: "0 0 10px" } },
            item.switch.map(function(x, i) { return React.createElement(Bullet, { key: i, color: color }, x); })
          )
        ],
        item.alt && React.createElement("p", { style: { fontSize: 15, lineHeight: 1.55, margin: 0, fontFamily: "Inter, sans-serif", opacity: 0.85 } },
          React.createElement("strong", null, "Alternative", item.name === "Database" ? " (auth only)" : "", ":"), " ", item.alt
        ),
        item.alts && [
          React.createElement(Label, { key: "al", color: color }, "Alternatives"),
          React.createElement("ul", { key: "au", style: { padding: 0, margin: 0 } },
            item.alts.map(function(x, i) { return React.createElement(Bullet, { key: i, color: color }, x); })
          )
        ],
        item.ui && React.createElement("p", { style: { fontSize: 15, lineHeight: 1.55, margin: "10px 0 0", fontFamily: "Inter, sans-serif" } },
          React.createElement("strong", null, "UI Components:"), " ", item.ui
        ),
        item.keys && React.createElement("p", { style: { fontSize: 15, lineHeight: 1.55, margin: "10px 0 0", fontFamily: "Inter, sans-serif" } },
          React.createElement("strong", null, "API key handling:"), " ", item.keys
        )
      )
    )
  );
}

function DataTable({ headers, rows, color }) {
  var c = COLORS[color];
  return React.createElement("div", {
    style: {
      border: "2px solid " + c.deep,
      borderRadius: 16,
      overflow: "hidden",
      background: c.soft
    }
  },
    React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr 2fr",
        background: c.bg,
        padding: "12px 18px",
        fontSize: 12,
        letterSpacing: "0.16em",
        fontWeight: 700,
        color: c.ink,
        textTransform: "uppercase",
        fontFamily: "Inter, sans-serif"
      }
    }, headers.map(function(h, i) { return React.createElement("div", { key: i }, h); })),
    rows.map(function(r, i) {
      return React.createElement("div", {
        key: i,
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr 2fr",
          padding: "14px 18px",
          fontSize: 15,
          lineHeight: 1.5,
          borderTop: "1px dashed " + c.deep + "55",
          fontFamily: "Inter, sans-serif",
          color: COLORS.cream.ink
        }
      }, r.map(function(x, j) {
        return React.createElement("div", { key: j, style: { fontWeight: j === 0 ? 600 : 400, paddingRight: 10 } }, x);
      }));
    })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
