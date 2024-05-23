const { createCanvas } = require('canvas');
const fs = require('fs');
const prompt = require('prompt-sync')();

// Function to validate hex color code
function isValidHexColor(color) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

// Function to get user input for colors
function getUserColorInput(part) {
    let color;
    do {
        color = prompt(`Enter the hex color code for ${part} (e.g., #FF5733): `);
        if (!isValidHexColor(color)) {
            console.log("Invalid hex color code. Please try again.");
        }
    } while (!isValidHexColor(color));
    return color;
}

// Get user input for each part of the character
const skinColor = getUserColorInput("skin");
const hairColor = getUserColorInput("hair");
const eyeColor = getUserColorInput("eyes");
const jacketColor = getUserColorInput("jacket");
const shirtColor = getUserColorInput("shirt");
const pantsColor = getUserColorInput("pants");
const shoeColor = getUserColorInput("shoes");
const lipsColor = getUserColorInput("lips");

const canvas = createCanvas(200, 400);
const ctx = canvas.getContext('2d');

// Function to draw a rectangle
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Drawing the character with user-specified colors
// Head
drawRect(75, 20, 50, 50, skinColor);

// Hair
drawRect(75, 20, 50, 10, hairColor);

// Eyes
drawRect(85, 40, 10, 10, '#FFFFFF'); // White of the eyes
drawRect(105, 40, 10, 10, '#FFFFFF'); // White of the eyes
drawRect(90, 45, 5, 5, eyeColor); // User-specified eye color
drawRect(110, 45, 5, 5, eyeColor); // User-specified eye color

// Lips
drawRect(92, 55, 17, 5, lipsColor); // User-specified lips color

// Body
drawRect(60, 80, 80, 120, jacketColor); // User-specified jacket color
drawRect(70, 90, 60, 100, shirtColor); // User-specified shirt color

// Arms
drawRect(20, 80, 40, 100, jacketColor); // Left arm with user-specified jacket color
drawRect(140, 80, 40, 100, jacketColor); // Right arm with user-specified jacket color

// Hands
drawRect(20, 180, 40, 20, skinColor); // Left hand with user-specified skin color
drawRect(140, 180, 40, 20, skinColor); // Right hand with user-specified skin color

// Legs
drawRect(60, 200, 80, 200, pantsColor); // User-specified pants color

// Shoes
drawRect(60, 380, 40, 20, shoeColor); // Left shoe with user-specified color
drawRect(100, 380, 40, 20, shoeColor); // Right shoe with user-specified color

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./minecraft-character.png', buffer);
console.log('Character image generated and saved as minecraft-character.png');