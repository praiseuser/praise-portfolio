import { useEffect, useState } from "react";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
    ArrowOutwardRounded,
    EmailRounded,
    GitHub,
    KeyboardArrowUpRounded,
    LinkedIn,
    WhatsApp,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

/* Adjust the path if Footer is not in src/components */
import logo from "../assets/mylogo.png";

const EASE = [0.22, 1, 0.36, 1];

const EMAIL = "praisenwachukwu255@gmail.com";
const WHATSAPP_NUMBER = "2349049234425";
const WHATSAPP_DISPLAY = "0904 923 4425";

const quickLinks = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
];

const services = [
    "Business Websites",
    "Responsive Web Design",
    "React Development",
    "API Integration",
    "Website Improvements",
];

/* TODO: replace with your real profile links */
const socialLinks = [
    {
        label: "GitHub",
        icon: <GitHub />,
        href: "https://github.com/praiseuser",
    },
    {
        label: "LinkedIn",
        icon: <LinkedIn />,
        href: "https://www.linkedin.com/",
    },
    {
        label: "WhatsApp",
        icon: <WhatsApp />,
        href: `https://wa.me/${WHATSAPP_NUMBER}`,
    },
    {
        label: "Email",
        icon: <EmailRounded />,
        href: `mailto:${EMAIL}`,
    },
];

const Reveal = ({ children, delay = 0, sx }) => (
    <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay, ease: EASE }}
        sx={sx}
    >
        {children}
    </Box>
);

const ColumnTitle = ({ children }) => (
    <Typography
        variant="caption"
        sx={{
            display: "block",
            mb: 3,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "secondary.main",
        }}
    >
        {children}
    </Typography>
);

const Footer = () => {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();
    const [time, setTime] = useState("");

    /* Live Abuja time */
    useEffect(() => {
        const tick = () =>
            setTime(
                new Date().toLocaleTimeString("en-GB", {
                    timeZone: "Africa/Lagos",
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        tick();
        const id = setInterval(tick, 30000);
        return () => clearInterval(id);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const handleSectionLink = (event, href) => {
        if (!href.startsWith("/#")) return;

        const id = href.split("#")[1];

        if (window.location.pathname === "/") {
            event.preventDefault();

            if (id === "home") {
                scrollToTop();
                return;
            }

            document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <Box
            component="footer"
            sx={{
                position: "relative",
                overflow: "hidden",
                pt: { xs: 9, md: 14 },
                borderTop: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
            }}
        >
            {/* Top glow */}
            <Box
                sx={{
                    position: "absolute",
                    top: -220,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 640,
                    height: 320,
                    borderRadius: "50%",
                    background: alpha(theme.palette.primary.main, 0.28),
                    filter: "blur(120px)",
                    pointerEvents: "none",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "12%",
                    right: "-12%",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    background: alpha(theme.palette.secondary.main, 0.1),
                    filter: "blur(120px)",
                    pointerEvents: "none",
                }}
            />

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
                {/* ============ COLUMNS ============ */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                            lg: "1.5fr 0.7fr 0.95fr 1.15fr",
                        },
                        gap: { xs: 7, sm: 6, lg: 8 },
                    }}
                >
                    {/* Brand */}
                    <Reveal sx={{ gridColumn: { sm: "1 / -1", lg: "auto" } }}>
                        <Stack direction="row" alignItems="center" spacing={1.8} sx={{ mb: 3 }}>
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    flexShrink: 0,
                                    display: "grid",
                                    placeItems: "center",
                                    borderRadius: "50%",
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                    boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.25)}`,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={logo}
                                    alt="PraizPilot logo"
                                    sx={{ width: 36, height: 36, objectFit: "contain" }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "1.45rem",
                                        fontWeight: 800,
                                        letterSpacing: "-0.045em",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    Praiz
                                    <Box component="span" sx={{ color: "secondary.main" }}>
                                        Pilot
                                    </Box>
                                    <Box component="span" sx={{ color: "primary.light" }}>
                                        .
                                    </Box>
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                        mt: 0.4,
                                    }}
                                >
                                    Developer Portfolio
                                </Typography>
                            </Box>
                        </Stack>

                        <Typography
                            color="text.secondary"
                            sx={{ maxWidth: 400, lineHeight: 1.95, mb: 3.5 }}
                        >
                            I'm Praise, a web developer focused on building modern,
                            responsive digital experiences that help businesses and
                            organizations establish their presence online.
                        </Typography>

                        <Stack direction="row" spacing={1.4} flexWrap="wrap" useFlexGap>
                            {socialLinks.map((social) => (
                                <IconButton
                                    key={social.label}
                                    component="a"
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    sx={{
                                        width: 46,
                                        height: 46,
                                        border: `1px solid ${theme.palette.divider}`,
                                        color: "text.secondary",
                                        backgroundColor: alpha(theme.palette.background.paper, 0.6),
                                        transition: "all .3s ease",
                                        "&:hover": {
                                            color: "#fff",
                                            borderColor: "transparent",
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            boxShadow: `0 10px 28px ${alpha(theme.palette.primary.main, 0.5)}`,
                                            transform: "translateY(-4px)",
                                        },
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            ))}
                        </Stack>
                    </Reveal>

                    {/* Quick links */}
                    <Reveal delay={0.08}>
                        <ColumnTitle>QUICK LINKS</ColumnTitle>
                        <Stack spacing={0.4}>
                            {quickLinks.map((item, i) => (
                                <Box
                                    key={item.label}
                                    component={RouterLink}
                                    to={item.href}
                                    onClick={(event) => handleSectionLink(event, item.href)}
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "baseline",
                                        gap: 1.6,
                                        width: "fit-content",
                                        py: 0.9,
                                        color: "text.secondary",
                                        transition: "all .3s ease",
                                        "&:hover": {
                                            color: "text.primary",
                                            transform: "translateX(8px)",
                                        },
                                        "&:hover .num": { color: "secondary.main" },
                                    }}
                                >
                                    <Typography
                                        className="num"
                                        sx={{
                                            fontSize: "0.72rem",
                                            fontWeight: 700,
                                            color: alpha(theme.palette.text.primary, 0.35),
                                            transition: "color .3s ease",
                                        }}
                                    >
                                        0{i + 1}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: "1.02rem" }}>
                                        {item.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Reveal>

                    {/* What I do */}
                    <Reveal delay={0.16}>
                        <ColumnTitle>WHAT I DO</ColumnTitle>
                        <Stack spacing={1.9}>
                            {services.map((service) => (
                                <Stack
                                    key={service}
                                    direction="row"
                                    alignItems="center"
                                    spacing={1.5}
                                >
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            flexShrink: 0,
                                            borderRadius: "50%",
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            boxShadow: `0 0 10px ${alpha(theme.palette.secondary.main, 0.6)}`,
                                        }}
                                    />
                                    <Typography color="text.secondary" sx={{ fontSize: "0.97rem" }}>
                                        {service}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Reveal>

                    {/* Connect */}
                    <Reveal delay={0.24} sx={{ gridColumn: { sm: "1 / -1", lg: "auto" } }}>
                        <ColumnTitle>CONNECT</ColumnTitle>
                        <Stack spacing={2.6}>
                            <Box
                                component="a"
                                href={`mailto:${EMAIL}`}
                                sx={{
                                    display: "block",
                                    color: "inherit",
                                    "&:hover .value": { color: theme.palette.secondary.main },
                                    "&:hover .arrow": {
                                        transform: "rotate(45deg)",
                                        color: theme.palette.secondary.main,
                                    },
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ letterSpacing: "0.14em", fontWeight: 600 }}
                                >
                                    EMAIL
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography
                                        className="value"
                                        sx={{
                                            fontWeight: 600,
                                            overflowWrap: "anywhere",
                                            transition: "color .3s ease",
                                        }}
                                    >
                                        {EMAIL}
                                    </Typography>
                                    <ArrowOutwardRounded
                                        className="arrow"
                                        sx={{
                                            fontSize: 18,
                                            flexShrink: 0,
                                            color: "text.secondary",
                                            transition: "all .3s ease",
                                        }}
                                    />
                                </Stack>
                            </Box>

                            <Box
                                component="a"
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: "block",
                                    color: "inherit",
                                    "&:hover .value": { color: "#25D366" },
                                    "&:hover .arrow": {
                                        transform: "rotate(45deg)",
                                        color: "#25D366",
                                    },
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ letterSpacing: "0.14em", fontWeight: 600 }}
                                >
                                    WHATSAPP
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography
                                        className="value"
                                        sx={{ fontWeight: 600, transition: "color .3s ease" }}
                                    >
                                        {WHATSAPP_DISPLAY}
                                    </Typography>
                                    <ArrowOutwardRounded
                                        className="arrow"
                                        sx={{
                                            fontSize: 18,
                                            color: "text.secondary",
                                            transition: "all .3s ease",
                                        }}
                                    />
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ letterSpacing: "0.14em", fontWeight: 600 }}
                                >
                                    BASED IN
                                </Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    Abuja, Nigeria{time ? ` · ${time} WAT` : ""}
                                </Typography>
                            </Box>
                        </Stack>
                    </Reveal>
                </Box>

                {/* ============ GIANT WORDMARK ============ */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 90 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.3, ease: EASE }}
                    sx={{
                        mt: { xs: 9, md: 14 },
                        textAlign: "center",
                        overflow: "hidden",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                >
                </Box>
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        gap: 2.5,
                        py: 3.5,
                        borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        © {currentYear} Praise Nwachukwu. All rights reserved.
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor: "#22C55E",
                                    boxShadow: "0 0 12px #22C55E",
                                    animation: "footerPulse 2s ease-in-out infinite",
                                    "@keyframes footerPulse": {
                                        "0%,100%": { opacity: 1 },
                                        "50%": { opacity: 0.35 },
                                    },
                                }}
                            />
                            <Typography variant="caption" color="text.secondary">
                                Open to opportunities
                            </Typography>
                        </Stack>

                        {/* Back to top */}
                        <Box
                            onClick={scrollToTop}
                            role="button"
                            aria-label="Back to top"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
                            sx={{
                                position: "relative",
                                width: 52,
                                height: 52,
                                display: "grid",
                                placeItems: "center",
                                cursor: "pointer",
                                borderRadius: "50%",
                                color: "text.primary",
                                transition: "transform .3s ease",
                                "&:hover": { transform: "translateY(-5px)" },
                                "&:hover .up-core": {
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    borderColor: "transparent",
                                    color: "#fff",
                                },
                            }}
                        >
                            <Box
                                component={motion.div}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    border: `1px dashed ${alpha(theme.palette.secondary.main, 0.5)}`,
                                }}
                            />
                            <Box
                                className="up-core"
                                sx={{
                                    width: 38,
                                    height: 38,
                                    display: "grid",
                                    placeItems: "center",
                                    borderRadius: "50%",
                                    border: `1px solid ${theme.palette.divider}`,
                                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                                    transition: "all .3s ease",
                                }}
                            >
                                <KeyboardArrowUpRounded />
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;