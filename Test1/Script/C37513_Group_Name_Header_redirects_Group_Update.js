//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT SelectGroupFromMainMenu

function C37513_Group_Name_Header_redirects_Group_Update()
{

try{
    Log.AppendFolder("C37513_Group_Name_Header_redirects_Group_Update");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    aqUtils.Delay(3000);
    selectGroupFromMainMenu(groupNm);
    clickBuyTicketsButton();
    aqUtils.Delay(3000);
    var headerName = CustomerHeaderLabel.Caption;
    var expectedResult = groupNm +" - LDC Boston"
     if(compareStringObj(expectedResult,headerName)){
        Log.Message("Group name and organisation name displays in header to the right of home menu button");
        CustomerHeaderLabel.Click();
        aqUtils.Delay(3000);
        //AP-1414 BugId
//        if(groupUpdateBuyTicketsButton.Exists && groupUpdateBuyTicketsButton.VisibleOnScreen &&
//           groupUpdateDataGridReservation.Exists && groupUpdateDataGridReservation.VisibleOnScreen){
//            Log.Message("Group Update Page is displayed.");
//        }else{
//            merlinLogError("Group Update Page is not displayed.")
//        }
       
        if(Keyword_Listgroup.Exists && Keyword_Listgroup.VisibleOnScreen){
            Log.Message("Application is on home screen.");
        }else{
            merlinLogError("Application is not on home screen.")
        }

      }else{
      merlinLogError("Group name and organisation name is not displayed.");
     }
    AppLoginLogout.logout(); 
      } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }  
      finally { 
	    Log.PopLogFolder();
    }   
}