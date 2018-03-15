//Close already running tested application

/** @function
@name Process.isProcessRunningClose
@description Terminate already applications and their sub process.
@param {Object} Select appName app name to terminate the App  .
*/

function isProcessRunningClose(appName)
{
      var POSApp = Sys.WaitProcess("Passport POS");
      var externalDevice=Sys.WaitProcess("ExternalDevice");
      var POSPrint1=Sys.WaitProcess("POSPrint");
      var javaProcess=Sys.WaitProcess("java");
      
     if (externalDevice.Exists)  
     {
        externalDevice.Terminate();
       
     }
     if(POSPrint1.Exists )
     { 
         POSPrint1.Terminate();     
     }
     var POSPrint2=Sys.WaitProcess("POSPrint");
     if(POSPrint2.Exists )
     { 
          POSPrint2.Terminate();
     }
     if(POSApp.Exists)
     {
        POSApp.Terminate();
     } 
     if(javaProcess.Exists)
     {
        javaProcess.Terminate();
     }  
     var dlgSaveTheFileAsDialog = Sys.WaitProcess("dlgSaveTheFileAs");    
      if(dlgSaveTheFileAsDialog.Exists)
     {
        dlgSaveTheFileAsDialog.Terminate();
     }  
    Log.Message("All already running application/resources closed");
 }



/*********************************************************************************************/

/** @function
@name Process.waitForElementEnable
@description Wait For Element to be enable.
@param {Object} Select appName app name to terminate the App  .
*/

function waitForElementEnable(locator)
{
      //Log.Message("Waiting for element");
   //   locator.WaitProperty("Enabled", true, 10000);
    aqUtils.Delay(10000);
}

