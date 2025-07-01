/*  TODO
load gfx files
load pal files
draw gfx to screen with palettes
list of sprites and their locations/compatibility within the gfx files
select which sprites you want to include
detect conflicts
create exgfx based on selection
save exgfx file


search bar
categories - castle, koopas, powerups, etc
sprite images
"passable" conflict detection (pokey head football, bone spiny etc)
    show all animation frames, variations etc
checkbox for lava particles


remap sprite locations? (for use with STEAR etc)
custom sprites?

*/
const palette = ["#000000", "#202020", "#404040", "#606060", "#808080", "#A0A0A0", "#C0C0C0", "#E0E0E0", "#FFFFFF"]

const allGfx = []

function loadGfxFile(blob, name) {
    blob.arrayBuffer().then(((arrayBuffer) => {
        const snesBytes = new Int8Array(arrayBuffer)

        const pixels = snesToPixels(snesBytes)

        allGfx.push({ name, pixels })

        drawPixelsToCanvas(pixels)
    }))
}

function loadGraphics() {
    fetch("/gfx/GFX05.bin").then(blob => loadGfxFile(blob))
}

function drawPixelsToCanvas(pixels) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.resetTransform()
    ctx.scale(2,2)
    // todo: createImageData from pixels
    for (i = 0; i < pixels.length; i++) {
        ctx.fillStyle = palette[pixels[i]]
        ctx.fillRect(i % 256, Math.floor(i / 256), 1, 1);
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

