
How to Create a Task for Azure Pipeline DevOps
https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops#createpublisher

Upload
https://marketplace.visualstudio.com/manage/publishers/rogeriohsjr

$env:INPUT_CODECOVERAGEEXEFILELOCATION="C:\Workspace\CoverageConverterCore\CoverageConverter\CoverageConverter\bin\Release\netcoreapp3.0\publish\CodeCoverage\CodeCoverage.exe"

$env:INPUT_LISTTESTFILES="**\\bin\\**\\*.Tests*.dll"
$env:INPUT_VSTESTEXEFILELOCATION="C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\Common7\\IDE\\Extensions\\TestPlatform\\vstest.console.exe"
vsTestExeFileLocation

// Did not work
Set-Variable -Name "Agent.TempDirectory" -Value "C:/Workspace/TaskAzureDevOps/buildAndReleaseTask/assets"


tsc

tsc; node index.js


tfx extension create --manifest-globs vss-extension.json


https://github.com/danielpalme/ReportGenerator/wiki/Visual-Studio-Coverage-Tools#vstestconsoleexe
https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks


# We can use Coverage.exe to generate Coverage
https://github.com/microsoft/vstest/issues/1502

