//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function C43130_Capacity_is_added_for_Date_Packages()
{
 try {
      Log.AppendFolder("C43130_Capacity_is_added_for_Date_Packages");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      WrapperFunction.selectKeywordName("Daily Admission");
      selectPackage("Dated","Adult");
      aqUtils.Delay(3000);     
      var totalCap = groupDateonlycapacitygroup.HGroup(0).Label("capacityLabel").Caption;
      var availableCap = groupDateonlycapacitygroup.HGroup(0).Label("availableLabel").Caption;
      availableCap = (availableCap.split('/')[0]).trim();
       if(datetimeformSubWindow.Exists && datetimeformSubWindow.VisibleOnScreen){
      selectDateFromSubWindow(dateD); //mm-dd-yyyy         
      selectNextButtonFromSubWindow();
      aqUtils.Delay(2000);     
        if(selectablebuttonClosebutton.Exists && selectablebuttonClosebutton.VisibleOnScreen){   
        Button.clickOnButton(selectablebuttonClosebutton);
       }
      } 
       var sSubTotal = subTotalOnOrderScreen.Caption;
       var sCartAdjustments =cartadjustmentsOnOrderScreen.Caption;
       var sTax =taxOnOrderScreen.Caption;
       var sFees =feesOnOrderScreen.Caption;
       var sTotal =(totalOnOrderScreen.Caption.split(':')[1]).trim();
       finilizeOrder();
       aqUtils.Delay(2000);    
       var settlementSubTotal = orderDetailsSubTotal.Caption;
       var settlementTotal =orderDetailsTotal.Caption; 
       var settlementCartAdjustments =orderDetailsCartAdjustment.Caption;
       var settlementTax =orderDetailsTax.Caption;
       var settlementFees =orderDetailsFees.Caption;  
       if(compareStringObj(settlementSubTotal,sSubTotal)
         && compareStringObj(settlementCartAdjustments,sCartAdjustments)
         && compareStringObj(settlementTax,sTax)
         && compareStringObj(settlementFees,sFees)
         && compareStringObj(settlementTotal,sTotal)
       ){
          Log.Message("Order details are matching on settlement page.");     
       }else{
          merlinLogError("Order details are not matching on settlement page.");
        }  
      Button.clickOnButton(applyBalance);
       aqUtils.Delay(2000);
      var applyedAmt = paymentListFirstItem.PaymentListItem("payItem").HGroup(0).Label("amtLabel").Caption;
      if(compareStringObj(applyedAmt,sTotal)){
        Log.Message("Correct amount is applyed.");
      }else{
        merlinLogError("Wrong amount is is applyed.");
      }  
      WrapperFunction.settlementCompleteOrder();
      Log.Message("Don't Validate the order");
      aqUtils.Delay(2000);
      validateTicket("Don't Validate");      
      aqUtils.Delay(3000);        
      verifyTotalOnConfirmationPage(applyedAmt); 
      
      WrapperFunction.selectMainMenu(PointOfSale_MainMenu);
      WrapperFunction.selectKeywordName("Daily Admission");
      selectPackage("Dated","Adult");   
       aqUtils.Delay(3000);       
      currentAvailableCap = groupDateonlycapacitygroup.HGroup(0).Label("availableLabel").Caption;
      currentAvailableCap = (currentAvailableCap.split('/')[0]).trim();
      if( currentAvailableCap == (availableCap-1)){
         Log.Message("Total capacity and remaining capacity is displayed.");
      }else{
         merlinLogError("Total capacity and remaining capacity is not displayed.");
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