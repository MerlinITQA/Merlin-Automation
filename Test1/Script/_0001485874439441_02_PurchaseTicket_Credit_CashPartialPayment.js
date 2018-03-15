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
      Log.AppendFolder("_0001485874439441_02_PurchaseTicket_Credit_CashPartialPayment");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    WrapperFunction.selectKeyword("Daily Admission");
   
    selectPackage("Dated","Adult");
    aqUtils.Delay(5000);
    selectQuantityFromSubWindow(2);
   /* 
    selectSubPackageFromSubWindow("Adult");
    selectQuantityFromSubWindow(2);
    selectSubPackageFromSubWindow("Children (Ages 3-12)");
   */
    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
    aqUtils.Delay(3000);
  //  selectAvailableTimeFromSubWindow("1:30 PM");
    selectNextButtonFromSubWindow();
    aqUtils.Delay(3000);
     selectFinalizeOrderbutton();
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
  
    SelectPaymentType.selectPaymentType("Credit Card");
    var paymentTypeBalBefore=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
    Log.Message("paymentTypeBalBefore :"+paymentTypeBalBefore);
    var paymentTypeBalAfterDecimalPlace=getFloorValue(paymentTypeBalBefore);
    Log.Message("paymentTypeBalAfterDecimalPlace :"+paymentTypeBalAfterDecimalPlace);
    roundingValue = paymentTypeBalBefore - paymentTypeBalAfterDecimalPlace;
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBalAfterDecimalPlace);
    Button.clickOnButton(applyButton);
    
     Button.clickOnButton(CashButton);    
    roundingValue = aqConvert.StrToFloat(roundingValue);
    roundingValue =roundingValue +.001;
    WrapperFunction.setTextValue(PayamountTextBox,roundingValue); 
    Button.clickOnButton(applyButton);
    
    WrapperFunction.settlementCompleteOrder();
    WrapperFunction.validateTicket("Validate All");
    if(buttonClosebutton.Exists && buttonClosebutton.VisibleOnScreen){
          Button.clickOnButton(buttonClosebutton);
          }
    Button.clickOnButton(NewOrder_Button);
    
    
    AppLoginLogout.logout(); 
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}
 