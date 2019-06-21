let gulp = require('gulp')
import {tapFlat} from '../src/plugin'
export { tapFlat, TransformCallback } from '../src/plugin';
import * as loglevel from 'loglevel'
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as log.LogLevelDesc)
const errorHandler = require('gulp-error-handle'); // handle all errors in one handler, but still stop the stream if there are errors
import Vinyl = require('vinyl') 
const pkginfo = require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;

function createRecord(recordObject:Object, streamName: string) : any {
  return {type:"RECORD", stream:streamName, record:recordObject}
}

//This is a sample parser that breaks down the log lines into 3 properties, date, the type and the description 
const logParse = (string1: string): object | null => {
 
    let lineObj : any = {}// JSON.parse(string1)
    lineObj.dayOfWeek = string1.slice(0,3);
    let newDate = new Date(string1.slice(3,25));
    lineObj.date = newDate
    let tempLine = string1.slice(25,string1.length)
    for (var _i = 0; _i < tempLine.length; _i++) {
    if(tempLine.charAt(_i)==(':')){
    lineObj.type = tempLine.slice(0,tempLine.indexOf(":"))
    let tempLine2 = tempLine.slice(tempLine.indexOf(":")+1,tempLine.length)
    lineObj.description=tempLine2.slice(0,tempLine2.length);
    return lineObj}
    }
    lineObj.type="Undefined";
    lineObj.description=tempLine;
    return lineObj;
  }

function demonstrateHandlelines(callback: any) {
  log.info('gulp starting for ' + PLUGIN_NAME)
  return gulp.src('../testdata/*.log',{buffer:false})
      .pipe(errorHandler(function(err:any) {
        log.error('oops: ' + err)
        callback(err)
      }))
      .on('data', function (file:Vinyl) {
        log.info('Starting processing on ' + file.basename)
      })
      //pipe in tapFlat plugin    
      // call logParse function above for each line
      .pipe(tapFlat({}))
      
      .pipe(gulp.dest('../testdata/processed'))
      
      .on('end', function () {
        log.info('end')
        callback()
      })
    }



    function test(callback: any) {
      log.info('This seems to run only after a successful run of demonstrateHandlelines! Do deletions here?')
      callback()
    }

exports.default = gulp.series(demonstrateHandlelines, test)