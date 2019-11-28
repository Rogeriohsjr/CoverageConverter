
# How to Create a Task for Azure Pipeline DevOps
https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops#createpublisher

# Upload

https://marketplace.visualstudio.com/manage/publishers/rogeriohsjr

# Help Commands to execute in localhost
$env:INPUT_SEARCHFOLDERFORTESTFILES=""
$env:INPUT_VSTESTEXEFILELOCATION="C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Common7\\IDE\\CommonExtensions\\Microsoft\\TestWindow\\vstest.console.exe"
$env:INPUT_VSTESTARGS="/EnableCodeCoverage"
$env:INPUT_CODECOVERAGEEXEFILELOCATION="C:\Workspace\CoverageConverterCore\CoverageConverter\CoverageConverter\bin\Release\netcoreapp3.0\publish\CodeCoverage\CodeCoverage.exe"
$env:INPUT_LISTTESTFILES="**\\bin\\**\\*.Tests*.dll"
$env:INPUT_VSTESTEXEFILELOCATION="C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\Common7\\IDE\\Extensions\\TestPlatform\\vstest.console.exe"
vsTestExeFileLocation

# Did not work
Set-Variable -Name "Agent.TempDirectory" -Value "C:/Workspace/TaskAzureDevOps/buildAndReleaseTask/assets"


# Compile the Typescript
tsc

# Compile and run
tsc; node index.js

# This will create a new extension
tfx extension create --manifest-globs vss-extension.json


https://github.com/danielpalme/ReportGenerator/wiki/Visual-Studio-Coverage-Tools#vstestconsoleexe
https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks


# We can't use Coverage.exe to generate Coverage
https://github.com/microsoft/vstest/issues/1502

