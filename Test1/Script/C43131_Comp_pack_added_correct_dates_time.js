//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function C43131_Comp_pack_added_correct_dates_time()
{
try {
    Log.AppendFolder("C43131_Comp_pack_added_correct_dates_time");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();    
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Daily Admission";
    var packageNm ="Non Merlin Combo"; 
    var subPakNm ="Individual";    
    var dateD =CommonCalender.getTodaysDate();
    var dtFmt = aqConvert.DateTimeToFormatStr(dateD, "%#m/%#d/%Y");
    
    WrapperFunction.selectKeywordName(keyWordNm);  
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000);
    if(datetimeformSubWindow.Exists && datetimeformSubWindow.VisibleOnScreen){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy  
        selectNextButtonFromSubWindow();
        aqUtils.Delay(2000);     
        if(selectablebuttonClosebutton.Exists && selectablebuttonClosebutton.VisibleOnScreen){   
          Button.clickOnButton(selectablebuttonClosebutton);
        }
    }
    aqUtils.Delay(1000);
    cartaddedItemList.Refresh();
    aqUtils.Delay(3000);
    var firstPackageText = cartaddedItemList.Child(1).VGroup("cartVGroup").List("ratesList").Child(0).HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("rateNameLabel").Caption;
    var f1 = subPakNm+" "+dtFmt;  
    
    VerifyCheckProperty.compareStringObj(firstPackageText,f1);
    
    
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
        
        flag = false;
        var cCount =settlementOrderDataGridOrderdgRender.ChildCount;
        for (i = 0 ; i< cCount; i++)
        { 
         if(settlementOrderDataGridOrderdgRender.Child(i).Visible){   
          var pknm = settlementOrderDataGridOrderdgRender.Child(i).Caption;
            if(pknm.includes(dtFmt)&& (pknm.startsWith(dtFmt))){
                flag = true
                break;        
              }  
            } 
        }
        if(!flag){        
          merlinLogError("Date is not matching on settlement screen.");
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
        var dateCnfPage = dateOnConfirmationPage.Caption;
        var expectedDateCnfPage = "Date: "+dtFmt;
        if( !(dateCnfPage.includes(expectedDateCnfPage))&& !((dateCnfPage.startsWith(expectedDateCnfPage)))){
           merlinLogError("Date is not matching on Confirmation screen.")  
                
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