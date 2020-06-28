global.ibox = class {
  constructor() {
    this.object_name = "i" + ibox_utils.randomString(4) + "x";

    document.addEventListener("DOMContentLoaded", this.create);

    if (
      document.readyState === "complete" ||
      document.readyState === "loaded" ||
      document.readyState === "interactive"
    ) {
      this.create();
    }
  }

  create() {
    document.querySelector("body").innerHTML += `
    <div class="ibox frame ${this.object_name}" data-allow-close="true" data-id="${this.object_name}" data-changed="false" style="display:none" data-open="false" onclick="ibox.closeEvent(event,'${this.object_name}')">
        <div style="display:none;" class="ibox scrollHandler ${this.object_name}" data-id="${this.object_name}" data-toTop=""></div>
        <span class="ibox close ${this.object_name}" data-id="${this.object_name}" onclick="ibox.closeIt('${this.object_name}')">&times;</span>
        <div class="ibox loader ${this.object_name}" data-id="${this.object_name}">
            <div class="ibox bounce1"></div>
            <div class="ibox bounce2"></div>
            <div class="ibox bounce3"></div>
        </div>
        <div class="ibox content ${this.object_name}" data-id="${this.object_name}"></div>
        <div style="clear:both; width:0;height:0;"></div>
    </div>
        `;
  }

  remove() {
    document.querySelector("div.ibox.frame." + this.object_name).remove();
  }

  static closeIt(ibox_id) {}

  static scrollHandler(id, state) {}

  closeLink() {}

  close() {}

  static closeEvent(event, id) {}

  allow_close(state) {}

  open() {}

  show() {
    return this.open();
  }

  event_add() {}

  content_set(text) {}

  content_append(text) {}

  content_get() {}

  content_clear() {}

  content_display(state) {}

  content_show() {
    return this.content_display(true);
  }

  content_hide() {
    return this.content_display(false);
  }

  async content_async_set(url) {}

  async content_async_append(url) {}
};

global.ibox_utils = class {
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

  static async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static isset(x) {
    if (typeof x !== "undefined") {
      return true;
    } else {
      return false;
    }
  }
};

export default ibox;
