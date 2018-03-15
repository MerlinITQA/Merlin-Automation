//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectGroupFromMainMenu
//Application Login & Logout functioonality
  
function  _001485874453765_27_Cashier_NoPermissionToSearchFunction()
{
       // InitializationEnviornment.initiliaze();
      //  AppLoginLogout.CashierLogin();
        selectGroupFromMainMenu(defaultGroupName);
    
      if(BuyButton.Enabled)
      {        
              merlinLogError("buy button is enable should be disabled mode");
      }
      
      
     }