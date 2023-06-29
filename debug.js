/**
 * ## Debugging
 * The `debugRunner` function is equivalent to running `sendMail(true)` - 
 * all actions between debugRunner and sendMail(true) are equivalent. 
 * Both functions will send all runtime notifications to the email 
 * address listed in `procParams.data.admin` instead of the recipient 
 * listed in `procParams.data.recipient`. 
 * This is most useful for testing. 
 * @author unforswearing
 * @module debug
 */

import sendEmail from "./sendEmail";

/** 
 * This function is added as a convenience for testing the script againt 
 * the latest form response. To automate this process you may add this 
 * function as an **installable trigger** in your project. 
 * See {@link https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers|the installable triggers documentation} for more information.
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
