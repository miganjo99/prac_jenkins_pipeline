const fs = require('fs');
const path = require('path');

const readmePath = './README.md';

const badges = {
    success: '![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)',
    failure: '![Failure](https://img.shields.io/badge/test-failure-red)'
};

const testResult = process.argv[2] || 'success'; 

if (!['success', 'failure'].includes(testResult)) {
    console.error('El resultado de los tests debe ser "success" o "failure".');
    process.exit(1);
}

const badge = badges[testResult];

function updateReadme() {
    try {
        if (!fs.existsSync(readmePath)) {
            console.error('El archivo README.md no se encuentra.');
            process.exit(1);
        }

        let readmeContent = fs.readFileSync(readmePath, 'utf-8');

        const resultSection = 'RESULTADO DE LOS ÚLTIMOS TESTS';
        const badgeSection = `${resultSection}\n\n${badge}`;

        if (readmeContent.includes(resultSection)) {
            readmeContent = readmeContent.replace(new RegExp(`${resultSection}.*`, 's'), badgeSection);
        } else {
            readmeContent += `\n\n## ${resultSection}\n\n${badge}`;
        }

        fs.writeFileSync(readmePath, readmeContent, 'utf-8');
        console.log(`README.md actualizado con el resultado de los tests: ${testResult}`);
    } catch (error) {
        console.error('Error al actualizar el README.md:', error.message);
        process.exit(1);
    }
}

updateReadme();
