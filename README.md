# **iBox**
##### a small, multipurpose Modal Library for displaying dynamic content

## Requirements
- jQuery 3.4.1 or higher

## Getting Started
1. Download the source files from this repository
2. Extract the archive
3. Copy the *ibox.css* and *ibox.js* files from the *src* folder into your website
4. Include it in the header of your site
5. Open a script tag **in the body** your site
6. Create a iBox object as following:
```javascript
var YourObjectName = new ibox();
```
7. You are ready to go...

## Object Creation Parameters
The following lines are showing, what you can do when you are creating your ibox object.

1. pass an object with options:
	- active (true/false) - should the ibox get opened on creation
	- content (text/html) - puts the given content into the lightbox

You can pass the object like this:
```javascript
var YourObjectName=new ibox({
	active: true,
	content: "some content"
});
```

*Other options are added in later versions.*

## Functions

The following functions could be used with the ibox object:
##### General Functions
- **getId()** - returns the internal ID of the iBox
- **open()** - shows the iBox
- **close()** -  close the iBox
- **closeLink()** - returns a function for an HTML onclick event that closes the iBox (for buttons or links in the iBox)
- **remove()** - removes the dom structure of the ibox from the document
- **allow_close(state)** - disables or enables the ability for the user to close the ibox
##### Loading Animation Functions
- **loader_show()** - shows the loading animation
- **loader_hide()** - hides the loading animation
#### Events
- **event_listener_custom_add(event_name, callback_function)** - add a custom iBox event listener with callback function
- **event_listener_custom_remove(event_name, callback_function)** - removes a custom iBox event listener, ONLY WORKS IF THE CALLBACK FUNCTION IS EXTERNAL (not like so: *function() {...}* )
##### Content Functions
- **content_set(content)** - sets the iBox content
- **content_append(content)** - appends to the iBox content
- **content_get()** - returns the iBox content
- **content_clear()** - clears the iBox content
- **content_show()** - shows the content and hides the loader
- **content_hide()** - hides the content and shows the loader
- **content_async_set(url)** - gets content from an url and puts it in the ibox and manages the visibility of the loading bar automatically
- **content_async_append(url)** - gets content from an url and **appends** it to the current content in the ibox and manages the visibility of the loading bar automatically
##### Other *static* Utility Functions
- **isset(var)** - checks if a variable or object value exists (like in PHP)
- **randomString(length)** - returns a random string with given length
- **closeIt(ibox_id)** - closes an iBox with given ID (without having the created object)
- **closeEvent(event, ibox_id)** - checks if the background frame of the ibox with given id was clicked and if so, it closes the ibox with given id. (attached to the frame of the ibox)

## Custom Events
- **onclosing** - runs *before* the iBox closes
- **onclosed** -  runs *after* the iBox closed
- **onopening** -  runs *before* the iBox opens
- **onopened** -  runs *after* the iBox opened
- **onasynccontentloading** - runs *before* async content is fetched and added to the iBox
- **onasynccontentloaded** - runs *after* async content is fetched and added to the iBox

## Release Notes
**1.0**
- added general functions like open, close, set content...

**1.1**
- fixed some errors and added content_hide() and content_show functions...

**1.2**
- fixed some erros
- added async functions
- added remove functions

**2.0**
- new styles and animations
- works with multiple iBoxes seamlessly
- code commented

**2.1**
- added custom events
- controls the ability to close the iBox by the user
