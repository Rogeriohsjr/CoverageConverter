
# How to Create a Task for Azure Pipeline DevOps
https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops#createpublisher

# Upload
https://marketplace.visualstudio.com/manage/publishers/rogeriohsjr

# Help Commands to execute in localhost
$env:INPUT_SEARCHFOLDERFORTESTFILES="C:\\Workspace\\TestAspWebApp\\TestAspWebApp"
$env:INPUT_VSTESTEXEFILELOCATION="C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe"
$env:INPUT_VSTESTARGS="/EnableCodeCoverage"
$env:INPUT_LISTTESTFILES="**\\bin\\**\\*.Tests*.dll"
$env:INPUT_SEARCHFOLDERFORCODECOVERAGEFILE="C:\\Workspace\\TaskAzureDevOps\\buildAndReleaseTask"
$env:INPUT_TEMPORARYFOLDERFORCODECOVERAGE="C:\\Workspace\\TaskAzureDevOps\\Localhost"
$env:INPUT_TEMPORARYFILECOVERAGEXML="\\TestResults\\DynamicCodeCoverage.coveragexml"
$env:INPUT_CODECOVERAGEARGS="analyze /include_skipped_functions /output:"
$env:INPUT_CODECOVERAGEEXEFILELOCATION="C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Team Tools\\Dynamic Code Coverage Tools\\CodeCoverage.exe"

# Compile the Typescript
tsc

# Compile and Run Unit Test
tsc; node index.js

# This will create a new extension

1. Change the buildAndReleaseTask/task.json -> "Patch": 19 (add one version up)
2. Change the vss-extension.json -> "version": "0.1.19" (add one version up)
3. Compile, run the tsc; in buildandReleaseTask folder.
4. Run the command below in root folder. 
4.1. tfx extension create --manifest-globs vss-extension.json

tsc; cd..; tfx extension create --manifest-globs vss-extension.json


https://github.com/danielpalme/ReportGenerator/wiki/Visual-Studio-Coverage-Tools#vstestconsoleexe
https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks


# We can't use Coverage.exe to generate Coverage
https://github.com/microsoft/vstest/issues/1502


# Did not work
Set-Variable -Name "Agent.TempDirectory" -Value "C:/Workspace/TaskAzureDevOps/buildAndReleaseTask/assets"