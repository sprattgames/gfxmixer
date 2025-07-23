/*  TODO
[x] load gfx files
[x] draw gfx to screen
[x] select palette
[ ] list of sprites and their palette/location/compatibility
[ ] select which sprites you want to include
[ ] detect conflicts
[ ] create exgfx based on selection
[ ] save exgfx file


[ ] search bar
[ ] categories - castle, koopas, powerups, etc
[x] sprite images
[ ] multiple palettes within sprite
[ ] "passable" conflict detection (pokey head football, bone spiny etc)
[ ]     show all animation frames, variations etc
[ ] checkbox for lava particles, bounce sprites etc


[ ] load custom pal files
[ ] remap sprite locations? (for use with STEAR etc)
[ ] custom sprites?

*/
const hexPalettes = [
    ["#0000", "#f8f8f8", "#000000", "#885818", "#d8a038", "#f8d870", "#f8c898", "#e800b0", "#500000", "#f84070", "#203088", "#408098", "#80d8c8", "#b02860", "#f87068", "#f8f800"],
    ["#0000", "#f8f8f8", "#000000", "#707070", "#a0a0a0", "#c0c0c0", "#e0e0e0", "#f81058", "#0000", "#f8f8f8", "#000000", "#00c800", "#b00000", "#f80000", "#f85800", "#f8a000"],
    ["#0000", "#f8f8f8", "#000000", "#f87800", "#f8c000", "#f8f800", "#b82800", "#f88800", "#0000", "#f8f8f8", "#000000", "#00c800", "#e81868", "#f040a8", "#f878c8", "#f8c0f0"],
    ["#0000", "#f8f8f8", "#000000", "#4040d8", "#6868d8", "#8888f8", "#b82800", "#f88800", "#0000", "#f8f8f8", "#000000", "#00c800", "#00e000", "#88f838", "#c8f800", "#f8f898"],
    ["#0000", "#f8f8f8", "#000000", "#880000", "#b80000", "#f80000", "#b82800", "#f88800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#007800", "#00b800", "#00f800", "#b82800", "#f88800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#005050", "#007878", "#00a0a0", "#b82800", "#f88800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#707070", "#a0a0a0", "#c0c0c0", "#b82800", "#f88800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#a00868", "#d00888", "#f860c8", "#b04000", "#f89800", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#d8f8c0", "#60c000", "#588000", "#a84828", "#f89030", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#000000", "#283048", "#485058", "#686858", "#989040", "#c0c078", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    ["#0000", "#f8f8f8", "#184848", "#207068", "#288878", "#30a088", "#38b898", "#f80080", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
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

const gfxFileNames = ["GFX00", "GFX01", "GFX02", "GFX03", "GFX04", "GFX05", "GFX06", "GFX09", "GFX0A", "GFX0D", "GFX0E", "GFX0F", "GFX11", "GFX12", "GFX13", "GFX20", "GFX22", "GFX23", "GFX24", "GFX25"]

//  ==============================================================

const allSprites = [
    {
        name: "Bob-Omb",
        palette: 0,
        renderSequence: [
            [3, 10, 4, false, 12, 14, false, false],
            [3, 12, 4, false, 7, 14, false, false],
            [3, 12, 3, true, 20, 12, false, false],
            [3, 12, 3, true, 23, 14, false, false],
            [3, 12, 3, true, 22, 17, false, false],
            [3, 12, 3, true, 18, 17, false, false],
            [3, 12, 3, true, 17, 14, false, false]
        ]
    },
    {
        name: "Buzzy Beetle",
        palette: 6,
        renderSequence: [
            [3, 6, 0, false, 14, 17, false, false],
            [3, 4, 0, false, 9, 17, false, false],
            [3, 8, 0, false, 19, 17, false, false],
            [3, 0, 0, false, 11, 12, false, false],
            [3, 2, 0, false, 17, 12, false, false]
        ]
    },
    {
        name: "Spiny",
        palette: 0,
        renderSequence: [
            [3, 0, 0, false, 11, 14, false, false],
            [3, 2, 0, false, 17, 14, false, false]
        ]
    },
    {
        name: "Hopping Flame",
        palette: 0,
        renderSequence: [
            [3, 14, 0, false, 10, 13, false, false],
            [3, 14, 2, false, 14, 13, false, false],
            [3, 12, 2, true, 19, 15, false, false],
            [3, 13, 2, true, 21, 15, false, false]
        ]
    },
    {
        name: "Falling Spiny",
        palette: 0,
        renderSequence: [
            [3, 4, 0, true, 11, 14, false, false],
            [3, 4, 0, true, 11, 16, false, true],
            [3, 4, 0, true, 13, 14, true, false],
            [3, 4, 0, true, 13, 16, true, true],
            [3, 4, 1, true, 17, 14, false, false],
            [3, 4, 1, true, 17, 16, false, true],
            [3, 4, 1, true, 19, 14, true, false],
            [3, 4, 1, true, 19, 16, true, true]
        ]
    },
    {
        name: "Flying Lakitu",
        palette: 0,
        renderSequence: [
            [0, 0, 6, false, 17, 10, false, false],
            [0, 0, 6, false, 21, 10, false, false],
            [3, 12, 6, false, 19, 6, false, false],
            [3, 14, 6, false, 19, 10, false, false],
            [0, 0, 6, false, 18, 11, true, false],
            [0, 0, 6, false, 20, 11, false, false],
            [2, 13, 4, true, 20, 12, false, false],

            [0, 2, 6, false, 12, 21, false, false],
            [0, 2, 6, false, 16, 21, false, false],
            [3, 14, 4, false, 14, 17, false, false],
            [3, 14, 6, false, 14, 21, false, false],
            [0, 2, 6, false, 13, 22, false, false],
            [0, 2, 6, false, 15, 22, false, false],
            [2, 13, 4, true, 15, 23, false, false],

            [0, 0, 6, false, 11, 10, false, false],
            [0, 0, 6, false, 7, 10, false, false],
            [3, 10, 2, false, 6, 6, false, false],
            [3, 14, 6, false, 9, 10, false, false],
            [3, 12, 6, false, 9, 6, false, false],
            [0, 0, 6, false, 8, 11, false, false],
            [0, 0, 6, false, 10, 11, false, false],
            [2, 13, 4, true, 10, 12, false, false],
            [3, 9, 0, true, 4, 6, false, false],
            [3, 9, 0, true, 4, 8, false, false],
            [3, 9, 0, true, 4, 10, false, false],
            [3, 9, 0, true, 4, 12, false, false],
            [3, 9, 0, true, 4, 14, false, false],
            [3, 9, 0, true, 4, 16, false, false],
            [3, 9, 0, true, 4, 18, false, false],
            [3, 9, 0, true, 4, 20, false, false],
            [0, 4, 2, false, 4, 22, false, false]
        ]
    },
    {
        name: "Pipe Dwelling Lakitu",
        palette: 0,
        renderSequence: [
            [3, 12, 6, false, 9, 12, false, false],
            [3, 8, 2, false, 14, 12, false, false],
            [3, 14, 4, false, 19, 12, false, false],
            [3, 14, 6, false, 19, 16, false, false],
            [3, 14, 6, false, 14, 16, false, false],
            [3, 14, 6, false, 9, 16, false, false]
        ]
    },
    {
        name: "Cheep Cheep",
        palette: 0,
        renderSequence: [
            [2, 7, 6, false, 11, 14, false, false],
            [2, 9, 6, false, 17, 14, false, false]
        ]
    },
    {
        name: "Football",
        palette: 0,
        renderSequence: [
            [3, 10, 0, false, 14, 14, false, false]
        ]
    },
    {
        name: "Magikoopa",
        palette: 0,
        renderSequence: [
            [3, 0, 2, false, 14, 12, false, false],
            [3, 0, 4, false, 14, 16, false, false],
            [3, 9, 1, true, 12, 16, false, false],
            [3, 4, 2, false, 7, 12, false, false],
            [3, 4, 4, false, 7, 16, false, false],
            [3, 2, 4, false, 21, 16, false, false],
            [3, 9, 1, true, 19, 16, false, false],
            [3, 0, 2, false, 21, 12, false, false]
        ]
    },
    {
        name: "Magikoopa's Magic",
        palette: 0,
        renderSequence: [
            [3, 8, 0, true, 14, 13, false, false],
            [3, 9, 0, true, 17, 15, false, false],
            [3, 8, 1, true, 14, 17, false, false]
        ]
    },
    {
        name: "Net Koopas",
        palette: 0,
        renderSequence: [
            [2, 7, 0, false, 9, 11, false, false],
            [2, 7, 2, false, 9, 15, false, false],
            [2, 9, 2, false, 14, 15, false, false],
            [2, 12, 4, false, 14, 11, false, false],
            [2, 14, 4, false, 19, 11, false, false],
            [2, 11, 2, false, 19, 15, false, false]
        ]
    },
    {
        name: "Thwomp",
        palette: 1,
        renderSequence: [
            [3, 14, 0, false, 6, 12, false, false],
            [3, 14, 0, false, 8, 12, true, false],
            [3, 14, 2, false, 6, 16, false, false],
            [3, 14, 2, false, 8, 16, true, false],
            [3, 14, 0, false, 13, 12, false, false],
            [3, 14, 0, false, 15, 12, true, false],
            [3, 14, 2, false, 13, 16, false, false],
            [3, 14, 2, false, 15, 16, true, false],
            [3, 8, 4, false, 14, 14, false, false],
            [3, 14, 0, false, 20, 12, false, false],
            [3, 14, 0, false, 22, 12, true, false],
            [3, 14, 2, false, 20, 16, false, false],
            [3, 14, 2, false, 22, 16, true, false],
            [3, 10, 4, false, 21, 14, false, false]
        ]
    },
    {
        name: "Thwimp",
        palette: 1,
        renderSequence: [
            [3, 2, 2, true, 14, 14, false, false],
            [3, 2, 3, true, 14, 16, false, false],
            [3, 2, 3, true, 16, 16, true, false],
            [3, 2, 2, true, 16, 14, true, false]
        ]
    },
    {
        name: "Big Boo",
        palette: 14,
        renderSequence: [
            [3, 0, 0, false, 0, 8, false, false],
            [3, 2, 0, false, 4, 8, false, false],
            [3, 4, 0, false, 8, 8, false, false],
            [3, 6, 0, false, 12, 8, false, false],
            [3, 0, 2, false, 0, 12, false, false],
            [3, 2, 2, false, 4, 12, false, false],
            [3, 4, 2, false, 8, 12, false, false],
            [3, 6, 2, false, 12, 12, false, false],
            [3, 0, 2, false, 0, 16, false, true],
            [3, 2, 2, false, 4, 16, false, false],
            [3, 4, 4, false, 8, 16, false, false],
            [3, 6, 4, false, 12, 16, false, false],
            [3, 6, 6, false, 12, 20, false, false],
            [3, 4, 6, false, 8, 20, false, false],
            [3, 0, 0, false, 0, 20, false, true],
            [3, 2, 0, false, 4, 20, false, true],
            [3, 2, 4, false, 2, 13, false, false],
            [3, 2, 6, false, 2, 17, false, false],
            [3, 8, 6, false, 0, 14, true, false],
            [3, 8, 6, false, 4, 14, false, false],
            [3, 8, 6, false, 15, 14, false, false],
            [3, 0, 2, false, 16, 12, false, false],
            [3, 0, 0, false, 16, 8, false, false],
            [3, 2, 0, false, 20, 8, false, false],
            [3, 4, 0, false, 24, 8, false, false],
            [3, 6, 0, false, 28, 8, false, false],
            [3, 6, 2, false, 28, 12, false, false],
            [3, 4, 2, false, 24, 12, false, false],
            [3, 2, 2, false, 20, 12, false, false],
            [3, 2, 2, false, 20, 16, false, false],
            [3, 0, 2, false, 16, 16, false, true],
            [3, 0, 0, false, 16, 20, false, true],
            [3, 2, 0, false, 20, 20, false, true],
            [3, 4, 4, false, 24, 16, false, false],
            [3, 6, 4, false, 28, 16, false, false],
            [3, 6, 6, false, 28, 20, false, false],
            [3, 4, 6, false, 24, 20, false, false],
            [3, 8, 6, false, 24, 14, true, false],
            [3, 0, 4, false, 18, 13, false, false],
            [3, 0, 6, false, 18, 17, false, false]

        ]
    },
    {
        name: "Pirahna Plant",
        palette: 0,
        renderSequence: [
            [3, 14, 4, false, 11, 12, false, true],
            [1, 14, 2, false, 11, 16, false, true],
            [3, 14, 4, false, 17, 12, false, true],
            [1, 12, 2, false, 17, 16, false, true]
        ]
    },
    {
        name: "Lightning",
        palette: 0,
        renderSequence: [
            [3, 3, 7, true, 13, 14, false, false],
            [3, 3, 7, true, 13, 16, true, true],
            [3, 12, 6, false, 17, 16, false, false],
            [3, 12, 4, false, 17, 12, false, false]
        ]
    },
    {
        name: "Yoshi Egg",
        palette: 0,
        renderSequence: [
            [2, 2, 0, false, 14, 14, false, false],
            [2, 0, 0, false, 9, 14, false, false],
            [2, 15, 6, true, 19, 13, false, false],
            [2, 15, 6, true, 20, 16, true, false],
            [2, 15, 6, true, 23, 13, true, false],
            [2, 15, 6, true, 22, 16, false, false]
        ]
    },
    {
        name: "Spike Top",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 14, 7, false, false],
            [3, 10, 2, false, 21, 14, false, false],
            [3, 8, 2, false, 7, 14, true, true],
            [3, 12, 6, false, 14, 21, true, true],
            [3, 14, 0, false, 19, 9, false, false],
            [3, 14, 0, false, 9, 19, true, true],
            [3, 12, 2, false, 19, 19, true, false],
            [3, 12, 2, false, 9, 9, false, true]
        ]
    },
    {
        name: "Dry Bones",
        palette: 0,
        renderSequence: [
            [2, 4, 6, false, 3, 12, false, false],
            [2, 6, 6, false, 5, 16, false, false],
            [2, 4, 6, false, 8, 12, false, false],
            [2, 8, 6, false, 10, 16, false, false],
            [2, 7, 4, false, 15, 16, false, false],
            [2, 8, 4, false, 17, 16, false, false],
            [2, 13, 2, false, 22, 16, false, false],
            [2, 14, 2, false, 24, 16, false, false]
        ]
    },
    {
        name: "Bony Beetle",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 6, 11, false, false],
            [3, 10, 2, false, 11, 11, false, false],
            [3, 6, 0, false, 17, 11, false, false],
            [3, 4, 0, false, 22, 11, false, false],
            [2, 8, 4, false, 11, 17, false, false],
            [2, 7, 4, false, 9, 17, false, false],
            [2, 13, 2, false, 17, 17, false, false],
            [2, 14, 2, false, 19, 17, false, false]
        ]
    },
    {
        name: "Dry Bones (Throwing)",
        palette: 0,
        renderSequence: [
            [2, 4, 6, false, 3, 15, false, false],
            [2, 6, 6, false, 5, 19, false, false],
            [2, 4, 6, false, 8, 15, false, false],
            [2, 8, 6, false, 10, 19, false, false],
            [2, 7, 4, false, 15, 19, false, false],
            [2, 8, 4, false, 17, 19, false, false],
            [2, 13, 2, false, 22, 19, false, false],
            [2, 14, 2, false, 24, 19, false, false],
            [2, 4, 6, false, 22, 10, false, false],
            [3, 6, 6, false, 24, 14, false, false],
            [3, 2, 0, false, 24, 11, false, false],
            [3, 0, 0, false, 16, 9, false, false],
            [3, 0, 0, false, 12, 9, true, false],
            [3, 2, 0, false, 8, 9, true, false],
            [3, 2, 0, false, 3, 9, false, false]
        ]
    },
    {
        name: "Lava Particles",
        palette: 0,
        renderSequence: [
            [3, 6, 4, true, 11, 14, false, false],
            [3, 6, 5, true, 14, 13, false, false],
            [3, 7, 4, true, 17, 14, false, false],
            [3, 7, 5, true, 18, 16, false, false]
        ]
    },
    {
        name: "Boss Fireball",
        palette: 0,
        renderSequence: [
            [3, 10, 4, false, 12, 11, false, false],
            [3, 12, 4, false, 16, 11, false, false],
            [3, 10, 6, false, 12, 17, false, false],
            [3, 12, 6, false, 16, 17, false, false]
        ]
    },
    {
        name: "Boo",
        palette: 0,
        renderSequence: [
            [3, 8, 0, false, 11, 14, false, false],
            [3, 12, 0, false, 17, 14, false, false]
        ]
    },
    {
        name: "Boo Block",
        palette: 0,
        renderSequence: [
            [3, 8, 0, false, 9, 14, false, false],
            [3, 8, 4, false, 14, 14, false, false],
            [3, 10, 4, false, 19, 14, false, false]
        ]
    },
    {
        name: "Eerie",
        palette: 0,
        renderSequence: [
            [2, 10, 6, false, 11, 14, false, false],
            [3, 13, 6, false, 17, 14, false, false]
        ]
    },
    {
        name: "Urchin",
        palette: 0,
        renderSequence: [
            [3, 4, 4, false, 3, 12, false, false],
            [3, 4, 4, false, 7, 12, true, false],
            [3, 4, 4, false, 7, 16, true, true],
            [3, 4, 4, false, 3, 16, false, true],
            [3, 6, 4, false, 12, 12, false, false],
            [3, 6, 4, false, 16, 12, true, false],
            [3, 6, 4, false, 16, 16, true, true],
            [3, 6, 4, false, 12, 16, false, true],
            [3, 8, 4, false, 21, 12, false, false],
            [3, 8, 4, false, 25, 12, true, false],
            [3, 8, 4, false, 25, 16, true, true],
            [3, 8, 4, false, 21, 16, false, true],
            [3, 10, 4, false, 5, 14, false, false],
            [3, 12, 4, false, 14, 14, false, false],
            [3, 10, 4, false, 23, 14, false, false]
        ]
    },
    {
        name: "Rip Van Fish",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 6, 14, false, false],
            [3, 14, 0, false, 11, 14, false, false],
            [3, 0, 6, true, 9, 12, false, false],
            [3, 1, 6, true, 10, 10, false, false],
            [3, 0, 7, true, 9, 8, false, false],
            [3, 1, 7, true, 14, 12, false, false],
            [3, 12, 2, false, 17, 14, false, false],
            [3, 14, 2, false, 22, 14, false, false]
        ]
    },
    {
        name: "Para-bomb",
        palette: 0,
        renderSequence: [
            [3, 2, 4, false, 6, 12, false, false],
            [3, 6, 6, false, 4, 8, false, false],
            [3, 2, 2, true, 12, 12, false, false],
            [3, 2, 2, true, 14, 12, true, false],
            [3, 2, 3, true, 12, 14, false, false],
            [3, 2, 3, true, 14, 14, true, false],
            [3, 2, 6, false, 12, 8, false, false],
            [3, 10, 4, false, 6, 17, false, false],
            [3, 12, 4, false, 12, 17, false, false],
            [3, 12, 3, true, 21, 13, false, false],
            [3, 12, 3, true, 24, 15, false, false],
            [3, 12, 3, true, 23, 18, false, false],
            [3, 12, 3, true, 19, 18, false, false],
            [3, 12, 3, true, 18, 15, false, false]
        ]
    },
    {
        name: "Para-goomba",
        palette: 0,
        renderSequence: [
            [3, 3, 2, true, 17, 12, false, false],
            [3, 3, 3, true, 17, 14, false, false],
            [3, 3, 2, true, 19, 12, true, false],
            [3, 3, 3, true, 19, 14, true, false],
            [3, 2, 6, false, 17, 8, false, false],
            [3, 8, 6, false, 11, 12, false, false],
            [3, 6, 6, false, 9, 8, false, false],
            [1, 10, 2, false, 17, 17, false, false],
            [1, 8, 2, false, 11, 17, false, false]
        ]
    },
    {
        name: "Horizontal Dolphin",
        palette: 0,
        renderSequence: [
            [3, 8, 0, false, 12, 11, false, false],
            [3, 8, 2, false, 16, 11, false, false],
            [3, 9, 2, false, 18, 11, false, false],
            [3, 2, 6, false, 12, 17, false, false],
            [3, 7, 6, false, 16, 17, false, false],
            [3, 8, 6, false, 18, 17, false, false]
        ]
    },
    {
        name: "Vertical Dolphin",
        palette: 0,
        renderSequence: [
            [3, 14, 4, false, 14, 12, false, false],
            [3, 14, 6, false, 14, 16, false, false]
        ]
    },
    {
        name: "Torpedo Ted",
        palette: 0,
        renderSequence: [
            [3, 0, 0, false, 10, 11, false, false],
            [3, 2, 0, false, 14, 11, false, false],
            [3, 0, 2, false, 14, 17, false, false],
            [3, 0, 0, false, 10, 17, false, false],
            [0, 2, 6, false, 18, 11, false, false],
            [0, 4, 6, false, 18, 17, false, false],
            [0, 6, 6, false, 20, 11, false, false],
            [0, 6, 6, false, 20, 17, false, false]
        ]
    },
    {
        name: "Growing/Shrinking Pipe",
        palette: 0,
        renderSequence: [
            [3, 4, 2, false, 12, 14, false, false],
            [3, 6, 2, false, 16, 14, false, false]
        ]
    },
    {
        name: "Goal Point Question Sphere (Orb)",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 14, 14, true, false]
        ]
    },
    {
        name: "Monty Mole (ground)",
        palette: 0,
        renderSequence: [
            [3, 8, 0, true, 8, 16, false, false],
            [3, 9, 0, true, 10, 16, false, false],
            [3, 6, 0, false, 8, 11, false, false],
            [3, 4, 0, false, 13, 14, false, false],
            [3, 2, 0, false, 18, 14, false, false]
        ]
    },
    {
        name: "Monty Mole (ledge)",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 9, 16, false, false],
            [3, 6, 0, false, 9, 11, false, false],
            [3, 2, 0, false, 14, 14, false, false],
            [3, 4, 0, false, 19, 14, false, false]
        ]
    },
    {
        name: "Ninji",
        palette: 0,
        renderSequence: [
            [3, 7, 2, false, 17, 14, false, false],
            [3, 9, 2, false, 11, 14, false, false]
        ]
    },
    {
        name: "Moving Ghost House Hole",
        palette: 0,
        renderSequence: [
            [3, 11, 6, false, 10, 14, true, false],
            [3, 10, 6, false, 14, 14, false, false],
            [3, 11, 6, false, 18, 14, false, false]
        ]
    },
    {
        name: "Revolving Net Door",
        palette: 0,
        renderSequence: [
            [2, 0, 0, false, 6, 6, false, false],
            [2, 0, 1, false, 6, 10, false, false],
            [2, 0, 0, false, 6, 12, false, true],
            [2, 0, 0, false, 12, 6, true, false],
            [2, 0, 0, false, 12, 12, true, true],
            [2, 2, 2, true, 10, 10, false, false],
            [2, 1, 0, false, 10, 6, false, false],
            [2, 1, 0, false, 10, 12, false, true],
            [2, 0, 1, false, 12, 10, true, false],
            [2, 5, 0, false, 17, 6, false, false],
            [2, 5, 0, false, 21, 6, true, false],
            [2, 5, 1, false, 17, 10, false, false],
            [2, 5, 1, false, 21, 10, true, false],
            [2, 5, 0, false, 17, 12, false, true],
            [2, 5, 0, false, 21, 12, true, true],
            [2, 5, 0, false, 8, 16, false, false],
            [2, 5, 0, false, 10, 16, true, false],
            [2, 5, 1, false, 8, 20, false, false],
            [2, 5, 1, false, 10, 20, true, false],
            [2, 5, 0, false, 8, 22, false, true],
            [2, 5, 0, true, 12, 24, true, true],
            [2, 3, 0, false, 20, 16, false, false],
            [2, 3, 1, false, 20, 20, false, false],
            [2, 3, 0, true, 20, 24, false, true]            
        ]
    },
]

/*
{
    name: "",
    palette: 0,
    renderSequence: []
},
*/

//  ==============================================================

let activePaletteIndex = 0;
const allGfx = [];
const gfxIndexes = [0, 1, 13, 3]
const gfxBitmaps = [];
const scale = 3;

let selectedTile = -1
let selected8x8 = true

let currentSprite = allSprites[allSprites.length - 1]

let gfxCtx, spriteCtx

//  ==============================================================


//  ==============================================================

window.onload = async function () {
    const gfxCanvas = document.getElementById("gfxCanvas");
    gfxCanvas.setAttribute("width", 128 * scale)
    gfxCanvas.setAttribute("height", 256 * scale)
    gfxCtx = gfxCanvas.getContext("2d");
    gfxCanvas.onclick = function (e) {
        let x, y
        if (e.shiftKey) {
            x = Math.floor(e.offsetX / (8 * scale))
            y = Math.floor(e.offsetY / (8 * scale))
            selected8x8 = true
        } else {
            x = Math.floor((e.offsetX - 8) / (8 * scale))
            y = Math.floor((e.offsetY - 8) / (8 * scale))
            selected8x8 = false
        }
        selectedTile = x + y * 16
        renderGfxCanvas();
        e.preventDefault();
    }
    gfxCanvas.onmousemove = function (e) {
        renderGfxCanvas();
        let x, y
        if (e.shiftKey) {
            x = Math.floor(e.offsetX / (8 * scale))
            y = Math.floor(e.offsetY / (8 * scale))
        } else {
            x = Math.floor((e.offsetX - 8) / (8 * scale))
            y = Math.floor((e.offsetY - 8) / (8 * scale))
        }
        gfxCtx.beginPath()
        gfxCtx.lineWidth = 1;
        gfxCtx.strokeStyle = 'white';
        if (e.shiftKey) {
            gfxCtx.rect(x * 8, y * 8, 8, 8);
        } else {
            gfxCtx.rect(x * 8, y * 8, 16, 16);
        }
        gfxCtx.stroke();
    }
    gfxCanvas.onmouseleave = function (e) {
        renderGfxCanvas();
    }

    const spriteCanvas = document.getElementById("spriteCanvas");
    spriteCanvas.setAttribute("width", 128 * scale)
    spriteCanvas.setAttribute("height", 128 * scale)
    spriteCtx = spriteCanvas.getContext("2d");
    spriteCanvas.onclick = function (e) {
        if (selectedTile > -1) {
            let x, y
            if (selected8x8) {
                x = Math.floor(e.offsetX / (4 * scale))
                y = Math.floor(e.offsetY / (4 * scale))
            } else {
                x = Math.floor((e.offsetX - 16) / (4 * scale))
                y = Math.floor((e.offsetY - 16) / (4 * scale))
            }
            currentSprite.renderSequence.push([
                Math.floor(selectedTile / 128),
                selectedTile % 16,
                Math.floor(selectedTile / 16) % 8,
                selected8x8,
                x,
                y,
                e.shiftKey,
                e.ctrlKey
            ])
        }
        renderSpriteCanvas();
        e.preventDefault();
    }
    spriteCanvas.onmousemove = function (e) {
        renderSpriteCanvas();
        if (selectedTile > -1) {
            let x, y
            if (selected8x8) {
                x = Math.floor(e.offsetX / (4 * scale))
                y = Math.floor(e.offsetY / (4 * scale))
            } else {
                x = Math.floor((e.offsetX - 16) / (4 * scale))
                y = Math.floor((e.offsetY - 16) / (4 * scale))
            }
            const tx = selectedTile % 16
            const ty = Math.floor(selectedTile / 16) % 8
            const size = selected8x8 ? 8 : 16
            const bitmap = gfxBitmaps[Math.floor(selectedTile / 128)];
            const xScale = e.shiftKey ? -1 : 1
            const yScale = e.ctrlKey ? -1 : 1

            spriteCtx.save();

            spriteCtx.globalAlpha = 0.5;

            spriteCtx.translate(x * 4, y * 4);
            spriteCtx.scale(xScale, yScale);
            spriteCtx.translate(-x * 4, -y * 4);

            spriteCtx.drawImage(bitmap, tx * 8, ty * 8, size, size, x * 4, y * 4, size * xScale, size * yScale);

            spriteCtx.restore();
        }
    }
    spriteCanvas.onmouseleave = function (e) {
        renderSpriteCanvas();
    }

    document.getElementById("clearButton").onclick = function (e) {
        selectedTile = -1
        currentSprite.renderSequence = []
        renderGfxCanvas()
        renderSpriteCanvas()
    }

    document.getElementById("undoButton").onclick = undo
    document.onkeydown = function (e) {
        switch (e.key) {
            case "z":
                if (e.ctrlKey) undo()
                break;
            case "ArrowLeft":
                currentSprite.renderSequence.forEach((step) => { step[4] -= 1 })
                renderSpriteCanvas()
                e.preventDefault()
                break;
            case "ArrowRight":
                currentSprite.renderSequence.forEach((step) => { step[4] += 1 })
                renderSpriteCanvas()
                e.preventDefault()
                break;
            case "ArrowUp":
                currentSprite.renderSequence.forEach((step) => { step[5] -= 1 })
                renderSpriteCanvas()
                e.preventDefault()
                break;
            case "ArrowDown":
                currentSprite.renderSequence.forEach((step) => { step[5] += 1 })
                renderSpriteCanvas()
                e.preventDefault()
                break;
            default:
        }

    }

    document.getElementById("copyButton").onclick = function (e) {
        unsecuredCopyToClipboard(`\n${currentSprite.renderSequence.map(step => `[${step.join(', ')}]`).join(',\n')}\n`)
    }

    // load cached palettes, gfx etc...

    // populate palette select
    const paletteSelect = document.getElementById("paletteSelect")
    for (let i = 0; i < hexPalettes.length; i++) {
        const option = new Option(`Palette ${i}`, i)
        paletteSelect.appendChild(option)
    }
    paletteSelect.onchange = function (e) {
        activePaletteIndex = +(e.target.value)
        refreshBitmaps()
    }

    // populate sprite select
    const spriteSelect = document.getElementById("spriteSelect")
    for (let i = 0; i < allSprites.length; i++) {
        const option = new Option(allSprites[i].name, i)
        spriteSelect.appendChild(option)
    }
    spriteSelect.value = allSprites.length - 1
    spriteSelect.onchange = function (e) {
        currentSprite = allSprites[+(e.target.value)]
        refreshBitmaps()
    }

    // populate gfx select
    const gfxSelects = [
        document.getElementById("gfx0Select"),
        document.getElementById("gfx1Select"),
        document.getElementById("gfx2Select"),
        document.getElementById("gfx3Select")
    ]
    for (let i = 0; i < gfxSelects.length; i++) {
        const select = gfxSelects[i];

        for (let j = 0; j < gfxFileNames.length; j++) {
            select.appendChild(new Option(gfxFileNames[j], j));
        }
        select.value = gfxIndexes[i];
        select.onchange = async function (e) {
            gfxIndexes[i] = +(e.target.value);
            refreshBitmaps();
        }
    }

    // import GFX files
    for (let i = 0; i < gfxFileNames.length; i++) {
        const blob = await fetch(`/gfx/${gfxFileNames[i]}.bin`);
        loadGfxFile(blob, gfxFileNames[i]);
    };

    refreshBitmaps();
};

function loadGfxFile(blob, name) {
    blob.arrayBuffer().then(((arrayBuffer) => {
        const snesBytes = new Int8Array(arrayBuffer);

        const pixels = snesToPixels(snesBytes);

        allGfx.push({ name, pixels });
    }))
}

function renderGfxCanvas() {
    gfxCtx.reset()
    gfxCtx.resetTransform()
    gfxCtx.scale(scale, scale)
    gfxCtx.imageSmoothingEnabled = false;

    for (let i = 0; i < 4; ++i) {
        const bitmap = gfxBitmaps[i];
        if (bitmap) {
            gfxCtx.drawImage(bitmap, 0, i * 64)
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

function renderSpriteCanvas() {
    spriteCtx.reset()
    spriteCtx.resetTransform()
    spriteCtx.scale(scale, scale)
    spriteCtx.imageSmoothingEnabled = false;

    // draw center point
    spriteCtx.strokeStyle = "darkslategrey";
    spriteCtx.moveTo(64, 0);
    spriteCtx.lineTo(64, 256);
    spriteCtx.moveTo(0, 64);
    spriteCtx.lineTo(256, 64);
    spriteCtx.stroke()

    for (let i = 0; i < currentSprite.renderSequence.length; i++) {
        const [slot, tx, ty, is8x8, x, y, xFlip, yFlip] = currentSprite.renderSequence[i]
        const size = is8x8 ? 8 : 16
        const bitmap = gfxBitmaps[slot];
        const xScale = xFlip ? -1 : 1
        const yScale = yFlip ? -1 : 1

        spriteCtx.save();

        spriteCtx.translate(x * 4, y * 4);
        spriteCtx.scale(xScale, yScale);
        spriteCtx.translate(-x * 4, -y * 4);

        spriteCtx.drawImage(bitmap, tx * 8, ty * 8, size, size, x * 4, y * 4, size * xScale, size * yScale);

        spriteCtx.restore();
    }
}

async function refreshBitmaps() {
    return new Promise(async (resolve) => {
        for (let i = 0; i < 4; ++i) {
            await updateBitmap(allGfx[gfxIndexes[i]].pixels, rgbaPalettes[activePaletteIndex], i)
        }
        renderGfxCanvas()
        renderSpriteCanvas()
        resolve()
    })
}

async function updateBitmap(pixels, palette, slot) {
    return new Promise((resolve) => {
        const colorData = pixels.map((index) => (palette[index])).flat() //
        const uintColorData = new Uint8ClampedArray(colorData)
        const imageData = new ImageData(uintColorData, 128)
        // save to slot
        createImageBitmap(imageData).then((bitmap) => {
            // throw out old bitmap
            gfxBitmaps[slot]?.close?.()
            gfxBitmaps[slot] = bitmap
            resolve(bitmap)
        })
    })
}

// modified from https://sneslab.net/wiki/Graphics_Format
function snesToPixels(snesBytes) {
    if (snesBytes.length % 32 > 0) {
        return []
    }

    let b0, b1, b2, b3, p, mul
    let pixels = []
    let spriteIndex = 0
    while (spriteIndex * 32 < snesBytes.length) {
        for (let i = 0; i < 8; i++) {
            mul = 1;
            b0 = snesBytes[spriteIndex * 32 + i * 2];
            b1 = snesBytes[spriteIndex * 32 + i * 2 + 1];
            b2 = snesBytes[spriteIndex * 32 + i * 2 + 16];
            b3 = snesBytes[spriteIndex * 32 + i * 2 + 17];
            for (let j = 0; j < 8; j++) {
                p = ((b0 & mul) | ((b1 & mul) << 1) | ((b2 & mul) << 2) | ((b3 & mul) << 3)) >> j;
                mul <<= 1;
                const x = (spriteIndex % 16) * 8 + 7 - j
                const y = Math.floor(spriteIndex / 16) * 8 + i
                pixels[x + y * 128] = p
            }
        }
        spriteIndex++;
    }

    return pixels
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
    if (currentSprite && currentSprite.renderSequence.length > 0) {
        currentSprite.renderSequence.pop()
        renderSpriteCanvas()
    }
}