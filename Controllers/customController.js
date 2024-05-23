const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Function to validate hex color code
function isValidHexColor(color) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

// Function to draw a rectangle
function drawRect(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

exports.customizeCharacter = (req, res) => {
    const { skinColor, hairColor, eyeColor, jacketColor, shirtColor, pantsColor, shoeColor, lipsColor } = req.body;

    const canvas = createCanvas(200, 400);
    const ctx = canvas.getContext('2d');

    // Drawing the character with user-specified colors
    drawRect(ctx, 75, 20, 50, 50, skinColor); // Head
    drawRect(ctx, 75, 20, 50, 10, hairColor); // Hair
    drawRect(ctx, 85, 40, 10, 10, '#FFFFFF'); // White of the eyes
    drawRect(ctx, 105, 40, 10, 10, '#FFFFFF'); // White of the eyes
    drawRect(ctx, 90, 45, 5, 5, eyeColor); // Eye color
    drawRect(ctx, 110, 45, 5, 5, eyeColor); // Eye color
    drawRect(ctx, 92, 55, 17, 5, lipsColor); // Lips color
    drawRect(ctx, 60, 80, 80, 120, jacketColor); // Jacket
    drawRect(ctx, 70, 90, 60, 100, shirtColor); // Shirt
    drawRect(ctx, 20, 80, 40, 100, jacketColor); // Left arm
    drawRect(ctx, 140, 80, 40, 100, jacketColor); // Right arm
    drawRect(ctx, 20, 180, 40, 20, skinColor); // Left hand
    drawRect(ctx, 140, 180, 40, 20, skinColor); // Right hand
    drawRect(ctx, 60, 200, 80, 200, pantsColor); // Pants
    drawRect(ctx, 60, 380, 40, 20, shoeColor); // Left shoe
    drawRect(ctx, 100, 380, 40, 20, shoeColor); // Right shoe

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./public/minecraft-character.png', buffer);
    console.log('Character image generated and saved as minecraft-character.png');
    res.sendFile(path.join(__dirname, '../public/minecraft-character.png'));
};
