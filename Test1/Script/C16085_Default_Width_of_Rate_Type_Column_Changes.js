//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT PlaceOrder

function C16085_Default_Width_of_Rate_Type_Column_Changes()
{
try{
       var keyWordNm ="Schools";
       var packageNm = "Master Workshop - Room 2";
       var subPakNm="Merry Go-Round Complimentary";
       Log.AppendFolder("C16085_Default_Width_of_Rate_Type_Column_Changes");
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
       WrapperFunction.selectKeywordName(keyWordNm);
       selectPackage(packageNm,subPakNm);
       aqUtils.Delay(3000);       
       if(datetimeformSubWindow.Exists){           
       //   selectDateFromSubWindow(dateD); //mm-dd-yyyy  
          selectNextButtonFromSubWindow();
       }
       finilizeOrder();
       aqUtils.Delay(2000);
       cnt = settlementOrderDataGridOrderdgRender.ChildCount;
       flag = false;
       for(let i=0;i<cnt;i++){
          temp = settlementOrderDataGridOrderdgRender.Child(i).Caption;
          if(temp.includes(subPakNm)){
            if(settlementOrderDataGridOrderdgRender.Child(i).Width >= 194){
              flag = true;
              break;
            }else{
              merlinLogError("The default width of the 'Rate Type' column is not expanded.");
            }
          } 
        }
        if(flag){
          Log.Message("The default width of the 'Rate Type' column has been expanded.");
        }else{
              merlinLogError("The default width of the 'Rate Type' column is not expanded.");
        }          
  }
  catch(e)
  {
    merlinLogError("Exception occured");
  }
  finally { 
	    Log.PopLogFolder();
  }      
  AppLoginLogout.logout(); 
}