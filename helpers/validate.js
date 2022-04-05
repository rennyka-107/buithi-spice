export function isValidFileImage(file, callback) {
    let _validFileExtensions = [".jpg", ".jpeg", ".png"];
  
    if (file.length > 0) {
      let blnValid = false;
      for (let j = 0; j < _validFileExtensions.length; j++) {
        let sCurExtension = _validFileExtensions[j];
        if (
          file
            .substr(file.length - sCurExtension.length, sCurExtension.length)
            .toLowerCase() === sCurExtension.toLowerCase()
        ) {
          blnValid = true;
          break;
        }
      }
  
      if (!blnValid) {
        callback(
          "Sorry, " +
            file +
            " is invalid, allowed extensions are: " +
            _validFileExtensions.join(", ")
        );
        return false;
      }
    }
  
    callback("");
    return true;
  }
  