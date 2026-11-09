import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  ArrowOutwardRounded,
  AutoAwesomeRounded,
  BusinessCenterRounded,
  CodeRounded,
  DevicesRounded,
  GroupsRounded,
  LocationOnRounded,
  RocketLaunchRounded,
  VerifiedRounded,
  ViewInArRounded,
} from "@mui/icons-material";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* Adjust the path if About.jsx is not in src/components */
import meImage from "../assets/me.jpg";

const EASE = [0.22, 1, 0.36, 1];

const SKILLS = ["React", "JavaScript", "Material UI", "REST APIs", "Vite"];

const FACTS = [
  { icon: <LocationOnRounded />, label: "Based in", value: "Abuja, Nigeria" },
  { icon: <BusinessCenterRounded />, label: "Experience", value: "3+ years building" },
  {
    icon: <GroupsRounded />,
    label: "Works with",
    value: "Ministries, schools, nonprofits & businesses",
  },
  {
    icon: <ViewInArRounded />,
    label: "Currently exploring",
    value: "Three.js & React Three Fiber",
  },
];

const STEPS = [
  "Understand the problem",
  "Design the experience",
  "Build with purpose",
  "Test and improve",
];

const HIGHLIGHTS = [
  {
    icon: <CodeRounded />,
    title: "Clean Development",
    description:
      "Building organized, maintainable interfaces with reusable React components.",
  },
  {
    icon: <DevicesRounded />,
    title: "Responsive Experiences",
    description:
      "Creating layouts that adapt smoothly to mobile, tablet, and desktop screens.",
  },
  {
    icon: <AutoAwesomeRounded />,
    title: "Purposeful Design",
    description:
      "Combining thoughtful UI design with practical functionality and usability.",
  },
  {
    icon: <RocketLaunchRounded />,
    title: "Continuous Growth",
    description:
      "Learning, experimenting, and improving with every project I build.",
  },
];

/* ---------- helpers ---------- */

const Reveal = ({ children, delay = 0, sx }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: EASE }}
    sx={sx}
  >
    {children}
  </Box>
);

const FloatCard = ({ children, delay = 0, sx }) => {
  const theme = useTheme();
  return (
    <Box
      component={motion.div}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      sx={{
        position: "absolute",
        zIndex: 4,
        px: { xs: 1.6, sm: 2.2 },
        py: { xs: 1.1, sm: 1.6 },
        maxWidth: { xs: 160, sm: "none" },
        borderRadius: { xs: 3, sm: 3.5 },
        backgroundColor: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
        boxShadow: `0 18px 50px ${alpha("#000", 0.4)}`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const SpotlightCard = ({ children, sx }) => {
  const theme = useTheme();

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <Box
      onMouseMove={handleMove}
      sx={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        p: { xs: 2.8, md: 3.5 },
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        transition: "transform .35s ease, border-color .35s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity .35s ease",
          background: `radial-gradient(380px circle at var(--x, 50%) var(--y, 50%), ${alpha(
            theme.palette.primary.main,
            0.22
          )}, transparent 45%)`,
        },
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-6px)",
            borderColor: alpha(theme.palette.primary.main, 0.55),
          },
          "&:hover::before": { opacity: 1 },
        },
        ...sx,
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</Box>
    </Box>
  );
};

/* ---------- main ---------- */

const About = () => {
  const theme = useTheme();

  /* 3D tilt for the photo (mouse only, touch screens ignore it) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 140,
    damping: 18,
  });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <Box
      component="section"
      id="about"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 9, sm: 12, md: 18 },
      }}
    >
      {/* Background glows */}
      <Box
        sx={{
          position: "absolute",
          top: "4%",
          left: "-14%",
          width: { xs: 340, md: 560 },
          height: { xs: 340, md: 560 },
          borderRadius: "50%",
          background: alpha(theme.palette.primary.main, 0.2),
          filter: "blur(130px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "8%",
          right: "-12%",
          width: { xs: 300, md: 480 },
          height: { xs: 300, md: 480 },
          borderRadius: "50%",
          background: alpha(theme.palette.secondary.main, 0.11),
          filter: "blur(130px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        {/* ============ MAIN SPLIT ============ */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "0.9fr 1.1fr" },
            alignItems: "center",
            gap: { xs: 10, sm: 12, md: 8, lg: 14 },
          }}
        >
          {/* ---------- PHOTO ---------- */}
          <Reveal>
            <Box
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: 360, sm: 460, md: 500 },
                mx: "auto",
                perspective: "1300px",
                px: { xs: 1.5, sm: 0 },
              }}
            >
              {/* Tilted gradient layer */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotate(5deg) scale(0.98)",
                  borderRadius: 6,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.7
                  )}, ${alpha(theme.palette.secondary.main, 0.45)})`,
                  opacity: 0.55,
                  filter: "blur(1px)",
                }}
              />

              {/* Dot pattern */}
              <Box
                sx={{
                  position: "absolute",
                  right: { xs: -4, sm: -24, md: -20, lg: -34 },
                  bottom: { xs: -22, sm: -34 },
                  width: { xs: 100, sm: 150 },
                  height: { xs: 100, sm: 150 },
                  backgroundImage: `radial-gradient(${alpha(
                    theme.palette.secondary.main,
                    0.8
                  )} 1.6px, transparent 1.6px)`,
                  backgroundSize: "18px 18px",
                  opacity: 0.6,
                }}
              />

              {/* Photo */}
              <Box
                component={motion.div}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                sx={{ position: "relative", zIndex: 2 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    aspectRatio: "4 / 5",
                    borderRadius: { xs: 5, sm: 6 },
                    overflow: "hidden",
                    border: `1px solid ${alpha(theme.palette.text.primary, 0.18)}`,
                    boxShadow: `0 40px 100px ${alpha("#000", 0.55)}, 0 0 80px ${alpha(
                      theme.palette.primary.main,
                      0.18
                    )}`,
                    "@media (hover: hover)": {
                      "&:hover img": { transform: "scale(1.05)" },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={meImage}
                    alt="Praise Nwachukwu"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 20%",
                      display: "block",
                      transition: "transform .9s cubic-bezier(.22,1,.36,1)",
                    }}
                  />

                  {/* Bottom fade */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(to top, ${alpha(
                        theme.palette.background.default,
                        0.88
                      )} 0%, transparent 45%)`,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Name plate */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: 18, sm: 24 },
                      right: { xs: 18, sm: 24 },
                      bottom: { xs: 16, sm: 22 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "1.15rem", sm: "1.35rem" },
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                      }}
                    >
                      Praise Nwachukwu
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mt: 0.6 }}>
                      <VerifiedRounded sx={{ fontSize: 16, color: "secondary.main" }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "secondary.main", fontWeight: 600 }}
                      >
                        Web Developer
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>

              {/* Floating cards (kept inside the screen on every size) */}
              <FloatCard
                sx={{
                  top: { xs: "5%", sm: "9%" },
                  left: { xs: -4, sm: -16, xl: -36 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1.35rem", sm: "1.7rem" },
                    fontWeight: 800,
                    lineHeight: 1,
                    background: `linear-gradient(110deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  3+
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3 }}>
                  Years building for the web
                </Typography>
              </FloatCard>

              <FloatCard
                delay={1.6}
                sx={{
                  bottom: { xs: "22%", sm: "20%" },
                  right: { xs: -4, sm: -16, xl: -36 },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.2}>
                  <Box
                    sx={{
                      width: 9,
                      height: 9,
                      flexShrink: 0,
                      borderRadius: "50%",
                      bgcolor: "#22C55E",
                      boxShadow: "0 0 12px #22C55E",
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "0.78rem", sm: "0.85rem" },
                        lineHeight: 1.3,
                      }}
                    >
                      Abuja, Nigeria
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Open to opportunities
                    </Typography>
                  </Box>
                </Stack>
              </FloatCard>
            </Box>
          </Reveal>

          {/* ---------- TEXT ---------- */}
          <Box sx={{ minWidth: 0 }}>
            <Reveal>
              <Stack direction="row" alignItems="center" spacing={1.8} sx={{ mb: { xs: 2.5, md: 3.5 } }}>
                <Box
                  sx={{
                    width: 40,
                    height: 2,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }}
                />
                <Typography
                  variant="overline"
                  sx={{
                    color: "secondary.main",
                    fontWeight: 700,
                    letterSpacing: { xs: "0.16em", sm: "0.22em" },
                    fontSize: { xs: "0.68rem", sm: "0.75rem" },
                  }}
                >
                  A little about me
                </Typography>
              </Stack>
            </Reveal>

            <Reveal delay={0.08}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "clamp(2rem, 9vw, 2.7rem)",
                    sm: "3.2rem",
                    md: "3rem",
                    lg: "4.4rem",
                  },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.04em",
                  mb: { xs: 3, md: 4 },
                }}
              >
                More than code.
                <br />
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(100deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  I build solutions.
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={0.16}>
              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: { xs: 1.9, md: 2 },
                  fontSize: { xs: "1rem", md: "1.06rem" },
                  mb: 2.5,
                  maxWidth: 640,
                }}
              >
                I'm Praise Nwachukwu, a web developer passionate about turning
                ideas into useful, engaging digital experiences. I enjoy
                understanding what a project needs and translating that into
                interfaces people can use with confidence.
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: { xs: 1.9, md: 2 },
                  fontSize: { xs: "1rem", md: "1.06rem" },
                  mb: { xs: 4, md: 5 },
                  maxWidth: 640,
                }}
              >
                My work focuses on React, JavaScript, and Material UI, with an
                emphasis on responsive layouts, reusable components, and
                connecting frontend interfaces to APIs. I'm continually
                improving my skills through practical projects and new
                challenges.
              </Typography>
            </Reveal>

            {/* Facts */}
            <Reveal delay={0.22}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "minmax(0, 1fr)",
                    sm: "repeat(2, minmax(0, 1fr))",
                    md: "minmax(0, 1fr)",
                    lg: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: { xs: 1.6, sm: 2 },
                  mb: { xs: 4, md: 5 },
                  maxWidth: 680,
                }}
              >
                {FACTS.map((fact) => (
                  <Stack
                    key={fact.label}
                    direction="row"
                    spacing={{ xs: 1.6, sm: 2 }}
                    alignItems="center"
                    sx={{
                      p: { xs: 1.6, sm: 2 },
                      borderRadius: 3.5,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: alpha(theme.palette.background.paper, 0.5),
                      transition: "border-color .3s ease, background-color .3s ease",
                      "@media (hover: hover)": {
                        "&:hover": {
                          borderColor: alpha(theme.palette.secondary.main, 0.45),
                          backgroundColor: alpha(theme.palette.background.paper, 0.9),
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 40, sm: 44 },
                        height: { xs: 40, sm: 44 },
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 2.5,
                        color: "secondary.main",
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                      }}
                    >
                      {fact.icon}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ letterSpacing: "0.04em" }}
                      >
                        {fact.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.92rem",
                          lineHeight: 1.4,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {fact.value}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Box>
            </Reveal>

            {/* Skills */}
            <Reveal delay={0.28}>
              <Stack direction="row" flexWrap="wrap" gap={{ xs: 1, sm: 1.2 }} sx={{ mb: { xs: 4, md: 5 } }}>
                {SKILLS.map((skill) => (
                  <Box
                    key={skill}
                    sx={{
                      px: { xs: 1.8, sm: 2.2 },
                      py: 0.9,
                      borderRadius: 99,
                      fontSize: { xs: "0.8rem", sm: "0.85rem" },
                      fontWeight: 600,
                      color: "text.secondary",
                      border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
                      transition: "all .3s ease",
                      cursor: "default",
                      "@media (hover: hover)": {
                        "&:hover": {
                          color: "#fff",
                          borderColor: "transparent",
                          background: `linear-gradient(110deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          transform: "translateY(-3px)",
                        },
                      },
                    }}
                  >
                    {skill}
                  </Box>
                ))}
              </Stack>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={0.34}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowOutwardRounded />}
                  onClick={() => scrollTo("projects")}
                  sx={{
                    py: 1.7,
                    px: 4,
                    borderRadius: 99,
                    fontWeight: 700,
                    textTransform: "none",
                    background: `linear-gradient(110deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 12px 36px ${alpha(theme.palette.primary.main, 0.45)}`,
                    transition: "all .3s ease",
                    "@media (hover: hover)": {
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: `0 18px 48px ${alpha(theme.palette.primary.main, 0.6)}`,
                      },
                    },
                  }}
                >
                  Explore my projects
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollTo("contact")}
                  sx={{
                    py: 1.7,
                    px: 4,
                    borderRadius: 99,
                    fontWeight: 600,
                    textTransform: "none",
                    color: "text.primary",
                    borderColor: alpha(theme.palette.text.primary, 0.22),
                    transition: "all .3s ease",
                    "@media (hover: hover)": {
                      "&:hover": {
                        transform: "translateY(-3px)",
                        borderColor: theme.palette.secondary.main,
                        backgroundColor: alpha(theme.palette.secondary.main, 0.06),
                      },
                    },
                  }}
                >
                  Let's talk
                </Button>
              </Stack>
            </Reveal>
          </Box>
        </Box>

        {/* ============ PROCESS TIMELINE ============ */}
        <Reveal sx={{ mt: { xs: 10, sm: 14, md: 22 } }}>
          <Box
            sx={{
              p: { xs: 2.8, sm: 4, md: 6 },
              borderRadius: { xs: 5, md: 6 },
              border: `1px solid ${theme.palette.divider}`,
              background: `linear-gradient(145deg, ${alpha(
                theme.palette.background.paper,
                0.85
              )}, ${alpha(theme.palette.primary.main, 0.07)})`,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                display: "block",
                textAlign: "center",
                color: "secondary.main",
                fontWeight: 700,
                letterSpacing: { xs: "0.16em", sm: "0.22em" },
                mb: 1.5,
              }}
            >
              My process
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                fontSize: { xs: "clamp(1.4rem, 6vw, 1.8rem)", md: "2.3rem" },
                mb: { xs: 4.5, md: 8 },
              }}
            >
              From idea to something people use
            </Typography>

            <Box
              sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(4, 1fr)" },
                gap: { xs: 3.5, md: 3 },
              }}
            >
              {/* Horizontal line (tablet / desktop) */}
              <Box
                component={motion.div}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.6, ease: EASE }}
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "absolute",
                  top: 21,
                  left: "12.5%",
                  right: "12.5%",
                  height: 2,
                  transformOrigin: "left",
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              />

              {/* Vertical line (phones) */}
              <Box
                component={motion.div}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.6, ease: EASE }}
                sx={{
                  display: { xs: "block", md: "none" },
                  position: "absolute",
                  top: 22,
                  bottom: 22,
                  left: 21,
                  width: 2,
                  transformOrigin: "top",
                  borderRadius: 2,
                  background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              />

              {STEPS.map((step, i) => (
                <Box
                  key={step}
                  component={motion.div}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: EASE }}
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    alignItems: "center",
                    gap: 2.5,
                    textAlign: { xs: "left", md: "center" },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "50%",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      color: "secondary.main",
                      bgcolor: theme.palette.background.default,
                      border: `2px solid ${theme.palette.secondary.main}`,
                      boxShadow: `0 0 24px ${alpha(theme.palette.secondary.main, 0.35)}`,
                    }}
                  >
                    0{i + 1}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.05rem" } }}>
                    {step}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>

        {/* ============ HIGHLIGHT CARDS ============ */}
        <Box sx={{ mt: { xs: 10, sm: 12, md: 18 } }}>
          <Reveal>
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.15,
                  fontSize: { xs: "clamp(1.7rem, 7.5vw, 2.2rem)", md: "3rem" },
                  mb: 2,
                }}
              >
                How I approach my work
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  maxWidth: 600,
                  mx: "auto",
                  lineHeight: 1.9,
                  fontSize: { xs: "1rem", md: "1.05rem" },
                }}
              >
                Good development is about more than getting a page to work.
                It's about creating something useful, clear, and maintainable.
              </Typography>
            </Box>
          </Reveal>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: { xs: 2.2, md: 3 },
            }}
          >
            {HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <SpotlightCard>
                  <Box
                    sx={{
                      width: { xs: 48, md: 54 },
                      height: { xs: 48, md: 54 },
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 3,
                      mb: { xs: 2.5, md: 3.5 },
                      color: "#fff",
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 1.4, letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.9 }}
                  >
                    {item.description}
                  </Typography>
                </SpotlightCard>
              </Reveal>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;