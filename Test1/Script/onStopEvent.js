//USEUNIT ApplicationOpen
function GeneralEvents_OnStopTest(Sender)
{

    try{
        
         if(ProjectSuite.Variables.testCaseID != 0){
            Log.Message("Update Result in TestRail");
            ApplicationOpen.updateInTestRail(ProjectSuite.Variables.testCaseID);
         }else{
            Log.Message("Unable to get testCaseID.");
         }
     }catch(e)
     {
      
     }
}