import tl = require('azure-pipelines-task-lib/task');
import tr = require('azure-pipelines-task-lib/toolrunner');
const { exec, spawn } = require('child_process');

async function run() {
    try {
        console.log('Starting Code Coverage...');
        
        // 1. Execute Code Coverage Collect
        executeVsTestCodeCoverage();

        

        console.log('Ended Code Coverage.');
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function executeVsTestCodeCoverage(){
    console.log('Starting executeCodeCoverageCollect...');
    const vsTestExeFileLocation: string = tl.getInput('vsTestExeFileLocation', true);
    const coverageCommand: string = "/EnableCodeCoverage ";
    const listFiles : string[] = findTestFiles();

    listFiles.forEach(pPathFile => {
        console.log('--> Analyzing file [' + pPathFile + ']');
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

    console.log('Ended executeCodeCoverageCollect...');
}

function executeCodeCoverageCollect(){
    console.log('Starting executeCodeCoverageCollect...');
    const codeCoverageExeFileLocation: string = tl.getInput('codeCoverageExeFileLocation', true);
    const coverageCommand: string = "collect /output:\"" + getTemporaryDirectory() +"\\TestResults\\DynamicCodeCoverage.coverage\"";
    const listFiles : string[] = findTestFiles();

    listFiles.forEach(pPathFile => {
        console.log('--> Analyzing file [' + pPathFile + ']');
        exec('"' + codeCoverageExeFileLocation + '" ' + coverageCommand + ' "' + pPathFile + '"', (error, stdout, stderr) => {
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

    console.log('Ended executeCodeCoverageCollect...');
}

function getTemporaryDirectory(){
    var tempDirectory: string = tl.getVariable('Agent.TempDirectory');
    // Temporary
    tempDirectory = "C:\\Workspace\\TaskAzureDevOps\\Temp";

    return tempDirectory;
}

function getWorkDirectory(){
    var workingDirectory: string = tl.getVariable('Sytem.DefaultWorkingDirectory');
    // Temporary
    workingDirectory = "C:\\Workspace\\TestAspWebApp\\TestAspWebApp";

    return workingDirectory;
}

function executeCodeCoverageAnalyze(){
    console.log('Starting executeCodeCoverageAnalyze...');

    const codeCoverageExeFileLocation: string = tl.getInput('codeCoverageExeFileLocation', true);
    const command : string =  "analyze /output:" + getTemporaryDirectory() + "\\TestResults\\DynamicCodeCoverage.coveragexml " + 
                              '"' + getTemporaryDirectory() + '\\TestResults\\DynamicCodeCoverage.coverage"';
        
    exec('"' + codeCoverageExeFileLocation + '" ' + command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });

    console.log('Ended executeCodeCoverageAnalyze...');
}

function findTestFiles(){

    var searchFolder: string = getWorkDirectory();
    var listTestFiles : string[] = tl.getDelimitedInput('listTestFiles', '\n', true);
    
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

function resolveSummaryFiles(workingDirectory: string, summaryFiles: string): string[] {
    if(summaryFiles) {
        const summaryFilesArray = summaryFiles.trim().split('\n').filter((pattern) => pattern.trim() != "");
        const resolvedSummaryFiles: string[] = [];

        if(summaryFilesArray.length > 0) {
            summaryFilesArray.forEach(filePattern => {
                const findOptions: tl.FindOptions = { allowBrokenSymbolicLinks: false, followSymbolicLinks: false, followSpecifiedSymbolicLink: false };
                const pathMatches: string[] = tl.findMatch(
                    workingDirectory,
                    filePattern,
                    findOptions);
                
                console.log(tl.loc('FoundNMatchesForPattern', pathMatches.length, filePattern));

                pathMatches.forEach(path => {
                    if(pathExistsAsFile(path)) {
                        if(path.indexOf(".coverage") != -1){
                            resolvedSummaryFiles.push(path);
                            console.log(path);
                        }
                    }
                });
            });

            return resolvedSummaryFiles;
        }
    }

    return [];
}

// Gets whether the specified path exists as file.
function pathExistsAsFile(path: string) {
    try {
        return tl.stats(path).isFile();
    } catch (error) {
        tl.debug(error);
        return false;
    }
}

run();