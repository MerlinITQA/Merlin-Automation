// Terminate Applications and run POS application
//USEUNIT Process

/** @function
@name ApplicationOpen.openApp
@description Terminate Applications and run POS application.
@param {Object} Select testAppName app name to open the App  .
*/

function openApp(testAppName)
{
   var App =  TestedApps.Passport_POS;
    ProjectSuite.Variables.testResultStatus =1;
   //Close the Alredy running application and related processes 
   Process.isProcessRunningClose(testAppName);
   //run applciation   
    App.Run();
    aqUtils.Delay(15000);
}    

 
function merlinLogError(msg){
    Log.Error(msg);
    ProjectSuite.Variables.testResultStatus = 5;
   // Runner.Stop(true);    
};

//ApplicationOpen.prototype.testRunID = "519";
//ApplicationOpen.prototype.POSVersion = "5.0.8";
//ApplicationOpen.prototype.comment="Test case Failed"

function updateInTestRail(caseID) {
try{
 var  testRunID ="661";
 var comment ="Result updated automatically";
 var POSVersion ="5.0.9 SP1";  
  
  Log.AppendFolder(
    "Updating TestRail test run id: " + testRunID +
    " case id: " + caseID
  );
  var http = Sys.OleObject("MSXML2.XMLHTTP");
  var encodedString = "bWFoZXNoLnBhdGlsMkBzcXMuY29tOk1haGVzaEAxMjM="; // Encoded String is base 64 encryption of the username and password for testrail;
  var url =
    "https://merlinentertainments.testrail.net/index.php?/api/v2/add_result_for_case/" + 
    testRunID + "/" + caseID;
   var statusID; 
   var argumentJSON;   
    if(ProjectSuite.Variables.testResultStatus == 5)
    {
		 statusID = "5";
		 argumentJSON =
		'{"status_id":"' + statusID +
		'","comment":"' + comment +
		'","version":"' + POSVersion + '"}';
		http.open("POST", url, false);
		http.setRequestHeader("Content-Type", "application/json");
		http.setRequestHeader("Authorization", "Basic " + encodedString);
		Log.Message("REQUEST: " + argumentJSON);
		http.send(argumentJSON);
		Log.Message("RESPONSE: " + http.responseText);
    }else if(ProjectSuite.Variables.testResultStatus == 1){
		 statusID = "1";
		 argumentJSON =
		'{"status_id":"' + statusID +
		'","comment":"' + comment +
		'","version":"' + POSVersion + '"}';
		http.open("POST", url, false);
		http.setRequestHeader("Content-Type", "application/json");
		http.setRequestHeader("Authorization", "Basic " + encodedString);
		Log.Message("REQUEST: " + argumentJSON);
		http.send(argumentJSON);
		Log.Message("RESPONSE: " + http.responseText);
    }
    
  } catch (e) {
	    merlinLogError("Unable to update result in TestRail ");
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }
};





/*******************************************************************************************/

