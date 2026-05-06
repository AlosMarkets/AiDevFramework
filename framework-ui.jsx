/* Reusable bits — pills, checks, expandable section wrapper */

const COLORS = {
  butter: { bg: "#FFEFB5", deep: "#E8B84A", ink: "#5C4416", soft: "#FFF8DC" },
  sage:   { bg: "#D4E8C8", deep: "#7AAA5C", ink: "#2E4A1F", soft: "#EFF6E8" },
  peach:  { bg: "#FFD9C2", deep: "#E68A5C", ink: "#5C2A14", soft: "#FFEFE2" },
  lilac:  { bg: "#E0D4F0", deep: "#9577C8", ink: "#3D2A5C", soft: "#F2EBFA" },
  sky:    { bg: "#C8E0F0", deep: "#5C9CC8", ink: "#163A5C", soft: "#E5F0F8" },
  cream:  { bg: "#FBF6E9", deep: "#3D3528", ink: "#2A2418", soft: "#FFFCF2" },
};

function Pill({ children, color = "cream", small }) {
  const c = COLORS[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: small ? "4px 10px" : "6px 14px",
        background: c.bg,
        color: c.ink,
        borderRadius: 999,
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {children}
    </span>
  );
}

function Check({ color = "sage", children }) {
  const c = COLORS[color];
  return (
    <li
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "8px 0",
        fontSize: 16,
        lineHeight: 1.55,
        listStyle: "none",
      }}
    >
      <span
        aria-hidden
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: 7,
          background: c.bg,
          color: c.ink,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          marginTop: 2,
        }}
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

function Bullet({ color = "cream", children }) {
  const c = COLORS[color];
  return (
    <li
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "6px 0",
        fontSize: 16,
        lineHeight: 1.55,
        listStyle: "none",
      }}
    >
      <span
        aria-hidden
        style={{
          flexShrink: 0,
          width: 8,
          height: 8,
          borderRadius: 99,
          background: c.deep,
          marginTop: 11,
        }}
      />
      <span>{children}</span>
    </li>
  );
}

function Section({ id, eyebrow, title, color = "cream", children, big }) {
  const c = COLORS[color];
  return (
    <section
      id={id}
      style={{
        padding: big ? "100px 0 60px" : "70px 0 30px",
        scrollMarginTop: 24,
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 28px" }}>
        {eyebrow && (
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: c.deep,
              fontWeight: 700,
              marginBottom: 14,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {eyebrow}
          </div>
        )}
        {title && (
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: big ? 64 : 44,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: "0 0 28px",
              color: COLORS.cream.ink,
              textWrap: "balance",
            }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

function Prose({ children }) {
  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 18,
        lineHeight: 1.65,
        color: "#3D3528",
      }}
    >
      {children}
    </div>
  );
}

function Card({ color = "cream", children, style }) {
  const c = COLORS[color];
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: c.soft,
        border: `2px solid ${c.deep}`,
        borderRadius: 22,
        padding: "26px 28px",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `4px 6px 0 ${c.deep}` : "none",
        transition: "transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.25s cubic-bezier(0.22, 0.61, 0.36, 1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

Object.assign(window, { COLORS, Pill, Check, Bullet, Section, Prose, Card });
