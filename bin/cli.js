import fs from 'fs-extra';
import { resolve, join } from 'path';
import kleur from 'kleur';
import inquirer from 'inquirer';
import stripIndent from 'common-tags/lib/stripIndent';

import spawn from './exec';
import generatePackageJSON from './generatePackageJSON';
import copyfiles from './copyFiles';
import questions from './questions';

const init = async () => {
  const answers = await inquirer.prompt(questions);
  const { dirName, useNPM, useDefaults, useCanary } = answers;

  const packageManager = useNPM ? 'npm' : 'yarn';

  if (await fs.exists(dirName)) {
    console.log(kleur.bgRed(`'${dirName}' directory already exists`));
    process.exit(1);
  }

  await fs.mkdir(dirName);
  await process.chdir(dirName);

  copyfiles(resolve(__dirname, '../template'), '.');

  await spawn(packageManager, ['init', useDefaults ? '-y' : '']);

  const pkgPath = join(process.cwd(), 'package.json');

  const pkg = require(pkgPath);

  const newPKG = await generatePackageJSON(pkg, useCanary);

  await fs.writeFile(pkgPath, newPKG);

  console.log(kleur.green`▲ Booststrapping your project`);
  await spawn(packageManager, ['install']);

  console.log(
    kleur.blue(stripIndent`
      Application initialized:
      ▲ cd into your project: cd ./${dirName}
      ▲ start your application: ${packageManager} run dev
    `)
  );
};

init();
