'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const heroTitles = [
  { sub: "HI, I'M ANGEL TODARIYA", main: "DATA SCIENTIST" },
  { sub: "HI, I'M ANGEL TODARIYA", main: "AI ENGINEER" },
  { sub: "HI, I'M ANGEL TODARIYA", main: "GENERATIVE AI ENGINEER" }
];

const technologies = [
  "Python (Advanced)", "SQL (Proficient)", "R", "Bash", "Git/GitHub",
  "Pandas", "NumPy", "Scikit-Learn", "SciPy", "NLTK", "TensorFlow", "PyTorch",
  "Power BI", "Tableau", "Matplotlib", "Seaborn", "MS Excel",
  "LangChain", "OpenAI API", "Vector Databases (ChromaDB)", "Hugging Face Transformers"
];

// Interactive Custom Motion Cursor Component
function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('card-hover-box')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#38bdf8',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        animate={{
          x: cursorPos.x - 4,
          y: cursorPos.y - 4,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          border: '1px solid rgba(56, 189, 248, 0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        animate={{
          x: cursorPos.x - (isHovered ? 24 : 16),
          y: cursorPos.y - (isHovered ? 24 : 16),
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          backgroundColor: isHovered ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
          borderColor: isHovered ? '#38bdf8' : 'rgba(255, 255, 255, 0.3)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      />
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'angel', text: "Hi! I'm Angel's AI assistant. Ask me anything about her B.Sc. (Hons) curriculum at IIT Guwahati, her projects, tech stack, soft skills, or how to navigate this website!" }
  ]);
  const [input, setInput] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // DIGITAL MATRIX RAIN / DATA STREAM CANVAS
  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track cursor for glowing data interactive effect
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];
    
    // Characters used in the matrix rain: binary, hex, math, and data symbols
    const chars = '01101001010100101010110101010xFF4A89C190λΣ∏∇∂∫';

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    const render = () => {
      // Soft dark fade trail
      ctx.fillStyle = 'rgba(8, 8, 8, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interactive mouse glow (Cyan/Bright Blue near cursor, soft Violet/Green further away)
        if (dist < 150) {
          ctx.fillStyle = '#38bdf8'; // Bright cyan charge
        } else if (Math.random() > 0.95) {
          ctx.fillStyle = '#ffffff'; // White lead spark
        } else {
          ctx.fillStyle = 'rgba(139, 92, 246, 0.45)'; // Soft neon purple stream
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % heroTitles.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [20, -20]);
  const rotateY = useTransform(x, [-150, 150], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let reply = "I'm Angel Todariya's AI assistant! Ask me about her IIT Guwahati degree, curriculum, projects, soft skills, or how to navigate this portfolio website!";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('project') || lower.includes('guardrail') || lower.includes('gateway')) {
        reply = "Angel built the **AI Guardrail Gateway**: an enterprise-grade LLM proxy control plane built with FastAPI and Docker. It features real-time semantic **Input Defense** (blocking prompt injections/jailbreaks), **Privacy Guardrails** (automated regex and BERT-based PII entity redaction), and **Output Validation** (rigid schema enforcement and hallucination checks).";
      } else if (lower.includes('ecommerce') || lower.includes('pipeline') || lower.includes('analytics')) {
        reply = "Angel built the **End-to-End E-Commerce Data Engineering & Analytics Pipeline**: built with Python and PostgreSQL to ingest raw logs, structure relational schemas, execute complex SQL CTEs, and perform mathematical hypothesis checks (Independent T-Tests) using SciPy.";
      } else if (lower.includes('skill') || lower.includes('python') || lower.includes('stack') || lower.includes('tech') || lower.includes('tools')) {
        reply = "Angel's technical stack includes **Languages & Core:** Python (Advanced), SQL (Proficient), R, Bash, Git/GitHub. **Libraries & Frameworks:** Pandas, NumPy, Scikit-Learn, SciPy, NLTK, TensorFlow, PyTorch. **Visualization:** Power BI, Tableau, Matplotlib, Seaborn, MS Excel. **Generative AI:** LangChain, OpenAI API, Vector Databases (ChromaDB), Hugging Face Transformers.";
      } else if (lower.includes('education') || lower.includes('iit') || lower.includes('guwahati') || lower.includes('degree') || lower.includes('curriculum')) {
        reply = "Angel is pursuing a prestigious B.Sc. (Hons) in Data Science and Artificial Intelligence at the **Indian Institute of Technology (IIT) Guwahati**, expected to complete by September 2030. Her rigorous curriculum covers Data Structures and Algorithms, Machine Learning, Deep Learning, Linear Algebra, Statistics, Probability, and AI Ethics.";
      } else if (lower.includes('soft skill') || lower.includes('communication') || lower.includes('collaborat') || lower.includes('personality')) {
        reply = "Angel is an exceptionally strong communicator and collaborative team player. She combines deep technical mastery with clear, articulate communication, enabling her to bridge complex engineering architectures with business goals seamlessly.";
      } else if (lower.includes('certificate') || lower.includes('ibm') || lower.includes('credly') || lower.includes('genai')) {
        reply = "Angel holds the **IBM Generative AI Essentials: Using LLMs to work with Data** certification. You can check her verified Credly badge directly in the Certifications section!";
      } else if (lower.includes('website') || lower.includes('navigate') || lower.includes('portfolio') || lower.includes('feature') || lower.includes('guide')) {
        reply = "This dark-mode portfolio features: 1) A dynamic rotating title hero section with an interactive 3D 360-degree tilt photo card on the right; 2) An interactive Digital Matrix Rain data background; 3) Detailed Education and Certifications sections with your verified IBM Credly badge link; 4) A Technologies grid and Featured Projects; and 5) A glassmorphic Contact form.";
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('hire') || lower.includes('opportunity')) {
        reply = "You can reach Angel directly via email at todariyaangel@gmail.com or phone at 9958799930. Her professional links include LinkedIn (linkedin.com/in/angel-todariya) and GitHub (github.com/todariyaangel).";
      }
      
      setMessages((prev) => [...prev, { sender: 'angel', text: reply }]);
    }, 600);
  };

  return (
    <div style={{ backgroundColor: '#080808', color: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      <CustomCursor />

      {mounted && (
        <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }} />
      )}

      <div style={{ position: 'absolute', top: '10%', left: '30%', width: '400px', height: '400px', backgroundColor: 'rgba(120, 50, 255, 0.12)', filter: 'blur(130px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 2 }}></div>
      <div style={{ position: 'absolute', top: '40%', right: '20%', width: '450px', height: '450px', backgroundColor: 'rgba(50, 120, 255, 0.1)', filter: 'blur(140px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 2 }}></div>

      {/* Navigation Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(8, 8, 8, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '13px', textTransform: 'uppercase' }}>ANGEL TODARIYA</span>
        <nav style={{ display: 'flex', gap: '28px', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#a1a1aa' }}>
          <a href="#home" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Home</a>
          <a href="#about" style={{ color: '#a1a1aa', textDecoration: 'none' }}>About</a>
          <a href="#education" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Education</a>
          <a href="#certifications" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Certifications</a>
          <a href="#skills" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Skills</a>
          <a href="#projects" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Projects</a>
        </nav>
        <a href="#contact" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '8px 20px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', textDecoration: 'none' }}>CONTACT</a>
      </header>

      {/* Hero Section */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 40px 60px', position: 'relative', zIndex: 10, maxWidth: '1300px', margin: '0 auto', gap: '60px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ height: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTitle}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ color: '#71717a', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '12px', fontWeight: 600, marginBottom: '10px' }}>
                  {heroTitles[currentTitle].sub}
                </div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-1px', margin: 0, color: '#ffffff', lineHeight: 1.1 }}>
                  {heroTitles[currentTitle].main}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>
          <p style={{ fontSize: '11px', color: '#71717a', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '32px' }}>↓ Scroll to explore portfolio</p>
        </div>

        <div style={{ perspective: '1000px', flexShrink: 0 }}>
          <motion.div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="card-hover-box"
          >
            <img 
              src="/angel-avatar.png" 
              alt="Angel Todariya" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', textAlign: 'left', pointerEvents: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                <span style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#d4d4d8', fontWeight: 600 }}>Open to Opportunities</span>
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', margin: '4px 0 2px', color: '#ffffff' }}>Angel Todariya</h4>
              <p style={{ fontSize: '12px', color: '#a1a1aa', margin: 0 }}>B.Sc. (Hons) Data Science & AI @ IIT Guwahati • 2030</p>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Overview / Introduction Section */}
      <section id="about" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 10 }}>
        <div style={{ color: '#71717a', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '11px', marginBottom: '8px' }}>//@ Overview</div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '28px' }}>Introduction</h2>
        
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px', backdropFilter: 'blur(8px)' }}>
          <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#e4e4e7', margin: '0 0 24px', fontWeight: 300 }}>
            I am a passionate <strong style={{ color: '#ffffff', fontWeight: 600 }}>Data Scientist & AI Engineer</strong> currently pursuing a B.Sc. (Hons) in Data Science and Artificial Intelligence at the <strong style={{ color: '#f59e0b', fontWeight: 600 }}>Indian Institute of Technology (IIT) Guwahati</strong>. My work sits at the intersection of mathematically rigorous machine learning algorithms and production-ready enterprise infrastructure.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#a1a1aa', margin: 0 }}>
            From engineering enterprise-grade <span style={{ color: '#38bdf8' }}>AI Guardrail Gateways</span> that protect LLMs against prompt injection attacks to constructing robust end-to-end data pipelines and hypothesis testing suites, I build scalable, ethical, and performant AI solutions that solve complex real-world challenges.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '36px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b' }}>IIT Guwahati</div>
              <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>B.Sc. (Hons) DS & AI</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#38bdf8' }}>LLM & GenAI</div>
              <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Guardrails & Redaction</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#10b981' }}>IBM Certified</div>
              <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Generative AI Essentials</div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 10 }}>
        <div style={{ color: '#71717a', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '11px', marginBottom: '8px' }}>//@ Academic Path</div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>Education</h2>
        
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#71717a', display: 'block', marginBottom: '6px' }}>// DEGREE</span>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>B.Sc. (Hons) in Data Science and Artificial Intelligence</h3>
              <p style={{ color: '#f59e0b', fontSize: '15px', fontWeight: 600, margin: '6px 0 0' }}>Indian Institute of Technology Guwahati</p>
            </div>
            <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>
              Expected to be completed by Sep 2030
            </span>
          </div>
          <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: '1.7', marginTop: '16px', margin: 0 }}>
            <strong>Key Coursework:</strong> Data Structures and Algorithms, Machine Learning, Deep Learning, Linear Algebra, Statistics, Probability, AI Ethics.
          </p>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 10 }}>
        <div style={{ color: '#71717a', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '11px', marginBottom: '8px' }}>//@ Credentials</div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>Certifications</h2>
        
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#71717a', display: 'block', marginBottom: '6px' }}>// CERTIFICATION</span>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 8px' }}>IBM Generative AI Essentials</h3>
            <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: '1.7', margin: '0 0 20px' }}>
              <strong>Using LLMs to work with Data</strong> — Professional credential focusing on practical application of Large Language Models and data analytics.
            </p>
          </div>
          <a 
            href="https://www.credly.com/badges/10c9b627-a365-4378-a112-8947f0b15ee0/public_url" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none', width: 'fit-content' }}
          >
            View Credential Badge →
          </a>
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 10 }}>
        <div style={{ color: '#71717a', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '11px', marginBottom: '8px' }}>//@ System Stack</div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>Technologies I Work With</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {technologies.map((tech, idx) => (
            <div key={idx} style={{ padding: '12px 24px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#e4e4e7', fontSize: '14px', fontWeight: 500 }}>
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 10 }}>
        <div style={{ color: '#71717a', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '11px', marginBottom: '8px' }}>//@ Production Build</div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>Featured Engineering Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#71717a', display: 'block', marginBottom: '8px' }}>// PROJECT 01</span>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>AI Guardrail Gateway</h3>
              <p style={{ color: '#a1a1aa', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
                An enterprise-grade LLM proxy control plane built with FastAPI and Docker to detect prompt injections, redact PII, and enforce structural output guardrails in real-time.
              </p>
            </div>
            <a href="https://github.com/todariyaangel/ai-guardrail-gateway.git" target="_blank" style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none' }}>View Repository →</a>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#71717a', display: 'block', marginBottom: '8px' }}>// PROJECT 02</span>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>E-Commerce Data Pipeline</h3>
              <p style={{ color: '#a1a1aa', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
                An end-to-end data pipeline built with Python and PostgreSQL that ingests raw e-commerce logs, structures a relational database, and applies advanced SQL and statistical testing (SciPy).
              </p>
            </div>
            <a href="https://github.com/todariyaangel/ecommerce-analytics-pipeline.git" target="_blank" style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none' }}>View Repository →</a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 10 }}>
        <div style={{ color: '#71717a', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '11px', marginBottom: '8px' }}>//@ Get In Touch</div>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px' }}>Let's Build Something Exceptional.</h2>
        <form onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input type="text" placeholder="First Name" required style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: '#ffffff', outline: 'none' }} />
            <input type="text" placeholder="Last Name" required style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: '#ffffff', outline: 'none' }} />
          </div>
          <input type="email" placeholder="Email Address" required style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: '#ffffff', outline: 'none' }} />
          <textarea rows={4} placeholder="Your Message" required style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: '#ffffff', outline: 'none' }}></textarea>
          <button type="submit" style={{ backgroundColor: '#ffffff', color: '#000000', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>Send Message</button>
        </form>
      </section>

      {/* Floating Chatbot Widget */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px 10px 10px', borderRadius: '999px', cursor: 'pointer', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.4)' }}>
              <img src="/angel-avatar.png" alt="Angel" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px' }}>Chat with Angel</span>
          </button>
        ) : (
          <div style={{ width: '340px', height: '480px', backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }}>
            <div style={{ padding: '16px', backgroundColor: '#18181b', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.4)' }}>
                  <img src="/angel-avatar.png" alt="Angel" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: '13px', color: '#ffffff' }}>Angel AI Assistant</h5>
                  <span style={{ fontSize: '10px', color: '#34d399' }}>● Online</span>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: '16px', fontSize: '12px', lineHeight: '1.5', backgroundColor: m.sender === 'user' ? '#ffffff' : '#18181b', color: m.sender === 'user' ? '#000000' : '#e4e4e7', border: m.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSend} style={{ padding: '12px', backgroundColor: '#18181b', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects, skills..." 
                style={{ flex: 1, backgroundColor: '#000000', color: '#ffffff', fontSize: '12px', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', outline: 'none' }}
              />
              <button type="submit" style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none', borderRadius: '10px', padding: '0 14px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Send</button>
            </form>
          </div>
        )}
      </div>

      <style jsx global>{`
        .card-hover-box {
          position: relative;
          width: 320px;
          height: 420px;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background-color: #18181b;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}