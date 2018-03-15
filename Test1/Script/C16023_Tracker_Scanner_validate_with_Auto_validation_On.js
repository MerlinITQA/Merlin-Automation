//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
//USEUNIT PlaceOrder
  
function C16023_Tracker_Scanner_validate_with_Auto_validation_On()
{  
try
{  
        Log.AppendFolder("C16023_Tracker_Scanner_validate_with_Auto_validation_On");
         InitializationEnviornment.initiliaze();
         AppLoginLogout.login();
         Button.clickOnButton(selectDirectoryButton);
         if(toggleTrackertoggle.FlexObject.active){
             Log.Message("Tracker is not log in.");  
          } else{
  			    merlinLogError("Tracker is not log in."); 
            return;
  		    }
          Button.clickOnButton(selectDirectoryButton);
		      Button.clickOnButton(selectDirectoryButton); 
  		    if(!slidetoggleAutovalidateslidetogg.FlexObject.active){
             slidetoggleAutovalidateslidetogg.Click();  
          } else{
  			     Button.clickOnButton(selectDirectoryButton); 
  		    }
        placeOrder("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash");
    }
  catch(e)
  {
          merlinLogError("Exception occured"); 
  }
       AppLoginLogout.logout();    
}
 