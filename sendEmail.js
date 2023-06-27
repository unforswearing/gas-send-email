// Repository: https://github.com/unforswearing/gas-send-email
import config from "./config";

/**
 * `debugRunner()` tests the `sendEmail()` function, 
 * catching any errors that arise. 
 * @example
 * // Use in a trigger (pseudocode)
 * ScriptApp.addTrigger(debugRunner)
 * @argument {string} admin email address for sending error messages
 * @returns {void} 
 * */
const debugRunner = (admin) => {
  /** @ignore */
  const debug = true;

  try {
    sendEmail(debug);
  } catch (e) {
    var emsg = `Script ran into an error!\n\n${e}`;
    MailApp.sendEmail(admin, emsg.replace(`{\n\n${e}`), emsg);

    throw e;
  }
};

/** 
 * processing parameters specific to the needs of this form
 * edit this function to update required 'data' parameters and
 * add any helper scripts 
 * @function procParams
 * @argument {string} recipient the email address of the recipient 
 * @argument {string} mailFooter the html string to be used as a footer in the email message
 * @returns {object} 
 * The return value contains data to be used when sending the email message. 
 * ```
 * {
 *   admin, 
 *   formName, 
 *   recipient, 
 *   emailFooter, 
 *   sheetId, 
 *   sheetNameFilter, 
 *   subjectFilter,
 *   sheetInfo {...}
 * }
 * ```
 * */
const procParams = (recipient, mailFooter) => {
  /** @ignore */
  const activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  /** @ignore */
  const sheetName = activeSpreadsheet.getName();

  /** @ignore */
  const getLastColumnLetter = function getLastColumnLetter() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var alphaLen = alphabet.length;
    var col = spreadsheet.getLastColumn();

    if (col <= alphaLen) return alphabet.splice(col - 1, 1).toString();

    var firstLetter = alphabet[Math.floor(col / alphaLen) - 1];
    return `${firstLetter}${alphabet.splice(col % alphaLen, 1).toString()}`;
  };

  // using config.js
  /** 
   * `executor` is the return value for `procParams`
   * @var {object} executor
   * @inner
   * */
  let executor = {
    /** @prop {object} data */
    data: {
      // admin will receive error notifications
      /** @prop {string} admin */
      admin: config.admin,
      // add any recipient names or code to the
      // > executor.data.recipient function below
      // NOTE formName and sheetId will be extracted from
      // const formName and const sheet
      formName: config.formName | sheetName.replace(" (Responses"),
      /** @prop {string} recipient */
      recipient: config.recipient,
      /**
       * leave emailFooter blank if it is not needed
       * @prop {string} emailFooter */
      emailFooter: config.mailFooter,
      /** 
       * Property `sheetID` is required for this script to work properly
       * Properties `formName` and `sheetId` will be extracted from
       * `const formName` and `const sheet`
       * @prop {string} sheetId */
      sheetId: config.sheetId | activeSpreadsheet.getSheetId(),
      /**
       * used to extract the form name from the sheet name.
       * the 'responses' default is typical for most forms
       * @prop {string} sheetNameFilter */ 
      sheetNameFilter: config.sheetNameFilter | ` (Responses)`,
      /** used to create the email subject from the sheet name.
       * the text in the subjectFilter will be added to the sheet name
       * to generate an email subject. if you do not want the additional
       * text in the email title you can leave this section blank -- use ''
       * NOTE the modifications above have not yet been tested (as of 2/16/2021)
       * @todo verify the steps to change the sheetNameFilter work properly
       * @prop {string} subjectFilter */
      subjectFilter: config.subjectFilter | " Form Submission",
      /** 
       * @prop {Object} sheetInfo
      */
      sheetInfo:
        config.sheetInfo |
        {
          /**
           * if you wamt the sheet to start at a different column, enter
           * your desired column letter below.
           * @type {string} */
          firstCol: "A",
          /** @type {string} */
          lastCol: getLastColumnLetter(),
          /** @type {number} */
          lastRow: activeSpreadsheet.getLastRow(),
        },
    },
  };

  return executor;
};

// main runner function. on form submit, execute sendEmail, end script.
// sendEmail(true) to send all notifications to 'admin' for testing
/** @returns {void} */
function sendEmail(debug) {
  // create the helper object
  /** @type {object} */
  var parameters = procParams();

  // extract helper code and info from procParams (var parameters)
  // assumption: parameters.helper contains an object of helper vars / funcs
  // var helper = parameters.helper;

  /** @type {object} */
  var data = parameters.data;

  /** @type {string} */
  var id = data.sheetId;

  //  open the sheet for parsing
  /** @type {object} */
  var sheet = SpreadsheetApp.openById(id);

  // sheetInfo = { firstCol: ..., lastCol: ... }
  /** @type {object} */
  var sheetInfo = data.sheetInfo;

  // Get the latest response range as text
  sheetInfo.rangeString = `${sheetInfo.firstCol}${sheetInfo.lastRow}:${sheetInfo.lastCol}${sheetInfo.lastRow}`;

  // use the response range to get the questions from row 1
  // if your questions are in a different row or column
  // change 'A1' to the location of the cell containing the first question
  // replace the '1' in 'sheetInfo.lastCol with the number of the row
  // containing the last question.
  sheetInfo.questionString = `A1:${sheetInfo.lastCol + 1}`;

  // get the values for question and latest response ranges
  // @todo could this be done in a better way? (prolly)
  /** @type {Array} */
  sheetInfo.questions = sheet.getRange(sheetInfo.questionString).getValues()[0];

  /** @type {Array} */
  sheetInfo.submissionData = sheet
    .getRange(sheetInfo.rangeString)
    .getValues()[0];

  // only shorten timestamps if the timestamps array has a value
  if (data.timestampsArray.join("")) {
    for (var n in data.timestampsArray) {
      // tsi === time stamp index
      var tsi = data.timestampsArray[n];

      // change the date formatting if needed
      sheetInfo.submissionData[tsi] = Utilities.formatDate(
        sheetInfo.submissionData[tsi],
        Session.getScriptTimeZone(),
        "M/d/yyyy h:mm a"
      ).toString();
    }
  }

  // create the submission info table and styles for html emails
  // table rows will be pushed to the dataTable column in the loop below
  var dataTable = [];
  var tdstyle = 'style="padding:7px;"';

  // loop through the submissionData to create a table of questions and answers
  for (var i in sheetInfo.submissionData) {
    var answer = sheetInfo.submissionData[i];
    var question = sheetInfo.questions[i];

    // add the generated row to the dataTable array
    dataTable.push(
      `<tr><td align="right" ${tdstyle}><b>${question}</b></td><td align="left"  ${tdstyle}>${answer}</td></tr>`
    );
  }

  // add styles for full table and nest the dataTable rows in table tags
  var tablestyle = 'style="width:80%;padding:7px;"';
  dataTable = `<table ${tablestyle}>${dataTable.join("")}</tables>`;

  // Use admin email address if debug is true, otherwise use the script default
  var recipient = debug === true ? data.admin : data.recipient();

  // create email subject
  var sheetName = sheet.getName().replace(data.sheetNameFilter, "");
  var subject = sheetName + data.subjectFilter;

  // add a company logo if desired. otherwise, comment out the two lines below
  // @todo logo can probably be added to procParams - logo = procParams.logo || '';
  var logo = undefined;
  logo = `<img src="${logo}" width="120px" height="80px">`;

  // create the email body
  var emailFooter = parameters.emailFooter;

  var body = `${logo}<br><br>
    'Hello,<br><br>'${sheetName} form was submitted on ${sheetInfo.submissionData[0]}. 
    Please find the submitted information below.<hr><br>${dataTable}<br><br><br><br>${emailFooter}`;

  // send email to 'recipient', admin if debugging
  MailApp.sendEmail(recipient, subject, body, {
    htmlBody: body,
    noReply: true,
  });
}

export default sendEmail;
