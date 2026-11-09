import { useRef, useState } from "react";
import {
    Box,
    Container,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
    ArrowOutwardRounded,
    GitHub,
    OpenInNewRounded,
} from "@mui/icons-material";
import { motion, useScroll, useTransform } from "framer-motion";

/* ExamPrep NG screenshots (adjust the path if this file lives elsewhere) */
import examHome from "../assets/projects/examprep/homepage.png";
import examFeatures from "../assets/projects/examprep/features.png";
import examMobile from "../assets/projects/examprep/mobile.png";

/* PraizPilot screenshots */
import praizHome from "../assets/projects/praizpilot/homepage.png";
import praizFeatures from "../assets/projects/praizpilot/features.png";
import praizMobile from "../assets/projects/praizpilot/mobile.png";

/* Perfect Fashion Home screenshot */
import fashionHome from "../assets/projects/perfect-fashion-home/homepage.png";

/*
  ADDING SCREENSHOTS TO OTHER PROJECTS
  1. Import the images, e.g.
       import praizHome from "../assets/projects/praizpilot/homepage.png";
  2. Replace  image: ""  on that project with:
       images: [
         { label: "Home", src: praizHome },
         { label: "Mobile", src: praizMobile, mobile: true },
       ],
*/

const EASE = [0.22, 1, 0.36, 1];

const projects = [
    {
        name: "ExamPrep NG",
        category: "Education",
        description:
            "An exam preparation project focused on making learning resources and exam practice easier to access.",
        technologies: ["React", "JavaScript", "MUI"],
        accent: "#6C63FF",
        preview: "EXAM / PREPARATION",
        images: [
            { label: "Home", src: examHome },
            { label: "Features", src: examFeatures },
            { label: "Mobile", src: examMobile, mobile: true },
        ],
        liveUrl: "https://exam-ng.vercel.app/",
        repoUrl: "",
    },
    {
        name: "PraizPilot",
        category: "AI / Business",
        description:
            "An AI-powered business website project designed to help businesses establish their online presence.",
        technologies: ["React", "MUI", "Node.js"],
        accent: "#00D4FF",
        preview: "AI / BUSINESS",
        images: [
            { label: "Home", src: praizHome },
            { label: "Features", src: praizFeatures },
            { label: "Mobile", src: praizMobile, mobile: true },
        ],
        liveUrl: "",
        repoUrl: "",
    },
    {
        name: "Perfect Fashion Home",
        category: "Fashion",
        description:
            "A digital presence concept for a fashion business, presenting its identity and services online.",
        technologies: ["React", "MUI", "CSS"],
        accent: "#F472B6",
        preview: "FASHION / STYLE",
        images: [{ label: "Home", src: fashionHome }],
        liveUrl: "https://perfect-fashion-home-dm24.vercel.app/",
        repoUrl: "",
    },
];

const pad = (n) => String(n).padStart(2, "0");

const initials = (name) =>
    name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();


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

const ProjectPreview = ({ project, fill }) => {
    const theme = useTheme();
    const { accent } = project;
    const [active, setActive] = useState(0);

    const slug = project.name.toLowerCase().replace(/\s+/g, "-");
    const displayUrl = project.liveUrl
        ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
        : slug;

    const images = project.images?.length
        ? project.images
        : project.image
            ? [{ label: "Preview", src: project.image }]
            : [];
    const current = images[active];

    return (
        <Box
            sx={{
                position: "relative",
                height: fill ? "100%" : { xs: 250, sm: 340, md: 380 },
                minHeight: 0,
                overflow: "hidden",
                borderRadius: { xs: 3.5, md: 4 },
                background: `radial-gradient(circle at 80% 10%, ${alpha(accent, 0.42)}, transparent 50%), radial-gradient(circle at 10% 100%, ${alpha(accent, 0.22)}, transparent 55%), ${theme.palette.background.default}`,
                border: `1px solid ${alpha(accent, 0.25)}`,
            }}
        >
            {/* Browser window */}
            <Box
                className="project-window"
                sx={{
                    position: "absolute",
                    inset: { xs: "18px 16px 0", sm: "26px 28px 0", md: "34px 34px 0" },
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px 16px 0 0",
                    overflow: "hidden",
                    border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
                    borderBottom: 0,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: `0 -10px 60px ${alpha(accent, 0.22)}, 0 30px 80px ${alpha("#000", 0.5)}`,
                    transition: "transform .6s cubic-bezier(.22,1,.36,1)",
                }}
            >
                {/* Window bar */}
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 1.2, sm: 1.5 }}
                    sx={{
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 1, sm: 1.3 },
                        flexShrink: 0,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        backgroundColor: alpha(theme.palette.background.default, 0.6),
                    }}
                >
                    <Stack direction="row" spacing={0.7} sx={{ flexShrink: 0 }}>
                        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                            <Box key={c} sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: c }} />
                        ))}
                    </Stack>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            maxWidth: 260,
                            mx: "auto",
                            px: 1.6,
                            py: 0.45,
                            borderRadius: 99,
                            textAlign: "center",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            color: "text.secondary",
                            backgroundColor: alpha(theme.palette.text.primary, 0.06),
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {displayUrl}
                    </Box>
                    {/* balances the dots so the URL pill stays centered (hidden on phones) */}
                    <Box sx={{ width: 40, flexShrink: 0, display: { xs: "none", sm: "block" } }} />
                </Stack>

                {/* Window content */}
                <Box sx={{ position: "relative", flex: 1, overflow: "hidden" }}>
                    {current ? (
                        <>
                            {current.mobile ? (
                                /* Portrait screenshot: centered on a soft backdrop */
                                <Box
                                    key={current.label}
                                    component={motion.div}
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "flex-start",
                                        pt: { xs: 1.2, md: 2 },
                                        px: 2,
                                        background: `radial-gradient(circle at 50% 0%, ${alpha(accent, 0.22)}, transparent 70%)`,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={current.src}
                                        alt={`${project.name} ${current.label}`}
                                        sx={{
                                            height: "100%",
                                            maxWidth: "100%",
                                            objectFit: "contain",
                                            objectPosition: "top",
                                            display: "block",
                                            borderRadius: "14px 14px 0 0",
                                            border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
                                            borderBottom: 0,
                                            boxShadow: `0 10px 40px ${alpha("#000", 0.45)}`,
                                        }}
                                    />
                                </Box>
                            ) : (
                                <Box
                                    key={current.label}
                                    component={motion.img}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                    src={current.src}
                                    alt={`${project.name} ${current.label}`}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        objectPosition: "top",
                                        display: "block",
                                    }}
                                />
                            )}

                            {/* Screenshot switcher */}
                            {images.length > 1 && (
                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                    sx={{
                                        position: "absolute",
                                        left: "50%",
                                        bottom: { xs: 8, md: 14 },
                                        transform: "translateX(-50%)",
                                        p: 0.5,
                                        borderRadius: 99,
                                        zIndex: 2,
                                        backdropFilter: "blur(10px)",
                                        WebkitBackdropFilter: "blur(10px)",
                                        backgroundColor: alpha(theme.palette.background.default, 0.72),
                                        border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
                                    }}
                                >
                                    {images.map((img, i) => (
                                        <Box
                                            key={img.label}
                                            component="button"
                                            type="button"
                                            onClick={() => setActive(i)}
                                            sx={{
                                                px: { xs: 1.2, sm: 1.6 },
                                                py: 0.5,
                                                border: 0,
                                                borderRadius: 99,
                                                cursor: "pointer",
                                                fontFamily: "inherit",
                                                fontSize: { xs: "0.62rem", sm: "0.7rem" },
                                                fontWeight: 700,
                                                letterSpacing: "0.04em",
                                                whiteSpace: "nowrap",
                                                WebkitTapHighlightColor: "transparent",
                                                color: i === active ? "#080D19" : theme.palette.text.secondary,
                                                backgroundColor: i === active ? accent : "transparent",
                                                transition: "all .25s ease",
                                            }}
                                        >
                                            {img.label}
                                        </Box>
                                    ))}
                                </Stack>
                            )}
                        </>
                    ) : (
                        <Box sx={{ position: "relative", height: "100%", p: { xs: 1.8, md: 3 } }}>
                            {/* Watermark initials */}
                            <Typography
                                sx={{
                                    position: "absolute",
                                    right: 10,
                                    top: "18%",
                                    fontSize: { xs: "5rem", sm: "7rem", md: "9rem" },
                                    fontWeight: 900,
                                    lineHeight: 1,
                                    letterSpacing: "-0.06em",
                                    color: "transparent",
                                    WebkitTextStroke: `1.5px ${alpha(accent, 0.3)}`,
                                    pointerEvents: "none",
                                    userSelect: "none",
                                }}
                            >
                                {initials(project.name)}
                            </Typography>

                            <Typography
                                sx={{
                                    position: "relative",
                                    color: accent,
                                    fontSize: { xs: "0.62rem", sm: "0.68rem" },
                                    fontWeight: 700,
                                    letterSpacing: { xs: "0.12em", sm: "0.16em" },
                                    mb: { xs: 1.6, md: 2 },
                                }}
                            >
                                {project.preview}
                            </Typography>

                            <Box
                                sx={{
                                    position: "relative",
                                    width: "68%",
                                    height: { xs: 11, md: 13 },
                                    borderRadius: 1.5,
                                    bgcolor: alpha(theme.palette.text.primary, 0.22),
                                    mb: 1.2,
                                }}
                            />
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "46%",
                                    height: { xs: 11, md: 13 },
                                    borderRadius: 1.5,
                                    bgcolor: alpha(theme.palette.text.primary, 0.12),
                                    mb: { xs: 1.8, md: 2.2 },
                                }}
                            />
                            <Box
                                sx={{
                                    position: "relative",
                                    width: { xs: 80, md: 96 },
                                    height: { xs: 24, md: 28 },
                                    borderRadius: 99,
                                    bgcolor: accent,
                                    boxShadow: `0 8px 24px ${alpha(accent, 0.5)}`,
                                    mb: { xs: 2, md: 3 },
                                }}
                            />

                            <Box
                                sx={{
                                    position: "relative",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                                    gap: { xs: 1, md: 1.4 },
                                }}
                            >
                                {[0, 1, 2].map((n) => (
                                    <Box
                                        key={n}
                                        sx={{
                                            height: { xs: 50, sm: 70, md: 84 },
                                            borderRadius: 2,
                                            bgcolor: alpha(accent, n === 1 ? 0.22 : 0.09),
                                            border: `1px solid ${alpha(accent, 0.2)}`,
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

const LinkButton = ({ href, icon, children, primary, accent }) => {
    const theme = useTheme();
    return (
        <Box
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                flex: { xs: "1 1 auto", sm: "0 0 auto" },
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                px: { xs: 2.2, sm: 2.6 },
                py: 1.2,
                borderRadius: 99,
                fontSize: "0.9rem",
                fontWeight: 700,
                color: primary ? "#080D19" : "text.primary",
                background: primary ? accent : "transparent",
                border: primary
                    ? "1px solid transparent"
                    : `1px solid ${alpha(theme.palette.text.primary, 0.22)}`,
                boxShadow: primary ? `0 10px 30px ${alpha(accent, 0.4)}` : "none",
                transition: "all .3s ease",
                "@media (hover: hover)": {
                    "&:hover": {
                        transform: "translateY(-3px)",
                        borderColor: primary ? "transparent" : accent,
                        boxShadow: primary
                            ? `0 14px 38px ${alpha(accent, 0.6)}`
                            : `0 0 0 3px ${alpha(accent, 0.12)}`,
                    },
                },
                "& svg": { fontSize: 18 },
            }}
        >
            {children}
            {icon}
        </Box>
    );
};

const ProjectCard = ({ project, index, total, progress, isSticky }) => {
    const theme = useTheme();
    const { accent } = project;

    const targetScale = 1 - (total - index) * 0.04;
    const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

    const hasLinks = project.liveUrl || project.repoUrl;

    return (
        <Box
            sx={{
                position: isSticky ? "sticky" : "relative",
                top: 0,
                height: isSticky ? "100vh" : "auto",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                mb: isSticky ? 0 : { xs: 2.5, sm: 4 },
            }}
        >
            <Box
                component={motion.div}
                /* sticky mode: scale-down stack effect. Otherwise: simple fade-in */
                style={{
                    scale: isSticky ? scale : 1,
                    transformOrigin: "top center",
                }}
                initial={isSticky ? false : { opacity: 0, y: 40 }}
                whileInView={isSticky ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE }}
                sx={{
                    position: "relative",
                    width: "100%",
                    top: isSticky ? `calc(11vh + ${index * 22}px)` : 0,
                    height: isSticky ? "min(540px, 70vh)" : "auto",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "minmax(0, 1fr)",
                        md: "minmax(0, 1fr) minmax(0, 1.08fr)",
                    },
                    gap: { xs: 3, sm: 3.5, md: 4, lg: 5 },
                    p: { xs: 2.2, sm: 3.2, md: 4, lg: 5 },
                    borderRadius: { xs: 5, md: 6 },
                    overflow: "hidden",
                    border: `1px solid ${alpha(accent, 0.35)}`,
                    background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(accent, 0.1)})`,
                    boxShadow: `0 -20px 60px ${alpha("#000", 0.35)}, 0 40px 100px ${alpha("#000", 0.4)}, 0 0 80px ${alpha(accent, 0.1)}`,
                    "@media (hover: hover)": {
                        "&:hover .project-window": { transform: "translateY(-12px)" },
                    },
                }}
            >
                {/* Left: content */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: { xs: 2.5, md: 3 },
                        minWidth: 0,
                        minHeight: 0,
                        order: { xs: 2, md: 1 },
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1.5}
                    >
                        <Typography
                            sx={{
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                color: accent,
                                flexShrink: 0,
                            }}
                        >
                            {pad(index + 1)}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                {" "}
                                / {pad(total)}
                            </Box>
                        </Typography>

                        <Box
                            sx={{
                                px: { xs: 1.6, sm: 2 },
                                py: 0.6,
                                borderRadius: 99,
                                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                                whiteSpace: "nowrap",
                                color: accent,
                                backgroundColor: alpha(accent, 0.12),
                                border: `1px solid ${alpha(accent, 0.3)}`,
                            }}
                        >
                            {project.category}
                        </Box>
                    </Stack>

                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: {
                                    xs: "clamp(1.8rem, 8.5vw, 2.4rem)",
                                    sm: "2.6rem",
                                    md: "clamp(2rem, 3.4vw, 3.4rem)",
                                },
                                fontWeight: 800,
                                lineHeight: 1.08,
                                letterSpacing: "-0.04em",
                                mb: { xs: 1.6, md: 2.2 },
                                overflowWrap: "anywhere",
                            }}
                        >
                            {project.name}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: { xs: 1.85, md: 1.8, lg: 1.9 },
                                fontSize: { xs: "0.97rem", md: "1rem", lg: "1.02rem" },
                                maxWidth: 480,
                            }}
                        >
                            {project.description}
                        </Typography>
                    </Box>

                    <Box>
                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            gap={{ xs: 0.8, sm: 1 }}
                            sx={{ mb: { xs: 2.5, md: 3 } }}
                        >
                            {project.technologies.map((tech) => (
                                <Stack
                                    key={tech}
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{
                                        px: { xs: 1.5, sm: 1.8 },
                                        py: 0.7,
                                        borderRadius: 99,
                                        border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
                                        backgroundColor: alpha(theme.palette.background.default, 0.4),
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            bgcolor: accent,
                                            boxShadow: `0 0 8px ${accent}`,
                                        }}
                                    />
                                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
                                        {tech}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>

                        {hasLinks ? (
                            <Stack direction="row" flexWrap="wrap" gap={1.5}>
                                {project.liveUrl && (
                                    <LinkButton
                                        href={project.liveUrl}
                                        icon={<OpenInNewRounded />}
                                        primary
                                        accent={accent}
                                    >
                                        Live preview
                                    </LinkButton>
                                )}
                                {project.repoUrl && (
                                    <LinkButton
                                        href={project.repoUrl}
                                        icon={<GitHub />}
                                        accent={accent}
                                    >
                                        Source code
                                    </LinkButton>
                                )}
                            </Stack>
                        ) : (
                            <Stack direction="row" alignItems="center" spacing={1.2}>
                                <Box
                                    component={motion.div}
                                    animate={{ opacity: [1, 0.35, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        bgcolor: accent,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 600, letterSpacing: "0.03em" }}
                                >
                                    Links coming soon
                                </Typography>
                            </Stack>
                        )}
                    </Box>
                </Box>

                {/* Right: preview */}
                <Box sx={{ order: { xs: 1, md: 2 }, minWidth: 0, minHeight: 0 }}>
                    <ProjectPreview project={project} fill={isSticky} />
                </Box>
            </Box>
        </Box>
    );
};

/* ---------- main ---------- */

const Projects = () => {
    const theme = useTheme();

    /*
      The stacking effect needs room: wide AND tall screens only.
      On phones, tablets and short windows it becomes a normal list.
    */
    const isSticky = useMediaQuery("(min-width:900px) and (min-height:720px)", {
        noSsr: true,
    });
    const listRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: listRef,
        offset: ["start start", "end end"],
    });

    const scrollToContact = () =>
        document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

    return (
        <Box
            component="section"
            id="projects"
            sx={{
                position: "relative",
                /* "clip" keeps sticky working; "hidden" is the safe fallback otherwise */
                overflow: isSticky ? "clip" : "hidden",
                py: { xs: 9, sm: 12, md: 18 },
            }}
        >
            {/* Glows */}
            <Box
                sx={{
                    position: "absolute",
                    top: "3%",
                    left: "-14%",
                    width: { xs: 320, md: 540 },
                    height: { xs: 320, md: 540 },
                    borderRadius: "50%",
                    background: alpha(theme.palette.primary.main, 0.2),
                    filter: "blur(130px)",
                    pointerEvents: "none",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: "40%",
                    right: "-14%",
                    width: { xs: 300, md: 500 },
                    height: { xs: 300, md: 500 },
                    borderRadius: "50%",
                    background: alpha(theme.palette.secondary.main, 0.1),
                    filter: "blur(130px)",
                    pointerEvents: "none",
                }}
            />

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
                {/* ============ HEADER ============ */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "1.3fr 0.7fr" },
                        alignItems: "end",
                        gap: { xs: 5, md: 10 },
                        mb: { xs: 6, sm: 8, md: 12 },
                    }}
                >
                    <Box sx={{ minWidth: 0 }}>
                        <Reveal>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1.8}
                                sx={{ mb: { xs: 2.5, md: 3.5 } }}
                            >
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
                                    Selected work
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
                                }}
                            >
                                Projects I've been
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
                                    building.
                                </Box>
                            </Typography>
                        </Reveal>
                    </Box>

                    <Reveal delay={0.16}>
                        <Box sx={{ maxWidth: 440, ml: { md: "auto" } }}>
                            <Typography
                                sx={{
                                    fontSize: { xs: "2.6rem", md: "3.6rem" },
                                    fontWeight: 800,
                                    lineHeight: 1,
                                    letterSpacing: "-0.04em",
                                    mb: 1.2,
                                    background: `linear-gradient(120deg, ${theme.palette.text.primary}, ${theme.palette.primary.light})`,
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {pad(projects.length)}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                sx={{
                                    lineHeight: 1.9,
                                    fontSize: { xs: "1rem", md: "1.02rem" },
                                }}
                            >
                                A selection of projects that reflects my learning,
                                problem-solving, and practical web development experience.
                            </Typography>
                        </Box>
                    </Reveal>
                </Box>

                {/* ============ PROJECT CARDS ============ */}
                <Box ref={listRef} sx={{ position: "relative" }}>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.name}
                            project={project}
                            index={index}
                            total={projects.length}
                            progress={scrollYProgress}
                            isSticky={isSticky}
                        />
                    ))}
                </Box>

                {/* ============ CLOSING CTA ============ */}
                <Reveal sx={{ mt: { xs: 6, sm: 8, md: 6 } }}>
                    <Box
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            p: { xs: 3, sm: 5, md: 8 },
                            borderRadius: { xs: 5, md: 6 },
                            textAlign: "center",
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
                            background: `radial-gradient(circle at 50% 0%, ${alpha(theme.palette.primary.main, 0.3)}, transparent 60%), ${theme.palette.background.paper}`,
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                display: "block",
                                color: "secondary.main",
                                fontWeight: 700,
                                lineHeight: 1.7,
                                letterSpacing: { xs: "0.1em", sm: "0.22em" },
                                fontSize: { xs: "0.68rem", sm: "0.75rem" },
                            }}
                        >
                            More projects and improvements are on the way
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                mt: 2,
                                mb: { xs: 3, md: 4 },
                                fontWeight: 800,
                                letterSpacing: "-0.04em",
                                lineHeight: 1.12,
                                fontSize: {
                                    xs: "clamp(1.6rem, 7.5vw, 2.2rem)",
                                    sm: "2.6rem",
                                    md: "3.4rem",
                                },
                            }}
                        >
                            Have a project in mind?
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
                                Let's build it.
                            </Box>
                        </Typography>

                        <Box
                            onClick={scrollToContact}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: { xs: 1.5, sm: 2 },
                                width: { xs: "100%", sm: "fit-content" },
                                mx: "auto",
                                pl: { xs: 3, sm: 4 },
                                pr: 1,
                                py: 1,
                                borderRadius: 99,
                                cursor: "pointer",
                                fontWeight: 700,
                                fontSize: { xs: "0.92rem", sm: "1rem" },
                                textAlign: "left",
                                color: "#fff",
                                WebkitTapHighlightColor: "transparent",
                                background: `linear-gradient(110deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                boxShadow: `0 14px 40px ${alpha(theme.palette.primary.main, 0.45)}`,
                                transition: "all .3s ease",
                                "@media (hover: hover)": {
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: `0 20px 54px ${alpha(theme.palette.primary.main, 0.6)}`,
                                    },
                                    "&:hover .circle": { transform: "rotate(45deg)" },
                                },
                            }}
                        >
                            Start a conversation
                            <Box
                                className="circle"
                                sx={{
                                    width: { xs: 44, sm: 52 },
                                    height: { xs: 44, sm: 52 },
                                    flexShrink: 0,
                                    borderRadius: "50%",
                                    bgcolor: "#fff",
                                    color: theme.palette.primary.dark,
                                    display: "grid",
                                    placeItems: "center",
                                    transition: "transform .35s ease",
                                }}
                            >
                                <ArrowOutwardRounded />
                            </Box>
                        </Box>
                    </Box>
                </Reveal>
            </Container>
        </Box>
    );
};

export default Projects;