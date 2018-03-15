//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function i()
{
try{
    Log.AppendFolder("i");
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
    OrderInfo.prototype.OrderTotalAmount = aqString.Replace(roundingValue,"$","").trim();
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
        var verifyText ="Refund due: $"+OrderInfo.prototype.OrderTotalAmount;
        Button.clickOnButton(Refund_Button);
        WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");  
        Button.clickOnButton(refundReservationConfOK);      
        aqUtils.Delay(3000);
        if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
         Log.Message("Cash Lift pop up alert is displayed.")
         Button.clickOnButton(cashLiftPopupClosebutton);
        }
        var refundText = confirmationChangeDue.Caption;
        if(refundText.startsWith(verifyText)){
           Log.Message("The payment summary on the bottom right shows correct values.");
        }
        else{
           merlinLogError("The payment summary is not correctly displayed.");
        }
   
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    } 
    finally { 
      AppLoginLogout.logout();
	    Log.PopLogFolder();
    }  
}
 