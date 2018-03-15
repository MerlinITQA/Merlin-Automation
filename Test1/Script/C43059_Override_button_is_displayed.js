//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
//USEUNIT PlaceOrder
//USEUNIT SupportManagerFunctions

function C43059_Override_button_is_displayed()
{  
try
{  
    Log.AppendFolder("C43059_Override_button_is_displayed");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    aqUtils.Delay(2000);  
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
    
      selectSupportManagerFromMainMenu(); 
      aqUtils.Delay(10000);          
      searchSpecificOrderInSM(OrderID);  
      selectsubTabSM(tabTicketDetails); 
      var barCode = ticketBarCodeValue.Caption;
        if(barCode == null){
          merlinLogError("Unable to get Barcode");        
        }
        else{ 
        selectDirectory(Directory_Tracker);
        setTextBoxValue(trackerScanBarcodeInput,barCode);
        Button.clickOnButton(trackerScanValidate);
        aqUtils.Delay(1000);
        if (selectablebuttonOverridebutton.Exists  && selectablebuttonOverridebutton.VisibleOnScreen){
            Button.clickOnButton(trackerScanCloseButton);
           Log.Message("Override Button is not displayed.");
        }else
        {
           merlinLogError("Override Button is not displayed.");
        }
       }
    }
    catch(e)
    {
          merlinLogError("Exception occured"); 
    }
      // AppLoginLogout.logout();    
}
 