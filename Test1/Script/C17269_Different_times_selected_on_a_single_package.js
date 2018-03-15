//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder

function C17269_Different_times_selected_on_a_single_package()
{ 
   InitializationEnviornment.initiliaze(); 
   AppLoginLogout.login();
  var keyWordNm ="Daily Admission";
  var packageNm = "Date/Time";
  var subPakNm ="Children (Ages 3-12)";     
  var dateD = CommonCalender.getTodaysDate();
  var dtFmt = aqConvert.DateTimeToFormatStr(dateD, "%#m/%#d/%Y");
  var givenPaymentType ="Cash";
   try {
    Log.AppendFolder("C17269_Different_times_selected_on_a_single_package");
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
	SelectQuantityFromHeader.selectQuantity(2);
    selectPackage(packageNm,subPakNm);
    var firstTime;
    var secondTime; 
    if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy 
       try {      
          aqUtils.Delay(3000);
          availableTimedatagroup.Child(0).Click();
          firstTime = availableTimedatagroup.Child(0).HGroup(0).Label("timeLabel").Caption;
          aqUtils.Delay(1000);
          } catch (e) {
      		merlinLogError("Oops! There's some glitch in the script: Unable to select differnt time " + e.message);
      	}
      selectNextButtonFromSubWindow();
      Button.clickOnButton(selectablebuttonClosebutton);
    } 
	SelectQuantityFromHeader.selectQuantity(4);
     selectPackage(packageNm,subPakNm);
     if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy 
      try {      
        aqUtils.Delay(3000);
        availableTimedatagroup.Child(1).Click();
        secondTime = availableTimedatagroup.Child(1).HGroup(0).Label("timeLabel").Caption;
        selectNextButtonFromSubWindow();
        aqUtils.Delay(1000);
        } catch (e) {
    		merlinLogError("Oops! There's some glitch in the script: Unable to select differnt time " + e.message);
    	}
       Button.clickOnButton(selectablebuttonClosebutton);   
    } 
    aqUtils.Delay(1000);
    cartaddedItemList.Refresh();
    aqUtils.Delay(3000);
    var firstPackageText = cartaddedItemList.Child(0).VGroup("cartVGroup").List("ratesList").Child(0).HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("rateNameLabel").Caption;
    var secondPackageText = cartaddedItemList.Child(0).VGroup("cartVGroup").List("ratesList").Child(1).HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("rateNameLabel").Caption
    var f1 = subPakNm+" "+dtFmt+""+firstTime;
    var f2 = subPakNm+" "+dtFmt+""+secondTime;
    VerifyCheckProperty.compareStringObj(firstPackageText,f2);
    VerifyCheckProperty.compareStringObj(secondPackageText,f1);
    //VerifyCheckProperty.compareStringObj(labelExtralabel.Caption,"(Multiple Date/Times)");
    finilizeOrder();
    aqUtils.Delay(2000);   
    var settlementTotal =orderDetailsTotal.Caption;
   
    CashButton.Click();    
    applyAmount= aqString.Replace(settlementTotal,"$",""); 
    OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
    Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
    WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
    Button.clickOnButton(applyButton);    
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
  AppLoginLogout.logout(); 
}