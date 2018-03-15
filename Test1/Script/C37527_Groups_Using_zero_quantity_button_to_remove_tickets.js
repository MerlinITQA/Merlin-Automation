//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT SelectGroupFromMainMenu

function C37527_Groups_Using_zero_quantity_button_to_remove_tickets()
{
try{
    Log.AppendFolder("C37527_Groups_Using_zero_quantity_button_to_remove_tickets");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;  
    var keyWordNm ="Reservations";
    var packageNm ="Minimum Payment Required Reservation 2";
    var subPakNm ="Individual";
    var qtyT = 2;
    var dateD =CommonCalender.getTodaysDate();
    var keyWordNm1 = "Reservations"
    var packageNM1 = "Minimum Payment Required Reservation 3"
    var subPakNm1 ="Individual";

    selectGroupFromMainMenu(groupNm);
    clickBuyTicketsButton();
    aqUtils.Delay(3000);
    var headerName = CustomerHeaderLabel.Caption;
     var expectedResult = groupNm +" - LDC Boston";
     if(compareStringObj(expectedResult,headerName)){
        Log.Message("Group name and organisation name displays in header to the right of home menu button");    
      }else{
      merlinLogError("Group name and organisation name is not displayed.");
      return;
    }
    WrapperFunction.selectKeywordName(keyWordNm);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(1000);
    selectQuantityFromSubWindow(qtyT); 
    //selectSubPackageFromSubWindow(subPakNm);    
    aqUtils.Delay(1000);  
    selectDateFromSubWindow(dateD); //mm-dd-yyyy    
    selectNextButtonFromSubWindow();
    aqUtils.Delay(2000);  
    Button.clickOnButton(selectablebuttonClosebutton);
    aqUtils.Delay(2000);       
    addNewTicket(keyWordNm1,packageNM1,subPakNm1,qtyT,dateD);
    if(cartaddedItemList.ChildCount == 2){
      var firstPackageText = cartaddedItemList.Child(0).VGroup("cartVGroup").Group(0).Label("packageLabel").Caption;
      var secondPackageText = cartaddedItemList.Child(1).VGroup("cartVGroup").Group(0).Label("packageLabel").Caption;  
      VerifyCheckProperty.compareStringObj(secondPackageText,packageNm);
      VerifyCheckProperty.compareStringObj(firstPackageText,packageNM1);
    }else{
      merlinLogError("All packages are not selected.")
    }
      Button.clickOnButton(qty_0);   
      selectPackage(packageNm,subPakNm);
      aqUtils.Delay(1000);
      cartaddedItemList.Refresh();
      aqUtils.Delay(1000);      
      if(cartaddedItemList.ChildCount == 1){
        var secondPackageText = cartaddedItemList.Child(0).Label("pkgLabel").Caption;   
        VerifyCheckProperty.compareStringObj(secondPackageText,packageNM1);
       }else{
        merlinLogError("Expected package is not removed from cart.")
      }
      aqUtils.Delay(1000);
      if(zeroQtyButtonNotHighlighted.Exists && zeroQtyButtonNotHighlighted.VisibleOnScreen){
          Log.Message("Zero button is not Highlighted.");
      }else{
          merlinLogError("Zero button is Highlighted on screen.");
          return;
      }
      finilizeOrder();
      aqUtils.Delay(3000);
      clickConvertToReservation();
      aqUtils.Delay(4000);  
   
      var expectedSettlemtnttotal = orderDetailsTotal.Caption;
      var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
      paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton);    
      if(applycashrespopupCashPaymentOKButton.Exists){
        Button.clickOnButton(applycashrespopupCashPaymentOKButton);
      } 
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      aqUtils.Delay(3000);
      validateTicket("Don't Validate"); 
      var expectedT= (expectedSettlemtnttotal.split('$')[1]).trim();
      var temp = orderDetailsTotal.Caption ;
      var ord_details = (temp.split('$')[1]).trim();
      var total = parseFloat(ord_details);        
        if( total == expectedT){
            Log.Message("Total is matching");
        }
        else{
           merlinLogError("Total is not matching");
           Log.Message("Actual Total",total);
           Log.Message("Expected Total",expectedSettlemtnttotal);  
        }    
    
     AppLoginLogout.logout(); 
      } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }  
      finally { 
	    Log.PopLogFolder();
    }   
}