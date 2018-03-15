
//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase
//USEUNIT CommonCalender
//USEUNIT SelectQuantityFromHeader

function _001485874498148_118_Groups_ReprintActiveTickets()
{
Log.AppendFolder("_001485874498148_118_Groups_ReprintActiveTickets");
try
 {      InitializationEnviornment.initiliaze(); 
        AppLoginLogout.login();
        selectGroupFromMainMenu(defaultGroupName);
        clickBuyTicketsButton();		
        WrapperFunction.selectKeyword("Daily Admission");
		 SelectQuantityFromHeader.selectQuantity(2);	
        selectPackage("Date/Time","Children (Ages 3-12)");
        aqUtils.Delay(5000);
        selectQuantityFromSubWindow(1);
        selectSubPackageFromSubWindow("Adult");
        selectDateFromSubWindow(CommonCalender.getTodaysDate()); 
        selectNextButtonFromSubWindow();
        selectFinalizeOrderbutton();
    
        SelectPaymentType.selectPaymentType("Cash");
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        WrapperFunction.validateTicket("Don't Validate");
        
        var orderId = cnf_orderID1.Caption;
          if (orderId == null){
            merlinLogError("Order id is not present");
          }else{
            OrderID= (orderId.split('#')[1]).trim();
            OrderInfo.prototype.OrderID = OrderID;
            Log.Message("Order id is set:"+OrderID);
          }  
        selectGroupFromMainMenuWithOrderedRecord(defaultGroupName);
        aqUtils.Delay(3000);
        Button.clickOnButton(checkboxReservationOrder);
        
        if(orderWndReprintSelectedTickets.Exists && orderWndReprintSelectedTickets.Visible && orderWndReprintSelectedTickets.Enable){
          Log.Message("Reprint Selected Tickets button is Active.");
          Button.clickOnButton(resOrderInfoClosebutton);
        }
        else{
          merlinLogError("Reprint Selected Tickets button is not visible.");
        } 
    } 
    catch(e)
    {
             
           merlinLogError("Exception in Test script");
    }
}
 
  
  
  
