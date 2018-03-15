//USEUNIT ApplicationOpen
//USEUNIT Button
//USEUNIT POSObjectMapping
//USEUNIT OrderDetails

/**
 * @author mnpatil
 */

/** @function
@name SelectPackageAndSubPackage.selectPackage
@description select package.
@param {Object} packageName is a packageName.
@param {Object} subPackageName is a subPackageName.
*/
function selectPackage(packageName,subPackageName){
      findPackage(packageName, subPackageName);
// try {
//        
//      Log.Message("Select Package: "+"'"+packageName+"'"+" and Subpackage: "+"'"+subPackageName+"'");
//  	 	Log.AppendFolder("Select Package: "+"'"+packageName+"'"+" and Subpackage: "+"'"+subPackageName+"'");
//      var packageArray = new Array();
//      var packageArray2 = new Array();
//      var childCount =  allPackages.ChildCount;
//      CountForPackage.prototype.AllPackageCount = childCount;
//      for (var i=0;i<childCount; i++){
//        packageArray.push(allPackages.Child(i));
//      }
//       
//      
////      var childCount =  allPackages.FlexObject.dataGroup.numElements;
////      CountForPackage.prototype.AllPackageCount = childCount;
////      for (var i=0;i<childCount; i++){
////        var ele = allPackages.FlexObject.dataGroup.getElementAt(i);
////        var subPname = ele.data.pkg.name; 
////        packageArray2.push(subPname);
////        packageArray.push(ele);
////      }
//      
////                 var passportPOS;
////                var list;
////                var vlabel;
////                passportPOS = Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1;
////                list = passportPOS.listPackagelistgroup;
////                list.ListItem("[object PackageListRendererData]").Click(60,80,0)
//      
//
//      for(var i = 0; i < packageArray.length; i++) {
//       if(selectionSubPackage(packageName,subPackageName, packageArray[i])){
//          break;
//          }
//      }
//      
//      }catch (e) {
//		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
//        return;
//	    }
//	    finally {
//		    Log.PopLogFolder();
//	    }
}
/*****************************************************************************************/
/** @function
@name SelectPackageAndSubPackage.selectionSubPackage
@description Selection of sub packages.
@param {Object} packageName is packageName.
@param {Object} subPackageName is subPackageName.
@param {Object} control is control for package.
*/
function selectionSubPackage(packageName, subPackageName, control){
try {
        Log.AppendFolder("SelectPackageAndSubPackage.selectionSubPackage");
        
        
       var packageCaption = control.VGroup("labelAndRatesGroup").Group(0).Label("pkgLabel").Caption;
        if(packageCaption.includes(packageName) && packageCaption.startsWith(packageName))
        {
            Log.Message("Selected Subpackage: "+subPackageName);
            var dataGroup =control.VGroup("labelAndRatesGroup").List("ratesList").FlexObject.dataGroup;
            var itemCount = dataGroup.numElements;
            for (var i=0;i<itemCount; i++){
            var subPackage = dataGroup.getElementAt(i);
              var pkName = subPackage.data.name;
              if(pkName.includes(subPackageName) && pkName.startsWith(subPackageName)){
                  var x = subPackage.x;
                  var y = subPackage.y;
                  control.VGroup("labelAndRatesGroup").List("ratesList").Click(x+10,y+10,0);
                   return true;
              } 
        }
        }else{
          return false;
        }
       // var packageCaption= control.Label("pkgLabel").Caption;
//       var packageCaption= control.VGroup("labelAndRatesGroup").Group(0).Label("pkgLabel").Caption;
//       if(packageCaption.includes(packageName) && packageCaption.startsWith(packageName))
//        {
//            control.Click();
//        }
       /* if(packageCaption.includes(packageName) && packageCaption.startsWith(packageName))
        {
            Log.Message("Selected Subpackage: "+subPackageName);
            var subPackageArray = new Array();
            var childCount =  control.DataGroup("ratesList").ChildCount;
            CountForPackage.prototype.SpecificPackSubPackageCount = childCount;
            for (var i=0;i<childCount; i++)
            {
               subPackageArray.push(control.DataGroup("ratesList").Child(i));
            } 
            
            for(var i = 0; i < subPackageArray.length; i++) 
            {
              subPackageCaption= subPackageArray[i].Group(0).Label("rateLabel").Caption;;
                if(subPackageCaption == subPackageName){
                    subPackageArray[i].Click();
                    return true;
            }
          }
          return true;
        }
        else
        {
         
          return false;
        }*/
      } catch (e) 
      {
       
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
        //Runner.Stop(true);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}
/*****************************************************************************************/
/** @function
@name SelectPackageAndSubPackage.findPackage
@description select package.
@param {Object} packageName is a packageName.
@param {Object} rateName is a rateName.
*/     
function findPackage(packageName, rateName) {
try {
  Log.AppendFolder("Select package - packageName: "+"'"+packageName+"'");
  var childCount =  allPackages.ChildCount;
  var allCount = allPackages.ItemCount;
      CountForPackage.prototype.AllPackageCount = childCount;
      var flag = true;
      loop = Math.ceil(allCount/childCount);        
      for(j=0;j<loop;j++){
        childCount =  allPackages.ChildCount;
        for (var i=0;i<childCount; i++){
          if((allPackages.Child(i).Top + allPackages.Child(i).FlexObject.contentHeight) < groupXmccollectionscrollgroup.Top)
          { 
            var packageCaption = allPackages.Child(i).VGroup("labelAndRatesGroup").Group(0).Label("pkgLabel").Caption;
            aqUtils.Delay(500)
            if(packageCaption.includes(packageName) && packageCaption.startsWith(packageName))
            {           
                     flag = false;                   
                     selectRate(allPackages.Child(i),rateName);
                     return;
            }
           }        
        }
        if(!flag){
          Log.Message("Subpackage is not found.")
          return;  
        }
        selectablebuttonScrolldown.Click();
        selectablebuttonScrolldown.Click();
        selectablebuttonScrolldown.Click();
        selectablebuttonScrolldown.Click();        
        selectablebuttonScrolldown.Click();
        selectablebuttonScrolldown.Click();
        selectablebuttonScrolldown.Click();
        selectablebuttonScrolldown.Click();
        allPackages.Refresh(); 
        aqUtils.Delay(1000);       
      }
     } catch(e) 
      {
        merlinLogError("Oops! There's some glitch in the script: " + e.message);
      }
	    finally {
		    Log.PopLogFolder();
	    }
};

function selectRate(package,rateName){
  try{
  	 	Log.AppendFolder("Select rate - rateName: "+"'"+rateName+"'");
//    var package = Sys.Process("Passport POS").Window("ApolloRuntimeContentWindow",
//            "accesso Passport POS", 1).PassportPOS(0).Group(0).Group("contentGroup").MainView(0).PointOfSale(
//            0).HGroup(0).Group("leftGroup").VGroup("leftGroupInnerGroup").VGroup("packagesXmcGroup")
//        .PackageListView("packageListView").List("packageListGroup").FindChild(
//            "FlexObject.data.pkg.name",packageName);     
    var ratesList = package.VGroup("labelAndRatesGroup").List("ratesList");
    var dataGroup = ratesList.FlexObject.dataGroup;
    var dataProvider = ratesList.FlexObject.dataProvider;
    var columnCount = ratesList.FlexObject.layout.columnCount;
    var rowCount = ratesList.FlexObject.layout.rowCount
    var itemWidth = dataGroup.contentWidth / columnCount;
    var itemHeight = dataGroup.contentHeight / rowCount;   
    for (var i = 0; i < dataProvider.length; i++) {
        var row, findRow = {
            "0": function () {
                row = 0;
            },
            "default": function () {
                row = Math.floor(i / columnCount);
            }
        };
        if (dataProvider.item(i).name == rateName) {
            (findRow[i] || findRow["default"])();
            var column = i % columnCount
            var clickX = (itemWidth * column) + (itemWidth / 2);
            var clickY = (itemHeight * row) + (itemHeight / 2);
            ratesList.Click(clickX, clickY);
            break;
        };
    };
    } catch(e) 
      {
        merlinLogError("Oops! There's some glitch in the script: " + e.message);
      }
	    finally {
		    Log.PopLogFolder();
	    }
};

  
      