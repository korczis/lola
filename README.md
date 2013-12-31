# Lola

Loader &amp; Launcher of Modular NodeJS Apps.

In other words, super lightweight modules manager for nodejs with versioning and dependencies. 

## FAQ

**Q**: Is this some competitor/replacment of npm, bower, etc?  
**A**: No.

**Q**: So what is this good for?  
**A**: For your modular code.

**Q**: What kind of modular code you mean?   
**A**: See documentation of modules.

## Installation

Installation is super simple.

```
npm install lola
```

## Usage

Usage is as simple as instalation.

```
// Require lola module
var lola = require('lola');

// You can add additional modules dirs
lola.addModuleDir('./anotherDir1');

// You can get list of registered modules
var modules = lola.getModules();

// And now, you can load module
var myMod = lola.load('the-scratch');

// You can load specific version of module
va myModSpecVer = lola.load('the-scratch@0.0.1');

// You can print module tree
lola.printTree();

```
