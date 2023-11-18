function listFoldersContents() {
  // ID of the Google Drive folder you want to list
  var folderId = 'SHARED_DRIVE_ID';

  // Create a new spreadsheet file with a specific name
  var spreadsheetName = 'List Folders ' + Date();
  var spreadsheet = SpreadsheetApp.create(spreadsheetName);
  var sheet = spreadsheet.getActiveSheet();

  // Set column headers
  sheet.appendRow(['Folder Name', 'Parent Folder', 'Last Modified Date', 'File Count', 'URL']);

  // Get the folder by ID
  var folder = DriveApp.getFolderById(folderId);

  // Process the root folder
  processFolder(folder, sheet, '');

  Logger.log('Spreadsheet created successfully.');
}

function processFolder(folder, sheet, parentFolder) {
  var subfolders = folder.getFolders();
  var files = folder.getFiles();
  var fileCount = 0;

  // Count the number of files in the current folder
  while (files.hasNext()) {
    files.next();
    fileCount++;
  }

  // Process subfolders in the current folder
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    var subfolderResult = processFolder(subfolder, sheet, folder.getName());
    fileCount += subfolderResult.fileCount;
  }

  // Add the current folder to the sheet
  sheet.appendRow([
    folder.getName(), // Add "/" to the front of the folder name
    parentFolder,
    folder.getLastUpdated(),
    fileCount,
    folder.getUrl()
  ]);

  return { fileCount: fileCount };
}
