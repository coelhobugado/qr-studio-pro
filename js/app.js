// ========================================
// QR Studio Pro - Application Logic
// ========================================

// --- Configuration & State ---
const config = {
    width: 1000,
    height: 1000,
    text: "https://harpya.films",
    colorDark: "#000000",
    colorLight: "#ffffff",
    colorFrame: "#000000",
    colorEyeDot: "#000000",
    bodyShape: "square",
    frameShape: "square",
    eyeDotShape: "square",
    logo: null,
    logoSize: 0.25,
    isTransparent: false,
    gradientType: "none",
    gradientColor1: "#000000",
    gradientColor2: "#000000"
};

let isGenerating = false;
let activeContentType = 'link';

// --- Data Constants ---
const shapes = {
    body: [
        { value: 'square', icon: '<rect x="4" y="4" width="16" height="16" />' },
        { value: 'circle', icon: '<circle cx="12" cy="12" r="7" />' },
        { value: 'rounded', icon: '<rect x="4" y="4" width="16" height="16" rx="4" />' },
        { value: 'extra-rounded', icon: '<path d="M4,4 h16 v16 h-16 v-8 a8,8 0 0,1 8,-8 z" />' },
        { value: 'classy', icon: '<path d="M4,4 h16 v16 h-16 v-8 a8,8 0 0,1 0,0 z" transform="rotate(45 12 12)" />' },
        { value: 'classy-rounded', icon: '<path d="M4,4 h16 v16 h-16 v-8 a8,8 0 0,1 0,0 z" transform="rotate(45 12 12)" rx="2" />' },
        { value: 'diamond', icon: '<rect x="4" y="4" width="16" height="16" transform="rotate(45 12 12)" />' },
        { value: 'star', icon: '<polygon points="12,2 15,9 22,9 17,15 19,22 12,18 5,22 7,15 2,9 9,9" />' },
        { value: 'heart', icon: '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>' },
        { value: 'triangle', icon: '<polygon points="12,3 22,21 2,21" />' },
        { value: 'hexagon', icon: '<path d="M12,2 L21,7 L21,17 L12,22 L3,17 L3,7 Z" />' },
        { value: 'cross', icon: '<path d="M9,2 L15,2 L15,9 L22,9 L22,15 L15,15 L15,22 L9,22 L9,15 L2,15 L2,9 L9,9 Z" />' },
        { value: 'pizza', icon: '<path d="M12 2 C12 2 20 18 20 18 L4 18 C4 18 12 2 12 2 Z M12 5 C13 7 15 7 15 9 C15 10 14 11 13 11 C12 11 11 10 11 9 C11 7 12 6 12 5 Z" />' },
        { value: 'coffee', icon: '<path d="M18.5 8h-.5v-1c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v8c0 2.21 1.79 4 4 4h4c2.21 0 4-1.79 4-4h.5c1.38 0 2.5-1.12 2.5-2.5S19.88 8 18.5 8zM10 5h6v9c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V5z" transform="translate(1 2)" />' },
        { value: 'house', icon: '<path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />' }
    ],
    eyeFrame: [
        { value: 'square', icon: '<path d="M2,2 h20 v20 h-20 z M6,6 v12 h12 v-12 z" fill-rule="evenodd"/>' },
        { value: 'rounded', icon: '<path d="M2,8 a6,6 0 0,1 6,-6 h8 a6,6 0 0,1 6,6 v8 a6,6 0 0,1 -6,6 h-8 a6,6 0 0,1 -6,-6 z M6,8 a2,2 0 0,1 2,-2 h8 a2,2 0 0,1 2,2 v8 a2,2 0 0,1 -2,2 h-8 a2,2 0 0,1 -2,-2 z" fill-rule="evenodd"/>' },
        { value: 'rounded-xl', icon: '<path d="M2,10 a8,8 0 0,1 8,-8 h4 a8,8 0 0,1 8,8 v4 a8,8 0 0,1 -8,8 h-4 a8,8 0 0,1 -8,-8 z M6,10 a4,4 0 0,1 4,-4 h4 a4,4 0 0,1 4,4 v4 a4,4 0 0,1 -4,4 h-4 a4,4 0 0,1 -4,-4 z" fill-rule="evenodd"/>' },
        { value: 'circle', icon: '<path d="M12,2 A10,10 0 1,1 12,22 A10,10 0 0,1 12,2 M12,6 A6,6 0 1,1 12,18 A6,6 0 0,1 12,6" fill-rule="evenodd"/>' },
        { value: 'leaf', icon: '<path d="M2,12 a10,10 0 0,1 10,-10 h10 v10 a10,10 0 0,1 -10,10 h-10 z M6,12 a6,6 0 0,1 6,-6 h6 v6 a6,6 0 0,1 -6,6 h-6 z" fill-rule="evenodd"/>' },
        { value: 'octagon', icon: '<path d="M7,2 L17,2 L22,7 L22,17 L17,22 L7,22 L2,17 L2,7 Z M9,6 L15,6 L18,9 L18,15 L15,18 L9,18 L6,15 L6,9 Z" fill-rule="evenodd"/>' }
    ],
    eyeDot: [
        { value: 'square', icon: '<rect x="7" y="7" width="10" height="10" />' },
        { value: 'circle', icon: '<circle cx="12" cy="12" r="5" />' },
        { value: 'bounce', icon: '<rect x="7" y="7" width="10" height="10" rx="3" />' },
        { value: 'diamond', icon: '<rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" />' },
        { value: 'star', icon: '<polygon points="12,7 13.5,10 17,10 14.5,12.5 15.5,16 12,14 8.5,16 9.5,12.5 7,10 10.5,10" />' },
        { value: 'triangle', icon: '<polygon points="12,7 17,17 7,17" />' },
        { value: 'hexagon', icon: '<path d="M12,7 L16.5,9.5 L16.5,14.5 L12,17 L7.5,14.5 L7.5,9.5 Z" />' }
    ]
};

const themes = [
    { name: 'Executivo', config: { colorDark: "#000000", colorLight: "#ffffff", bodyShape: "square", frameShape: "square", eyeDotShape: "square" } },
    { name: 'Horizonte', config: { colorDark: "#3182ce", colorLight: "#ebf8ff", bodyShape: "circle", frameShape: "rounded", eyeDotShape: "circle" } },
    { name: 'Botânico', config: { colorDark: "#276749", colorLight: "#f0fff4", bodyShape: "leaf", frameShape: "leaf", eyeDotShape: "leaf" } },
    { name: 'Cyber', config: { colorDark: "#553c9a", colorLight: "#e9d8fd", bodyShape: "extra-rounded", frameShape: "rounded", eyeDotShape: "square" } },
    { name: 'Romance', config: { colorDark: "#e53e3e", colorLight: "#fff5f5", bodyShape: "heart", frameShape: "rounded", eyeDotShape: "heart" } },
    { name: 'Solar', config: { colorDark: "#dd6b20", colorLight: "#fffaf0", bodyShape: "classy", frameShape: "rounded", eyeDotShape: "circle" } },
    { name: 'Neon', config: { colorDark: "#d946ef", colorLight: "#000000", bodyShape: "extra-rounded", frameShape: "octagon", eyeDotShape: "hexagon", gradientType: "linear", gradientColor1: "#d946ef", gradientColor2: "#22c55e" } },
    { name: 'Sunset', config: { colorDark: "#7c3aed", colorLight: "#fff7ed", bodyShape: "rounded-xl", frameShape: "rounded-xl", eyeDotShape: "circle", gradientType: "linear", gradientColor1: "#f59e0b", gradientColor2: "#7c3aed" } },
    { name: 'Ocean', config: { colorDark: "#06b6d4", colorLight: "#0f172a", bodyShape: "classy-rounded", frameShape: "rounded", eyeDotShape: "diamond", gradientType: "linear", gradientColor1: "#06b6d4", gradientColor2: "#3b82f6" } },
    { name: 'Golden', config: { colorDark: "#b45309", colorLight: "#fffbeb", bodyShape: "diamond", frameShape: "classy", eyeDotShape: "star", gradientType: "linear", gradientColor1: "#fcd34d", gradientColor2: "#b45309" } }
];

const colorPresets = [
    { name: 'Padrão', light: '#ffffff', dark: '#000000' },
    { name: 'Deep Blue', light: '#ebf8ff', dark: '#2c5282' },
    { name: 'Forest', light: '#f0fff4', dark: '#276749' },
    { name: 'Royal', light: '#faf5ff', dark: '#553c9a' },
    { name: 'Sunset', light: '#fffaf0', dark: '#c05621' },
    { name: 'Dark Mode', light: '#1a202c', dark: '#cbd5e0' },
    { name: 'Ocean', light: '#f0f9ff', dark: '#0284c7', isGradient: true, gradStart: '#0ea5e9', gradEnd: '#3b82f6' },
    { name: 'Sunset Glow', light: '#fff7ed', dark: '#ea580c', isGradient: true, gradStart: '#f59e0b', gradEnd: '#ef4444' },
    { name: 'Berry', light: '#fdf2f8', dark: '#db2777', isGradient: true, gradStart: '#ec4899', gradEnd: '#8b5cf6' },
    { name: 'Aurora', light: '#f0fdf4', dark: '#16a34a', isGradient: true, gradStart: '#4ade80', gradEnd: '#0d9488' },
    { name: 'Neon Night', light: '#0f172a', dark: '#38bdf8', isGradient: true, gradStart: '#38bdf8', gradEnd: '#818cf8' }
];

// --- Utility Functions ---

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function isValidURL(string) {
    try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

function isValidCoordinate(lat, lng) {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    return !isNaN(latNum) && !isNaN(lngNum) &&
        latNum >= -90 && latNum <= 90 &&
        lngNum >= -180 && lngNum <= 180;
}

function escapeWifi(str) {
    // Escaping special characters for WiFi string format
    return str.replace(/[\\;,: ]/g, '\\$&');
}

function safeInitIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function showToast(msg) {
    const toast = document.getElementById("toast");
    const txt = document.getElementById("toast-message");
    if (toast && txt) {
        txt.innerText = msg;
        toast.className = "show flex items-center justify-center gap-2";
        setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
    }
}

// --- Canvas Polyfill ---
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, radii) {
        if (!radii) radii = 0;
        if (typeof radii === 'number') radii = [radii];
        let r1, r2, r3, r4;
        if (radii.length === 1) { r1 = r2 = r3 = r4 = radii[0]; }
        else if (radii.length === 2) { r1 = r3 = radii[0]; r2 = r4 = radii[1]; }
        else if (radii.length === 4) { [r1, r2, r3, r4] = radii; }
        else { r1 = r2 = r3 = r4 = 0; }
        this.beginPath();
        this.moveTo(x + r1, y);
        this.lineTo(x + w - r2, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r2);
        this.lineTo(x + w, y + h - r3);
        this.quadraticCurveTo(x + w, y + h, x + w - r3, y + h);
        this.lineTo(x + r4, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r4);
        this.lineTo(x, y + r1);
        this.quadraticCurveTo(x, y, x + r1, y);
        this.closePath();
    };
}

// --- Drawing Strategies ---

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
}

function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
}

function drawPolygon(ctx, cx, cy, sides, r, rotationOffset) {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        const theta = (i / sides) * 2 * Math.PI + rotationOffset;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
}

function drawHeart(ctx, x, y, w, h) {
    const topCurveHeight = h * 0.3;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + h * 0.2);
    ctx.bezierCurveTo(x + w / 2, y + h * 0.2 - topCurveHeight, x, y, x, y + h * 0.4);
    ctx.bezierCurveTo(x, y + h * 0.6, x + w / 2, y + h * 0.8, x + w / 2, y + h);
    ctx.bezierCurveTo(x + w / 2, y + h * 0.8, x + w, y + h * 0.6, x + w, y + h * 0.4);
    ctx.bezierCurveTo(x + w, y, x + w / 2, y + h * 0.2 - topCurveHeight, x + w / 2, y + h * 0.2);
    ctx.closePath();
}

const drawingStrategies = {
    body: {
        'square': (ctx, x, y, size) => ctx.fillRect(x, y, size + 0.5, size + 0.5),
        'circle': (ctx, x, y, size, cx, cy, r) => ctx.arc(cx, cy, r * 0.9, 0, Math.PI * 2),
        'rounded': (ctx, x, y, size) => roundRect(ctx, x, y, size, size, size * 0.25),
        'extra-rounded': (ctx, x, y, size) => roundRect(ctx, x, y, size, size, size * 0.5),
        'classy': (ctx, x, y, size) => ctx.roundRect(x, y, size, size, [size / 2, 0, size / 2, 0]),
        'classy-rounded': (ctx, x, y, size) => ctx.roundRect(x, y, size, size, [size / 2, 0, size / 2, size / 4]),
        'star': (ctx, x, y, size, cx, cy, r) => drawStar(ctx, cx, cy, 5, r * 0.95, r * 0.4),
        'diamond': (ctx, x, y, size, cx, cy, r) => drawPolygon(ctx, cx, cy, 4, r * 0.9, 0),
        'triangle': (ctx, x, y, size, cx, cy, r) => drawPolygon(ctx, cx, cy, 3, r * 0.9, -Math.PI / 2),
        'hexagon': (ctx, x, y, size, cx, cy, r) => drawPolygon(ctx, cx, cy, 6, r * 0.9, Math.PI / 2),
        'cross': (ctx, x, y, size, cx, cy) => {
            const w = size * 0.35;
            ctx.rect(cx - w / 2, y, w, size);
            ctx.rect(x, cy - w / 2, size, w);
        },
        'heart': (ctx, x, y, size) => drawHeart(ctx, x, y, size, size),
        'pizza': (ctx, x, y, size, cx) => {
            ctx.moveTo(cx, y);
            ctx.lineTo(x + size, y + size);
            ctx.quadraticCurveTo(cx, y + size + size * 0.1, x, y + size);
        },
        'coffee': (ctx, x, y, size) => {
            const cupW = size * 0.7, cupH = size * 0.6;
            const cupX = x + (size - cupW) / 2 - size * 0.05;
            const cupY = y + size * 0.3;
            ctx.moveTo(cupX, cupY);
            ctx.lineTo(cupX + cupW, cupY);
            ctx.quadraticCurveTo(cupX + cupW, cupY + cupH, cupX + cupW * 0.5, cupY + cupH);
            ctx.quadraticCurveTo(cupX, cupY + cupH, cupX, cupY);
            ctx.moveTo(cupX + cupW, cupY + cupH * 0.2);
            ctx.quadraticCurveTo(cupX + cupW + size * 0.2, cupY + cupH * 0.2, cupX + cupW + size * 0.2, cupY + cupH * 0.5);
            ctx.quadraticCurveTo(cupX + cupW + size * 0.2, cupY + cupH * 0.8, cupX + cupW, cupY + cupH * 0.8);
        },
        'house': (ctx, x, y, size, cx) => {
            const roofH = size * 0.4;
            ctx.moveTo(cx, y);
            ctx.lineTo(x + size, y + roofH);
            ctx.lineTo(x + size * 0.85, y + roofH);
            ctx.lineTo(x + size * 0.85, y + size);
            ctx.lineTo(x + size * 0.15, y + size);
            ctx.lineTo(x + size * 0.15, y + roofH);
            ctx.lineTo(x, y + roofH);
        }
    },
    frame: {
        'square': (ctx, outerX, outerY, outerSize) => ctx.strokeRect(outerX, outerY, outerSize, outerSize),
        'circle': (ctx, outerX, outerY, outerSize, x, y, size) => {
            ctx.arc(x + size / 2, y + size / 2, outerSize / 2, 0, Math.PI * 2);
            ctx.stroke();
        },
        'rounded': (ctx, outerX, outerY, outerSize, x, y, size) => {
            roundRectPath(ctx, outerX, outerY, outerSize, outerSize, size * 0.2);
            ctx.stroke();
        },
        'leaf': (ctx, outerX, outerY, outerSize) => {
            const r = outerSize / 2;
            const cx = outerX + r; const cy = outerY + r;
            ctx.moveTo(outerX, cy);
            ctx.arcTo(outerX, outerY, cx, outerY, r);
            ctx.lineTo(cx, outerY);
            ctx.lineTo(outerX + outerSize, outerY);
            ctx.lineTo(outerX + outerSize, cy);
            ctx.arcTo(outerX + outerSize, outerY + outerSize, cx, outerY + outerSize, r);
            ctx.lineTo(cx, outerY + outerSize);
            ctx.lineTo(outerX, outerY + outerSize);
            ctx.closePath();
            ctx.stroke();
        }
    }
};

// --- QR Rendering ---

function setLoadingState(loading) {
    isGenerating = loading;
    const container = document.getElementById('qr-code-container');
    if (!container) return;

    if (loading) {
        container.classList.add('loading-pulse');
    } else {
        container.classList.remove('loading-pulse');
    }
}

function announceToScreenReader(message) {
    const announcement = document.getElementById('aria-announcements');
    if (announcement) {
        announcement.textContent = message;
    }
}

function getFillStyle(ctx, color, x, y, size) {
    if (config.gradientType !== 'none') {
        const gradient = ctx.createLinearGradient(0, 0, config.width, config.height);
        gradient.addColorStop(0, config.gradientColor1);
        gradient.addColorStop(1, config.gradientColor2);
        return gradient;
    }
    return color;
}

function drawShape(ctx, type, x, y, size, color) {
    if (color === config.colorDark && config.gradientType !== 'none') {
        ctx.fillStyle = getFillStyle(ctx, color, 0, 0, 0);
    } else {
        ctx.fillStyle = color;
    }

    ctx.beginPath();
    const r = size / 2;
    const cx = x + r;
    const cy = y + r;

    const strategy = drawingStrategies.body[type] || drawingStrategies.body.square;
    strategy(ctx, x, y, size, cx, cy, r);

    ctx.fill();
}

function drawEyeFrame(ctx, type, x, y, size, color) {
    ctx.strokeStyle = color;
    const thickness = size / 7;
    ctx.lineWidth = thickness;
    const outerSize = size - thickness;
    const outerX = x + thickness / 2;
    const outerY = y + thickness / 2;

    ctx.beginPath();
    const strategy = drawingStrategies.frame[type] || drawingStrategies.frame.square;
    strategy(ctx, outerX, outerY, outerSize, x, y, size);
}

function drawEyeDot(ctx, type, x, y, size, color) {
    drawShape(ctx, type, x, y, size, color);
}

function renderQR() {
    if (typeof qrcode === 'undefined') {
        console.error("QRCode library not loaded yet.");
        return;
    }

    try {
        setLoadingState(true);

        const typeNumber = 0;
        const errorCorrectionLevel = 'Q';
        const qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(config.text);
        qr.make();

        const count = qr.getModuleCount();
        const canvas = document.createElement('canvas');
        const padding = 20;
        const size = config.width;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Background
        if (config.isTransparent) {
            ctx.clearRect(0, 0, size, size);
        } else {
            ctx.fillStyle = config.colorLight;
            ctx.fillRect(0, 0, size, size);
        }

        const availableSize = size - (padding * 2);
        const cellSize = availableSize / count;
        const offset = padding;

        const isCorner = (r, c) => {
            if (r < 7 && c < 7) return true;
            if (r < 7 && c >= count - 7) return true;
            if (r >= count - 7 && c < 7) return true;
            return false;
        };

        // Body
        for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
                if (isCorner(r, c)) continue;
                if (qr.isDark(r, c)) {
                    const cx = offset + c * cellSize;
                    const cy = offset + r * cellSize;
                    drawShape(ctx, config.bodyShape, cx, cy, cellSize, config.colorDark);
                }
            }
        }

        // Markers
        const drawMarker = (r, c) => {
            const cx = offset + c * cellSize;
            const cy = offset + r * cellSize;
            drawEyeFrame(ctx, config.frameShape, cx, cy, cellSize * 7, config.colorFrame);
            drawEyeDot(ctx, config.eyeDotShape, cx + cellSize * 2, cy + cellSize * 2, cellSize * 3, config.colorEyeDot);
        };

        drawMarker(0, 0);
        drawMarker(0, count - 7);
        drawMarker(count - 7, 0);

        // Logo Render Helper
        const finishRender = () => {
            updateContainer(canvas);
            setLoadingState(false);
            announceToScreenReader('QR Code atualizado');
            setTimeout(() => saveConfig(), 500);
        };

        if (config.logo) {
            const img = new Image();
            img.src = config.logo;
            img.onload = () => {
                const logoSize = size * config.logoSize;
                const lx = (size - logoSize) / 2;
                const ly = (size - logoSize) / 2;
                ctx.drawImage(img, lx, ly, logoSize, logoSize);
                finishRender();
            };
            // If cached
            if (img.complete) {
                const logoSize = size * config.logoSize;
                const lx = (size - logoSize) / 2;
                const ly = (size - logoSize) / 2;
                ctx.drawImage(img, lx, ly, logoSize, logoSize);
                finishRender();
            }
        } else {
            finishRender();
        }

    } catch (e) {
        console.error("Error rendering QR:", e);
        setLoadingState(false);
    }
}

function updateContainer(canvas) {
    const container = document.getElementById("qr-code-container");
    if (!container) return;
    container.innerHTML = '';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
}

// --- UI Logic & State Management ---

function saveConfig() {
    try {
        const configToSave = { ...config, logo: null };
        localStorage.setItem('qr-config', JSON.stringify(configToSave));
    } catch (e) {
        console.warn('Failed to save config:', e);
    }
}

function loadConfig() {
    try {
        const saved = localStorage.getItem('qr-config');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && typeof parsed === 'object') {
                Object.keys(parsed).forEach(key => {
                    if (key !== 'logo' && config.hasOwnProperty(key)) {
                        config[key] = parsed[key];
                    }
                });
                return true;
            }
        }
    } catch (e) {
        console.warn('Failed to load config:', e);
    }
    return false;
}

function resetConfig() {
    localStorage.removeItem('qr-config');
    location.reload();
}

function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    const panel = document.getElementById(id + '-panel');
    const tab = document.getElementById('tab-' + id);

    if (panel) panel.classList.add('active');
    if (tab) tab.classList.add('active');

    safeInitIcons();
}

// Expose for HTML access
window.switchTab = switchTab;
window.resetConfig = resetConfig;
window.toggleTheme = function () {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
};
window.setGradientMode = function (mode) {
    config.gradientType = mode;
    const btnSolid = document.getElementById('btnSolid');
    const btnGradient = document.getElementById('btnGradient');
    const solidInput = document.getElementById('solidColorInput');
    const gradientInputs = document.getElementById('gradientInputs');

    if (!btnSolid || !btnGradient || !solidInput || !gradientInputs) return;

    // Reset Classes
    const activeClasses = ['bg-white', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-200', 'shadow-sm'];
    const inactiveClasses = ['text-slate-400', 'hover:text-slate-600'];

    btnSolid.classList.remove(...activeClasses, ...inactiveClasses);
    btnGradient.classList.remove(...activeClasses, ...inactiveClasses);

    if (mode === 'none') {
        btnSolid.classList.add(...activeClasses);
        btnGradient.classList.add(...inactiveClasses);
        solidInput.classList.remove('hidden');
        gradientInputs.classList.add('hidden');
    } else {
        btnGradient.classList.add(...activeClasses);
        btnSolid.classList.add(...inactiveClasses);
        solidInput.classList.add('hidden');
        gradientInputs.classList.remove('hidden');
    }
    renderQR();
};
window.switchContentTab = switchContentTab;
window.getCurrentLocation = getCurrentLocation;
window.downloadQR = function (ext) {
    const canvas = document.querySelector('#qr-code-container canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = (document.getElementById('fileName').value || 'qr-code') + '.' + ext;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast("Download iniciado!");
};
window.copyToClipboard = function () {
    const canvas = document.querySelector('#qr-code-container canvas');
    if (!canvas) return;
    canvas.toBlob(function (blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(function () {
            showToast("Imagem copiada para a área de transferência!");
        }, function (error) {
            showToast("Erro ao copiar imagem.");
            console.error(error);
        });
    });
};
window.scrollCarousel = function (id, direction) {
    const container = document.getElementById(id);
    if (container) {
        const scrollAmount = 200;
        container.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
    }
};

// --- Renderers ---

function renderThemes() {
    const container = document.getElementById('themesGrid');
    if (!container) return;
    container.innerHTML = '';
    themes.forEach(theme => {
        const btn = document.createElement('button');
        btn.className = 'carousel-item theme-btn flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-500 hover:shadow-md hover:-translate-y-1 transition group min-w-[90px]';
        btn.onclick = () => applyTheme(theme.config);

        const preview = document.createElement('div');
        preview.className = 'w-10 h-10 rounded-lg shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center';
        preview.style.backgroundColor = theme.config.colorLight;
        preview.innerHTML = `<div class="w-5 h-5 rounded-md shadow-sm" style="background-color: ${theme.config.colorDark}"></div>`;

        const label = document.createElement('span');
        label.className = 'text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400';
        label.innerText = theme.name;

        btn.appendChild(preview);
        btn.appendChild(label);
        container.appendChild(btn);
    });
}

function applyTheme(newConfig) {
    Object.keys(newConfig).forEach(key => {
        config[key] = newConfig[key];
    });

    if (newConfig.gradientType && newConfig.gradientType !== 'none') {
        window.setGradientMode(newConfig.gradientType);
        if (newConfig.gradientColor1) document.getElementById('gradColor1').value = newConfig.gradientColor1;
        if (newConfig.gradientColor2) document.getElementById('gradColor2').value = newConfig.gradientColor2;
    } else {
        window.setGradientMode('none');
    }

    // Update Color Inputs
    const updateInput = (id, val) => {
        const el = document.getElementById(id);
        const disp = document.getElementById(id + 'Display');
        if (el) el.value = val;
        if (disp) disp.innerText = val.toUpperCase();
    }

    updateInput('bgColor', config.colorLight);
    updateInput('dotsColor', config.colorDark);
    // Also update display for others if changed
    updateInput('frameColor', config.colorFrame); // Assuming these match
    document.getElementById('frameColorDisplay').innerText = config.colorFrame.toUpperCase(); // Explicit

    // Re-render shape buttons to show active state
    renderShapeButtons('body', 'bodyShapeGrid', 'bodyShape');
    renderShapeButtons('eyeFrame', 'eyeFrameGrid', 'frameShape');
    renderShapeButtons('eyeDot', 'eyeDotGrid', 'eyeDotShape');

    renderQR();
}

function renderColorPresets() {
    const container = document.getElementById('colorPresetsGrid');
    if (!container) return;
    container.innerHTML = '';
    colorPresets.forEach(preset => {
        const btn = document.createElement('button');
        btn.className = 'carousel-item w-12 h-12 flex-shrink-0 rounded-full border-2 border-slate-200 dark:border-slate-600 shadow-sm hover:scale-110 hover:shadow-md hover:ring-2 hover:ring-teal-500 hover:ring-offset-2 transition duration-300 flex items-center justify-center relative overflow-hidden';
        btn.style.backgroundColor = preset.light;
        btn.title = preset.name;

        const inner = document.createElement('div');
        inner.className = 'w-7 h-7 rounded-full shadow-sm';
        if (preset.isGradient) {
            inner.style.background = `linear-gradient(135deg, ${preset.gradStart}, ${preset.gradEnd})`;
        } else {
            inner.style.backgroundColor = preset.dark;
        }
        btn.appendChild(inner);

        btn.onclick = () => {
            config.colorLight = preset.light;
            document.getElementById('bgColor').value = preset.light;
            document.getElementById('bgColorDisplay').innerText = preset.light.toUpperCase();

            if (preset.isGradient) {
                window.setGradientMode('linear');
                config.gradientColor1 = preset.gradStart;
                config.gradientColor2 = preset.gradEnd;
                config.colorDark = preset.gradStart;

                document.getElementById('gradColor1').value = preset.gradStart;
                document.getElementById('gradColor2').value = preset.gradEnd;
                document.getElementById('dotsColor').value = preset.gradStart;
                document.getElementById('dotsColorDisplay').innerText = preset.gradStart.toUpperCase();
            } else {
                window.setGradientMode('none');
                config.colorDark = preset.dark;
                document.getElementById('dotsColor').value = preset.dark;
                document.getElementById('dotsColorDisplay').innerText = preset.dark.toUpperCase();
            }

            const mainColor = preset.isGradient ? preset.gradStart : preset.dark;
            config.colorFrame = mainColor;
            config.colorEyeDot = mainColor;

            document.getElementById('frameColor').value = mainColor;
            document.getElementById('frameColorDisplay').innerText = mainColor.toUpperCase();
            document.getElementById('eyeDotColor').value = mainColor;
            document.getElementById('eyeDotColorDisplay').innerText = mainColor.toUpperCase();

            renderQR();
        };
        container.appendChild(btn);
    });
}

function renderShapeButtons(type, containerId, configKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const list = shapes[type] || [];
    list.forEach(item => {
        const btn = document.createElement('button');
        const isActive = config[configKey] === item.value;
        btn.className = `carousel-item shape-btn w-10 h-10 flex-shrink-0 p-0 rounded-xl border ${isActive ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-600 shadow-sm ring-1 ring-teal-500/20' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:border-teal-300 hover:text-teal-500 hover:bg-white dark:hover:bg-slate-800'} transition flex items-center justify-center`;
        btn.innerHTML = `<svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" stroke="none">${item.icon}</svg>`;
        btn.onclick = () => {
            config[configKey] = item.value;
            renderShapeButtons(type, containerId, configKey);
            renderQR();
        };
        container.appendChild(btn);
    });
}

// --- Event Setup ---

function setupAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            if (content) {
                content.classList.toggle('open');
                const icon = btn.querySelector('.lucide-chevron-down');
                if (icon) icon.classList.toggle('rotate-180');
            }
        });
    });
}

function setupKeyboardNavigation() {
    document.querySelectorAll('.carousel-container').forEach(carousel => {
        carousel.setAttribute('tabindex', '0');
        carousel.setAttribute('role', 'region');
        carousel.setAttribute('aria-label', 'Carrossel de opções');

        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                carousel.scrollBy({ left: -150, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                carousel.scrollBy({ left: 150, behavior: 'smooth' });
            }
        });
    });
}

function switchContentTab(type) {
    activeContentType = type;

    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('btn-type-' + type);
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.content-form').forEach(f => f.classList.add('hidden'));
    const form = document.getElementById('form-' + type);
    if (form) form.classList.remove('hidden');

    updateQRContent();
}

function setupContentListeners() {
    const debouncedUpdate = debounce(updateQRContent, 300);

    const linkInput = document.getElementById('input-link');
    if (linkInput) linkInput.addEventListener('input', (e) => {
        validateURLInput(e.target);
        debouncedUpdate();
    });

    const ids = [
        'input-text', 'wifi-ssid', 'wifi-pass', 'wifi-type', 'wifi-hidden',
        'wa-number', 'wa-message', 'tel-number', 'sms-number', 'sms-message',
        'file-url'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', debouncedUpdate);
    });

    // File URL specific validation
    const fileUrl = document.getElementById('file-url');
    if (fileUrl) fileUrl.addEventListener('input', (e) => validateURLInput(e.target));

    const locLat = document.getElementById('loc-lat');
    const locLong = document.getElementById('loc-long');
    if (locLat && locLong) {
        locLat.addEventListener('input', () => {
            validateCoordinates(locLat, locLong);
            debouncedUpdate();
        });
        locLong.addEventListener('input', () => {
            validateCoordinates(locLat, locLong);
            debouncedUpdate();
        });
    }
}

function validateURLInput(input) {
    if (!input) return;
    const value = input.value.trim();
    const parent = input.closest('.relative');
    if (!parent) return;

    const existing = parent.querySelector('.validation-icon');
    if (existing) existing.remove();

    if (!value) return;

    const isValid = isValidURL(value);
    const icon = document.createElement('span');
    icon.className = `validation-icon ${isValid ? 'valid' : 'invalid'}`;
    icon.textContent = isValid ? '✓' : '✗';
    parent.appendChild(icon);

    input.style.borderColor = isValid ? 'var(--color-success)' : 'var(--color-error)';
}

function validateCoordinates(latInput, lngInput) {
    const lat = latInput.value.trim();
    const lng = lngInput.value.trim();

    if (!lat || !lng) return;

    const isValid = isValidCoordinate(lat, lng);

    [latInput, lngInput].forEach(input => {
        input.style.borderColor = isValid ? 'var(--color-success)' : 'var(--color-error)';
    });
}

function updateQRContent() {
    let qrText = "";

    const getValue = (id) => {
        const el = document.getElementById(id);
        return el ? el.value : "";
    };

    if (activeContentType === 'link') {
        qrText = getValue('input-link');
    } else if (activeContentType === 'text') {
        qrText = getValue('input-text');
    } else if (activeContentType === 'wifi') {
        const ssid = getValue('wifi-ssid');
        const pass = getValue('wifi-pass');
        const type = getValue('wifi-type');
        const hiddenEl = document.getElementById('wifi-hidden');
        const hidden = hiddenEl ? hiddenEl.checked : false;

        let wifiString = `WIFI:S:${escapeWifi(ssid)};T:${type};`;
        if (type !== 'nopass') wifiString += `P:${escapeWifi(pass)};`;
        if (hidden) wifiString += `H:true;`;
        wifiString += `;`;
        qrText = wifiString;

    } else if (activeContentType === 'location') {
        const mapLink = getValue('loc-url');
        if (mapLink && mapLink.trim() !== "") {
            qrText = mapLink.trim();
        } else {
            const lat = getValue('loc-lat') || "0";
            const long = getValue('loc-long') || "0";
            qrText = `geo:${lat},${long}`;
        }
    } else if (activeContentType === 'email') {
        const to = getValue('email-to');
        const subject = getValue('email-subject');
        const body = getValue('email-body');
        if (to) {
            qrText = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        } else { qrText = "mailto:"; }
    } else if (activeContentType === 'whatsapp') {
        let number = getValue('wa-number').replace(/\D/g, '');
        const message = getValue('wa-message');
        if (number) {
            qrText = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        } else { qrText = "https://wa.me/"; }
    } else if (activeContentType === 'tel') {
        let number = getValue('tel-number').replace(/[^\d+]/g, '');
        if (number) { qrText = `tel:${number}`; } else { qrText = "tel:"; }
    } else if (activeContentType === 'sms') {
        let number = getValue('sms-number').replace(/[^\d+]/g, '');
        const message = getValue('sms-message');
        if (number) {
            qrText = `sms:${number}?body=${encodeURIComponent(message)}`;
        } else { qrText = "sms:"; }
    } else if (activeContentType === 'file') {
        qrText = getValue('file-url');
    }

    config.text = qrText;
    renderQR();
}

function setupListeners() {
    const debouncedRender = debounce(renderQR, 50);

    const setupColor = (pickerId, displayId, configKey) => {
        const picker = document.getElementById(pickerId);
        const display = document.getElementById(displayId);
        if (!picker || !display) return;
        picker.addEventListener('input', (e) => {
            const val = e.target.value;
            display.innerText = val.toUpperCase();
            config[configKey] = val;
            debouncedRender();
        });
    };

    setupColor('bgColor', 'bgColorDisplay', 'colorLight');
    setupColor('dotsColor', 'dotsColorDisplay', 'colorDark');
    setupColor('frameColor', 'frameColorDisplay', 'colorFrame');
    setupColor('eyeDotColor', 'eyeDotColorDisplay', 'colorEyeDot');

    const grad1 = document.getElementById('gradColor1');
    if (grad1) grad1.addEventListener('input', (e) => { config.gradientColor1 = e.target.value; debouncedRender(); });

    const grad2 = document.getElementById('gradColor2');
    if (grad2) grad2.addEventListener('input', (e) => { config.gradientColor2 = e.target.value; debouncedRender(); });

    const transparentToggle = document.getElementById('bgTransparentToggle');
    if (transparentToggle) transparentToggle.addEventListener('change', (e) => {
        const w = document.getElementById('bgColorWrapper');
        if (e.target.checked) {
            config.isTransparent = true;
            if (w) { w.style.opacity = '0.5'; w.style.pointerEvents = 'none'; }
        } else {
            config.isTransparent = false;
            if (w) { w.style.opacity = '1'; w.style.pointerEvents = 'auto'; }
        }
        renderQR();
    });

    // Logo Upload
    const logoInput = document.getElementById('logoInput');
    if (logoInput) logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                config.logo = reader.result;
                const controls = document.getElementById('logoControls');
                const dropzone = document.getElementById('dropzone');
                if (controls) controls.classList.remove('hidden');
                if (dropzone) dropzone.classList.add('hidden');
                renderQR();
                showToast("Logo carregada com sucesso!");
            };
            reader.readAsDataURL(file);
        }
    });

    const logoSizeInput = document.getElementById('logoSizeInput');
    if (logoSizeInput) logoSizeInput.addEventListener('input', debounce((e) => {
        const val = parseFloat(e.target.value);
        config.logoSize = val;
        const disp = document.getElementById('logoSizeValue');
        if (disp) disp.innerText = Math.round(val * 100) + '%';
        renderQR();
    }, 50));

    const removeLogoBtn = document.getElementById('removeLogoBtn');
    if (removeLogoBtn) removeLogoBtn.addEventListener('click', () => {
        config.logo = null;
        if (logoInput) logoInput.value = "";
        const controls = document.getElementById('logoControls');
        const dropzone = document.getElementById('dropzone');
        if (controls) controls.classList.add('hidden');
        if (dropzone) dropzone.classList.remove('hidden');
        renderQR();
    });
}

function syncUIWithConfig() {
    const update = (id, val) => {
        const el = document.getElementById(id);
        const disp = document.getElementById(id + 'Display');
        if (el) el.value = val;
        if (disp) disp.innerText = val.toUpperCase();
    }

    update('bgColor', config.colorLight);
    update('dotsColor', config.colorDark);
    update('frameColor', config.colorFrame);
    update('eyeDotColor', config.colorEyeDot);

    const linkInput = document.getElementById('input-link');
    if (config.text && linkInput) {
        linkInput.value = config.text;
    }

    const transparentToggle = document.getElementById('bgTransparentToggle');
    if (transparentToggle) {
        transparentToggle.checked = config.isTransparent;
        const w = document.getElementById('bgColorWrapper');
        if (config.isTransparent && w) {
            w.style.opacity = '0.5';
            w.style.pointerEvents = 'none';
        }
    }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    try {
        const configLoaded = loadConfig();

        safeInitIcons();
        renderThemes();
        renderColorPresets();
        renderShapeButtons('body', 'bodyShapeGrid', 'bodyShape');
        renderShapeButtons('eyeFrame', 'eyeFrameGrid', 'frameShape');
        renderShapeButtons('eyeDot', 'eyeDotGrid', 'eyeDotShape');

        setupListeners();
        setupContentListeners();
        setupAccordions();
        setupKeyboardNavigation();

        if (configLoaded) {
            syncUIWithConfig();
            showToast('Configurações restauradas!');
        }

        // Apply dark mode preference on load
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        setTimeout(() => renderQR(), 100);

    } catch (err) {
        console.error("Critical Initialization error:", err);
        showToast("Erro ao inicializar aplicação. Verifique o console.");
    }
});