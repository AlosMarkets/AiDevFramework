/* Motion & interactivity layer — scroll reveal, parallax, ripples, spring physics */

function useScrollReveal(ref, options) {
  options = options || {};
  const [visible, setVisible] = React.useState(false);
  React.useEffect(function() {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: options.threshold || 0.12, rootMargin: options.margin || "0px 0px -40px 0px" });
    obs.observe(el);
    return function() { obs.disconnect(); };
  }, []);
  return visible;
}

function Reveal(props) {
  var children = props.children, delay = props.delay || 0, direction = props.direction || "up", style = props.style;
  var Tag = props.as || "div";
  var ref = React.useRef(null);
  var visible = useScrollReveal(ref);
  var dirMap = { up: "translateY(28px)", down: "translateY(-28px)", left: "translateX(-28px)", right: "translateX(28px)" };
  return React.createElement(Tag, {
    ref: ref,
    style: Object.assign({
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : (dirMap[direction] || dirMap.up),
      transition: "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) " + delay + "ms, transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) " + delay + "ms"
    }, style || {})
  }, children);
}

function useParallax(speed) {
  speed = speed || 0.15;
  var [offset, setOffset] = React.useState(0);
  React.useEffect(function() {
    var raf;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function() { setOffset(window.scrollY * speed); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return function() { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return offset;
}

function useFloat(speed, amplitude) {
  speed = speed || 1; amplitude = amplitude || 12;
  var [t, setT] = React.useState(0);
  React.useEffect(function() {
    var raf, start = performance.now();
    function loop(now) {
      setT(((now - start) / 1000) * speed);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return function() { cancelAnimationFrame(raf); };
  }, [speed]);
  return { y: Math.sin(t * 1.3) * amplitude, x: Math.cos(t * 0.7) * amplitude * 0.5, rotate: Math.sin(t * 0.5) * 3 };
}

function FloatingBlob(props) {
  var style = props.style || {}, speed = props.speed || 1, amplitude = props.amplitude || 12;
  var f = useFloat(speed, amplitude);
  var p = useParallax(0.08);
  return React.createElement("div", {
    style: Object.assign({
      position: "absolute",
      borderRadius: "50%",
      opacity: 0.85,
      transform: "translate(" + f.x + "px, " + (f.y + p) + "px) rotate(" + f.rotate + "deg)",
      transition: "transform 0.1s linear"
    }, style)
  });
}

function useRipple() {
  var [ripples, setRipples] = React.useState([]);
  function create(e) {
    var rect = e.currentTarget.getBoundingClientRect();
    var x = e.clientX - rect.left, y = e.clientY - rect.top;
    var id = Date.now() + Math.random();
    setRipples(function(prev) { return prev.concat([{ id: id, x: x, y: y }]); });
    setTimeout(function() { setRipples(function(prev) { return prev.filter(function(r) { return r.id !== id; }); }); }, 700);
  }
  return { ripples: ripples, onMouseDown: create };
}

function RippleContainer(props) {
  var ripples = props.ripples || [], style = props.style || {};
  return React.createElement("span", {
    "aria-hidden": true,
    style: Object.assign({
      position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit", pointerEvents: "none", zIndex: 0
    }, style)
  }, ripples.map(function(r) {
    return React.createElement("span", {
      key: r.id,
      style: {
        position: "absolute", left: r.x - 20, top: r.y - 20,
        width: 40, height: 40, borderRadius: "50%",
        background: "rgba(255,255,255,0.35)",
        transform: "scale(0)", animation: "ripple-out 0.6s ease-out forwards"
      }
    });
  }));
}

function useSpringToggle(open, stiffness, damping) {
  stiffness = stiffness || 180; damping = damping || 20;
  var [animOpen, setAnimOpen] = React.useState(open);
  var [height, setHeight] = React.useState(open ? "auto" : 0);
  var contentRef = React.useRef(null);
  var velocityRef = React.useRef(0);
  var rafRef = React.useRef(null);
  var targetRef = React.useRef(open ? 1 : 0);
  var currentRef = React.useRef(open ? 1 : 0);

  React.useEffect(function() {
    targetRef.current = open ? 1 : 0;
    var content = contentRef.current;
    if (!content) return;
    var fullHeight = content.scrollHeight;

    function step() {
      var current = currentRef.current;
      var target = targetRef.current;
      var force = (target - current) * stiffness;
      var vel = velocityRef.current + force * 0.016;
      vel *= Math.exp(-damping * 0.016);
      velocityRef.current = vel;
      currentRef.current = current + vel * 0.016;

      if (Math.abs(target - currentRef.current) < 0.001 && Math.abs(vel) < 0.01) {
        currentRef.current = target;
        setHeight(target > 0.5 ? "auto" : 0);
        setAnimOpen(target > 0.5);
        return;
      }
      setHeight(currentRef.current * fullHeight);
      setAnimOpen(currentRef.current > 0.01);
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return function() { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [open, stiffness, damping]);

  return { height: height, animOpen: animOpen, contentRef: contentRef };
}

function SideParticles() {
  var colors = [
    "#FFEFB5", "#E8B84A", "#D4E8C8", "#7AAA5C",
    "#FFD9C2", "#E68A5C", "#E0D4F0", "#9577C8",
    "#C8E0F0", "#5C9CC8"
  ];
  var particlesRef = React.useRef([]);
  var rafRef = React.useRef(null);
  var [_, forceRender] = React.useState(0);

  React.useEffect(function() {
    var marginWidth = Math.max(40, (window.innerWidth - 980) / 2);
    if (marginWidth < 30) marginWidth = 30;

    function spawn() {
      var side = Math.random() < 0.5 ? "left" : "right";
      var x = side === "left"
        ? Math.random() * marginWidth * 0.85
        : window.innerWidth - Math.random() * marginWidth * 0.85;
      var size = 8 + Math.random() * 18;
      var color = colors[Math.floor(Math.random() * colors.length)];
      var speed = 0.15 + Math.random() * 0.35;
      var swayAmp = 10 + Math.random() * 25;
      var swaySpeed = 0.3 + Math.random() * 0.6;
      var maxOpacity = 0.18 + Math.random() * 0.22;
      var shape = Math.random() < 0.5 ? "circle" : "rounded";
      var borderRadius = shape === "circle" ? "50%" : (4 + Math.random() * 10) + "px";
      var rotation = Math.random() * 360;
      var rotSpeed = (Math.random() - 0.5) * 0.4;

      particlesRef.current.push({
        x: x, y: -size - Math.random() * 200,
        size: size, color: color, speed: speed,
        swayAmp: swayAmp, swaySpeed: swaySpeed,
        opacity: 0, maxOpacity: maxOpacity,
        borderRadius: borderRadius, rotation: rotation,
        rotSpeed: rotSpeed, life: 0, maxLife: 8 + Math.random() * 14
      });

      if (particlesRef.current.length > 18) particlesRef.current.shift();
    }

    spawn();
    var spawnInterval = setInterval(spawn, 1800 + Math.random() * 2200);

    function tick() {
      var docH = document.documentElement.scrollHeight;
      var viewH = window.innerHeight;
      var scrollY = window.scrollY;
      var changed = false;

      for (var i = particlesRef.current.length - 1; i >= 0; i--) {
        var p = particlesRef.current[i];
        p.life += 0.016;
        p.y += p.speed;
        p.rotation += p.rotSpeed;
        p.x += Math.sin(p.life * p.swaySpeed) * 0.03;

        var fadeIn = Math.min(1, p.life / 2.5);
        var fadeOut = p.life > p.maxLife - 3 ? Math.max(0, (p.maxLife - p.life) / 3) : 1;
        p.opacity = p.maxOpacity * fadeIn * fadeOut;

        if (p.life > p.maxLife || p.y > docH + 100) {
          particlesRef.current.splice(i, 1);
          changed = true;
        }
      }

      forceRender(function(r) { return r + 1; });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return function() {
      clearInterval(spawnInterval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden"
    }
  }, particlesRef.current.map(function(p, i) {
    return React.createElement("div", {
      key: i,
      style: {
        position: "absolute",
        left: p.x, top: p.y,
        width: p.size, height: p.size,
        borderRadius: p.borderRadius,
        background: p.color,
        opacity: p.opacity,
        transform: "rotate(" + p.rotation + "deg)",
        filter: "blur(0.5px)"
      }
    });
  }));
}

window.Reveal = Reveal;
window.FloatingBlob = FloatingBlob;
window.SideParticles = SideParticles;
window.useRipple = useRipple;
window.RippleContainer = RippleContainer;
window.useSpringToggle = useSpringToggle;
window.useParallax = useParallax;
window.useFloat = useFloat;
