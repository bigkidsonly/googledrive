function listFilesInFolder() {
  // Replace 'YOUR_SHARED_DRIVE_ID' with the ID of the shared Google Drive you want to access
  var folder = DriveApp.getFolderById('YOUR_SHARED_DRIVE_ID');
  
  // Replace data on sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear(); // Clear the current sheet
  
  // Add headers to the sheet
  sheet.appendRow(["File Name", "File ID", "File Owner", "Last Modified Date", "URL", "File Size", "Parent Folder", "Date Created"]);
  
  listFiles(folder, sheet);
  
  Logger.log("Script completed successfully!");
}

function listFiles(folder, sheet) {
  var files = folder.getFiles();
  
  while (files.hasNext()) {
    var file = files.next();
    var fileId = file.getId();
    var fileName = file.getName();
    var fileOwner = file.getOwner();
    var lastModifiedDate = file.getLastUpdated();
    var fileUrl = "https://drive.google.com/file/d/" + fileId;
    var fileSize = file.getSize();
    var parentFolder = file.getParents().next().getName(); // Get the name of the parent folder
    var dateCreated = file.getDateCreated();
    
    // Append the file information to the sheet
    sheet.appendRow([fileName, fileId, fileOwner, lastModifiedDate, fileUrl, fileSize, parentFolder, dateCreated]);
  }
  
  var folders = folder.getFolders();
  
  while (folders.hasNext()) {
    var subFolder = folders.next();
    var subFolderId = subFolder.getId();
    var subFolderName = subFolder.getName();
    var subFolderOwner = subFolder.getOwner();
    var subFolderModifiedDate = subFolder.getLastUpdated();
    var subFolderUrl = "https://drive.google.com/drive/folders/" + subFolderId;
    var subFolderSize = ''; // Folders don't have a size property
    var subFolderParent = subFolder.getParents().next().getName(); // Get the name of the parent folder
    var subFolderDateCreated = subFolder.getDateCreated();
    
    // Append the folder information to the sheet
    sheet.appendRow([subFolderName, subFolderId, subFolderOwner, subFolderModifiedDate, subFolderUrl, subFolderSize, subFolderParent, subFolderDateCreated]);
    
    // Recursively call the function for subfolders
    listFiles(subFolder, sheet);
  }
}
