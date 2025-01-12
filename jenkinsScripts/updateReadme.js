const fs = require('fs');
const simpleGit = require('simple-git');

const git = simpleGit();

const readmePath = './README.md';

const badges = {
    success: '![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)',
    failure: '![Failure](https://img.shields.io/badge/test-failure-red)'
};

const testResult = process.argv[2] || 'success'; 
const badge = badges[testResult];

async function updateReadme() {
    try {
        let readmeContent = fs.readFileSync(readmePath, 'utf-8');

        const resultSection = 'RESULTADO DE LOS ÚLTIMOS TESTS';
        const badgeSection = `${resultSection}\n\n${badge}`;

        readmeContent = readmeContent.includes(resultSection) 
            ? readmeContent.replace(new RegExp(`${resultSection}.*`, 's'), badgeSection)
            : `${readmeContent}\n\n## ${resultSection}\n\n${badge}`;

        fs.writeFileSync(readmePath, readmeContent, 'utf-8');
        console.log(`README.md actualizado con el resultado de los tests: ${testResult}`);

        await git.add('README.md');
        await git.commit(`Pipeline ejecutada - Motivo: ${testResult}`);
        await git.push();

        console.log('Cambios de README.md pusheados correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

updateReadme();
