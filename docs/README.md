## Modules

<dl>
<dt><a href="#module_emailConfig">emailConfig</a></dt>
<dd><h1>Configuration</h1>
<p><code>config.js</code> contains the configuration for the <code>sendMail</code> function.
The <code>config</code> object must be completed for the <code>sendMail</code> function
to work correctly. This object is passed to [sendMail](#module_sendEmail..sendMail) with values from the current sheet environment via [the procParams Object](#module_sendEmail..procParams).
<br /><br />
Please see the documentation for <code>const config</code> below for a description of
required parameters. Please find additional information in the
[ Source Repository](https://github.com/unforswearing/gas-send-email)</p></dd>
<dt><a href="#module_sendEmail">sendEmail</a></dt>
<dd><h1>Sending Email</h1>
<p>This file contains the runner code for the send email script. You should not need
to edit any code in this file for the script to function, however,  please
add your project information to [the config object](#module_emailConfig..config)
before attempting to run any code in these files.</p></dd>
<dt><a href="#module_debug">debug</a></dt>
<dd><h1>Debugging</h1>
<p>The <code>debugRunner</code> function is equivalent to running <code>sendMail(true)</code> -
all actions between debugRunner and sendMail(true) are equivalent.
Both functions will send all runtime notifications to the email
address listed in <code>procParams.data.admin</code> instead of the recipient
listed in <code>procParams.data.recipient</code>.
This is most useful for testing.</p></dd>
</dl>

<a name="module_emailConfig"></a>

## emailConfig
<h1>Configuration</h1>
<p><code>config.js</code> contains the configuration for the <code>sendMail</code> function.
The <code>config</code> object must be completed for the <code>sendMail</code> function
to work correctly. This object is passed to [sendMail](#module_sendEmail..sendMail) with values from the current sheet environment via [the procParams Object](#module_sendEmail..procParams).
<br /><br />
Please see the documentation for <code>const config</code> below for a description of
required parameters. Please find additional information in the
[ Source Repository](https://github.com/unforswearing/gas-send-email)</p>

**Author**: unforswearing  
<a name="module_emailConfig..config"></a>

### emailConfig~config : <code>Object</code>
**Kind**: inner constant of [<code>emailConfig</code>](#module_emailConfig)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| admin | <code>string</code> | <p>admin will receive error notifications</p> |
| formName | <code>string</code> | <p>the name of the form you are using with this script</p> |
| recipient | <code>string</code> | <p>add any recipient email addresses here. these may be single addresses or an array of quoted addresses.</p> |
| emailFooter | <code>string</code> | <p><code>emailFooter</code> specifies the html string to be used in the emails that are sent from this script. Leave blank if you do not require an email footer</p> |
| sheetId | <code>string</code> | <p>Property <code>sheetID</code> is required for this script to work properly Properties <code>formName</code> and <code>sheetId</code> will be extracted from <code>const formName</code> and <code>const sheet</code></p> |
| sheetNameFilter | <code>string</code> | <p>used to extract the form name from the sheet name. the 'responses' default is typical for most forms.</p> |
| subjectFilter | <code>string</code> | <p><code>subjectFilter</code> is used to create the email subject from the sheet name. the text in the subjectFilter will be added to the sheet name to generate an email subject. if you do not want the additional text in the email title you can leave this section blank -- use '' NOTE the modifications above have not yet been tested (as of 2/16/2021)</p> |
| sheetInfo | <code>Object</code> | <p>The first column is set to 'A' by default. To use a different first column modify the <code>firstCol</code> parameter to another column in your sheet.</p> |

<a name="module_sendEmail"></a>

## sendEmail
<h1>Sending Email</h1>
<p>This file contains the runner code for the send email script. You should not need
to edit any code in this file for the script to function, however,  please
add your project information to [the config object](#module_emailConfig..config)
before attempting to run any code in these files.</p>

**Author**: unforswearing  

* [sendEmail](#module_sendEmail)
    * [~procParams](#module_sendEmail..procParams)
    * [~sendMail(debug)](#module_sendEmail..sendMail) ⇒ <code>void</code>
        * [~data](#module_sendEmail..sendMail..data)
        * [~sheet](#module_sendEmail..sendMail..sheet)
        * [~sheetInfo](#module_sendEmail..sendMail..sheetInfo)

<a name="module_sendEmail..procParams"></a>

### sendEmail~procParams
<p>The parameters in this <code>procParams</code> object will default to the
imported config file, calculating information from the active
sheet only where necessary.</p>

**Kind**: inner property of [<code>sendEmail</code>](#module_sendEmail)  
**Requires**: [<code>config</code>](#module_emailConfig..config)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data.admin | <code>string</code> | <p>admin will receive error notifications</p> |
| data.formName | <code>string</code> | <p>the name of the form you are using with this script</p> |
| data.recipient | <code>string</code> | <p>add any recipient email addresses here. these may be single addresses or an array of quoted addresses.</p> |
| data.emailFooter | <code>string</code> | <p><code>emailFooter</code> specifies the html string to be used in the emails that are sent from this script. Leave blank if you do not require an email footer</p> |
| data.sheetId | <code>string</code> | <p>Property <code>sheetID</code> is required for this script to work properly Properties <code>formName</code> and <code>sheetId</code> will be extracted from <code>const formName</code> and <code>const sheet</code></p> |
| data.sheetNameFilter | <code>string</code> | <p>used to extract the form name from the sheet name. the 'responses' default is typical for most forms.</p> |
| data.subjectFilter | <code>string</code> | <p><code>subjectFilter</code> is used to create the email subject from the sheet name. the text in the subjectFilter will be added to the sheet name to generate an email subject. if you do not want the additional text in the email title you can leave this section blank -- use '' NOTE the modifications above have not yet been tested (as of 2/16/2021)</p> |
| data.sheetInfo | <code>Object</code> | <p>The first column is set to 'A' by default. To use a different first column modify the <code>firstCol</code> parameter to another column in your sheet.</p> |

<a name="module_sendEmail..sendMail"></a>

### sendEmail~sendMail(debug) ⇒ <code>void</code>
<p>The <code>sendMail()</code> function is the main runner function.
This function should be added to a [Google Apps Script installable trigger](https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers) to execute the execute sendMail function.
<br /><br />
Passing <code>true</code> to this function (eg. <code>sendEmail(true)</code>) will send all
runtime notifications to the email address listed in <code>procParams.data.admin</code>
instead of the recipient listed in <code>procParams.data.recipient</code>.
This is most useful for testing. You may also use the [debugRunner function](#module_debug..debugRunner) directly to run the script
in &quot;debug&quot; mode.</p>

**Kind**: inner method of [<code>sendEmail</code>](#module_sendEmail)  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>boolean</code> | <p>specify whether the script should send errors to <code>admin</code></p> |


* [~sendMail(debug)](#module_sendEmail..sendMail) ⇒ <code>void</code>
    * [~data](#module_sendEmail..sendMail..data)
    * [~sheet](#module_sendEmail..sendMail..sheet)
    * [~sheetInfo](#module_sendEmail..sendMail..sheetInfo)

<a name="module_sendEmail..sendMail..data"></a>

#### sendMail~data
<p>extract helper code and info from procParams (var parameters)
assumption: parameters.helper contains an object of helper vars / funcs
var helper = parameters.helper;</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..sheet"></a>

#### sendMail~sheet
<p>open the sheet for parsing</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..sheetInfo"></a>

#### sendMail~sheetInfo
<p>sheetInfo = { firstCol: ..., lastCol: ... }</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_debug"></a>

## debug
<h1>Debugging</h1>
<p>The <code>debugRunner</code> function is equivalent to running <code>sendMail(true)</code> -
all actions between debugRunner and sendMail(true) are equivalent.
Both functions will send all runtime notifications to the email
address listed in <code>procParams.data.admin</code> instead of the recipient
listed in <code>procParams.data.recipient</code>.
This is most useful for testing.</p>

**Author**: unforswearing  
<a name="module_debug..debugRunner"></a>

### debug~debugRunner(admin) ⇒ <code>void</code>
**Kind**: inner method of [<code>debug</code>](#module_debug)  

| Param | Type | Description |
| --- | --- | --- |
| admin | <code>string</code> | <p>The email address to send errors</p> |

