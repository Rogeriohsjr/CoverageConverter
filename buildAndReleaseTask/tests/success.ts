import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('searchFolderForTestFiles', '$(System.DefaultWorkingDirectory)');
tmr.setInput('vsTestExeFileLocation', 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe');
tmr.setInput('vsTestArgs', '/EnableCodeCoverage');
tmr.setInput('listTestFiles', '**\\bin\\**\\*.Tests*.dll');
tmr.setInput('temporaryFolderForCodeCoverage', 'Agent.TempDirectory');
tmr.setInput('temporaryFileCoveragexml', '\\TestResults\\DynamicCodeCoverage.coveragexml');
tmr.setInput('codeCoverageExeFileLocation', 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Team Tools\\Dynamic Code Coverage Tools\\CodeCoverage.exe');

tmr.run();