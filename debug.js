/**
 * This debug file can be run directly in the Google Apps Script project or
 * by using a {@link https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers|Google Apps Script installable trigger} to run
 * the script at regular intervals. The `debugRunner()` function is only useful
 * for sending test emails to the address listed in {@link module:emailConfig~config|config.admin} instead of using the value for `config.recipient`.
 * 
 * @author unforswearing
 * {@link https://github.com/unforswearing/gas-send-email|Repository}
 * @module debug
 */

import sendEmail from "./sendEmail";

/** 
 * @function debugRunner
 * @argument {string} admin The email address to send errors
 * @return {void}
*/
const debugRunner = (admin) => {
  const debug = true;

  try {
    sendEmail(debug);
  } catch (e) {
    var emsg = `Script ran into an error!\n\n${e}`;
    MailApp.sendEmail(admin, emsg.replace(`{\n\n${e}`), emsg);

    throw e;
  }
};

export default debugRunner;
