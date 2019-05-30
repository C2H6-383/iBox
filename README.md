# **iBox**
##### a small, multipurpose Modal Library for displaying dynamic content

## Requirements
- jQuery 3.4.1 or higher

## Getting Started
1. Download the source files from this repository
2. Extract the archive
3. Copy the *ibox.css* and *ibox.js* files from the *src* folder into your website
4. Include it in the header of your site
5. Open a script tag at the bottom of your site
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
	active: true;
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
##### Loading Animation Functions
- **loader_show()** - shows the loading animation 
- **loader_hide()** - hides the loading animation
##### Content Functions
- **content_set(content)** - sets the iBox content
- **content_append(content)** - appends to the iBox content
- **content_get()** - returns the iBox content
- **content_clear()** - clears the iBox content
##### Other *static* Utility Functions
- **isset(var)** - checks if a variable or object value exists (like in PHP)
- **randomString(length)** - returns a random string with given length
- **closeIt(ibox_id)** - closes an iBox with given ID (without having the created object)

------------

## Release notes
**1.0**
- added general functions like open, close, set content...
