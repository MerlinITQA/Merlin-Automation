function GeneralEvents_OnLogError(Sender, LogParams)
{    
    ProjectSuite.Variables.testResultStatus = 5;
    Runner.Stop(true);   
}