//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction

function C16094_Default_Organization_Name()
{
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
   try {
    	Log.AppendFolder("C16094_Default_Organization_Name");
      WrapperFunction.selectMainMenu(Groups_MainMenu);  
      
      var currentDateAndTime;
      var myGroupsName;  
      var externalSysRefCode;
       
        currentDateAndTime =aqConvert.DateTimeToFormatStr( aqDateTime.Now(), "%#m/%#d/%Y %H:%M")
        myGroupsName = "Name_test" + currentDateAndTime;  
        externalSysRefCode = "Test" + currentDateAndTime;  
        Button.click(groupsCreateButton);
        aqUtils.Delay(1000);
        SelectGroupFromMainMenu.createNewTestGroup(myGroupsName,externalSysRefCode);
        groupsSearchOnUpdate.Click();           
        aqUtils.Delay(2000);    
        currentDateAndTime =aqConvert.DateTimeToFormatStr( aqDateTime.Now(), "%#m/%#d/%Y %H:%M")
        var myGroupsName1 = "Name_test" + currentDateAndTime;  
        var externalSysRefCode1 =  "Test" + currentDateAndTime;  
        Button.click(groupsCreateButton);
        aqUtils.Delay(1000);
        SelectGroupFromMainMenu.createNewTestGroup(myGroupsName1,externalSysRefCode1);
        groupsSearchOnUpdate.Click();
      
        Button.click(groupsClearButton);
        TextBox.setTextBoxValue(groupsOrganizationNameti,"Automation");
        TextBox.setTextBoxValue(groupsNameti,myGroupsName);
        Button.click(groupsSerarchButton);
        aqUtils.Delay(3000);
        groupsGride.scroller.Grid("grid").AccDataGridSkinInnerClass9(0).GridLayer("rendererLayer").FindChild("Caption",myGroupsName,0,true).Click();
         aqUtils.Delay(2000);
        SelectGroupFromMainMenu.verifyCreatedNewGroup(myGroupsName,externalSysRefCode);
     
        groupsSearchOnUpdate.Click();
         aqUtils.Delay(2000);
          Button.click(groupsClearButton);
        TextBox.setTextBoxValue(groupsOrganizationNameti,"Automation");
        TextBox.setTextBoxValue(groupsNameti,myGroupsName1);
        Button.click(groupsSerarchButton);
              aqUtils.Delay(2000);   
        groupsGride.scroller.Grid("grid").AccDataGridSkinInnerClass9(0).GridLayer("rendererLayer").FindChild("Caption",myGroupsName1,0,true).Click();
         aqUtils.Delay(2000);
        SelectGroupFromMainMenu.verifyCreatedNewGroup(myGroupsName1,externalSysRefCode1);
      
       groupsSearchOnUpdate.Click();
        aqUtils.Delay(2000);
       Button.click(groupsClearButton);
       TextBox.setTextBoxValue(groupsNameti,myGroupsName);
       Button.click(groupsSerarchButton);    
       aqUtils.Delay(2000);       
       groupsGride.scroller.Grid("grid").AccDataGridSkinInnerClass9(0).GridLayer("rendererLayer").FindChild("Caption",myGroupsName,0,true).Click();
        aqUtils.Delay(2000);
       SelectGroupFromMainMenu.verifyCreatedNewGroup(myGroupsName,externalSysRefCode);      
      
    } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    } 
   AppLoginLogout.logout(); 
}