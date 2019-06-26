# gulp-etl-tap-flat #


The job of this plugin is to take a Flat file of any kind from a user and emit out an ndjson file. The plugin works in both buffer and stream modes. The plugin gives the users transform call back option which gives them opportunity to create their own custom parser with custom properties. The users also have options to use the default parser using default call back. 

This is a **[gulp-etl](https://gulpetl.com/)** plugin, and as such it is a [gulp](https://gulpjs.com/) plugin. **data-etl** plugins processes [ndjson](http://ndjson.org/) data streams/files which we call **Message Streams** and which are compliant with the [Singer specification](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#output). Message Streams look like this:

```
{"type": "SCHEMA", "stream": "users", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "users", "record": {"id": 1, "name": "Chris"}}
{"type": "RECORD", "stream": "users", "record": {"id": 2, "name": "Mike"}}
{"type": "SCHEMA", "stream": "locations", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "locations", "record": {"id": 1, "name": "Philadelphia"}}
{"type": "STATE", "value": {"users": 2, "locations": 1}}
```

### Usage
**data-etl** plugins accept a configObj as its first parameter. The configObj
will contain any info the plugin needs.

The transform call back function will receive a string and is expected to return either an object to be passed downstream, or ```null``` to remove the message from the stream).

This plugin also accepts a FinishCallback and StartCallback, which are functions that are executed before and after the TransformCallback. The FinishCallback can be used to manage data stored collected from the stream. 

Send in callbacks as a second parameter in the form: 

```
{
    transformCallback: tranformFunction,
    finishCallback: finishFunction,
    startCallback: startFunction
}
```
This is the demonstration of trasnsform call back function that users can call inside the gulpfile 
##### Sample gulpfile.js
```
var handleLines = require('gulp-etl-tap-flat').tapFlat
// for TypeScript use this line instead:
// import { tapFlat } from 'gulp-etl-tap-flat'

const txtParse = (fileLine: string): object | null => {
 
    let lineObj : any = {}
    lineObj.propertyA = fileLine.slice(0,3);
    let newDate = new Date(fileLine.slice(3,25));
    lineObj.date = newDate
    return lineObj;
}

exports.default = function() {
     return src('data/*.txt')
    // pipe the files through our tap-flat plugin
    .pipe(tapFlat({}, { transformCallback: txtParse }))
    .pipe(dest('output/'));
}
```
### Model Plugin
This plugin is intended to be a model **gulp-etl** plugin, usable as a template to be forked to create new plugins for other uses. It is compliant with [best practices for gulp plugins](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md#what-does-a-good-plugin-look-like), and it properly handles both [buffers](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/using-buffers.md) and [streams](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md).



### Quick Start
* Dependencies: 
    * [git](https://git-scm.com/downloads)
    * [nodejs](https://nodejs.org/en/download/releases/) - At least v6.3 (6.9 for Windows) required for TypeScript debugging
    * npm (installs with Node)
    * typescript - installed as a development dependency
* Clone this repo and run `npm install` to install npm packages
* Debug: with [VScode](https://code.visualstudio.com/download) use `Open Folder` to open the project folder, then hit F5 to debug. This runs without compiling to javascript using [ts-node](https://www.npmjs.com/package/ts-node)
* Test: `npm test` or `npm t`
* Compile to javascript: `npm run build`

### Testing

We are using [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) for our testing. Each of our tests are in the `test` folder.

- Run `npm test` to run the test suites



Note: This document is written in [Markdown](https://daringfireball.net/projects/markdown/). We like to use [Typora](https://typora.io/) and [Markdown Preview Plus](https://chrome.google.com/webstore/detail/markdown-preview-plus/febilkbfcbhebfnokafefeacimjdckgl?hl=en-US) for our Markdown work..



