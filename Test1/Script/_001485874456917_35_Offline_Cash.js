//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _001485874456917_35_Offline_Cash()
{
Log.AppendFolder("_001485874456917_35_Offline_Cash");
try
{           InitializationEnviornment.initiliaze();
            AppLoginLogout.login();
            WrapperFunction.selectKeywordName("Offline");
            selectPackage("Daily Admission - O","Adult");
          
            WrapperFunction.finilizeOrder()
            SelectPaymentType.selectPaymentType("Cash");
            
            WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
            var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
            WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
            Button.clickOnButton(applyButton);
           
            WrapperFunction.settlementCompleteOrder();
            validateTicket("Validate All");
            Button.clickOnButton(NewOrder_Button);
         AppLoginLogout.logout();
       }

catch(e)
    {
             merlinLogError("Exception in Test script");
             //Runner.Stop();
    } 
}
 