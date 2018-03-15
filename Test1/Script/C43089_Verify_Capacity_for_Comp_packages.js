//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function C43089_Verify_Capacity_for_Comp_packages()
{
try {
    Log.AppendFolder("C43089_Verify_Capacity_for_Comp_packages");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();    
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Reservations";
    var packageNm ="Minimum Payment Required Reservation Shared Capacity 1"; 
    var subPakNm ="Individual";    
    var dateD =CommonCalender.getTodaysDate();
   
    WrapperFunction.selectKeywordName(keyWordNm);  
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000);
     var availableCap = availableTimedatagroup.Child(0).HGroup(0).HGroup("capacityGroup").VGroup(0).Label("availableLabel").Caption;
     var totalCap =availableTimedatagroup.Child(0).HGroup(0).HGroup("capacityGroup").VGroup(0).Label("capacityLabel").Caption;
     availableTimedatagroup.Child(0).Click();    
     var selectedTime = availableTimedatagroup.Child(0).HGroup(0).Label("timeLabel").Caption;
    if(datetimeformSubWindow.Exists && datetimeformSubWindow.VisibleOnScreen){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy  
        selectNextButtonFromSubWindow();
        aqUtils.Delay(2000);     
        if(selectablebuttonClosebutton.Exists && selectablebuttonClosebutton.VisibleOnScreen){   
          Button.clickOnButton(selectablebuttonClosebutton);
        }
    }  
    finilizeOrder();
    aqUtils.Delay(3000);
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
 
    paymentTypeBal= aqString.Replace(expectedSettlemtnttotal,"$","");
    ReservationOrderInfo.prototype.ResTotal = paymentTypeBal;
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");      
    aqUtils.Delay(3000);        
    verifyTotalOnConfirmationPage(expectedSettlemtnttotal);
    var orderId = cnf_orderID.Caption;
    if (orderId == null){
        merlinLogError("Order id is not present");
    }
    WrapperFunction.selectMainMenu(PointOfSale_MainMenu); 
    WrapperFunction.selectKeywordName(keyWordNm);  
    aqUtils.Delay(3000);
    allPackages.Refresh();
    aqUtils.Delay(2000);
    selectPackage(packageNm,subPakNm); 
    aqUtils.Delay(3000);
    var cnt =availableTimedatagroup.ChildCount;
    var capicityUpdated = false;
    aqUtils.Delay(1000);
    for (i = 0 ; i < cnt; i++){        
        cTime = availableTimedatagroup.Child(i).HGroup(0).Label("timeLabel").Caption;
        aqUtils.Delay(1000);
        if (selectedTime == cTime){
         var availableCap1 = availableTimedatagroup.Child(i).HGroup(0).HGroup("capacityGroup").VGroup(0).Label("availableLabel").Caption;
          aqUtils.Delay(300);
          if(availableCap1 < availableCap)
            var capicityUpdated = true;                 
            break;        
        }
     }
      if(capicityUpdated){
          Log.Message("Capacity is updated.")
      }else{
          merlinLogError("Capicity is not updated.")
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