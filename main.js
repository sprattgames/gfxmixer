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
[ ] sprite images
[ ] "passable" conflict detection (pokey head football, bone spiny etc)
[ ]     show all animation frames, variations etc
[ ] checkbox for lava particles


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
        id: 0x0D,
        name: "Bob-Omb",
        palette: 1,
        tiles: [316, 330, 331, 332, 333, 346, 347, 348, 349],
        gfxTiles: [
            {
                slot: 2,
                validGfxFiles: ["GFX02"],
            }
        ],
        renderSequence: [
            // [ tile, x, y, small, flipx, flipy ]
        ]
    }
]

//  ==============================================================

let activePaletteIndex = 2;
const scale = 2;
const allGfx = [];
const gfxIndexes = [0, 1, 2, 3]
const gfxBitmaps = [];

let selectedTile = -1
let selected8x8 = true

let currentSprite = allSprites[0]

let gfxCtx, spriteCtx

//  ==============================================================


//  ==============================================================

window.onload = async function () {
    const gfxCanvas = document.getElementById("gfxCanvas");
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
    spriteCtx = spriteCanvas.getContext("2d");
    spriteCanvas.onclick = function (e) {
        if (selectedTile) {
            let x, y
            if (selected8x8) {
                x = Math.floor(e.offsetX / (8 * scale))
                y = Math.floor(e.offsetY / (8 * scale))
            } else {
                x = Math.floor((e.offsetX - 8) / (8 * scale))
                y = Math.floor((e.offsetY - 8) / (8 * scale))
            }
            currentSprite.renderSequence.push([
                Math.floor(selectedTile / 128),
                selectedTile % 16,
                Math.floor(selectedTile / 16) % 8,
                selected8x8,
                x,
                y,
                false,
                false
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
                x = Math.floor(e.offsetX / (8 * scale))
                y = Math.floor(e.offsetY / (8 * scale))
            } else {
                x = Math.floor((e.offsetX - 8) / (8 * scale))
                y = Math.floor((e.offsetY - 8) / (8 * scale))
            }
            const tx = selectedTile % 16
            const ty = Math.floor(selectedTile / 16) % 8
            const size = selected8x8 ? 8 : 16
            const bitmap = gfxBitmaps[Math.floor(selectedTile / 128)];
            spriteCtx.globalAlpha = 0.5
            spriteCtx.drawImage(bitmap, tx * 8, ty * 8, size, size, x * 8, y * 8, size, size)
            spriteCtx.globalAlpha = 1
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

    document.getElementById("copyButton").onclick = function (e) {
        // selectedTiles.sort((a, b) => a - b)
        // unsecuredCopyToClipboard(`${selectedTiles.join(', ')}`)

        renderGfxCanvas()
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

    for (let i = 0; i < currentSprite.renderSequence.length; i++) {
        const [slot, tx, ty, is8x8, x, y, xFlip, yFlip] = currentSprite.renderSequence[i]
        const size = is8x8 ? 8 : 16
        const bitmap = gfxBitmaps[slot];
        spriteCtx.drawImage(bitmap, tx * 8, ty * 8, size, size, x * 8, y * 8, size, size)
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
