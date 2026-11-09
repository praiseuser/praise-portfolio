import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
    ArrowDownwardRounded,
    EastRounded,
    GitHub,
    LinkedIn,
    WhatsApp,
} from "@mui/icons-material";
import { motion, useReducedMotion } from "framer-motion";

/* Adjust the path if Hero is not in src/components */
import logo from "../assets/mylogo.png";

const EASE = [0.22, 1, 0.36, 1];
const WHITE = "#FFFFFF";

/*
  CV: put your CV file in the /public folder (e.g. public/praise-cv.pdf)
  then set CV_URL = "/praise-cv.pdf". While empty, the main button
  becomes "Let's talk" and scrolls to your Contact section.
*/
const CV_URL = "";

/* TODO: replace GitHub and LinkedIn with your real profile links */
const SOCIALS = [
    {
        label: "GitHub",
        icon: <GitHub sx={{ fontSize: 17 }} />,
        href: "https://github.com/praiseuser",
    },
    {
        label: "LinkedIn",
        icon: <LinkedIn sx={{ fontSize: 18 }} />,
        href: "https://www.linkedin.com/",
    },
    {
        label: "WhatsApp",
        icon: <WhatsApp sx={{ fontSize: 17 }} />,
        href: "https://wa.me/2349049234425",
    },
];

/* Orbit rings: size = % of the scene, angle = starting position on the ring */
const ORBITS = [
    {
        size: 100,
        duration: 60,
        reverse: false,
        dashed: false,
        chips: [
            { label: "React", color: "#FAFAFA", angle: -55 },
            { label: "Framer Motion", color: "#D4D4D4", angle: 70 },
            { label: "Three.js", color: "#A3A3A3", angle: 200 },
        ],
    },
    {
        size: 76,
        duration: 44,
        reverse: true,
        dashed: true,
        chips: [
            { label: "Material UI", color: "#E5E5E5", angle: 15 },
            { label: "Vite", color: "#BDBDBD", angle: 195 },
        ],
    },
    {
        size: 54,
        duration: 30,
        reverse: false,
        dashed: false,
        chips: [
            { label: "JavaScript", color: "#FAFAFA", angle: -95 },
            { label: "REST APIs", color: "#A3A3A3", angle: 85 },
        ],
    },
];

const SPARKLES = [
    { top: "6%", left: "24%", delay: 0 },
    { top: "16%", left: "92%", delay: 0.8 },
    { top: "46%", left: "-2%", delay: 1.6 },
    { top: "82%", left: "14%", delay: 0.4 },
    { top: "92%", left: "70%", delay: 1.2 },
    { top: "30%", left: "100%", delay: 2 },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const Item = ({ children, sx }) => (
    <Box component={motion.div} variants={item} sx={sx}>
        {children}
    </Box>
);

/* Looping animation that switches off for "reduce motion" users */
const loop = (reduce, animate, transition) =>
    reduce ? {} : { animate, transition: { repeat: Infinity, ...transition } };

const SocialCircle = ({ social }) => {
    const theme = useTheme();
    return (
        <Box
            component="a"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            sx={{
                width: 36,
                height: 36,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                color: "text.secondary",
                backgroundColor: alpha(theme.palette.background.paper, 0.7),
                border: `1px solid ${alpha(theme.palette.text.primary, 0.22)}`,
                transition: "all .3s ease",
                "@media (hover: hover)": {
                    "&:hover": {
                        color: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.main,
                        borderColor: "transparent",
                        transform: "translateY(-3px)",
                        boxShadow: `0 8px 22px ${alpha(WHITE, 0.25)}`,
                    },
                },
            }}
        >
            {social.icon}
        </Box>
    );
};

/* ---------- decorative shapes (white and ash) ---------- */

const Triangle = () => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
            <linearGradient id="triA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#A3A3A3" />
            </linearGradient>
        </defs>
        <polygon
            points="50,12 90,82 10,82"
            fill="url(#triA)"
            stroke="url(#triA)"
            strokeWidth="12"
            strokeLinejoin="round"
        />
        <polygon
            points="50,12 90,82 52,62"
            fill="#525252"
            opacity="0.5"
            stroke="#525252"
            strokeWidth="2"
            strokeLinejoin="round"
        />
    </svg>
);

const Coil = () => (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
            <linearGradient id="coilA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#8A8A8A" />
            </linearGradient>
        </defs>
        {[16, 34, 52, 70].map((cy) => (
            <ellipse
                key={cy}
                cx="50"
                cy={cy}
                rx="36"
                ry="9"
                fill="none"
                stroke="url(#coilA)"
                strokeWidth="9"
                strokeLinecap="round"
            />
        ))}
    </svg>
);

/* ---------- orbit pieces ---------- */

const TechChip = ({ label, color }) => {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.7, md: 1 }}
            sx={{
                px: { xs: 1.2, md: 1.8 },
                py: { xs: 0.6, md: 0.9 },
                borderRadius: 99,
                whiteSpace: "nowrap",
                backgroundColor: alpha(theme.palette.background.paper, 0.85),
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: `1px solid ${alpha(color, 0.3)}`,
                boxShadow: `0 10px 30px ${alpha("#000", 0.5)}`,
            }}
        >
            <Box
                sx={{
                    width: { xs: 6, md: 8 },
                    height: { xs: 6, md: 8 },
                    borderRadius: "50%",
                    bgcolor: color,
                    boxShadow: `0 0 10px ${alpha(color, 0.7)}`,
                }}
            />
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.62rem", md: "0.78rem" },
                    letterSpacing: "0.01em",
                }}
            >
                {label}
            </Typography>
        </Stack>
    );
};

const Orbit = ({ size, duration, reverse, dashed, chips, reduce }) => {
    const theme = useTheme();
    const dir = reverse ? -1 : 1;

    return (
        <Box
            component={motion.div}
            {...loop(reduce, { rotate: 360 * dir }, { duration, ease: "linear" })}
            sx={{
                position: "absolute",
                inset: `${(100 - size) / 2}%`,
                borderRadius: "50%",
                border: `1px ${dashed ? "dashed" : "solid"} ${alpha(
                    theme.palette.text.primary,
                    dashed ? 0.2 : 0.14
                )}`,
            }}
        >
            {chips.map((chip) => {
                const rad = (chip.angle * Math.PI) / 180;
                return (
                    <Box
                        key={chip.label}
                        sx={{
                            position: "absolute",
                            left: `${50 + 50 * Math.cos(rad)}%`,
                            top: `${50 + 50 * Math.sin(rad)}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        {/* counter-rotate so the chip stays upright */}
                        <Box
                            component={motion.div}
                            {...loop(reduce, { rotate: -360 * dir }, { duration, ease: "linear" })}
                        >
                            <TechChip label={chip.label} color={chip.color} />
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

const OrbitScene = ({ reduce }) => {
    const theme = useTheme();

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: 290, sm: 400, md: 420, lg: 500 },
                aspectRatio: "1 / 1",
                mx: "auto",
                my: { xs: 5, md: 3 },
            }}
        >
            {/* Soft glow behind everything */}
            <Box
                sx={{
                    position: "absolute",
                    inset: "-8%",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${alpha(WHITE, 0.13)} 0%, ${alpha(WHITE, 0.04)} 45%, transparent 70%)`,
                    filter: "blur(50px)",
                }}
            />

            {/* Radar sweep */}
            <Box
                component={motion.div}
                {...loop(reduce, { rotate: 360 }, { duration: 14, ease: "linear" })}
                sx={{
                    position: "absolute",
                    inset: "2%",
                    borderRadius: "50%",
                    background: `conic-gradient(from 0deg, transparent 0deg, transparent 280deg, ${alpha(WHITE, 0.14)} 360deg)`,
                    maskImage: "radial-gradient(circle, transparent 22%, black 23%)",
                    WebkitMaskImage: "radial-gradient(circle, transparent 22%, black 23%)",
                }}
            />

            {/* Orbit rings + chips */}
            {ORBITS.map((orbit) => (
                <Orbit key={orbit.size} {...orbit} reduce={reduce} />
            ))}

            {/* Pulse waves */}
            {!reduce &&
                [0, 1.5].map((delay) => (
                    <Box
                        key={delay}
                        component={motion.div}
                        animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay }}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "26%",
                            aspectRatio: "1 / 1",
                            mt: "-13%",
                            ml: "-13%",
                            borderRadius: "50%",
                            border: `1px solid ${alpha(WHITE, 0.7)}`,
                            pointerEvents: "none",
                        }}
                    />
                ))}

            {/* Core */}
            <Box
                component={motion.div}
                {...loop(reduce, { y: [0, -8, 0] }, { duration: 5, ease: "easeInOut" })}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "26%",
                    aspectRatio: "1 / 1",
                    mt: "-13%",
                    ml: "-13%",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "50%",
                    border: `2px solid ${alpha(WHITE, 0.75)}`,
                    background: `radial-gradient(circle at 30% 25%, ${alpha(WHITE, 0.16)}, ${alpha(theme.palette.background.paper, 0.98)} 70%)`,
                    boxShadow: `0 0 60px ${alpha(WHITE, 0.16)}, 0 0 120px ${alpha(WHITE, 0.08)}, inset 0 0 30px ${alpha(WHITE, 0.1)}`,
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="PraizPilot logo"
                    sx={{ width: "58%", height: "58%", objectFit: "contain" }}
                />
            </Box>

            {/* Sparkles */}
            {SPARKLES.map((s, i) => (
                <Box
                    key={i}
                    component={motion.div}
                    {...loop(
                        reduce,
                        { opacity: [0.15, 1, 0.15], scale: [0.8, 1.4, 0.8] },
                        { duration: 3, delay: s.delay }
                    )}
                    sx={{
                        position: "absolute",
                        top: s.top,
                        left: s.left,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        boxShadow: `0 0 12px ${alpha(WHITE, 0.8)}`,
                    }}
                />
            ))}

            {/* Triangle (top-left) */}
            <Box
                component={motion.div}
                {...loop(reduce, { y: [0, -14, 0], rotate: [-12, -6, -12] }, { duration: 6, ease: "easeInOut" })}
                sx={{
                    position: "absolute",
                    top: { xs: -6, md: -10 },
                    left: { xs: -8, md: -14 },
                    width: { xs: 56, md: 78 },
                    height: { xs: 56, md: 78 },
                    filter: `drop-shadow(0 12px 22px ${alpha(WHITE, 0.22)})`,
                }}
            >
                <Triangle />
            </Box>

            {/* Coil (bottom-right) */}
            <Box
                component={motion.div}
                {...loop(reduce, { y: [0, 12, 0], rotate: [-18, -10, -18] }, { duration: 7, ease: "easeInOut" })}
                sx={{
                    position: "absolute",
                    bottom: { xs: -6, md: -10 },
                    right: { xs: -8, md: -14 },
                    width: { xs: 58, md: 80 },
                    height: { xs: 58, md: 80 },
                    filter: `drop-shadow(0 12px 22px ${alpha(WHITE, 0.2)})`,
                }}
            >
                <Coil />
            </Box>
        </Box>
    );
};

/* ---------- main ---------- */

const Hero = () => {
    const theme = useTheme();
    const reduce = useReducedMotion();

    const scrollTo = (id) =>
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

    /* white -> ash gradient used on the name */
    const accent = `linear-gradient(100deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`;

    return (
        <Box
            component="section"
            id="home"
            sx={{
                position: "relative",
                overflow: "hidden",
                minHeight: { md: "calc(100vh - 88px)" },
                display: "flex",
                alignItems: "center",
                py: { xs: 8, md: 10 },
                background: `radial-gradient(ellipse at 0% 0%, ${alpha(WHITE, 0.06)}, transparent 50%), radial-gradient(ellipse at 100% 100%, ${alpha(WHITE, 0.07)}, transparent 55%)`,
            }}
        >
            {/* Faint dot grid, fading out from the right */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: 0.4,
                    backgroundImage: `radial-gradient(${alpha(WHITE, 0.35)} 1px, transparent 1px)`,
                    backgroundSize: "34px 34px",
                    maskImage: "radial-gradient(ellipse at 75% 50%, black 5%, transparent 65%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 75% 50%, black 5%, transparent 65%)",
                }}
            />

            <Container
                maxWidth="xl"
                sx={{ position: "relative", zIndex: 2, pr: { lg: 12 } }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(2, minmax(0, 1fr))" },
                        alignItems: "center",
                        gap: { xs: 8, md: 6, lg: 10 },
                    }}
                >
                    {/* ---------- TEXT ---------- */}
                    <Box
                        component={motion.div}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        sx={{ pl: { md: 2, lg: 6 }, minWidth: 0 }}
                    >
                        <Item>
                            <Typography
                                sx={{
                                    color: "secondary.main",
                                    fontWeight: 500,
                                    fontSize: { xs: "1rem", md: "1.1rem" },
                                    mb: 2,
                                }}
                            >
                                Welcome to my portfolio!
                            </Typography>
                        </Item>

                        <Item>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: {
                                        xs: "clamp(2.4rem, 11vw, 3rem)",
                                        sm: "4rem",
                                        md: "3.6rem",
                                        lg: "4.8rem",
                                    },
                                    fontWeight: 700,
                                    lineHeight: 1.15,
                                    letterSpacing: "-0.035em",
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        background: `linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.5)}, ${theme.palette.text.primary})`,
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Hello,
                                </Box>{" "}
                                my
                                <br />
                                name's{" "}
                                <Box
                                    component="span"
                                    sx={{
                                        background: accent,
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Praise Nwachukwu
                                </Box>
                                .
                            </Typography>
                        </Item>

                        {/* Nickname */}
                        <Item>
                            <Stack
                                direction="row"
                                alignItems="center"
                                flexWrap="wrap"
                                columnGap={1.8}
                                rowGap={0.5}
                                sx={{ mt: { xs: 2, md: 2.5 } }}
                            >
                                <Box
                                    sx={{
                                        width: 34,
                                        height: 2,
                                        borderRadius: 2,
                                        bgcolor: alpha(theme.palette.text.primary, 0.5),
                                        display: { xs: "none", sm: "block" },
                                    }}
                                />
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        fontWeight: 500,
                                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                                    }}
                                >
                                    a.k.a
                                </Typography>
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: {
                                            xs: "clamp(1.3rem, 6.5vw, 1.7rem)",
                                            sm: "1.9rem",
                                            lg: "2.3rem",
                                        },
                                        fontWeight: 800,
                                        letterSpacing: "0.14em",
                                        lineHeight: 1.1,
                                        color: "transparent",
                                        WebkitTextStroke: `1.2px ${alpha(theme.palette.text.primary, 0.9)}`,
                                        transition: "all .4s ease",
                                        cursor: "default",
                                        "@media (hover: hover)": {
                                            "&:hover": {
                                                color: theme.palette.text.primary,
                                                WebkitTextStroke: "1.2px transparent",
                                            },
                                        },
                                    }}
                                >
                                    JESUS BOY
                                </Typography>
                            </Stack>
                        </Item>

                        <Item>
                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: { xs: 3, md: 3.5 },
                                    maxWidth: 430,
                                    fontSize: { xs: "1rem", md: "1.08rem" },
                                    lineHeight: 1.75,
                                }}
                            >
                                I'm a frontend developer from Abuja, Nigeria. I build
                                modern, responsive websites for ministries, schools,
                                nonprofits and businesses.
                            </Typography>
                        </Item>

                        <Item>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2.2}
                                sx={{ mt: 5 }}
                            >
                                {/* Primary */}
                                <Box
                                    component={CV_URL ? "a" : "div"}
                                    href={CV_URL || undefined}
                                    download={CV_URL ? true : undefined}
                                    onClick={CV_URL ? undefined : () => scrollTo("contact")}
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        px: 5,
                                        py: 1.7,
                                        borderRadius: 99,
                                        cursor: "pointer",
                                        fontWeight: 700,
                                        fontSize: "0.95rem",
                                        color: theme.palette.primary.contrastText,
                                        backgroundColor: theme.palette.primary.main,
                                        boxShadow: `0 12px 36px ${alpha(WHITE, 0.16)}`,
                                        transition: "all .3s ease",
                                        WebkitTapHighlightColor: "transparent",
                                        "@media (hover: hover)": {
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                backgroundColor: WHITE,
                                                boxShadow: `0 18px 48px ${alpha(WHITE, 0.28)}`,
                                            },
                                        },
                                    }}
                                >
                                    {CV_URL ? "Download CV" : "Let's talk"}
                                </Box>

                                {/* Secondary */}
                                <Box
                                    onClick={() => scrollTo("projects")}
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1.5,
                                        px: 4.5,
                                        py: 1.7,
                                        borderRadius: 99,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: "0.95rem",
                                        border: `1px solid ${alpha(theme.palette.text.primary, 0.3)}`,
                                        transition: "all .3s ease",
                                        WebkitTapHighlightColor: "transparent",
                                        "& svg": { transition: "transform .3s ease", fontSize: 20 },
                                        "@media (hover: hover)": {
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                borderColor: theme.palette.primary.main,
                                                backgroundColor: alpha(WHITE, 0.06),
                                            },
                                            "&:hover svg": { transform: "translateX(5px)" },
                                        },
                                    }}
                                >
                                    See my work
                                    <EastRounded />
                                </Box>
                            </Stack>
                        </Item>

                        {/* Social row (mobile / tablet only) */}
                        <Item sx={{ display: { xs: "block", lg: "none" }, mt: 5 }}>
                            <Stack direction="row" alignItems="center" spacing={1.6} flexWrap="wrap" useFlexGap>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ letterSpacing: "0.2em", fontWeight: 600 }}
                                >
                                    FOLLOW ME ON
                                </Typography>
                                {SOCIALS.map((s) => (
                                    <SocialCircle key={s.label} social={s} />
                                ))}
                            </Stack>
                        </Item>
                    </Box>

                    {/* ---------- ORBIT SCENE ---------- */}
                    <Box sx={{ display: "flex", justifyContent: "center", px: { xs: 3, sm: 0 }, minWidth: 0 }}>
                        <OrbitScene reduce={reduce} />
                    </Box>
                </Box>

                {/* ---------- VERTICAL SOCIAL STRIP (desktop) ---------- */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    sx={{
                        position: "absolute",
                        right: { lg: 14, xl: 24 },
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: { xs: "none", lg: "flex" },
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{
                            writingMode: "vertical-rl",
                            letterSpacing: "0.3em",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: "text.secondary",
                        }}
                    >
                        FOLLOW ME ON
                    </Typography>

                    <Box
                        sx={{
                            width: 1,
                            height: 38,
                            bgcolor: alpha(theme.palette.text.primary, 0.35),
                        }}
                    />
                    <ArrowDownwardRounded
                        sx={{ fontSize: 15, mt: -1.8, color: "text.secondary" }}
                    />

                    <Stack spacing={1.6} sx={{ mt: 0.5 }}>
                        {SOCIALS.map((s) => (
                            <SocialCircle key={s.label} social={s} />
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;