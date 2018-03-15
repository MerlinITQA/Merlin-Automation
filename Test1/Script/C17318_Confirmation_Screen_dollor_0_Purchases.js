//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function C17318_Confirmation_Screen_dollor_0_Purchases()
{
  
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
   try {
      Log.AppendFolder("C17318_Confirmation_Screen_dollor_0_Purchases");
      var keyWordNm ="Daily Admission";
      var packageNm = "Dated";
      var subPakNm ="Children (Ages 3-12)";     
      var dateD = CommonCalender.getTodaysDate();
      var givenPaymentType ="Cash"; 
      OrderInfo.prototype.OrderID = 0;
      WrapperFunction.selectKeywordName(keyWordNm);
      selectPackage(packageNm,subPakNm); 
      if(datetimeformSubWindow.Exists){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy   
        selectNextButtonFromSubWindow();      
      } 
      finilizeOrder();
      aqUtils.Delay(2000);   
      var settlementTotal =orderDetailsTotal.Caption;
      Log.Message("Verified order details on settlement page");    
      CashButton.Click();    
      applyAmount= aqString.Replace(settlementTotal,"$",""); 
      OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
      Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton);    
      Log.Message("Complete the order");
      aqUtils.Delay(1000);
      WrapperFunction.settlementCompleteOrder();
      aqUtils.Delay(2000);
      validateTicket("Don't Validate");
      Log.Message("Don't Validate the order"); 
      verifyTotalOnConfirmationPage(settlementTotal);
      var orderId = cnf_orderID1.Caption;
      if (orderId == null){
        merlinLogError("Order id is not present");
      }   
    
      Button.clickOnButton(NewOrder_Button);
     
      var subPakNm ="Under 3";     
     
      WrapperFunction.selectKeywordName(keyWordNm);
      selectPackage(packageNm,subPakNm); 
      if(datetimeformSubWindow.Exists){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy   
        selectNextButtonFromSubWindow();      
      } 
      finilizeOrder();
      aqUtils.Delay(2000);   
      var settlementTotal1 =orderDetailsTotal.Caption;
      Log.Message("Verified order details on settlement page");    
      if(settlementTotal == settlementTotal1){
        merlinLogError("getting previous values");
      } 
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      aqUtils.Delay(2000);
      validateTicket("Don't Validate");
      Log.Message("Don't Validate the order"); 
      verifyTotalOnConfirmationPage(settlementTotal1);
      if(cnf_orderDetailsTotal.Caption != "$0.00" ){
          merlinLogError("The $0 payment details are not displayed correctly.");
      }else{
      Log.Message("The $0 payment details are displayed correctly.");
      }  
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   AppLoginLogout.logout(); 
}