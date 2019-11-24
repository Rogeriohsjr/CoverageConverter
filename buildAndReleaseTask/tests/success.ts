import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('codeCoverageExeFileLocation', 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Team Tools\\Dynamic Code Coverage Tools\\CodeCoverage.exe');
tmr.setInput('listTestFiles', '**\\*test*.dll\n!**\\*TestAdapter.dll\n!**\\obj\\**');

tmr.run();