const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Function to generate a random hex color code
function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to draw a rectangle
function drawRect(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

module.exports.generateRandomCharacter = (req, res) => {
    const canvas = createCanvas(200, 400);
    const ctx = canvas.getContext('2d');

    // Generate random colors for different parts
    const skinColor = getRandomHexColor();
    const hairColor = getRandomHexColor();
    const eyeColor = getRandomHexColor();
    const jacketColor = getRandomHexColor();
    const shirtColor = getRandomHexColor();
    const pantsColor = getRandomHexColor();
    const shoeColor = getRandomHexColor();
    const lipsColor = getRandomHexColor();

    // Drawing the character with random colors
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
    fs.writeFileSync('./public/minecraft-character-random.png', buffer);
    console.log('Character image generated and saved as minecraft-character-random.png');
    res.sendFile(path.join(__dirname, '../public/minecraft-character-random.png'));
};