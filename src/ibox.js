/**
 * A small JS class for creating html page modals
 * @author Ethan Ziermann <null@unconfigured.com>
 * @name iBOx
 * @version 2.0
 */
class ibox {

  //###########################################################################################
  //CONSTRUCTION & REMOVAL
  //###########################################################################################
  /**
   * Creates the default DOM structure for the iBox modal
   * @param {object} options some additional start settings for the modal
   */
  constructor(options = {}) {
    if (!ibox.isset(jQuery)) {
      throw "jQuery is required to run iBox!";
    }

    this.object_name = "i" + ibox.randomString(4) + "i";
    $("body").append(
      `<div class="ibox frame ${this.object_name}" data-allow-close="true" data-id="${this.object_name}" data-changed="false" style="display:none" data-open="false" onclick="ibox.closeEvent(event,'${this.object_name}')">
            <div style="display:none;" class="ibox scrollHandler ${this.object_name}" data-id="${this.object_name}" data-toTop=""></div>
            <span class="ibox close ${this.object_name}" data-id="${this.object_name}" onclick="ibox.closeIt('${this.object_name}')">&times;</span>
            <div class="ibox loader ${this.object_name}" data-id="${this.object_name}">
                <div class="ibox spinner"></div>
            </div><div class="ibox content ${this.object_name}" data-id="${this.object_name}"></div>
            <div style="clear:both; width:0;height:0;"></div>
            <span class="ibox copyright ${this.object_name}"><small style="opacity: 0.5;">iBox by Ethan Ziermann | <a href="https://github.com/C2H6-383/iBox" target="blank">GitHub</a></small></span>
        </div>`
    );

    if (ibox.isset(options.content)) {
      this.content_set(options.content);
      this.content_show();
    } else {
      $("div.ibox.frame." + this.object_name).attr("data-changed", "false");
    }

    if (ibox.isset(options.active) && options.active) {
      this.open();
    }
  }

  /**
   * removes the DOM structure for this modal from the page (after this, you could delete the object)
   */
  remove() {
    $("div.ibox.frame." + this.object_name).remove();
  }

  //###########################################################################################
  //OPEN, GETID AND CLOSE
  //###########################################################################################

  /**
   * Closes an iBox without having the object, only the ibox ID (is used by the close button and by the 'closeLink' function)
   * @param {string} ibox_id the ID for the ibox modal
   */
  static async closeIt(ibox_id) {
    if ($("div.ibox.frame." + ibox_id).attr("data-allow-close") === "false") {
      return;
    }
    var ev1 = new Event("onclosing");
    var ev2 = new Event("onclosed");
    document.querySelector("div.ibox.frame." + ibox_id).dispatchEvent(ev1);
    $("div.ibox.frame." + ibox_id)[0].classList.add("hiding");
    await ibox.sleep(500);
    ibox.scrollHandler(ibox_id, false);
    $("div.ibox.frame." + ibox_id)[0].classList.remove("hiding");
    $("div.ibox.frame." + ibox_id).hide();
    document.querySelector("div.ibox.frame." + ibox_id).setAttribute("data-open", "false");
    document.querySelector("div.ibox.frame." + ibox_id).dispatchEvent(ev2);
  }

  /**
   * Returns the iBox ID (used for closing and other modifications)
   * @returns {String} the ID
   */
  getId() {
    return this.object_name;
  }

  /**
   * returns a function for an onclick event that closes the iBox
   * @returns {String} the onclick event for closing this iBox
   */
  closeLink() {
    return "ibox.closeIt('" + this.object_name + "')";
  }

  /**
   * closes the iBox
   */
  async close() {
    if (this.allowClose === false) {
      return;
    }
    var ev1 = new Event("onclosing");
    var ev2 = new Event("onclosed");
    document.querySelector("div.ibox.frame." + this.getId()).dispatchEvent(ev1);
    $("div.ibox.frame." + this.getId())[0].classList.add("hiding");
    await ibox.sleep(500);
    ibox.scrollHandler(this.getId(), false);
    $("div.ibox.frame." + this.getId())[0].classList.remove("hiding");
    $("div.ibox.frame." + this.object_name).hide();
    document.querySelector("div.ibox.frame." + this.object_name).setAttribute("data-open", "false");
    document.querySelector("div.ibox.frame." + this.getId()).dispatchEvent(ev2);
  }

  /**
   * Used for closing the modal when user is clicking on the background
   * @param {event} event the click event
   * @param {string} id the ID of the iBox
   */
  static closeEvent(event, id) {
    var e = event.target;
    if (e === document.querySelector("div.ibox.frame." + id) && $("div.ibox.frame." + id).attr("data-open") === "true") {
      ibox.closeIt(id);
    }
  }

  /**
   * Disables or enables the ability to close the iBox by the user (if disabled, the close button will hide)
   * @param  {Boolean} state enable or disable close
   */
  allow_close(state) {
    this.allowClose = state;
    $("div.ibox.frame." + this.object_name).attr("data-allow-close", "" + state);
    if (state) {
      $("span.ibox.close." + this.object_name).show();
    } else {
      $("span.ibox.close." + this.object_name).hide();
    }
  }

  /**
   * Opens the iBox
   */
  open() {
    var ev1 = new Event("onopening");
    var ev2 = new Event("onopened");
    document.querySelector("div.ibox.frame." + this.getId()).dispatchEvent(ev1);
    ibox.scrollHandler(this.object_name, true);
    $("div.ibox.frame." + this.object_name).show();
    $("div.ibox.frame." + this.object_name).attr("data-open", "true");
    document.querySelector("div.ibox.frame." + this.getId()).dispatchEvent(ev2);
  }

  //###########################################################################################
  //EVENTS
  //###########################################################################################
  /**
   * Adds an custom event listener to the ibox
   * @param {string} event_name        the name of the custom event
   * @param {function} callback_function the callback function that should be run
   */
  event_listener_custom_add(event_name, callback_function) {
    document.querySelector("div.ibox.frame." + this.getId()).addEventListener(event_name, callback_function);
  }

  /**
   * removes an custom event listener from the ibox, ONLY WORKS WITH EXTERNAL FUNCTIONS, NOT function() {...}
   * @param  {string} event_name        the custom event name
   * @param  {function} callback_function the callback function
   */
  event_listener_custom_remove(event_name, callback_function) {
    document.querySelector("div.ibox.frame." + this.getId()).removeEventListener(event_name, callback_function);
  }

  //###########################################################################################
  //LOADER
  //###########################################################################################

  /**
   * shows the loading bar
   */
  loader_show() {
    $("div.ibox.loader." + this.object_name).show();
  }

  /**
   * hides the loading bar
   */
  loader_hide() {
    $("div.ibox.loader." + this.object_name).hide();
  }
  //###########################################################################################
  //CONTENT
  //###########################################################################################
  /**
   * sets the iBox content to a new value
   * @param {string} content the new value
   */
  content_set(content) {
    $("div.ibox.content." + this.object_name).html(content);
    $("div.ibox.frame." + this.object_name).attr("data-changed", "true");
  }

  /**
   * Appends to the iBox content some new content
   * @param {string} content the content to append to the already existing content of the iBox
   */
  content_append(content) {
    $("div.ibox.content." + this.object_name).append(content);
    $("div.ibox.frame." + this.object_name).attr("data-changed", "true");
  }

  /**
   * removes all content from the iBox
   */
  content_clear() {
    $("div.ibox.content." + this.object_name).html("");
    $("div.ibox.frame." + this.object_name).attr("data-changed", "true");
  }

  /**
   * returns the iBox content
   * @returns {string} the content of the iBox
   */
  content_get() {
    return $("div.ibox.content." + this.object_name).html();
  }

  /**
   * Shows the iBox content and hides the iBox loading bar
   */
  content_show() {
    if ($("div.ibox.frame." + this.object_name).attr("data-changed") === "true") {
      $("div.ibox.frame." + this.object_name).attr("data-changed", "false");
      document.querySelector("div.ibox.frame." + this.object_name).scrollTop = 0;
    }
    $("div.ibox.content." + this.object_name).show();
    $("div.ibox.loader." + this.object_name).hide();
  }

  /**
   * Hides the iBox content and shows the iBox loading bar
   */
  content_hide() {
    $("div.ibox.content." + this.object_name).hide();
    $("div.ibox.loader." + this.object_name).show();
  }

  /**
   * Fetchs some content from given url, gets the text of the response and set it as new iBox content
   * @param {string} url the url to the file to fetch
   */
  async content_async_set(url) {
    var ev1 = new Event("onasynccontentloading");
    var ev2 = new Event("onasynccontentloaded");
    document.querySelector("div.ibox.frame." + this.getId()).dispatchEvent(ev1);
    this.content_hide();
    const data = await fetch(url);
    const txt = await data.text();
    this.content_set(txt);
    $("div.ibox.frame." + this.object_name).attr("data-changed", "true");
    this.content_show();
    document.querySelector("div.ibox.frame." + this.getId()).dispatchEvent(ev2);
  }

  /**
   * Fetchs some content from given url, gets the text of the response and appends it to the content of the iBox
   * @param {string} url the url to the file to fetch
   */
  async content_async_append(url) {
    var ev1 = new Event("onasynccontentloading");
    var ev2 = new Event("onasynccontentloaded");
    document.querySelector("div.ibox.frame." + this.getId()).dispatchEvent(ev1);
    this.content_hide();
    const data = await fetch(url);
    const txt = await data.text();
    this.content_append(txt);
    $("div.ibox.frame." + this.object_name).attr("data-changed", "true");
    this.content_show();
    document.querySelector("div.ibox.frame." + this.getId()).dispatchEvent(ev2);
  }
  //###########################################################################################
  //OTHER
  //###########################################################################################
  /**
   * checks if the given variable is not undifined (set to an value)
   * @param {mixed} x the variable to check
   * @returns {Boolean} if the variable is set or not
   */
  static isset(x) {
    if (typeof x !== "undefined") {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Creates a random string (uppercase and lowercase letters and numbers) with given length
   * @param {int} length the length of the random string
   * @returns {String} the random string
   */
  static randomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Waits specific time
   * @param {int} ms the time to wait
   * @returns {Promise} waits for the time
   */
  static async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * controls the scrollbar visibility of the iBox and the page body when showing and hiding the iBox
   * @param {string} id the iBox id
   * @param {bool} state whether it opens (true) or closes (false)
   */
  static scrollHandler(id, state) {
    if ($("div.ibox.frame." + id).attr("data-changed") === "true") {
      $("div.ibox.frame." + id).attr("data-changed", "false");
      document.querySelector("div.ibox.frame." + id).scrollTop = 0;
    }
    if (state) {
      $("div.ibox.scrollHandler." + id).data("toTop", $(window).scrollTop());
      $("body").css("overflow-y", "hidden");
      $("html").css("overflow-y", "hidden");
    } else {
      var alliBox = $("div.ibox.frame");
      for (var i = 0; i < alliBox.length; i++) {
        if (alliBox[i].dataset.id !== id && alliBox[i].dataset.open === "true") {
          return;
        }
      }
      $("body").css("overflow-y", "initial");
      $("html").css("overflow-y", "initial");
      $(window).scrollTop($("div.ibox.scrollHandler." + id).data("toTop"));
    }
  }
}
