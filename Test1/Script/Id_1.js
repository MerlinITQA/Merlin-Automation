// select main


//USEUNIT AppLoginLogout
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT InitializationEnviornment

//Application initalization

  
function ID_1()
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
