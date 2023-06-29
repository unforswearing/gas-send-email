#### Modules

<dl>
<dt><a href="#module_emailConfig">emailConfig</a></dt>
<dd><h2>Configuration</h2>
<p><code>config.js</code> contains the configuration for the <code>sendMail</code> function.
The <code>config</code> object must be completed for the <code>sendMail</code> function
to work correctly. This object is passed to [the sendEmail function](#module_sendEmail..sendMail) with values from the current sheet environment via
[the procParams object](#module_sendEmail..procParams).
<br /><br />
Please see the documentation for the parameters in <code>const config</code> below.
All parameter values are <code>undefined</code> by default.</p></dd>
<dt><a href="#module_sendEmail">sendEmail</a></dt>
<dd><h2>Sending Email</h2>
<p>The <code>sendEmail()</code> function is the main and only runner function for this script.
To have this function respond to new form responses, please add <code>sendMail()</code>
as an installable trigger in your project. Please see [the installable triggers documentation](https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers) for more information.
<br /><br />
Your project information must be added to this config object before the
<code>sendEmail()</code> function will work correctly. Please see the documentation
for [config](#module_emailConfig..config) for a description of
required parameters.
<br /><br />
For debugging this script, please see [the sendMail function](#module_sendEmail..sendMail) below or the [debug.js file](#module_debug) for more information.</p></dd>
<dt><a href="#module_debug">debug</a></dt>
<dd><h2>Debugging</h2>
<p>The <code>debugRunner</code> function is equivalent to running <code>sendMail(true)</code> -
all actions between debugRunner and sendMail(true) are equivalent.
Both functions will send all runtime notifications to the email
address listed in <code>procParams.data.admin</code> instead of the recipient
listed in <code>procParams.data.recipient</code>.
This is most useful for testing.</p></dd>
</dl>

<a name="module_emailConfig"></a>

#### emailConfig
<h2>Configuration</h2>
<p><code>config.js</code> contains the configuration for the <code>sendMail</code> function.
The <code>config</code> object must be completed for the <code>sendMail</code> function
to work correctly. This object is passed to [the sendEmail function](#module_sendEmail..sendMail) with values from the current sheet environment via
[the procParams object](#module_sendEmail..procParams).
<br /><br />
Please see the documentation for the parameters in <code>const config</code> below.
All parameter values are <code>undefined</code> by default.</p>

**Author**: unforswearing  
<a name="module_emailConfig..config"></a>

##### emailConfig~config : <code>Object</code>
<p>Update <code>const</code> with values specific to your project.</p>

**Kind**: inner constant of [<code>emailConfig</code>](#module_emailConfig)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| admin | <code>string</code> | <p>Admin will receive error notifications</p> |
| formName | <code>string</code> | <p>The name of the form used to add responses to your spreadsheet</p> |
| recipient | <code>string</code> | <p>Add email addresses here. All form responses will be sent to any address added. Addresses may be for one individual or an array of addresses for multiple recipients.</p> |
| emailFooter | <code>string</code> | <p><code>emailFooter</code> specifies the html string to be used in the emails that are sent from this script. Leave blank if you do not require an email footer</p> |
| sheetId | <code>string</code> | <p>Property <code>sheetID</code> is required for this script to work properly Properties <code>formName</code> and <code>sheetId</code> will be extracted from <code>const formName</code> and <code>const sheet</code></p> |
| sheetNameFilter | <code>string</code> | <p><code>sheetNameFilter</code> is used to extract the form name from the sheet name. the 'responses' default is typical for most forms.</p> |
| subjectFilter | <code>string</code> | <p><code>subjectFilter</code> is used to create the email subject from the sheet name. the text in the subjectFilter will be added to the sheet name to generate an email subject. if you do not want the additional text in the email title you can leave this section blank -- use ''</p> |
| sheetInfo | <code>Object</code> | <p>The first column is set to 'A' by default. To use a different first column modify the <code>firstCol</code> parameter to another column in your sheet.</p> |

<a name="module_sendEmail"></a>

#### sendEmail
<h2>Sending Email</h2>
<p>The <code>sendEmail()</code> function is the main and only runner function for this script.
To have this function respond to new form responses, please add <code>sendMail()</code>
as an installable trigger in your project. Please see [the installable triggers documentation](https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers) for more information.
<br /><br />
Your project information must be added to this config object before the
<code>sendEmail()</code> function will work correctly. Please see the documentation
for [config](#module_emailConfig..config) for a description of
required parameters.
<br /><br />
For debugging this script, please see [the sendMail function](#module_sendEmail..sendMail) below or the [debug.js file](#module_debug) for more information.</p>

**See**: [config](#module_emailConfig..config)  
**Author**: unforswearing  

* [sendEmail](#module_sendEmail)
    * [~procParams](#module_sendEmail..procParams)
    * [~activeSpreadsheet](#module_sendEmail..activeSpreadsheet) : <code>Object</code>
    * [~sheetName](#module_sendEmail..sheetName) : <code>string</code>
    * [~getLastColumnLetter()](#module_sendEmail..getLastColumnLetter) ⇒ <code>string</code>
    * [~sendMail(debug)](#module_sendEmail..sendMail) ⇒ <code>void</code>
        * [~id](#module_sendEmail..sendMail..id)
        * [~sheet](#module_sendEmail..sendMail..sheet)
        * [~sheetInfo](#module_sendEmail..sendMail..sheetInfo)
            * [.rangeString](#module_sendEmail..sendMail..sheetInfo.rangeString)
            * [.questions](#module_sendEmail..sendMail..sheetInfo.questions)
            * [.submissionData[undefined]](#module_sendEmail..sendMail..sheetInfo.submissionData[undefined])
        * [~tsi](#module_sendEmail..sendMail..tsi)
        * [~dataTable](#module_sendEmail..sendMail..dataTable)
        * [~tablestyle](#module_sendEmail..sendMail..tablestyle)
        * [~recipient](#module_sendEmail..sendMail..recipient)
        * [~sheetName](#module_sendEmail..sendMail..sheetName)
        * [~logo](#module_sendEmail..sendMail..logo)
        * [~emailFooter](#module_sendEmail..sendMail..emailFooter)

<a name="module_sendEmail..procParams"></a>

##### sendEmail~procParams
<p><code>procParams</code> is created using values from [the config object](#module_emailConfig..config).
<strong>Do not modify the <code>procParams</code> object directly!</strong> The parameters
in this <code>procParams</code> object will default to the imported config file,
calculating information from the active sheet only where necessary.</p>

**Kind**: inner property of [<code>sendEmail</code>](#module_sendEmail)  
<a name="module_sendEmail..activeSpreadsheet"></a>

##### sendEmail~activeSpreadsheet : <code>Object</code>
<p>Get the spreadsheet object for the active spreadsheet.
Uses the Google Apps Script <strong>[SpreadsheetApp class](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app)</strong>.</p>

**Kind**: inner constant of [<code>sendEmail</code>](#module_sendEmail)  
<a name="module_sendEmail..sheetName"></a>

##### sendEmail~sheetName : <code>string</code>
<p>Use the <code>activeSpreadsheet</code> object to retrieve the name
of the current sheet via the <strong>[getName)](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getName())</strong> method.</p>

**Kind**: inner constant of [<code>sendEmail</code>](#module_sendEmail)  
<a name="module_sendEmail..getLastColumnLetter"></a>

##### sendEmail~getLastColumnLetter() ⇒ <code>string</code>
<p>A method to retrieve the letter of the last used column
in the spreadsheet. Use getLastColumnLetter as the value for
the [the config object](emailConfig~config) parameter
<code>data.sheetInfo.lastColumnLetter</code>. This is set by default in
the <code>sendMail</code> function.</p>

**Kind**: inner method of [<code>sendEmail</code>](#module_sendEmail)  
**Returns**: <code>string</code> - <p>The last column letter as a string.</p>  
**Example**  
```js
// Example: modify the script to retrieve an arbitrary range
// from your Google Spreadsheet
const getLastRange = () => {
  let lastCol = getLastColumnLetter()
  return activeSpreadsheet.getRange(`A30:${lastCol}30`)
}
```
<a name="module_sendEmail..sendMail"></a>

##### sendEmail~sendMail(debug) ⇒ <code>void</code>
<p>'sendMail()` is the main runner function. Be sure to add this functiom
as an <strong>installable trigger</strong> in your project. See [the installable triggers documentation](https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers) for more information.</p>
<h3>Debugging</h3>
<p>sendEmail(true) to send all notifications to 'admin' for testing.
The <code>debugRunner</code> function is equivalent to running <code>sendMail(true)</code> -
all actions between debugRunner and sendMail(true) are equivalent.
Both functions will send all runtime notifications to the email
address listed in <code>procParams.data.admin</code> instead of the recipient
listed in <code>procParams.data.recipient</code>. This is most useful for testing.</p>

**Kind**: inner method of [<code>sendEmail</code>](#module_sendEmail)  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>boolean</code> | <p>specify whether the script should send errors to <code>admin</code></p> |


* [~sendMail(debug)](#module_sendEmail..sendMail) ⇒ <code>void</code>
    * [~id](#module_sendEmail..sendMail..id)
    * [~sheet](#module_sendEmail..sendMail..sheet)
    * [~sheetInfo](#module_sendEmail..sendMail..sheetInfo)
        * [.rangeString](#module_sendEmail..sendMail..sheetInfo.rangeString)
        * [.questions](#module_sendEmail..sendMail..sheetInfo.questions)
        * [.submissionData[undefined]](#module_sendEmail..sendMail..sheetInfo.submissionData[undefined])
    * [~tsi](#module_sendEmail..sendMail..tsi)
    * [~dataTable](#module_sendEmail..sendMail..dataTable)
    * [~tablestyle](#module_sendEmail..sendMail..tablestyle)
    * [~recipient](#module_sendEmail..sendMail..recipient)
    * [~sheetName](#module_sendEmail..sendMail..sheetName)
    * [~logo](#module_sendEmail..sendMail..logo)
    * [~emailFooter](#module_sendEmail..sendMail..emailFooter)

<a name="module_sendEmail..sendMail..id"></a>

###### sendMail~id
<p>extract helper code and info from procParams (var parameters)
assumption: parameters.helper contains an object of helper vars / funcs
var helper = parameters.helper;</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..sheet"></a>

###### sendMail~sheet
<p>open the sheet for parsing</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..sheetInfo"></a>

###### sendMail~sheetInfo
<p>sheetInfo = { firstCol, lastCol }</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  

* [~sheetInfo](#module_sendEmail..sendMail..sheetInfo)
    * [.rangeString](#module_sendEmail..sendMail..sheetInfo.rangeString)
    * [.questions](#module_sendEmail..sendMail..sheetInfo.questions)
    * [.submissionData[undefined]](#module_sendEmail..sendMail..sheetInfo.submissionData[undefined])

<a name="module_sendEmail..sendMail..sheetInfo.rangeString"></a>

####### sheetInfo.rangeString
<p>Get the latest response range as text
eg. &quot;A10:G10&quot;</p>

**Kind**: static property of [<code>sheetInfo</code>](#module_sendEmail..sendMail..sheetInfo)  
<a name="module_sendEmail..sendMail..sheetInfo.questions"></a>

####### sheetInfo.questions
<p>get the values for question and latest response ranges</p>

**Kind**: static property of [<code>sheetInfo</code>](#module_sendEmail..sendMail..sheetInfo)  
<a name="module_sendEmail..sendMail..sheetInfo.submissionData[undefined]"></a>

####### sheetInfo.submissionData[undefined]
<p>change the date formatting if needed</p>

**Kind**: static property of [<code>sheetInfo</code>](#module_sendEmail..sendMail..sheetInfo)  
<a name="module_sendEmail..sendMail..tsi"></a>

###### sendMail~tsi
<p>tsi === time stamp index</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..dataTable"></a>

###### sendMail~dataTable
<p>create the submission info table and styles for html emails
table rows will be pushed to the dataTable column in the loop below</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..tablestyle"></a>

###### sendMail~tablestyle
<p>add styles for full table and nest the dataTable rows in table tags</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..recipient"></a>

###### sendMail~recipient
<p>Use admin email address if debug is true, otherwise use the script default</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..sheetName"></a>

###### sendMail~sheetName
<p>create email subject</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..logo"></a>

###### sendMail~logo
<p>add a company logo if desired. otherwise, comment out the two lines below</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..emailFooter"></a>

###### sendMail~emailFooter
<p>create the email body</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_debug"></a>

#### debug
<h2>Debugging</h2>
<p>The <code>debugRunner</code> function is equivalent to running <code>sendMail(true)</code> -
all actions between debugRunner and sendMail(true) are equivalent.
Both functions will send all runtime notifications to the email
address listed in <code>procParams.data.admin</code> instead of the recipient
listed in <code>procParams.data.recipient</code>.
This is most useful for testing.</p>

**Author**: unforswearing  
<a name="module_debug..debugRunner"></a>

##### debug~debugRunner(admin) ⇒ <code>void</code>
<h2>Using debugRunner()</h2>
<p>This function is added as a convenience for testing the script againt
the latest form response. To automate this process you may add this
function as an <strong>installable trigger</strong> in your project.
See [the installable triggers documentation](https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers) for more information.</p>

**Kind**: inner method of [<code>debug</code>](#module_debug)  

| Param | Type | Description |
| --- | --- | --- |
| admin | <code>string</code> | <p>The email address to send errors</p> |

