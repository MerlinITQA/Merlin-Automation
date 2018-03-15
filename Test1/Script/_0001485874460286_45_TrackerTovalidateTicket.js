//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectDirectory
//USEUNIT PlaceOrder
  
function _0001485874460286_45_TrackerTovalidateTicket()
{
Log.AppendFolder("_0001485874460286_45_TrackerTovalidateTicket");
try{
         InitializationEnviornment.initiliaze();
         AppLoginLogout.login();
         aqUtils.Delay(2000);
        Button.clickOnButton(selectDirectoryButton); 
  		  if(!slidetoggleAutovalidateslidetogg.FlexObject.active){
             slidetoggleAutovalidateslidetogg.Click();  
          } else{
  			     Button.clickOnButton(selectDirectoryButton); 
  		    }
         Button.clickOnButton(selectDirectoryButton);
         if(toggleTrackertoggle.FlexObject.active){
             Log.Message("Tracker is not log in.");  
          } else{
  			    merlinLogError("Tracker is not log in."); 
  		    }
          Button.clickOnButton(selectDirectoryButton);
        var groupNm=defaultGroupName;
        var paymentTypeForReservation = "Cash";
        var keyWordNm ="Daily Admission";
        var packageNm ="Date/Time";
        var subPakNm ="Adult";
        var qtyT = 2;
        var dateD =CommonCalender.getTodaysDate();  
        addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);   
          
       // WrapperFunction.selectKeyword("Daily Tickets");
       // selectPackage("Saver Admission","Adult");		   
//        aqUtils.Delay(3000);       
//         if(datetimeformSubWindow.Exists){
//          selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy  
//          selectNextButtonFromSubWindow();
//        }
        WrapperFunction.finilizeOrder();  
        aqUtils.Delay(2000);
        var settlementSubTotal = orderDetailsSubTotal.Caption;
        var settlementTotal =orderDetailsTotal.Caption;
        Log.Message("Verified order details on settlement page");
        selectPaymentTypeAddRequiredFields("Cash");
        var applyAmount= aqString.Replace(settlementTotal,"$",""); 
        OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
        Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
        if(applyAmount != 0){
          Log.Message("Apply amount");
          WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
          Button.clickOnButton(applyButton); 
          }
        Log.Message("Complete the order");
        WrapperFunction.settlementCompleteOrder();
        aqUtils.Delay(2000);
        if(validateTicketspopUp.Exists)
         {
          validateTicket("Don't Validate");
         }
         else{
          merlinLogError("Validate popup is not displayed");
         }
        verifyTotalOnConfirmationPage(settlementTotal);          
        var orderId = cnf_orderID1.Caption;
        if (orderId == null){
          merlinLogError("Order id is not present");
        } 
        var OrderID= (orderId.split('#')[1]).trim();
        OrderInfo.prototype.OrderID = OrderID;
        Log.Message("Order id is set:"+OrderID);
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
 