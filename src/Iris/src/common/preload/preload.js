const Logger = require('../../utils/logging/Logger');

window.onload = () => {
  Logger.INFO('Preload Started.');
  require('../../core/updater');
};
