//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction
//USEUNIT VerifyCheckProperty

function C17229_Reservations_are_displayed_in_the_correct_Order()
{
 try {
    Log.AppendFolder("");
   InitializationEnviornment.initiliaze();
   AppLoginLogout.login(); 
     var myGroupsName = defaultGroupName;
    aqUtils.Delay(2000);
    selectGroupFromMainMenu(myGroupsName);
    aqUtils.Delay(2000);
    Button.clickOnButton(dataGridResDateTimeHeader);
      var packageArray = new Array();
      var dateArray = new Array();
      var rC = 0;
		rC = groupUpdateDataGridReservation.wRowCount;
        for ( rowC = 0 ; rowC <rC ; rowC++){ 
            var dt = groupUpdateDataGridReservation.wValue(rowC ,0);
            packageArray.push(dt);
            dateArray.push(groupUpdateDataGridReservation.wValue(rowC ,1)); 
        } 
      var sorted = true;
      for (let i = 0; i < packageArray.length - 1; i++) {
          if (packageArray[i] > packageArray[i+1]) {
              sorted = false;
              break;
          }
      }
      if(sorted){
          Log.Message("All reservation order numbers are displayed in chronological order ascending order.")
      }else{
      merlinLogError("All reservation order numbers are not displayed in chronological order ascending order")
      }
//     // mm--dd--yy
//      for (let i = 0; i < dateArray.length - 1; i++) {
//          var date1 = dateArray[i].split("/");
//          var date2 = dateArray[i+1].split("/");
//          d1 = new Date(date1[2],date1[1],date1[0]);
//          d2 = new Date(date2[2],date2[1],date2[0]);
//          var s = aqDateTime.Compare(d1, d2);
//          
//      }
//      if(sorted){
//          Log.Message("All reservation order numbers are displayed in chronological order ascending order.")
//      }else{
//      merlinLogError("All reservation order numbers are not displayed in chronological order ascending order")
//      }
//      
      
      aqUtils.Delay(2000);
      Button.clickOnButton(dataGridResDateTimeHeader);
      
          
    AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally {
	    Log.PopLogFolder();
    } 
}