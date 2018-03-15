//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT SelectQuantityFromHeader
//USEUNIT PlaceReservationOrder

function C43072_Adding_tickets_to_Cart_clears_Quantity()
{ 
  Log.AppendFolder("C43072_Adding_tickets_to_Cart_clears_Quantity");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login(); 
  try{  
    var groupNm=defaultGroupName;    
    var keyWordNm ="Daily Admission";
    var packageNm ="Open Dated";
    var subPakNm ="Children (Ages 3-12)";
    aqUtils.Delay(2000);
    selectQuantity(10);
    WrapperFunction.selectKeywordName(keyWordNm);  
    selectPackage(packageNm,subPakNm); 
    aqUtils.Delay(3000);
    var appliedQty = labelQuantitylabel.Caption;
    if (appliedQty != ""){
        merlinLogError("Quantity selection indicator should not be cleared.");
    }else{
        Log.Message("Quantity selection indicator cleared.")
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
 