# Coverage Converter

This Task converts .coverage file into .coveragexml to be used with other Tasks to generate a Code Coverage Report in Azure Pipeline(Azure DevOps).

### Steps:
- Execute VSTest@2 to upload Tests to Azure DevOps
- Execute CoverageConverter@0 to generate the DynamicCodeCoverage.coveragexml
- Execute reportgenerator@4 to generate the Reports from DynamicCodeCoverage.coveragexml generated above
- Execute PublishCodeCoverageResults@1 to post the Result from reportgenerator@4
