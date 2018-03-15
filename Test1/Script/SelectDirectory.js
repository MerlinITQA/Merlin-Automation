//USEUNIT ApplicationOpen
//USEUNIT Button
//USEUNIT POSObjectMapping

/** @function
@name SelectDirectory.selectDirectory
@description Select Particular directory on main menu.
@param {Object}dirName: provide directory Name to select  .
*/

function selectDirectory(dirName)
{
    Log.Message("Selected Directory"+dirName.Name);
    Button.clickOnButton(selectDirectoryButton); 
    Button.clickOnButton(dirName); 
         
}

/*********************************************************************************************/
/** @function
@name SelectDirectory.selectViewOrder
@description Select selectViewOrder button on view order pop up
@param {Object}dirName: provide directory Name to select  .
*/

function clickViewOrderButton()
{
  
for(var i=0;i<Orderlist.ItemCount; i++)
{
switch(i)
{
       case i:
        var orderStatus = WrapperFunction.getTextValue(OrderStatus0);
        Log.Message("orderStatus "+orderStatus);
        if(!orderStatus=="REFUNDED")
        {
        Button.clickOnButton(ViewOrderButton0);
        
        }
 } 
}
}


/*********************************************************************************************/
/** @function
@name SelectDirectory.clickSpecificViewOrder
@description Select selectViewOrder button on view order pop up
@param {Object} orderID is the specific order id.
*/
function clickSpecificViewOrder(orderID){
   for(var i=Orderlist.ChildCount-1;i>=0; i--)
    { 
       
      var cnt = Orderlist.Child(i).HGroup(0).Group(0).ChildCount;
      for(var j = 0; j< cnt;j++){
        getOrderID = Orderlist.Child(i).HGroup(0).Group(0).Child(j).Caption;
        if(getOrderID.endsWith(orderID)){        
                Orderlist.Child(i).HGroup(0).SelectableButton("viewOrderButton").Click();               
                Log.Message("View Order button is clicked");                
                return;             
        }
       }
       
    }
}

/*********************************************************************************************/

/** @function
@name SelectDirectory.isDirectoryPresent
@description isDirectoryPresent Particular directory on main menu.
@param {Object}dirName: provide directory Name to select  .
*/

function isDirectoryPresent(dirName)
{
   Button.clickOnButton(selectDirectoryButton); 
   if(dirName.Exists)
   {
      Log.Message("Directory Exists");
   }     
   else
   {
      merlinLogError("Directory does not Exists");
   }
   Button.clickOnButton(selectDirectoryButton);
}
/*********************************************************************************************/