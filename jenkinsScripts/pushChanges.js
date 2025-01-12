const simpleGit = require('simple-git');
const git = simpleGit();
const fs = require('fs');

const executor = process.env.PARAM_EXECUTOR || 'Miguel';
const motivo = process.env.PARAM_MOTIU || '';

const readmePath = './README.md';

if (!fs.existsSync(readmePath)) {
  console.log('README.md no encontrado.');
  process.exit(1);
}

async function pushChanges() {
  try {
    await git.add('.');  

    const commitMessage = `Pipeline ejecutada per ${executor}. Motiu: ${motivo}`;
    await git.commit(commitMessage);

    await git.push('jenkins_pipe'); 

    console.log('Cambios añadidos, commit realizado y cambios enviados al repositorio remoto.');
  } catch (err) {
    console.error('Error durante el proceso de git:', err);
    process.exit(1);
  }
}

pushChanges();
