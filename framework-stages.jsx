/* The five stage cards — exact copy from the source file. Expandable. */

function StageCard({ stage }) {
  const [open, setOpen] = React.useState(true);
  const c = window.COLORS[stage.color];
  const { Pill, Bullet, Check } = window;
  const { height, animOpen, contentRef } = window.useSpringToggle(open, 160, 18);

  return (
    <div
      id={`stage-${stage.n}`}
      style={{
        position: "relative",
        background: c.soft,
        border: `2px solid ${c.deep}`,
        borderRadius: 28,
        marginBottom: 24,
        overflow: "hidden",
        scrollMarginTop: 24,
        boxShadow: `6px 6px 0 ${c.deep}`,
      }}
    >
      {/* header */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          textAlign: "left",
          background: c.bg,
          border: "none",
          borderBottom: open ? `2px solid ${c.deep}` : "none",
          padding: "26px 32px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          fontFamily: "inherit",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: c.deep,
              color: c.soft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Serif Display', serif",
              fontSize: 34,
              fontWeight: 400,
              flexShrink: 0,
            }}
          >
            {stage.n}
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                color: c.ink,
                fontWeight: 700,
                opacity: 0.65,
                marginBottom: 4,
              }}
            >
              STAGE {stage.n} {stage.glyph}
            </div>
            <div
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 36,
                lineHeight: 1,
                color: c.ink,
                letterSpacing: "-0.01em",
              }}
            >
              {stage.title}
            </div>
          </div>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 99,
            background: c.soft,
            border: `2px solid ${c.deep}`,
            color: c.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            transition: "transform 0.3s",
            transform: open ? "rotate(45deg)" : "none",
            flexShrink: 0,
          }}
        >
          +
        </div>
      </button>

      {/* body — spring animated */}
      <div
        style={{
          height: height,
          overflow: "hidden",
          transition: "none",
        }}
      >
        <div
          ref={contentRef}
          style={{
            padding: "28px 32px 32px",
            color: window.COLORS.cream.ink,
            opacity: animOpen ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          {/* Who */}
          <div style={{ marginBottom: 22 }}>
            <Label color={stage.color}>Who does it</Label>
            <div style={{ fontSize: 17, lineHeight: 1.5, fontFamily: "Inter, sans-serif" }}>
              {stage.who}
            </div>
          </div>

          {/* What happens */}
          <div style={{ marginBottom: 22 }}>
            <Label color={stage.color}>What happens</Label>
            <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 10px" }}>
              {stage.whatHappens}
            </p>
            {stage.whatHappensList && (
              <ul style={{ padding: 0, margin: "8px 0 0" }}>
                {stage.whatHappensList.map((x, i) => (
                  <Bullet key={i} color={stage.color}>{x}</Bullet>
                ))}
              </ul>
            )}
            {stage.whatHappensExtra && (
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: "12px 0 0" }}>
                {stage.whatHappensExtra}
              </p>
            )}
          </div>

          {/* Produce */}
          {stage.produceLabel && (
            <div style={{ marginBottom: 22 }}>
              <Label color={stage.color}>{stage.produceLabel.replace(":", "")}</Label>
              {stage.produceIntro && (
                <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 10px" }}>
                  {stage.produceIntro}
                </p>
              )}
              {stage.produceList && (
                <ul style={{ padding: 0, margin: 0 }}>
                  {stage.produceList.map((x, i) => (
                    <Bullet key={i} color={stage.color}>{x}</Bullet>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Checkpoint */}
          <div
            style={{
              background: c.bg,
              borderRadius: 16,
              padding: "20px 24px",
              border: `2px dashed ${c.deep}`,
              marginTop: 8,
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                color: c.ink,
                fontWeight: 700,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16 }}>♥</span>
              {(stage.checkpointLabel || "Human checkpoint").toUpperCase().replace(":", "")}
            </div>
            {stage.checkpointIntro && (
              <p style={{ fontSize: 16, lineHeight: 1.55, margin: "0 0 10px" }}>
                {stage.checkpointIntro}
              </p>
            )}
            {stage.checkpointList && (
              <ul style={{ padding: 0, margin: "0 0 12px" }}>
                {stage.checkpointList.map((x, i) => (
                  <Bullet key={i} color={stage.color}>{x}</Bullet>
                ))}
              </ul>
            )}
            <p style={{ fontSize: 16, lineHeight: 1.55, margin: 0 }}>
              {stage.checkpoint}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ color, children }) {
  const c = window.COLORS[color];
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: "0.2em",
        color: c.deep,
        fontWeight: 700,
        marginBottom: 8,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {children}
    </div>
  );
}

window.StageCard = StageCard;
window.StageLabel = Label;
