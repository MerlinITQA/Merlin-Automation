//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT SupportManagerFunctions

function _0001485874486033_Res_Support_Mgr_Case_Notes_minimum_pay_multiple()
{

try{
  Log.AppendFolder("_0001485874486033_Res_Support_Mgr_Case_Notes_minimum_pay_multiple");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login();
  var groupNm=defaultGroupName;
  var paymentTypeForReservation = "Cash";
  var keyWordNm ="Reservations";
  var packageNm ="Minimum Payment Required Reservation 2";
  var subPakNm ="Individual";
  var qtyT = 1;
  var dateD =CommonCalender.getTodaysDate();  
  orderForAddReservationForMinimumAndNoPayment(true,groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation);
  if(ReservationOrderInfo.prototype.ResID != null){
     selectSupportManagerFromMainMenu(); 
     aqUtils.Delay(10000);
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
	    return;
    }finally{
     Log.PopLogFolder();
    }
}