//USEUNIT InitializationEnviornment 
//USEUNIT AppLoginLogout
//USEUNIT POSObjectMapping
//USEUNIT SelectPackageAndSubPackage
//USEUNIT OrderDetails
//USEUNIT WrapperFunction
//USEUNIT ConvertReservationsToPurchase
function _0001485874523980_Multiple_Rate_Types_on_Calendars_Scroll_bar()
{  
try{
      Log.AppendFolder("_0001485874523980_Multiple_Rate_Types_on_Calendars_Scroll_bar");
   InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var keyWordNm ="Low Capacity";
  var packageNm ="Low Capacity - Date/Time";
  var subPakNm ="Adult";
  WrapperFunction.selectKeywordName(keyWordNm);
  selectPackage(packageNm,subPakNm);
   aqUtils.Delay(5000);       
   var subPackageCount = subWindowSubPackageWindow.DataGroup("ratesList").ChildCount;
   if(CountForPackage.prototype.SpecificPackSubPackageCount == subPackageCount ){
      buttonClosebutton.Click();
      Log.Message("All SubPackages are displayed on Calender screen.");
    }else{
      merlinLogError("Package is not getting selected.");
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