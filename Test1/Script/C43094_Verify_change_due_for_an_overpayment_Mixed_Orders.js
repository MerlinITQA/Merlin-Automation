//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function C43094_Verify_change_due_for_an_overpayment_Mixed_Orders()
{
try{
      Log.AppendFolder("C43094_Verify_change_due_for_an_overpayment_Mixed_Orders");
     InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      var groupNm=defaultGroupName;  
      var keyWordNm ="Reservations";
      var packageNm ="Minimum Payment Required Reservation 2";
      var subPakNm ="Individual";
      var qtyT = 1;
      var dateD =CommonCalender.getTodaysDate();
      var keyWordNm1 = "Daily Admission"
      var packageNM1 = "3 site Combi"
      var subPakNm1 ="Children (Ages 3-12)";

      selectGroupForReservation(groupNm,keyWordNm1,packageNM1,subPakNm1,qtyT,dateD);
      addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
  
      finilizeOrder();
      aqUtils.Delay(3000);
      clickConvertToReservation();
      aqUtils.Delay(4000);  
  
      verifyPrefixColorNonReservation(packageNM1);
      verifyPrefixGreenColorReservation(packageNm);   
   
      var expectedSettlemtnttotal = orderDetailsTotal.Caption;
      var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
          paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
          paymentTypeBal = parseInt(paymentTypeBal) + 1;
          WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
          Button.clickOnButton(applyButton);
          // aqUtils.Delay(2000);
          Button.clickOnButton(applycashrespopupCashPaymentOKButton);
      var totalAmt=(expectedSettlemtnttotal.split('$')[1]).trim()
   
      var balance = parseFloat(totalAmt) - parseFloat(paymentTypeBal);
       var remBalance= PaymentType_BalanceLabel.Caption;
           remBalance=(remBalance.split('$')[1]).trim();  
      if(balance == remBalance ){
          Log.Message("The Balance Due amount is calculated incorrectly.");
      }
      else{
          merlinLogError("The Balance Due amount is calculated incorrectly.");
      }
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      aqUtils.Delay(3000);
      validateTicket("Don't Validate"); 
      var expectedT= (expectedSettlemtnttotal.split('$')[1]).trim();
      var temp = cnf_orderDetailsTotal.Caption;
      var cnf_Ord = (temp.split('$')[1]).trim();
       temp = orderDetailsTotal.Caption ;
      var ord_details = (temp.split('$')[1]).trim();
      var total = parseFloat(cnf_Ord) + parseFloat(ord_details);
        //verifyOrderDetailsStoreOrderId(expectedSettlemtnttotal);
        if( total == expectedT){
            Log.Message("Total is matching");
        }
        else{
           merlinLogError("Total is not matching");
           Log.Message("Actual Total",total);
           Log.Message("Expected Total",expectedSettlemtnttotal);  
        }
   
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally {  
      AppLoginLogout.logout();  
	    Log.PopLogFolder();
    }     
}