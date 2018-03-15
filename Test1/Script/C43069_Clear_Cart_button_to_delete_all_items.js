//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder

function C43069_Clear_Cart_button_to_delete_all_items()
{ 
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login();
  var keyWordNm ="Daily Tickets";
  var packageNm = "Taxes and Fees Test Product";
  var subPakNm ="Individual";
  var keyWordNm1 = "Daily Admission";
  var packageNm1 = "Date/Time";
  var subPakNm1 ="Adult";          
  var subPakNm2 ="Children (Ages 3-12)"; 
  var dateD = CommonCalender.getTodaysDate();
  var dtFmt = aqConvert.DateTimeToFormatStr(dateD, "%#m/%#d/%Y");
  var givenPaymentType ="Cash";
   try {
    Log.AppendFolder("C43069_Clear_Cart_button_to_delete_all_items");
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
    selectPackage(packageNm,subPakNm);
    var firstTime;
    var secondTime; 
    if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy      
      selectNextButtonFromSubWindow();
      Button.clickOnButton(selectablebuttonClosebutton);
    } 
     aqUtils.Delay(2000);
    var firstPackageText = cartaddedItemList.Child(0).VGroup("cartVGroup").Group(0).Label("packageLabel").Caption;
    VerifyCheckProperty.compareStringObj(firstPackageText,packageNm);
    aqUtils.Delay(1000);
	WrapperFunction.selectKeywordName(keyWordNm1);
	SelectQuantityFromHeader.selectQuantity(2);
    selectPackage(packageNm1,subPakNm1);
      if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy       
      selectNextButtonFromSubWindow();
      Button.clickOnButton(selectablebuttonClosebutton);
    } 
	SelectQuantityFromHeader.selectQuantity(2);
    selectPackage(packageNm1,subPakNm2);
      if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy       
      selectNextButtonFromSubWindow();
      Button.clickOnButton(selectablebuttonClosebutton);
    } 
    aqUtils.Delay(1000);
    cartaddedItemList.Refresh();
    var deleteImageGroup1 = cartaddedItemList.Child(0).VGroup("cartVGroup").Group(0).Group("deleteCartGrp").Image(0);
    var deleteImageGroup2 = cartaddedItemList.Child(1).VGroup("cartVGroup").Group(0).Group("deleteCartGrp").Image(0)
      checkControlExistence(deleteImageGroup1);
      checkControlExistence(deleteImageGroup2);
    
    var childCount =cartaddedItemList.Child(1).VGroup("cartVGroup").List("ratesList").ChildCount;
    if(childCount == 2){
        var deleteImageRate1 = cartaddedItemList.Child(1).VGroup("cartVGroup").List("ratesList").Child(0).HGroup(0).Image("deleteImage");        
        var deleteImageRate2 = cartaddedItemList.Child(1).VGroup("cartVGroup").List("ratesList").Child(1).HGroup(0).Image("deleteImage");
        checkControlExistence(deleteImageRate1);
        checkControlExistence(deleteImageRate2);        
        Button.clickOnButton(deleteImageRate1); 
        if(alertCancelReservation.Exist && alertCancelReservation.VisibleOnScreen){
            Button.clickOnButton(alertCancelReservationYes);            
        }else{
          merlinLogError("Alert is not displayed.")
        }
        cartaddedItemList.Refresh();
        cartaddedItemList.Child(1).VGroup("cartVGroup").List("ratesList").Refresh();
        aqUtils.Delay(5000);
        childCount =cartaddedItemList.Child(1).VGroup("cartVGroup").List("ratesList").ChildCount;
        if(!(cartaddedItemList.Child(1).VGroup("cartVGroup").List("ratesList").Child(0).Visible)
         || !(cartaddedItemList.Child(1).VGroup("cartVGroup").List("ratesList").Child(1).Visible)){
            Log.Message("Rate is removed from cart.");
        }else{
            merlinLogError("Rate is not removed from cart.")
        }
                
    }else{
      merlinLogError("Separate rows below the Header in the Cart is not Added.")
    }
        Button.clickOnButton(confirmationbuttonClearbtn);
                
        aqUtils.Delay(1000);
        cartaddedItemList.Refresh();
        aqUtils.Delay(1000);                  
       if(!(cartaddedItemList.Child(0).Visible)
         && !(cartaddedItemList.Child(1).Visible)){
            Log.Message("Package is removed from cart.");
        }else{
            merlinLogError("Package is not removed from cart.")
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
 