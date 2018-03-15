//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function ID_018_AnnualPass_IAP_Cash()
{
try{
      Log.AppendFolder("ID_018_AnnualPass_IAP_Cash");
       InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Pass");
        selectQuantity(5);
        selectPackage("Annual Pass - reserve","Individual");
        aqUtils.Delay(5000);
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetails();
        PassholderDetails.enterDetails();
        PassholderDetails.enterDetails1();
        PassholderDetails.enterDetails1();
        PassholderDetails.enterDetails1();
        SelectPaymentType.selectPaymentType("Credit Card");
          
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getTextValue(PaymentType_BalanceLabel);
        paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        
        validateTicket("Validate All");
       // Button.clickOnButton(NewOrder_Button);
        AppLoginLogout.logout();
          } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
     
}
 