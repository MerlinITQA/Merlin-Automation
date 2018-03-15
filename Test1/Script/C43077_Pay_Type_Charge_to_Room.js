//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT SelectQuantityFromHeader
//USEUNIT PlaceReservationOrder

function C43077_Pay_Type_Charge_to_Room()
{
  Log.AppendFolder("C43077_Pay_Type_Charge_to_Room");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login(); 
  try{
    var keyWordNm ="Daily Admission";
    var packageNm ="Dated";
    var subPakNm ="Adult";
    var givenPaymentType ="[BillingTypes.Hotel Room Charge]";
    var givenPaymentType1 ="[BillingTypes.Hotel Room Charge]";
    
    aqUtils.Delay(2000);   
    WrapperFunction.selectKeywordName(keyWordNm);  
    selectPackage(packageNm,subPakNm); 
    if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy      
      selectNextButtonFromSubWindow();
      Button.clickOnButton(selectablebuttonClosebutton);
    } 
    finilizeOrder(); 
    aqUtils.Delay(3000); 
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
    selectPaymentTypeAddRequiredFields(givenPaymentType);    
    WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
    Button.clickOnButton(applyButton);
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    Log.Message("Don't Validate the order");
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");      
    aqUtils.Delay(3000);        
    verifyTotalOnConfirmationPage(expectedSettlemtnttotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
      return;
    } 
    var OrderID= (orderId.split('#')[1]).trim();
    OrderInfo.prototype.OrderID = OrderID;
    Log.Message("Order id is set:"+OrderID); 
    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
    AppLoginLogout.logout(); 
}
 