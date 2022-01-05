# Hachiware_Client

A simple and easy-to-use SPA (Single-Page-Action) framework.

---

## # How do you use this?

First, install the npm package with the following command.

```
npm i hachiware_client
```

All you have to do is add the package require code to index.js etc. and you're ready to go.

```
const client = require("hachiware_client");
```

Optionally create a directory, create a index.js file and write the following code.

```
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
    routings.js         <= Routing script file
    setting.js          <= Initial setting script file
index.html              <= index HTML file
```

It is necessary to arbitrarily change the files/directories other than the build directory "_build".

|File/directory name|Overview|
|:--|:--|
|_build|Build directory<br>No changes are required for this directory or the files inside, as it is automatically generated when the build is executed.|
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
|- routings.js|Routing script file.<br>Routing is explained [here](#routing).|
|- setting.js|Initial setting script file.<br>Setting is explained [here](#setting).|
|index.html|index HTML file.|

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
$ node . 
*** Hachiware Client **************

Command Input: :
```

Enter the command from here.

The commands currently available are as follows.

|command|Overview|
|:--|:--|
|create [templateName] [directoryName]|Create a SPA project from a template.|
|build [directoryName]|Build the SPA project.<br>By executing the build, it will be converted into a form that can be displayed in the browser.|

You can also short the command on a single line as shown below.  
Example of creating a SPA project.

```
node . create default test
```

---

## # Creating a SPA project

```
node . create default test
```

After creating a new test directory with the above command, export the contents of the default template.  
After executing the command, the following result will be output.

```
$ node . create default test
*** Hachiware Client **************

Client Create

Use Template = default
Directory(Project) Name = test
Mkdir ****/client/_test
Mkdir ****/client/_test/assets
Mkdir ****/client/_test/htmls
Mkdir ****/client/_test/htmls/layouts
<< Omitted below >>

.....Complete

... BYE.
```

This will export the test directory and the contents of the template specified in it.

---

## # Build SPA project

```
node . build test
```

The build will be executed for the directory (SPA project) specified by the above command.

```
$ node . build test
*** Hachiware Client **************

Client Build

# Jquery Buffer exists.
# exist /_build
# Jquery Set
# Read CoreLib hachiware.js
# Read CoreLib hachiware.sync.js
# Read CoreLib hachiware.tool.js
<< Omitted below >>

Build Complete!

... BYE.
```

After the build is complete, the "_build" directory will be created or updated in the directory.  
After that, open the ``index.html`` file in the "_build" directory with a browser etc. and it will be displayed on the screen.

---

<a id="routing"></a>

## # Routing

Routing is a setting to decide which page to display (or execute script) for each URL.  

Routing is specified in the ``srcs/routing.js`` file as follows.

```javascript
hachiware.routing({
    release: {
        "/":"main",
        "/page_a":"page_a",
    },
    error: {
        "/":"error",
    },
});
```


---

<a id="page"></a>

## # Page

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

The layout here refers to a template of the screen area commonly used such as the header footer.  
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

To perform synchronization processing temporarily, set ``syncBefore`` to true and write the code as shown below.    
Specify ``resolve`` as an argument as a point, and execute ``resolve`` to move to the next process.

The following is an example, after waiting for 1 second, "Page Before Main" is output to the console, the resolve method is executed.

```javascript
hachiware.page("main",{

    extend: "app",

    syncBefore: true,

    before: function(resolve){

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

To perform synchronization processing temporarily, set ``syncOpen`` to true and write the code as shown below.    
Specify ``resolve`` as an argument as a point, and execute ``resolve`` to move to the next process.

The following is an example. After waiting for 1 second and displaying the current time on the screen, the resolve method is executed.

```javascript
hachiware.page("main",{

    extend: "app",

    syncOpen: true,

    open: function(resolve){

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

To perform synchronization processing temporarily, set ``syncClose`` to true and write the code as shown below.    
Specify ``resolve`` as an argument as a point, and execute ``resolve`` to move to the next process.

The following is an example. After waiting 1 second to leave the page, the resolve method is executed after the console output.

```javascript
hachiware.page("main",{

    extend: "app",

    syncClose: true,

    close: function(resolve){

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
|$name|Page name|
|$el|Page area JQuery object|
|$layoutEl|Layout area JQuery object|
|$parent|Inheritance source page object|
|$form|object for form of hachiware_client<br>[Click here for details](#form)|
|$section|object for section of hachiware_client<br>[Click here for details](#section)|
|$models|object for model of hachiware_client<br>[Click here for details](#model)|
|$validator|Object for validator of hachiware_client<br>[Click here for details](#validator|

By using ``$el``, you can operate the DOM by focusing on each element tag in the page.

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


---

## # 

---

Author: Nakatsuji Masato.