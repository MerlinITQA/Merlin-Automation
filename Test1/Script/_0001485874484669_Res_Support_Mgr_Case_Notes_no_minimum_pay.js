//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT SelectGroupFromMainMenu
//USEUNIT SupportManagerFunctions

function _0001485874484669_Res_Support_Mgr_Case_Notes_no_minimum_pay()
{  
try{
      Log.AppendFolder("_0001485874484669_Res_Support_Mgr_Case_Notes_no_minimum_pay");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var groupNm=defaultGroupName;
  var paymentTypeForReservation = "Cash";
  var keyWordNm ="Reservations";
  var packageNm ="No Payment Required Reservation 1";
  var subPakNm ="Individual";
  var qtyT = 2;
  dt = CommonCalender.getTodaysDate(); 
  var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");  
  placeResOrderQuick(false,groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation);  
  if(ReservationOrderInfo.prototype.ResID != null){
     selectSupportManagerFromMainMenu(); 
     aqUtils.Delay(5000);
     //AppLoginLogout.loginSupportManager();
     searchSpecificOrderInSM(ReservationOrderInfo.prototype.ResID);     
     selectsubTabSM(tabCaseNotes); 
     var ele  = smCaseNotesdatagridCallhistory.Scroller("scroller").FindAllChildren("ObjectLabel","note_txt",1, true);
     var flag = false;
      if (ele.length > 0)
      {
        for (let i = 0; i < ele.length; i++){
            var text = ele[i].Caption;
            if(text.includes(packageNm) && text.includes("package ID")&&text.includes("customer type")){
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
      if(!smConfirmationOrderNumber.Caption == ReservationOrderInfo.prototype.ResID){
        merlinLogError("Order Id is not correct.");
      }
  }else{
       merlinLogError("Unable to get order number.");
  } 
  AppLoginLogout.logout(); 
   } catch (e) {
    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
  }
  finally { 
    Log.PopLogFolder();
  }    
}