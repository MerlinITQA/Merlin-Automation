//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT VerifyCheckProperty
 

function C17335_Settlement_Screen_Cash_Function_Keys()
{ 
	 
    InitializationEnviornment.initiliaze(); 
    AppLoginLogout.login();  
    try {
    Log.AppendFolder("C17335_Settlement_Screen_Cash_Function_Keys");
    var keyWordNm ="Daily Admission";
    var packageNm = "VeriFone Integration Test Package";
    var subPakNm ="Individual"; 
    verifySettlementScreenCashFunctionality(keyWordNm,packageNm,subPakNm,"Invoice","[F1]",1);
    aqUtils.Delay(1000);
    verifySettlementScreenCashFunctionality(keyWordNm,packageNm,subPakNm,"Invoice","[F2]",5);
    aqUtils.Delay(1000);
    keyWordNm ="Daily Tickets";
    packageNm = "Taxes and Fees Test Product";
    subPakNm ="Individual";
    verifySettlementScreenCashFunctionality(keyWordNm,packageNm,subPakNm,"Invoice","[F3]",10);
    aqUtils.Delay(1000);
    keyWordNm ="Daily Admission";
    packageNm = "Date/Time";
    subPakNm ="Adult";
    verifySettlementScreenCashFunctionality(keyWordNm,packageNm,subPakNm,"Invoice","[F4]",20);
    aqUtils.Delay(1000);
    keyWordNm ="Annual Passes";
    packageNm = "Local Annual Pass Family";
    subPakNm ="Individual Free";
    verifySettlementScreenCashFunctionality(keyWordNm,packageNm,subPakNm,"Invoice","[F5]",50);
    aqUtils.Delay(1000);
    keyWordNm ="Annual Pass";
    packageNm = "Annual Pass - reserve";
    subPakNm ="Individual";
    verifySettlementScreenCashFunctionality(keyWordNm,packageNm,subPakNm,"Invoice","[F6]",100);
    aqUtils.Delay(1000);
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
      AppLoginLogout.logout(); 
	    Log.PopLogFolder();      
       
    }      
   
}