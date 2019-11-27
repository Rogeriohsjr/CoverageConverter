import tl = require('azure-pipelines-task-lib/task');
import tr = require('azure-pipelines-task-lib/toolrunner');
const { exec, spawn } = require('child_process');

async function run() {
    try {
        console.log('Starting Code Coverage...');
        
        // 1. Execute VSTest.exe to generate the blabla.coverage file
        executeVsTestCodeCoverage();

        console.log('Ended Code Coverage.');
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function executeVsTestCodeCoverage(){
    console.log('Starting executeVsTestCodeCoverage...');
    const vsTestExeFileLocation: string = tl.getInput('vsTestExeFileLocation', true);
    const coverageCommand: string = tl.getInput('vsTestArgs', true);
    const listFiles : string[] = findTestFiles();

    listFiles.forEach(pPathFile => {
        console.log('Generating coverage for file [' + pPathFile + ']');
        exec('"' + vsTestExeFileLocation + '" ' + coverageCommand + ' "' + pPathFile + '"', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            // 2. Execute Code Coverage Analyze
            executeCodeCoverageAnalyze();
        });
    });

    console.log('Ended executeVsTestCodeCoverage...');
}

function getTemporaryDirectory(){
    var tempDirectory: string = tl.getVariable(tl.getInput('temporaryFolderForCodeCoverage', true));
    return tempDirectory;
}

function executeCodeCoverageAnalyze(){
    console.log('Starting executeCodeCoverageAnalyze...');

    const codeCoverageExeFileLocation: string = tl.getInput('codeCoverageExeFileLocation', true);
    const command : string =  "analyze /output:" + getTemporaryDirectory() + tl.getInput('temporaryFileCoveragexml', true);
    
    const listFiles : string[] = findCoverageFiles();
    listFiles.forEach(pPathFile => {
        console.log('Converting this file[' + pPathFile + '] to fileCoverageXml');
        exec('"' + codeCoverageExeFileLocation + '" ' + command + ' "' + pPathFile + '"', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    });

    console.log('Ended executeCodeCoverageAnalyze...');
}

function findTestFiles(){
    var searchFolder: string = tl.getInput('searchFolderForTestFiles');
    var listTestFiles : string[] = tl.getDelimitedInput('listTestFiles', '\n', true);
    return findFiles(searchFolder, listTestFiles);
}

function findCoverageFiles(){
    var searchFolder: string = tl.getInput('searchFolderForTestFiles');
    var listTestFiles : string[] = ['**\\TestResults\\**\\*.coverage'];
    return findFiles(searchFolder, listTestFiles);
}

function findFiles(searchFolder, listTestFiles){
    // Sending allowBrokenSymbolicLinks as true, so we don't want to throw error when symlinks are broken.
    // And can continue with other files if there are any.
    const findOptions = <tl.FindOptions>{
        allowBrokenSymbolicLinks: true,
        followSpecifiedSymbolicLink: true,
        followSymbolicLinks: true
    };

    const matchingTestResultsFiles = tl.findMatch(searchFolder, listTestFiles, findOptions);
    return matchingTestResultsFiles;
}

run();