import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Container,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
    ArrowOutwardRounded,
    CheckRounded,
    ContentCopyRounded,
    EmailRounded,
    LocationOnRounded,
    SendRounded,
    WhatsApp,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const EMAIL = "praisenwachukwu255@gmail.com";
/* Nigerian number in international format (no +, no leading 0) */
const WHATSAPP_NUMBER = "2349049234425";
const WHATSAPP_DISPLAY = "0904 923 4425";
const WA_GREEN = "#25D366";

const PROJECT_TYPES = [
    "Business website",
    "Web application",
    "API integration",
    "Something else",
];

/* ---------- helpers ---------- */

const Reveal = ({ children, delay = 0, sx }) => (
    <Box
        component={motion.div}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.8, delay, ease: EASE }}
        sx={sx}
    >
        {children}
    </Box>
);

const ChannelRow = ({
    icon,
    label,
    value,
    accent,
    href,
    external,
    action,
    arrow = true,
}) => {
    const theme = useTheme();
    const clickable = Boolean(href);

    return (
        <Box
            component={clickable ? "a" : "div"}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.4, sm: 2.2 },
                p: { xs: 1.6, sm: 2, md: 2.6 },
                borderRadius: { xs: 3, sm: 4 },
                minWidth: 0,
                flexWrap: { xs: "wrap", sm: "nowrap" },
                color: "inherit",
                cursor: clickable ? "pointer" : "default",
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                transition: "all .35s ease",
                "&:hover": {
                    transform: clickable ? "translateY(-4px)" : "none",
                    borderColor: alpha(accent, 0.6),
                    backgroundColor: alpha(accent, 0.07),
                    boxShadow: clickable ? `0 18px 50px ${alpha(accent, 0.14)}` : "none",
                },
                "&:hover .row-arrow": {
                    transform: "rotate(45deg)",
                    color: accent,
                },
            }}
        >
            <Box
                sx={{
                    width: { xs: 46, sm: 54 },
                    height: { xs: 46, sm: 54 },
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 3,
                    color: accent,
                    backgroundColor: alpha(accent, 0.12),
                    border: `1px solid ${alpha(accent, 0.25)}`,
                    "& svg": { fontSize: { xs: 22, sm: 26 } },
                }}
            >
                {icon}
            </Box>

            <Box sx={{ minWidth: 0, flex: "1 1 120px" }}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ letterSpacing: "0.16em", fontWeight: 600 }}
                >
                    {label}
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "0.9rem", sm: "0.98rem", md: "1.08rem" },
                        overflowWrap: "anywhere",
                        lineHeight: 1.4,
                    }}
                >
                    {value}
                </Typography>
            </Box>

            {action}

            {arrow && clickable && (
                <ArrowOutwardRounded
                    className="row-arrow"
                    sx={{
                        flexShrink: 0,
                        color: "text.secondary",
                        transition: "all .35s ease",
                    }}
                />
            )}
        </Box>
    );
};

/* ---------- main ---------- */

const Contact = () => {
    const theme = useTheme();

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState(null); // { type, text }
    const [copied, setCopied] = useState(false);
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

    const handleChange = (event) => {
        setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const toggleType = (type) => {
        setForm((prev) => ({
            ...prev,
            subject: prev.subject === type ? "" : type,
        }));
    };

    const copyEmail = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    const validate = (mode) => {
        const { name, email, message } = form;

        if (!name.trim() || !message.trim()) {
            setStatus({
                type: "error",
                text: "Please fill in your name and message.",
            });
            return false;
        }

        if (mode === "email") {
            if (!email.trim()) {
                setStatus({
                    type: "error",
                    text: "Please add your email address so I can reply.",
                });
                return false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setStatus({
                    type: "error",
                    text: "Please enter a valid email address.",
                });
                return false;
            }
        }

        setStatus(null);
        return true;
    };

    const sendEmail = (event) => {
        event.preventDefault();
        if (!validate("email")) return;

        const { name, email, subject, message } = form;

        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            subject ? `Project type: ${subject}` : null,
            "",
            message,
        ]
            .filter((line) => line !== null)
            .join("\n");

        const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
            subject ? `${subject} enquiry from ${name}` : `Portfolio enquiry from ${name}`
        )}&body=${encodeURIComponent(body)}`;

        setStatus({
            type: "info",
            text: "Opening your email app with the message filled in. Press send there to finish.",
        });
        window.location.href = mailto;
    };

    const sendWhatsApp = () => {
        if (!validate("whatsapp")) return;

        const { name, subject, message } = form;

        const text = [
            `Hi Praise, I'm ${name}.`,
            subject ? `I'm interested in: ${subject}.` : null,
            "",
            message,
        ]
            .filter((line) => line !== null)
            .join("\n");

        setStatus({
            type: "info",
            text: "Opening WhatsApp with your message ready. Press send there to finish.",
        });
        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.default, 0.55),
            transition: "all .3s ease",
            "& fieldset": {
                borderColor: alpha(theme.palette.text.primary, 0.14),
                transition: "all .3s ease",
            },
            "&:hover fieldset": {
                borderColor: alpha(theme.palette.text.primary, 0.32),
            },
            "&.Mui-focused": {
                boxShadow: `0 0 0 4px ${alpha(theme.palette.secondary.main, 0.12)}`,
            },
            "&.Mui-focused fieldset": {
                borderColor: theme.palette.secondary.main,
                borderWidth: 1,
            },
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.secondary.main,
        },
    };

    return (
        <Box
            component="section"
            id="contact"
            sx={{
                position: "relative",
                overflow: "hidden",
                pt: { xs: 8, sm: 10, md: 18 },
                pb: 0,
                width: "100%",
                maxWidth: "100%",
            }}
        >
            {/* Glows */}
            <Box
                sx={{
                    position: "absolute",
                    top: "2%",
                    left: "-14%",
                    width: 560,
                    height: 560,
                    borderRadius: "50%",
                    background: alpha(theme.palette.primary.main, 0.22),
                    filter: "blur(130px)",
                    pointerEvents: "none",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "10%",
                    right: "-14%",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: alpha(theme.palette.secondary.main, 0.12),
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
                    opacity: 0.3,
                    backgroundImage: `radial-gradient(${alpha(theme.palette.text.primary, 0.35)} 1px, transparent 1px)`,
                    backgroundSize: "34px 34px",
                    maskImage:
                        "radial-gradient(ellipse at 50% 20%, black 10%, transparent 65%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse at 50% 20%, black 10%, transparent 65%)",
                }}
            />

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, px: { xs: 2, sm: 3, md: 4 } }}>
                {/* ============ HEADER ============ */}
                <Box sx={{ mb: { xs: 6, sm: 8, md: 12 }, minWidth: 0 }}>
                    <Reveal>
                        <Stack direction="row" alignItems="center" spacing={1.8} sx={{ mb: 3.5 }}>
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
                                    letterSpacing: "0.22em",
                                }}
                            >
                                Let's connect
                            </Typography>
                        </Stack>
                    </Reveal>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1.4fr 0.6fr" },
                            alignItems: "end",
                            gap: { xs: 5, md: 10 },
                        }}
                    >
                        <Reveal delay={0.08}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: "clamp(2rem, 8vw, 5.2rem)",
                                    fontWeight: 800,
                                    lineHeight: { xs: 1.08, sm: 1.04 },
                                    overflowWrap: "break-word",
                                    letterSpacing: "-0.045em",
                                }}
                            >
                                Have an idea? Let's
                                <Box
                                    component="span"
                                    sx={{
                                        display: "block",
                                        background: `linear-gradient(100deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    make it happen.
                                </Box>
                            </Typography>
                        </Reveal>

                        <Reveal delay={0.16}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1.4}
                                sx={{ mb: { xs: 1.5, sm: 2 }, flexWrap: "wrap" }}
                            >
                                <Box
                                    sx={{
                                        width: 9,
                                        height: 9,
                                        borderRadius: "50%",
                                        bgcolor: "#22C55E",
                                        boxShadow: "0 0 14px #22C55E",
                                        animation: "pulse 2s ease-in-out infinite",
                                        "@keyframes pulse": {
                                            "0%,100%": { opacity: 1 },
                                            "50%": { opacity: 0.35 },
                                        },
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{ letterSpacing: "0.16em", fontWeight: 700 }}
                                >
                                    OPEN TO NEW PROJECTS
                                </Typography>
                            </Stack>
                            <Typography
                                color="text.secondary"
                                sx={{ lineHeight: 1.85, fontSize: { xs: "0.95rem", sm: "1.05rem" }, maxWidth: 560 }}
                            >
                                Tell me about your business, website, or project. I'm open to
                                discussing opportunities with clients in Nigeria and beyond.
                            </Typography>
                        </Reveal>
                    </Box>
                </Box>

                {/* ============ MAIN GRID ============ */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "0.85fr 1.15fr" },
                        gap: { xs: 3, sm: 4, md: 5, lg: 8 },
                        alignItems: "start",
                        minWidth: 0,
                    }}
                >
                    {/* LEFT: channels */}
                    <Stack spacing={{ xs: 1.5, sm: 2.2 }} sx={{ minWidth: 0 }}>
                        <Reveal>
                            <ChannelRow
                                icon={<EmailRounded />}
                                label="EMAIL"
                                value={EMAIL}
                                accent={theme.palette.primary.light}
                                href={`mailto:${EMAIL}`}
                                arrow={false}
                                action={
                                    <Box
                                        component="button"
                                        type="button"
                                        onClick={copyEmail}
                                        aria-label="Copy email address"
                                        sx={{
                                            flexShrink: 0,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 0.8,
                                            px: 1.6,
                                            py: 0.9,
                                            border: `1px solid ${alpha(
                                                copied ? "#22C55E" : theme.palette.text.primary,
                                                copied ? 0.5 : 0.2
                                            )}`,
                                            borderRadius: 99,
                                            cursor: "pointer",
                                            font: "inherit",
                                            fontSize: "0.78rem",
                                            fontWeight: 700,
                                            color: copied ? "#22C55E" : theme.palette.text.primary,
                                            backgroundColor: copied
                                                ? alpha("#22C55E", 0.1)
                                                : "transparent",
                                            transition: "all .3s ease",
                                            "&:hover": {
                                                borderColor: copied
                                                    ? "#22C55E"
                                                    : theme.palette.primary.light,
                                            },
                                            "& svg": { fontSize: 16 },
                                        }}
                                    >
                                        {copied ? <CheckRounded /> : <ContentCopyRounded />}
                                        {copied ? "Copied" : "Copy"}
                                    </Box>
                                }
                            />
                        </Reveal>

                        <Reveal delay={0.08}>
                            <ChannelRow
                                icon={<WhatsApp />}
                                label="WHATSAPP"
                                value={WHATSAPP_DISPLAY}
                                accent={WA_GREEN}
                                external
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                    "Hi Praise, I found your portfolio and I'd like to talk about a project."
                                )}`}
                            />
                        </Reveal>

                        <Reveal delay={0.16}>
                            <ChannelRow
                                icon={<LocationOnRounded />}
                                label="LOCATION"
                                value={`Abuja, Nigeria${time ? ` · ${time} WAT` : ""}`}
                                accent={theme.palette.secondary.main}
                            />
                        </Reveal>

                        <Reveal delay={0.24}>
                            <Box
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.25)}`,
                                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.06)})`,
                                }}
                            >
                                <Typography sx={{ fontWeight: 700, mb: 0.8 }}>
                                    Working remotely? Absolutely.
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                    sx={{ lineHeight: 1.85 }}
                                >
                                    Projects can be discussed, developed, and delivered
                                    remotely, wherever you and your business are based.
                                </Typography>
                            </Box>
                        </Reveal>
                    </Stack>

                    {/* RIGHT: form */}
                    <Reveal delay={0.1}>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={sendEmail}
                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                p: { xs: 2, sm: 3, md: 5 },
                                borderRadius: { xs: 3, sm: 4, md: 6 },
                                minWidth: 0,
                                width: "100%",
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.92)}, ${alpha(theme.palette.primary.main, 0.09)})`,
                                boxShadow: `0 40px 100px ${alpha("#000", 0.35)}`,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    letterSpacing: "-0.03em",
                                    fontSize: { xs: "1.45rem", sm: "1.7rem", md: "2.2rem" },
                                    mb: 1,
                                }}
                            >
                                Tell me about your project
                            </Typography>
                            <Typography color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, lineHeight: 1.8, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                                Share a little about what you have in mind. A business
                                website, a responsive interface, or help integrating an API.
                            </Typography>

                            {status && (
                                <Alert
                                    severity={status.type}
                                    sx={{ mb: 3, borderRadius: 3 }}
                                >
                                    {status.text}
                                </Alert>
                            )}

                            {/* Project type chips */}
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: "block",
                                    mb: 1.6,
                                    letterSpacing: "0.16em",
                                    fontWeight: 600,
                                }}
                            >
                                WHAT DO YOU NEED?
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: { xs: 3, sm: 4 } }}>
                                {PROJECT_TYPES.map((type) => {
                                    const selected = form.subject === type;
                                    return (
                                        <Box
                                            key={type}
                                            component="button"
                                            type="button"
                                            onClick={() => toggleType(type)}
                                            sx={{
                                                px: { xs: 1.5, sm: 2.1 },
                                                py: { xs: 0.85, sm: 1 },
                                                borderRadius: 99,
                                                maxWidth: "100%",
                                                whiteSpace: "normal",
                                                textAlign: "center",
                                                cursor: "pointer",
                                                font: "inherit",
                                                fontSize: { xs: "0.78rem", sm: "0.88rem" },
                                                fontWeight: 600,
                                                color: selected ? "#fff" : theme.palette.text.secondary,
                                                border: `1px solid ${selected
                                                    ? "transparent"
                                                    : alpha(theme.palette.text.primary, 0.16)}`,
                                                background: selected
                                                    ? `linear-gradient(110deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                                                    : "transparent",
                                                boxShadow: selected
                                                    ? `0 8px 26px ${alpha(theme.palette.primary.main, 0.45)}`
                                                    : "none",
                                                transition: "all .3s ease",
                                                "&:hover": {
                                                    transform: "translateY(-2px)",
                                                    color: selected ? "#fff" : theme.palette.text.primary,
                                                    borderColor: selected
                                                        ? "transparent"
                                                        : alpha(theme.palette.secondary.main, 0.6),
                                                },
                                            }}
                                        >
                                            {type}
                                        </Box>
                                    );
                                })}
                            </Stack>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                    gap: { xs: 1.8, sm: 2.5 },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Your name"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    sx={fieldSx}
                                />
                                <TextField
                                    fullWidth
                                    name="email"
                                    type="email"
                                    label="Email address"
                                    placeholder="john@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    sx={fieldSx}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={5}
                                    name="message"
                                    label="Tell me about your project"
                                    placeholder="What are you looking to build? What problem should it solve?"
                                    value={form.message}
                                    onChange={handleChange}
                                    sx={{ ...fieldSx, gridColumn: { sm: "1 / -1" } }}
                                />
                            </Box>

                            {/* Buttons */}
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={{ xs: 1.5, sm: 2 }}
                                sx={{ mt: { xs: 3, sm: 4 }, width: "100%" }}
                            >
                                <Box
                                    component="button"
                                    type="submit"
                                    sx={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        pl: { xs: 2.2, sm: 3.5 },
                                        pr: 1,
                                        py: 0.8,
                                        border: 0,
                                        borderRadius: 99,
                                        cursor: "pointer",
                                        font: "inherit",
                                        fontWeight: 700,
                                        fontSize: "0.98rem",
                                        color: "#fff",
                                        background: `linear-gradient(110deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                        boxShadow: `0 14px 40px ${alpha(theme.palette.primary.main, 0.45)}`,
                                        transition: "all .3s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: `0 20px 54px ${alpha(theme.palette.primary.main, 0.6)}`,
                                        },
                                        "&:hover .circle": { transform: "rotate(-20deg) scale(1.05)" },
                                    }}
                                >
                                    Send via email
                                    <Box
                                        className="circle"
                                        sx={{
                                            width: { xs: 42, sm: 48 },
                                            height: { xs: 42, sm: 48 },
                                            borderRadius: "50%",
                                            bgcolor: "#fff",
                                            color: theme.palette.primary.dark,
                                            display: "grid",
                                            placeItems: "center",
                                            transition: "transform .35s ease",
                                        }}
                                    >
                                        <SendRounded sx={{ fontSize: 22 }} />
                                    </Box>
                                </Box>

                                <Box
                                    component="button"
                                    type="button"
                                    onClick={sendWhatsApp}
                                    sx={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1.2,
                                        py: 2,
                                        px: 3,
                                        borderRadius: 99,
                                        cursor: "pointer",
                                        font: "inherit",
                                        fontWeight: 700,
                                        fontSize: "0.98rem",
                                        color: theme.palette.text.primary,
                                        backgroundColor: "transparent",
                                        border: `1px solid ${alpha(WA_GREEN, 0.5)}`,
                                        transition: "all .3s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            color: WA_GREEN,
                                            borderColor: WA_GREEN,
                                            backgroundColor: alpha(WA_GREEN, 0.08),
                                            boxShadow: `0 14px 40px ${alpha(WA_GREEN, 0.18)}`,
                                        },
                                    }}
                                >
                                    <WhatsApp />
                                    Send on WhatsApp
                                </Box>
                            </Stack>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "block", mt: 2.5, textAlign: "center", lineHeight: 1.6, px: { xs: 0.5, sm: 1 } }}
                            >
                                Either button opens your email app or WhatsApp with the
                                message filled in. Nothing is sent automatically.
                            </Typography>
                        </Box>
                    </Reveal>
                </Box>
            </Container>

            {/* ============ SIGN-OFF MARQUEE ============ */}
            <Box
                sx={{
                    mt: { xs: 12, md: 20 },
                    py: { xs: 3, md: 4.5 },
                    borderTop: `1px solid ${theme.palette.divider}`,
                    overflow: "hidden",
                    maskImage:
                        "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                }}
            >
                <Box
                    component={motion.div}
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 34, ease: "linear", repeat: Infinity }}
                    sx={{ display: "flex", width: "max-content" }}
                >
                    {[0, 1, 2, 3].map((n) => (
                        <Stack key={n} direction="row" alignItems="center">
                            <Typography
                                sx={{
                                    px: { xs: 3, md: 5 },
                                    fontSize: { xs: "2.6rem", md: "6rem" },
                                    fontWeight: 900,
                                    letterSpacing: "-0.045em",
                                    whiteSpace: "nowrap",
                                    color: "transparent",
                                    WebkitTextStroke: `1.5px ${alpha(theme.palette.text.primary, 0.4)}`,
                                    transition: "all .3s ease",
                                    "&:hover": {
                                        color: theme.palette.text.primary,
                                        WebkitTextStroke: "1.5px transparent",
                                    },
                                }}
                            >
                                Let's work together
                            </Typography>
                            <Box
                                sx={{
                                    color: "secondary.main",
                                    fontSize: { xs: "1.6rem", md: "3rem" },
                                }}
                            >
                                ✦
                            </Box>
                        </Stack>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Contact;