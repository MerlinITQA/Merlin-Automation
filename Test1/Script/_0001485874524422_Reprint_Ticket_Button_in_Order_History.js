//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction

function _0001485874524422_Reprint_Ticket_Button_in_Order_History()
{
try{
      Log.AppendFolder("_0001485874524422_Reprint_Ticket_Button_in_Order_History");
    InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var myGroupsName = defaultGroupName;
  var keyWordNm ="Daily Admission";
  var packageNm ="Open Dated";
  var subPakNm ="Children (Ages 3-12)";
  var qtyT = 7;
  dt = CommonCalender.getTodaysDate(); 
  var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y"); 
  var givenPaymentType ="Cash";
  selectGroupFromMainMenu(myGroupsName);
  clickBuyTicketsButton();
  placeOrder(keyWordNm,packageNm,subPakNm,qtyT,dateD,givenPaymentType); 
  selectGroupFromMainMenuWithOrderedRecord(myGroupsName);
  Button.clickOnButton(checkboxReservationOrder);
  if(orderWndReprintSelectedTickets.Exists && orderWndReprintSelectedTickets.Visible && orderWndReprintSelectedTickets.Enable){
    Log.Message("Reprint Selected Tickets button is Active.")
  }
  else{
    merlinLogError("Reprint Selected Tickets button is not visible.")
  }
  Button.clickOnButton(resOrderInfoClosebutton);  
  AppLoginLogout.logout();
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();      
    }  
}