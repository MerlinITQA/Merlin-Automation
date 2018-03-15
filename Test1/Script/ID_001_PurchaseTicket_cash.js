//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function ID_10_PurchaseTicket()
{
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    
    WrapperFunction.selectKeyword("Daily Admission");
    selectPackage("3 site Combi","Adult");
    aqUtils.Delay(5000);
    
    SelectQuantityFromSubWindow(3);
    selectSubPackageFromSubWindow("Adult");
    SelectQuantityFromSubWindow(2);
    selectSubPackageFromSubWindow("Children (Ages 3-12)");
    SelectDateFromSubWindow("8/24/2017"); //mm-dd-yyyy
    SelectAvailableTimeFromSubWindow("11:30 AM");
    SelectNextButtonFromSubWindow();
    aqUtils.Delay(2000);
    WrapperFunction.finilizeOrder()
    SelectPaymentType.selectPaymentType("Cash");
    Button.clickOnButton(ValidateAllButton);
    Button.clickOnButton(NewOrder_Button);
    AppLoginLogout.logout(); 
  
}
 