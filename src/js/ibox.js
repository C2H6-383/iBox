class ibox {
  //Creates the DOM structure for the iBox, all IDs and names prefixed by the given obj_name
  constructor(obj_name, options = {}) {
    if (!ibox.isset(jQuery)) {
      throw "jQuery is required to run iBox!";
    }

    this.object_name = obj_name;
    $(document).ready(function() {
      $("body").append(
        '<div class="ibox frame' +
          obj_name +
          '" style="display:none"><span class="ibox close ' +
          obj_name +
          ' " onclick="ibox.close(\'' +
          obj_name +
          '\')">&times;</span><div class="ibox loader ' +
          obj_name +
          '"><span></span></div><div class="ibox content ' +
          obj_name +
          '"></div></div>'
      );

      if (ibox.isset(options.active) && options.active) {
        this.open();
      }
    });
  }

  //closes the ibox selected by object name
  static close(obj_name) {
    $("div.ibox.frame." + obj_name).toggleClass("opening");
    $("div.ibox.frame." + obj_name).toggleClass("closing");
    $("div.ibox.frame." + obj_name).hide();
  }

  open() {
    $("div.ibox.frame." + obj_name).toggleClass("closing");
    $("div.ibox.frame." + obj_name).toggleClass("opening");
    $("div.ibox.frame." + obj_name).show();
  }

  //checks if variable or object parameter exists, like in php
  static isset(x) {
    if (typeof x !== "undefined") {
      return true;
    } else {
      return false;
    }
  }
}
