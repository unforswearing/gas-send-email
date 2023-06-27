/**
 * @author unforswearing
 * {@link https://github.com/unforswearing/gas-send-email|Repository}
 */

/** @private */
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
