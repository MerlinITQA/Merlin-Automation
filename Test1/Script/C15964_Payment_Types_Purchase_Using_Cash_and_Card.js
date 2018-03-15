//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function C15964_Payment_Types_Purchase_Using_Cash_and_Card()
{
try{
    Log.AppendFolder("C15964_Payment_Types_Purchase_Using_Cash_and_Card");
    InitializationEnviornment.initiliaze(); 
    AppLoginLogout.login();
    WrapperFunction.selectKeyword("Daily Admission");
    SelectQuantityFromHeader.selectQuantity(3);
    selectPackage("Open Dated","Children (Ages 3-12)");
	   aqUtils.Delay(3000); 
    WrapperFunction.finilizeOrder()
    SelectPaymentType.selectPaymentType("Credit Card");
  
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getTextValue(PaymentType_BalanceLabel);
    paymentTypeBal= (paymentTypeBal.split('(')[0]).trim();
    paymentTypeBal= removeSpecialCharacter(paymentTypeBal);
    
    var paymentTypeBalBefore= aqConvert.StrToFloat(paymentTypeBal);
    Log.Message("paymentTypeBalBefore :"+paymentTypeBalBefore);
    
    var paymentTypeBalAfter=(Math.floor(paymentTypeBalBefore));
    Log.Message("paymentTypeBalAfter :"+paymentTypeBalAfter);
        
    roundingValue = paymentTypeBalBefore - paymentTypeBalAfter;
   
    Log.Message("roundingValue :"+roundingValue);
   
     WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBalAfter);
     Button.clickOnButton(applyButton);
     
    
    SelectPaymentType.selectPaymentType("Cash");
    WrapperFunction.setTextValue(PayamountTextBox,roundingValue);
    Button.clickOnButton(applyButton);
    
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    }else{
      OrderID= (orderId.split('#')[1]).trim();
      OrderInfo.prototype.OrderID = OrderID;
      Log.Message("Order id is set:"+OrderID);
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
 