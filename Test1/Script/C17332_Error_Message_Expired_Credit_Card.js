//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT VerifyCheckProperty
//Application Login & Logout functioonality
  
function C17332_Error_Message_Expired_Credit_Card()
{
try{
      Log.AppendFolder("C17332_Error_Message_Expired_Credit_Card");   
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();  
    WrapperFunction.selectKeyword("Daily Admission");    
    selectPackage("Open Dated","Children (Ages 3-12)");
    aqUtils.Delay(3000);
    WrapperFunction.finilizeOrder()
    aqUtils.Delay(3000);
    CreditCardButton.Click();
    if(CC_EnterNumber.Exist && CC_EnterNumber.Visible)
    {
      Button.clickOnButton(CC_EnterNumber);
      SelectPaymentType.enterCCNumber("4444333322221111");
      //CC_ExpirationMonth.ClickItem("04 - April");
      //CC_ExpirationYear.Keys("[Down]");
      CC_StreetAddress.Keys("MBS");
      CC_ZipCode.Keys("90210");
     
      WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
      var paymentTypeBal=WrapperFunction.getTextValue(PaymentType_BalanceLabel);
      paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton); 
      aqUtils.Delay(2000);
   
      if(/*(ccYearErrorindicator.Exists && ccYearErrorindicator.Visible) ||*/(
      ccMonthlErrorindicator.Exists && ccMonthlErrorindicator.Visible)){
            Log.Message(" A red border is displayed as the expired date is a problem.");
        }else{
          merlinLogError(" A red border is not displayed as the expired date is a problem.");
        }       
    }else{
      merlinLogError("The interface is not changes from Cash to the Credit Card.");
      merlinLogError("Credit Card fields are not displayed.");
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
 