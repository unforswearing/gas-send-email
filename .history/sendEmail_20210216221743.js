/*
  A simple script to collect form responses and send email notifications
  with the option for additional processing, if needed.

  Note: Column A is the default "Timestamp" column in the responses sheet. You can work around this by changing any references to "answerArray[0]" to point to which ever column contains the timestamp.

  After completing the TO DO list below this script should operate succesfully,
  with no additional modification to the 'sendEmail' function.

  ------------------
  Script Information
  ------------------

  Send Email Script: Send form responses to additional addresses
    - Google forms currently limit the submission receipts
      to the user who submitted the form.
    - This script allows responses to be sent to other addresses
      for various purposes.

   ::: Complete this TO DO list when adding to new projects ::::

  form: <form url>
  responses: <responses sheet url>

   TO DO
   - [] add links to the live form and responses sheet to "form"
        and "responses" above this TO DO list
   - [] complete the 'procParams' object below
        including any 'false' items, 'helper' items, and
        'recipient', if needed
   - [] submit a test response and run the
        debugRunner function to test the script.
   - [] add an 'On Form Submit' trigger to run the sendEmail function
        for each form submission.

*/

// run 'debugRunner()' when testing
function debugRunner() {
  debug = true;
  admin = undefined;

  try {
    sendEmail(debug);
  } catch (e) {
    var emsg = 'Script ran into an error!\n\n' + e;
    MailApp.sendEmail(
      admin, emsg.replace('\n\n' + e), emsg
    );

    throw e;
  }
}

// processing parameters specific to the needs of this form
// edit this function to update required 'data' parameters and
// > add any helper scripts
var procParams = function () {
  var executor = {
    data: {
      // admin will receive error notifications
      admin: undefined,
      // add any recipient names or code to the
      // > executor.data.recipient function below
      formName: undefined,
      recipient: undefined,
      sheetId: '',
      // used to extract the form name from the sheet name.
      // > the 'responses' default is typical for most forms
      sheetNameFilter: ' (Responses)',
      // used to create the email subject from the sheet name.
      // > the 'form submission' default is typical of most forms.
      subjectFilter: ' Form Submission',
      sheetInfo: {
        firstCol: 'A',
        lastCol: '',
        lastRow: ''
      },
      // add the indices for any timestamps that need to be shortened
      timestampsArray: []
    },
    // add helper code to executor.helper below
    helper: undefined
  };

  executor.helper = function () {
    // helper is specific to each script.
    var hparams = {};

    //  add helper vars and functions here
    // hparams['helperName'] = function () { /**/ };

    return hparams;
  };

  // use this function to add additional recipients to the email notification.
  executor.data.recipient = function (answersArray) {
    var tmpRecipient;

    // do stuff with answersArray, or delete this function

    return tmpRecipient;
  };

  return executor;
};

// main runner function. on form submit, execute sendEmail, end script.
// sendEmail(true) to send all notifications to 'admin' for testing
function sendEmail(debug) {
  // create the helper object
  var parameters = procParams();

  var helper = parameters.helper;
  var data = parameters.data;
  var id =  data.sheetId;

  var sheet = SpreadsheetApp.openById(id);

  // sheetInfo = { firstCol: ..., lastCol: ... }
  var sheetInfo = data.sheetInfo;
  sheetInfo.lastRow = sheet.getLastRow();

  // Get the latest response range as text
  sheetInfo.rangeString = sheetInfo.firstCol + sheetInfo.lastRow +
    ':' + sheetInfo.lastCol + sheetInfo.lastRow;

  // use the response range to get the questions from row 1
  sheetInfo.questionString = 'A1:' + sheetInfo.lastCol + '1';

  // get the values for question and latest response ranges
  sheetInfo.questions = sheet.getRange(sheetInfo.questionString).getValues()[0];
  sheetInfo.submissionData = sheet.getRange(sheetInfo.rangeString).getValues()[0];

  // shorten timestamps
  if (data.timestampsArray.join('')) {
    for (var n in data.timestampsArray) {
      // tsi === time stamp index
      var tsi = data.timestampsArray[n];

      // change the date formatting if needed
      sheetInfo.submissionData[tsi] = Utilities.formatDate(
        sheetInfo.submissionData[tsi], Session.getScriptTimeZone(), 'M/d/yyyy h:mm a'
      ).toString();
    }
  }

  // create the submission info table for html emails
  var dataTable = [];
  var tdstyle = 'style="padding:7px;"';

  for (var i in sheetInfo.submissionData) {
    var answer = sheetInfo.submissionData[i];
    var question = sheetInfo.questions[i];

    dataTable.push(
      '<tr><td align="right" ' + tdstyle + '><b>' + question + '</b>' +
      '</td><td align="left" ' + tdstyle + '>' + answer + '</td></tr>'
    );
  }

  var tablestyle = 'style="width:80%;padding:7px;"';
  dataTable = '<table ' + tablestyle + '>' + dataTable.join('') + '</tables>';

  // Use admin email address if debug is true, otherwise use the script default
  var recipient = (debug === true) ? data.admin : data.recipient();

  // create email subject
  var sheetName = sheet.getName().replace(data.sheetNameFilter, '');
  var subject = sheetName + data.subjectFilter;

  // get the company logo image from somewhere on the internet
  var logo = undefined;
  logo = '<img src="' + logo + '" width="120px" height="80px">';

  // create the email body
  var emailFooter = undefined;

  var body = logo + '<br><br>' +
    'Hello,<br><br>' + sheetName + ' form was submitted on ' + sheetInfo.submissionData[0] +
    '. Please find the submitted information below.<hr><br>' + dataTable + '<br><br><br><br>' +
    emailFooter;

  // send email to 'recipient', admin if debugging
  MailApp.sendEmail(recipient, subject, body, { htmlBody: body, noReply: true });
}
