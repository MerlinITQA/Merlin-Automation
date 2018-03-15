//USEUNIT AppLoginLogout
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT InitializationEnviornment

//Main Menu selection functionality
function MainMenu_Fucntionality()
{
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    WrapperFunction.selectMainMenu(Groups_MainMenu);
    WrapperFunction.selectMainMenu(SupportManager_MainMenu);
    WrapperFunction.selectMainMenu(PassProcessing_MainMenu);
    WrapperFunction.selectMainMenu(Exchange_MainMenu);
    WrapperFunction.selectMainMenu(PointOfSale_MainMenu);
    AppLoginLogout.logout();
}
