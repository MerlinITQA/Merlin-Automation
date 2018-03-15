//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT WrapperFunction

function C17271_Different_times_in_a_single_reservation(){
try
 {
    Log.AppendFolder("C17271_Different_times_in_a_single_reservation");
    var groupNm=defaultGroupName;   
    var keyWordNm ="Reservations";
    var packageNm ="Minimum Payment Required Reservation 2";    
    var subPakNm ="Individual";
    var dateD =CommonCalender.getTodaysDate();  
    var time1 ;   
    var time2 ; 
    var dateFormat =aqConvert.DateTimeToFormatStr(CommonCalender.getTodaysDate(), "%#m/%#d/%Y");    
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
   
    selectGroupFromMainMenu(groupNm);
    clickBuyTicketsButton();
     aqUtils.Delay(2000);
    WrapperFunction.selectKeywordName(keyWordNm);
    //Select first time zone for package.
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000);
    if(datetimeformSubWindow.Exists){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy
       // selectAvailableTimeFromSubWindow(time1); 
         availableTimedatagroup.Child(0).Click();
         time1 =  availableTimedatagroup.Child(0).HGroup(0).Label("timeLabel").Caption;      
        selectNextButtonFromSubWindow();   
     } else{
        merlinLogError("Date package is not selected. Calender window is not displayed.")
      }
      //Select second time zone for same package.      
      selectPackage(packageNm,subPakNm);
      aqUtils.Delay(2000);
      if(datetimeformSubWindow.Exists){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy
        try {      
            aqUtils.Delay(3000);
            availableTimedatagroup.Child(1).Click(); 
            time2 =  availableTimedatagroup.Child(1).HGroup(0).Label("timeLabel").Caption;         
            aqUtils.Delay(1000);
            } catch (e) {
        		merlinLogError("Oops! There's some glitch in the script: Unable to select differnt time " + e.message);
        	}     
        selectNextButtonFromSubWindow();   
      } else{
        merlinLogError("Date package is not selected. Calender window is not displayed.")
      }
      
      selectFinalizeOrderbutton();
      //Verify time is displayed on settlement page or not.      
      var flag = false;
      var cCount = settlement_scroller.ChildCount;
      var toDate1 =dateFormat +" "+ time1;
      var toDate2 =dateFormat +" "+ time2;
      var packageArray = new Array();
      for(let i=0;i<cCount;i++){
          var timeZonecap = settlement_scroller.Child(i).Caption;
                 
            if(timeZonecap.startsWith(dateFormat)){
               packageArray.push(timeZonecap);             
            }
      }
      
     for(let i=0;i<packageArray.length;i++){
            if(toDate1.startsWith(packageArray[i]) || toDate2.startsWith(packageArray[i])){
               flag = true;          
            }else
            {
              flag = false;
              break;
            }
      }
      if(flag){
         Log.Message("The date/time displayed in the order details corresponds to the date/time selected");
         clickConvertToReservation();
         aqUtils.Delay(3000);     
         var expectedSettlemtnttotal = orderDetailsTotal.Caption; 
         var orderTotal= (expectedSettlemtnttotal.split('$')[1]).trim();       
         var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
           paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
           Button.clickOnButton(CashButton);           
           paymentTypeBal = parseInt(paymentTypeBal);
           WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
           Button.clickOnButton(applyButton);
           if(applycashrespopupCashPaymentOKButton.Exists){
                  Button.clickOnButton(applycashrespopupCashPaymentOKButton);
           }          
          Log.Message("Complete the order");
          WrapperFunction.settlementCompleteOrder();
          aqUtils.Delay(5000);   
          //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
		  verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
          var orderId = cnf_orderID.Caption;
          if (orderId == null){
            merlinLogError("Order id is not present");
          }   
       }else{
          merlinLogError("Date time is not displayed correctly on settlement page.");
        }
  }
  catch(e)
  {
         merlinLogError("Exception in Test script");
  } finally { 
	    Log.PopLogFolder();
    }      
  AppLoginLogout.logout();
}
 