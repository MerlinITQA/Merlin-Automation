// Get tag value
/*
@name XMLFunctions.getTagValue
@description Get value for specific tag.
@param {Object} tagName where actual value resides .
*/

function getTagValue(tagName) 
{
  var currentFolder =aqFileSystem.GetCurrentFolder();
   var xmlConfigTags = 
   {
	    appLoc:"AppUnderTest",logPath:"LogPath",userName:"userName",password:"password",
   }
   
   var loc = currentFolder+"\\Config\\envVar.xml";
   var res = ReadConfigFile(loc, xmlConfigTags);
   if (res == null) {
      merlinLogError("OOPS! Something have gone terribly wrong!");
   }
    var keyValue = res[tagName];  
    return keyValue;  
}

/***************************************************************************************/

/*
@name XMLFunctions.ReadConfigFile()
@description //Read config file.
@param {Object}  xmlLoc : location of XML file
             xmlTagArray: array from XML file 
*/


function ReadConfigFile (xmlLoc, xmlTagArray) {
     var objXML =Sys.OleObject("Msxml2.DOMDocument.4.0");
     objXML.async = false;
 
   objXML.load(xmlLoc);
   if (objXML.parseError.errorCode != 0) {
      merlinLogError("There were errors while reading xml file. " + objXML.parseError.reason);
      return null;
   }
   var retVal = new Array(xmlTagArray.length);
   var config = objXML.selectSingleNode("//configuration");
 
   for (var i in xmlTagArray) {
      var node = config.getElementsByTagName(xmlTagArray[i]);
      var item = node.item(0);
      if (item == null) {
      merlinLogError("Could not find item '" + itemsToGet[i] + "'");
      continue;
      }
      retVal[i] = item.text;
   }
    return retVal;
}

