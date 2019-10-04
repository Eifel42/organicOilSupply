  function stateText(code) {
    // to convert to value
    const productionCode = code * 1;
    let text = "";
    switch(productionCode) {
      case 0:
        text = "Harvested";
        break;
      case 1:
        text = "Pressed";
        break;
      case 2:
        text = "Bottled";
        break;
      case 3:
        text = "Delivered";
        break;
      case 4:
        text = "InShop";
        break;
      case 5:
        text = "Sold";
        break;
       default:
         text = "Not define";
    }

    return text;
  }

  function convertDateToString(processDate) {

      if(processDate && processDate > 0) {
        return new Date (processDate*1);
      }
      return "";
  }

  function parseDate(dateString) {

    if(dateString && dateString.length > 0) {
      return Date.parse(dateString);
    }
    return Date.now();
  }

  function gasPerTransaction() {
    return 4800000;
  }


  export default {stateText, convertDateToString, parseDate, gasPerTransaction};
