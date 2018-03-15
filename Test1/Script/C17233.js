//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase
//USEUNIT VerifyCheckProperty

function C17233()
{
 // InitializationEnviornment.initiliaze();
  //AppLoginLogout.login();
  try {
    Log.AppendFolder("C17233");
    var keyWordNm ="Daily Tickets";
    var packageNm = "Package with dual tax";
    var subPakNm="Adult";
    var dateD = CommonCalender.getTodaysDate();
    OrderInfo.prototype.OrderID = 0;
//    WrapperFunction.selectKeywordName(keyWordNm);
//    allPackages.MouseWheel(-1);
//    allPackages.MouseWheel(-1); 
//    
//    selectPackage(packageNm,subPakNm);
//    aqUtils.Delay(2000);     
//    if(datetimeformSubWindow.Exists){
//     selectDateFromSubWindow(dateD);    
//      selectNextButtonFromSubWindow();   
//    }   
//     var fFees =orderDetailsFees.Caption;    
//     var aFees= (fFees.split('$')[1]).trim();       
//     if( aFees != 0){
//        Log.Message("The processing fee has been added to the correct packages.")
//     }
//     else{
//        merlinLogError("The processing fee has NOY been added to the correct packages.")
//     } 
//     var sSubTotal = orderDetailsSubTotal.Caption;
//     var sCartAdjustments =orderDetailsCartAdjustment.Caption;
//     var sTax =orderDetailsTax.Caption;
//     var sFees =orderDetailsFees.Caption;
//     var sTotal = orderDetailsTotal.Caption;
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
     var horizontalM = 50;
     var verticalM = 50;  
     for(let i =0 ;i < 5 ;i++){
          horizontalM = horizontalM + (i*5);
          verticalM =verticalM +(i*5);          
         var yCo = cartdetailspopupCartDetails.Top;     
         var xCo = cartdetailspopupCartDetails.Left;     
         cartdetailspopupCartDetails.labelTitledisplay.Drag(1,1,horizontalM,verticalM,1);
         aqUtils.Delay(500);
         yCoNew = cartdetailspopupCartDetails.Top;     
         xCoNew = cartdetailspopupCartDetails.Left;     
         if((yCoNew == (yCo+verticalM)  ) && (xCoNew = (xCo + horizontalM))){
          Log.Message("Correct position")
      
         }else{
          merlinLogError("Wrong position")
         }
     }
      horizontalM = 200;
      verticalM = 50;  
     for(let i =0 ;i < 5 ;i++){
          horizontalM = horizontalM - (i*5) ;
          verticalM =verticalM -(i*3)  ;          
         var yCo = cartdetailspopupCartDetails.Top;     
         var xCo = cartdetailspopupCartDetails.Left;     
         cartdetailspopupCartDetails.labelTitledisplay.Drag(1,1,-horizontalM,-verticalM,1);
         aqUtils.Delay(500);
         yCoNew = cartdetailspopupCartDetails.Top;     
         xCoNew = cartdetailspopupCartDetails.Left;     
         if((yCoNew == (yCo-verticalM)  ) && (xCoNew = (xCo - horizontalM))){
          Log.Message("Correct position")
      
         }else{
          merlinLogError("Wrong position")
         }
     }
    
     
   //  cartdetailspopupCartDetails.labelTitledisplay.Drag(1,1,-300,-20,1);
     
     
     
//     aqUtils.Delay(1000);
//     cartdetailsClosebutton.Click();
//     finilizeOrder();
//     aqUtils.Delay(2000);    
//     var settlementSubTotal = orderDetailsSubTotal.Caption;
//     var settlementTotal =orderDetailsTotal.Caption; 
//     var settlementCartAdjustments =orderDetailsCartAdjustment.Caption;
//     var settlementTax =orderDetailsTax.Caption;
//     var settlementFees =orderDetailsFees.Caption;     
//     if(compareStringObj(settlementSubTotal,sSubTotal)
//       && compareStringObj(settlementCartAdjustments,sCartAdjustments)
//       && compareStringObj(settlementTax,sTax)
//       && compareStringObj(settlementFees,sFees)
//       && compareStringObj(settlementTotal,sTotal)
//     ){
//       Log.Message("Order details are matching on settlement page.");     
//     }else{
//      merlinLogError("Order details are not matching on settlement page.");
//      }
  
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
//   AppLoginLogout.logout(); 
}
 
 