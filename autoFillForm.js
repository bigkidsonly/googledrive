function autoFillForm(e) {
  var recipientEmail = e.values[1]; // Assuming the email address is in the second column
  var author = e.values[2];
  var date = e.values[3];
  var purpose = e.values[4];
  var header1 = e.values[5];
  var body1 = e.values[6];
  var header2 = e.values[7];
  var body2 = e.values[8];
  var resources = e.values[9];

//Replace "File_ID" with the ID of the template Google Doc
  var templateFile = DriveApp.getFileById("FILE_ID");
//Replace "Folder_ID" with the ID of the destination google drive folder to save the new copy
  var templateResponseFolder = DriveApp.getFolderById("FOLDER_ID");

  var copy = templateFile.makeCopy(author + ', ' + date, templateResponseFolder);
  var doc = DocumentApp.openById(copy.getId());

  var body = doc.getBody();
  body.replaceText("{{author}}", author);
  body.replaceText("{{date}}", date);
  body.replaceText("{{purpose}}", purpose);
  body.replaceText("{{header1}}", header1);
  body.replaceText("{{body1}}", body1);
  body.replaceText("{{header2}}", header2);
  body.replaceText("{{body2}}", body2);
    body.replaceText("{{resources}}", resources);

  doc.saveAndClose();

  // Get the URL of the created Google Doc
  var docUrl = doc.getUrl();

  // Send the Google Doc URL of the newly created document to the email address on the form
  var subject = "Google Doc Created using Apps Script";
  var body = "Here is the link to the created Google Doc: " + docUrl;

  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    body: body,
  });
}
