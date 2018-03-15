//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectDirectory
  
function _0001485874514287_151_LineIndention()
{
Log.AppendFolder("_0001485874514287_151_LineIndention");
try
  {   InitializationEnviornment.initiliaze();
      AppLoginLogout.login();       
      WrapperFunction.selectMainMenu(PassProcessing_MainMenu);
      aqUtils.Delay(1000);
      searchPassHolderOrderID("7674");
      aqUtils.Delay(3000);
      Button.clickOnButton(SearchButton);
      aqUtils.Delay(1000);
      Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1_new);
    
      aqUtils.Delay(2000);
      
      richeditabletextTextdisplay.keys("hello [Enter]Test [Enter]good day");
       //setTextBoxValue(richeditabletextTextdisplay,"hello [Enter]Test [Enter]good day");
        var sricheditabletextTextdisplay = getTextValue(richeditabletextTextdisplay);
       Log.Message("merchantNameExpectedValue "+sricheditabletextTextdisplay);
       if(isIncludes("hello  Test  good day" ,sricheditabletextTextdisplay))
       {
            Log.Message("Strings are correct");
       }else{
            merlinLogError("Strings are not correct");
       }
       AppLoginLogout.logout();
    }
  catch(e)
  {
          merlinLogError("Exception occured");
          //Runner.Stop();
  }
  finally { 
	    Log.PopLogFolder();
    }   
}
 