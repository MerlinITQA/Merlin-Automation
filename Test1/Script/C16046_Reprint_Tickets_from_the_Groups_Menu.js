//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction

function C16046_Reprint_Tickets_from_the_Groups_Menu()
{
try{
      Log.AppendFolder("C16046_Reprint_Tickets_from_the_Groups_Menu");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var keyWordNm ="Daily Admission";
    var packageNm ="Date/Time";
    var subPakNm ="Children (Ages 3-12)";
    var qtyT = 2;        
    var keyWordNm1 ="Daily Admission";
    var packageNm1 ="Date/Time";
    var subPakNm1 ="Adult";
    var qtyT1 = 2;    
    selectGroupFromMainMenu(groupNm);
    clickBuyTicketsButton();
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,CommonCalender.getTodaysDate());    
    // aqUtils.Delay(3000);
    // Button.clickOnButton(selectablebuttonClosebutton);
    var temp =totalOnOrderScreen.Caption;
    var firstOrderTotal = parseInt((temp.split('$')[1]).trim());
    addNewTicket(keyWordNm1,packageNm1,subPakNm1,qtyT1,CommonCalender.getTodaysDate());
	 aqUtils.Delay(3000);
    temp =totalOnOrderScreen.Caption;
    var secondOrderTotal = parseInt((temp.split('$')[1]).trim()) - firstOrderTotal;
    finilizeOrder();
    aqUtils.Delay(3000);
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
    CashButton.Click();   
     if(applyAmount != 0){
      Log.Message("Apply amount");
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton); 
      }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
     
    verifyTotalOnConfirmationPage(expectedSettlemtnttotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    } 
    var OrderID= (orderId.split('#')[1]).trim();
    OrderInfo.prototype.OrderID = OrderID;
    Log.Message("Order id is set:"+OrderID);
  selectGroupFromMainMenuWithOrderedRecord(groupNm);
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
    }
    finally { 
	    Log.PopLogFolder();
    }  
}