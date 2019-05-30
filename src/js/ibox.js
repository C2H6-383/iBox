class ibox {
  //Creates the DOM structure for the iBox, all IDs and names prefixed by the given obj_name, use options for optional things
  constructor(options = {}) {
    if (!ibox.isset(jQuery)) {
      throw "jQuery is required to run iBox!";
    }

    this.object_name = ibox.randomString(5);

    $("body").append(
      '<div class="ibox frame ' +
        this.object_name +
        '" style="display:none"><span class="ibox close ' +
        this.object_name +
        ' " onclick="ibox.close(\'' +
        this.object_name +
        '\')">&times;</span><div class="ibox loader ' +
        this.object_name +
        '">' +
        '<div class="ibox spinner"></div>' +
        '</div><div class="ibox content ' +
        this.object_name +
        '"></div></div>'
    );

    if (ibox.isset(options.active) && options.active) {
      this.open();
    }

    if (ibox.isset(options.content)) {
      this.loader_hide();
      this.display_content(options.content);
    }
  }

  //closes theiBox selected by object name
  static closeIt(ibox_id) {
    $("div.ibox.frame." + ibox_id).hide();
  }

  getId() {
    return this.object_name;
  }

  //returns a function for an onclick event that closes the iBox
  closeLink() {
    return "ibox.closeIt('"+this.object_name+"')";
  }

  //closes the iBox
  close() {
    $("div.ibox.frame." + this.object_name).hide();
  }

  //shows theiBox
  open() {
    $("div.ibox.frame." + this.object_name).show();
  }

  //shows the loading bar
  loader_show() {
    $("div.ibox.loader." + this.object_name).show();
  }

  //hides the loading bar
  loader_hide() {
    $("div.ibox.loader." + this.object_name).hide();
  }

  //sets the iBox content
  content_set(content) {
    $("div.ibox.content." + this.object_name).html(content);
  }

  //appends to the iBox content
  content_append(content) {
    $("div.ibox.content." + this.object_name).append(content);
  }

  //clears the content
  content_clear() {
    $("div.ibox.content." + this.object_name).html('');
  }

  //returns the content
  content_get() {
    return $("div.ibox.content." + this.object_name).html();
  }

  //checks if variable or object parameter exists, like in php
  static isset(x) {
    if (typeof x !== "undefined") {
      return true;
    } else {
      return false;
    }
  };

  static randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
}
