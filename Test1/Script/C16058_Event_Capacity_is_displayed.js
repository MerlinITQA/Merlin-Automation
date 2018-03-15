//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function C16058_Event_Capacity_is_displayed()
{
 try {
      Log.AppendFolder("C16058_Event_Capacity_is_displayed");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      WrapperFunction.selectKeywordName("Daily Admission");
      selectPackage("Dated","Adult");
      aqUtils.Delay(3000);     
      var totalCap = groupDateonlycapacitygroup.HGroup(0).Label("capacityLabel").Caption;
      var availableCap = groupDateonlycapacitygroup.HGroup(0).Label("availableLabel").Caption;
      
      availableCap = (availableCap.split('/')[1]).trim();
      if(availableCap <= totalCap){
         Log.Message("Total capacity and remaining capacity is displayed.");
      }else{
         merlinLogError("Total capacity and remaining capacity is not displayed.");
      }
     AppLoginLogout.logout();     
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   
}