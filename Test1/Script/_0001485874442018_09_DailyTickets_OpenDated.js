//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function _0001485874442018_09_DailyTickets_OpenDated()
{
Log.AppendFolder("_0001485874442018_09_DailyTickets_OpenDated");
try{

    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    WrapperFunction.selectKeyword("Daily Tickets");
    selectPackage("Ultimate Flexible Ticket","Adult");
    selectFinalizeOrderbutton();
    
    SelectPaymentType.selectPaymentType("Cash");
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    WrapperFunction.settlementCompleteOrder();
    WrapperFunction.validateTicket("Validate All");
    Button.clickOnButton(NewOrder_Button);
    AppLoginLogout.logout(); 
   
   }

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop(true);
}
}
 