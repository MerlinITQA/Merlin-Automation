//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT WrapperFunction

function C15942_Purchase_Annual_Pass()
{ 
try{
   Log.AppendFolder("C15942_Purchase_Annual_Pass");
   InitializationEnviornment.initiliaze(); 
   AppLoginLogout.login();
   WrapperFunction.selectKeyword("Annual Pass"); 
   selectPackage("Annual Pass - reserve","Individual");
   aqUtils.Delay(3000);  
   WrapperFunction.finilizeOrder()
   aqUtils.Delay(1000); 
   PassholderDetails.enterDetailsWithCam(); 
   var expectedSettlemtnttotal = orderDetailsTotal.Caption;
   var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
   selectPaymentTypeAddRequiredFields("Cash");     
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
  AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();      
    }   
}