class ibox {
//Creates the DOM structure for the iBox, all IDs and names prefixed by the given obj_name, use options for optional things
    constructor(options = {}) {
        if (!ibox.isset(jQuery)) {
            throw "jQuery is required to run iBox!";
        }

        this.object_name = "i" + ibox.randomString(4) + "i";
        $("body").append(
                `<div class="ibox frame ${this.object_name}" data-id="${this.object_name}" style="display:none" data-open="false" onclick="ibox.closeEvent(event,'${this.object_name}')">
            <div style="display:none;" class="ibox scrollHandler ${this.object_name}" data-id="${this.object_name}" data-toTop=""></div>
            <span class="ibox close ${this.object_name}" data-id="${this.object_name}" onclick="ibox.closeIt('${this.object_name}')">&times;</span>
            <div class="ibox loader ${this.object_name}" data-id="${this.object_name}">
                <div class="ibox spinner"></div>
            </div><div class="ibox content ${this.object_name}" data-id="${this.object_name}"></div>
            <div style="clear:both; width:0;height:0;"></div>
        </div>`
                );
        if (ibox.isset(options.active) && options.active) {
            this.open();
        }

        if (ibox.isset(options.content)) {
            this.content_set(options.content);
            this.content_show();


    }
    }

    //removes the dom elements from the page
    remove() {
        $("div.ibox.frame." + this.object_name).remove();
    }

//closes theiBox selected by iBox ID
    static closeIt(ibox_id) {
        ibox.scrollHandler(ibox_id, false);
        $("div.ibox.frame." + ibox_id).hide();
        document.querySelector("div.ibox.frame." + ibox_id).setAttribute("data-open", "false");
    }

//gets the iBox ID
    getId() {
        return this.object_name;
    }

//returns a function for an onclick event that closes the iBox
    closeLink() {
        return "ibox.closeIt('" + this.object_name + "')";
    }

//closes the iBox
    close() {
        ibox.scrollHandler(this.getId(), false);
        $("div.ibox.frame." + this.object_name).hide();
        document.querySelector("div.ibox.frame." + this.object_name).setAttribute("data-open", "false");
    }

//function for window click event, that closes the ibox when clicking on background
    static closeEvent(event, id) {
        var e = event.target;
        if (e === document.querySelector("div.ibox.frame." + id) && $("div.ibox.frame." + id).attr("data-open") === "true") {
            ibox.closeIt(id);
        }
    }

//shows the iBox
    open() {
        ibox.scrollHandler(this.object_name, true);
        $("div.ibox.frame." + this.object_name).show();
        $("div.ibox.frame." + this.object_name).attr("data-open", "true");
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
        $("div.ibox.content." + this.object_name).html("");
    }

//returns the content
    content_get() {
        return $("div.ibox.content." + this.object_name).html();
    }

//hides the loader and shows the content
    content_show() {
        $("div.ibox.content." + this.object_name).show();
        $("div.ibox.loader." + this.object_name).hide();
    }

    //shows the loader and hides the content
    content_hide() {
        $("div.ibox.content." + this.object_name).hide();
        $("div.ibox.loader." + this.object_name).show();
    }

//sets ibox content from an url request
    async content_async_set(url) {
        const data = await fetch(url);
        const txt = await data.text();
        this.content_set(txt);
    }

//appends content from an url to the content
    async content_async_append(url) {
        const data = await fetch(url);
        const txt = await data.text();
        this.content_append(txt);
    }

//checks if variable or object parameter exists, like in php
    static isset(x) {
        if (typeof x !== "undefined") {
            return true;
        } else {
            return false;
        }
    }

//creates a random String with given length
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

//Handles the Scrollbar Visibility for Opening and Closing the iBox
    static scrollHandler(id, state) {
        if (state) {
            $("div.ibox.scrollHandler." + id).data("toTop", $(window).scrollTop());
            $("body").css("overflow-y", "hidden");
            $("html").css("overflow-y", "hidden");
        } else {
            $("body").css("overflow-y", "initial");
            $("html").css("overflow-y", "initial");
            $(window).scrollTop($("div.ibox.scrollHandler." + id).data("toTop"));
        }
    }
}
