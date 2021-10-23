export const fnGetExtension = (file) => {
  var fileInput = file;
  var fileName = fileInput.name;
  var fileExtension = fileName.split(".").pop();
  return fileExtension;
};

export const validateFiles = (files) => {
  for (var i = 0; i < files?.length; i++) {
    var ext = files[i].name.split(".").pop();
    if (ext !== "mp4" && ext !== "m4v" && ext !== "jpg") {
      alert("Invalid data");
      return false;
    }
    return true;
  }
};