const fs = require('fs');

const readmePath = './README.md';

const successBadge = '![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)';
const failureBadge = '![Failure](https://img.shields.io/badge/test-failure-red)';

const testResult = process.argv[2] || 'success';  

const badge = testResult === 'success' ? successBadge : failureBadge;

const readmeContent = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf-8') : '';

const updatedContent = readmeContent.includes('RESULTADO DE LOS ÚLTIMOS TESTS')
  ? readmeContent.replace(/RESULTADO DE LOS ÚLTIMOS TESTS.*/s, `RESULTADO DE LOS ÚLTIMOS TESTS\n\n${badge}`)
  : `${readmeContent}\n\n## RESULTADO DE LOS ÚLTIMOS TESTS\n\n${badge}`;

fs.writeFileSync(readmePath, updatedContent, 'utf-8');

console.log(`README.md actualizado con el resultado de los tests (${testResult}).`);
