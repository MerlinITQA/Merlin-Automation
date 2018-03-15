//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction
//USEUNIT VerifyCheckProperty

function C17235_Passholder_displayed_correctly_10_orders()
{
 try {
    Log.AppendFolder("C17235_Passholder_displayed_correctly_10_orders");
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
    
    var keyWordNm ="Annual Pass";
    var packageNm ="Annual Pass - reserve";
    var subPakNm ="Individual";
    var qtyT = 10;          
      
    WrapperFunction.selectKeywordName(keyWordNm);
    selectQuantity(qtyT);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(1000);
    finilizeOrder();
    aqUtils.Delay(3000);
    
    if(PassholderWindow.Visible){
      if(Participantlist.Childcount == qtyT)
      {
           
          Button.clickOnButton(passHolderScrolldown);
          Button.clickOnButton(passHolderScrolldown);
            
          if(Participantlist.ListItem("Item 8").Visible){
            Log.Message("Item 8 is visible.");
            PassholderWindowClosebutton.Click();
           // alertWarningbuttonOk.Click();
          }
          else{
            Log.Message("Item 8 is not displayed on UI.");
          }
      
      }else{
          merlinLogError("All items are not added in participant list.");
      }
      
    }else{
      merlinLogError("passholder window is not displayed");
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