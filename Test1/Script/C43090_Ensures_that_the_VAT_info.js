//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectDirectory
function C43090_Ensures_that_the_VAT_info()
{
try{
      Log.AppendFolder("C43090_Ensures_that_the_VAT_info");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      var groupNm=defaultGroupName;  
      var keyWordNm ="Daily Tickets";
      var packageNm ="Taxes and Fees Test Product";
      var subPakNm ="Individual";
      var qtyT = 1;
      var dateD =CommonCalender.getTodaysDate();
        
      addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
      aqUtils.Delay(2000);
      SelectDirectory.selectDirectory(Directory_GoOffline);
      
      
      aqUtils.Delay(3000);
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
      
      SelectDirectory.selectDirectory(Directory_GoOffline);
      
      WrapperFunction.selectMainMenu(PointOfSale_MainMenu);
      aqUtils.Delay(2000);
      addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
      aqUtils.Delay(2000);
      SelectDirectory.selectDirectory(Directory_GoOffline);
      
      finilizeOrder();
      aqUtils.Delay(3000);
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
      
      AppLoginLogout.logout();  
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally {  
     
	    Log.PopLogFolder();
    }     
}