//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
//USEUNIT PlaceOrder
//USEUNIT SelectQuantityFromHeader
  
function C15988_Tracker_Scanner_validate_with_Auto_validation_Off()
{  
try
{  
    Log.AppendFolder("C15988_Tracker_Scanner_validate_with_Auto_validation_Off");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    aqUtils.Delay(2000); 
    Button.clickOnButton(selectDirectoryButton);
         if(toggleTrackertoggle.FlexObject.active){
             Log.Message("Tracker is not log in.");  
          } else{
  			    merlinLogError("Tracker is not log in."); 
  		    }
          Button.clickOnButton(selectDirectoryButton);
    Button.clickOnButton(selectDirectoryButton); 
    if(slidetoggleAutovalidateslidetogg.FlexObject.active){
             slidetoggleAutovalidateslidetogg.Click();  
          } else{
  			     Button.clickOnButton(selectDirectoryButton); 
  		    }
    WrapperFunction.selectKeywordName("Daily Admission");
	SelectQuantityFromHeader.selectQuantity(2);
    selectPackage("Date/Time","Children (Ages 3-12)");
    aqUtils.Delay(2000); 
     if(datetimeformSubWindow.Exists){      
      selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy  
      selectNextButtonFromSubWindow();
    }  
    finilizeOrder();
    aqUtils.Delay(2000);   
    var settlementTotal =orderDetailsTotal.Caption;
    Log.Message("Verified order details on settlement page");
    CashButton.Click();
    applyAmount= aqString.Replace(settlementTotal,"$",""); 
    OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
    if(applyAmount != 0){
      Log.Message("Apply amount");
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton);
      }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    if(validateTicketspopUp.Exists)
    {
      merlinLogError("Validation popup message is displayed.")
    }else{
      Log.Message("Auto validation.");
    } 
    verifyTotalOnConfirmationPage(settlementTotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    } 
    var OrderID= (orderId.split('#')[1]).trim();
    OrderInfo.prototype.OrderID = OrderID;
    Log.Message("Order id is set:"+OrderID); 
    }
  catch(e)
  {
          merlinLogError("Exception occured"); 
  }
       AppLoginLogout.logout();    
}
 