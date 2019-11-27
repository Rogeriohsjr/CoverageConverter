# Coverage Converter

## Motivation:
- I created this extension to help my pipeline process.
- Instead building a script I rather share the same code with everyone, so people don't need to waste their time searching for things that should be straight forward.
- This extension is not perfect, but it does what I need.


## Things to keep in mind
- We can't use Coverage.exe to generate .coverage file
 - link: https://github.com/microsoft/vstest/issues/1502
- We can't use VSTest@2 Task with codeCoverageEnabled as true
 - If we enabled it, this will add a file into Code Coverage tab in Azure DevOps, which will override the ReportGenerator reports.
 - This is not because this tool, it is because VSTest@2 upload it automatically and we can't disable it.


## How to setup this pipeline?

You can check this here:
https://github.com/Rogeriohsjr/TestWebApp/blob/master/azure-pipelines.yml
