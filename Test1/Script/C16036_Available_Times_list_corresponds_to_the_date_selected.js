//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction
//USEUNIT PlaceOrder
function C16036_Available_Times_list_corresponds_to_the_date_selected()
{
try{
      Log.AppendFolder("C16036_Available_Times_list_corresponds_to_the_date_selected");
   InitializationEnviornment.initiliaze(); 
    AppLoginLogout.login();
      nextDate = CommonCalender.getTomorrowsDate();
      var expectedDate=aqConvert.DateTimeToFormatStr(nextDate, "%#m/%#d/%Y");
      WrapperFunction.selectKeyword("Daily Admission");    
      selectPackage("3 site Combi","Adult");
      aqUtils.Delay(2000);
      if(datetimeformSubWindow.Exists){   
        selectDateFromSubWindow(nextDate);
        var actualDate = AvailableTime_DayMMDDYYYY.Caption;
    	  aqUtils.Delay(2000);
        VerifyCheckProperty.compareStringObj(expectedDate,actualDate);
        selectNextButtonFromSubWindow();  
        aqUtils.Delay(2000);     
          if(selectablebuttonClosebutton.Exists && selectablebuttonClosebutton.VisibleOnScreen){   
          Button.clickOnButton(selectablebuttonClosebutton);
         }  
      }else{
       merlinLogError("Date selection window is not displayed.");
      }     
       AppLoginLogout.logout();
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }  
}