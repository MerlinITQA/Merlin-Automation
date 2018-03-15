function GeneralEvents_OnStartTest(Sender)
{
   ProjectSuite.Variables.testResultStatus = 1;
   ProjectSuite.Variables.testCaseID = 0;
   //default test case result to true
   try{     
    var FileName =Project.Path +"\\MyEx.xlsx";
    var str = Project.TestItems.Current.ElementToBeRun.Caption;    
    var tcName =(str.split('-')[1]).trim(); 
    ProjectSuite.Variables.testCaseID = 0;
    var Driver; 
    // Creates the driver 
    Driver = DDT.ExcelDriver(FileName, "Sheet1",true);          
    var testId = 0;
    while (! Driver.EOF() )  
    { 
         var scriptName = Driver.Value(1);
         var scriptID = Driver.Value(2);         
          if(scriptName == tcName){
              ProjectSuite.Variables.testCaseID = scriptID;
              break;      
          }  
          else{
            Driver.Next(); // Goes to the next record
         } 
    }
    DDT.CloseDriver(Driver.Name);
    Log.Message("Test Case ID : " + ProjectSuite.Variables.testCaseID);
    }catch(e)
    {
       Log.Warning("Unable to find test case ID");     
    }
}
