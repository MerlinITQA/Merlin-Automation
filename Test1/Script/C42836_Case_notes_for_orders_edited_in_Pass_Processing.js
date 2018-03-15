//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT ConvertReservationsToPurchase
//USEUNIT SupportManagerFunctions

function C42836_Case_notes_for_orders_edited_in_Pass_Processing()
{
try {
    Log.AppendFolder("C42836_Case_notes_for_orders_edited_in_Pass_Processing");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var keyWordNm ="Annual Pass";
    var packageNm = "Annual Pass - reserve";
    var subPakNm="Individual";    
    WrapperFunction.selectKeywordName(keyWordNm);
    selectPackage(packageNm,subPakNm);
    finilizeOrder();
    aqUtils.Delay(2000);
    if(PassholderWindow.Exists && PassholderWindow.VisibleOnScreen){
      PassholderDetails.enterAllPassHolderDetails();      
      Button.clickOnButton(Passholder_NextButton);     
      if(!PassholderCameraLogo.Exists)
      {
        merlinLogError("PassholderCameraLogo is not displayed.");
        return;
      }
      Button.clickOnButton(PassholderCameraLogo);
      Button.clickOnButton(Passholder_NextButton);      
      aqUtils.Delay(4000);
        Log.Message("Settlement screen displays showing correct details");
         var settlementTotal =orderDetailsTotal.Caption;
         applyAmount= aqString.Replace(settlementTotal,"$",""); 
         OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();         
         Button.clickOnButton(applyBalance);
         Log.Message("Complete the order");
         WrapperFunction.settlementCompleteOrder();
         aqUtils.Delay(3000);
         validateTicket("Don't Validate");
         Log.Message("Don't Validate the order"); 
         verifyTotalOnConfirmationPage(settlementTotal);
         var orderId = cnf_orderID1.Caption;
         var orderId= (orderId.split('#')[1]).trim(); 
         if (orderId == null){
            merlinLogError("Order id is not present");
            return;
          } 
          if(cnfPrintSeasonPassButton.Exists && cnfPrintSeasonPassButton.VisibleOnScreen){
            Log.Message("Print Season Pass Button is displayed.")
          }
          else{
            merlinLogError("Print Season Pass Button is not displayed.")
            return;
          }     
     }else{
      merlinLogError("PassholderWindow is not displayed.");
      return;
     }
     
     Button.clickOnButton(PassProcessing_Button);
     aqUtils.Delay(5000);     
     Button.clickOnButton(AssignNewBarCode_Button);
     aqUtils.Delay(3000);
     
     WrapperFunction.setTextValue(FirstnameField,"abc");
     WrapperFunction.setTextValue(LastnameField,"xyz");
     Button.clickOnButton(sessionPassSavebtn);        
     aqUtils.Delay(2000); 
     if(compareStringObj(FirstnameField.Caption,"abc") && 
        compareStringObj(LastnameField.Caption,"xyz")){
        Log.Message("Fields are modified.");
     }else{
        merlinLogError("Unable to edit Fields.");
     }
     
     if(orderId != null){
           selectSupportManagerFromMainMenu(); 
            aqUtils.Delay(10000);          
            searchSpecificOrderInSM(orderId);     
             selectsubTabSM(tabCaseNotes); 
             var ele  = smCaseNotesdatagridCallhistory.Scroller("scroller").FindAllChildren("ObjectLabel","note_txt",1, true);
            var flag = false;
            if (ele.length > 0)
            {
              for (let i = 0; i < ele.length; i++){
                  var text = ele[i].Caption;
                  if(text.includes("Barcode changed") || 
                     text.includes("Changed Ticket ID")){
                     flag = true;
                    break;
                  }
                  else{
                  flag = false;
                  }
              }          
            }
            if(flag){
              Log.Message("Order is displayed with package id and customer type id");
            }
          else{
              merlinLogError("Orderd package is not displayed in Case Notes");
          }           
          if(!smConfirmationOrderNumber.Caption == orderId){
            merlinLogError("Order Id is not correct.");
          }
      }else{
           merlinLogError("Unable to get order number.");
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
 
    