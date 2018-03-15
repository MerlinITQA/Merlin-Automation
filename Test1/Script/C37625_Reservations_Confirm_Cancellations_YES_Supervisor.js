//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function C37625_Reservations_Confirm_Cancellations_YES_Supervisor()
{
 try {
    Log.AppendFolder("C37625_Reservations_Confirm_Cancellations_YES_Supervisor");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    placeROrderForPaymentType(groupNm,paymentTypeForReservation);
    selectReservationRecordToCancelReservation(groupNm);
   
    if(alertCancelReservation.Exists){
      Button.clickOnButton(alertCancelReservationYes);       
      Button.clickOnButton(refundReservationConfOK);
      aqUtils.Delay(500);
      if(!errorindicatorCancelTicket.Exists && !errorindicatorCancelTicket.VisibleOnScreen){      
        merlinLogError("Error Indicator is not displayed.");
        return;
      }
      WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");
      Button.clickOnButton(refundReservationConfOK);          
      aqUtils.Delay(3000);  
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