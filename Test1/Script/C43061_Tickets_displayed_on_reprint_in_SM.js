//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
 
//USEUNIT SelectDirectory 
//USEUNIT PlaceReservationOrder
 
function C43061_Tickets_displayed_on_reprint_in_SM()
{ 
  try{
        Log.AppendFolder("C43061_Tickets_displayed_on_reprint_in_SM");
       InitializationEnviornment.initiliaze();
       AppLoginLogout.login();
       placeOrder("Daily Admission","Open Dated","Children (Ages 3-12)",1,CommonCalender.getTodaysDate(),"Cash");
        
        WrapperFunction.selectMainMenu(SupportManger_MainMenu);
        //loginSupportManger();     
		    aqUtils.Delay(15000);
        setTextBoxValue(newConfirmationSearchtextBox, OrderInfo.prototype.OrderID);
        newPerformSearchButton.Click();
        aqUtils.Delay(2000);
       
        PrintMenu.Click();      
        subMenuPrintReceipt.Click();
        
        AppLoginLogout.logout(); 
         
      } catch (e) {
    	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
    	    return;
        }
    finally { 
	    Log.PopLogFolder();
     
	    Log.PopLogFolder();
    }
}
 