//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase
//USEUNIT VerifyCheckProperty

function C15954_Tax_and_Fee_display()
{
  
  try {
    Log.AppendFolder("C15954_Tax_and_Fee_display");
    InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
    var keyWordNm ="Daily Tickets";
    var packageNm = "Package with fees and tax";
    var subPakNm="Adult";
    var dateD = CommonCalender.getTodaysDate();     
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);  
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000);     
    if(datetimeformSubWindow.Exists){
     selectDateFromSubWindow(dateD);    
      selectNextButtonFromSubWindow();    
       aqUtils.Delay(2000);        
       Button.clickOnButton(selectablebuttonClosebutton);
      }
     var fFees =feesOnOrderScreen.Caption;    
     var aFees= (fFees.split('$')[1]).trim();       
     if( aFees != 0){
        Log.Message("The processing fee has been added to the correct packages.")
     }
     else{
        merlinLogError("The processing fee has NOT been added to the correct packages.")
     } 
     WrapperFunction.selectKeywordName("Daily Admission");
     selectPackage("Dated","Adult");  
     aqUtils.Delay(2000);     
     if(datetimeformSubWindow.Exists){
      selectDateFromSubWindow(dateD);    
      selectNextButtonFromSubWindow();  
       aqUtils.Delay(2000);        
       Button.clickOnButton(selectablebuttonClosebutton); 
     }
     
     var sSubTotal = subTotalOnOrderScreen.Caption;
     var sCartAdjustments =cartadjustmentsOnOrderScreen.Caption;
     var sTax =taxOnOrderScreen.Caption;
     var sFees =feesOnOrderScreen.Caption;
     var sTotal =(totalOnOrderScreen.Caption.split(':')[1]).trim();
    
//     cartdetailsCartfeedetails.Click(1,1,0);
//     cartAdjustment = cartdetailsdatagroupAdjlist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
//     cartTax = cartdetailsdatagroupTaxlist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
//     cartTotalTax = cartdetailsdatagroupTaxlist.ListItem("[object Object]", 1).HGroup(0).Label("amountLabel").Caption;
//     cartProcessingFee = cartdetailsdatagroupFeelist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
//     cartFeeTotal = cartdetailsdatagroupFeelist.ListItem("[object Object]", 1).HGroup(0).Label("amountLabel").Caption;
//     VerifyCheckProperty.compareStringObj(sCartAdjustments,cartAdjustment);
//     VerifyCheckProperty.compareStringObj(sTax,cartTax);
//     VerifyCheckProperty.compareStringObj(sFees,cartFeeTotal);
  
//     aqUtils.Delay(1000);
//     cartdetailsClosebutton.Click();
 
     
      sTax= (sTax.split('$')[1]).trim();       
     if( sTax != 0){
        Log.Message("The processing tax has been added.")
     }
     else{
        merlinLogError("The processing tax has NOT been added.")
     }  
      
//      
//     cartdetailsCartfeedetails.Click(1,1,0);
//     cartAdjustment = cartdetailsdatagroupAdjlist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
//     cartTax = cartdetailsdatagroupTaxlist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
//     cartTotalTax = cartdetailsdatagroupTaxlist.ListItem("[object Object]", 1).HGroup(0).Label("amountLabel").Caption;
//     cartProcessingFee = cartdetailsdatagroupFeelist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
//     cartFeeTotal = cartdetailsdatagroupFeelist.ListItem("[object Object]", 1).HGroup(0).Label("amountLabel").Caption;
//     for(let i =0 ; i< cartdetailsdatagroupFeelist.ChildCount ; i++){
//       feeTotalCap = cartdetailsdatagroupFeelist.Child(i).HGroup(0).Label("nameLabel").Caption;
//       if(feeTotalCap == "Fee Total"){
//        cartFeeTotal = cartdetailsdatagroupFeelist.Child(i).HGroup(0).Label("amountLabel").Caption;
//        break;       
//       }        
//     }  
//     flagPercent = false;
//      for(let i =0 ; i< cartdetailsdatagroupFeelist.ChildCount ; i++){
//       temp = cartdetailsdatagroupFeelist.Child(i).HGroup(0).Label("nameLabel").Caption;
//        if(temp == "5% Tax"){
//          flagPercent = true;
//          break;        
//        }
//     }       
//     if(!flagPercent){
//        merlinLogError("Tax percentage is not displayed.")
//     }
//     VerifyCheckProperty.compareStringObj(sCartAdjustments,cartAdjustment);
//     VerifyCheckProperty.compareStringObj(sTax,cartTax);
//     VerifyCheckProperty.compareStringObj(sFees,cartFeeTotal);  
//     aqUtils.Delay(1000);
//     cartdetailsClosebutton.Click();
     finilizeOrder();
     aqUtils.Delay(2000);    
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
    CashButton.Click();       
     if(applyAmount != 0){
      Log.Message("Apply amount");
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton); 
      }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
     
    verifyTotalOnConfirmationPage(expectedSettlemtnttotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
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
