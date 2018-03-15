//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function C43099_Ticket_in_the_Cart_correctly_updates_Capacity()
{
try {
    Log.AppendFolder("C43099_Ticket_in_the_Cart_correctly_updates_Capacity");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();    
    var keyWordNm ="Daily Admission";
    var packageNm ="Date/Time";
    var subPakNm ="Children (Ages 3-12)";
    var qtyT = 2;
    var dateD = CommonCalender.getTomorrowsDate();
    nextD = aqDateTime.AddDays(dateD, 1);
    var newDate = aqConvert.DateTimeToStr(nextD);
  
    WrapperFunction.selectKeywordName(keyWordNm);  
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000);
   
     
    if(datetimeformSubWindow.Exists && datetimeformSubWindow.VisibleOnScreen){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy          
        aqUtils.Delay(2000);     
        var availableCap = availableTimedatagroup.Child(0).HGroup(0).HGroup("capacityGroup").VGroup(0).Label("availableLabel").Caption;
        var totalCap =availableTimedatagroup.Child(0).HGroup(0).HGroup("capacityGroup").VGroup(0).Label("capacityLabel").Caption;
        availableTimedatagroup.Child(0).Click();
        var selectedTime = availableTimedatagroup.Child(0).HGroup(0).Label("timeLabel").Caption;
        aqUtils.Delay(1000);
        selectNextButtonFromSubWindow();
        aqUtils.Delay(1000);
        if(selectablebuttonClosebutton.Exists && selectablebuttonClosebutton.VisibleOnScreen){   
          Button.clickOnButton(selectablebuttonClosebutton);
        }
    }
    aqUtils.Delay(3000);  
    //  var firstPackageText = cartaddedItemList.Child(0).VGroup("cartVGroup").List("ratesList").ListItem("[object CartItemRateRendererData]").HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("rateNameLabel").Caption;
    cartaddedItemList.Child(0).Click(); 
     aqUtils.Delay(3000);
     if(errorWindow.Exists){      
        Log.Message(" Error message is displayed for 0 Payment.")
        buttonOkOnError.Click();
      }
      else{
         merlinLogError(" Error message is not displayed for 0 Payment.")
      } 
    selectDateFromSubWindow(dateD);
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
      
      selectDateFromSubWindow(newDate);
         availableCap = availableTimedatagroup.Child(0).HGroup(0).HGroup("capacityGroup").VGroup(0).Label("availableLabel").Caption;
         totalCap =availableTimedatagroup.Child(0).HGroup(0).HGroup("capacityGroup").VGroup(0).Label("capacityLabel").Caption;
        availableTimedatagroup.Child(0).Click();
         selectedTime = availableTimedatagroup.Child(0).HGroup(0).Label("timeLabel").Caption;
        aqUtils.Delay(1000);
        selectNextButtonFromSubWindow();
        aqUtils.Delay(1000);
        if(selectablebuttonClosebutton.Exists && selectablebuttonClosebutton.VisibleOnScreen){   
          Button.clickOnButton(selectablebuttonClosebutton);
        }
       aqUtils.Delay(3000);  
    //  var firstPackageText = cartaddedItemList.Child(0).VGroup("cartVGroup").List("ratesList").ListItem("[object CartItemRateRendererData]").HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("rateNameLabel").Caption;
      cartaddedItemList.Child(0).Click(); 
       aqUtils.Delay(3000);
       if(errorWindow.Exists){      
          Log.Message(" Error message is displayed for 0 Payment.")
          buttonOkOnError.Click();
        }
        else{
           merlinLogError(" Error message is not displayed for 0 Payment.")
        } 
      selectDateFromSubWindow(newDate);
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