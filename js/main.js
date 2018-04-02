$(document).ready(function () {
  var outputDict = {
    minutes: "",
    hours: "",
    day: "",
    month_num: "",
    dow: ""
  };

  function updateConsole(txt) {
    $("#output").text(txt);
  }

  function updateConsoleInfo(txt) {
    $("#outputComment").text(txt);
  }

  function isNumeric(n) {
    // Return true if n is numeric.
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function compileConsoleStr() {
    var s =
      outputDict["minutes"] +
      " " +
      outputDict["hours"] +
      " " +
      outputDict["day"] +
      " " +
      outputDict["month_num"] +
      " " +
      outputDict["dow"]
    updateConsole(s);
    compileExplainerStr();
  }

  function pad(num, size) {
    // Pad numbers by the chosen size and return them.
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  function calculateTime() {
    // Calculate the time and format it into 12-hour.
    if (outputDict["hours"] != "" && outputDict["minutes"] != "") {
      if (outputDict["hours"] > 12) {
        return outputDict["hours"] - 12 + ":" + pad(outputDict["minutes"], 2) + "PM"
      } else if (outputDict["hours"] < 1) {
        return "12:" + pad(outputDict["minutes"], 2) + "AM"
      } else {
        return outputDict["hours"] + ":" + pad(outputDict["minutes"], 2) + "AM"
      }
    } else if (outputDict["minutes"] != "" && outputDict["hours"] == "") {
      return "12:" + pad(outputDict["minutes"], 2) + "AM"
    }
  }

  function getOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function compileExplainerStr() {
    var s = "Run job "

    s += "at " + calculateTime() + ", ";

    if (outputDict["day"] == "*") {
      s += "every day, "
    } else if (outputDict["day"] != "") {
      s += "on the " + getOrdinal(outputDict["day"]) + ", "
    }

    if (outputDict["month_num"] == "*") {
      s += "every month, "
    } else if (outputDict["month_num"] != "") {
      // Array of months intentionally contains January twice, since some will enter 0 for January while thinking in arrays.
      s += "in " + ["January", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][outputDict["month_num"]]
    }

    if (outputDict["dow"] == "*") {
      s += "."
    } else if (outputDict["dow"] != "") {
      s += ", and every " + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][outputDict["dow"]] + "."
    }
    updateConsoleInfo(s);
  }

  // Minutes field (0 - 59)
  $('#minutes').on("input", function () {
    if (isNumeric($(this).val()) && $(this).val() >= 0 && $(this).val() <= 59 || $(this).val() == "*") {
      outputDict["minutes"] = $(this).val();
    } else {
      outputDict["minutes"] = "0";
    }
    compileConsoleStr();
  });

  // Hours field (0 - 23)
  $('#hours').on("input", function () {
    if (isNumeric($(this).val()) && $(this).val() >= 0 && $(this).val() <= 23 || $(this).val() == "*") {
      outputDict["hours"] = $(this).val();
    } else {
      outputDict["hours"] = "0";
    }
    // Addresses people entering hours without minutes.
    if (outputDict["minutes"] == "") {
      outputDict["minutes"] = "0";
    }
    compileConsoleStr();
  });

  // Day field (1 - 31)
  $('#day').on("input", function () {
    if (isNumeric($(this).val()) && $(this).val() >= 1 && $(this).val() <= 31 || $(this).val() == "*") {
      outputDict["day"] = $(this).val();
    } else {
      outputDict["day"] = 1;
    }
    compileConsoleStr();
  });

  // Month field (1 - 12)
  $('#month_num').on("input", function () {
    if (isNumeric($(this).val()) && $(this).val() >= 1 && $(this).val() <= 12 || $(this).val() == "*") {
      outputDict["month_num"] = $(this).val();
    } else {
      outputDict["month_num"] = 1;
    }
    compileConsoleStr();
  });

  // Day of Week field (0 - 6)
  $('#dow').on("input", function () {
    if (isNumeric($(this).val()) && $(this).val() >= 0 && $(this).val() <= 6 || $(this).val() == "*") {
      outputDict["dow"] = $(this).val();
    } else {
      outputDict["dow"] = "*";
    }
    compileConsoleStr();
  });
});