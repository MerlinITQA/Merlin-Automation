//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder 

function C16338_Purchase_Flexi_Admission()
{
   Log.AppendFolder("C16338_Purchase_Flexi_Admission");
    InitializationEnviornment.initiliaze();
   AppLoginLogout.login();
  try {   
    var keyWordNm ="Daily Tickets";
    //var packageNm = "Flexi Admission";
    var packageNm = "Ultimate Flexible Ticket";
    var subPakNm="Adult"; 
    
    Log.AppendFolder("C16338_Purchase_Flexi_Admission");      
    WrapperFunction.selectKeywordName(keyWordNm); 
    selectPackage(packageNm,subPakNm); 
    finilizeOrder();
    aqUtils.Delay(2000);    
    var settlementTotal =orderDetailsTotal.Caption;   
    CashButton.Click();
    applyAmount= aqString.Replace(settlementTotal,"$",""); 
    OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
    Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
    if(applyAmount != 0){
      Log.Message("Apply amount");
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton); 
      }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
     if(postordercharaczippopupAdditiona.Exists){
      WrapperFunction.setTextValue(zipCodeTextInput,"12345");
      Button.clickOnButton(zipCodeContinueButton);
    }else{
    Log.Message("Additional information for zip code is not populated.");
    }
     validateTicket("Don't Validate");
    Log.Message("Don't Validate the order");
    verifyTotalOnConfirmationPage(settlementTotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    }
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   AppLoginLogout.logout(); 
}
