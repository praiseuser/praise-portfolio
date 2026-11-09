import { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Container,
    Drawer,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useScrollTrigger,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
    ArrowOutwardRounded,
    CloseRounded,
    MenuRounded,
    HomeRounded,
    PersonRounded,
    CodeRounded,
    FolderRounded,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";

/* Adjust the path if your Navbar is not in src/components */
import logo from "../assets/mylogo.png";

const navItems = [
    { id: "home", label: "Home", href: "/#home", icon: HomeRounded },
    { id: "about", label: "About", href: "/#about", icon: PersonRounded },
    { id: "skills", label: "Skills", href: "/#skills", icon: CodeRounded },
    { id: "projects", label: "Projects", href: "/#projects", icon: FolderRounded },
    { id: "contact", label: "Contact", href: "/#contact" },
];

const EASE = [0.22, 1, 0.36, 1];

/* ---------- Desktop nav link with sliding highlight ---------- */
const DesktopLink = ({ item, active, highlighted, onHover, onClick }) => {
    const theme = useTheme();

    return (
        <Box
            component={RouterLink}
            to={item.href}
            onClick={(e) => onClick(e, item.href)}
            onMouseEnter={() => onHover(item.id)}
            sx={{
                position: "relative",
                px: 2.2,
                py: 1.1,
                borderRadius: 99,
                fontSize: "0.88rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                color: active ? "text.primary" : "text.secondary",
                transition: "color .25s ease",
                "&:hover": { color: theme.palette.text.primary },
            }}
        >
            {highlighted && (
                <Box
                    component={motion.span}
                    layoutId="nav-highlight"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 99,
                        zIndex: 0,
                        backgroundColor: alpha(theme.palette.primary.main, 0.14),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                    }}
                />
            )}
            <Box component="span" sx={{ position: "relative", zIndex: 1 }}>
                {item.label}
            </Box>
        </Box>
    );
};

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 20 });
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeId, setActiveId] = useState("home");
    const [hoveredId, setHoveredId] = useState(null);

    /* Scroll progress bar */
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    const closeDrawer = () => setDrawerOpen(false);

    /* Track which section is on screen */
    useEffect(() => {
        if (location.pathname !== "/") return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );

        navItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [location.pathname]);

    const scrollToSection = (event, href) => {
        if (!href.startsWith("/#")) return;

        const id = href.split("#")[1];

        if (location.pathname === "/") {
            event.preventDefault();
            closeDrawer();

            if (id === "home") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            /* small delay so the drawer can close before scrolling */
            setTimeout(
                () =>
                    document.getElementById(id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    }),
                drawerOpen ? 250 : 0
            );
        } else {
            closeDrawer();
        }
    };

    const highlightedId = hoveredId ?? activeId;

    return (
        <>
            {/* Scroll progress */}
            <Box
                component={motion.div}
                style={{ scaleX: progress }}
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    transformOrigin: "left",
                    zIndex: theme.zIndex.appBar + 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
            />

            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}
                sx={{
                    zIndex: theme.zIndex.appBar,
                    backgroundColor: "transparent",
                    backgroundImage: "none",
                    pointerEvents: "none",
                    top: scrolled ? 10 : 18,
                    transition: "top .35s ease",
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        sx={{
                            pointerEvents: "auto",
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr auto", md: "1fr auto 1fr" },
                            alignItems: "center",
                            gap: 2,
                            pl: { xs: 1.5, md: 2 },
                            pr: { xs: 1.2, md: 1.2 },
                            py: scrolled ? 0.9 : 1.2,
                            borderRadius: 99,
                            border: `1px solid ${alpha(
                                theme.palette.text.primary,
                                scrolled ? 0.12 : 0.07
                            )}`,
                            backgroundColor: alpha(
                                theme.palette.background.paper,
                                scrolled ? 0.78 : 0.4
                            ),
                            backdropFilter: "blur(22px) saturate(160%)",
                            WebkitBackdropFilter: "blur(22px) saturate(160%)",
                            boxShadow: scrolled
                                ? `0 18px 60px ${alpha("#000", 0.3)}, 0 0 0 1px ${alpha(
                                    theme.palette.primary.main,
                                    0.06
                                )}`
                                : "none",
                            transition: "all .35s ease",
                        }}
                    >
                        {/* Logo */}
                        <Box
                            component={RouterLink}
                            to="/#home"
                            onClick={(e) => scrollToSection(e, "/#home")}
                            aria-label="PraizPilot home"
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1.4,
                                justifySelf: "start",
                                color: "inherit",
                                "&:hover .logo-img": {
                                    transform: "rotate(-6deg) scale(1.08)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 46,
                                    height: 46,
                                    flexShrink: 0,
                                    display: "grid",
                                    placeItems: "center",
                                    borderRadius: "50%",
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                                }}
                            >
                                <Box
                                    component="img"
                                    className="logo-img"
                                    src={logo}
                                    alt="PraizPilot logo"
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        objectFit: "contain",
                                        transition: "transform .4s ease",
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: { xs: "none", sm: "block" } }}>
                                <Typography
                                    sx={{
                                        fontSize: "1.15rem",
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
                                        fontSize: "0.58rem",
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        mt: 0.3,
                                    }}
                                >
                                    Developer Portfolio
                                </Typography>
                            </Box>
                        </Box>

                        {/* Center links */}
                        {!isMobile && (
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.3}
                                onMouseLeave={() => setHoveredId(null)}
                                sx={{ justifySelf: "center" }}
                            >
                                {navItems.map((item) => (
                                    <DesktopLink
                                        key={item.id}
                                        item={item}
                                        active={activeId === item.id}
                                        highlighted={highlightedId === item.id}
                                        onHover={setHoveredId}
                                        onClick={scrollToSection}
                                    />
                                ))}
                            </Stack>
                        )}

                        {/* Right side */}
                        {!isMobile ? (
                            <Box
                                component={RouterLink}
                                to="/#contact"
                                onClick={(e) => scrollToSection(e, "/#contact")}
                                sx={{
                                    justifySelf: "end",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 1.6,
                                    pl: 2.6,
                                    pr: 0.6,
                                    py: 0.6,
                                    borderRadius: 99,
                                    fontSize: "0.88rem",
                                    fontWeight: 700,
                                    color: "#fff",
                                    whiteSpace: "nowrap",
                                    background: `linear-gradient(110deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    boxShadow: `0 8px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                                    transition: "all .3s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: `0 12px 36px ${alpha(theme.palette.primary.main, 0.55)}`,
                                    },
                                    "&:hover .cta-circle": { transform: "rotate(45deg)" },
                                }}
                            >
                                Let's Talk
                                <Box
                                    className="cta-circle"
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        bgcolor: "#fff",
                                        color: theme.palette.primary.dark,
                                        display: "grid",
                                        placeItems: "center",
                                        transition: "transform .35s ease",
                                    }}
                                >
                                    <ArrowOutwardRounded sx={{ fontSize: 19 }} />
                                </Box>
                            </Box>
                        ) : (
                            <IconButton
                                onClick={() => setDrawerOpen(true)}
                                aria-label="Open navigation menu"
                                sx={{
                                    width: 46,
                                    height: 46,
                                    color: "text.primary",
                                    border: `1px solid ${theme.palette.divider}`,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                }}
                            >
                                <MenuRounded />
                            </IconButton>
                        )}
                    </Box>
                </Container>
            </AppBar>

            {/* Keeps page content below the fixed navigation */}
            <Toolbar sx={{ minHeight: { xs: 76, md: 88 } }} />

            {/* Mobile bottom sheet */}
            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={closeDrawer}
                transitionDuration={{ enter: 380, exit: 240 }}
                ModalProps={{
                    BackdropProps: {
                        sx: {
                            backgroundColor: alpha("#000", 0.55),
                            backdropFilter: "blur(6px)",
                        },
                    },
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: "transparent",
                        backgroundImage: "none",
                        boxShadow: "none",
                        overflow: "visible",
                    },
                }}
            >
                <Box
                    component={motion.div}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={{ top: 0, bottom: 0.7 }}
                    onDragEnd={(_, info) => {
                        if (info.offset.y > 90 || info.velocity.y > 500) closeDrawer();
                    }}
                    sx={{
                        mx: 1,
                        mb: 1,
                        p: 2.5,
                        pt: 1.5,
                        borderRadius: "28px",
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                        backgroundColor: alpha(theme.palette.background.paper, 0.92),
                        backdropFilter: "blur(24px) saturate(160%)",
                        WebkitBackdropFilter: "blur(24px) saturate(160%)",
                        backgroundImage: `radial-gradient(circle at 100% 0%, ${alpha(
                            theme.palette.primary.main,
                            0.2
                        )}, transparent 50%)`,
                    }}
                >
                    {/* Grab handle */}
                    <Box
                        sx={{
                            width: 42,
                            height: 4,
                            borderRadius: 99,
                            mx: "auto",
                            mb: 2,
                            bgcolor: alpha(theme.palette.text.primary, 0.25),
                        }}
                    />

                    {/* Header */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 2.5 }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1.2}>
                            <Box
                                component="img"
                                src={logo}
                                alt="PraizPilot logo"
                                sx={{ width: 28, height: 28, objectFit: "contain" }}
                            />
                            <Typography
                                fontWeight={800}
                                fontSize="1rem"
                                letterSpacing="-0.03em"
                            >
                                Praiz
                                <Box component="span" sx={{ color: "secondary.main" }}>
                                    Pilot
                                </Box>
                            </Typography>
                        </Stack>

                        <IconButton
                            onClick={closeDrawer}
                            aria-label="Close navigation menu"
                            size="small"
                            sx={{ border: `1px solid ${theme.palette.divider}` }}
                        >
                            <CloseRounded fontSize="small" />
                        </IconButton>
                    </Stack>

                    {/* Tiles */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 1.2,
                        }}
                    >
                        {navItems
                            .filter((item) => item.id !== "contact")
                            .map((item, i) => {
                                const Icon = item.icon;
                                const isActive = activeId === item.id;

                                return (
                                    <Box
                                        key={item.id}
                                        component={motion.div}
                                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 420,
                                            damping: 28,
                                            delay: 0.08 + i * 0.05,
                                        }}
                                        whileTap={{ scale: 0.94 }}
                                    >
                                        <Box
                                            component={RouterLink}
                                            to={item.href}
                                            onClick={(e) => scrollToSection(e, item.href)}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1.6,
                                                p: 1.8,
                                                borderRadius: "20px",
                                                color: isActive ? "#fff" : "text.primary",
                                                border: `1px solid ${alpha(
                                                    isActive
                                                        ? theme.palette.primary.main
                                                        : theme.palette.text.primary,
                                                    isActive ? 0.6 : 0.1
                                                )}`,
                                                background: isActive
                                                    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                                                    : alpha(theme.palette.text.primary, 0.04),
                                                boxShadow: isActive
                                                    ? `0 10px 28px ${alpha(
                                                        theme.palette.primary.main,
                                                        0.4
                                                    )}`
                                                    : "none",
                                                transition: "all .25s ease",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Icon
                                                    sx={{
                                                        fontSize: 22,
                                                        opacity: isActive ? 1 : 0.8,
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "monospace",
                                                        fontSize: "0.68rem",
                                                        opacity: 0.6,
                                                    }}
                                                >
                                                    0{i + 1}
                                                </Typography>
                                            </Stack>
                                            <Typography
                                                sx={{
                                                    fontSize: "1rem",
                                                    fontWeight: 700,
                                                    letterSpacing: "-0.02em",
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>

                    {/* Contact CTA */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 28,
                            delay: 0.32,
                        }}
                        whileTap={{ scale: 0.97 }}
                        sx={{ mt: 1.4 }}
                    >
                        <Box
                            component={RouterLink}
                            to="/#contact"
                            onClick={(e) => scrollToSection(e, "/#contact")}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                pl: 2.8,
                                pr: 0.7,
                                py: 0.7,
                                borderRadius: 99,
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                color: "#fff",
                                background: `linear-gradient(110deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                boxShadow: `0 10px 28px ${alpha(
                                    theme.palette.primary.main,
                                    0.4
                                )}`,
                            }}
                        >
                            Let's Talk
                            <Box
                                sx={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: "50%",
                                    bgcolor: "#fff",
                                    color: theme.palette.primary.dark,
                                    display: "grid",
                                    placeItems: "center",
                                }}
                            >
                                <ArrowOutwardRounded sx={{ fontSize: 20 }} />
                            </Box>
                        </Box>
                    </Box>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            display: "block",
                            textAlign: "center",
                            mt: 2,
                            fontSize: "0.62rem",
                            letterSpacing: "0.16em",
                        }}
                    >
                        BASED IN ABUJA, NIGERIA
                    </Typography>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;