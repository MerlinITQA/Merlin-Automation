//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction
//USEUNIT VerifyCheckProperty

function C16031_Ability_to_Sales_of_Products_via_Supervisor()
{
 try {
    Log.AppendFolder("C16031_Ability_to_Sales_of_Products_via_Supervisor");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.loginCashier();
    
    var keyWordNm ="Daily Admission";
    var packageNm ="Date/Time";
    var subPakNm ="Children (Ages 3-12)";
    var qtyT = 2;          
    var keyWordNm1 ="Daily Admission";
    var packageNm1 ="Dated";
    var subPakNm1 ="Children (Ages 3-12)";
    var qtyT1 = 1;  
    WrapperFunction.selectKeywordName(keyWordNm);
    selectQuantity(qtyT);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000);
    WrapperFunction.setTextValue(refundReservationConf,"Incorrect");
    WrapperFunction.setTextValue(refundReservationConfPassword,"Wrong");
    Button.click(refundReservationConfOK);
    
    if(alertErrorWnd.Visible){
      buttonOkOnError.Click();      
      enterSupervisorCred();
      if(datetimeformSubWindow.Exists){   
        selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy  
        selectNextButtonFromSubWindow();  
         aqUtils.Delay(2000);        
        Button.clickOnButton(selectablebuttonClosebutton);
      }    
     addNewTicket(keyWordNm1,packageNm1,subPakNm1,qtyT1,CommonCalender.getTodaysDate());   
      // aqUtils.Delay(2000);        
      // Button.clickOnButton(selectablebuttonClosebutton);
      addNewTicket(keyWordNm1,packageNm1,"Under 3",qtyT1,CommonCalender.getTodaysDate());
       
      finilizeOrder();
      aqUtils.Delay(2000);
      var settlementTotal =orderDetailsTotal.Caption;
      Log.Message("Verified order details on settlement page");
      CashButton.Click();    
      applyAmount= aqString.Replace(settlementTotal,"$",""); 
      if(applyAmount != 0){
        WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
        Button.clickOnButton(applyButton);
      }
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      validateTicket("Don't Validate");
      verifyTotalOnConfirmationPage(settlementTotal);
      var orderId = cnf_orderID1.Caption;
      if (orderId == null){
        merlinLogError("Order id is not present");
      }    
    }else{
       merlinLogError("Error Message is not displayed for incorrect credentials.")
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