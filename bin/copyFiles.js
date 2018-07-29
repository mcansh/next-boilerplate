import kleur from 'kleur';
import { copy } from 'fs-extra';

const copyFiles = async (source, destination) => {
  try {
    await copy(source, destination);
  } catch (err) {
    console.error(kleur.bgRed(err));
  }
};

export default copyFiles;
