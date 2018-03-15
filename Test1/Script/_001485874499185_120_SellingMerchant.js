//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT DropDownList

  
function _001485874499185_120_SellingMerchant()
{
      Log.AppendFolder("_001485874499185_120_SellingMerchant");
      try{
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();      
      selectMainMenu(PassProcessing_MainMenu);
      setTextBoxValue(PassProcessing_OrderID,"7675");
      clickOnButton(FilterButton);
      setTextBoxValue(Merchantdropdown,"LEGOLAND Discovery Center Boston POS");
      clickOnButton(SearchButton);
      checkControlExistence(PassHolder_ResultDataGridScroller_OrderID_Row1_new);
       AppLoginLogout.logout();
  }
catch(e)
{ 
      merlinLogError("Exception occured"+e.getMessage);
      //Runner.Stop();
}
}
 