const fs = require('fs');

function decodeValue(base, value) {
    return BigInt(parseInt(value, parseInt(base)));
}

function lagrangeInterpolation(points) {
    const k = points.length;
    let c = BigInt(0);

    for (let i = 0; i < k; i++) {
        const [x_i, y_i] = points[i];

        let product = BigInt(1);
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const [x_j] = points[j];
                product *= BigInt(-x_j) * BigInt(1) / BigInt(x_i - x_j);
            }
        }
        c += y_i * product;
    }
    return c % BigInt(1e9 + 7);
}

function main() {
    const testCases = ['input1.json', 'input2.json'];

    testCases.forEach(file => {
        const input = JSON.parse(fs.readFileSync(file, 'utf8'));
        const n = input.keys.n;
        const k = input.keys.k;

        let points = [];

        for (let i = 1; i <= n; i++) {
            if (input[i]) { 
                const base = input[i].base;
                const value = input[i].value;
                const x = BigInt(i);
                const y = decodeValue(base, value);
                points.push([x, y]);
            }
        }

        const constantTerm = lagrangeInterpolation(points.slice(0, k));
        console.log(`The constant term (c) for ${file} is:`, constantTerm.toString());
    });
}

main();
