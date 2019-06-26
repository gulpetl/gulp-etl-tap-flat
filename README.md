# gulp-etl-tap-flat #


This plugin takes a flat file of any kind from a user and emits a Message Stream JSON file. The plugin works in both buffer and stream modes. Users provide a transformCallback option which is their own custom parser, parsing each line into an object. 

This is a **[gulp-etl](https://gulpetl.com/)** plugin, and as such it is a [gulp](https://gulpjs.com/) plugin. **gulp-etl** plugins process [ndjson](http://ndjson.org/) data streams/files which we call **Message Streams** and which are compliant with the [Singer specification](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#output). Message Streams look like this:

```
{"type": "SCHEMA", "stream": "users", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "users", "record": {"id": 1, "name": "Chris"}}
{"type": "RECORD", "stream": "users", "record": {"id": 2, "name": "Mike"}}
{"type": "SCHEMA", "stream": "locations", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "locations", "record": {"id": 1, "name": "Philadelphia"}}
{"type": "STATE", "value": {"users": 2, "locations": 1}}
```

### Usage
**gulp-etl** plugins accept a configObj as the first parameter, but for this plugin the work is mainly done by the transformCallback so it has no options to set and it ignores the configObj.

The transformCallback function will receive a string and is expected to return either an object to be passed downstream, or ```null``` to remove the message from the stream.

This plugin also accepts a finishCallback and startCallback, which are functions that are executed before and after the transformCallback. The FinishCallback can be used to manage data stored collected from the stream. 

Send in callbacks as a second parameter in the form: 

```
{
    transformCallback: tranformFunction,
    finishCallback: finishFunction,
    startCallback: startFunction
}
```
##### Sample gulpfile.js
```
/* Parse data from an arbitrary fixed-width text file */

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



