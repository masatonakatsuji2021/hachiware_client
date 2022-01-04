# Hachiware_Client

シンプルで使いやすいSPA(Single-Page-Action)フレームワーク。

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
...以下省略

.....Complete

... BYE.
```

This will export the test directory and the contents of the template specified in it.

---

