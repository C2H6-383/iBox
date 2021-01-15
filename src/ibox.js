global.ibox = class {
  constructor(ibox_id = null) {
    if (ibox_id === null) {
      this.object_name = "i" + ibox_utils.randomString(4) + "x";

      this.create();
    } else {
      this.object_name = ibox_id;
    }
  }

  create() {
    if (document.querySelector(".ibox.frame." + this.object_name) != null) {
      this.remove();
    }
    if (document.querySelector("body") == null) {
      console.error(
        "There is no body to add the iBox to. Please run the creation (or object instantiation) later, e.g. at the end of the body."
      );
      return;
    }

    document.querySelector("body").innerHTML += `
    <div class="ibox frame ${this.object_name}" data-allow-close="true" data-content="true" data-open="false" onclick="(new ibox('${this.object_name}')).close(event)">
        <div style="display:none" class="ibox scrollHandler ${this.object_name}" data-id="${this.object_name}" data-toTop=""></div>
        <span class="ibox close ${this.object_name}" data-id="${this.object_name}" onclick="(new ibox('${this.object_name}')).close(event)">&times;</span>
        <div class="ibox loader ${this.object_name}" data-id="${this.object_name}">
            <div class="ibox bounce1"></div>
            <div class="ibox bounce2"></div>
            <div class="ibox bounce3"></div>
        </div>
        <div class="ibox content ${this.object_name}" data-id="${this.object_name}"></div>
        <div style="clear:both; width:0;height:0;"></div>
    </div>
        `;

    this.fire("created");

    this.content_hide();
    this.allow_close(true);
  }

  remove() {
    this.fire("destroy");
    this.allow_close(true);
    this.close();
    this.get_dom().remove();
  }

  scroll_handle(state) {
    if (this.get_dom().dataset.changed === "true") {
      this.get_dom().dataset.changed = "false";
      this.get_dom().scrollTop = 0;
    }
    if (state && ibox_utils.ACTIVE_INSTANCES == 0) {
      //show
      document.querySelector(".ibox.scrollHandler." + this.object_name).dataset.toTop = window.scrollY;
      document.querySelector("body").style.overflowY = "hidden";
      document.querySelector("body").style.marginTop = (window.scrollY * -1).toString() + "px";
      document.querySelector("body").style.paddingRight = ibox_utils.getScrollbarWidth() + "px";
    } else if (!state && ibox_utils.ACTIVE_INSTANCES == 1) {
      //hide
      document.querySelector("body").style.overflowY = "auto";
      document.querySelector("body").style.marginTop = "0px";
      document.querySelector("body").style.paddingRight = "0px";
      window.scroll(window.scrollX, document.querySelector(".ibox.scrollHandler." + this.object_name).dataset.toTop);
    }
  }

  close(event = null) {
    if (event != null) {
      if (
        !(
          this.get_dom().dataset.open == "true" &&
          (event.target == this.get_dom() || event.target == this.get_dom().querySelector(".close"))
        )
      ) {
        return;
      }
    }
    return this.display(false);
  }

  hide() {
    return this.close();
  }

  allow_close(state) {
    this.get_dom().dataset.allowClose = state.toString();
    if (state) {
      this.get_dom()
        .querySelector(".close")
        .classList.add("visible");
    } else {
      this.get_dom()
        .querySelector(".close")
        .classList.remove("visible");
    }
  }

  open() {
    return this.display(true);
  }

  show() {
    return this.open();
  }

  display(state) {
    if (!ibox_utils.closeable(this.object_name) && state == false) {
      this.fire("close_failed");
      return;
    }

    this.scroll_handle(state);

    this.get_dom().dataset.open = state.toString();

    if (state) {
      //show
      ibox_utils.ACTIVE_INSTANCES++;
      this.fire("open");
      this.get_dom().classList.add("visible");
      if (this.get_dom().dataset.content == "true") {
        this.content_show();
      }
    } else {
      //hide
      ibox_utils.ACTIVE_INSTANCES--;
      this.fire("close");
      if (this.content_display()) {
        this.get_dom().dataset.content = "true";
      } else {
        this.get_dom().dataset.content = "false";
      }
      this.get_dom().classList.remove("visible");
      this.content_hide();
    }
  }

  event_add(event_name, callback) {
    return this.get_dom().addEventListener(event_name, callback);
  }

  content_set(text) {
    this.get_dom().querySelector(".content").innerHTML = text;
    ibox_utils.exec_body_scripts(this.get_dom().querySelector(".content"));
  }

  content_get() {
    return this.get_dom().querySelector(".content").innerHTML;
  }

  content_append(text) {
    this.get_dom().querySelector(".content").innerHTML += text;
    ibox_utils.exec_body_scripts(this.get_dom().querySelector(".content"));
  }

  content_clear() {
    return this.content_set("");
  }

  content_display(state = null) {
    if (state == null) {
      return this.get_dom()
        .querySelector(".content")
        .classList.contains("visible");
    }
    if (state) {
      //show
      this.fire("content_show");
      this.get_dom()
        .querySelector(".loader")
        .classList.remove("visible");
      this.get_dom()
        .querySelector(".content")
        .classList.add("visible");
    } else {
      //hide
      this.fire("content_hide");
      this.get_dom()
        .querySelector(".loader")
        .classList.add("visible");
      this.get_dom()
        .querySelector(".content")
        .classList.remove("visible");
    }
  }

  content_show() {
    return this.content_display(true);
  }

  content_hide() {
    return this.content_display(false);
  }

  async content_async_set(url) {
    this.fire("content_asnyc_loading");
    this.content_hide();
    const req = await fetch(url);
    const txt = await req.text();
    this.content_set(txt);
    this.content_show();
    this.fire("content_asnyc_loaded");
  }

  async content_async_append(url) {
    this.fire("content_asnyc_loading");
    this.content_hide();
    const req = await fetch(url);
    const txt = await req.text();
    this.content_append(txt);
    this.content_show();
    this.fire("content_asnyc_loaded");
  }

  static get_instance(id) {
    return new ibox(id);
  }

  get_dom() {
    return document.querySelector(".ibox.frame." + this.object_name);
  }

  static event_fire(event_name, id) {
    return document.querySelector(".ibox.frame." + id).dispatchEvent(new CustomEvent(event_name, { detail: new ibox(id) }));
  }

  fire(event_name) {
    return ibox.event_fire(event_name, this.object_name);
  }
};

let _activeInstances = 0;
global.ibox_utils = class {
  static get ACTIVE_INSTANCES() {
    return _activeInstances;
  }
  static set ACTIVE_INSTANCES(value) {
    _activeInstances = value;
  }

  static randomString(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

  static closeable(id) {
    return document.querySelector(".ibox.frame." + id).dataset.allowClose == "true";
  }

  static getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  static exec_body_scripts(body_el) {
    // Finds and executes scripts in a newly added element's body.
    // Needed since innerHTML does not run scripts.
    //
    // Argument body_el is an element in the dom.

    function nodeName(elem, name) {
      return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
    }

    function evalScript(elem) {
      var data = elem.text || elem.textContent || elem.innerHTML || "",
        head = document.getElementsByTagName("head")[0] || document.documentElement,
        script = document.createElement("script");

      script.type = "text/javascript";
      try {
        // doesn't work on ie...
        script.appendChild(document.createTextNode(data));
      } catch (e) {
        // IE has funky script nodes
        script.text = data;
      }

      head.insertBefore(script, head.firstChild);
      head.removeChild(script);
    }

    // main section of function
    var scripts = [],
      script,
      children_nodes = body_el.childNodes,
      child,
      i;

    for (i = 0; children_nodes[i]; i++) {
      child = children_nodes[i];
      if (nodeName(child, "script") && (!child.type || child.type.toLowerCase() === "text/javascript")) {
        scripts.push(child);
      }
    }

    for (i = 0; scripts[i]; i++) {
      script = scripts[i];
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      evalScript(scripts[i]);
    }
  }
};

export default ibox;
