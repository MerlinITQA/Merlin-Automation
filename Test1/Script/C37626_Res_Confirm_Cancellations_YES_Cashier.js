//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function C37626_Res_Confirm_Cancellations_YES_Cashier()
{
 try {
    Log.AppendFolder("C37626_Res_Confirm_Cancellations_YES_Cashier");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.loginCashier();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    placeROrderForPaymentType(groupNm,paymentTypeForReservation);
    selectReservationRecordToCancelReservation(groupNm);
    aqUtils.Delay(1000);
    if(alertCancelReservation.Exists){
      Button.clickOnButton(alertCancelReservationYes);       
      Button.clickOnButton(refundReservationConfOK);
      aqUtils.Delay(500);
      if(!errorindicatorCancelTicket.Exists && !errorindicatorCancelTicket.VisibleOnScreen){      
        merlinLogError("Error Indicator is not displayed.");
        return;
      }
      enterResonaOnConfirmationCancelARefundwnd();         
      aqUtils.Delay(5000);  
      var cancelStatus = false;
      var cC = orderinfoResDataGrid.wColumnCount;
      var rC = 0;
      rC = orderinfoResDataGrid.wRowCount;
      for ( rowC = 0 ; rowC <  rC ; rowC++){
          var displayDt = orderinfoResDataGrid.wValue(rowC ,6);
          if (displayDt == "Cancelled"){                
              cancelStatus = true;
              break; 
          }else{
            cancelStatus = false;
          }
      } 
      if(cancelStatus){
         Log.Message("The Reservation details are correctly reflected to the cancellation status");
      }else{
         merlinLogError("The Reservation details are not correctly reflected to the cancellation status");
      }
      resOrderInfoClosebutton.Click();   
      }
    else{
        merlinLogError("Pop-up is not displayed asking user to confirm about cancel the order");
        return;
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