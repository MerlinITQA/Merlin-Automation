//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction

function C16059_Groups_External_System_Reference_Code()
{
   
   try {
    	Log.AppendFolder("C16059_Groups_External_System_Reference_Code");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      WrapperFunction.selectMainMenu(Groups_MainMenu);  
      Button.click(groupsCreateButton);
      aqUtils.Delay(1000);
      var currentDateAndTime =aqConvert.DateTimeToFormatStr( aqDateTime.Now(), "%#m/%#d/%Y %H:%M");
      var myGroupsName ="Name_test" + currentDateAndTime;  
      var externalSysRefCode = "Test" + currentDateAndTime;
      SelectGroupFromMainMenu.createNewTestGroup(myGroupsName,externalSysRefCode);
      aqUtils.Delay(3000);
      groupsSearchOnUpdate.Click();
      Button.click(groupsClearButton);
      TextBox.setTextBoxValue(groupsNameti,myGroupsName);
      Button.click(groupsSerarchButton);   
      aqUtils.Delay(2000); 
      groupsGride.scroller.Grid("grid").AccDataGridSkinInnerClass9(0).GridLayer("rendererLayer").FindChild("Caption",myGroupsName,0,true).Click();
       aqUtils.Delay(2000); 
      VerifyCheckProperty.compareStringObj(textinputGroupidentifierti.Caption,externalSysRefCode);
      AppLoginLogout.logout();        
     } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    } 
    
}