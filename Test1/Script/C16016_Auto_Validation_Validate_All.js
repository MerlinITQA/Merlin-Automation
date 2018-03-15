//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT PlaceOrder
//USEUNIT SupportManagerFunctions

function C16016_Auto_Validation_Validate_All()
{
try{
      Log.AppendFolder("C16016_Auto_Validation_Validate_All");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login(); 
      var keyWordNm ="Daily Admission";
      var packageNm ="Dated";
      var subPakNm ="Adult";
      var qty = 1;
      dt = CommonCalender.getTodaysDate();
      var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");
        
      Button.clickOnButton(selectDirectoryButton); 
  		    if(slidetoggleAutovalidateslidetogg.FlexObject.active){
            Button.clickOnButton(selectDirectoryButton);
          } else{
  			   slidetoggleAutovalidateslidetogg.Click();     
  		}    
        WrapperFunction.selectKeywordName(keyWordNm);
        selectPackage(packageNm,subPakNm);
        aqUtils.Delay(3000);  
        selectDateFromSubWindow(dateD); 
        selectNextButtonFromSubWindow(); 
        finilizeOrder();
        aqUtils.Delay(2000);       
        var settlementTotal =orderDetailsTotal.Caption; 
        Log.Message("Verified order details on settlement page");
        CashButton.Click();
        applyAmount= aqString.Replace(settlementTotal,"$",""); 
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
          validateTicket("Validate All");          
          if(buttonClosebutton.Exists && buttonClosebutton.VisibleOnScreen){
          Button.clickOnButton(buttonClosebutton);
          }
        }
        else{
          merlinLogError("Auto-validation options pop-up is not displayed")
        }
        verifyTotalOnConfirmationPage(settlementTotal);
        var orderId = cnf_orderID1.Caption;
        if (orderId == null){
           merlinLogError("Order id is not present");
        }else{ 
          OrderID= (orderId.split('#')[1]).trim();
          OrderInfo.prototype.OrderID = OrderID;
          Log.Message("Order id is set:"+OrderID);
        }  
        selectSupportManagerFromMainMenu(); 
        aqUtils.Delay(5000);
       // AppLoginLogout.loginSupportManager();
        checkOrderInfoSupportManager(OrderInfo.prototype.OrderID,qty);      
        AppLoginLogout.logout();
        }
  catch(e)
  {
    merlinLogError("Exception occured");
  }
  finally { 
	    Log.PopLogFolder();
  }     
}