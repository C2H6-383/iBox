class ibox {
  //Creates the DOM structure for the iBox, all IDs and names prefixed by the given obj_name
  constructor(obj_name) {
    if (typeof jQuery !== "function") {
      throw "jQuery is required to run iBox!";
    }
    this.object_name = obj_name;
    $(document).ready(function() {
      $("body").append(
        '<div class="ibox frame ' +
          obj_name +
          '"><span class="ibox close ' +
          obj_name +
          '" onclick="ibox' +
          '.close(\'' +
          obj_name +
          '\')"><span>&times;</span></span><div class="ibox loader ' +
          obj_name +
          '"><span></span></div><div class="ibox content ' +
          obj_name +
          '"></div></div>'
      );
    });
  }

  //closes the ibox selected by object name
  static close(obj_nbame) {}
}
