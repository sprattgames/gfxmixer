const hexPalettes = [
    ["#0000", "#f8f8f8", "#000000", "#885818", "#d8a038", "#f8d870", "#f8c898", "#e800b0", "#500000", "#f84070", "#203088", "#408098", "#80d8c8", "#b02860", "#f87068", "#f8f800"],
    ["#0000", "#f8f8f8", "#000000", "#707070", "#a0a0a0", "#c0c0c0", "#e0e0e0", "#f81058", "#0000", "#f8f8f8", "#000000", "#00c800", "#b00000", "#f80000", "#f85800", "#f8a000"],
    ["#0000", "#f8f8f8", "#000000", "#f87800", "#f8c000", "#f8f800", "#b82800", "#f88800", "#0000", "#f8f8f8", "#000000", "#00c800", "#e81868", "#f040a8", "#f878c8", "#f8c0f0"],
    ["#0000", "#f8f8f8", "#000000", "#4040d8", "#6868d8", "#8888f8", "#b82800", "#f88800", "#0000", "#f8f8f8", "#000000", "#00c800", "#00e000", "#88f838", "#c8f800", "#f8f898"],
    ["#0000", "#f8f8f8", "#000000", "#880000", "#b80000", "#f80000", "#b82800", "#f88800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#007800", "#00b800", "#00f800", "#b82800", "#f88800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#283048", "#485058", "#686858", "#989040", "#c0c078", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#184848", "#207068", "#288878", "#30a088", "#38b898", "#f80080", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],

    ["#0000", "#f8f8f8", "#000000", "#005050", "#007878", "#00a0a0", "#b82800", "#f88800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#707070", "#a0a0a0", "#c0c0c0", "#b82800", "#f88800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#a00868", "#d00888", "#f860c8", "#b04000", "#f89800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#d8f8c0", "#60c000", "#588000", "#a84828", "#f89030", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#307080", "#a0d0e0", "#d0f8f8", "#e8f8f8", "#4040d8", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#706858", "#908878", "#b0a890", "#c8b8a0", "#983858", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#8098f8", "#98b0f8", "#b0c8f8", "#c8e0f8", "#f80080", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#f8b098", "#f0b0b0", "#e8a8c8", "#e098e0", "#f80080", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#5858a0", "#689898", "#98e898", "#f82860", "#e8c068", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#908858", "#688090", "#402020", "#505040", "#685850", "#787078", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#a8f8f8", "#b8f8f8", "#c8f8f8", "#c8f8f8", "#e0f8f8", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"]
];

// generate rgba palettes from hexPalettes
const rgbaPalettes = hexPalettes.map(palette => palette.map(hex => {
    var c;
    if (hex.length == 5 || hex.length == 9) {
        return [0, 0, 0, 0]
    }
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return [(c >> 16) & 255, (c >> 8) & 255, c & 255, 255]
    }
    return [0, 0, 0, 0] // bad hex code, return as empty
}))

const gfxFileNames = ["GFX00", "GFX01", "GFX02", "GFX03", "GFX04", "GFX05", "GFX06", "GFX09", "GFX0A", "GFX0D", "GFX0E", "GFX0F", "GFX11", "GFX12", "GFX13", "GFX14", "GFX20", "GFX22", "GFX23", "GFX24", "GFX25"]

//  ==============================================================

const allSprites = [{
    name: "Bob-Omb",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 0, 12, 4, false, 28, 56, false, false],
        [3, 7, 10, 4, false, 48, 56, false, false],
        [3, 2, 12, 3, true, 80, 48, false, false],
        [3, 2, 12, 3, true, 92, 56, false, false],
        [3, 2, 12, 3, true, 88, 68, false, false],
        [3, 2, 12, 3, true, 72, 68, false, false],
        [3, 2, 12, 3, true, 68, 56, false, false],
    ]
}, {
    name: "Spiny",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 4, 0, 0, false, 44, 56, false, false],
        [3, 4, 2, 0, false, 68, 56, false, false],
    ]
}, {
    name: "Hopping Flame",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 2, 14, 0, false, 40, 52, false, false],
        [3, 2, 14, 2, false, 56, 52, false, false],
        [3, 2, 12, 2, true, 76, 60, false, false],
        [3, 2, 13, 2, true, 84, 60, false, false],
    ]
}, {
    name: "Falling Spiny",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 4, 4, 0, true, 44, 56, false, false],
        [3, 4, 4, 0, true, 44, 64, false, true],
        [3, 4, 4, 0, true, 52, 56, true, false],
        [3, 4, 4, 0, true, 52, 64, true, true],
        [3, 4, 4, 1, true, 68, 56, false, false],
        [3, 4, 4, 1, true, 68, 64, false, true],
        [3, 4, 4, 1, true, 76, 56, true, false],
        [3, 4, 4, 1, true, 76, 64, true, true],
    ]
}, {
    name: "Wiggler",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 2, 6, 4, false, 68, 44, false, false],
        [3, 2, 4, 4, false, 60, 44, false, false],
        [3, 2, 6, 4, false, 52, 44, false, false],
        [3, 2, 8, 4, false, 44, 44, false, false],
        [3, 2, 12, 0, false, 36, 44, false, false],
        [3, 5, 8, 1, true, 40, 36, false, false],
        [3, 4, 4, 4, false, 68, 68, false, false],
        [3, 4, 6, 4, false, 60, 68, false, false],
        [3, 4, 8, 4, false, 52, 68, false, false],
        [3, 4, 6, 4, false, 44, 68, false, false],
        [3, 4, 12, 0, false, 36, 68, false, false],
        [3, 4, 8, 0, true, 40, 68, false, false],
    ]
}, {
    name: "Lakitu's cloud",
    category: "forest",
    slot0: "GFX00",
    slot2: "GFX13",
    displayTiles: [
        [0, 0, 0, 6, false, 48, 52, false, false],
        [0, 0, 0, 6, false, 64, 52, false, false],
        [0, 0, 0, 6, false, 56, 52, true, false],
        [0, 0, 0, 6, false, 52, 56, false, false],
        [0, 0, 0, 6, false, 60, 56, false, false],
        [2, 4, 13, 4, true, 60, 60, false, false],
    ]
}, {
    name: "Flying Lakitu",
    category: "forest",
    slot0: "GFX00",
    slot2: "GFX13",
    slot3: "GFX02",
    displayTiles: [
        [0, 0, 0, 6, false, 68, 40, false, false],
        [0, 0, 0, 6, false, 84, 40, false, false],
        [3, 4, 12, 6, false, 76, 24, false, false],
        [3, 4, 14, 6, false, 76, 40, false, false],
        [0, 0, 0, 6, false, 72, 44, true, false],
        [0, 0, 0, 6, false, 80, 44, false, false],
        [2, 4, 13, 4, true, 80, 48, false, false],
        [0, 0, 2, 6, false, 48, 84, false, false],
        [0, 0, 2, 6, false, 64, 84, false, false],
        [3, 4, 14, 4, false, 56, 68, false, false],
        [3, 4, 14, 6, false, 56, 84, false, false],
        [0, 0, 2, 6, false, 52, 88, false, false],
        [0, 0, 2, 6, false, 60, 88, false, false],
        [2, 4, 13, 4, true, 60, 92, false, false],
        [0, 0, 0, 6, false, 44, 40, false, false],
        [0, 0, 0, 6, false, 28, 40, false, false],
        [3, 2, 10, 2, false, 24, 24, false, false],
        [3, 4, 14, 6, false, 36, 40, false, false],
        [3, 4, 12, 6, false, 36, 24, false, false],
        [0, 0, 0, 6, false, 32, 44, false, false],
        [0, 0, 0, 6, false, 40, 44, false, false],
        [2, 4, 13, 4, true, 40, 48, false, false],
        [3, 0, 9, 0, true, 16, 24, false, false],
        [3, 0, 9, 0, true, 16, 32, false, false],
        [3, 0, 9, 0, true, 16, 40, false, false],
        [3, 0, 9, 0, true, 16, 48, false, false],
        [3, 0, 9, 0, true, 16, 56, false, false],
        [3, 0, 9, 0, true, 16, 64, false, false],
        [3, 0, 9, 0, true, 16, 72, false, false],
        [3, 0, 9, 0, true, 16, 80, false, false],
        [0, 5, 4, 2, false, 16, 88, false, false],
    ]
}, {
    name: "Pipe Dwelling Lakitu",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 4, 12, 6, false, 36, 48, false, false],
        [3, 4, 8, 2, false, 56, 48, false, false],
        [3, 4, 14, 4, false, 76, 48, false, false],
        [3, 4, 14, 6, false, 76, 64, false, false],
        [3, 4, 14, 6, false, 56, 64, false, false],
        [3, 4, 14, 6, false, 36, 64, false, false],
    ]
}, {
    name: "Cheep Cheep",
    category: "water",
    slot2: "GFX13",
    displayTiles: [
        [2, 2, 7, 6, false, 44, 56, false, false],
        [2, 2, 9, 6, false, 68, 56, false, false],
    ]
}, {
    name: "Magikoopa",
    category: "castle",
    slot3: "GFX03",
    displayTiles: [
        [3, 3, 0, 4, false, 56, 64, false, false],
        [3, 3, 0, 2, false, 56, 48, false, false],
        [3, 3, 9, 1, true, 48, 64, false, false],
        [3, 3, 4, 2, false, 28, 48, false, false],
        [3, 3, 4, 4, false, 28, 64, false, false],
        [3, 3, 2, 4, false, 84, 64, false, false],
        [3, 3, 9, 1, true, 76, 64, false, false],
        [3, 3, 0, 2, false, 84, 48, false, false],
    ]
}, {
    name: "Magikoopa's Magic",
    category: "castle",
    slot3: "GFX03",
    displayTiles: [
        [3, 4, 8, 0, true, 56, 52, false, false],
        [3, 3, 9, 0, true, 68, 60, false, false],
        [3, 2, 8, 1, true, 56, 68, false, false],
    ]
}, {
    name: "Net Koopas",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 4, 7, 0, false, 36, 44, false, false],
        [2, 4, 7, 2, false, 36, 60, false, false],
        [2, 5, 9, 2, false, 56, 60, false, false],
        [2, 5, 12, 4, false, 56, 44, false, false],
        [2, 4, 14, 4, false, 76, 44, false, false],
        [2, 4, 11, 2, false, 76, 60, false, false],
    ]
}, {
    name: "Thwomp",
    category: "castle",
    slot3: "GFX03",
    displayTiles: [
        [3, 1, 14, 0, false, 24, 48, false, false],
        [3, 1, 14, 0, false, 32, 48, true, false],
        [3, 1, 14, 2, false, 24, 64, false, false],
        [3, 1, 14, 2, false, 32, 64, true, false],
        [3, 1, 14, 0, false, 52, 48, false, false],
        [3, 1, 14, 0, false, 60, 48, true, false],
        [3, 1, 14, 2, false, 52, 64, false, false],
        [3, 1, 14, 2, false, 60, 64, true, false],
        [3, 1, 8, 4, false, 56, 56, false, false],
        [3, 1, 14, 0, false, 80, 48, false, false],
        [3, 1, 14, 0, false, 88, 48, true, false],
        [3, 1, 14, 2, false, 80, 64, false, false],
        [3, 1, 14, 2, false, 88, 64, true, false],
        [3, 1, 10, 4, false, 84, 56, false, false],
    ]
}, {
    name: "Thwimp",
    category: "castle",
    slot3: "GFX03",
    displayTiles: [
        [3, 1, 2, 2, true, 56, 56, false, false],
        [3, 1, 2, 3, true, 56, 64, false, false],
        [3, 1, 2, 3, true, 64, 64, true, false],
        [3, 1, 2, 2, true, 64, 56, true, false],
    ]
}, {
    name: "Dry Bones",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 1, 4, 6, false, 12, 48, false, false],
        [2, 1, 6, 6, false, 20, 64, false, false],
        [2, 1, 4, 6, false, 32, 48, false, false],
        [2, 1, 8, 6, false, 40, 64, false, false],
        [2, 1, 7, 4, false, 60, 64, false, false],
        [2, 1, 8, 4, false, 68, 64, false, false],
        [2, 1, 13, 2, false, 88, 64, false, false],
        [2, 1, 14, 2, false, 96, 64, false, false],
    ]
}, {
    name: "Bony Beetle",
    category: "castle",
    slot2: "GFX12",
    slot3: "GFX03",
    displayTiles: [
        [3, 1, 12, 0, false, 24, 44, false, false],
        [3, 1, 10, 2, false, 44, 44, false, false],
        [3, 1, 6, 0, false, 68, 44, false, false],
        [3, 1, 4, 0, false, 88, 44, false, false],
        [2, 1, 8, 4, false, 44, 68, false, false],
        [2, 1, 7, 4, false, 36, 68, false, false],
        [2, 1, 13, 2, false, 68, 68, false, false],
        [2, 1, 14, 2, false, 76, 68, false, false],
    ]
}, {
    name: "Dry Bones (Throwing)",
    category: "castle",
    slot2: "GFX12",
    slot3: "GFX03",
    displayTiles: [
        [2, 1, 4, 6, false, 12, 60, false, false],
        [2, 1, 6, 6, false, 20, 76, false, false],
        [2, 1, 4, 6, false, 32, 60, false, false],
        [2, 1, 8, 6, false, 40, 76, false, false],
        [2, 1, 7, 4, false, 60, 76, false, false],
        [2, 1, 8, 4, false, 68, 76, false, false],
        [2, 1, 13, 2, false, 88, 76, false, false],
        [2, 1, 14, 2, false, 96, 76, false, false],
        [2, 1, 4, 6, false, 88, 40, false, false],
        [3, 1, 6, 6, false, 96, 56, false, false],
        [3, 1, 2, 0, false, 96, 44, false, false],
        [3, 1, 0, 0, false, 64, 36, false, false],
        [3, 1, 0, 0, false, 48, 36, true, false],
        [3, 1, 2, 0, false, 32, 36, true, false],
        [3, 1, 2, 0, false, 12, 36, false, false],
    ]
}, {
    name: "Grinder",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 1, 12, 6, false, 28, 48, false, false],
        [2, 1, 12, 6, false, 44, 48, true, false],
        [2, 1, 12, 6, false, 28, 64, false, true],
        [2, 1, 12, 6, false, 44, 64, true, true],
        [2, 1, 14, 6, false, 68, 48, false, false],
        [2, 1, 14, 6, false, 84, 48, true, false],
        [2, 1, 14, 6, false, 68, 64, false, true],
        [2, 1, 14, 6, false, 84, 64, true, true],
    ]
}, {
    name: "Sparky",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 2, 10, 0, false, 56, 56, false, false],
    ]
}, {
    name: "Hothead",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 2, 12, 0, false, 28, 48, false, false],
        [2, 2, 14, 0, false, 44, 48, false, false],
        [2, 2, 14, 0, false, 28, 64, true, true],
        [2, 2, 12, 0, false, 44, 64, true, true],
        [2, 2, 14, 0, false, 68, 48, true, false],
        [2, 2, 14, 0, false, 84, 64, false, true],
        [2, 2, 12, 0, false, 84, 48, true, false],
        [2, 2, 12, 0, false, 68, 64, false, true],
        [2, 0, 9, 0, true, 36, 56, false, false],
        [2, 0, 9, 1, true, 76, 56, false, false],
    ]
}, {
    name: "Fishbone",
    category: "castle",
    slot3: "GFX03",
    displayTiles: [
        [3, 6, 6, 2, false, 36, 56, false, false],
        [3, 6, 3, 2, true, 52, 56, false, false],
        [3, 6, 3, 2, true, 52, 64, false, true],
        [3, 6, 8, 2, false, 68, 56, false, false],
        [3, 6, 3, 3, true, 84, 56, false, false],
        [3, 6, 3, 3, true, 84, 64, false, true],
    ]
}, {
    name: "Pencil",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 0, 10, 4, false, 56, 32, false, false],
        [2, 0, 10, 6, false, 56, 48, false, false],
        [2, 0, 10, 6, false, 56, 64, false, false],
        [2, 0, 10, 6, false, 56, 80, false, false],
    ]
}, {
    name: "Falling Spike",
    category: "castle",
    slot3: "GFX03",
    displayTiles: [
        [3, 0, 0, 6, false, 56, 56, false, false],
    ]
}, {
    name: "Bowser Statue (Jumping)",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 0, 5, 3, false, 76, 52, false, false],
        [2, 0, 6, 5, true, 84, 68, false, false],
        [2, 0, 0, 3, false, 68, 44, false, false],
    ]
}, {
    name: "Bowser Statue (Static)",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 1, 1, 4, false, 44, 60, false, false],
        [2, 1, 0, 3, false, 36, 52, false, false],
    ]
}, {
    name: "Bowser Statue Fireball",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 4, 2, 3, true, 56, 52, false, false],
        [2, 4, 0, 5, true, 64, 52, false, false],
        [2, 4, 3, 3, true, 56, 68, false, false],
        [2, 4, 4, 3, true, 64, 68, false, false],
    ]
}, {
    name: "Diagonal Reflecting Podoboo",
    category: "castle",
    slot3: "GFX03",
    displayTiles: [
        [3, 2, 12, 2, false, 56, 56, false, false],
    ]
}, {
    name: "Moving Castle Block",
    category: "castle",
    slot3: "GFX03",
    displayTiles: [
        [3, 1, 12, 4, false, 48, 48, false, false],
        [3, 1, 14, 4, false, 64, 48, false, false],
        [3, 1, 12, 6, false, 48, 64, false, false],
        [3, 1, 14, 6, false, 64, 64, false, false]
    ]
}, {
    name: "Ball 'n' Chain",
    category: "castle",
    slot3: "GFX03",
    displayTiles: [
        [3, 1, 8, 6, false, 68, 68, false, false],
        [3, 1, 8, 6, false, 56, 56, false, false],
        [3, 1, 10, 6, false, 44, 48, true, true],
        [3, 1, 10, 6, false, 28, 48, false, true],
        [3, 1, 10, 6, false, 28, 32, false, false],
        [3, 1, 10, 6, false, 44, 32, true, false],
    ]
}, {
    name: "Revolving Net Door",
    category: "castle",
    slot2: "GFX12",
    displayTiles: [
        [2, 4, 0, 0, false, 24, 24, false, false],
        [2, 4, 0, 1, false, 24, 40, false, false],
        [2, 4, 0, 0, false, 24, 48, false, true],
        [2, 4, 0, 0, false, 48, 24, true, false],
        [2, 4, 0, 0, false, 48, 48, true, true],
        [2, 4, 2, 2, true, 40, 40, false, false],
        [2, 4, 1, 0, false, 40, 24, false, false],
        [2, 4, 1, 0, false, 40, 48, false, true],
        [2, 4, 0, 1, false, 48, 40, true, false],
        [2, 4, 5, 0, false, 68, 24, false, false],
        [2, 4, 5, 0, false, 84, 24, true, false],
        [2, 4, 5, 1, false, 68, 40, false, false],
        [2, 4, 5, 1, false, 84, 40, true, false],
        [2, 4, 5, 0, false, 68, 48, false, true],
        [2, 4, 5, 0, false, 84, 48, true, true],
        [2, 4, 5, 0, false, 32, 64, false, false],
        [2, 4, 5, 0, false, 40, 64, true, false],
        [2, 4, 5, 1, false, 32, 80, false, false],
        [2, 4, 5, 1, false, 40, 80, true, false],
        [2, 4, 5, 0, false, 32, 88, false, true],
        [2, 4, 5, 0, true, 48, 96, true, true],
        [2, 4, 3, 0, false, 80, 64, false, false],
        [2, 4, 3, 1, false, 80, 80, false, false],
        [2, 4, 3, 0, true, 80, 96, false, true],
    ]
}, {
    name: "Background Candle Flames",
    category: "particle",
    slot3: "GFX03",
    displayTiles: [
        [3, 4, 2, 6, false, 48, 52, false, false],
        [3, 4, 4, 6, false, 64, 52, false, false]
    ]
}, {
    name: "Lava Splash Particles",
    category: "particle",
    slot3: "GFX03",
    displayTiles: [
        [3, 2, 6, 4, true, 44, 56, false, false],
        [3, 2, 6, 5, true, 56, 52, false, false],
        [3, 2, 7, 4, true, 68, 56, false, false],
        [3, 2, 7, 5, true, 72, 64, false, false],
    ]
}, {
    name: "Boss Fireball",
    category: "boss",
    slot3: "GFX24",
    displayTiles: [
        [3, 2, 10, 4, false, 48, 44, false, false],
        [3, 2, 12, 4, false, 64, 44, false, false],
        [3, 2, 10, 6, false, 48, 68, false, false],
        [3, 2, 12, 6, false, 64, 68, false, false],
    ]
}, {
    name: "Urchin",
    category: "water",
    slot3: "GFX06",
    displayTiles: [
        [3, 3, 4, 4, false, 12, 48, false, false],
        [3, 3, 4, 4, false, 28, 48, true, false],
        [3, 3, 4, 4, false, 28, 64, true, true],
        [3, 3, 4, 4, false, 12, 64, false, true],
        [3, 3, 6, 4, false, 48, 48, false, false],
        [3, 3, 6, 4, false, 64, 48, true, false],
        [3, 3, 6, 4, false, 64, 64, true, true],
        [3, 3, 6, 4, false, 48, 64, false, true],
        [3, 3, 8, 4, false, 84, 48, false, false],
        [3, 3, 8, 4, false, 100, 48, true, false],
        [3, 3, 8, 4, false, 100, 64, true, true],
        [3, 3, 8, 4, false, 84, 64, false, true],
        [3, 3, 10, 4, false, 20, 56, false, false],
        [3, 3, 12, 4, false, 56, 56, false, false],
        [3, 3, 10, 4, false, 92, 56, false, false],
    ]
}, {
    name: "Rip Van Fish",
    category: "water",
    slot3: "GFX06",
    displayTiles: [
        [3, 3, 12, 0, false, 24, 56, false, false],
        [3, 3, 14, 0, false, 44, 56, false, false],
        [3, 3, 0, 6, true, 36, 48, false, false],
        [3, 3, 1, 6, true, 40, 40, false, false],
        [3, 3, 0, 7, true, 36, 32, false, false],
        [3, 3, 1, 7, true, 56, 48, false, false],
        [3, 3, 12, 2, false, 68, 56, false, false],
        [3, 3, 14, 2, false, 88, 56, false, false],
    ]
}, {
    name: "Para-bomb",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 0, 2, 4, false, 24, 48, false, false],
        [3, 3, 6, 6, false, 16, 32, false, false],
        [3, 0, 2, 2, true, 48, 48, false, false],
        [3, 0, 2, 2, true, 56, 48, true, false],
        [3, 0, 2, 3, true, 48, 56, false, false],
        [3, 0, 2, 3, true, 56, 56, true, false],
        [3, 3, 2, 6, false, 48, 32, false, false],
        [3, 0, 12, 4, false, 24, 68, false, false],
        [3, 7, 10, 4, false, 48, 68, false, false],
        [3, 2, 12, 3, true, 84, 52, false, false],
        [3, 2, 12, 3, true, 96, 60, false, false],
        [3, 2, 12, 3, true, 92, 72, false, false],
        [3, 2, 12, 3, true, 76, 72, false, false],
        [3, 2, 12, 3, true, 72, 60, false, false],
    ]
}, {
    name: "Para-goomba",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 2, 3, 2, true, 68, 48, false, false],
        [3, 2, 3, 3, true, 68, 56, false, false],
        [3, 2, 3, 2, true, 76, 48, true, false],
        [3, 2, 3, 3, true, 76, 56, true, false],
        [3, 3, 2, 6, false, 68, 32, false, false],
        [3, 2, 8, 6, false, 44, 48, false, false],
        [3, 3, 6, 6, false, 36, 32, false, false],
        [1, 2, 10, 2, false, 68, 68, false, false],
        [1, 2, 8, 2, false, 44, 68, false, false],
    ]
}, {
    name: "Horizontal Dolphin",
    category: "water",
    slot3: "GFX06",
    displayTiles: [
        [3, 3, 8, 0, false, 48, 44, false, false],
        [3, 3, 8, 2, false, 64, 44, false, false],
        [3, 3, 9, 2, false, 72, 44, false, false],
        [3, 3, 2, 6, false, 48, 68, false, false],
        [3, 3, 7, 6, false, 64, 68, false, false],
        [3, 3, 8, 6, false, 72, 68, false, false],
    ]
}, {
    name: "Vertical Dolphin",
    category: "water",
    slot3: "GFX06",
    displayTiles: [
        [3, 3, 14, 4, false, 56, 48, false, false],
        [3, 3, 14, 6, false, 56, 64, false, false],
    ]
}, {
    name: "Torpedo Ted",
    category: "water",
    slot3: "GFX06",
    displayTiles: [
        [3, 1, 0, 0, false, 40, 44, false, false],
        [3, 1, 2, 0, false, 56, 44, false, false],
        [3, 1, 0, 2, false, 56, 68, false, false],
        [3, 1, 0, 0, false, 40, 68, false, false],
        [0, 1, 2, 6, false, 72, 44, false, false],
        [0, 1, 4, 6, false, 72, 68, false, false],
        [0, 1, 6, 6, false, 80, 44, false, false],
        [0, 1, 6, 6, false, 80, 68, false, false],
    ]
}, {
    name: "Torpedo Ted Launcher",
    category: "water",
    slot3: "GFX06",
    displayTiles: [
        [3, 1, 0, 0, false, 40, 40, false, false],
        [3, 1, 2, 0, false, 56, 40, false, false],
        [3, 1, 4, 0, false, 48, 30, false, false],
        [3, 1, 0, 2, false, 56, 76, false, false],
        [3, 1, 0, 0, false, 40, 76, false, false],
        [0, 1, 4, 6, false, 72, 76, false, false],
        [0, 1, 6, 6, false, 80, 76, false, false],
        [3, 1, 4, 2, false, 48, 60, false, false],
    ]
}, {
    name: "Blurp",
    category: "water",
    slot3: "GFX06",
    displayTiles: [
        [3, 5, 2, 2, false, 44, 56, false, false],
        [3, 5, 12, 6, false, 68, 56, false, false]
    ]
}, {
    name: "Fugu",
    category: "water",
    slot3: "GFX06",
    displayTiles: [
        [3, 6, 6, 0, false, 28, 48, false, false],
        [3, 6, 6, 2, false, 28, 64, false, false],
        [3, 6, 2, 4, false, 44, 64, false, false],
        [3, 6, 0, 4, false, 44, 48, false, false],
        [3, 6, 6, 0, false, 68, 48, false, false],
        [3, 6, 6, 2, false, 68, 64, false, false],
        [3, 6, 10, 0, false, 84, 64, false, false],
        [3, 6, 0, 4, false, 84, 48, false, false]
    ]
}, {
    name: "Growing Pipe",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 5, 4, 2, false, 48, 56, false, false],
        [3, 5, 6, 2, false, 64, 56, false, false],
    ]
}, {
    name: "Goal Orb",
    category: "mushroom",
    slot3: "GFX05",
    displayTiles: [
        [3, 5, 12, 0, false, 56, 56, true, false],
    ]
}, {
    name: "Monty Mole (Ground)",
    category: "pokey",
    slot3: "GFX09",
    displayTiles: [
        [3, 0, 8, 0, true, 36, 64, false, false],
        [3, 0, 9, 0, true, 44, 64, false, false],
        [3, 0, 6, 0, false, 36, 44, false, false],
        [3, 0, 4, 0, false, 56, 56, false, false],
        [3, 0, 2, 0, false, 76, 56, false, false]
    ]
}, {
    name: "Monty Mole (Ledge)",
    category: "pokey",
    slot3: "GFX09",
    displayTiles: [
        [3, 0, 12, 0, false, 36, 64, false, false],
        [3, 0, 6, 0, false, 36, 44, false, false],
        [3, 0, 2, 0, false, 56, 56, false, false],
        [3, 0, 4, 0, false, 76, 56, false, false],
    ]
}, {
    name: "Ninji",
    category: "mecha",
    slot3: "GFX0E",
    displayTiles: [
        [3, 4, 7, 2, false, 68, 56, false, false],
        [3, 4, 9, 2, false, 44, 56, false, false],
    ]
}, {
    name: "Moving Ghost House Hole",
    category: "ghost",
    slot3: "GFX11",
    displayTiles: [
        [3, 0, 11, 6, false, 40, 56, true, false],
        [3, 0, 10, 6, false, 56, 56, false, false],
        [3, 0, 11, 6, false, 72, 56, false, false],
    ]
}, {
    name: "Checkerboard Platforms",
    category: "platform",
    slot3: "GFX05",
    displayTiles: [
        [3, 0, 10, 6, false, 24, 68, false, false],
        [3, 0, 11, 6, false, 40, 68, false, false],
        [3, 0, 11, 6, false, 56, 68, false, false],
        [3, 0, 11, 6, false, 72, 68, false, false],
        [3, 0, 12, 6, false, 88, 68, false, false],
        [3, 1, 10, 6, false, 24, 48, false, false],
        [3, 1, 11, 6, false, 40, 48, false, false],
        [3, 1, 11, 6, false, 56, 48, false, false],
        [3, 1, 11, 6, false, 72, 48, false, false],
        [3, 1, 12, 6, false, 88, 48, false, false],
    ]
}, {
    name: "Rock Platform",
    category: "platform",
    slot3: "GFX05",
    displayTiles: [
        [3, 1, 5, 0, false, 40, 48, false, false],
        [3, 1, 6, 0, false, 56, 48, false, false],
        [3, 1, 5, 0, false, 72, 48, true, false],
        [3, 1, 8, 0, false, 48, 64, false, false],
        [3, 1, 8, 0, false, 64, 64, true, false],
    ]
}, {
    name: "Sinking Rock Platform",
    category: "platform",
    slot3: "GFX05",
    displayTiles: [
        [3, 1, 5, 0, false, 40, 48, false, false],
        [3, 1, 6, 0, false, 56, 48, false, false],
        [3, 1, 5, 0, false, 72, 48, true, false],
    ]
}, {
    name: "Grey / Brown Platforms (Regular)",
    category: "platform",
    slot2: "GFX13",
    displayTiles: [
        [2, 0, 0, 6, false, 40, 68, false, false],
        [2, 0, 1, 6, false, 56, 68, false, false],
        [2, 0, 2, 6, false, 72, 68, false, false],
        [2, 1, 0, 6, false, 32, 44, false, false],
        [2, 1, 1, 6, false, 48, 44, false, false],
        [2, 1, 1, 6, false, 64, 44, false, false],
        [2, 1, 2, 6, false, 80, 44, false, false],
    ]
}, {
    name: "Grey / Brown Platforms (Castle)",
    category: "platform",
    slot2: "GFX12",
    displayTiles: [
        [2, 0, 0, 6, false, 40, 68, false, false],
        [2, 0, 1, 6, false, 56, 68, false, false],
        [2, 0, 2, 6, false, 72, 68, false, false],
        [2, 1, 0, 6, false, 32, 44, false, false],
        [2, 1, 1, 6, false, 48, 44, false, false],
        [2, 1, 1, 6, false, 64, 44, false, false],
        [2, 1, 2, 6, false, 80, 44, false, false],
    ]
}, {
    name: "Rotating Platforms",
    category: "platform",
    slot2: "GFX13",
    slot3: "GFX05",
    displayTiles: [
        [3, 0, 2, 2, false, 56, 24, false, false],
        [2, 0, 1, 6, false, 48, 20, false, false],
        [2, 0, 1, 6, false, 64, 20, false, false],
        [2, 0, 0, 6, false, 32, 20, false, false],
        [2, 0, 2, 6, false, 80, 20, false, false],
        [3, 0, 2, 2, false, 66, 36, false, false],
        [3, 0, 2, 2, false, 76, 48, false, false],
        [3, 0, 2, 2, false, 86, 60, false, false],
        [3, 0, 2, 2, false, 96, 72, false, false],
        [3, 1, 2, 2, false, 56, 96, false, false],
        [3, 1, 2, 2, false, 48, 82, false, false],
        [3, 1, 2, 2, false, 40, 68, false, false],
        [2, 1, 1, 6, false, 56, 92, false, false],
        [2, 1, 0, 6, false, 40, 92, false, false],
        [2, 1, 2, 6, false, 72, 92, false, false],
    ]
}, {
    name: "Flattened Switch Palace Switch",
    category: "misc",
    slot3: "GFX0D",
    displayTiles: [
        [3, 0, 0, 1, true, 48, 64, false, false],
        [3, 0, 1, 1, true, 56, 64, false, false],
        [3, 0, 1, 1, true, 64, 64, true, false],
        [3, 0, 0, 1, true, 72, 64, true, false],
        [3, 5, 0, 0, true, 48, 56, false, false],
        [3, 5, 1, 0, true, 56, 56, false, false],
        [3, 5, 1, 0, true, 64, 56, true, false],
        [3, 5, 0, 0, true, 72, 56, true, false]
    ]
}, {
    name: "Switch Palace Blocks Message",
    category: "misc",
    slot2: "GFX14",
    displayTiles: [
        [2, 5, 7, 2, true, 72, 56, false, false],
        [2, 5, 7, 2, true, 80, 56, true, false],
        [2, 5, 7, 3, true, 72, 64, false, false],
        [2, 5, 7, 3, true, 80, 64, true, false],
        [2, 5, 13, 2, true, 40, 56, false, false],
        [2, 5, 13, 2, true, 48, 56, true, false],
        [2, 5, 13, 2, true, 40, 64, false, true],
        [2, 5, 13, 2, true, 48, 64, true, true],
    ]
}, {
    name: "Floating Skull Platform",
    category: "cave",
    slot3: "GFX04",
    displayTiles: [
        [3, 1, 0, 6, false, 48, 44, false, false],
        [3, 1, 0, 6, false, 32, 44, false, false],
        [3, 1, 0, 6, false, 64, 44, false, false],
        [3, 1, 0, 6, false, 80, 44, false, false],
        [3, 1, 2, 6, false, 32, 68, false, false],
        [3, 1, 2, 6, false, 48, 68, false, false],
        [3, 1, 2, 6, false, 64, 68, false, false],
        [3, 1, 2, 6, false, 80, 68, false, false],
    ]
}, {
    name: "Rope Mechanism",
    category: "mushroom",
    slot3: "GFX05",
    displayTiles: [
        [3, 3, 0, 4, false, 36, 32, false, false],
        [3, 3, 2, 4, false, 56, 32, false, false],
        [3, 3, 0, 6, false, 76, 32, false, false],
        [3, 0, 14, 4, false, 36, 48, false, false],
        [3, 0, 14, 4, false, 56, 48, false, false],
        [3, 0, 14, 4, false, 76, 48, false, false],
        [3, 0, 14, 4, false, 36, 64, false, false],
        [3, 0, 14, 4, false, 56, 64, false, false],
        [3, 0, 14, 4, false, 76, 64, false, false],
        [3, 0, 14, 4, false, 36, 80, false, false],
        [3, 0, 14, 4, false, 56, 80, false, false],
        [3, 0, 14, 4, false, 76, 80, false, false],
        [3, 0, 14, 5, false, 36, 96, false, false],
        [3, 0, 14, 5, false, 56, 96, false, false],
        [3, 0, 14, 5, false, 76, 96, false, false],
    ]
}, {
    name: "Chainsaw",
    category: "mushroom",
    slot3: "GFX05",
    displayTiles: [
        [3, 1, 14, 2, false, 32, 56, false, false],
        [3, 1, 14, 0, false, 32, 40, false, false],
        [3, 1, 14, 2, false, 56, 60, false, false],
        [3, 1, 14, 0, false, 56, 44, false, false],
        [3, 1, 14, 2, false, 80, 56, false, false],
        [3, 1, 14, 0, false, 80, 40, false, false],
        [3, 3, 0, 4, false, 32, 68, false, false],
        [3, 3, 2, 4, false, 56, 68, false, false],
        [3, 3, 0, 6, false, 80, 68, false, false],
    ]
}, {
    name: "Fuzzy",
    category: "mushroom",
    slot3: "GFX05",
    displayTiles: [
        [3, 2, 8, 4, false, 56, 56, false, false],
    ]
}, {
    name: "Coin Game Cloud",
    category: "generic",
    slot2: "GFX13",
    displayTiles: [
        [0, 0, 0, 6, false, 44, 56, false, false],
        [2, 4, 13, 4, true, 48, 60, false, false],
        [1, 2, 2, 4, false, 68, 56, false, false],
    ]
}, {
    name: "Dino-Rhino",
    category: "dino",
    slot3: "GFX23",
    displayTiles: [
        [3, 7, 0, 4, false, 28, 48, false, false],
        [3, 7, 0, 6, false, 28, 64, false, false],
        [3, 7, 2, 4, false, 44, 48, false, false],
        [3, 7, 2, 6, false, 44, 64, false, false],
        [3, 7, 4, 6, false, 68, 64, false, false],
        [3, 7, 6, 6, false, 84, 64, false, false],
        [3, 7, 0, 4, false, 68, 48, false, false],
        [3, 7, 2, 4, false, 84, 48, false, false],
    ]
}, {
    name: "Dino-Torch",
    category: "dino",
    slot3: "GFX23",
    displayTiles: [
        [3, 4, 0, 0, false, 24, 68, false, false],
        [3, 2, 2, 0, false, 32, 68, false, false],
        [3, 2, 4, 0, false, 44, 68, false, false],
        [3, 2, 6, 0, false, 56, 68, false, false],
        [3, 7, 4, 4, false, 64, 68, false, false],
        [3, 4, 8, 0, false, 84, 28, false, false],
        [3, 2, 10, 0, false, 84, 36, false, false],
        [3, 2, 12, 0, false, 84, 48, false, false],
        [3, 2, 14, 0, false, 84, 60, false, false],
        [3, 7, 6, 4, false, 84, 68, false, false],
        [3, 7, 10, 2, false, 24, 44, false, false],
        [3, 7, 10, 6, false, 44, 44, false, false],
        [3, 7, 12, 2, false, 64, 44, false, false],
    ]
}, {
    name: "Pokey",
    category: "pokey",
    slot3: "GFX09",
    displayTiles: [
        [3, 2, 8, 6, false, 56, 88, false, false],
        [3, 2, 8, 6, false, 54, 72, false, false],
        [3, 2, 8, 6, false, 56, 56, false, false],
        [3, 2, 8, 6, false, 54, 40, false, false],
        [3, 2, 10, 0, false, 56, 24, false, false],
    ]
}, {
    name: "Super Koopa (Ground)",
    category: "pokey",
    slot3: "GFX09",
    displayTiles: [
        [1, 3, 0, 6, false, 8, 44, false, false],
        [3, 2, 8, 4, true, 16, 44, false, false],
        [3, 2, 8, 5, true, 16, 52, false, false],
        [3, 2, 0, 5, true, 24, 52, false, false],
        [1, 3, 2, 6, false, 36, 44, false, false],
        [3, 2, 9, 4, true, 44, 44, false, false],
        [3, 2, 9, 5, true, 44, 52, false, false],
        [3, 2, 0, 4, true, 52, 52, false, false],
        [1, 3, 0, 6, false, 64, 44, false, false],
        [3, 2, 4, 6, true, 72, 40, false, false],
        [3, 2, 5, 6, true, 80, 40, false, false],
        [1, 3, 2, 6, false, 92, 44, false, false],
        [3, 2, 4, 7, true, 100, 40, false, false],
        [3, 2, 5, 7, true, 108, 40, false, false],
        [3, 2, 0, 6, false, 8, 68, false, false],
        [3, 3, 2, 7, true, 24, 76, false, false],
        [3, 4, 4, 6, true, 16, 72, false, false],
        [3, 4, 5, 6, true, 24, 72, false, false],
        [3, 2, 0, 6, false, 36, 68, false, false],
        [3, 3, 2, 7, true, 52, 76, false, false],
        [3, 4, 4, 7, true, 44, 72, false, false],
        [3, 4, 5, 7, true, 52, 72, false, false],
        [1, 3, 15, 4, true, 68, 68, false, false],
        [1, 3, 15, 4, true, 92, 68, false, false],
        [1, 3, 0, 6, false, 68, 68, false, true],
        [1, 3, 0, 6, false, 92, 68, false, true],
        [3, 4, 10, 4, true, 76, 76, false, true],
        [3, 4, 10, 5, true, 76, 68, false, true],
        [3, 4, 11, 4, true, 100, 76, false, true],
        [3, 4, 11, 5, true, 100, 68, false, true],
    ]
}, {
    name: "Super Koopa (Flying)",
    category: "pokey",
    slot3: "GFX09",
    displayTiles: [
        [3, 5, 0, 6, false, 12, 56, false, false],
        [3, 5, 2, 7, true, 28, 64, false, false],
        [3, 4, 4, 6, true, 20, 60, false, false],
        [3, 4, 5, 6, true, 28, 60, false, false],
        [3, 5, 0, 6, false, 40, 56, false, false],
        [3, 5, 2, 7, true, 56, 64, false, false],
        [3, 4, 4, 7, true, 48, 60, false, false],
        [3, 4, 5, 7, true, 56, 60, false, false],
        [1, 5, 15, 4, true, 68, 56, false, false],
        [1, 5, 0, 6, false, 68, 56, false, true],
        [3, 4, 10, 4, true, 76, 64, false, true],
        [3, 4, 10, 5, true, 76, 56, false, true],
        [1, 5, 15, 4, true, 92, 56, false, false],
        [1, 5, 0, 6, false, 92, 56, false, true],
        [3, 4, 11, 4, true, 100, 64, false, true],
        [3, 4, 11, 5, true, 100, 56, false, true],
    ]
}, {
    name: "Firework",
    category: "misc",
    slot2: "GFX24",
    slot3: "GFX22",
    displayTiles: [
        [3, 5, 12, 6, true, 48, 52, false, false],
        [3, 5, 13, 6, true, 56, 52, false, false],
        [3, 5, 14, 0, true, 64, 52, false, false],
        [3, 5, 15, 0, true, 72, 52, false, false],
        [2, 5, 5, 3, true, 48, 68, false, false],
        [3, 5, 7, 4, true, 56, 68, false, false],
        [2, 5, 4, 3, true, 64, 68, false, false],
        [2, 5, 4, 2, true, 72, 68, false, false],
    ]
}, {
    name: "Peach",
    category: "misc",
    slot1: "GFX0D",
    slot2: "GFX24",
    slot3: "GFX22",
    displayTiles: [
        [1, 0, 2, 0, false, 16, 44, false, false],
        [1, 0, 2, 2, false, 16, 60, false, false],
        [1, 0, 3, 0, false, 24, 44, false, false],
        [1, 0, 3, 2, false, 24, 60, false, false],
        [3, 0, 10, 2, false, 40, 60, false, false],
        [2, 0, 8, 6, false, 48, 60, false, false],
        [3, 0, 10, 0, false, 40, 44, false, false],
        [3, 0, 11, 0, false, 48, 44, false, false],
        [3, 0, 10, 2, false, 64, 60, false, false],
        [2, 0, 8, 6, false, 72, 60, false, false],
        [3, 0, 3, 0, false, 64, 44, false, false],
        [3, 0, 4, 0, false, 72, 44, false, false],
        [3, 0, 0, 0, false, 88, 56, false, false],
        [3, 0, 1, 0, false, 96, 56, false, false],
        [3, 0, 10, 0, false, 88, 40, false, false],
        [3, 0, 11, 0, false, 96, 40, false, false],
    ]
}, {
    name: "Peach Ending Cutscene Text",
    category: "misc",
    slot1: "GFX0D",
    displayTiles: [
        [1, 0, 8, 0, true, 32, 36, false, false],
        [1, 0, 9, 0, true, 40, 36, false, false],
        [1, 0, 10, 0, true, 48, 36, false, false],
        [1, 0, 11, 0, true, 56, 36, false, false],
        [1, 0, 12, 0, true, 64, 36, false, false],
        [1, 0, 13, 0, true, 72, 36, false, false],
        [1, 0, 14, 0, true, 80, 36, false, false],
        [1, 0, 8, 1, true, 88, 36, false, false],
        [1, 0, 9, 1, true, 96, 36, false, false],
        [1, 0, 10, 1, true, 104, 36, false, false],
        [1, 0, 11, 1, true, 112, 36, false, false],
        [1, 0, 12, 1, true, 32, 44, false, false],
        [1, 0, 13, 1, true, 40, 44, false, false],
        [1, 0, 14, 1, true, 48, 44, false, false],
        [1, 0, 8, 2, true, 56, 44, false, false],
        [1, 0, 9, 2, true, 64, 44, false, false],
        [1, 0, 10, 2, true, 72, 44, false, false],
        [1, 0, 11, 2, true, 80, 44, false, false],
        [1, 0, 12, 2, true, 88, 44, false, false],
        [1, 0, 13, 2, true, 96, 44, false, false],
        [1, 0, 14, 2, true, 104, 44, false, false],
        [1, 0, 15, 2, true, 112, 44, false, false],
        [1, 0, 8, 3, true, 32, 52, false, false],
        [1, 0, 9, 3, true, 40, 52, false, false],
        [1, 0, 10, 3, true, 48, 52, false, false],
        [1, 0, 11, 3, true, 56, 52, false, false],
        [1, 0, 12, 3, true, 64, 52, false, false],
        [1, 0, 13, 3, true, 72, 52, false, false],
        [1, 0, 14, 3, true, 80, 52, false, false],
        [1, 0, 15, 3, true, 88, 52, false, false],
        [1, 0, 0, 2, true, 96, 52, false, false],
        [1, 0, 1, 2, true, 104, 52, false, false],
        [1, 0, 0, 3, true, 112, 52, false, false],
    ]
}, {
    name: "Yoshi's House Bird",
    category: "misc",
    slot3: "GFX0F",
    displayTiles: [
        [3, 2, 0, 5, true, 52, 52, false, false],
        [3, 3, 1, 5, true, 68, 52, false, false],
        [3, 4, 2, 5, true, 52, 68, false, false],
        [3, 5, 3, 5, true, 68, 68, false, false],
    ]
}, {
    name: "Yoshi's House Fireplace",
    category: "misc",
    slot3: "GFX0F",
    displayTiles: [
        [3, 2, 11, 3, true, 52, 76, false, false],
        [3, 2, 11, 2, true, 52, 68, false, false],
        [3, 2, 10, 1, true, 68, 76, false, false],
        [3, 2, 4, 5, true, 68, 68, false, false],
        [3, 0, 5, 4, false, 48, 44, false, false],
        [3, 0, 5, 4, false, 64, 44, true, false],
    ]
}, {
    name: "Ghost House Exit Door",
    category: "misc",
    slot3: "GFX0F",
    displayTiles: [
        [3, 7, 0, 2, false, 8, 40, true, false],
        [3, 7, 0, 3, false, 8, 48, true, false],
        [3, 7, 0, 3, false, 8, 64, true, true],
        [3, 7, 0, 2, false, 8, 72, true, true],
        [3, 7, 0, 2, false, 24, 40, false, false],
        [3, 7, 0, 3, false, 24, 48, false, false],
        [3, 7, 0, 3, false, 24, 64, false, true],
        [3, 7, 0, 2, false, 24, 72, false, true],
        [3, 7, 3, 2, false, 48, 40, true, false],
        [3, 7, 3, 3, false, 48, 48, true, false],
        [3, 7, 3, 3, false, 48, 64, true, true],
        [3, 7, 3, 2, false, 48, 72, true, true],
        [3, 7, 3, 2, false, 64, 40, false, false],
        [3, 7, 3, 3, false, 64, 48, false, false],
        [3, 7, 3, 3, false, 64, 64, false, true],
        [3, 7, 3, 2, false, 64, 72, false, true],
        [3, 7, 2, 3, false, 88, 48, true, false],
        [3, 7, 2, 3, false, 88, 64, true, true],
        [3, 7, 2, 2, false, 88, 72, true, true],
        [3, 7, 2, 2, false, 88, 40, true, false],
        [3, 7, 2, 3, false, 104, 48, false, false],
        [3, 7, 2, 2, false, 104, 40, false, false],
        [3, 7, 2, 3, false, 104, 64, false, true],
        [3, 7, 2, 2, false, 104, 72, false, true],
    ]
}, {
    name: "Mushroom Platforms",
    category: "mushroom",
    slot3: "GFX05",
    displayTiles: [
        [3, 5, 0, 0, false, 48, 56, false, false],
        [3, 5, 0, 0, false, 64, 56, true, false],
    ]
}, {
    name: "Small Floating Orange Platform",
    category: "platform",
    slot3: "GFX05",
    displayTiles: [
        [3, 5, 11, 4, false, 40, 48, false, false],
        [3, 5, 12, 4, false, 56, 48, true, false],
        [3, 5, 11, 4, false, 72, 48, true, false],
        [3, 5, 4, 6, false, 48, 64, false, false],
        [3, 5, 4, 6, false, 64, 64, true, false]
    ]
}, {
    name: "Large Floating Orange Platform",
    category: "platform",
    slot3: "GFX05",
    displayTiles: [
        [3, 5, 11, 4, false, 24, 48, false, false],
        [3, 5, 11, 4, false, 88, 48, true, false],
        [3, 5, 12, 4, false, 40, 48, true, false],
        [3, 5, 12, 4, false, 56, 48, true, false],
        [3, 5, 12, 4, false, 72, 48, true, false],
        [3, 5, 4, 6, false, 32, 64, false, false],
        [3, 5, 5, 6, false, 48, 64, true, false],
        [3, 5, 5, 6, false, 64, 64, true, false],
        [3, 5, 4, 6, false, 80, 64, true, false]
    ]
}, {
    name: "Volcano Lotus",
    category: "pokey",
    slot3: "GFX09",
    displayTiles: [
        [3, 5, 14, 4, false, 48, 68, false, false],
        [3, 5, 14, 4, false, 64, 68, true, false],
        [3, 4, 2, 6, true, 56, 68, false, false],
        [3, 4, 3, 6, true, 64, 68, false, false],
        [3, 4, 6, 2, true, 52, 40, false, false],
        [3, 4, 6, 3, true, 68, 40, false, false],
        [3, 4, 6, 2, true, 80, 48, false, false],
        [3, 4, 6, 3, true, 40, 48, false, false],
    ]
}, {
    name: "Lightning Bolt",
    category: "pokey",
    slot3: "GFX09",
    displayTiles: [
        [3, 2, 3, 7, true, 48, 56, false, false],
        [3, 2, 3, 7, true, 48, 64, true, true],
        [3, 2, 12, 6, false, 72, 64, false, false],
        [3, 2, 12, 4, false, 72, 48, false, false]
    ]
}, {
    name: "Sumo Bro",
    category: "pokey",
    slot3: "GFX09",
    displayTiles: [
        [3, 2, 3, 4, false, 32, 44, false, false],
        [3, 2, 1, 4, false, 16, 44, false, false],
        [3, 2, 0, 0, false, 30, 36, false, false],
        [3, 2, 5, 4, false, 56, 44, false, false],
        [3, 2, 6, 4, false, 64, 44, false, false],
        [3, 2, 14, 6, false, 60, 36, false, false],
        [3, 2, 10, 2, false, 56, 76, false, false],
        [3, 2, 11, 2, false, 64, 76, false, false],
        [3, 2, 8, 1, true, 60, 68, false, false],
        [3, 2, 9, 1, true, 68, 68, false, false],
        [3, 2, 9, 1, true, 36, 68, false, false],
        [3, 2, 8, 1, true, 28, 68, false, false],
        [3, 2, 8, 2, false, 32, 76, false, false],
        [3, 2, 7, 2, false, 24, 76, false, false],
        [3, 2, 12, 6, false, 88, 76, false, false],
        [3, 2, 12, 4, false, 88, 60, false, false],
        [3, 2, 3, 7, true, 92, 44, true, true],
        [3, 2, 3, 7, true, 92, 36, false, false],
    ]
}, {
    name: "Football",
    category: "cave",
    slot3: "GFX04",
    displayTiles: [
        [3, 0, 10, 0, false, 56, 56, false, false],
    ]
}, {
    name: "Bouncing Rock",
    category: "mushroom",
    slot3: "GFX05",
    displayTiles: [
        [3, 6, 4, 4, false, 44, 56, false, false],
        [3, 6, 6, 4, false, 68, 56, false, false],
    ]
}, {
    name: "Diggin' Chuck",
    category: "chuck",
    slot2: "GFX13",
    slot3: "GFX05",
    displayTiles: [
        [3, 3, 2, 6, false, 12, 56, false, false],
        [2, 5, 8, 2, false, 24, 56, false, false],
        [2, 5, 9, 2, false, 32, 56, false, false],
        [2, 5, 14, 0, false, 26, 48, false, false],
        [3, 5, 7, 6, false, 52, 56, false, false],
        [3, 5, 8, 6, false, 60, 56, false, false],
        [2, 5, 10, 0, false, 56, 48, false, false],
        [3, 3, 0, 2, false, 76, 48, false, false],
        [3, 5, 2, 0, false, 92, 56, false, false],
        [3, 5, 3, 0, false, 100, 56, false, false],
        [2, 5, 10, 0, false, 92, 46, false, false],
        [3, 6, 4, 4, false, 44, 80, false, false],
        [3, 6, 6, 4, false, 68, 80, false, false],
    ]
}, {
    name: "Chargin' Chuck",
    category: "chuck",
    slot2: "GFX13",
    displayTiles: [
        [2, 5, 6, 0, false, 50, 32, false, false],
        [2, 5, 0, 2, false, 52, 44, false, false],
        [2, 5, 1, 2, false, 60, 44, false, false],
        [2, 5, 13, 1, true, 68, 36, false, false],
        [2, 5, 12, 1, true, 60, 36, false, false],
        [2, 5, 6, 0, false, 82, 32, false, false],
        [2, 5, 3, 2, false, 84, 44, false, false],
        [2, 5, 4, 2, false, 92, 44, false, false],
        [2, 5, 12, 1, true, 92, 36, false, false],
        [2, 5, 13, 1, true, 100, 36, false, false],
        [2, 5, 6, 2, false, 52, 76, false, false],
        [2, 5, 6, 2, false, 60, 76, true, false],
        [2, 5, 8, 2, false, 84, 76, false, false],
        [2, 5, 9, 2, false, 92, 76, false, false],
        [2, 5, 6, 0, false, 84, 68, false, false],
        [2, 5, 10, 0, false, 56, 68, false, false],
        [2, 5, 0, 4, false, 20, 40, false, false],
        [2, 5, 0, 4, false, 28, 40, true, false],
        [2, 5, 12, 0, true, 18, 32, false, false],
        [2, 5, 12, 0, true, 38, 32, true, false],
        [2, 5, 14, 0, false, 24, 28, false, false],
        [2, 5, 4, 6, false, 20, 76, false, false],
        [2, 5, 4, 6, false, 28, 76, true, false],
        [2, 5, 14, 0, false, 24, 68, false, false],
    ]
}, {
    name: "Clappin' Chuck",
    category: "chuck",
    slot2: "GFX13",
    displayTiles: [
        [2, 5, 13, 2, false, 20, 60, false, false],
        [2, 5, 13, 2, false, 28, 60, true, false],
        [2, 5, 6, 0, false, 24, 56, false, false],
        [2, 5, 0, 4, false, 52, 60, false, false],
        [2, 5, 0, 4, false, 60, 60, true, false],
        [2, 5, 12, 0, true, 50, 52, false, false],
        [2, 5, 12, 0, true, 70, 52, true, false],
        [2, 5, 6, 0, false, 56, 48, false, false],
        [2, 5, 2, 4, false, 80, 60, false, false],
        [2, 5, 2, 4, false, 96, 60, true, false],
        [2, 5, 4, 4, false, 88, 44, false, false],
    ]
}, {
    name: "Pitchin' Chuck",
    category: "chuck",
    slot2: "GFX13",
    slot3: "GFX09",
    displayTiles: [
        [2, 5, 6, 0, false, 24, 68, false, false],
        [3, 4, 13, 2, true, 26, 84, false, false],
        [2, 5, 14, 4, false, 32, 76, false, false],
        [2, 5, 13, 0, true, 24, 82, false, false],
        [2, 5, 6, 0, false, 54, 66, false, false],
        [3, 5, 14, 2, false, 60, 76, false, false],
        [3, 4, 13, 2, true, 61, 64, false, false],
        [2, 5, 13, 5, true, 61, 68, false, false],
        [2, 5, 6, 0, false, 80, 68, false, false],
        [3, 5, 13, 3, true, 80, 76, false, false],
        [3, 5, 4, 2, false, 88, 76, false, false],
        [2, 5, 6, 0, false, 24, 32, false, false],
        [3, 5, 0, 2, false, 28, 42, false, false],
        [3, 4, 13, 2, true, 34, 28, false, false],
        [2, 5, 13, 5, true, 34, 34, false, false],
        [2, 5, 6, 0, false, 52, 32, false, false],
        [3, 5, 0, 2, false, 56, 42, false, false],
        [3, 4, 13, 2, true, 66, 30, false, false],
        [2, 5, 12, 0, true, 64, 34, true, false],
        [2, 5, 6, 0, false, 80, 32, false, false],
        [3, 5, 2, 2, false, 88, 40, false, false],
        [3, 5, 13, 3, true, 80, 40, false, false],
    ]
}, {
    name: "Kickin' Chuck",
    category: "chuck",
    slot2: "GFX13",
    slot3: "GFX04",
    displayTiles: [
        [2, 5, 6, 0, false, 80, 52, false, false],
        [2, 5, 14, 4, false, 88, 60, false, false],
        [2, 5, 13, 0, true, 80, 66, false, false],
        [2, 5, 6, 0, false, 50, 50, false, false],
        [3, 5, 12, 4, false, 56, 60, false, false],
        [3, 5, 11, 4, true, 48, 64, false, false],
        [0, 0, 12, 7, true, 32, 52, false, false],
        [0, 0, 13, 7, true, 40, 52, false, false],
        [0, 0, 13, 7, true, 32, 60, true, true],
        [0, 0, 12, 7, true, 40, 60, true, true],
        [3, 0, 10, 0, false, 20, 40, false, false],
    ]
}, {
    name: "Whistlin' Chuck",
    category: "chuck",
    slot2: "GFX13",
    displayTiles: [
        [2, 5, 6, 2, false, 20, 56, false, false],
        [2, 5, 6, 2, false, 28, 56, true, false],
        [2, 5, 6, 0, false, 24, 48, false, false],
        [2, 5, 0, 4, false, 52, 56, false, false],
        [2, 5, 0, 4, false, 60, 56, true, false],
        [2, 5, 0, 4, false, 84, 56, false, false],
        [2, 5, 0, 4, false, 92, 56, true, false],
        [2, 5, 12, 0, true, 50, 48, false, false],
        [2, 5, 12, 0, true, 82, 48, false, false],
        [2, 5, 12, 0, true, 70, 48, true, false],
        [2, 5, 12, 0, true, 102, 48, true, false],
        [2, 5, 11, 4, false, 56, 44, false, false],
        [2, 5, 14, 0, false, 88, 44, false, false],
    ]
}, {
    name: "Splittin' / Jumpin' Chucks",
    category: "chuck",
    slot2: "GFX13",
    displayTiles: [
        [2, 5, 13, 2, false, 60, 56, true, false],
        [2, 5, 13, 2, false, 52, 56, false, false],
        [2, 5, 6, 0, false, 56, 52, false, false],
        [2, 5, 6, 2, false, 32, 56, true, false],
        [2, 5, 6, 2, false, 24, 56, false, false],
        [2, 5, 6, 0, false, 28, 48, false, false],
        [2, 5, 0, 4, false, 80, 56, false, false],
        [2, 5, 0, 4, false, 88, 56, true, false],
        [2, 5, 12, 0, true, 78, 48, false, false],
        [2, 5, 12, 0, true, 98, 48, true, false],
        [2, 5, 6, 0, false, 84, 44, false, false],
    ]
}, {
    name: "Amazing Flying Hammer Brother",
    category: "generic",
    slot2: "GFX13",
    displayTiles: [
        [2, 3, 6, 4, false, 48, 60, false, false],
        [2, 3, 8, 4, false, 64, 60, false, false],
        [2, 3, 10, 4, true, 64, 52, false, false],
        [2, 3, 10, 5, true, 56, 52, false, false],
        [2, 3, 13, 6, false, 32, 40, false, false],
        [2, 3, 8, 0, false, 80, 32, false, false],
    ]
}, {
    name: "Bubble",
    category: "forest",
    slot3: "GFX02",
    displayTiles: [
        [3, 3, 0, 2, false, 48, 64, false, true],
        [3, 3, 0, 2, false, 48, 48, false, false],
        [3, 3, 0, 2, false, 64, 48, true, false],
        [3, 3, 0, 2, false, 64, 64, true, true],
        [3, 3, 9, 1, true, 56, 56, false, false],
    ]
}, {
    name: "Banzai Bill",
    category: "banzai",
    slot3: "GFX20",
    displayTiles: [
        [3, 1, 0, 0, false, 28, 32, false, false],
        [3, 1, 2, 0, false, 44, 32, false, false],
        [3, 1, 4, 0, false, 60, 32, false, false],
        [3, 1, 6, 0, false, 76, 32, false, false],
        [3, 1, 0, 2, false, 28, 48, false, false],
        [3, 1, 8, 0, false, 44, 48, false, false],
        [3, 1, 0, 4, false, 28, 64, false, false],
        [3, 1, 2, 4, false, 44, 64, false, false],
        [3, 1, 14, 0, false, 28, 80, false, false],
        [3, 1, 14, 2, false, 44, 80, false, false],
        [3, 1, 14, 4, false, 60, 48, false, false],
        [3, 1, 14, 4, false, 60, 64, false, false],
        [3, 1, 14, 6, false, 76, 48, false, false],
        [3, 1, 14, 6, false, 76, 64, false, false],
        [3, 1, 4, 0, false, 60, 80, false, true],
        [3, 1, 6, 0, false, 76, 80, false, true],
    ]
}, {
    name: "Big Steely",
    category: "mecha",
    slot2: "GFX24",
    displayTiles: [
        [2, 6, 5, 4, false, 40, 40, false, false],
        [2, 6, 7, 4, false, 56, 40, false, false],
        [2, 6, 5, 4, false, 72, 40, true, false],
        [2, 6, 5, 6, false, 40, 56, false, false],
        [2, 6, 6, 6, false, 56, 56, false, false],
        [2, 6, 5, 6, false, 72, 56, true, false],
        [2, 6, 5, 4, false, 72, 72, true, true],
        [2, 6, 7, 4, false, 56, 72, true, true],
        [2, 6, 5, 4, false, 40, 72, false, true],
        [2, 6, 3, 6, false, 48, 48, false, false],
    ]
}, {
    name: "Mechakoopa",
    category: "mecha",
    slot2: "GFX24",
    displayTiles: [
        [2, 5, 0, 4, false, 68, 20, false, false],
        [2, 5, 12, 0, false, 76, 28, false, false],
        [2, 5, 0, 4, false, 36, 20, false, false],
        [2, 5, 10, 0, false, 44, 28, false, false],
        [2, 5, 0, 6, true, 36, 36, false, false],
        [2, 5, 0, 6, true, 68, 36, false, false],
        [2, 5, 2, 4, true, 52, 20, false, false],
        [2, 5, 2, 4, true, 84, 20, false, false],
        [2, 5, 0, 4, false, 36, 52, false, false],
        [2, 5, 0, 4, false, 68, 52, false, false],
        [2, 5, 14, 0, false, 44, 60, false, false],
        [2, 5, 1, 5, false, 76, 60, false, false],
        [2, 5, 0, 6, true, 36, 68, false, false],
        [2, 5, 0, 6, true, 68, 68, false, false],
        [2, 5, 2, 4, true, 52, 52, false, false],
        [2, 5, 2, 4, true, 84, 52, false, false],
        [2, 5, 1, 7, true, 58, 62, false, false],
        [2, 5, 0, 7, true, 90, 60, false, false],
        [2, 5, 2, 7, true, 90, 28, false, false],
        [2, 5, 1, 7, true, 58, 30, false, false],
        [2, 5, 0, 0, false, 36, 88, false, false],
        [2, 5, 1, 0, false, 44, 88, false, false],
        [2, 5, 1, 0, false, 76, 88, false, false],
        [2, 5, 0, 0, false, 68, 88, false, false],
        [2, 5, 0, 7, true, 58, 88, false, false],
        [2, 5, 2, 7, true, 90, 88, false, false],
    ]
}, {
    name: "Spotlight Disco Ball",
    category: "mecha",
    slot3: "GFX0E",
    displayTiles: [
        [3, 6, 0, 0, false, 36, 36, false, false],
        [3, 6, 2, 0, false, 56, 36, false, false],
        [3, 6, 4, 0, false, 76, 36, false, false],
        [3, 6, 6, 0, false, 36, 56, false, false],
        [3, 6, 8, 0, false, 56, 56, false, false],
        [3, 6, 12, 0, false, 76, 56, false, false],
        [3, 6, 0, 4, false, 36, 76, false, false],
        [3, 6, 2, 4, false, 56, 76, false, false]
    ]
}, {
    name: "Sea Mine",
    category: "water",
    slot3: "GFX05",
    displayTiles: [
        [3, 0, 10, 2, false, 28, 48, false, false],
        [3, 0, 10, 2, false, 44, 48, true, false],
        [3, 0, 10, 2, false, 44, 64, true, true],
        [3, 0, 10, 2, false, 28, 64, false, true],
        [3, 0, 12, 2, false, 68, 48, false, false],
        [3, 0, 12, 2, false, 84, 48, true, false],
        [3, 0, 12, 2, false, 84, 64, true, true],
        [3, 0, 12, 2, false, 68, 64, false, true],
    ]
}, {
    name: "Boo",
    category: "ghost",
    slot3: "GFX11",
    displayTiles: [
        [3, 1, 8, 0, false, 44, 56, false, false],
        [3, 1, 12, 0, false, 68, 56, false, false],
    ]
}, {
    name: "Boo Block",
    category: "ghost",
    slot3: "GFX11",
    displayTiles: [
        [3, 1, 8, 0, false, 36, 56, false, false],
        [3, 1, 8, 4, false, 56, 56, false, false],
        [3, 1, 10, 4, false, 76, 56, false, false],
    ]
}, {
    name: "Eerie",
    category: "ghost",
    slot2: "GFX06",
    slot3: "GFX11",
    displayTiles: [
        [2, 6, 10, 6, false, 44, 56, false, false],
        [3, 6, 13, 6, false, 68, 56, false, false],
    ]
}, {
    name: "Fishin' Boo",
    category: "ghost",
    slot2: "GFX06",
    slot3: "GFX11",
    displayTiles: [
        [0, 0, 0, 6, false, 28, 40, false, false],
        [0, 0, 0, 6, false, 44, 40, false, false],
        [0, 0, 0, 6, false, 36, 40, false, false],
        [2, 6, 4, 6, false, 36, 28, false, false],
        [3, 4, 10, 0, false, 22, 30, false, false],
        [3, 6, 12, 2, false, 14, 46, false, false],
        [3, 6, 12, 2, false, 14, 62, false, false],
        [3, 6, 12, 2, false, 14, 78, false, false],
        [3, 3, 12, 4, false, 14, 92, false, false],
        [0, 0, 0, 6, false, 32, 44, true, false],
        [0, 0, 0, 6, false, 40, 44, true, true],
        [0, 0, 0, 6, false, 80, 40, false, false],
        [0, 0, 0, 6, false, 96, 40, false, false],
        [0, 0, 0, 6, false, 88, 40, false, false],
        [2, 6, 4, 6, false, 88, 28, false, false],
        [3, 4, 10, 0, false, 74, 30, false, false],
        [3, 6, 12, 2, false, 66, 46, false, false],
        [3, 6, 12, 2, false, 66, 62, false, false],
        [3, 6, 12, 2, false, 66, 78, false, false],
        [3, 3, 14, 4, false, 66, 92, false, false],
        [0, 0, 0, 6, false, 84, 44, true, false],
        [0, 0, 0, 6, false, 92, 44, true, true],
    ]
}, {
    name: "Big Boo",
    category: "ghost",
    slot3: "GFX11",
    displayTiles: [
        [3, 6, 0, 0, false, 0, 32, false, false],
        [3, 6, 2, 0, false, 16, 32, false, false],
        [3, 6, 4, 0, false, 32, 32, false, false],
        [3, 6, 6, 0, false, 48, 32, false, false],
        [3, 6, 0, 2, false, 0, 48, false, false],
        [3, 6, 2, 2, false, 16, 48, false, false],
        [3, 6, 4, 2, false, 32, 48, false, false],
        [3, 6, 6, 2, false, 48, 48, false, false],
        [3, 6, 0, 2, false, 0, 64, false, true],
        [3, 6, 2, 2, false, 16, 64, false, false],
        [3, 6, 4, 4, false, 32, 64, false, false],
        [3, 6, 6, 4, false, 48, 64, false, false],
        [3, 6, 6, 6, false, 48, 80, false, false],
        [3, 6, 4, 6, false, 32, 80, false, false],
        [3, 6, 0, 0, false, 0, 80, false, true],
        [3, 6, 2, 0, false, 16, 80, false, true],
        [3, 6, 2, 4, false, 8, 52, false, false],
        [3, 6, 2, 6, false, 8, 68, false, false],
        [3, 6, 8, 6, false, 0, 56, true, false],
        [3, 6, 8, 6, false, 16, 56, false, false],
        [3, 6, 8, 6, false, 60, 56, false, false],
        [3, 6, 0, 2, false, 64, 48, false, false],
        [3, 6, 0, 0, false, 64, 32, false, false],
        [3, 6, 2, 0, false, 80, 32, false, false],
        [3, 6, 4, 0, false, 96, 32, false, false],
        [3, 6, 6, 0, false, 112, 32, false, false],
        [3, 6, 6, 2, false, 112, 48, false, false],
        [3, 6, 4, 2, false, 96, 48, false, false],
        [3, 6, 2, 2, false, 80, 48, false, false],
        [3, 6, 2, 2, false, 80, 64, false, false],
        [3, 6, 0, 2, false, 64, 64, false, true],
        [3, 6, 0, 0, false, 64, 80, false, true],
        [3, 6, 2, 0, false, 80, 80, false, true],
        [3, 6, 4, 4, false, 96, 64, false, false],
        [3, 6, 6, 4, false, 112, 64, false, false],
        [3, 6, 6, 6, false, 112, 80, false, false],
        [3, 6, 4, 6, false, 96, 80, false, false],
        [3, 6, 8, 6, false, 96, 56, true, false],
        [3, 6, 0, 4, false, 72, 52, false, false],
        [3, 6, 0, 6, false, 72, 68, false, false],
    ]
}, {
    name: "Boo Buddies",
    category: "ghost",
    slot3: "GFX11",
    displayTiles: [
        [3, 1, 8, 0, false, 32, 56, false, false],
        [3, 1, 12, 0, false, 44, 36, false, false],
        [3, 1, 14, 0, false, 68, 36, false, false],
        [3, 1, 8, 2, false, 80, 56, false, false],
        [3, 1, 14, 2, false, 68, 76, false, false],
        [3, 1, 10, 2, false, 44, 76, false, false],
    ]
}, {
    name: "Large Green Gas Bubble",
    category: "ghost",
    slot3: "GFX11",
    displayTiles: [
        [3, 5, 0, 0, false, 36, 32, false, false],
        [3, 5, 2, 0, false, 52, 32, false, false],
        [3, 5, 4, 0, false, 68, 32, false, false],
        [3, 5, 6, 0, false, 84, 32, false, false],
        [3, 5, 6, 2, false, 84, 48, false, false],
        [3, 5, 6, 2, false, 84, 64, false, true],
        [3, 5, 6, 0, false, 84, 80, false, true],
        [3, 5, 0, 2, false, 36, 48, false, false],
        [3, 5, 2, 2, false, 52, 48, false, false],
        [3, 5, 4, 2, false, 68, 48, false, false],
        [3, 5, 4, 2, false, 68, 64, false, true],
        [3, 5, 4, 0, false, 68, 80, false, true],
        [3, 5, 2, 0, false, 52, 80, false, true],
        [3, 5, 0, 0, false, 36, 80, false, true],
        [3, 5, 2, 2, false, 52, 64, false, false],
        [3, 5, 0, 2, false, 36, 64, false, true],
    ]
}, {
    name: "Rex",
    category: "banzai",
    slot3: "GFX20",
    displayTiles: [
        [3, 3, 10, 0, false, 12, 40, false, false],
        [3, 3, 10, 2, false, 16, 56, false, false],
        [3, 3, 10, 0, false, 32, 40, false, false],
        [3, 3, 12, 2, false, 36, 56, false, false],
        [3, 3, 12, 0, false, 56, 56, false, false],
        [3, 3, 8, 2, false, 76, 56, false, false],
        [3, 3, 2, 2, true, 96, 64, false, false],
        [3, 3, 2, 3, true, 104, 64, false, false],
    ]
}, {
    name: "Mega Mole",
    category: "banzai",
    slot3: "GFX20",
    displayTiles: [
        [3, 0, 6, 4, false, 28, 48, false, false],
        [3, 0, 6, 6, false, 28, 64, false, false],
        [3, 0, 8, 4, false, 44, 48, false, false],
        [3, 0, 8, 6, false, 44, 64, false, false],
        [3, 0, 10, 4, false, 68, 48, false, false],
        [3, 0, 10, 6, false, 68, 64, false, false],
        [3, 0, 12, 4, false, 84, 48, false, false],
        [3, 0, 12, 6, false, 84, 64, false, false]
    ]
}, {
    name: "Diagonal Carrot Platform",
    category: "platform",
    slot3: "GFX20",
    displayTiles: [
        [3, 5, 0, 6, false, 48, 64, false, false],
        [3, 5, 2, 6, false, 64, 64, false, false],
        [3, 5, 4, 6, false, 64, 48, false, false]
    ]
}, {
    name: "Timed Carrot Platform",
    category: "platform",
    slot3: "GFX20",
    displayTiles: [
        [3, 5, 4, 4, false, 28, 44, false, false],
        [3, 5, 4, 4, false, 44, 44, true, false],
        [3, 5, 4, 4, false, 68, 44, false, false],
        [3, 5, 4, 4, false, 84, 44, true, false],
        [3, 5, 4, 4, false, 28, 68, false, false],
        [3, 5, 4, 4, false, 44, 68, true, false],
        [3, 5, 4, 4, false, 68, 68, false, false],
        [3, 5, 4, 4, false, 84, 68, true, false],
        [3, 5, 3, 3, true, 40, 48, false, false],
        [3, 5, 4, 3, true, 80, 48, false, false],
        [3, 5, 5, 3, true, 40, 72, false, false],
        [3, 5, 6, 3, true, 80, 72, false, false]
    ]
}, {
    name: "Swooper Bat",
    category: "cave",
    slot3: "GFX04",
    displayTiles: [
        [3, 5, 14, 2, false, 36, 56, false, false],
        [3, 5, 0, 4, false, 56, 56, false, false],
        [3, 5, 8, 6, false, 76, 56, false, false]
    ]
}, {
    name: "Vertical Bullets",
    category: "mushroom",
    slot3: "GFX05",
    displayTiles: [
        [3, 1, 4, 2, false, 44, 44, false, false],
        [1, 1, 6, 2, false, 68, 44, false, false],
        [3, 1, 4, 2, false, 68, 68, true, true],
        [1, 1, 6, 2, false, 44, 68, true, false]
    ]
}, {
    name: "Diagonal Bullets",
    category: "mushroom",
    slot3: "GFX05",
    displayTiles: [
        [3, 1, 6, 2, false, 68, 68, true, false],
        [3, 1, 6, 2, false, 44, 68, false, false],
        [3, 1, 8, 2, false, 44, 44, true, false],
        [3, 1, 8, 2, false, 68, 44, false, false]
    ]
}, {
    name: "On/Off Switch Bounce Tile",
    category: "particle",
    slot3: "GFX03",
    displayTiles: [
        [3, 3, 10, 0, false, 56, 56, false, false]
    ]
}, {
    name: "Note Block Bounce Tile",
    category: "particle",
    slot2: "GFX13",
    displayTiles: [
        [2, 1, 11, 6, false, 56, 56, false, false]
    ]
}, {
    name: "Pirahna Plant",
    category: "cave",
    slot3: "GFX04",
    displayTiles: [
        [3, 5, 14, 4, false, 44, 48, false, true],
        [1, 4, 14, 2, false, 44, 64, false, true],
        [3, 5, 14, 4, false, 68, 48, false, true],
        [1, 4, 12, 2, false, 68, 64, false, true],
    ]
}, {
    name: "Yoshi Egg",
    category: "generic",
    slot2: "GFX13",
    displayTiles: [
        [2, 5, 2, 0, false, 56, 56, false, false],
        [2, 5, 0, 0, false, 36, 56, false, false],
        [2, 0, 15, 6, true, 76, 52, false, false],
        [2, 0, 15, 6, true, 80, 64, true, false],
        [2, 0, 15, 6, true, 92, 52, true, false],
        [2, 0, 15, 6, true, 88, 64, false, false],
    ]
}, {
    name: "Spike Top",
    category: "cave",
    slot3: "GFX04",
    displayTiles: [
        [3, 4, 12, 0, false, 56, 28, false, false],
        [3, 4, 10, 2, false, 84, 56, false, false],
        [3, 4, 8, 2, false, 28, 56, true, true],
        [3, 4, 12, 6, false, 56, 84, true, true],
        [3, 4, 14, 0, false, 76, 36, false, false],
        [3, 4, 14, 0, false, 36, 76, true, true],
        [3, 4, 12, 2, false, 76, 76, true, false],
        [3, 4, 12, 2, false, 36, 36, false, true],
    ]
}, {
    name: "Buzzy Beetle",
    category: "cave",
    slot3: "GFX04",
    displayTiles: [
        [3, 6, 6, 0, false, 56, 68, false, false],
        [3, 6, 4, 0, false, 36, 68, false, false],
        [3, 6, 8, 0, false, 76, 68, false, false],
        [3, 6, 0, 0, false, 44, 48, false, false],
        [3, 6, 2, 0, false, 68, 48, false, false],
    ]
}, {
    name: "Blargg",
    category: "cave",
    slot3: "GFX04",
    displayTiles: [
        [3, 2, 2, 2, false, 28, 48, false, false],
        [3, 2, 4, 2, false, 44, 48, false, false],
        [3, 2, 2, 4, false, 28, 64, false, false],
        [3, 2, 4, 4, false, 44, 64, false, false],
        [3, 2, 6, 2, false, 60, 64, false, false],
        [3, 2, 6, 6, false, 76, 64, false, false],
        [3, 2, 8, 4, false, 92, 64, false, false],
        [3, 2, 6, 2, false, 108, 64, false, false],
        [3, 2, 4, 2, false, 92, 48, false, false],
        [3, 2, 2, 2, false, 76, 48, false, false],
        [3, 2, 0, 2, false, 8, 64, false, false],
    ]
}, {
    name: "Reznor",
    category: "boss",
    slot2: "GFX25",
    displayTiles: [
        [2, 7, 0, 4, false, 48, 36, false, false],
        [2, 7, 2, 4, false, 64, 36, false, false],
        [2, 7, 0, 6, false, 48, 52, false, false],
        [2, 7, 2, 6, false, 64, 52, false, false],
        [2, 1, 14, 4, false, 48, 68, false, false],
        [2, 1, 14, 4, false, 64, 68, true, false],
        [2, 1, 14, 4, false, 28, 68, true, false],
        [2, 1, 14, 4, false, 12, 68, false, false],
        [2, 1, 14, 4, false, 84, 68, false, false],
        [2, 1, 14, 4, false, 100, 68, true, false],
        [2, 7, 8, 2, false, 84, 36, false, false],
        [2, 7, 8, 2, false, 100, 36, true, false],
        [2, 7, 8, 4, false, 84, 52, false, false],
        [2, 7, 8, 4, false, 100, 52, true, false],
        [2, 7, 4, 6, false, 12, 52, false, false],
        [2, 7, 6, 6, false, 28, 52, false, false],
        [2, 7, 4, 4, false, 12, 36, false, false],
        [2, 7, 6, 4, false, 28, 36, false, false],
    ]
}, {
    name: "Wendy",
    category: "boss",
    slot2: "GFX0A",
    displayTiles: [
        [2, 4, 8, 2, false, 24, 12, false, false],
        [2, 4, 0, 4, false, 16, 4, false, false],
        [2, 4, 2, 4, true, 32, 4, false, false],
        [2, 4, 10, 4, false, 48, 4, false, false],
        [2, 4, 8, 2, false, 56, 12, false, false],
        [2, 4, 0, 2, false, 48, 44, false, false],
        [2, 4, 0, 2, false, 64, 44, true, false],
        [2, 4, 6, 4, false, 56, 40, false, false],
        [2, 4, 2, 5, true, 56, 32, false, false],
        [2, 4, 2, 5, true, 64, 32, false, false],
        [2, 4, 0, 2, false, 84, 12, false, false],
        [2, 4, 0, 2, false, 100, 12, true, false],
        [2, 4, 4, 4, false, 92, 8, false, false],
        [2, 4, 2, 5, true, 92, 0, false, false],
        [2, 4, 2, 5, true, 100, 0, false, false],
        [2, 4, 0, 2, false, 28, 44, true, false],
        [2, 4, 0, 2, false, 12, 44, false, false],
        [2, 4, 12, 4, false, 20, 40, false, false],
        [2, 4, 14, 1, true, 20, 32, false, false],
        [2, 4, 15, 1, true, 28, 32, false, false],
        [2, 4, 2, 2, false, 84, 44, false, false],
        [2, 4, 2, 2, false, 100, 44, true, false],
        [2, 4, 4, 4, false, 92, 40, false, false],
        [2, 4, 3, 0, true, 96, 54, false, false],
        [2, 4, 2, 5, true, 92, 32, false, false],
        [2, 4, 2, 5, true, 100, 32, false, false],
        [2, 4, 10, 2, false, 12, 68, false, false],
        [2, 4, 10, 2, false, 28, 68, true, false],
        [2, 4, 12, 2, false, 48, 68, false, false],
        [2, 4, 12, 2, false, 64, 68, true, false],
        [2, 2, 2, 6, false, 84, 68, false, false],
        [2, 2, 2, 6, false, 100, 68, true, false],
        [2, 2, 10, 6, false, 92, 66, false, false],
        [2, 2, 14, 4, false, 84, 100, false, false],
        [2, 2, 14, 4, false, 100, 100, true, false],
        [2, 2, 6, 6, false, 92, 96, false, false],
        [2, 2, 8, 6, true, 92, 88, false, false],
        [2, 2, 8, 6, true, 100, 88, true, false],
        [2, 4, 14, 2, false, 12, 92, false, false],
        [2, 4, 14, 2, false, 28, 92, true, false],
        [2, 4, 4, 2, false, 12, 108, false, false],
        [2, 4, 4, 2, false, 28, 108, true, false],
        [2, 4, 8, 4, false, 20, 88, false, false],
        [2, 4, 0, 2, false, 48, 92, false, false],
        [2, 4, 0, 2, false, 64, 92, true, false],
        [2, 4, 6, 2, false, 48, 108, false, false],
        [2, 4, 6, 2, false, 64, 108, true, false],
        [2, 4, 8, 4, false, 56, 88, false, false]
    ]
}, {
    name: "Lemmy",
    category: "boss",
    slot2: "GFX0A",
    displayTiles: [
        [2, 2, 8, 2, false, 24, 16, false, false],
        [2, 2, 0, 0, false, 16, 8, false, false],
        [2, 2, 2, 0, true, 24, 0, false, false],
        [2, 2, 8, 2, false, 56, 16, false, false],
        [2, 2, 10, 0, false, 48, 8, false, false],
        [2, 2, 3, 1, true, 64, 8, false, false],
        [2, 2, 0, 2, false, 84, 16, false, false],
        [2, 2, 0, 2, false, 100, 16, true, false],
        [2, 2, 4, 0, false, 92, 12, false, false],
        [2, 2, 2, 1, true, 92, 4, false, false],
        [2, 2, 2, 1, true, 100, 4, true, false],
        [2, 2, 0, 2, false, 12, 44, false, false],
        [2, 2, 0, 2, false, 28, 44, true, false],
        [2, 2, 0, 2, false, 48, 44, false, false],
        [2, 2, 0, 2, false, 64, 44, true, false],
        [2, 2, 12, 0, false, 20, 40, false, false],
        [2, 2, 14, 0, true, 20, 32, false, false],
        [2, 2, 15, 0, true, 28, 32, false, false],
        [2, 2, 6, 0, false, 56, 40, false, false],
        [2, 2, 2, 1, true, 56, 32, false, false],
        [2, 2, 2, 1, true, 64, 32, true, false],
        [2, 2, 2, 2, false, 84, 44, false, false],
        [2, 2, 2, 2, false, 100, 44, true, false],
        [2, 2, 6, 0, false, 92, 40, true, false],
        [2, 2, 2, 1, true, 92, 32, false, false],
        [2, 2, 2, 1, true, 100, 32, true, false],
        [2, 2, 3, 0, true, 96, 54, false, false],
        [2, 2, 10, 2, false, 12, 64, false, false],
        [2, 2, 10, 2, false, 28, 64, true, false],
        [2, 2, 12, 2, false, 48, 64, false, false],
        [2, 2, 12, 2, false, 64, 64, true, false],
        [2, 2, 2, 6, false, 84, 64, false, false],
        [2, 2, 2, 6, false, 100, 64, true, false],
        [2, 3, 4, 6, false, 92, 62, false, false],
        [2, 2, 14, 2, false, 12, 92, false, false],
        [2, 2, 14, 2, false, 28, 92, true, false],
        [2, 2, 4, 2, false, 12, 108, false, false],
        [2, 2, 4, 2, false, 28, 108, true, false],
        [2, 2, 8, 0, false, 20, 88, false, false],
        [2, 2, 0, 2, false, 48, 92, false, false],
        [2, 2, 0, 2, false, 64, 92, true, false],
        [2, 2, 6, 2, false, 48, 108, false, false],
        [2, 2, 6, 2, false, 64, 108, true, false],
        [2, 2, 8, 0, false, 56, 88, false, false],
        [2, 2, 14, 4, false, 84, 96, false, false],
        [2, 2, 14, 4, false, 100, 96, true, false],
        [2, 3, 0, 6, false, 92, 92, false, false],
        [2, 3, 3, 4, true, 92, 84, false, false],
        [2, 3, 3, 4, true, 100, 84, true, false]

    ]
}]

// create minimised list of used tiles
for (let i = 0; i < allSprites.length; i++) {
    const sprite = allSprites[i]
    sprite.tiles = []
    for (let j = 0; j < sprite.displayTiles.length; j++) {
        const [slot, pal, x, y, is8x8] = sprite.displayTiles[j];
        const gfx = sprite[`slot${slot}`]
        if (gfx) {
            const index = x + y * 16 + slot * 128
            sprite.tiles[index] = [index, gfx]
            if (!is8x8) {
                sprite.tiles[index + 1] = [index + 1, gfx]
                sprite.tiles[index + 16] = [index + 16, gfx]
                sprite.tiles[index + 17] = [index + 17, gfx]
            }
        }
    }
    sprite.tiles = sprite.tiles.filter(Boolean);
}

//  ==============================================================

const gfxScale = 2;
const spriteScale = 3;

let activePaletteIndex = 0;
const allGfx = {};
const gfxSlots = ["GFX00", "GFX01", "GFX13", "GFX02"]
const gfxBitmaps = {}
const gfxPixels = {}

let selectedSprites = []
let selectedTiles = []
let currentSprite
let tooltipTimeout

let gfxCtx, spriteCtx, tooltipCanvas
let selectedTile = -1
let selected8x8 = true
let selectedXFlip = false
let selectedYFlip = false
let mouseX, mouseY

//  ==============================================================

window.onload = async function () {
    const gfxCanvas = document.getElementById("gfxCanvas");
    gfxCanvas.setAttribute("width", 128 * gfxScale)
    gfxCanvas.setAttribute("height", 256 * gfxScale)
    gfxCtx = gfxCanvas.getContext("2d");
    // gfxCanvas.onclick = function (e) {
    //     let x, y
    //     if (e.ctrlKey) {
    //         x = Math.floor(e.offsetX / (8 * gfxScale))
    //         y = Math.floor(e.offsetY / (8 * gfxScale))
    //         selected8x8 = true
    //     } else {
    //         x = Math.floor(e.offsetX / (8 * gfxScale) - 0.5)
    //         y = Math.floor(e.offsetY / (8 * gfxScale) - 0.5)
    //         selected8x8 = false
    //     }
    //     selectedTile = x + y * 16
    //     selectedXFlip = false
    //     selectedYFlip = false
    //     renderGfxCanvas();
    //     e.preventDefault();
    // }
    // gfxCanvas.onmousemove = function (e) {
    //     renderGfxCanvas();
    //     let x, y
    //     if (e.ctrlKey) {
    //         x = Math.floor(e.offsetX / (8 * gfxScale))
    //         y = Math.floor(e.offsetY / (8 * gfxScale))
    //     } else {
    //         x = Math.floor(e.offsetX / (8 * gfxScale) - 0.5)
    //         y = Math.floor(e.offsetY / (8 * gfxScale) - 0.5)
    //     }
    //     gfxCtx.beginPath()
    //     gfxCtx.lineWidth = 1;
    //     gfxCtx.strokeStyle = 'white';
    //     if (e.ctrlKey) {
    //         gfxCtx.rect(x * 8, y * 8, 8, 8);
    //     } else {
    //         gfxCtx.rect(x * 8, y * 8, 16, 16);
    //     }
    //     gfxCtx.stroke();
    // }
    // gfxCanvas.onmouseleave = function (e) {
    //     renderGfxCanvas();
    // }
    gfxCanvas.onwheel = function (e) {
        if (e.deltaY > 0) {
            activePaletteIndex += 1
        } else {
            activePaletteIndex -= 1
        }
        if (activePaletteIndex < 0) {
            activePaletteIndex = 0
        }
        if (activePaletteIndex > 7) {
            activePaletteIndex = 7
        }
        document.getElementById("paletteSelect").value = activePaletteIndex
        e.preventDefault()
        renderGfxCanvas()
        renderTooltipCanvas()
    }

    tooltipCanvas = document.getElementById("tooltipCanvas");
    tooltipCanvas.setAttribute("width", 128 * spriteScale)
    tooltipCanvas.setAttribute("height", 128 * spriteScale)
    spriteCtx = tooltipCanvas.getContext("2d");
    // tooltipCanvas.onclick = function (e) {
    //     if (selectedTile > -1) {
    //         let x, y
    //         if (selected8x8) {
    //             x = Math.floor(e.offsetX / spriteScale - 4)
    //             y = Math.floor(e.offsetY / spriteScale - 4)
    //         } else {
    //             x = Math.floor(e.offsetX / spriteScale - 8)
    //             y = Math.floor(e.offsetY / spriteScale - 8)
    //         }
    //         if (e.shiftKey) {
    //             x = Math.floor(x / 2 + 0.5) * 2
    //             y = Math.floor(y / 2 + 0.5) * 2
    //         } else {
    //             x = Math.floor(x / 4 + 0.5) * 4
    //             y = Math.floor(y / 4 + 0.5) * 4
    //         }

    //         currentSprite.displayTiles.push([
    //             Math.floor(selectedTile / 128),
    //             activePaletteIndex,
    //             selectedTile % 16,
    //             Math.floor(selectedTile / 16) % 8,
    //             selected8x8,
    //             x,
    //             y,
    //             selectedXFlip,
    //             selectedYFlip
    //         ])
    //     }
    //     renderTooltipCanvas();
    //     e.preventDefault();
    // }
    // tooltipCanvas.onmousemove = function (e) {
    //     if (selected8x8) {
    //         mouseX = Math.floor(e.offsetX / spriteScale - 4)
    //         mouseY = Math.floor(e.offsetY / spriteScale - 4)
    //     } else {
    //         mouseX = Math.floor(e.offsetX / spriteScale - 8)
    //         mouseY = Math.floor(e.offsetY / spriteScale - 8)
    //     }
    //     if (e.shiftKey) {
    //         mouseX = Math.floor(mouseX / 2 + 0.5) * 2
    //         mouseY = Math.floor(mouseY / 2 + 0.5) * 2
    //     } else {
    //         mouseX = Math.floor(mouseX / 4 + 0.5) * 4
    //         mouseY = Math.floor(mouseY / 4 + 0.5) * 4
    //     }
    //     renderTooltipCanvas();
    // }
    // tooltipCanvas.onmouseleave = function (e) {
    //     mouseX = -999
    //     mouseY = -999
    //     renderTooltipCanvas();
    // }
    // tooltipCanvas.onwheel = function (e) {
    //     if (selectedXFlip == selectedYFlip == e.deltaY > 0) {
    //         selectedXFlip = !selectedXFlip
    //     } else {
    //         selectedYFlip = !selectedYFlip
    //     }
    //     e.preventDefault()
    //     renderTooltipCanvas()
    // }

    document.getElementById("clearAllButton").onclick = function (e) {
        selectedSprites = []
        updateGFX()
    }

    document.getElementById("randButton").onclick = function (e) {
        const remainingSprites = allSprites.filter(({ category }) => category !== "misc")

        for (let i = 0; i < selectedSprites.length; i++) {
            const sprite = selectedSprites[i];
            remainingSprites.splice(remainingSprites.findIndex(x => x == sprite), 1)
        }

        while (remainingSprites.length > 0) {
            for (let i = remainingSprites.length - 1; i >= 0; i--) {
                const sprite = remainingSprites[i];
                for (let j = 0; j < sprite.tiles.length; j++) {
                    const [index, gfx] = sprite.tiles[j];
                    if (selectedTiles[index] && selectedTiles[index] !== gfx) {
                        remainingSprites.splice(i, 1)
                        break;
                    }
                }
            }

            if (remainingSprites.length > 0) {
                const index = Math.floor(Math.random() * remainingSprites.length)
                selectedSprites.push(remainingSprites[index])
                remainingSprites.splice(index, 1)
                updateGFX()
            } else {
                return
            }
        }
    }

    document.getElementById("download2Button").onclick = () => downloadGfx(2);
    document.getElementById("download3Button").onclick = () => downloadGfx(3);

    const spriteTemplate = document.getElementById("spriteTemplate");
    allSprites.sort((a, b) => a.name > b.name ? 1 : -1)
    for (let i = 0; i < allSprites.length; i++) {
        const sprite = allSprites[i];
        const clone = spriteTemplate.cloneNode(true)
        clone.setAttribute('id', i)
        clone.innerText = sprite.name
        sprite.el = clone
        clone.onmouseenter = function (e) {
            currentSprite = allSprites[this.id];
            updateGFX();

            clearTimeout(tooltipTimeout)
            tooltipCanvas.hidden = false;
            const rect = this.getBoundingClientRect()
            let x = (rect.left + rect.right - tooltipCanvas.clientWidth) / 2
            let y = rect.top - tooltipCanvas.clientHeight - 8
            x = Math.min(x, window.innerWidth - tooltipCanvas.clientWidth - 12)
            x = Math.max(x, 12)
            if (y < 12) {
                y = rect.bottom + 8
            }
            tooltipCanvas.style.left = x + window.scrollX
            tooltipCanvas.style.top = y + window.scrollY
        }
        clone.onmouseleave = function (e) {
            tooltipTimeout = setTimeout(() => {
                tooltipCanvas.hidden = true;
                currentSprite = null;
                updateGFX();
            }, 50)
        }
        clone.onclick = function (e) {
            const spriteTiles = sprite.tiles;
            let allConflict = true
            for (let j = 0; j < sprite.tiles.length; j++) {
                const [index, gfx] = spriteTiles[j];
                if (!selectedTiles[index] || selectedTiles[index] === gfx) {
                    allConflict = false
                }
            }
            if (!allConflict) {
                const index = selectedSprites.findIndex(x => x === sprite);
                if (index > -1) {
                    selectedSprites.splice(index, 1)
                } else {
                    selectedSprites.push(sprite);
                }
            }
            updateGFX();
            e.preventDefault();
        }
        let category = document.getElementById(sprite.category)
        if (!category) {
            category = document.getElementById("misc")
        }
        category.appendChild(clone)
    }
    spriteTemplate.remove()


    // document.getElementById("undoButton").onclick = undo
    // document.onkeydown = function (e) {
    //     switch (e.key) {
    //         case "z":
    //             if (e.ctrlKey) undo()
    //             break;
    //         case "ArrowLeft":
    //             selectedSprite.displayTiles.forEach((step) => { step[5] -= 4 })
    //             renderTooltipCanvas()
    //             e.preventDefault()
    //             break;
    //         case "ArrowRight":
    //             selectedSprite.displayTiles.forEach((step) => { step[5] += 4 })
    //             renderTooltipCanvas()
    //             e.preventDefault()
    //             break;
    //         case "ArrowUp":
    //             selectedSprite.displayTiles.forEach((step) => { step[6] -= 4 })
    //             renderTooltipCanvas()
    //             e.preventDefault()
    //             break;
    //         case "ArrowDown":
    //             selectedSprite.displayTiles.forEach((step) => { step[6] += 4 })
    //             renderTooltipCanvas()
    //             e.preventDefault()
    //             break;
    //         default:
    //     }

    // }

    // document.getElementById("copyButton").onclick = function (e) {
    //     unsecuredCopyToClipboard(`\n${selectedSprite.displayTiles.map(step => `[${step.join(', ')}]`).join(',\n')}\n`)
    // }

    // populate palette select
    // const paletteSelect = document.getElementById("paletteSelect")
    // for (let i = 0; i < hexPalettes.length; i++) {
    //     const option = new Option(`Palette ${i}`, i)
    //     paletteSelect.appendChild(option)
    // }
    // paletteSelect.onchange = function (e) {
    //     activePaletteIndex = +(e.target.value)
    //     renderGfxCanvas()
    //     renderTooltipCanvas()
    // }

    // // populate sprite select
    // const spriteSelect = document.getElementById("spriteSelect")
    // for (let i = 0; i < allSprites.length; i++) {
    //     const option = new Option(allSprites[i].name, i)
    //     spriteSelect.appendChild(option)
    // }
    // spriteSelect.value = allSprites.length - 1
    // spriteSelect.onchange = function (e) {
    //     selectedSprite = allSprites[+(e.target.value)]
    //     renderTooltipCanvas()
    // }

    // // populate gfx select
    // const gfxSelects = [
    //     document.getElementById("gfx0Select"),
    //     document.getElementById("gfx1Select"),
    //     document.getElementById("gfx2Select"),
    //     document.getElementById("gfx3Select")
    // ]
    // for (let i = 0; i < gfxSelects.length; i++) {
    //     const select = gfxSelects[i];

    //     for (let j = 0; j < gfxFileNames.length; j++) {
    //         select.appendChild(new Option(gfxFileNames[j], gfxFileNames[j]));
    //     }
    //     select.value = gfxSlots[i];
    //     select.onchange = async function (e) {
    //         gfxSlots[i] = e.target.value;
    //         renderGfxCanvas()
    //         renderTooltipCanvas()
    //     }
    // }

    // import GFX files
    for (let i = 0; i < gfxFileNames.length; i++) {
        const blob = await fetch(`gfx/${gfxFileNames[i]}.bin`);
        await loadGfxFile(blob, gfxFileNames[i]);
    };

    renderGfxCanvas()
    renderTooltipCanvas()
};

function loadGfxFile(blob, gfx) {
    return new Promise(async (resolve) => {
        const arrayBuffer = await blob.arrayBuffer()
        const snesBytes = new Int8Array(arrayBuffer);

        const pixels = snesToPixels(snesBytes);

        gfxPixels[gfx] = pixels
        gfxBitmaps[gfx] = []

        for (let i = 0; i < 8; i++) {
            gfxBitmaps[gfx][i] = await createBitmap(pixels, i)
        }

        resolve()
    })
}

async function createBitmap(pixels, palette) {
    return new Promise((resolve) => {
        const pal = rgbaPalettes[palette]
        const colorData = pixels.map((index) => (pal[index])).flat()
        const uintColorData = new Uint8ClampedArray(colorData)
        const imageData = new ImageData(uintColorData, 128)
        // save to slot
        createImageBitmap(imageData).then((bitmap) => resolve(bitmap))
    })
}

function renderGfxCanvas() {
    gfxCtx.reset()
    gfxCtx.resetTransform()
    gfxCtx.scale(gfxScale, gfxScale)
    gfxCtx.imageSmoothingEnabled = false;

    for (let i = 0; i < 2; i++) {
        const bitmap = gfxBitmaps[gfxSlots[i]][activePaletteIndex];
        if (bitmap) {
            gfxCtx.drawImage(bitmap, 0, i * 64)
        }
    }

    for (let i = 0; i < 512; i++) {
        const tile = selectedTiles[i];
        if (tile) {
            const x = i % 16
            const y = Math.floor(i / 16)
            const bitmap = gfxBitmaps[tile][activePaletteIndex];
            gfxCtx.drawImage(bitmap, x * 8, (y % 8) * 8, 8, 8, x * 8, y * 8, 8, 8)
        }
    }

    gfxCtx.beginPath()
    gfxCtx.lineWidth = 1;
    gfxCtx.strokeStyle = "white";
    if (selectedTile > -1) {
        const x = selectedTile % 16
        const y = Math.floor(selectedTile / 16)
        if (selected8x8) {
            gfxCtx.rect(x * 8, y * 8, 8, 8);
        } else {
            gfxCtx.rect(x * 8, y * 8, 16, 16);
        }
        gfxCtx.stroke();
    }
}

function renderTooltipCanvas() {
    if (currentSprite) {
        let top, left, right, bottom
        for (let i = 0; i < currentSprite.displayTiles.length; i++) {
            const [slot, palette, tx, ty, is8x8, x, y] = currentSprite.displayTiles[i]
            if (left == undefined || x < left) {
                left = x
            }
            if (right == undefined || x + (is8x8 ? 8 : 16) > right) {
                right = x + (is8x8 ? 8 : 16)
            }
            if (top == undefined || y < top) {
                top = y
            }
            if (bottom == undefined || y + (is8x8 ? 8 : 16) > bottom) {
                bottom = y + (is8x8 ? 8 : 16)
            }
        }
        tooltipCanvas.width = (right - left) * spriteScale
        tooltipCanvas.height = (bottom - top) * spriteScale

        spriteCtx.reset()
        spriteCtx.resetTransform()
        spriteCtx.imageSmoothingEnabled = false;
        spriteCtx.scale(spriteScale, spriteScale)
        spriteCtx.translate(-left, -top)



        for (let i = 0; i < currentSprite.displayTiles.length; i++) {
            const [slot, palette, tx, ty, is8x8, x, y, xFlip, yFlip] = currentSprite.displayTiles[i]
            const preferredGfx = [currentSprite.slot0, currentSprite.slot1, currentSprite.slot2, currentSprite.slot3]
            const size = is8x8 ? 8 : 16
            // const bitmap = gfxBitmaps[preferredGfx[slot] ?? gfxSlots[slot]][palette];
            const xScale = xFlip ? -1 : 1
            const yScale = yFlip ? -1 : 1

            spriteCtx.save();

            if (is8x8) {
                spriteCtx.translate(x, y);
                spriteCtx.scale(xScale, yScale);
                spriteCtx.translate(-x, - y);
            } else {
                spriteCtx.translate(x + 4, y + 4);
                spriteCtx.scale(xScale, yScale);
                spriteCtx.translate(-x - 4, - y - 4);
            }

            // spriteCtx.drawImage(bitmap, tx * 8, ty * 8 + slot * 128, size, size, x, y, size * xScale, size * yScale);

            const tileIndex = tx + ty * 16 + slot * 128
            let bitmap = gfxBitmaps[selectedTiles[tileIndex] ?? preferredGfx[slot] ?? gfxSlots[slot]][palette];
            spriteCtx.drawImage(bitmap, tx * 8, ty * 8, 8, 8, x, y, 8 * xScale, 8 * yScale)
            if (!is8x8) {
                bitmap = gfxBitmaps[selectedTiles[tileIndex + 1] ?? preferredGfx[slot] ?? gfxSlots[slot]][palette];
                spriteCtx.drawImage(bitmap, tx * 8 + 8, ty * 8, 8, 8, x + 8, y, 8 * xScale, 8 * yScale)
                bitmap = gfxBitmaps[selectedTiles[tileIndex + 16] ?? preferredGfx[slot] ?? gfxSlots[slot]][palette];
                spriteCtx.drawImage(bitmap, tx * 8, ty * 8 + 8, 8, 8, x, y + 8, 8 * xScale, 8 * yScale)
                bitmap = gfxBitmaps[selectedTiles[tileIndex + 17] ?? preferredGfx[slot] ?? gfxSlots[slot]][palette];
                spriteCtx.drawImage(bitmap, tx * 8 + 8, ty * 8 + 8, 8, 8, x + 8, y + 8, 8 * xScale, 8 * yScale)
            }

            spriteCtx.restore();
        }
    }
}

function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
}

function undo() {
    if (currentSprite && currentSprite.displayTiles.length > 0) {
        currentSprite.displayTiles.pop()
        renderTooltipCanvas()
    }
}

function updateGFX() {
    selectedTiles = []

    let conflicts = false
    const spriteListElements = []
    const listElementTemplate = document.getElementById("listTemplate");

    for (let i = 0; i < selectedSprites.length; i++) {
        const spriteTiles = selectedSprites[i].tiles;
        let conflict = false
        for (let j = 0; j < spriteTiles.length; j++) {
            const [index, gfx] = spriteTiles[j];
            if (!selectedTiles[index]) {
                selectedTiles[index] = gfx
            } else if (selectedTiles[index] != gfx) {
                conflict = true
                conflicts = true
            }
        }

        const clone = listElementTemplate.cloneNode()
        clone.removeAttribute("id")
        clone.hidden = false
        clone.innerText = selectedSprites[i].name
        if (conflict) {
            clone.classList.add("conflict")
        }
        clone.onclick = function (e) {
            selectedSprites.splice(i, 1)
            updateGFX()
        }
        spriteListElements.push(clone)
    }

    document.getElementById("selectedList").replaceChildren(...spriteListElements)

    for (let i = 0; i < allSprites.length; i++) {
        const sprite = allSprites[i]
        let someConflict = false
        let allConflict = true
        for (let j = 0; j < sprite.tiles.length; j++) {
            const [index, gfx] = sprite.tiles[j];
            if (selectedTiles[index] && selectedTiles[index] != gfx) {
                someConflict = true;
            } else {
                allConflict = false
            }
        }

        sprite.el.classList.toggle('selected', selectedSprites.includes(sprite));
        sprite.el.classList.toggle('conflict', someConflict && !allConflict);
        sprite.el.classList.toggle('disabled', allConflict);
    }

    const slotEmpty = [true, true, true, true]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 128; j++) {
            if (selectedTiles[i * 128 + j]) {
                slotEmpty[i] = false
                break;
            }
        }
    }
    document.getElementById("download2Button").classList.toggle('disabled', slotEmpty[2]);
    document.getElementById("download3Button").classList.toggle('disabled', slotEmpty[3]);

    if (currentSprite) {
        for (let j = 0; j < currentSprite.tiles.length; j++) {
            const [index, gfx] = currentSprite.tiles[j];
            if (!selectedTiles[index]) {
                selectedTiles[index] = gfx
            }
        }
    }

    const remainingSprites = allSprites.filter(({ category }) => category !== "misc")

    for (let i = 0; i < selectedSprites.length; i++) {
        const sprite = selectedSprites[i];
        remainingSprites.splice(remainingSprites.findIndex(x => x == sprite), 1)
    }

    for (let i = remainingSprites.length - 1; i >= 0; i--) {
        const sprite = remainingSprites[i];
        for (let j = 0; j < sprite.tiles.length; j++) {
            const [index, gfx] = sprite.tiles[j];
            if (selectedTiles[index] && selectedTiles[index] !== gfx) {
                remainingSprites.splice(i, 1)
                break;
            }
        }
    }

    document.getElementById("clearAllButton").classList.toggle('disabled', !selectedSprites.length);
    document.getElementById("randButton").classList.toggle('disabled', !remainingSprites.length);

    renderGfxCanvas()
    renderTooltipCanvas()
}

// modified from https://sneslab.net/wiki/Graphics_Format
function snesToPixels(snesBytes) {
    if (snesBytes.length % 32 > 0) {
        return []
    }

    const pixels = []
    let b0, b1, b2, b3, p, mul
    let tileIndex = 0
    while (tileIndex * 32 < snesBytes.length) {
        for (let i = 0; i < 8; i++) {
            mul = 1;
            b0 = snesBytes[tileIndex * 32 + i * 2];
            b1 = snesBytes[tileIndex * 32 + i * 2 + 1];
            b2 = snesBytes[tileIndex * 32 + i * 2 + 16];
            b3 = snesBytes[tileIndex * 32 + i * 2 + 17];
            for (let j = 0; j < 8; j++) {
                p = ((b0 & mul) | ((b1 & mul) << 1) | ((b2 & mul) << 2) | ((b3 & mul) << 3)) >> j;
                mul <<= 1;
                const x = (tileIndex % 16) * 8 + 7 - j
                const y = Math.floor(tileIndex / 16) * 8 + i
                pixels[x + y * 128] = p
            }
        }
        tileIndex++;
    }

    return pixels
}

// input pixels must be stored one 8x8 tile after the last! not a regular pixel grid
function pixelsToSnes(pixels) {
    let snesBytes = new Int8Array(pixels.length / 2)
    let b0, b1, b2, b3, pixel
    let tile = 0
    while (tile * 64 < pixels.length) {
        for (let row = 0; row < 8; row++) {
            b0 = 0;
            b1 = 0;
            b2 = 0;
            b3 = 0;
            for (let x = 0; x < 8; x++) {
                pixel = pixels[tile * 64 + row * 8 + x]
                b0 = (b0 * 2) | (pixel & 1)
                b1 = (b1 * 2) | (pixel >> 1 & 1)
                b2 = (b2 * 2) | (pixel >> 2 & 1)
                b3 = (b3 * 2) | (pixel >> 3 & 1)
            }
            snesBytes[tile * 32 + row * 2] = b0
            snesBytes[tile * 32 + row * 2 + 1] = b1
            snesBytes[tile * 32 + row * 2 + 16] = b2
            snesBytes[tile * 32 + row * 2 + 17] = b3
        }

        tile++;
    }

    return snesBytes
}

function downloadGfx(slot) {
    // step 1 - loop through selectedTiles and copy pixels into new array
    const pixels = []
    for (let i = 0; i < 128; i++) {
        const tile = selectedTiles[i + slot * 128];
        let tileStart = (i % 16) * 8 + Math.floor(i / 16) * 1024
        if (tile) {
            for (let j = 0; j < 8; j++) {
                pixels.push(...gfxPixels[tile].slice(tileStart, tileStart + 8))
                tileStart += 128
            }
        } else {
            // empty space - fill with something cool?
            pixels.push(...Array.from({ length: 64 }, () => Math.floor(Math.random() * 64)))
        }
    }

    // step 2 - convert pixels back to snes graphics format
    const snesBytes = pixelsToSnes(pixels)

    // step 3 - download as .bin file
    const blob = new Blob([snesBytes], { type: "application/octet-stream" });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = "ExGFX80.bin";
    link.click();
    URL.revokeObjectURL(link.href);
}