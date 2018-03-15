//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectGroupFromMainMenu
//Application Login & Logout functioonality
  
function  _001485874453765_28_Cashier_NoPermissionToSearchFunction()
{
try{
       InitializationEnviornment.initiliaze();
        AppLoginLogout.loginCashier();
        selectGroupFromMainMenu(defaultGroupName);    
      if(BuyButton.Enabled)
      {        
              Log.Message("buy button is enable and Visible mode");
      }else
      {
      merlinLogError("buy button is not enable and Visible mode");
      }      
      AppLoginLogout.logout(); 
      }catch(e)
  { 
      merlinLogError("Exception occured");
  }
}