import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  Terminal,
  X,
  Zap,
} from 'lucide-react';

import {
  courses,
  interests,
  profile,
  projects,
  skillGroups,
  softSkills,
} from './data/portfolio';

const nav = [
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Experience', 'experience'],
  ['Projects', 'projects'],
  ['Learning', 'learning'],
  ['Contact', 'contact'],
];

const filters = ['All', 'AI/ML', 'Generative AI', 'Power BI', 'Full-Stack'];

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

type FormState =
  | 'idle'
  | 'sending'
  | 'success'
  | 'error'
  | 'unconfigured';

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');
  const [skillQuery, setSkillQuery] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [mobile, setMobile] = useState('');
  const [purpose, setPurpose] = useState('Job Opportunity');

  // FastAPI backend endpoint
  const endpoint = `${
    import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
  }/contact`;

  const visibleProjects = useMemo(
    () =>
      projects.filter(
        (project) => filter === 'All' || project.category === filter,
      ),
    [filter],
  );

  const visibleSkills = useMemo(
    () =>
      skillGroups.filter(
        (group) =>
          (skillFilter === 'All' || group.level === skillFilter) &&
          `${group.name} ${group.skills.join(' ')}`
            .toLowerCase()
            .includes(skillQuery.toLowerCase()),
      ),
    [skillFilter, skillQuery],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    // Browser validation
    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);

    // Basic honeypot protection
    if (String(data.get('_gotcha') || '').trim()) {
      form.reset();
      setMobile('');
      setPurpose('Job Opportunity');
      setFormState('success');
      return;
    }

    const payload = {
      full_name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      mobile_number: String(data.get('mobile') || '').trim() || null,
      company_name: String(data.get('company') || '').trim() || null,
      purpose: String(data.get('purpose') || 'General Inquiry'),
      project_details: String(data.get('details') || '').trim() || null,
      message: String(data.get('message') || '').trim(),
    };

    setFormState('sending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend response:', errorText);
        throw new Error(`Contact request failed: ${response.status}`);
      }

      setFormState('success');
      form.reset();
      setMobile('');
      setPurpose('Job Opportunity');
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setFormState('error');
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sanket Patil home">
          <span className="brand-mark">
            SP<span> </span>
          </span>
          <span className="brand-caption">
            PORTFOLIO <i>2026</i>
          </span>
        </a>

        <nav
          className={`nav-links ${menuOpen ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          {nav.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label={
              dark ? 'Switch to light theme' : 'Switch to dark theme'
            }
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a className="header-cta" href="#contact">
            Let's talk <ArrowUpRight size={15} />
          </a>

          <button
            className="icon-button menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability">
              <span className="status-dot" />
              GENERATIVE AI INTERN
              <span className="availability-line" />
            </div>

            <p className="hero-kicker">HELLO, I'M</p>

            <h1>
              Sanket
              <br />
              <span>Patil </span>
            </h1>

            <p className="hero-description">
              I build with <em>Python</em>, explore <em>Generative AI</em>, and
              turn ideas into useful digital experiences.
            </p>

           <div className="hero-meta">
           <span className="hero-location">
           <MapPin size={15} strokeWidth={1.8} />
            Pune, Maharashtra, India
         </span>

  <span>Building with Python. Exploring AI. Solving Real-World Problems.</span>
</div>

            <div className="hero-buttons">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowDownRight size={17} />
              </a>

              <a className="button button-quiet" href={profile.resume} download>
                Resume <Download size={16} />
              </a>
            </div>

            <div className="hero-socials">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub <ArrowUpRight size={12} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={17} /> LinkedIn <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          <div
            className="hero-art"
            aria-label="Profile image and technology illustration"
          >
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-grid" />
            <div className="art-index">
              FIG. 01 <span>PROFILE STUDY</span>
            </div>

            <div className="portrait-frame">
              <img
                src={profile.photo}
                alt="Sanket Patil profile photo"
              />
              <div className="portrait-caption">
                <span>SP / 26</span>
                <span>
                  DEVELOPER
                  <br />
                  IN PROGRESS
                </span>
              </div>
            </div>

            <div className="floating-chip chip-python">
              <span className="chip-symbol">Py</span>
              <span>
                <b>Python</b>
                <small>Everyday toolkit</small>
              </span>
            </div>

            <div className="floating-chip chip-ai">
              <Sparkles size={17} />
              <span>
                <b>Generative AI</b>
                <small>Exploring the frontier</small>
              </span>
            </div>

            <div className="art-coordinates">
              18°31' N
              <br />
              73°51' E
            </div>

            <div className="art-note">
              BUILD / LEARN / ITERATE <ArrowUpRight size={13} />
            </div>
          </div>

          <div className="hero-bottomline">
            <span>01 — INTRODUCTION</span>
            <span>
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </span>
            <span>PYTHON · AI · DATA · WEB</span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about section-wrap section-pad" id="about">
          <div className="section-index">
            01 <span>ABOUT</span>
          </div>

          <div className="about-grid">
            <SectionHeading
              eyebrow="A LITTLE ABOUT ME"
              title={
                <>
                  Curiosity, meet
                  <br />
                  <span className="serif-accent">execution.</span>
                </>
              }
              copy="A computer science graduate who likes understanding how things work—and making them work."
            />

            <div className="about-content">
              <p className="lead-copy">
                Hi, I'm Sanket Patil, a Computer Science graduate and
                Generative AI Intern based in Pune, Maharashtra. I'm interested
                in Python development, Artificial Intelligence, Machine
                Learning, Generative AI, Data Analytics, Data Engineering, and
                Full-Stack Development.
              </p>

              <p>
                I enjoy exploring new technologies, developing practical
                applications, and building intelligent software solutions.
                I’m continuously improving my technical skills through
                hands-on projects and professional learning.
              </p>

              <div className="about-facts">
                <div>
                  <span>01 / CURRENT ROLE</span>
                  <b>Generative AI Intern</b>
                </div>
                <div>
                  <span>02 / EDUCATION</span>
                  <b>B.Sc. Computer Science</b>
                </div>
                <div>
                  <span>03 / WORKING STYLE</span>
                  <b>Learn by building</b>
                </div>
                <div>
                  <span>04 / BASE</span>
                  <b>Pune, Maharashtra</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="skills-section section-pad" id="skills">
          <div className="section-wrap">
            <div className="section-index">
              02 <span>CAPABILITIES</span>
            </div>

            <SectionHeading
              eyebrow="TOOLS I WORK WITH"
              title={
                <>
                  A growing <span className="serif-accent">toolkit.</span>
                </>
              }
              copy="A transparent view of the technologies I work with, know the basics of, or am actively learning."
            />

            <div className="skill-controls">
              <div
                className="skill-filters"
                role="group"
                aria-label="Filter skills by familiarity"
              >
                {['All', 'Hands-on', 'Familiar', 'Currently Learning'].map(
                  (skill) => (
                    <button
                      key={skill}
                      className={skillFilter === skill ? 'active' : ''}
                      onClick={() => setSkillFilter(skill)}
                    >
                      {skill}
                    </button>
                  ),
                )}
              </div>

              <label className="search-box">
                <Code2 size={15} />
                <input
                  value={skillQuery}
                  onChange={(event) => setSkillQuery(event.target.value)}
                  placeholder="Find a technology…"
                  aria-label="Search technologies"
                />

                {skillQuery && (
                  <button
                    onClick={() => setSkillQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
              </label>
            </div>

            <div className="skill-grid">
              {visibleSkills.map((group, index) => (
                <article
                  className="skill-card"
                  key={`${group.name}-${group.level}-${index}`}
                >
                  <div className="skill-card-top">
                    <span className="skill-icon">
                      {index % 4 === 0 ? (
                        <Terminal size={18} />
                      ) : index % 4 === 1 ? (
                        <Code2 size={18} />
                      ) : index % 4 === 2 ? (
                        <Database size={18} />
                      ) : (
                        <Layers3 size={18} />
                      )}
                    </span>

                    <span
                      className={`level-tag ${
                        group.level === 'Hands-on'
                          ? 'level-hands'
                          : group.level === 'Familiar'
                            ? 'level-familiar'
                            : 'level-learning'
                      }`}
                    >
                      {group.level}
                    </span>
                  </div>

                  <h3>{group.name}</h3>

                  <div className="skill-tags">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <p className="skill-footnote">
              <span className="status-dot" />
              Skill labels are intentionally qualitative—not proficiency scores
              or years of experience.
            </p>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          className="experience section-wrap section-pad"
          id="experience"
        >
          <div className="section-index">
            03 <span>EXPERIENCE</span>
          </div>

          <div className="experience-layout">
            <SectionHeading
              eyebrow="WHERE I'M GROWING"
              title={
                <>
                  Learning by
                  <br />
                  <span className="serif-accent">doing.</span>
                </>
              }
              copy="Professional experience focused on practical AI workflows and reliable implementation."
            />

            <article className="experience-card">
              <div className="experience-date">
                <span>APR 2026</span>
                <span className="date-rule" />
                <span>PRESENT</span>
              </div>

              <div className="experience-main">
                <div className="experience-title-row">
                  <div>
                    <span className="role-label">
                      <BriefcaseBusiness size={14} /> INTERNSHIP
                    </span>

                    <h3>Generative AI Intern</h3>
                    <p className="company">
                      Microdynamic Software Private Limited
                    </p>
                    <p className="muted">Pune Division, Maharashtra, India</p>
                  </div>

                  <span className="current-badge">
                    <span className="status-dot" /> Current
                  </span>
                </div>

                <p className="experience-intro">
                  Working alongside senior team members to explore and
                  implement practical Python-based Generative AI workflows.
                </p>

                <ul className="check-list">
                  <li>
                    <Check size={15} /> Work with Python-based Generative AI
                    workflows.
                  </li>
                  <li>
                    <Check size={15} /> Explore and integrate Large Language
                    Model APIs.
                  </li>
                  <li>
                    <Check size={15} /> Work with prompt engineering,
                    embeddings, and RAG concepts.
                  </li>
                  <li>
                    <Check size={15} /> Test and validate AI-generated
                    responses.
                  </li>
                  <li>
                    <Check size={15} /> Document technical implementations
                    and collaborate on requirements.
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="projects-section section-pad" id="projects">
          <div className="section-wrap">
            <div className="section-index">
              04 <span>SELECTED WORK</span>
            </div>

            <div className="projects-heading">
              <SectionHeading
                eyebrow="PROJECTS & EXPERIMENTS"
                title={
                  <>
                    Ideas into <span className="serif-accent">interfaces.</span>
                  </>
                }
                copy="A mix of project work and concepts I want to develop. Status labels distinguish what exists from what is still planned."
              />

              <a
                className="text-link"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                Browse GitHub <ArrowUpRight size={15} />
              </a>
            </div>

            <div
              className="project-filters"
              role="group"
              aria-label="Filter projects"
            >
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={filter === item ? 'active' : ''}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="project-grid">
              {visibleProjects.map((project, index) => (
                <article
                  className={`project-card project-${index % 3}`}
                  key={project.id}
                >
                  <div className="project-visual">
                    <span className="project-number">
                      {String(
                        projects.findIndex((item) => item.id === project.id) + 1,
                      ).padStart(2, '0')}
                    </span>

                    <span className="project-type">{project.category}</span>

                    <div
                      className={`visual-art visual-${project.id}`}
                      aria-hidden="true"
                    >
                      {project.id === 'ml-prediction' ? (
                        <>
                          <div className="chart-axis" />
                          <div className="chart-line" />
                          <span className="chart-point point-a" />
                          <span className="chart-point point-b" />
                          <span className="chart-point point-c" />
                          <span className="chart-point point-d" />
                        </>
                      ) : project.id === 'rag-assistant' ? (
                        <>
                          <div className="doc doc-one" />
                          <div className="doc doc-two" />
                          <div className="doc doc-three" />
                          <div className="ai-core">
                            <Sparkles />
                          </div>
                        </>
                      ) : project.id === 'sales-dashboard' ? (
                        <>
                          <div className="dash-bar bar-one" />
                          <div className="dash-bar bar-two" />
                          <div className="dash-bar bar-three" />
                          <div className="dash-bar bar-four" />
                          <div className="dash-circle" />
                        </>
                      ) : project.id === 'hr-dashboard' ? (
                        <>
                          <div className="people-row">
                            <i />
                            <i />
                            <i />
                            <i />
                          </div>
                          <div className="hr-stat" />
                          <div className="hr-stat short" />
                          <div className="hr-chart" />
                        </>
                      ) : project.id === 'easyshop' ? (
                        <>
                          <div className="shop-window">
                            <div />
                            <div />
                            <div />
                          </div>
                          <div className="shop-bag">E</div>
                        </>
                      ) : (
                        <>
                          <div className="task-line" />
                          <div className="task-line mid" />
                          <div className="task-line short" />
                          <div className="task-check">
                            <Check />
                          </div>
                        </>
                      )}
                    </div>

                    <span
                      className={`status-pill ${project.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="project-body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <ul>
                      {project.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <div className="project-stack">
                      {project.stack.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>

                    <div className="project-footer">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View repository <ArrowUpRight size={15} />
                        </a>
                      ) : (
                        <span className="planned-note">
                          Concept — not yet published
                        </span>
                      )}

                      <span className="project-arrow">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SPX AI */}
        <section className="spx-section section-pad" id="spx">
          <div className="section-wrap">
            <div className="section-index">
              05 <span>IN DEVELOPMENT</span>
            </div>

            <div className="spx-panel">
              <div className="spx-copy">
                <span className="eyebrow">
                  <span className="status-dot pulse" /> PERSONAL BUILD / 001
                </span>

                <h2>
                  SPX <span>AI</span>
                </h2>

                <p className="spx-subtitle">Agentic AI Platform</p>

                <p className="spx-description">
                  An ongoing exploration into intelligent task execution,
                  agentic workflows, and useful automation—designed with web
                  and Android experiences in mind.
                </p>

                <div className="spx-status">
                  <span className="status-dot pulse" /> Currently in Development
                </div>

                <div className="spx-stack">
                  {[
                    'Python',
                    'FastAPI',
                    'React',
                    'TypeScript',
                    'PostgreSQL',
                    'React Native',
                    'Expo',
                  ].map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              <div
                className="architecture"
                aria-label="Planned SPX AI architecture diagram"
              >
                <div className="architecture-orbit orbit-a" />
                <div className="architecture-orbit orbit-b" />

                <div className="architecture-node node-center">
                  <Sparkles size={22} />
                  <b>SPX AI</b>
                  <small>ORCHESTRATION</small>
                </div>

                <div className="architecture-node node-top">
                  <Code2 />
                  <span>Web app</span>
                </div>

                <div className="architecture-node node-left">
                  <Database />
                  <span>PostgreSQL</span>
                </div>

                <div className="architecture-node node-right">
                  <Zap />
                  <span>AI workflows</span>
                </div>

                <div className="architecture-node node-bottom">
                  <Layers3 />
                  <span>Android app</span>
                </div>

                <div className="architecture-caption">
                  CONCEPTUAL ARCHITECTURE · PLANNED COMPONENTS
                </div>
              </div>

              <div className="spx-roadmap">
                <div>
                  <span>01</span>
                  <b>API &amp; data foundation</b>
                  <small>FastAPI · PostgreSQL</small>
                </div>

                <div>
                  <span>02</span>
                  <b>Web experience</b>
                  <small>React · TypeScript</small>
                </div>

                <div>
                  <span>03</span>
                  <b>Mobile experience</b>
                  <small>React Native · Expo</small>
                </div>

                <div>
                  <span>04</span>
                  <b>Release milestones</b>
                  <small>Deployment &amp; Play Store are future goals</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="education section-wrap section-pad" id="education">
          <div className="section-index">
            06 <span>EDUCATION</span>
          </div>

          <div className="education-layout">
            <SectionHeading
              eyebrow="FOUNDATIONS"
              title={
                <>
                  Built on a solid
                  <br />
                  <span className="serif-accent">foundation.</span>
                </>
              }
              copy="The academic background behind my interest in software and intelligent systems."
            />

            <article className="education-card">
              <div className="education-icon">
                <GraduationCap size={24} />
              </div>

              <div className="education-info">
                <span className="eyebrow">2023 — 2026</span>
                <h3>B.Sc. Computer Science</h3>
                <p>Sangola College, Sangola</p>
                <p className="muted">
                  Punyashlok Ahilyadevi Holkar Solapur University
                </p>

                <div className="education-stats">
                  <div>
                    <span>FINAL PERCENTAGE</span>
                    <b>67.43%</b>
                  </div>

                  <div>
                    <span>CGPA</span>
                    <b>8.14</b>
                  </div>
                </div>
              </div>

              <span className="education-stamp">
                B.SC
                <br />
                CS
              </span>
            </article>
          </div>
        </section>

        {/* LEARNING */}
        <section className="learning-section section-pad" id="learning">
          <div className="section-wrap">
            <div className="section-index">
              07 <span>LEARNING &amp; MILESTONES</span>
            </div>

            <div className="learning-layout">
              <div>
                <SectionHeading
                  eyebrow="COURSES & CERTIFICATIONS"
                  title={
                    <>
                      Stay curious.
                      <br />
                      <span className="serif-accent">Keep learning.</span>
                    </>
                  }
                  copy="Course names are listed from the learning record provided. Add credential links and completion dates after verifying each certificate."
                />

                <div className="credential-note">
                  <Award size={18} />
                  <span>
                    <b>Certification vs course completion</b>
                    <small>
                      AZ-900 is listed as a professional certification;
                      Anthropic items are course-completion credentials.
                    </small>
                  </span>
                </div>
              </div>

              <div className="course-list">
                {courses.map((course, index) => (
                  <article className="course-row" key={course.title}>
                    <span className="course-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div>
                      <h3>{course.title}</h3>
                      <p>
                        {course.issuer} <span>·</span> {course.type}
                      </p>
                    </div>

                    {course.verify ? (
                      <a
                        href={course.verify}
                        aria-label={`Verify ${course.title}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <span className="verify-pending">LINK PENDING</span>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <div className="achievement-strip">
              <div className="achievement-icon">
                <Award size={22} />
              </div>

              <div>
                <span className="eyebrow">VERIFIED MILESTONES</span>
                <h3>Progress worth documenting.</h3>
                <p>
                  Azure Fundamentals certification, AI learning coursework,
                  academic completion, and project milestones are the current
                  portfolio milestones. No unverified awards or performance
                  metrics are claimed.
                </p>
              </div>

              <a
                className="text-link"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                Project activity <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* BEYOND THE CODE */}
        <section className="beyond section-wrap section-pad" id="beyond">
          <div className="section-index">
            08 <span>BEYOND THE CODE</span>
          </div>

          <div className="beyond-grid">
            <div>
              <SectionHeading
                eyebrow="HOW I WORK"
                title={
                  <>
                    Good work is
                    <br />
                    <span className="serif-accent">a team sport.</span>
                  </>
                }
              />

              <div className="soft-skill-list">
                {softSkills.map((skill, index) => (
                  <span key={skill}>
                    <i>{String(index + 1).padStart(2, '0')}</i>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="interests-card">
              <span className="eyebrow">OFF THE CHECKLIST</span>
              <h3>
                Things I like
                <br />
                to explore.
              </h3>

              <div className="interest-list">
                {interests.map((interest, index) => (
                  <div key={interest}>
                    <span>0{index + 1}</span>
                    <p>{interest}</p>
                    <ArrowUpRight size={14} />
                  </div>
                ))}
              </div>

              <div className="interests-decoration">
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </section>

        {/* RESUME */}
        <section className="resume-section section-pad" id="resume">
          <div className="section-wrap resume-panel">
            <div className="resume-icon">
              <FileText size={26} />
            </div>

            <div className="resume-copy">
              <span className="eyebrow">THE DETAILS, ON PAPER</span>
              <h2>Want the concise version?</h2>
              <p>
                View or download my resume. Add your actual PDF to the project
                before publishing.
              </p>
            </div>

            <div className="resume-actions">
              <a
                className="button button-primary"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                View resume <ArrowUpRight size={16} />
              </a>

              <a
                className="button button-outline"
                href={profile.resume}
                download="Sanket_Patil_Resume.pdf"
              >
                Download PDF <Download size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact section-wrap section-pad" id="contact">
          <div className="section-index">
            09 <span>GET IN TOUCH</span>
          </div>

          <div className="contact-layout">
            <div className="contact-copy">
              <SectionHeading
                eyebrow="HAVE A PROJECT OR OPPORTUNITY?"
                title={
                  <>
                    Let's make
                    <br />
                    <span className="serif-accent">something useful.</span>
                  </>
                }
                copy="Open to conversations about roles, internships, collaborations, and practical software ideas."
              />

              <div className="contact-direct">
                <span className="contact-icon">
                  <Mail size={18} />
                </span>

                <div>
                <small>EMAIL</small>
                <b>
                   <a href={`mailto:${profile.email}`}>
                  {profile.email}
                    </a>
                    </b>
                      <p>Feel free to contact me for opportunities and collaborations.</p>
              </div>
              </div>

              <div className="contact-direct">
                <span className="contact-icon">
                  <Linkedin size={18} />
                </span>

                <div>
                  <small>LINKEDIN</small>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    Connect professionally <ArrowUpRight size={13} />
                  </a>
                  <p>For professional messages and opportunities.</p>
                </div>
              </div>

              <div className="contact-socials">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub
                </a>

                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={submitContact}
            >
              <div className="form-heading">
                <span className="eyebrow">SEND A MESSAGE</span>
                <span className="form-required">* REQUIRED</span>
              </div>

              <div className="form-row">
                <label>
                  Full name *
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Your name"
                  />
                </label>

                <label>
                  Email address *
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={255}
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Mobile number <span className="optional">(optional)</span>
                  <input
                    name="mobile"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[+0-9() .-]{7,20}"
                    maxLength={20}
                    placeholder="+91 …"
                  />
                </label>

                <label>
                  Company <span className="optional">(optional)</span>
                  <input
                    name="company"
                    autoComplete="organization"
                    maxLength={150}
                    placeholder="Company / organization"
                  />
                </label>
              </div>

              <label>
                Purpose of contact *
                <span className="select-wrap">
                  <select
                    name="purpose"
                    value={purpose}
                    onChange={(event) => setPurpose(event.target.value)}
                    required
                  >
                    {[
                      'Job Opportunity',
                      'Internship Opportunity',
                      'Freelance Project',
                      'Website Development',
                      'AI/ML Project',
                      'Data Analytics',
                      'Data Engineering',
                      'General Inquiry',
                    ].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </span>
              </label>

              <label>
                Project or job details{' '}
                <span className="optional">(optional)</span>
                <input
                  name="details"
                  maxLength={5000}
                  placeholder="Role, project scope, or context"
                />
              </label>

              <label>
                Message *
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={4}
                  placeholder="Tell me a little about what you have in mind…"
                />
              </label>

              <div className="honeypot" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <label className="privacy-check">
                <input type="checkbox" required name="privacyConsent" />
                <span>
                  I agree to share these details so Sanket can respond to my
                  enquiry. Please don't include sensitive information.
                </span>
              </label>

              <button
                className="button button-primary submit-button"
                type="submit"
                disabled={formState === 'sending'}
              >
                {formState === 'sending' ? 'Sending…' : 'Send message'}

                {formState === 'sending' ? (
                  <span className="spinner" />
                ) : (
                  <Send size={15} />
                )}
              </button>

              {formState === 'success' && (
                <p className="form-feedback success" role="status">
                  Your message has been saved successfully. Thank you for
                  reaching out.
                </p>
              )}

              {formState === 'error' && (
                <p className="form-feedback error" role="alert">
                  The message could not be sent. Please try again or contact me
                  via LinkedIn.
                </p>
              )}

              {formState === 'unconfigured' && (
                <p className="form-feedback error" role="alert">
                  Contact form is not configured. Please check your backend
                  settings.
                </p>
              )}

              <p className="privacy-note">
                Your message is submitted to the portfolio backend. Mobile
                number and company are optional.
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-top">
          <a className="brand" href="#home">
            <span className="brand-mark">
              SP<span>.</span>
            </span>
            <span className="brand-caption">
              PORTFOLIO <i>2026</i>
            </span>
          </a>

          <p>Built with intent. Always learning.</p>

          <a className="back-top" href="#home">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Sanket Patil</span>
          <span>PYTHON · AI · DATA · WEB</span>
          <span>
            DESIGNED TO EVOLVE <span className="footer-dot">●</span>
          </span>
        </div>
      </footer>
    </div>
  );
}