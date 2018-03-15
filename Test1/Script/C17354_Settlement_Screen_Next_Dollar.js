//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping

function C17354_Settlement_Screen_Next_Dollar()
{ 
   InitializationEnviornment.initiliaze(); 
    AppLoginLogout.login();
  var keyWordNm ="Daily Admission";
  var packageNm = "Open Dated";
  var subPakNm ="Children (Ages 3-12)"; 
  var dateD = CommonCalender.getTodaysDate();
    try {
    Log.AppendFolder("C17354_Settlement_Screen_Next_Dollar");
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
    var applyAmount= aqString.Replace(settlementTotal,"$","").trim();
    roundval = Math.ceil(applyAmount);
    
    Sys.Desktop.Keys("[F7]");
    aqUtils.Delay(1000);
    var applyedAmt = paymentlistgroup.ListItem(0).PaymentListItem("payItem").HGroup(0).Label("amtLabel").Caption;
    applyedAmt= aqString.Replace(applyedAmt,"$","").trim();
    if(applyedAmt == roundval){
      Log.Message("Correct next rounded value is applyed.");
    }else{
      merlinLogError("Wrong next rounded value is applyed.");
    }
    paymentlistgroup.ListItem(0).Click();
    if(paymentlistgroup.ListItem(0).PaymentListItem("payItem").HGroup(0).Image("deleteBtn").VisibleOnScreen){
     paymentlistgroup.ListItem(0).PaymentListItem("payItem").HGroup(0).Image("deleteBtn").Click();
    }    
     selectPaymentTypeAddRequiredFields("Invoice"); 
     var halfAmt = applyAmount/2 ;
     roundval1 = Math.ceil(halfAmt);
     halfAmt = parseInt(halfAmt);
     WrapperFunction.setTextValue(PayamountTextBox,halfAmt);
     Button.clickOnButton(applyButton);
     aqUtils.Delay(1000);
     CashButton.Click(); 
     aqUtils.Delay(1000);
     Sys.Desktop.Keys("[F7]"); 
     Log.Message("Apply remaining amount");
     aqUtils.Delay(2000);
     paymentlistgroup.Refresh();
     var cnt =paymentlistgroup.ChildCount;
     var totalAmt = 0;
     for(var i=0;i<cnt;i++){
       
       temp = paymentlistgroup.Child(i).PaymentListItem("payItem").HGroup(0).Label("amtLabel").Caption;
       aqUtils.Delay(1000); 
       temp =parseInt(aqString.Replace(temp,"$","").trim());
       aqUtils.Delay(1000);       
       totalAmt= totalAmt + temp;
       
     } aqUtils.Delay(1000);    
     if(totalAmt == roundval){
      Log.Message("Correct amount is applyed for invoice and next rounded value.");
    }else{
      merlinLogError("Wrong amount is applyed for invoice and next rounded value."+totalAmt);
    }
    aqUtils.Delay(500);
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
    verifyTotalOnConfirmationPage(settlementTotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    }     
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
  // AppLoginLogout.logout(); 
}