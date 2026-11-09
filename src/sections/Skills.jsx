import { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
    CodeRounded,
    DevicesRounded,
    PaletteRounded,
    ApiRounded,
    AutoAwesomeRounded,
    TerminalRounded,
    ArrowForwardRounded,
} from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const skillGroups = [
    {
        title: "Frontend Development",
        description: "Building responsive, interactive web experiences.",
        icon: <CodeRounded />,
        skills: ["HTML5", "CSS3", "JavaScript", "React", "React Router"],
    },
    {
        title: "UI & Component Design",
        description: "Creating consistent interfaces and reusable components.",
        icon: <PaletteRounded />,
        skills: ["Material UI", "Responsive Layouts", "Component Reuse"],
    },
    {
        title: "API Integration",
        description: "Connecting interfaces to backend services.",
        icon: <ApiRounded />,
        skills: ["REST APIs", "Fetch", "Authentication Flows"],
    },
    {
        title: "Tools & Workflow",
        description: "Developing, testing, and publishing web applications.",
        icon: <TerminalRounded />,
        skills: ["Git", "GitHub", "Vite", "Vercel"],
    },
    {
        title: "Responsive Experiences",
        description: "Adapting layouts to phones, tablets, and desktops.",
        icon: <DevicesRounded />,
        skills: ["Mobile-First Design", "CSS Flexbox", "CSS Grid"],
    },
    {
        title: "AI-Powered Projects",
        description: "Exploring AI integration in practical web products.",
        icon: <AutoAwesomeRounded />,
        skills: ["AI API Integration", "Prompt Integration"],
    },
];

const allSkills = skillGroups.flatMap((g) => g.skills);
const totalSkills = allSkills.length;

const pad = (n) => String(n).padStart(2, "0");

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

const OrbitIcon = ({ icon, sx }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                width: { xs: 140, sm: 176 },
                aspectRatio: "1 / 1",
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                ...sx,
            }}
        >
            {/* Outer ring */}
            <Box
                component={motion.div}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: `1px dashed ${alpha(theme.palette.secondary.main, 0.4)}`,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: -5,
                        left: "calc(50% - 5px)",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: "secondary.main",
                        boxShadow: `0 0 16px ${theme.palette.secondary.main}`,
                    }}
                />
            </Box>

            {/* Inner ring */}
            <Box
                component={motion.div}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                sx={{
                    position: "absolute",
                    inset: "15%",
                    borderRadius: "50%",
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        bottom: -4,
                        left: "calc(50% - 4px)",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "primary.light",
                        boxShadow: `0 0 14px ${theme.palette.primary.main}`,
                    }}
                />
            </Box>

            {/* Core */}
            <Box
                sx={{
                    width: "43%",
                    aspectRatio: "1 / 1",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 3.5,
                    color: "#fff",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 14px 44px ${alpha(theme.palette.primary.main, 0.55)}`,
                    "& svg": { fontSize: { xs: 30, sm: 38 } },
                }}
            >
                {icon}
            </Box>
        </Box>
    );
};

const MarqueeRow = ({ items, reverse = false, duration = 40 }) => {
    const theme = useTheme();
    const doubled = [...items, ...items];

    return (
        <Box
            sx={{
                overflow: "hidden",
                maskImage:
                    "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                    "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            }}
        >
            <Box
                component={motion.div}
                animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration, ease: "linear", repeat: Infinity }}
                sx={{ display: "flex", gap: { xs: 1.4, md: 2 }, width: "max-content" }}
            >
                {doubled.map((skill, i) => (
                    <Stack
                        key={`${skill}-${i}`}
                        direction="row"
                        alignItems="center"
                        spacing={{ xs: 1.1, md: 1.4 }}
                        sx={{
                            px: { xs: 2.2, md: 3 },
                            py: { xs: 1.1, md: 1.5 },
                            borderRadius: 99,
                            whiteSpace: "nowrap",
                            border: `1px solid ${theme.palette.divider}`,
                            backgroundColor: alpha(theme.palette.background.paper, 0.6),
                            transition: "all .3s ease",
                            "@media (hover: hover)": {
                                "&:hover": {
                                    borderColor: alpha(theme.palette.secondary.main, 0.55),
                                    backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                                },
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            }}
                        />
                        <Typography
                            sx={{ fontWeight: 600, fontSize: { xs: "0.85rem", md: "0.95rem" } }}
                        >
                            {skill}
                        </Typography>
                    </Stack>
                ))}
            </Box>
        </Box>
    );
};

/* ---------- main ---------- */

const Skills = () => {
    const theme = useTheme();
    const [active, setActive] = useState(0);
    const current = skillGroups[active];
    const listRef = useRef(null);

    /* On phones: keep the selected pill centered in the scrolling row */
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        if (list.scrollWidth <= list.clientWidth + 2) return; // desktop: not scrollable
        const el = list.children[active];
        if (!el) return;
        list.scrollTo({
            left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2,
            behavior: "smooth",
        });
    }, [active]);

    return (
        <Box
            component="section"
            id="skills"
            sx={{
                position: "relative",
                overflow: "hidden",
                py: { xs: 9, sm: 12, md: 18 },
            }}
        >
            {/* Glows */}
            <Box
                sx={{
                    position: "absolute",
                    top: "6%",
                    right: "-12%",
                    width: { xs: 320, md: 520 },
                    height: { xs: 320, md: 520 },
                    borderRadius: "50%",
                    background: alpha(theme.palette.primary.main, 0.2),
                    filter: "blur(130px)",
                    pointerEvents: "none",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "4%",
                    left: "-12%",
                    width: { xs: 280, md: 460 },
                    height: { xs: 280, md: 460 },
                    borderRadius: "50%",
                    background: alpha(theme.palette.secondary.main, 0.1),
                    filter: "blur(130px)",
                    pointerEvents: "none",
                }}
            />

            {/* Dot grid */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: 0.35,
                    backgroundImage: `radial-gradient(${alpha(theme.palette.text.primary, 0.35)} 1px, transparent 1px)`,
                    backgroundSize: "34px 34px",
                    maskImage:
                        "radial-gradient(ellipse at 50% 30%, black 10%, transparent 70%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse at 50% 30%, black 10%, transparent 70%)",
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
                                    My toolkit
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
                                    mb: { xs: 2.5, md: 3 },
                                }}
                            >
                                The skills behind
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
                                    the work.
                                </Box>
                            </Typography>
                        </Reveal>

                        <Reveal delay={0.16}>
                            <Typography
                                color="text.secondary"
                                sx={{
                                    maxWidth: 600,
                                    lineHeight: { xs: 1.9, md: 1.95 },
                                    fontSize: { xs: "1rem", md: "1.06rem" },
                                }}
                            >
                                The technologies and practical skills I use to build, improve,
                                and maintain modern web experiences.
                            </Typography>
                        </Reveal>
                    </Box>

                    {/* Counts */}
                    <Reveal delay={0.2}>
                        <Stack
                            direction="row"
                            spacing={{ xs: 5, md: 6 }}
                            sx={{ justifyContent: { xs: "flex-start", md: "flex-end" } }}
                        >
                            {[
                                { value: skillGroups.length, label: "Focus areas" },
                                { value: totalSkills, label: "Technologies" },
                            ].map((stat) => (
                                <Box key={stat.label}>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: "2.6rem", md: "3.6rem" },
                                            fontWeight: 800,
                                            lineHeight: 1,
                                            letterSpacing: "-0.04em",
                                            background: `linear-gradient(120deg, ${theme.palette.text.primary}, ${theme.palette.primary.light})`,
                                            backgroundClip: "text",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: "block", mt: 1, letterSpacing: "0.08em" }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Reveal>
                </Box>

                {/* ============ SHOWCASE ============ */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "0.78fr 1.22fr" },
                        gap: { xs: 2.5, md: 4, lg: 8 },
                        alignItems: "stretch",
                    }}
                >
                    {/* Category list */}
                    <Reveal sx={{ minWidth: 0 }}>
                        <Box
                            ref={listRef}
                            sx={{
                                position: "relative",
                                display: "flex",
                                flexDirection: { xs: "row", md: "column" },
                                gap: { xs: 1.2, md: 1 },
                                overflowX: { xs: "auto", md: "visible" },
                                /* let the pills run edge to edge on phones */
                                mx: { xs: -2, sm: -3, md: 0 },
                                px: { xs: 2, sm: 3, md: 0 },
                                pb: { xs: 1.5, md: 0 },
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": { display: "none" },
                                WebkitOverflowScrolling: "touch",
                                maskImage: {
                                    xs: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
                                    md: "none",
                                },
                                WebkitMaskImage: {
                                    xs: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
                                    md: "none",
                                },
                            }}
                        >
                            {skillGroups.map((group, i) => {
                                const isActive = i === active;
                                return (
                                    <Box
                                        key={group.title}
                                        onClick={() => setActive(i)}
                                        onMouseEnter={() => setActive(i)}
                                        sx={{
                                            position: "relative",
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: { xs: 1.5, md: 2.5 },
                                            px: { xs: 2.4, md: 3 },
                                            py: { xs: 1.4, md: 2.2 },
                                            borderRadius: { xs: 99, md: 4 },
                                            cursor: "pointer",
                                            userSelect: "none",
                                            WebkitTapHighlightColor: "transparent",
                                            border: `1px solid ${isActive
                                                ? "transparent"
                                                : alpha(theme.palette.text.primary, 0.1)}`,
                                        }}
                                    >
                                        {isActive && (
                                            <Box
                                                component={motion.div}
                                                layoutId="skill-active"
                                                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    borderRadius: { xs: 99, md: 4 },
                                                    background: `linear-gradient(110deg, ${alpha(theme.palette.primary.main, 0.26)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                                                    boxShadow: `0 10px 36px ${alpha(theme.palette.primary.main, 0.2)}`,
                                                }}
                                            />
                                        )}

                                        <Typography
                                            sx={{
                                                position: "relative",
                                                zIndex: 1,
                                                display: { xs: "none", md: "block" },
                                                fontSize: "0.85rem",
                                                fontWeight: 700,
                                                color: isActive ? "secondary.main" : "text.secondary",
                                                transition: "color .3s ease",
                                            }}
                                        >
                                            {pad(i + 1)}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                position: "relative",
                                                zIndex: 1,
                                                flex: 1,
                                                whiteSpace: "nowrap",
                                                fontWeight: isActive ? 700 : 600,
                                                fontSize: { xs: "0.9rem", md: "1.1rem", lg: "1.18rem" },
                                                letterSpacing: "-0.015em",
                                                color: isActive ? "text.primary" : "text.secondary",
                                                transition: "color .3s ease",
                                            }}
                                        >
                                            {group.title}
                                        </Typography>

                                        <ArrowForwardRounded
                                            sx={{
                                                position: "relative",
                                                zIndex: 1,
                                                display: { xs: "none", md: "block" },
                                                fontSize: 22,
                                                color: "secondary.main",
                                                opacity: isActive ? 1 : 0,
                                                transform: isActive ? "translateX(0)" : "translateX(-10px)",
                                                transition: "all .35s ease",
                                            }}
                                        />
                                    </Box>
                                );
                            })}
                        </Box>
                    </Reveal>

                    {/* Detail panel */}
                    <Reveal delay={0.1} sx={{ minWidth: 0 }}>
                        <Box
                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                height: "100%",
                                minHeight: { xs: 0, sm: 520, md: 560 },
                                p: { xs: 2.8, sm: 4, md: 4, lg: 6 },
                                borderRadius: { xs: 5, md: 6 },
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.92)}, ${alpha(theme.palette.primary.main, 0.09)})`,
                                boxShadow: `0 40px 100px ${alpha("#000", 0.35)}`,
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <Box
                                    key={current.title}
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.45, ease: EASE }}
                                    sx={{ position: "relative", height: "100%" }}
                                >
                                    {/* Giant outlined number */}
                                    <Typography
                                        sx={{
                                            position: "absolute",
                                            right: -8,
                                            bottom: -40,
                                            fontSize: { xs: "8rem", sm: "10rem", md: "11rem", lg: "15rem" },
                                            fontWeight: 900,
                                            lineHeight: 1,
                                            letterSpacing: "-0.06em",
                                            color: "transparent",
                                            WebkitTextStroke: `1.5px ${alpha(theme.palette.text.primary, 0.09)}`,
                                            pointerEvents: "none",
                                            userSelect: "none",
                                        }}
                                    >
                                        {pad(active + 1)}
                                    </Typography>

                                    {/* Icon beside text only where there is room (sm and lg+) */}
                                    <Stack
                                        direction={{
                                            xs: "column-reverse",
                                            sm: "row",
                                            md: "column-reverse",
                                            lg: "row",
                                        }}
                                        justifyContent="space-between"
                                        alignItems={{
                                            xs: "stretch",
                                            sm: "center",
                                            md: "stretch",
                                            lg: "center",
                                        }}
                                        spacing={{ xs: 3.5, sm: 4 }}
                                        sx={{ position: "relative", zIndex: 1 }}
                                    >
                                        <Box sx={{ maxWidth: 440, minWidth: 0 }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    display: "block",
                                                    mb: 2,
                                                    fontWeight: 700,
                                                    letterSpacing: "0.2em",
                                                    color: "secondary.main",
                                                }}
                                            >
                                                {pad(active + 1)} / {pad(skillGroups.length)}
                                            </Typography>

                                            <Typography
                                                variant="h3"
                                                sx={{
                                                    fontWeight: 800,
                                                    letterSpacing: "-0.035em",
                                                    lineHeight: 1.12,
                                                    fontSize: {
                                                        xs: "clamp(1.65rem, 7.5vw, 2.1rem)",
                                                        sm: "2.4rem",
                                                        md: "2.4rem",
                                                        lg: "2.9rem",
                                                    },
                                                    mb: 2,
                                                    overflowWrap: "anywhere",
                                                }}
                                            >
                                                {current.title}
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    lineHeight: 1.9,
                                                    fontSize: { xs: "1rem", md: "1.06rem" },
                                                }}
                                            >
                                                {current.description}
                                            </Typography>
                                        </Box>

                                        <OrbitIcon
                                            icon={current.icon}
                                            sx={{
                                                alignSelf: {
                                                    xs: "center",
                                                    sm: "auto",
                                                    md: "center",
                                                    lg: "auto",
                                                },
                                            }}
                                        />
                                    </Stack>

                                    <Box
                                        sx={{
                                            position: "relative",
                                            zIndex: 1,
                                            mt: { xs: 4, md: 6 },
                                            pt: { xs: 3, md: 4 },
                                            borderTop: `1px solid ${theme.palette.divider}`,
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            sx={{ mb: 2.5 }}
                                        >
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    letterSpacing: { xs: "0.12em", sm: "0.18em" },
                                                    fontWeight: 600,
                                                }}
                                            >
                                                TECHNOLOGIES & SKILLS
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ color: "secondary.main", fontWeight: 700 }}
                                            >
                                                {current.skills.length} total
                                            </Typography>
                                        </Stack>

                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns: {
                                                    xs: "minmax(0, 1fr)",
                                                    sm: "repeat(2, minmax(0, 1fr))",
                                                    xl: "repeat(3, minmax(0, 1fr))",
                                                },
                                                gap: { xs: 1.2, md: 1.6 },
                                            }}
                                        >
                                            {current.skills.map((skill, i) => (
                                                <Box
                                                    key={skill}
                                                    component={motion.div}
                                                    initial={{ opacity: 0, y: 18 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: EASE }}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1.8,
                                                        px: { xs: 2, md: 2.2 },
                                                        py: { xs: 1.5, md: 1.8 },
                                                        borderRadius: 3,
                                                        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                                                        backgroundColor: alpha(theme.palette.background.default, 0.55),
                                                        backdropFilter: "blur(10px)",
                                                        transition: "all .3s ease",
                                                        cursor: "default",
                                                        "@media (hover: hover)": {
                                                            "&:hover": {
                                                                transform: "translateY(-4px)",
                                                                borderColor: alpha(theme.palette.secondary.main, 0.6),
                                                                backgroundColor: alpha(theme.palette.secondary.main, 0.09),
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            flexShrink: 0,
                                                            fontSize: "0.72rem",
                                                            fontWeight: 800,
                                                            color: "secondary.main",
                                                            letterSpacing: "0.04em",
                                                        }}
                                                    >
                                                        {pad(i + 1)}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: { xs: "0.93rem", md: "0.97rem" },
                                                            overflowWrap: "anywhere",
                                                        }}
                                                    >
                                                        {skill}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </AnimatePresence>
                        </Box>
                    </Reveal>
                </Box>

                {/* ============ MARQUEES ============ */}
                <Reveal sx={{ mt: { xs: 8, sm: 10, md: 16 } }}>
                    <Stack spacing={{ xs: 1.6, md: 2.2 }}>
                        <MarqueeRow items={allSkills} duration={46} />
                        <MarqueeRow items={[...allSkills].reverse()} reverse duration={52} />
                    </Stack>
                </Reveal>
            </Container>
        </Box>
    );
};

export default Skills;