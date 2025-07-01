/*  TODO
[x] load gfx files
[x] draw gfx to screen
[x] select palette
[ ] list of sprites and their palettes/locations/compatibility
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
const palettes = [
    ["#0000","#f8f8f8","#000000","#885818","#d8a038","#f8d870","#f8c898","#e800b0","#500000","#f84070","#203088","#408098","#80d8c8","#b02860","#f87068","#f8f800"],
    ["#0000","#f8f8f8","#000000","#707070","#a0a0a0","#c0c0c0","#e0e0e0","#f81058","#0000","#f8f8f8","#000000","#00c800","#b00000","#f80000","#f85800","#f8a000"],
    ["#0000","#f8f8f8","#000000","#f87800","#f8c000","#f8f800","#b82800","#f88800","#0000","#f8f8f8","#000000","#00c800","#e81868","#f040a8","#f878c8","#f8c0f0"],
    ["#0000","#f8f8f8","#000000","#4040d8","#6868d8","#8888f8","#b82800","#f88800","#0000","#f8f8f8","#000000","#00c800","#00e000","#88f838","#c8f800","#f8f898"],
    ["#0000","#f8f8f8","#000000","#880000","#b80000","#f80000","#b82800","#f88800","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#007800","#00b800","#00f800","#b82800","#f88800","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#005050","#007878","#00a0a0","#b82800","#f88800","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#707070","#a0a0a0","#c0c0c0","#b82800","#f88800","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#a00868","#d00888","#f860c8","#b04000","#f89800","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#d8f8c0","#60c000","#588000","#a84828","#f89030","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#283048","#485058","#686858","#989040","#c0c078","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#184848","#207068","#288878","#30a088","#38b898","#f80080","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#307080","#a0d0e0","#d0f8f8","#e8f8f8","#4040d8","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#706858","#908878","#b0a890","#c8b8a0","#983858","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#8098f8","#98b0f8","#b0c8f8","#c8e0f8","#f80080","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#f8b098","#f0b0b0","#e8a8c8","#e098e0","#f80080","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#5858a0","#689898","#98e898","#f82860","#e8c068","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#908858","#688090","#402020","#505040","#685850","#787078","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
    ["#0000","#f8f8f8","#000000","#a8f8f8","#b8f8f8","#c8f8f8","#c8f8f8","#e0f8f8","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"]
];
const gfxFileNames = ["GFX00","GFX01","GFX02","GFX03","GFX04","GFX05","GFX06","GFX09","GFX0A","GFX0D","GFX0E","GFX0F","GFX11","GFX12","GFX13","GFX20","GFX22","GFX23","GFX24","GFX25"]

//  ==============================================================

let activePaletteIndex = 2;
let slot1GfxIndex = 0;
let slot2GfxIndex = 1;
const allGfx = [];

//  ==============================================================

window.onload = async function () {
    // load cached palettes, gfx etc...

    // populate palette select
    const paletteSelect = document.getElementById("paletteSelect")
    for (let i = 0; i < palettes.length; i++) {
        const option = new Option(`Palette ${i}`, i)
        paletteSelect.appendChild(option)
    }
    paletteSelect.onchange = function (e) {
        activePaletteIndex = +(e.target.value)
        drawPixelsToCanvas()
    }

    // populate gfx select
    const gfx1Select = document.getElementById("gfx1Select")
    const gfx2Select = document.getElementById("gfx2Select")
    for (let i = 0; i < gfxFileNames.length; i++) {
        gfx1Select.appendChild(new Option(gfxFileNames[i], i))
        gfx2Select.appendChild(new Option(gfxFileNames[i], i))
    }
    gfx1Select.onchange = function (e) {
        slot1GfxIndex = +(e.target.value)
        drawPixelsToCanvas()
    }
    gfx2Select.onchange = function (e) {
        slot2GfxIndex = +(e.target.value)
        drawPixelsToCanvas()
    }
    gfx1Select.value = slot1GfxIndex
    gfx2Select.value = slot2GfxIndex

    // import GFX files
    for (let i = 0; i < gfxFileNames.length; i++) {
        const blob = await fetch(`/gfx/${gfxFileNames[i]}.bin`)
        loadGfxFile(blob, gfxFileNames[i])
    };

    drawPixelsToCanvas()
};

function loadGfxFile(blob, name) {
    blob.arrayBuffer().then(((arrayBuffer) => {
        const snesBytes = new Int8Array(arrayBuffer);

        const pixels = snesToPixels(snesBytes);

        allGfx.push({ name, pixels });
    }))
}

function drawPixelsToCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.reset()
    ctx.resetTransform()
    ctx.scale(2, 2)

    // todo: createImageData from pixels

    const palette = palettes[activePaletteIndex]
    const slot1Gfx = allGfx[slot1GfxIndex]
    const slot2Gfx = allGfx[slot2GfxIndex]

    for (i = 0; i < slot1Gfx.pixels.length; i++) {
        ctx.fillStyle = palette[slot1Gfx.pixels[i]]
        ctx.fillRect(i % 256, Math.floor(i / 256), 1, 1);
    }

    for (i = 0; i < slot2Gfx.pixels.length; i++) {
        ctx.fillStyle = palette[slot2Gfx.pixels[i]]
        ctx.fillRect(i % 256, Math.floor(i / 256) + 70, 1, 1);
    }
}

// modified from https://sneslab.net/wiki/Graphics_Format
function snesToPixels(snesBytes) {
    if (snesBytes.length % 32 > 0) {
        console.log("error: weird file size, " + snesBytes.length + " bytes")
        return []
    }

    let b0, b1, b2, b3, p, mul
    let pixels = []
    let spriteIndex = 0
    while (spriteIndex < snesBytes.length) {
        const spriteX = (spriteIndex % 16) * 8
        const spriteY = Math.floor(spriteIndex / 16) * 8
        for (let i = 0; i < 8; i++) {
            mul = 1;
            b0 = snesBytes[spriteIndex * 32 + i * 2];
            b1 = snesBytes[spriteIndex * 32 + i * 2 + 1];
            b2 = snesBytes[spriteIndex * 32 + i * 2 + 16];
            b3 = snesBytes[spriteIndex * 32 + i * 2 + 17];
            for (let j = 0; j < 8; j++) {
                p = ((b0 & mul) | ((b1 & mul) << 1) | ((b2 & mul) << 2) | ((b3 & mul) << 3)) >> j;
                mul <<= 1;
                const x = spriteX + 7 - j
                const y = spriteY + i
                pixels[x + y * 256] = p
                // pixels[spriteIndex] = p
            }
        }
        spriteIndex++;
    }

    return pixels
    // for (let spriteIndex = 0; spriteIndex <= mainIndexLimit; spriteIndex += 32) {
    //     srcIndex = (mainIndex << 5);
    //     if (srcIndex + 31 >= src.length)
    //         return dest;
    //     destX = srcIndex & 0x0F;
    //     destY = srcIndex >> 4;
    //     destIndex = ((destY << 7) + destX) << 3;
    //     if (destIndex + 903 >= dest.length)
    //         return dest;
    //     for (let i = 0; i < 16; i += 2) {
    //         mul = 1;
    //         b0 = src[srcIndex + i];
    //         b1 = src[srcIndex + i + 1];
    //         b2 = src[srcIndex + i + 16];
    //         b3 = src[srcIndex + i + 17];
    //         for (let j = 0; j < 8; j++) {
    //             res = ((b0 & mul) | ((b1 & mul) << 1) | ((b2 & mul) << 2) | ((b3 & mul) << 3)) >> j
    //             dest[destIndex + (7 - j) + yAdder] = res;
    //             mul <<= 1;
    //         }
    //         yAdder += 128;
    //     }
    // }
}

