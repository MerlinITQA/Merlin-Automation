//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase
//USEUNIT VerifyCheckProperty

function _0001485874493872_Cart_Adjustment_Processing_Fee_to_POS_Orders()
{
   InitializationEnviornment.initiliaze();
   AppLoginLogout.login();
  try {
    var keyWordNm ="Daily Tickets";
    var packageNm = "Package with fees and tax";
    var subPakNm="Adult";
    var qty = 2;
    Log.AppendFolder("_0001485874493872_Cart_Adjustment_Processing_Fee_to_POS_Orders");
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
    allPackages.MouseWheel(-1);
    allPackages.MouseWheel(-1);   
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000);     
     if(datetimeformSubWindow.Exists){
      selectQuantityFromSubWindow(qty);
      selectSubPackageFromSubWindow(subPakNm); 
      aqUtils.Delay(3000);      
      selectNextButtonFromSubWindow();   
    }   
     var fFees =orderDetailsFees.Caption;    
     var aFees= (fFees.split('$')[1]).trim();       
     if( aFees != 0){
        Log.Message("The processing fee has been added to the correct packages.")
     }
     else{
        merlinLogError("The processing fee has NOY been added to the correct packages.")
     }     
     selectPackage("Flexi Admission","Adult");  
     aqUtils.Delay(1000);
     var sSubTotal = orderDetailsSubTotal.Caption;
     var sCartAdjustments =orderDetailsCartAdjustment.Caption;
     var sTax =orderDetailsTax.Caption;
     var sFees =orderDetailsFees.Caption;
     var sTotal = orderDetailsTotal.Caption;
     if(!compareStringObj(fFees,sFees)){
      merlinLogError("The processing fee is added to the 'exempt package'.")
     }else  {
       let stotal = parseFloat( (sSubTotal.split('$')[1]).trim());
       let cartAdjustments = parseFloat( (sCartAdjustments.split('$')[1]).trim());
       let tax =parseFloat( (sTax.split('$')[1]).trim());
       let fees =parseFloat( (sFees.split('$')[1]).trim());
       let total = parseFloat( (sTotal.split('$')[1]).trim());
        if(total == (stotal+cartAdjustments+tax+fees)){
          Log.Message("Order Total is matching");
        }
        else{
          merlinLogError("Order Total is not matching");
        } 
     } 
    finilizeOrder();
    aqUtils.Delay(2000);    
     let settlementSubTotal = orderDetailsSubTotal.Caption;
     let settlementTotal =orderDetailsTotal.Caption; 
     let settlementCartAdjustments =orderDetailsCartAdjustment.Caption;
     let settlementTax =orderDetailsTax.Caption;
     let settlementFees =orderDetailsFees.Caption;     
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
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   //AppLoginLogout.logout(); 
}
