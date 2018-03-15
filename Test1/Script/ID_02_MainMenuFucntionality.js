//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction

//Main Menu selection functionality
function MainMenu_Fucntionality()
{
//    InitializationEnviornment.initiliaze();
//    AppLoginLogout.login();
//    WrapperFunction.selectMainMenu(Groups_MainMenu);
//    WrapperFunction.selectMainMenu(SupportManager_MainMenu);
//    WrapperFunction.selectMainMenu(PassProcessing_MainMenu);
//    WrapperFunction.selectMainMenu(Exchange_MainMenu);
//    WrapperFunction.selectMainMenu(PointOfSale_MainMenu);
//    AppLoginLogout.logout();
    selectPaymentTypeDropDown.ClickItem("Invoice");
    selectPaymentTypeDropDown.ClickItem("Voucher");
    selectPaymentTypeDropDown.ClickItem("Callscripter");
}
