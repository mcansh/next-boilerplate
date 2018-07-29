const questions = [
  {
    type: 'input',
    message: 'The name of the new directory',
    name: 'dirName',
  },
  {
    type: 'confirm',
    message: 'Use npm over yarn?',
    name: 'useNPM',
    default: false,
  },
  {
    type: 'confirm',
    message: 'Use npm default settings?',
    name: 'useDefaults',
    default: false,
    when: answers => answers.useNPM,
  },
  {
    type: 'confirm',
    message: 'Use yarn default settings?',
    name: 'useDefaults',
    default: false,
    when: answers => !answers.useNPM,
  },
  {
    type: 'confirm',
    message: 'Use the canary version of next?',
    name: 'useCanary',
    default: false,
  },
];

export default questions;
