//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//Application Login & Logout functioonality
  
function _0001485874439441_PurchaseTicket_Credit_CashPartialPayment()
{
try{
      Log.AppendFolder("C17260_XMC_Modify_Reservation_Date_closes");
   InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    WrapperFunction.selectKeyword("Daily Admission");
    selectPackage("3 site Combi","Adult");
    aqUtils.Delay(5000);
    selectQuantityFromSubWindow(3);
    selectSubPackageFromSubWindow("Adult");
    selectQuantityFromSubWindow(2);
    selectSubPackageFromSubWindow("Children (Ages 3-12)");
    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
    selectAvailableTimeFromSubWindow("11:45 AM");
    selectNextButtonFromSubWindow();
	aqUtils.Delay(2000);
    WrapperFunction.finilizeOrder()
    SelectPaymentType.selectPaymentType("Credit Card");
  
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getTextValue(PaymentType_BalanceLabel);
    paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");
    var paymentTypeBalBefore= aqConvert.StrToFloat(paymentTypeBal);
    Log.Message("paymentTypeBalBefore :"+paymentTypeBalBefore);
    
    var paymentTypeBalAfter=(Math.floor(paymentTypeBalBefore));
    Log.Message("paymentTypeBalAfter :"+paymentTypeBalAfter);
    
    
    roundingValue = paymentTypeBalBefore - paymentTypeBalAfter
   
    Log.Message("roundingValue :"+roundingValue);
   
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBalAfter);
    Button.clickOnButton(applyButton);
    
    SelectPaymentType.selectPaymentType("Cash");
    WrapperFunction.setTextValue(PayamountTextBox,roundingValue);
    Button.clickOnButton(applyButton);
    
    WrapperFunction.settlementCompleteOrder();
    WrapperFunction.validateTicket("Validate All");
    //Button.clickOnButton(NewOrder_Button);
    AppLoginLogout.logout(); 
     } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
  
}
 