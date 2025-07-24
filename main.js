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

const gfxFileNames = ["GFX00", "GFX01", "GFX02", "GFX03", "GFX04", "GFX05", "GFX06", "GFX09", "GFX0A", "GFX0D", "GFX0E", "GFX0F", "GFX11", "GFX12", "GFX13", "GFX14", "GFX20", "GFX22", "GFX23", "GFX24", "GFX25"]

//  ==============================================================

const allSprites = [
    {
        name: "Bob-Omb",
        palette: 0,
        renderSequence: [
            [3, 10, 4, false, 48, 56, false, false],
            [3, 12, 4, false, 28, 56, false, false],
            [3, 12, 3, true, 80, 48, false, false],
            [3, 12, 3, true, 92, 56, false, false],
            [3, 12, 3, true, 88, 68, false, false],
            [3, 12, 3, true, 72, 68, false, false],
            [3, 12, 3, true, 68, 56, false, false]

        ]
    },
    {
        name: "Buzzy Beetle",
        palette: 6,
        renderSequence: [
            [3, 6, 0, false, 56, 68, false, false],
            [3, 4, 0, false, 36, 68, false, false],
            [3, 8, 0, false, 76, 68, false, false],
            [3, 0, 0, false, 44, 48, false, false],
            [3, 2, 0, false, 68, 48, false, false]

        ]
    },
    {
        name: "Spiny",
        palette: 0,
        renderSequence: [
            [3, 0, 0, false, 44, 56, false, false],
            [3, 2, 0, false, 68, 56, false, false]

        ]
    },
    {
        name: "Hopping Flame",
        palette: 0,
        renderSequence: [
            [3, 14, 0, false, 40, 52, false, false],
            [3, 14, 2, false, 56, 52, false, false],
            [3, 12, 2, true, 76, 60, false, false],
            [3, 13, 2, true, 84, 60, false, false]

        ]
    },
    {
        name: "Falling Spiny",
        palette: 0,
        renderSequence: [
            [3, 4, 0, true, 44, 56, false, false],
            [3, 4, 0, true, 44, 64, false, true],
            [3, 4, 0, true, 52, 56, true, false],
            [3, 4, 0, true, 52, 64, true, true],
            [3, 4, 1, true, 68, 56, false, false],
            [3, 4, 1, true, 68, 64, false, true],
            [3, 4, 1, true, 76, 56, true, false],
            [3, 4, 1, true, 76, 64, true, true]

        ]
    },
    {
        name: "Flying Lakitu",
        palette: 0,
        renderSequence: [
            [0, 0, 6, false, 68, 40, false, false],
            [0, 0, 6, false, 84, 40, false, false],
            [3, 12, 6, false, 76, 24, false, false],
            [3, 14, 6, false, 76, 40, false, false],
            [0, 0, 6, false, 72, 44, true, false],
            [0, 0, 6, false, 80, 44, false, false],
            [2, 13, 4, true, 80, 48, false, false],
            [0, 2, 6, false, 48, 84, false, false],
            [0, 2, 6, false, 64, 84, false, false],
            [3, 14, 4, false, 56, 68, false, false],
            [3, 14, 6, false, 56, 84, false, false],
            [0, 2, 6, false, 52, 88, false, false],
            [0, 2, 6, false, 60, 88, false, false],
            [2, 13, 4, true, 60, 92, false, false],
            [0, 0, 6, false, 44, 40, false, false],
            [0, 0, 6, false, 28, 40, false, false],
            [3, 10, 2, false, 24, 24, false, false],
            [3, 14, 6, false, 36, 40, false, false],
            [3, 12, 6, false, 36, 24, false, false],
            [0, 0, 6, false, 32, 44, false, false],
            [0, 0, 6, false, 40, 44, false, false],
            [2, 13, 4, true, 40, 48, false, false],
            [3, 9, 0, true, 16, 24, false, false],
            [3, 9, 0, true, 16, 32, false, false],
            [3, 9, 0, true, 16, 40, false, false],
            [3, 9, 0, true, 16, 48, false, false],
            [3, 9, 0, true, 16, 56, false, false],
            [3, 9, 0, true, 16, 64, false, false],
            [3, 9, 0, true, 16, 72, false, false],
            [3, 9, 0, true, 16, 80, false, false],
            [0, 4, 2, false, 16, 88, false, false]

        ]
    },
    {
        name: "Pipe Dwelling Lakitu",
        palette: 0,
        renderSequence: [
            [3, 12, 6, false, 36, 48, false, false],
            [3, 8, 2, false, 56, 48, false, false],
            [3, 14, 4, false, 76, 48, false, false],
            [3, 14, 6, false, 76, 64, false, false],
            [3, 14, 6, false, 56, 64, false, false],
            [3, 14, 6, false, 36, 64, false, false]

        ]
    },
    {
        name: "Cheep Cheep",
        palette: 0,
        renderSequence: [
            [2, 7, 6, false, 44, 56, false, false],
            [2, 9, 6, false, 68, 56, false, false]

        ]
    },
    {
        name: "Football",
        palette: 0,
        renderSequence: [
            [3, 10, 0, false, 56, 56, false, false]

        ]
    },
    {
        name: "Magikoopa",
        palette: 0,
        renderSequence: [
            [3, 0, 2, false, 56, 48, false, false],
            [3, 0, 4, false, 56, 64, false, false],
            [3, 9, 1, true, 48, 64, false, false],
            [3, 4, 2, false, 28, 48, false, false],
            [3, 4, 4, false, 28, 64, false, false],
            [3, 2, 4, false, 84, 64, false, false],
            [3, 9, 1, true, 76, 64, false, false],
            [3, 0, 2, false, 84, 48, false, false]

        ]
    },
    {
        name: "Magikoopa's Magic",
        palette: 0,
        renderSequence: [
            [3, 8, 0, true, 56, 52, false, false],
            [3, 9, 0, true, 68, 60, false, false],
            [3, 8, 1, true, 56, 68, false, false]

        ]
    },
    {
        name: "Net Koopas",
        palette: 0,
        renderSequence: [
            [2, 7, 0, false, 36, 44, false, false],
            [2, 7, 2, false, 36, 60, false, false],
            [2, 9, 2, false, 56, 60, false, false],
            [2, 12, 4, false, 56, 44, false, false],
            [2, 14, 4, false, 76, 44, false, false],
            [2, 11, 2, false, 76, 60, false, false]

        ]
    },
    {
        name: "Thwomp",
        palette: 1,
        renderSequence: [
            [3, 14, 0, false, 24, 48, false, false],
            [3, 14, 0, false, 32, 48, true, false],
            [3, 14, 2, false, 24, 64, false, false],
            [3, 14, 2, false, 32, 64, true, false],
            [3, 14, 0, false, 52, 48, false, false],
            [3, 14, 0, false, 60, 48, true, false],
            [3, 14, 2, false, 52, 64, false, false],
            [3, 14, 2, false, 60, 64, true, false],
            [3, 8, 4, false, 56, 56, false, false],
            [3, 14, 0, false, 80, 48, false, false],
            [3, 14, 0, false, 88, 48, true, false],
            [3, 14, 2, false, 80, 64, false, false],
            [3, 14, 2, false, 88, 64, true, false],
            [3, 10, 4, false, 84, 56, false, false]

        ]
    },
    {
        name: "Thwimp",
        palette: 1,
        renderSequence: [
            [3, 2, 2, true, 56, 56, false, false],
            [3, 2, 3, true, 56, 64, false, false],
            [3, 2, 3, true, 64, 64, true, false],
            [3, 2, 2, true, 64, 56, true, false]

        ]
    },
    {
        name: "Big Boo",
        palette: 14,
        renderSequence: [
            [3, 0, 0, false, 0, 32, false, false],
            [3, 2, 0, false, 16, 32, false, false],
            [3, 4, 0, false, 32, 32, false, false],
            [3, 6, 0, false, 48, 32, false, false],
            [3, 0, 2, false, 0, 48, false, false],
            [3, 2, 2, false, 16, 48, false, false],
            [3, 4, 2, false, 32, 48, false, false],
            [3, 6, 2, false, 48, 48, false, false],
            [3, 0, 2, false, 0, 64, false, true],
            [3, 2, 2, false, 16, 64, false, false],
            [3, 4, 4, false, 32, 64, false, false],
            [3, 6, 4, false, 48, 64, false, false],
            [3, 6, 6, false, 48, 80, false, false],
            [3, 4, 6, false, 32, 80, false, false],
            [3, 0, 0, false, 0, 80, false, true],
            [3, 2, 0, false, 16, 80, false, true],
            [3, 2, 4, false, 8, 52, false, false],
            [3, 2, 6, false, 8, 68, false, false],
            [3, 8, 6, false, 0, 56, true, false],
            [3, 8, 6, false, 16, 56, false, false],
            [3, 8, 6, false, 60, 56, false, false],
            [3, 0, 2, false, 64, 48, false, false],
            [3, 0, 0, false, 64, 32, false, false],
            [3, 2, 0, false, 80, 32, false, false],
            [3, 4, 0, false, 96, 32, false, false],
            [3, 6, 0, false, 112, 32, false, false],
            [3, 6, 2, false, 112, 48, false, false],
            [3, 4, 2, false, 96, 48, false, false],
            [3, 2, 2, false, 80, 48, false, false],
            [3, 2, 2, false, 80, 64, false, false],
            [3, 0, 2, false, 64, 64, false, true],
            [3, 0, 0, false, 64, 80, false, true],
            [3, 2, 0, false, 80, 80, false, true],
            [3, 4, 4, false, 96, 64, false, false],
            [3, 6, 4, false, 112, 64, false, false],
            [3, 6, 6, false, 112, 80, false, false],
            [3, 4, 6, false, 96, 80, false, false],
            [3, 8, 6, false, 96, 56, true, false],
            [3, 0, 4, false, 72, 52, false, false],
            [3, 0, 6, false, 72, 68, false, false]


        ]
    },
    {
        name: "Pirahna Plant",
        palette: 0,
        renderSequence: [
            [3, 14, 4, false, 44, 48, false, true],
            [1, 14, 2, false, 44, 64, false, true],
            [3, 14, 4, false, 68, 48, false, true],
            [1, 12, 2, false, 68, 64, false, true]

        ]
    },
    {
        name: "Yoshi Egg",
        palette: 0,
        renderSequence: [
            [2, 2, 0, false, 56, 56, false, false],
            [2, 0, 0, false, 36, 56, false, false],
            [2, 15, 6, true, 76, 52, false, false],
            [2, 15, 6, true, 80, 64, true, false],
            [2, 15, 6, true, 92, 52, true, false],
            [2, 15, 6, true, 88, 64, false, false]

        ]
    },
    {
        name: "Spike Top",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 56, 28, false, false],
            [3, 10, 2, false, 84, 56, false, false],
            [3, 8, 2, false, 28, 56, true, true],
            [3, 12, 6, false, 56, 84, true, true],
            [3, 14, 0, false, 76, 36, false, false],
            [3, 14, 0, false, 36, 76, true, true],
            [3, 12, 2, false, 76, 76, true, false],
            [3, 12, 2, false, 36, 36, false, true]

        ]
    },
    {
        name: "Dry Bones",
        palette: 0,
        renderSequence: [
            [2, 4, 6, false, 12, 48, false, false],
            [2, 6, 6, false, 20, 64, false, false],
            [2, 4, 6, false, 32, 48, false, false],
            [2, 8, 6, false, 40, 64, false, false],
            [2, 7, 4, false, 60, 64, false, false],
            [2, 8, 4, false, 68, 64, false, false],
            [2, 13, 2, false, 88, 64, false, false],
            [2, 14, 2, false, 96, 64, false, false]

        ]
    },
    {
        name: "Bony Beetle",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 24, 44, false, false],
            [3, 10, 2, false, 44, 44, false, false],
            [3, 6, 0, false, 68, 44, false, false],
            [3, 4, 0, false, 88, 44, false, false],
            [2, 8, 4, false, 44, 68, false, false],
            [2, 7, 4, false, 36, 68, false, false],
            [2, 13, 2, false, 68, 68, false, false],
            [2, 14, 2, false, 76, 68, false, false]

        ]
    },
    {
        name: "Dry Bones (Throwing)",
        palette: 0,
        renderSequence: [
            [2, 4, 6, false, 12, 60, false, false],
            [2, 6, 6, false, 20, 76, false, false],
            [2, 4, 6, false, 32, 60, false, false],
            [2, 8, 6, false, 40, 76, false, false],
            [2, 7, 4, false, 60, 76, false, false],
            [2, 8, 4, false, 68, 76, false, false],
            [2, 13, 2, false, 88, 76, false, false],
            [2, 14, 2, false, 96, 76, false, false],
            [2, 4, 6, false, 88, 40, false, false],
            [3, 6, 6, false, 96, 56, false, false],
            [3, 2, 0, false, 96, 44, false, false],
            [3, 0, 0, false, 64, 36, false, false],
            [3, 0, 0, false, 48, 36, true, false],
            [3, 2, 0, false, 32, 36, true, false],
            [3, 2, 0, false, 12, 36, false, false]

        ]
    },
    {
        name: "Lava Particles",
        palette: 0,
        renderSequence: [
            [3, 6, 4, true, 44, 56, false, false],
            [3, 6, 5, true, 56, 52, false, false],
            [3, 7, 4, true, 68, 56, false, false],
            [3, 7, 5, true, 72, 64, false, false]

        ]
    },
    {
        name: "Boss Fireball",
        palette: 0,
        renderSequence: [
            [3, 10, 4, false, 48, 44, false, false],
            [3, 12, 4, false, 64, 44, false, false],
            [3, 10, 6, false, 48, 68, false, false],
            [3, 12, 6, false, 64, 68, false, false]

        ]
    },
    {
        name: "Boo",
        palette: 0,
        renderSequence: [
            [3, 8, 0, false, 44, 56, false, false],
            [3, 12, 0, false, 68, 56, false, false]

        ]
    },
    {
        name: "Boo Block",
        palette: 0,
        renderSequence: [
            [3, 8, 0, false, 36, 56, false, false],
            [3, 8, 4, false, 56, 56, false, false],
            [3, 10, 4, false, 76, 56, false, false]

        ]
    },
    {
        name: "Eerie",
        palette: 0,
        renderSequence: [
            [2, 10, 6, false, 44, 56, false, false],
            [3, 13, 6, false, 68, 56, false, false]

        ]
    },
    {
        name: "Urchin",
        palette: 0,
        renderSequence: [
            [3, 4, 4, false, 12, 48, false, false],
            [3, 4, 4, false, 28, 48, true, false],
            [3, 4, 4, false, 28, 64, true, true],
            [3, 4, 4, false, 12, 64, false, true],
            [3, 6, 4, false, 48, 48, false, false],
            [3, 6, 4, false, 64, 48, true, false],
            [3, 6, 4, false, 64, 64, true, true],
            [3, 6, 4, false, 48, 64, false, true],
            [3, 8, 4, false, 84, 48, false, false],
            [3, 8, 4, false, 100, 48, true, false],
            [3, 8, 4, false, 100, 64, true, true],
            [3, 8, 4, false, 84, 64, false, true],
            [3, 10, 4, false, 20, 56, false, false],
            [3, 12, 4, false, 56, 56, false, false],
            [3, 10, 4, false, 92, 56, false, false]

        ]
    },
    {
        name: "Rip Van Fish",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 24, 56, false, false],
            [3, 14, 0, false, 44, 56, false, false],
            [3, 0, 6, true, 36, 48, false, false],
            [3, 1, 6, true, 40, 40, false, false],
            [3, 0, 7, true, 36, 32, false, false],
            [3, 1, 7, true, 56, 48, false, false],
            [3, 12, 2, false, 68, 56, false, false],
            [3, 14, 2, false, 88, 56, false, false]

        ]
    },
    {
        name: "Para-bomb",
        palette: 0,
        renderSequence: [
            [3, 2, 4, false, 24, 48, false, false],
            [3, 6, 6, false, 16, 32, false, false],
            [3, 2, 2, true, 48, 48, false, false],
            [3, 2, 2, true, 56, 48, true, false],
            [3, 2, 3, true, 48, 56, false, false],
            [3, 2, 3, true, 56, 56, true, false],
            [3, 2, 6, false, 48, 32, false, false],
            [3, 10, 4, false, 24, 68, false, false],
            [3, 12, 4, false, 48, 68, false, false],
            [3, 12, 3, true, 84, 52, false, false],
            [3, 12, 3, true, 96, 60, false, false],
            [3, 12, 3, true, 92, 72, false, false],
            [3, 12, 3, true, 76, 72, false, false],
            [3, 12, 3, true, 72, 60, false, false]

        ]
    },
    {
        name: "Para-goomba",
        palette: 0,
        renderSequence: [
            [3, 3, 2, true, 68, 48, false, false],
            [3, 3, 3, true, 68, 56, false, false],
            [3, 3, 2, true, 76, 48, true, false],
            [3, 3, 3, true, 76, 56, true, false],
            [3, 2, 6, false, 68, 32, false, false],
            [3, 8, 6, false, 44, 48, false, false],
            [3, 6, 6, false, 36, 32, false, false],
            [1, 10, 2, false, 68, 68, false, false],
            [1, 8, 2, false, 44, 68, false, false]

        ]
    },
    {
        name: "Horizontal Dolphin",
        palette: 0,
        renderSequence: [
            [3, 8, 0, false, 48, 44, false, false],
            [3, 8, 2, false, 64, 44, false, false],
            [3, 9, 2, false, 72, 44, false, false],
            [3, 2, 6, false, 48, 68, false, false],
            [3, 7, 6, false, 64, 68, false, false],
            [3, 8, 6, false, 72, 68, false, false]

        ]
    },
    {
        name: "Vertical Dolphin",
        palette: 0,
        renderSequence: [
            [3, 14, 4, false, 56, 48, false, false],
            [3, 14, 6, false, 56, 64, false, false]

        ]
    },
    {
        name: "Torpedo Ted",
        palette: 0,
        renderSequence: [
            [3, 0, 0, false, 40, 44, false, false],
            [3, 2, 0, false, 56, 44, false, false],
            [3, 0, 2, false, 56, 68, false, false],
            [3, 0, 0, false, 40, 68, false, false],
            [0, 2, 6, false, 72, 44, false, false],
            [0, 4, 6, false, 72, 68, false, false],
            [0, 6, 6, false, 80, 44, false, false],
            [0, 6, 6, false, 80, 68, false, false]

        ]
    },
    {
        name: "Growing Pipe",
        palette: 0,
        renderSequence: [
            [3, 4, 2, false, 48, 56, false, false],
            [3, 6, 2, false, 64, 56, false, false]

        ]
    },
    {
        name: "Goal Point Question Sphere (Orb)",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 56, 56, true, false]

        ]
    },
    {
        name: "Monty Mole (ground)",
        palette: 0,
        renderSequence: [
            [3, 8, 0, true, 32, 64, false, false],
            [3, 9, 0, true, 40, 64, false, false],
            [3, 6, 0, false, 32, 44, false, false],
            [3, 4, 0, false, 52, 56, false, false],
            [3, 2, 0, false, 72, 56, false, false]

        ]
    },
    {
        name: "Monty Mole (ledge)",
        palette: 0,
        renderSequence: [
            [3, 12, 0, false, 36, 64, false, false],
            [3, 6, 0, false, 36, 44, false, false],
            [3, 2, 0, false, 56, 56, false, false],
            [3, 4, 0, false, 76, 56, false, false]

        ]
    },
    {
        name: "Ninji",
        palette: 0,
        renderSequence: [
            [3, 7, 2, false, 68, 56, false, false],
            [3, 9, 2, false, 44, 56, false, false]

        ]
    },
    {
        name: "Moving Ghost House Hole",
        palette: 0,
        renderSequence: [
            [3, 11, 6, false, 40, 56, true, false],
            [3, 10, 6, false, 56, 56, false, false],
            [3, 11, 6, false, 72, 56, false, false]

        ]
    },
    {
        name: "Revolving Net Door",
        palette: 0,
        renderSequence: [
            [2, 0, 0, false, 24, 24, false, false],
            [2, 0, 1, false, 24, 40, false, false],
            [2, 0, 0, false, 24, 48, false, true],
            [2, 0, 0, false, 48, 24, true, false],
            [2, 0, 0, false, 48, 48, true, true],
            [2, 2, 2, true, 40, 40, false, false],
            [2, 1, 0, false, 40, 24, false, false],
            [2, 1, 0, false, 40, 48, false, true],
            [2, 0, 1, false, 48, 40, true, false],
            [2, 5, 0, false, 68, 24, false, false],
            [2, 5, 0, false, 84, 24, true, false],
            [2, 5, 1, false, 68, 40, false, false],
            [2, 5, 1, false, 84, 40, true, false],
            [2, 5, 0, false, 68, 48, false, true],
            [2, 5, 0, false, 84, 48, true, true],
            [2, 5, 0, false, 32, 64, false, false],
            [2, 5, 0, false, 40, 64, true, false],
            [2, 5, 1, false, 32, 80, false, false],
            [2, 5, 1, false, 40, 80, true, false],
            [2, 5, 0, false, 32, 88, false, true],
            [2, 5, 0, true, 48, 96, true, true],
            [2, 3, 0, false, 80, 64, false, false],
            [2, 3, 1, false, 80, 80, false, false],
            [2, 3, 0, true, 80, 96, false, true]

        ]
    },
    {
        name: "Checkerboard Platform",
        palette: 0,
        renderSequence: [
            [3, 10, 6, false, 24, 60, false, false],
            [3, 11, 6, false, 40, 60, false, false],
            [3, 11, 6, false, 56, 60, false, false],
            [3, 11, 6, false, 72, 60, false, false],
            [3, 12, 6, false, 88, 60, false, false]

        ]
    },
    {
        name: "Rock Platform",
        palette: 0,
        renderSequence: [
            [3, 5, 0, false, 40, 48, false, false],
            [3, 6, 0, false, 56, 48, false, false],
            [3, 5, 0, false, 72, 48, true, false],
            [3, 8, 0, false, 48, 64, false, false],
            [3, 8, 0, false, 64, 64, true, false]

        ]
    },
    {
        name: "Sinking Rock Platform",
        palette: 0,
        renderSequence: [
            [3, 5, 0, false, 40, 48, false, false],
            [3, 6, 0, false, 56, 48, false, false],
            [3, 5, 0, false, 72, 48, true, false]

        ]
    },
    {
        name: "Grey / Brown Platforms",
        palette: 0,
        renderSequence: [
            [2, 0, 6, false, 40, 68, false, false],
            [2, 1, 6, false, 56, 68, false, false],
            [2, 2, 6, false, 72, 68, false, false],
            [2, 0, 6, false, 32, 44, false, false],
            [2, 1, 6, false, 48, 44, false, false],
            [2, 1, 6, false, 64, 44, false, false],
            [2, 2, 6, false, 80, 44, false, false]

        ]
    },
    {
        name: "Rotating Brown / Grey Platforms",
        palette: 0,
        renderSequence: [
            [3, 2, 2, false, 56, 24, false, false],
            [2, 1, 6, false, 48, 20, false, false],
            [2, 1, 6, false, 64, 20, false, false],
            [2, 0, 6, false, 32, 20, false, false],
            [2, 2, 6, false, 80, 20, false, false],
            [3, 2, 2, false, 66, 36, false, false],
            [3, 2, 2, false, 76, 48, false, false],
            [3, 2, 2, false, 86, 60, false, false],
            [3, 2, 2, false, 96, 72, false, false],
            [3, 2, 2, false, 56, 96, false, false],
            [3, 2, 2, false, 48, 82, false, false],
            [3, 2, 2, false, 40, 68, false, false],
            [2, 1, 6, false, 56, 92, false, false],
            [2, 0, 6, false, 40, 92, false, false],
            [2, 2, 6, false, 72, 92, false, false]            
        ]
    },
    {
        name: "Flattened Switch Palace Switch",
        palette: 0,
        renderSequence: [
            [3, 0, 0, false, 48, 56, false, false],
            [3, 0, 0, false, 64, 56, true, false]

        ]
    },
    {
        name: "Switch Palace Blocks Message",
        palette: 0,
        renderSequence: [
            [2, 7, 2, true, 72, 56, false, false],
            [2, 7, 2, true, 80, 56, true, false],
            [2, 7, 3, true, 72, 64, false, false],
            [2, 7, 3, true, 80, 64, true, false],
            [2, 13, 2, true, 40, 56, false, false],
            [2, 13, 2, true, 48, 56, true, false],
            [2, 13, 2, true, 40, 64, false, true],
            [2, 13, 2, true, 48, 64, true, true]

        ]
    },
    {
        name: "Floating Skull Platform",
        palette: 0,
        renderSequence: [
            [3, 0, 6, false, 48, 44, false, false],
            [3, 0, 6, false, 32, 44, false, false],
            [3, 0, 6, false, 64, 44, false, false],
            [3, 0, 6, false, 80, 44, false, false],
            [3, 2, 6, false, 32, 68, false, false],
            [3, 2, 6, false, 48, 68, false, false],
            [3, 2, 6, false, 64, 68, false, false],
            [3, 2, 6, false, 80, 68, false, false]

        ]
    },
    {
        name: "Rope Mechanism",
        palette: 0,
        renderSequence: [
            [3, 0, 4, false, 36, 32, false, false],
            [3, 2, 4, false, 56, 32, false, false],
            [3, 0, 6, false, 76, 32, false, false],
            [3, 14, 4, false, 36, 48, false, false],
            [3, 14, 4, false, 56, 48, false, false],
            [3, 14, 4, false, 76, 48, false, false],
            [3, 14, 4, false, 36, 64, false, false],
            [3, 14, 4, false, 56, 64, false, false],
            [3, 14, 4, false, 76, 64, false, false],
            [3, 14, 4, false, 36, 80, false, false],
            [3, 14, 4, false, 56, 80, false, false],
            [3, 14, 4, false, 76, 80, false, false],
            [3, 14, 5, false, 36, 96, false, false],
            [3, 14, 5, false, 56, 96, false, false],
            [3, 14, 5, false, 76, 96, false, false]

        ]
    },
    {
        name: "Grinder",
        palette: 0,
        renderSequence: [
            [2, 12, 6, false, 28, 48, false, false],
            [2, 12, 6, false, 44, 48, true, false],
            [2, 12, 6, false, 28, 64, false, true],
            [2, 12, 6, false, 44, 64, true, true],
            [2, 14, 6, false, 68, 48, false, false],
            [2, 14, 6, false, 84, 48, true, false],
            [2, 14, 6, false, 68, 64, false, true],
            [2, 14, 6, false, 84, 64, true, true]

        ]
    },
    {
        name: "Chainsaw",
        palette: 0,
        renderSequence: [
            [3, 14, 2, false, 32, 56, false, false],
            [3, 14, 0, false, 32, 40, false, false],
            [3, 14, 2, false, 56, 60, false, false],
            [3, 14, 0, false, 56, 44, false, false],
            [3, 14, 2, false, 80, 56, false, false],
            [3, 14, 0, false, 80, 40, false, false],
            [3, 0, 4, false, 32, 68, false, false],
            [3, 2, 4, false, 56, 68, false, false],
            [3, 0, 6, false, 80, 68, false, false]

        ]
    },
    {
        name: "Fuzzy",
        palette: 0,
        renderSequence: [
            [3, 8, 4, false, 56, 56, false, false]

        ]
    },
    {
        name: "Coin Game Cloud",
        palette: 0,
        renderSequence: [
            [0, 0, 6, false, 44, 56, false, false],
            [2, 13, 4, true, 48, 60, false, false],
            [1, 2, 4, false, 68, 56, false, false]

        ]
    },
    {
        name: "Dino-Rhino",
        palette: 0,
        renderSequence: [
            [3, 0, 4, false, 28, 48, false, false],
            [3, 0, 6, false, 28, 64, false, false],
            [3, 2, 4, false, 44, 48, false, false],
            [3, 2, 6, false, 44, 64, false, false],
            [3, 4, 6, false, 68, 64, false, false],
            [3, 6, 6, false, 84, 64, false, false],
            [3, 0, 4, false, 68, 48, false, false],
            [3, 2, 4, false, 84, 48, false, false]

        ]
    },
    {
        name: "Dino-Torch",
        palette: 0,
        renderSequence: [
            [3, 0, 0, false, 24, 68, false, false],
            [3, 2, 0, false, 32, 68, false, false],
            [3, 4, 0, false, 44, 68, false, false],
            [3, 6, 0, false, 56, 68, false, false],
            [3, 4, 4, false, 64, 68, false, false],
            [3, 8, 0, false, 84, 28, false, false],
            [3, 10, 0, false, 84, 36, false, false],
            [3, 12, 0, false, 84, 48, false, false],
            [3, 14, 0, false, 84, 60, false, false],
            [3, 6, 4, false, 84, 68, false, false],
            [3, 10, 2, false, 24, 44, false, false],
            [3, 10, 6, false, 44, 44, false, false],
            [3, 12, 2, false, 64, 44, false, false]

        ]
    },
    {
        name: "Pokey",
        palette: 0,
        renderSequence: [
            [3, 8, 6, false, 56, 88, false, false],
            [3, 8, 6, false, 54, 72, false, false],
            [3, 8, 6, false, 56, 56, false, false],
            [3, 8, 6, false, 54, 40, false, false],
            [3, 10, 0, false, 56, 24, false, false]
        ]
    },
    {
        name: "Super Koopa (Ground)",
        palette: 0,
        renderSequence: [
            [1, 0, 6, false, 8, 44, false, false],
            [3, 8, 4, true, 16, 44, false, false],
            [3, 8, 5, true, 16, 52, false, false],
            [3, 0, 5, true, 24, 52, false, false],
            [1, 2, 6, false, 36, 44, false, false],
            [3, 9, 4, true, 44, 44, false, false],
            [3, 9, 5, true, 44, 52, false, false],
            [3, 0, 4, true, 52, 52, false, false],
            [1, 0, 6, false, 64, 44, false, false],
            [3, 4, 6, true, 72, 40, false, false],
            [3, 5, 6, true, 80, 40, false, false],
            [1, 2, 6, false, 92, 44, false, false],
            [3, 4, 7, true, 100, 40, false, false],
            [3, 5, 7, true, 108, 40, false, false],
            [3, 0, 6, false, 8, 68, false, false],
            [3, 2, 7, true, 24, 76, false, false],
            [3, 4, 6, true, 16, 72, false, false],
            [3, 5, 6, true, 24, 72, false, false],
            [3, 0, 6, false, 36, 68, false, false],
            [3, 2, 7, true, 52, 76, false, false],
            [3, 4, 7, true, 44, 72, false, false],
            [3, 5, 7, true, 52, 72, false, false],
            [1, 15, 4, true, 68, 68, false, false],
            [1, 15, 4, true, 92, 68, false, false],
            [1, 0, 6, false, 68, 68, false, true],
            [1, 0, 6, false, 92, 68, false, true],
            [3, 10, 4, true, 76, 76, false, true],
            [3, 10, 5, true, 76, 68, false, true],
            [3, 11, 4, true, 100, 76, false, true],
            [3, 11, 5, true, 100, 68, false, true]

        ]
    },
    {
        name: "Super Koopa (Flying)",
        palette: 0,
        renderSequence: [
            [3, 0, 6, false, 12, 56, false, false],
            [3, 2, 7, true, 28, 64, false, false],
            [3, 4, 6, true, 20, 60, false, false],
            [3, 5, 6, true, 28, 60, false, false],
            [3, 0, 6, false, 40, 56, false, false],
            [3, 2, 7, true, 56, 64, false, false],
            [3, 4, 7, true, 48, 60, false, false],
            [3, 5, 7, true, 56, 60, false, false],
            [1, 15, 4, true, 68, 56, false, false],
            [1, 0, 6, false, 68, 56, false, true],
            [3, 10, 4, true, 76, 64, false, true],
            [3, 10, 5, true, 76, 56, false, true],
            [1, 15, 4, true, 92, 56, false, false],
            [1, 0, 6, false, 92, 56, false, true],
            [3, 11, 4, true, 100, 64, false, true],
            [3, 11, 5, true, 100, 56, false, true]

        ]
    },
    {
        name: "Firework",
        palette: 0,
        renderSequence: [
            [3, 12, 6, true, 48, 52, false, false],
            [3, 13, 6, true, 56, 52, false, false],
            [3, 14, 0, true, 64, 52, false, false],
            [3, 15, 0, true, 72, 52, false, false],
            [2, 5, 3, true, 48, 68, false, false],
            [3, 7, 4, true, 56, 68, false, false],
            [2, 4, 3, true, 64, 68, false, false],
            [2, 4, 2, true, 72, 68, false, false]

        ]
    },
    {
        name: "Peach",
        palette: 0,
        renderSequence: [
            [1, 2, 0, false, 16, 44, false, false],
            [1, 2, 2, false, 16, 60, false, false],
            [1, 3, 0, false, 24, 44, false, false],
            [1, 3, 2, false, 24, 60, false, false],
            [3, 10, 2, false, 40, 60, false, false],
            [2, 8, 6, false, 48, 60, false, false],
            [3, 10, 0, false, 40, 44, false, false],
            [3, 11, 0, false, 48, 44, false, false],
            [3, 10, 2, false, 64, 60, false, false],
            [2, 8, 6, false, 72, 60, false, false],
            [3, 3, 0, false, 64, 44, false, false],
            [3, 4, 0, false, 72, 44, false, false],
            [3, 0, 0, false, 88, 56, false, false],
            [3, 1, 0, false, 96, 56, false, false],
            [3, 10, 0, false, 88, 40, false, false],
            [3, 11, 0, false, 96, 40, false, false]

        ]
    },
    {
        name: "Peach Ending Cutscene Text",
        palette: 0,
        slot1: "GFX0D",
        renderSequence: [
            [1, 8, 0, true, 32, 36, false, false],
            [1, 10, 0, true, 40, 36, false, false],
            [1, 11, 0, true, 48, 36, false, false],
            [1, 12, 0, true, 56, 36, false, false],
            [1, 13, 0, true, 64, 36, false, false],
            [1, 14, 0, true, 72, 36, false, false],
            [1, 8, 1, true, 80, 36, false, false],
            [1, 9, 1, true, 88, 36, false, false],
            [1, 14, 1, true, 32, 44, false, false],
            [1, 8, 2, true, 40, 44, false, false],
            [1, 11, 2, true, 48, 44, false, false],
            [1, 12, 2, true, 56, 44, false, false],
            [1, 13, 2, true, 64, 44, false, false],
            [1, 14, 2, true, 72, 44, false, false],
            [1, 15, 2, true, 80, 44, false, false],
            [1, 10, 3, true, 88, 44, false, false],
            [1, 13, 3, true, 32, 52, false, false],
            [1, 14, 3, true, 40, 52, false, false],
            [1, 15, 3, true, 48, 52, false, false],
            [1, 0, 2, true, 56, 52, false, false],
            [1, 1, 2, true, 64, 52, false, false],
            [1, 0, 3, true, 72, 52, false, false],
            [1, 14, 2, true, 40, 68, false, false],
            [1, 14, 1, true, 48, 68, false, false],
            [1, 14, 2, true, 56, 68, false, false],
            [1, 12, 2, true, 64, 68, false, false],
            [1, 12, 0, true, 72, 68, false, false],
            [1, 11, 0, true, 80, 68, false, false],
            [1, 9, 0, true, 36, 80, false, false],
            [1, 10, 1, true, 44, 80, false, false],
            [1, 11, 1, true, 52, 80, false, false],
            [1, 12, 1, true, 60, 80, false, false],
            [1, 13, 1, true, 68, 80, false, false],
            [1, 9, 2, true, 76, 80, false, false],
            [1, 10, 2, true, 84, 80, false, false],
            [1, 8, 3, true, 36, 88, false, false],
            [1, 9, 3, true, 44, 88, false, false],
            [1, 11, 3, true, 52, 88, false, false],
            [1, 12, 3, true, 60, 88, false, false]

        ]
    },
    {
        name: "Wiggler",
        palette: 0,
        renderSequence: [
            [3, 6, 4, false, 68, 44, false, false],
            [3, 4, 4, false, 60, 44, false, false],
            [3, 6, 4, false, 52, 44, false, false],
            [3, 8, 4, false, 44, 44, false, false],
            [3, 12, 0, false, 36, 44, false, false],
            [3, 8, 1, true, 40, 36, false, false],
            [3, 4, 4, false, 68, 68, false, false],
            [3, 6, 4, false, 60, 68, false, false],
            [3, 8, 4, false, 52, 68, false, false],
            [3, 6, 4, false, 44, 68, false, false],
            [3, 12, 0, false, 36, 68, false, false],
            [3, 8, 0, true, 40, 68, false, false]

        ]
    },
    {
        name: "Lakitu's cloud",
        palette: 0,
        renderSequence: [
            [0, 0, 6, false, 48, 52, false, false],
            [0, 0, 6, false, 64, 52, false, false],
            [0, 0, 6, false, 56, 52, true, false],
            [0, 0, 6, false, 52, 56, false, false],
            [0, 0, 6, false, 60, 56, false, false],
            [2, 13, 4, true, 60, 60, false, false]

        ]
    },
    {
        name: "Yoshi's House Bird",
        palette: 0,
        renderSequence: [
            [3, 0, 5, true, 52, 52, false, false],
            [3, 1, 5, true, 68, 52, false, false],
            [3, 2, 5, true, 52, 68, false, false],
            [3, 3, 5, true, 68, 68, false, false]

        ]
    },
    {
        name: "Yoshi's House Fireplace",
        palette: 0,
        renderSequence: [
            [3, 11, 3, true, 52, 76, false, false],
            [3, 11, 2, true, 52, 68, false, false],
            [3, 10, 1, true, 68, 76, false, false],
            [3, 4, 5, true, 68, 68, false, false],
            [3, 5, 4, false, 48, 44, false, false],
            [3, 5, 4, false, 64, 44, true, false]

        ]
    },
    {
        name: "Ghost House Exit Door",
        palette: 0,
        renderSequence: [
            [3, 0, 2, false, 8, 40, true, false],
            [3, 0, 3, false, 8, 48, true, false],
            [3, 0, 3, false, 8, 64, true, true],
            [3, 0, 2, false, 8, 72, true, true],
            [3, 0, 2, false, 24, 40, false, false],
            [3, 0, 3, false, 24, 48, false, false],
            [3, 0, 3, false, 24, 64, false, true],
            [3, 0, 2, false, 24, 72, false, true],
            [3, 3, 2, false, 48, 40, true, false],
            [3, 3, 3, false, 48, 48, true, false],
            [3, 3, 3, false, 48, 64, true, true],
            [3, 3, 2, false, 48, 72, true, true],
            [3, 3, 2, false, 64, 40, false, false],
            [3, 3, 3, false, 64, 48, false, false],
            [3, 3, 3, false, 64, 64, false, true],
            [3, 3, 2, false, 64, 72, false, true],
            [3, 2, 3, false, 88, 48, true, false],
            [3, 2, 3, false, 88, 64, true, true],
            [3, 2, 2, false, 88, 72, true, true],
            [3, 2, 2, false, 88, 40, true, false],
            [3, 2, 3, false, 104, 48, false, false],
            [3, 2, 2, false, 104, 40, false, false],
            [3, 2, 3, false, 104, 64, false, true],
            [3, 2, 2, false, 104, 72, false, true]

        ]
    },
    {
        name: "Mushroom Platforms",
        palette: 0,
        renderSequence: [
            [3, 0, 0, false, 48, 56, false, false],
            [3, 0, 0, false, 64, 56, true, false]

        ]
    },
    {
        name: "	Large Green Gas Bubble",
        palette: 0,
        renderSequence: [
            [3, 0, 0, false, 36, 32, false, false],
            [3, 2, 0, false, 52, 32, false, false],
            [3, 4, 0, false, 68, 32, false, false],
            [3, 6, 0, false, 84, 32, false, false],
            [3, 6, 2, false, 84, 48, false, false],
            [3, 6, 2, false, 84, 64, false, true],
            [3, 6, 0, false, 84, 80, false, true],
            [3, 0, 2, false, 36, 48, false, false],
            [3, 2, 2, false, 52, 48, false, false],
            [3, 4, 2, false, 68, 48, false, false],
            [3, 4, 2, false, 68, 64, false, true],
            [3, 4, 0, false, 68, 80, false, true],
            [3, 2, 0, false, 52, 80, false, true],
            [3, 0, 0, false, 36, 80, false, true],
            [3, 2, 2, false, 52, 64, false, false],
            [3, 0, 2, false, 36, 64, false, true]

        ]
    },
    {
        name: "Bouncing Rock",
        palette: 0,
        renderSequence: [
            [3, 4, 4, false, 44, 56, false, false],
            [3, 6, 4, false, 68, 56, false, false]

        ]
    },
    {
        name: "Volcano Lotus",
        palette: 0,
        renderSequence: [
            [3, 14, 4, false, 48, 68, false, false],
            [3, 14, 4, false, 64, 68, true, false],
            [3, 2, 6, true, 56, 68, false, false],
            [3, 3, 6, true, 64, 68, false, false],
            [3, 6, 2, true, 52, 40, false, false],
            [3, 6, 3, true, 68, 40, false, false],
            [3, 6, 2, true, 80, 48, false, false],
            [3, 6, 3, true, 40, 48, false, false]

        ]
    },
    {
        name: "Sumo Bro",
        palette: 0,
        renderSequence: [
            [3, 3, 4, false, 32, 44, false, false],
            [3, 1, 4, false, 16, 44, false, false],
            [3, 0, 0, false, 30, 36, false, false],
            [3, 5, 4, false, 56, 44, false, false],
            [3, 6, 4, false, 64, 44, false, false],
            [3, 14, 6, false, 60, 36, false, false],
            [3, 10, 2, false, 56, 76, false, false],
            [3, 11, 2, false, 64, 76, false, false],
            [3, 8, 1, true, 60, 68, false, false],
            [3, 9, 1, true, 68, 68, false, false],
            [3, 9, 1, true, 36, 68, false, false],
            [3, 8, 1, true, 28, 68, false, false],
            [3, 8, 2, false, 32, 76, false, false],
            [3, 7, 2, false, 24, 76, false, false],
            [3, 12, 6, false, 88, 76, false, false],
            [3, 12, 4, false, 88, 60, false, false],
            [3, 3, 7, true, 92, 44, true, true],
            [3, 3, 7, true, 92, 36, false, false]
        ]
    },
    {
        name: "Diggin' Chuck",
        palette: 0,
        renderSequence: [
            [3, 2, 6, false, 12, 56, false, false],
            [2, 8, 2, false, 24, 56, false, false],
            [2, 9, 2, false, 32, 56, false, false],
            [2, 14, 0, false, 26, 48, false, false],
            [3, 7, 6, false, 52, 56, false, false],
            [3, 8, 6, false, 60, 56, false, false],
            [2, 10, 0, false, 56, 48, false, false],
            [3, 0, 2, false, 76, 48, false, false],
            [3, 2, 0, false, 92, 56, false, false],
            [3, 3, 0, false, 100, 56, false, false],
            [2, 10, 0, false, 92, 46, false, false],
            [3, 4, 4, false, 44, 80, false, false],
            [3, 6, 4, false, 68, 80, false, false]

        ]
    },
    {
        name: "Chargin' Chuck",
        palette: 0,
        renderSequence: [
            [2, 6, 0, false, 50, 32, false, false],
            [2, 0, 2, false, 52, 44, false, false],
            [2, 1, 2, false, 60, 44, false, false],
            [2, 13, 1, true, 68, 36, false, false],
            [2, 12, 1, true, 60, 36, false, false],
            [2, 6, 0, false, 82, 32, false, false],
            [2, 3, 2, false, 84, 44, false, false],
            [2, 4, 2, false, 92, 44, false, false],
            [2, 12, 1, true, 92, 36, false, false],
            [2, 13, 1, true, 100, 36, false, false],
            [2, 6, 2, false, 52, 76, false, false],
            [2, 6, 2, false, 60, 76, true, false],
            [2, 8, 2, false, 84, 76, false, false],
            [2, 9, 2, false, 92, 76, false, false],
            [2, 6, 0, false, 84, 68, false, false],
            [2, 10, 0, false, 56, 68, false, false],
            [2, 0, 4, false, 20, 40, false, false],
            [2, 0, 4, false, 28, 40, true, false],
            [2, 12, 0, true, 18, 32, false, false],
            [2, 12, 0, true, 38, 32, true, false],
            [2, 14, 0, false, 24, 28, false, false],
            [2, 4, 6, false, 20, 76, false, false],
            [2, 4, 6, false, 28, 76, true, false],
            [2, 14, 0, false, 24, 68, false, false]
        ]
    },
    {
        name: "Clappin' Chuck",
        palette: 0,
        renderSequence: [
            [2, 13, 2, false, 20, 60, false, false],
            [2, 13, 2, false, 28, 60, true, false],
            [2, 6, 0, false, 24, 56, false, false],
            [2, 0, 4, false, 52, 60, false, false],
            [2, 0, 4, false, 60, 60, true, false],
            [2, 12, 0, true, 50, 52, false, false],
            [2, 12, 0, true, 70, 52, true, false],
            [2, 6, 0, false, 56, 48, false, false],
            [2, 2, 4, false, 80, 60, false, false],
            [2, 2, 4, false, 96, 60, true, false],
            [2, 4, 4, false, 88, 44, false, false]
        ]
    },
    {
        name: "Pitchin' Chuck",
        palette: 0,
        renderSequence: [
            [2, 6, 0, false, 24, 68, false, false],
            [3, 13, 2, true, 26, 84, false, false],
            [2, 14, 4, false, 32, 76, false, false],
            [2, 13, 0, true, 24, 82, false, false],
            [2, 6, 0, false, 54, 66, false, false],
            [3, 14, 2, false, 60, 76, false, false],
            [3, 13, 2, true, 61, 64, false, false],
            [2, 13, 5, true, 61, 68, false, false],
            [2, 6, 0, false, 80, 68, false, false],
            [3, 13, 3, true, 80, 76, false, false],
            [3, 4, 2, false, 88, 76, false, false],
            [2, 6, 0, false, 24, 32, false, false],
            [3, 0, 2, false, 28, 42, false, false],
            [3, 13, 2, true, 34, 28, false, false],
            [2, 13, 5, true, 34, 34, false, false],
            [2, 6, 0, false, 52, 32, false, false],
            [3, 0, 2, false, 56, 42, false, false],
            [3, 13, 2, true, 66, 30, false, false],
            [2, 12, 0, true, 64, 34, true, false],
            [2, 6, 0, false, 80, 32, false, false],
            [3, 2, 2, false, 88, 40, false, false],
            [3, 13, 3, true, 80, 40, false, false]

        ]
    },
    {
        name: "Kickin' Chuck",
        palette: 0,
        renderSequence: [
            [2, 6, 0, false, 80, 52, false, false],
            [2, 14, 4, false, 88, 60, false, false],
            [2, 13, 0, true, 80, 66, false, false],
            [2, 6, 0, false, 50, 50, false, false],
            [3, 12, 4, false, 56, 60, false, false],
            [3, 11, 4, true, 48, 64, false, false],
            [0, 12, 7, true, 32, 52, false, false],
            [0, 13, 7, true, 40, 52, false, false],
            [0, 13, 7, true, 32, 60, true, true],
            [0, 12, 7, true, 40, 60, true, true],
            [3, 10, 0, false, 20, 40, false, false]
        ]
    },
    {
        name: "Whistlin' Chuck",
        palette: 0,
        renderSequence: [
            [2, 6, 2, false, 20, 56, false, false],
            [2, 6, 2, false, 28, 56, true, false],
            [2, 6, 0, false, 24, 48, false, false],
            [2, 0, 4, false, 52, 56, false, false],
            [2, 0, 4, false, 60, 56, true, false],
            [2, 0, 4, false, 84, 56, false, false],
            [2, 0, 4, false, 92, 56, true, false],
            [2, 12, 0, true, 50, 48, false, false],
            [2, 12, 0, true, 82, 48, false, false],
            [2, 12, 0, true, 70, 48, true, false],
            [2, 12, 0, true, 102, 48, true, false],
            [2, 11, 4, false, 56, 44, false, false],
            [2, 14, 0, false, 88, 44, false, false]
        ]
    },
    {
        name: "Splittin' / Jumpin' Chucks",
        palette: 0,
        renderSequence: [
            [2, 13, 2, false, 60, 56, true, false],
            [2, 13, 2, false, 52, 56, false, false],
            [2, 6, 0, false, 56, 52, false, false],
            [2, 6, 2, false, 32, 56, true, false],
            [2, 6, 2, false, 24, 56, false, false],
            [2, 6, 0, false, 28, 48, false, false],
            [2, 0, 4, false, 80, 56, false, false],
            [2, 0, 4, false, 88, 56, true, false],
            [2, 12, 0, true, 78, 48, false, false],
            [2, 12, 0, true, 98, 48, true, false],
            [2, 6, 0, false, 84, 44, false, false]
        ]
    },
    {
        name: "Amazing Flying Hammer Brother",
        palette: 0,
        renderSequence: [
            [2, 6, 4, false, 48, 60, false, false],
            [2, 8, 4, false, 64, 60, false, false],
            [2, 10, 4, true, 64, 52, false, false],
            [2, 10, 5, true, 56, 52, false, false],
            [2, 13, 6, false, 32, 40, false, false],
            [2, 8, 0, false, 80, 32, false, false]
        ]
    },
    {
        name: "Bubble",
        palette: 0,
        renderSequence: [
            [3, 0, 2, false, 48, 64, false, true],
            [3, 0, 2, false, 48, 48, false, false],
            [3, 0, 2, false, 64, 48, true, false],
            [3, 0, 2, false, 64, 64, true, true],
            [3, 9, 1, true, 56, 56, false, false],
        ]
    },
    {
        name: "Ball n' Chain",
        palette: 0,
        renderSequence: [
            [3, 8, 6, false, 68, 68, false, false],
            [3, 8, 6, false, 56, 56, false, false],
            [3, 10, 6, false, 44, 48, true, true],
            [3, 10, 6, false, 28, 48, false, true],
            [3, 10, 6, false, 28, 32, false, false],
            [3, 10, 6, false, 44, 32, true, false]
        ]
    },
    {
        name: "Banzai Bill",
        palette: 0,
        renderSequence: [
            [3, 0, 0, false, 28, 32, false, false],
            [3, 2, 0, false, 44, 32, false, false],
            [3, 4, 0, false, 60, 32, false, false],
            [3, 6, 0, false, 76, 32, false, false],
            [3, 0, 2, false, 28, 48, false, false],
            [3, 8, 0, false, 44, 48, false, false],
            [3, 0, 4, false, 28, 64, false, false],
            [3, 2, 4, false, 44, 64, false, false],
            [3, 14, 0, false, 28, 80, false, false],
            [3, 14, 2, false, 44, 80, false, false],
            [3, 14, 4, false, 60, 48, false, false],
            [3, 14, 4, false, 60, 64, false, false],
            [3, 14, 6, false, 76, 48, false, false],
            [3, 14, 6, false, 76, 64, false, false],
            [3, 4, 0, false, 60, 80, false, true],
            [3, 6, 0, false, 76, 80, false, true]
        ]
    },
    {
        name: "Big Steely",
        palette: 0,
        renderSequence: [
            [2, 5, 4, false, 40, 40, false, false],
            [2, 7, 4, false, 56, 40, false, false],
            [2, 5, 4, false, 72, 40, true, false],
            [2, 5, 6, false, 40, 56, false, false],
            [2, 6, 6, false, 56, 56, false, false],
            [2, 5, 6, false, 72, 56, true, false],
            [2, 5, 4, false, 72, 72, true, true],
            [2, 7, 4, false, 56, 72, true, true],
            [2, 5, 4, false, 40, 72, false, true],
            [2, 3, 6, false, 48, 48, false, false]
        ]
    },
    {
        name: "Mechakoopa",
        palette: 0,
        renderSequence: [
            [2, 0, 4, false, 68, 20, false, false],
            [2, 12, 0, false, 76, 28, false, false],
            [2, 0, 4, false, 36, 20, false, false],
            [2, 10, 0, false, 44, 28, false, false],
            [2, 0, 6, true, 36, 36, false, false],
            [2, 0, 6, true, 68, 36, false, false],
            [2, 2, 4, true, 52, 20, false, false],
            [2, 2, 4, true, 84, 20, false, false],
            [2, 0, 4, false, 36, 52, false, false],
            [2, 0, 4, false, 68, 52, false, false],
            [2, 14, 0, false, 44, 60, false, false],
            [2, 1, 5, false, 76, 60, false, false],
            [2, 0, 6, true, 36, 68, false, false],
            [2, 0, 6, true, 68, 68, false, false],
            [2, 2, 4, true, 52, 52, false, false],
            [2, 2, 4, true, 84, 52, false, false],
            [2, 1, 7, true, 58, 62, false, false],
            [2, 0, 7, true, 90, 60, false, false],
            [2, 2, 7, true, 90, 28, false, false],
            [2, 1, 7, true, 58, 30, false, false],
            [2, 0, 0, false, 36, 88, false, false],
            [2, 1, 0, false, 44, 88, false, false],
            [2, 1, 0, false, 76, 88, false, false],
            [2, 0, 0, false, 68, 88, false, false],
            [2, 0, 7, true, 58, 88, false, false],
            [2, 2, 7, true, 90, 88, false, false]
        ]
    },
    {
        name: "Sea Mine",
        palette: 0,
        renderSequence: [
            [3, 10, 2, false, 28, 48, false, false],
            [3, 10, 2, false, 44, 48, true, false],
            [3, 10, 2, false, 44, 64, true, true],
            [3, 10, 2, false, 28, 64, false, true],
            [3, 12, 2, false, 68, 48, false, false],
            [3, 12, 2, false, 84, 48, true, false],
            [3, 12, 2, false, 84, 64, true, true],
            [3, 12, 2, false, 68, 64, false, true]
            ]
    },
    {
        name: "Sparky",
        palette: 0,
        renderSequence: [
            [2, 10, 0, false, 56, 56, false, false]
            ]
    },
    {
        name: "Hothead",
        palette: 0,
        renderSequence: [
            [2, 12, 0, false, 28, 48, false, false],
            [2, 14, 0, false, 44, 48, false, false],
            [2, 14, 0, false, 28, 64, true, true],
            [2, 12, 0, false, 44, 64, true, true],
            [2, 14, 0, false, 68, 48, true, false],
            [2, 14, 0, false, 84, 64, false, true],
            [2, 12, 0, false, 84, 48, true, false],
            [2, 12, 0, false, 68, 64, false, true],
            [2, 9, 0, true, 36, 56, false, false],
            [2, 9, 1, true, 76, 56, false, false]            
            ]
    },
    {
        name: "Blargg",
        palette: 0,
        renderSequence: [
            [3, 2, 2, false, 28, 48, false, false],
            [3, 4, 2, false, 44, 48, false, false],
            [3, 2, 4, false, 28, 64, false, false],
            [3, 4, 4, false, 44, 64, false, false],
            [3, 6, 2, false, 60, 64, false, false],
            [3, 6, 6, false, 76, 64, false, false],
            [3, 8, 4, false, 92, 64, false, false],
            [3, 6, 2, false, 108, 64, false, false],
            [3, 4, 2, false, 92, 48, false, false],
            [3, 2, 2, false, 76, 48, false, false],
            [3, 0, 2, false, 8, 64, false, false]
        ]
    },
    {
        name: "",
        palette: 0,
        renderSequence: []
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
const gfxIndexes = [0, 1, 14, 3]
const gfxBitmaps = [];
const scale = 3;

let selectedTile = -1
let selected8x8 = true
let selectedXFlip = false
let selectedYFlip = false
let mouseX, mouseY

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
        if (e.ctrlKey) {
            x = Math.floor(e.offsetX / (8 * scale))
            y = Math.floor(e.offsetY / (8 * scale))
            selected8x8 = true
        } else {
            x = Math.floor((e.offsetX - 8) / (8 * scale))
            y = Math.floor((e.offsetY - 8) / (8 * scale))
            selected8x8 = false
        }
        selectedTile = x + y * 16
        selectedXFlip = false
        selectedYFlip = false
        renderGfxCanvas();
        e.preventDefault();
    }
    gfxCanvas.onmousemove = function (e) {
        renderGfxCanvas();
        let x, y
        if (e.ctrlKey) {
            x = Math.floor(e.offsetX / (8 * scale))
            y = Math.floor(e.offsetY / (8 * scale))
        } else {
            x = Math.floor(e.offsetX / (8 * scale) - 0.5)
            y = Math.floor(e.offsetY / (8 * scale) - 0.5)
        }
        gfxCtx.beginPath()
        gfxCtx.lineWidth = 1;
        gfxCtx.strokeStyle = 'white';
        if (e.ctrlKey) {
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
                x = Math.floor(e.offsetX / scale - 4)
                y = Math.floor(e.offsetY / scale - 4)
            } else {
                x = Math.floor(e.offsetX / scale - 8)
                y = Math.floor(e.offsetY / scale - 8)
            }
            if (e.shiftKey) {
                x = Math.floor(x / 2 + 0.5) * 2
                y = Math.floor(y / 2 + 0.5) * 2
            } else {
                x = Math.floor(x / 4 + 0.5) * 4
                y = Math.floor(y / 4 + 0.5) * 4
            }

            currentSprite.renderSequence.push([
                Math.floor(selectedTile / 128),
                selectedTile % 16,
                Math.floor(selectedTile / 16) % 8,
                selected8x8,
                x,
                y,
                selectedXFlip,
                selectedYFlip
            ])
        }
        renderSpriteCanvas();
        e.preventDefault();
    }
    spriteCanvas.onmousemove = function (e) {
        if (selected8x8) {
            mouseX = Math.floor(e.offsetX / scale - 4)
            mouseY = Math.floor(e.offsetY / scale - 4)
        } else {
            mouseX = Math.floor(e.offsetX / scale - 8)
            mouseY = Math.floor(e.offsetY / scale - 8)
        }
        if (e.shiftKey) {
            mouseX = Math.floor(mouseX / 2 + 0.5) * 2
            mouseY = Math.floor(mouseY / 2 + 0.5) * 2
        } else {
            mouseX = Math.floor(mouseX / 4 + 0.5) * 4
            mouseY = Math.floor(mouseY / 4 + 0.5) * 4
        }
        renderSpriteCanvas();
    }
    spriteCanvas.onmouseleave = function (e) {
        mouseX = -999
        mouseY = -999
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
                currentSprite.renderSequence.forEach((step) => { step[4] -= 4 })
                renderSpriteCanvas()
                e.preventDefault()
                break;
            case "ArrowRight":
                currentSprite.renderSequence.forEach((step) => { step[4] += 4 })
                renderSpriteCanvas()
                e.preventDefault()
                break;
            case "ArrowUp":
                currentSprite.renderSequence.forEach((step) => { step[5] -= 4 })
                renderSpriteCanvas()
                e.preventDefault()
                break;
            case "ArrowDown":
                currentSprite.renderSequence.forEach((step) => { step[5] += 4 })
                renderSpriteCanvas()
                e.preventDefault()
                break;
            default:
        }

    }

    document.getElementById("copyButton").onclick = function (e) {
        unsecuredCopyToClipboard(`\n${currentSprite.renderSequence.map(step => `[${step.join(', ')}]`).join(',\n')}\n`)
    }

    document.onwheel = function (e) {
        if (selectedXFlip == selectedYFlip == e.deltaY > 0) {
            selectedXFlip = !selectedXFlip
        } else {
            selectedYFlip = !selectedYFlip
        }
        renderSpriteCanvas()
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

        spriteCtx.translate(x, y);
        spriteCtx.scale(xScale, yScale);
        spriteCtx.translate(-x, -y);

        spriteCtx.drawImage(bitmap, tx * 8, ty * 8, size, size, x, y, size * xScale, size * yScale);

        spriteCtx.restore();
    }

    // draw mouse
    if (selectedTile > -1) {
        const tx = selectedTile % 16
        const ty = Math.floor(selectedTile / 16) % 8
        const size = selected8x8 ? 8 : 16
        const bitmap = gfxBitmaps[Math.floor(selectedTile / 128)];
        const xScale = selectedXFlip ? -1 : 1
        const yScale = selectedYFlip ? -1 : 1

        spriteCtx.save();

        spriteCtx.globalAlpha = 0.5;

        spriteCtx.translate(mouseX, mouseY);
        spriteCtx.scale(xScale, yScale);
        spriteCtx.translate(-mouseX, -mouseY);

        spriteCtx.drawImage(bitmap, tx * 8, ty * 8, size, size, mouseX, mouseY, size * xScale, size * yScale);

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