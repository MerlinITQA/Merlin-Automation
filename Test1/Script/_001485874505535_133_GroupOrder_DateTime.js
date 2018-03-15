//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction
//USEUNIT VerifyCheckProperty

  
function _001485874505535_133_GroupOrder_DateTime()
{
Log.AppendFolder("_001485874505535_133_GroupOrder_DateTime");
    try
    {
          InitializationEnviornment.initiliaze();
          AppLoginLogout.login(); 
          var myGroupsName = defaultGroupName;
          var keyWordNm ="Daily Admission";
          var packageNm ="3 site Combi";
          var subPakNm ="Children (Ages 3-12)";
          var qtyT = 2;
          dt = CommonCalender.getTodaysDate(); 
          var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y"); 
          var verifyDateFormatPrefix = aqConvert.DateTimeToFormatStr(dateD, "%A, %B %d, %Y");
          var givenPaymentType ="Cash";
          selectGroupFromMainMenu(myGroupsName);
          clickBuyTicketsButton();
          placeOrder(keyWordNm,packageNm,subPakNm,qtyT,dateD,givenPaymentType); 
          var settlementDateTime  = SettlementScreen_DateTime.Caption;
         settlementDateTime= (settlementDateTime.split('Date:')[1]).trim();
          selectGroupFromMainMenuWithOrderedRecord(myGroupsName);
          
           aqUtils.Delay(3000);
          var orderDateTime = DateTime_Row1Value.Caption;
          
          if(VerifyCheckProperty.compareStringObj(settlementDateTime,orderDateTime)){
            Log.Message("Date Time are not matching");
          }
          else{
            merlinLogError("Date Time are not matching");
          }
          Button.clickOnButton(resOrderInfoClosebutton);         
          AppLoginLogout.logout();
  }

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
finally { 
	    Log.PopLogFolder();
    }    
}
 