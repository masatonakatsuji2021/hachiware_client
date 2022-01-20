<p align="center">
    <img src="https://github.com/masatonakatsuji2021/hachiware_client/raw/master/logo.png" alt="hachiware server">
</p>

# Hachiware_Client

<a href="https://github.com/masatonakatsuji2021/hachiware_client/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/masatonakatsuji2021/hachiware_client"></a>
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/masatonakatsuji2021/hachiware_client">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/masatonakatsuji2021/hachiware_client">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/masatonakatsuji2021/hachiware_client">
<img src="https://img.shields.io/badge/author-Nakatsuji%20Masato-brightgreen" alt="author Nakatsuji Masato">
<img src="https://img.shields.io/badge/made%20in-Japan-brightgreen" alt="made in japan">

A simple and easy-to-use SPA (Single-Page-Action) framework.

---

## # How do you use this?

First, install the npm package with the following command.

```code
npm i hachiware_client
```

All you have to do is add the package require code to index.js etc. and you're ready to go.

```javascript
const client = require("hachiware_client");
```

Optionally create a directory, create a index.js file and write the following code.

```javascript
const client = require("hachiware_client");
client(__dirname);
```

Depending on the command line arguments at startup, the console performs various scaffolds, such as creating a SPA project or running a build.

See [here](#consoles) for a description of the functions of various commands.

---

## # Project file/directory structure

Basically, the file / directory structure for each project is as follows.

```
_build                  <= Build directory
assets                  <= Static area (Place static files such as css files and images here)
htmls                   <= Placement area for HTML tags (rendering) such as pages, layouts, sections, etc.
    L pages             <= Placement area for HTML files for pages
    L sections          <= Placement area for HTML files for sections
    L layouts           <= Placement area of HTML file for layout
srcs                    <= Script file installation area(".js" file)
    L pages             <= Script file installation area for pages
    L sections          <= Script file installation area for sections
    L forms             <= Script file installation area for forms
    L validators        <= Script file installation area for validators
    L models            <= Script file installation area for models
    L statics           <= Script file installation area for statics
    routings.js         <= Routing script file
    setting.js          <= Initial setting script file
index.html              <= index HTML file
client.json             <= Client settings json 
```

It is necessary to arbitrarily change the files/directories other than the build directory "_build".

|File/directory name|Overview|
|:--|:--|
|_build|Build directory<br>No changes are required for this directory or the files inside, as it is automatically generated when the build is executed.<br>The target file name may be different depending on the SPA project due to the setting of client.json.|
|assets|Static file installation area<br>Place css files, images, external js libraries, etc. in this.|
|htmls|Placement area for HTML tags (rendering) such as pages, layouts, sections, etc.|
|- page|Placement area for HTML files for pages.<br>The explanation about the page is explained [here](#page).|
|- sections|Placement area for HTML files for sections<br>The explanation about the section is explained [here](#sections).|
|- layouts|Placement area of HTML file for layout.<br>The explanation about the layout is explained [here](#page_layout).|
|srcs|Script file installation area(".js" file)|
|- pages|Script file installation area for pages.<br>The explanation about the page is explained [here](#page).|
|- sections|Script file installation area for sections.<br>The explanation about the section is explained [here](#sections).|
|- forms|Script file installation area for forms.<br>The explanation about the form is explained [here](#form).|
|- validators|Script file installation area for validators.<br>The explanation about the validator is explained [here](#validator).|
|- models|Script file installation area for models.<br>The explanation about the model is explained [here](#model).|
|- statics|Script file installation area for statics.<br>The explanation about the model is explained [here](#static).|
|- routings.js|Routing script file.<br>Routing is explained [here](#routing).|
|- setting.js|Initial setting script file.<br>Setting is explained [here](#setting).|
|index.html|index HTML file.<br>The target file name may be different depending on the SPA project due to the setting of client.json.|
|client.json|Client settings json.<br>This file is required.|

---

## # Basic flow

The basic flow of creating a SPA project is as follows

```
1. Creating a SPA project. (create)
            |
2. Creation/modification of various source files
            |
3. Build SPA project (build)
            |
4. Check the HTML file after the build is completed with a browser.
   (Or deploy the build file to your app)
```

---

<a id="consoles"></a>

## # Main commands

The dedicated console will be displayed with the following command.

```
> node . 
*** Hachiware Client **************

Command Input: :
```

Enter the command from here.

The commands currently available are as follows.

|command|Overview|
|:--|:--|
|create [-image={image name}] [-project={project name}] [-platform={platform}] [-build={build flg}]|Create a SPA project from a image.|
|build [-project={project name}]|Build the SPA project.<br>By executing the build, it will be converted into a form that can be displayed in the browser.|

You can also short the command on a single line as shown below.  
Example of creating a SPA project.

```
> node . create
```

---

## # Creating a SPA project

To create a new SPA project, use the ``node .create`` command.

```
> node . create
```

After executing the command, the dialogue will proceed as shown below, and after selecting "y" at the end,
A new SPA project is created.

```
> node . create
*** Hachiware Client **************

Client Create
Create a new SPA project.

Q. Specify the Image Name to create. (default) :
Q. If you have a directory path to create a SPA project, please specify it. () : 
Q. If you have a platform to use, please specify. [web, electron, cordova, nw.js] (web) :
Q. Do you want to run the build after completing the SPA project creation? [y/n] (y)  :

  Image                            : default
  SPA Project Name                 : 
  Platform                         : web
  Build after creation is complete : true

Q.Create a SPA project with the above contents. [y/n] (y) : 
Mkdir ********************/20220115
Mkdir ********************/assets
Mkdir ********************/assets/img/
.....
.....

.....Completed!

... BYE.
```

You can also omit the dialogue by specifying an option.  
Dialogue is omitted only for the set options.

```
> node . create -image="default" -project="test" -platform="web" -build
```

After creating a new test directory with the above command, export the contents of the default image.  
After executing the command, the following result will be output.

```
> node . create -image="default" -project="test" -platform="web" -build
*** Hachiware Client **************


Client Create
Create a new SPA project.


  Image                            : default
  SPA Project Name                 : test
  Platform                         : web
  Build after creation is complete : true

Q.Create a SPA project with the above contents. [y/n] (y) :
Mkdir **********/test1
Mkdir **********/test1/assets
Mkdir **********/test1/assets/css
Mkdir **********/test1/assets/img
Mkdir **********/test1/htmls
.....
.....


.....Completed!

... BYE.
```
This will export the test directory and the contents of the image specified in it.

---

## # Build SPA project

```
> node . build
```

The build will be executed for the directory (SPA project) specified by the above command.
You can optionally specify the SPA project name. If not specified,   
the SPA project provided directly below will be built.

```
> node . build -project="test"
*** Hachiware Client **************

Client Build

# Jquery Buffer exists.
# exist /_build
# Jquery Set
# Read CoreLib hachiware.js
# Read CoreLib hachiware.sync.js
# Read CoreLib hachiware.tool.js
......
......

Build Complete!

... BYE.
```

After the build is complete, the "_build" directory will be created or updated in the directory.  
After that, open the ``index.html`` file in the "_build" directory with a browser etc. and it will be displayed on the screen.

---

## # Initial setting by client.json file

The ``client.json`` file directly under the project directory is the file that describes the settings at the time of build execution.  
This file is required when running a build.

```json
{
    "name": "project name",
    "inputHtml": "index.html",
    "outputHtml": "index.html",
    "build": "_build"
}
```

|colum name|overview|
|:--|:--|
|name|Official name of SPA project.|
|inputHtml|HTML file name to read for SPA.|
|outputHtml|HTML file name to be output at build time for SPA target.|
|build|Output destination build directory.|

---

<a id="routing"></a>

## # Routing

Routing is a setting to decide which page to display (or execute script) for each URL.  

Routing is specified in the ``srcs/routing.js`` file as follows.

```javascript
hachiware.routing({
    release: {
        "/":"main",
        "/page_a": "page_a",
        "/page_b": "page_b/index",
        "/page_b/detail/{:id}": "page_b/detail",
        "/page_b/edit/{:id?}": "page_b/edit",
        "/page_c": {
            "/":"page_c/index",
            "/detail/{:id}":"page_c/detail",
        },
    },
    error: {
        "/":"error",
    },
});
```

Routing can be broadly divided into release and error.

### - Basic routing

Basic routing is specified in release in the form of {URL}: {display page name}.

```javascript
release: {
    //....
    "/": "main",
    "/page_a": "page_a",
    //....
},
```

In the above case, the URL is ``/`` (Top page),  
``htmls/pages/main.html`` as HTML, ``scrs/pages/main.js`` as the script file
Install each.

Even if the URL is ``/page_a``,  
``htmls/pages/page_a.html`` as HTML, ``scrs/pages/page_a.js`` as the script file
Install each.

The page name can be specified across the directory.

```javascript
release: {
    //....
    "/page_b": "page_b/index",
    //....
},
```

In the above case,  
Set ``htmls/pages/page_b/index.html`` as HTML and ``scrs/pages/page_b/index.js`` as script file.

### - Routing with arguments

You can also specify a dynamic value as an argument to the URL.    
The argument part is specified by ``{: {argument name}}``.

For example, in the following case,  
The requested URL is like ``/page_b/detail/1`` or ``/page_b/detail/2``
The ``{:id}`` part allows you to assign dynamic values.

```javascript
release: {
    //....
    "/page_b/detail/{:id}": "page_b/detail",
    //....
},
```

If you want to get the argument value, one way is to get it with the callback argument on page.

```javascript
hachiware.page("page_b",{

    open: function(args){

        conosle.log(args);
    },

});
```

If synchronization is supported, the argument position will shift.

```javascript
hachiware.page("page_b",{

    sync_open: function(resolve, args){

        conosle.log(args);

        resolve();
    },

});
```

Another way to get it is to use the common variable ``this.$Routes.aregment`` of the loadCore class.  
This method can also be obtained from places other than page.

```javascript
console.log(this.$routes.aregment);
```

### - Arbitrary argument specification

In the above argument routing, you must put some value in the argument specification.

To specify any argument, specify ``{:{argument name}?}`` and "?" After the argument name.

```javascript
release: {
    //....
    "/page_b/edit/{:id?}": "page_b/edit",
    //....
},
```

You can now access either ``/page_b/edit`` or ``/page_b/edit/3``.

### - Routing scope setting

By using scopes in routing, you can group URLs in the upper hierarchy.

```javascript
release: {
    //....
    "/page_c": {
        "/":"page_c/index",
        "/detail/{:id}":"page_c/detail",
    },
    //....
},
```

In the above case, the routing is the same as below, but ``/page_c`` can be omitted in the description.

```javascript
release: {
    //....
    "/page_c":"page_c/index",
    "/page_c/detail/{:id}":"page_c/detail",
    //....
},
```

If the hierarchical structure becomes more complicated, try summarizing each routing with a scope.

### - Error routing

You can move to the error page in case the page does not exist or an unexpected error occurs.

Error routing is specified in error as follows.

```javascript
error: {
    "/": "error",
},
```

The description method does not change the basic routing, only the specified location has changed from within release to within error.

You can also change the error page for each URL.  
In the following cases, URLs after ``/page_a`` will display an error page dedicated to page_a.

```javascript
error: {
    "/": "error",
    "/page_a": "page_a/error",
},
```

---

<a id="objects"></a>

## # Client object structure

In Hachiware Client, the parts corresponding to each block such as pages, sections, forms, etc. are formed in the form of objects.
(From now on, to avoid confusion with other objects, the notation will be the client object.)

App developers add and combine this client object when needed to achieve a single SPA.

When creating a client object, consider the readability and maintainability of the source.  
Separate source files for individual objects in the specified directory.

(It is possible to build even if the above is not observed, but there is a high possibility that the code structure will be complicated.)

The client objects configured by default are:

|client-object name|overview|
|:--|:--|
|[Page](#page)|Client object for each page display.<b>Be sure to add this object when you add a page.|
|[Section](#section)|A client object that is further separated into individual parts within the page.<br>Can be reused on another page by making parts.|
|[Form](#form)|Client object to set callbacks when submitting or resetting a form, initial values or choices in the form.|
|[Model](#model)|Client object as business logic.|
|[Validator](#validator)|Client object used for validation check of input data.|
|[Static](#static)|Client object for storing static data.<br>Used for pagination and reference to different types of client objects.|

For example, if you set up the main page, create a ``srcs/pages/main.js`` file and set the client object in the form of the following code.  
The open method is a callback that is executed after page navigation.

```javascript
hachiware.page("main",{

    open: function(){

        console.log("Main Page Open");
    },

});
```

If another page ``page_a`` is newly installed, create a ``srcs/pages/page_b.jsP`` file and write the following code.

```javascript
hachiware.page("page_a",{

    open: function(){

        console.log("Page_A Page Open");
    },

});
```

By setting a page callback etc. by dividing the file for each page as described above Maintainability and readability can be improved.

## # Common variables and methods of client object

The client object provides methods adapted for each object such as page and secsion based on the ``loadCore`` class.

The `` loadCore`` class provides common variables and methods that can be used with any client object.  
(Only some static exceptions.)

The main common functions and methods are as follows.

| method |overview|
|:--|:--|
|[$type](#lc_type)|Object type.|
|[$name](#lc_name)|Object name.|
|$base|Base object<br>Normally, it is not used directly.|
|[$sync](#lc_sync)|Sync object for synchronization.|
|[$tool](#lc_tool)|Tool object for basic methods.|
|[$routes](#lc_routes)|Routing result.|
|[$storage](#lc_storate)|For storage operation.|
|[$setView](#lc_setview)|For displaying HTML data.<br>Only available for pages and sections.|
|[$section](#lc_section)|Use of Section object.|
|[$form](#lc_form)|Use of Form object.|
|[$model](#lc_model)|Use of Model object.|
|[$validator](#lc_validator)|Use of Validator object.|
|[$static](#lc_static)|Use of Static objects.|
|[$redirect](#lc_redirect)|Move to another page.|
|[$back](#lc_back)|Return to the previous page.|
|[$forward](#lc_forward)|Go back to the previous page.|

<a id="lc_type"></a>

### - $type - Object type.

Get the type of object.  
In the case of Page, it is returned in pages, in the case of Section, it is returned in sections, etc.

```javascript
var type = this.$type;
conosle.log(type);           // <= pages
```

<a id="lc_name"></a>

### - $name - Object name.

Get the object name.  

```javascript
var name = this.$name;
conosle.log(name);          // <= main
```

<a id="lc_sync"></a>

### - $sync - Sync object for synchronization.

Returns a sync object for synchronization processing.  
This object is the same object as the `` hachiware_sync`` module.

See the [hachiware_sync](https://github.com/masatonakatsuji2021/hachiware_sync) page for details.

### - $tool - Tool object for basic methods.

This object is the same as the object provided by the `` hachiware_tool`` module.  
See [Overview of hachiware_tool](https://github.com/masatonakatsuji2021/hachiware_tool) for details.

### - $routes - Routing result.

The object of the routing result.

```javascript
var routes = this.$routes;
console.log(routes);
```

Returns a result similar to the following.

```
{
    mode: "success",        <= mode (success / error)
    base: "/",              <= base URL
    page: "main",           <= routing page
    aregment: {},           <= aregment data
    query: null,            <= query data
}
```
<a id = "lc_storage"></a>

### - $storage - For storage operation

HTML5-compliant storage such as sessionStorage and localStorage is available for objects.

Details will be issued later. ..

<a id="lc_setview"></a>

### - $setView - For displaying HTML data (Only available for pages and sections)

: This object is only available for Page or Section client objects.

It is a method that can be set to display all at once when displaying data on the screen.

When reflecting the acquired data etc. in the HTML tag of Page or Section
You can use ``%setView`` to make batch and concise settings.

Normally, there is no need to enter the DOM operation code for each data item,
You can short-circuit the cord.

On the js side, specify the value for each item in ``this.$sevVie``.

If the value is specified as a character string, the character string is displayed as it is.
In the case of an object like ``memo`` below, it will take over the DOM operation by JQuery.

(下In the case of the following ``memo``, it is displayed as text and the css attribute is specified.)


```javascript
hachiware.page("main",{

    extend: "app",

    open: function(){

        this.$setView({
            name: "Test Name",
            age: 36,
            gender: "men",
            memo:{
                text:"text Sample Text...",     // <= Show text.
                css:{                           // <= Set style attribute.
                    "font-size":"18px;",
                },
            },
        });

    },

});
```

On the HTML side, just specify the ``h-view`` attribute or the ``hachiware-view`` attribute as shown below.

```html
<dl>
    <dd>name</dd>
    <dd h-view="name"></dd>
    <dt>age</dt>
    <dd h-view="age"></dd>
    <dt>gender</dt>
    <dd h-view="gender"></dd>
    <dt>memo</dt>
    <dd h-view="memo"></dd>
</dl>
```

With this alone, each item value will be displayed at the specified location by displaying this page.

### - $section - Use of Session object

Object method when using Section object.  
See [here] (#section) for details.

### - $form - Use of Form object

Object method when using Form object.  
See [here] (#form) for details.

### - $model - Use of Model object

Object method when using Model object.  
See [here] (#model) for details.

### - $validator - Use of Validator object

Object method when using a Validator object.  
See [here] (#validator) for details.

### - $static - Use of Static objects

Object method when using a Static object.  
See [here] (#static) for details.

### - $redirect - Move to another page

This method is used to move to another page.

In the following cases, you will be moved to another page "page_a" when you open the main screen.

```javascript
hachiware.page("main",{

    before: function(){

        this.$redirect("page_b");   // <= Go to page_b>
    },

});
```
There are two ways to redirect.  
You can either redirect to another page as it is, or change the URL to another page.

In the above case, it is normally redirected to another page, so it is not suitable when a page is set up in the middle and used for transfer.  
(The transfer page will open when you return.)

In that case, instead of redirecting to another page normally, you can transfer it without problems by rewriting the page URL.  
URL rewriting can be supported by specifying true in the second argument.

```javascript
this.$redirect("page_b", true);
```

### - $back - Return to the previous page

This method is used to return to the previous page.

```javascript
hachiware.page("page_c",{

    before: function(){

        this.$back();   // <= Return to the previous page
    },

});
```

Details will be described later ...

### - $forward - Go back to the previous page


This method is used to go to the side of the previous page.

```javascript
hachiware.page("page_c",{

    before: function(){

        this.$forward();   // <= Go back to the previous page
    },

});
```

Details will be described later ...

---

<a id="page"></a>

## # Page object

A page is a building block of a screen when deploying a SPA.  
Create a page for each screen.

**When creating a page in Hachiware Client, it is necessary to specify the routing first.**  
Routing is explained [here](#routing).

When creating a page, two types of files,   
a rendering file (html file) and a script file (JS file) for screen display, are required.

It is possible to set up the page by preparing only the rendering file,   
but a script file is required for layout settings and various callbacks.

Place the rendering file in the ``htmls/pages`` directory, or the script file in the ``srcs/pages`` directory.

For example, if the page name is `` main``, the file will be installed as shown below.

```
htmls
    L pages
        L main.html
        ...
srcs
    L pages
        L main.js
        ....
```

``htmls/pages/main.html`` sets HTML tags like the following

```html
<p>Hallo World!</p>
<div class="now_time"></div>
```

The script file ``srcs/pages/main.js`` installs the code as below.  
Callback ``open`` is executed after the page is displayed, and the time at that time is displayed on the screen.  

```javascript
hachiware.page("main",{

    open: function(){

        var d = new Date();
        var nowTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        $(".now_time").text(nowTime);
    },

});
```

``hachiware.page`` is a method for setting a page object.  
Specify the page name and setting object as arguments, respectively.

The variables or callbacks that can be set on the object are.

|name|type|Overview|
|:--|:--|:--|
|layout|string|Specify if there is a layout to display.<br>[Click here for details](#page_layout)|
|extend|string|Specify if there is an inheritance source page name.<br>[Click here for details](#page_extend).|
|before|function|Callback executed immediately after page navigation.<br>The page is not displayed when this callback is running.<br>[Click here for details](#page_before)|
|open|function|Callback executed immediately after page display after page navigation<br>[Click here for details](#page_open)|
|close|function|Callback executed when leaving the page at the time of page transition.<br>[Click here for details](#page_close)|

### - Life cycle when moving pages

The outline of the life cycle when moving pages is as follows.

```
[beforePage close]
        |
- execute close callback of beforePage
        |
- execute before callback of afterPage
        |
[afterPage open]
        |
- execute open callback of afterPage
```

<a id="page_layout"></a>

### - Page Layout

The layout here refers to a image of the screen area commonly used such as the header footer.  
By specifying the layout, you can easily specify or change the common area used for each page.

When setting the layout of the page, specify ``layout``. You will need to create a layout file.

First, specify ``layout`` in the page script file (``srcs/pages/main.js``).

```javascript
hachiware.page("main",{

    layout: "main_layout",          // ,- Specify the Layout name to use.

    open: function(){

        var d = new Date();
        var nowTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        $(".now_time").text(nowTime);
    },

});
```

Next, create a layout file.    
In this case, after setting the file in ``htmls/layouts/main_layout.html``, write the code as follows.

```html
<header>
    Header Area...
</header>

<div class="contents" hachiware-page></div>

<footer>
    Footer Area...
</footer>
```

<a id="page_extend"></a>

### - Page extend

Use ``extend`` to inherit a page from another page.

For example, if you want to use the layout in common, or if you want to perform common processing immediately after displaying the page, it will be easier to use the inheritance function.

```javascript
hachiware.page("main",{

    extend: "app",                  // <= Specify the inheritance source page name

    open: function(){

        var d = new Date();
        var nowTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        $(".now_time").text(nowTime);
    },

});
```

Specify the inheritance source ``srcs/pages/app.js``

```javascript
hachiware.page("app",{

    layout: "main_layout",

    open: function(){

    },
});
```

The life cycle when inheritance is entered is as follows.  
If there is a callback on the inherited page, it will be executed preferentially.

```
[beforePage close]
        |
- execute close callback of beforePage (on extend page)
        |
- execute close callback of beforePage
        |
- execute before callback of beforePage (on extend page)
        |
- execute before callback of afterPage
        |
[afterPage open]
        |
- execute open callback of beforePage (on extend page)
        |
- execute open callback of afterPage
```

<a id="page_before"></a>

### - Page before Callback

The callback to be executed immediately after moving the page and before the page display is switched is specified by ``before``.

```javascript
hachiware.page("main",{

    extend: "app",

    before: function(){

        console.log("Page Before Main");
    },

});
```

To perform synchronization processing temporarily, change the method name to ``sync_before`` and specify ``resolve`` as an argument as a point, and execute "resolve" at any time to proceed to the next process.


```javascript
hachiware.page("main",{

    extend: "app",

    sync_before: function(resolve){

        setTimeout(function(){

            console.log("Page Before Main");
            resolve();
        },1000);
    },

});
```

By making it compatible with synchronization,   
it is possible to temporarily stop the enemy without displaying the page when processing that involves a standby state is inevitably caught in, for example, an authentication check.

<a id="page_open"></a>

### - Page open Callback

When navigating a page, specify the callback to be executed after the page display is switched with ``open``.

```javascript
hachiware.page("main",{

    extend: "app",

    open: function(){

        var d = new Date();
        var nowTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        $(".now_time").text(nowTime);
    },

});
```

To perform synchronization processing temporarily, change the method name to ``sync_open`` and specify ``resolve`` as an argument as a point, and execute "resolve" at any time to proceed to the next process.

The following is an example. After waiting for 1 second and displaying the current time on the screen, the resolve method is executed.

```javascript
hachiware.page("main",{

    extend: "app",

    sync_open: function(resolve){

        setTimeout(function(){

            var d = new Date();
            var nowTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

            $(".now_time").text(nowTime);

            resolve();
        },1000);
    },

});
```


<a id="page_close"></a>

### - Page close Callback

Specify the callback to be executed when leaving the page when navigating the page with ``close``.

```javascript
hachiware.page("main",{

    extend: "app",

    close: function(){

        console.log("Page Close Main");
    },

});
```

To perform synchronization processing temporarily, change the method name to ``sync_close`` and specify ``resolve`` as an argument as a point, and execute "resolve" at any time to proceed to the next process.

The following is an example. After waiting 1 second to leave the page, the resolve method is executed after the console output.

```javascript
hachiware.page("main",{

    extend: "app",

    sync_close: function(resolve){

        setTimeout(function(){

            console.log("Page Close Main");
            resolve();
        },1000);
    },

});
```

### - Global variables on the page

The variables or objects (global variables) that can be used in the page callback are as follows.

|name|Overview|
|:--|:--|
|$el|Page area JQuery object|
|$parent|Inheritance source page object|
|$setView|For batch display of data in HTML.|

#### : $el - Get the page DOM element

Easily get the DOM element (Jquery based) of the display page with ``this.$el``. 

```javascript
hachiware.page("main",{

    extend: "app",

    open: function(){

        var d = new Date();
        var nowTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        this.$el.find(".now_time").text(nowTime);
    },

});
```

#### : $parent - Inheriting parent object

Contains the parent object specified by ``extend``.

``arsc/pages/app.js``.

```javascript
hachiware.page("app",{

    open: function(){

        this.myName = "app";
    },

});
```

``arsc/pages/main.js``.

```javascript
hachiware.page("main",{

    extend: "app",

    open: function(){

        console.log(this.$parent.myName);   // <= "app>"
    },

});
```

#### : $setView - For batch display of data in HTML

When reflecting the acquired data etc. in the HTML tag
You can use `%setView`` to make batch and concise settings.

See [here](#lc_setview) for details.

---

<a id="section"></a>

## # Section

Section refers to the unit in which each area in the page is divided into parts.

It can be made common by making sections for each displayed area.  
You can also organize the display process for each section.

### - Expand Section to the specified position

In order to make a part of HTML into a Section, the tag of the display area must first be separated into the ``htmls/sections`` directory.

As an example, create a `` htmls/sections/test.html`` file and write the following tags.

```html
<div style="background:#ccc;padding:20px">
    Section Area Text Text....
</div>
```

Next, set the tag of the part to be displayed on the page that uses section.

This time, set ``<div hachiware-section="sec-area"></div>`` to the display location of ``htmls/pages/main.html``.

```html
<p>Text Text ....</p>
<div hachiware-section="sec-area"></div>
```

After that, by using section and its open method in ``srcs/pages/main.js``  
The contents of the section set above will be displayed at the specified location.

After specifying the target section with the ``this.$Section`` method, execute the open method.

```javascript
hachiware.page("main",{

    extend: "app",

    open: function(){

        this.$section("test").open("sec-area");
    },

});
```

By specifying the script in the ``srcs/sections`` directory,  
You can specify the callback etc. when expanding or closing the Section.

### - Section script

If you specify ``srcs/sections/test.js`` as shown below, the open callback will be executed when the Section is expanded.  
(You should see "Section Open test" in your browser console)

```javascript
hachiware.section("test",{

    open: function(){

        console.log("Section Open test");
    },

});
```

The planned variables or methods are:

|Variable name/callback name|OverView|
|:--|:--|
|[$el](#section_el)|Section area JQuery object|
|[$setView](#section_setview)|For batch display of data in HTML.|
|[open](#section_open)|Function to display section.<br>Available as a callback.|
|[append](#section_append)|Add section.<br>Available as a callback.|
|[close](#section_close)|Close the open section.<br>Available as a callback.|

<a id="section_el"></a>

### - $el - Section area JQuery object

Easily get the DOM element (Jquery based) of the display section with this.$el.

```javascript
hachiware.page("main",{

    extend: "app",

    open: function(){

        var area1 = this.$section("test").open("area1");

        area1.$el.find(".view-text").text("abcdef");
    },

});
```

<a id="section_setview"></a>

### - $setView - For batch display of data in HTML

When reflecting the acquired data etc. in the HTML tag You can use `%setView`` to make batch and concise settings.

See [here](#lc_setview) for details.

<a id="section_open"></a>

### - open - Function to display section.

A method for displaying a Section.

Specify the display destination in the argument.

```javascript
hachiware.page("main",{

    open: function(){

        this.$section("test").open("area1");
    },

});
```

On the HTML side, specify the display destination specified in the above script with the ``h-section`` attribute or ``hachiware-section`` attribute.

```html
<div h-section="area1"></div>
```

### - append - Add section.

Additional section is displayed.

```javascript
hachiware.page("main",{

    open: function(){

        this.$el.find(".btn-add").on("click",function(){

            this.$section("test").append("list");
        });
    },

});
```

Details will be described later..

### - close -Close the open section.

Details will be described later..

---

<a id="form"></a>

## # Form

Details will be described later..

---

<a id="validator"></a>

## # Validator

Details will be described later..

---

<a id="model"></a>

## # Model

Details will be described later..

---

<a id="static"></a>

## # Static

Details will be described later..

---

Author: Nakatsuji Masato.
