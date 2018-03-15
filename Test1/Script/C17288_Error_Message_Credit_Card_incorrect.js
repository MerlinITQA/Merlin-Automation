//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT VerifyCheckProperty
//Application Login & Logout functioonality
  
function C17288_Error_Message_Credit_Card_incorrect()
{
try{
    Log.AppendFolder("C17288_Error_Message_Credit_Card_incorrect");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    WrapperFunction.selectKeyword("Daily Admission");    
    selectPackage("Dated","Children (Ages 3-12)");
     if(datetimeformSubWindow.Exists){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy  
        selectNextButtonFromSubWindow();  
        aqUtils.Delay(2000);        
       Button.clickOnButton(selectablebuttonClosebutton);
     } 
	  aqUtils.Delay(2000);
    WrapperFunction.finilizeOrder()
    selectPaymentTypeDropDown.ClickItem("Credit Card");
    Button.clickOnButton(CC_EnterNumber);
    SelectPaymentType.enterCCNumber("11113333222211111");
    CC_ExpirationMonth.ClickItem("05 - May");
    CC_ExpirationYear.Keys("[Down][Down][Down]");
    CC_StreetAddress.Keys("MBS");
    CC_ZipCode.Keys("90210");  
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getTextValue(PaymentType_BalanceLabel);
    paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");
    paymentTypeBal= aqConvert.StrToFloat(paymentTypeBal);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton); 
    if(alertErrorWnd.Exists && alertErrorWnd.Visible){
          actualErrorMsg =errorMessagedisplay.Caption;
          if(compareStringObj("Unable to determine credit card type.",actualErrorMsg)){
          buttonOkOnError.Click();
      }else{
        merlinLogError("Error message is wrongly displayed.");
      } 
    }else
    {
      merlinLogError("alert error message window is not displayed.");
    } 
     AppLoginLogout.logout(); 
     AppLoginLogout.login();
         aqUtils.Delay(5000);       
    WrapperFunction.selectKeyword("Daily Admission");    
    selectPackage("Dated","Children (Ages 3-12)");
    if(datetimeformSubWindow.Exists){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy  
        selectNextButtonFromSubWindow();  
        aqUtils.Delay(2000);        
       Button.clickOnButton(selectablebuttonClosebutton);
     } 
	aqUtils.Delay(2000);
    WrapperFunction.finilizeOrder()
    aqUtils.Delay(3000);
    CreditCardButton.Click();
    if(CC_EnterNumber.Exist && CC_EnterNumber.Visible)
    {
      Button.clickOnButton(CC_EnterNumber);
      SelectPaymentType.enterCCNumber("11111111111111111");
      CC_ExpirationMonth.ClickItem("05 - May");
      CC_ExpirationYear.Keys("[Down][Down][Down]");
      CC_StreetAddress.Keys("MBS");
      CC_ZipCode.Keys("90210");
  
      WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
      var paymentTypeBal=WrapperFunction.getTextValue(PaymentType_BalanceLabel);
      paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");
      paymentTypeBal= aqConvert.StrToFloat(paymentTypeBal);
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton); 
      if(alertErrorWnd.Exists && alertErrorWnd.Visible){
            actualErrorMsg =errorMessagedisplay.Caption;
            if(compareStringObj("Unable to determine credit card type.",actualErrorMsg)){
            buttonOkOnError.Click();
        }else{
          merlinLogError("Error message is wrongly displayed.");
        } 
      }else
      {
        merlinLogError("alert error message window is not displayed.");
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
 