# SAP TechEd 2016 Code Review Session UX725 OPA5 – Kick-Start Asynchronous Acceptance Tests!

## Abstract
One Page Acceptance Tests (OPA5) is an API that’s especially useful for testing SAPUI5 controls. In this code review session, you’ll find out why. Learn how OPA5 simplifies asynchronous acceptance tests. And don’t worry about ramp-up time – OPA5 is integrated with SAPUI5 and the QUnit test framework.

## Idea
Have a Fiori App and explain Opa5 by adding Opa5 tests.

## Setup
- SAP Web IDE with app
- Clone this repository on the initial branch
- You can also clone it 4 more times and create a local branches for step1 - step4

## Script

### Motivation for Opa5
- Show the initial app (running in the web ide)
-	Why testing?
 -	You need confidence in your app to stay agile, go fast and deliver often
-	Issues with non-integrated Testing Tools like Selenium, Protractor?
 -	Finding the right DOM element to interact with is not API of SAPUI5/OpenUI5 controls
  -	Complex controls have a deep nesting of DOM elements, that might even change
  -	=> just IDs is not enough
 -	Even things that seem to happen immediately happening async
  -	Rendering is async, 
  -	JS operations are async
  -	Tests have to wait for the operations to happen to see results
   -	Timeouts are a bad => just make tests flickering (faster/slower builds…)
-	Testing should be done in the same environment as development no need to install any web driver, etc.
 -	JS and SAP Web IDE usage should be possible
-	What we want is a testing tool that integrates nicely with SAPUI5 and knows about when certain thing happen => Opa5 on top of QUnit

### Step 1 - Opa5 Setup
- Create suggested file structure and explain why
 - new folder "webapp/test/integration" => seperate integration tests from unit tests
 - new file "webapp/test/integration/opaTests.qunit.html" 
   - opa tests run directly in the browser, instrumenting the app, no webdriver installation needed
   - bootstrapping SAPUI5 & Opa5
   - delegating test execution to an AllJourney.js
   
  ```
<!DOCTYPE html>
<html>
<head>
	<title>Opa5 tests for our Fiori App</title>
	<meta http-equiv='X-UA-Compatible' content='IE=edge'>
	<meta charset="utf-8">

	<script id="sap-ui-bootstrap"
		src="../../../resources/sap-ui-core.js"
		data-sap-ui-theme="sap_bluecrystal"
		data-sap-ui-compatVersion="edge"
		data-sap-ui-logLevel="ALL"
		data-sap-ui-libs="sap.m"
		data-sap-ui-resourceroots='{
			"sap.ui.teched.appUnderTest" : "../../"
		}'
		data-sap-ui-frameOptions='deny'>
	</script>


	<script>
		jQuery.sap.require("sap.ui.teched.appUnderTest.test.integration.AllJourneys");
	</script>

</head>
<body>
		<div id="qunit"></div>
		<div id="qunit-fixture"></div>
</body>
</html>
  ```
 - new file "webapp/test/integration/AllJourneys.js" 
   - test cases = Journeys through your app
   - can be many journeys in a large app, so one to start them all
  
  ```
jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
jQuery.sap.require("sap.ui.qunit.qunit-coverage");

QUnit.config.autostart = false;

sap.ui.require([
  "sap/ui/test/Opa5"
], function(Opa5) {

	 "use strict";
	 Opa5.extendConfig({
		 viewNamespace: "sap.ui.teched.appUnderTest.view."
	 });
  
	 sap.ui.require([
	 ], function() {
		 QUnit.start();
	 });
});
  ```
 - Templates generate this Opa5 bootstrap stuff for you
 - Run opaTests.qunit.html as Web Application to show the "empty" test page

### Step 2 - SearchJourney - Initially 3 items

- Lets check the initial state with 3 items in the list (fixed data via mockserver!)
- new OPA Journey "SearchJourney.js" with container AllJourneys.js
 - automatically integrated in AllJourneys
 - Tests following the Given, When, Then syntax
 - Tests read similar to english texts
 
  ``` 
	QUnit.module("List");

	opaTest("Should show 3 orders initially", function(Given, When, Then) {
		Given.iStartMyApp();

		Then.onTheMasterView.theListShouldHaveTheGivenNumberOfOrders(3);
	});
  ```
- Where do the iStartMyApp and onTheMasterView.theListShouldHaveTheGivenNumberOfOrders functions come from?
- Arrangement: 
  - Update the AllJourneys.js
   ``` 
sap.ui.require([
	"sap/ui/test/Opa5",
	"sap/ui/teched/appUnderTest/test/integration/pages/Common"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "sap.ui.teched.appUnderTest.view."
	});
  ```
  - New folder /test/integration/pages
  - New file /test/integration/pages/Common.js
   - arrangement iStartMyApp
   - Load the component, Opa5 could also open an html file in an iframe, but component is faster (newer)
  ```
  sap.ui.define([
		'sap/ui/test/Opa5'
	],
	function (Opa5) {
		"use strict";

		return Opa5.extend("sap.ui.teched.appUnderTest.test.integration.pages.Common", {

			iStartMyApp: function (oOptions) {
				oOptions = oOptions || {};
				oOptions.componentConfig = {
					name: "sap.ui.teched.appUnderTest"
				};
				this.iStartMyUIComponent(oOptions);
			}
		});
	}
  );
  ```
  - theListShouldHaveTheGivenNumberOfOrders => Page Objects
  - Create OPA Page "```Master.js```", Container: AllJourneys.js,  select view Master.view.xml, select searchField and list as controls
    - Update page object name: ```onTheMasterView```
    - Explain Page Object 
      - way to structure your test, 
      - page object pattern, 
      - single place to access all parts of a single part of the UI,
        - actions: stuff you do with your UI controls (being part of Given and When)
          - some pregenerated once, we will skip for now
        - assertions: stuff you want to see in the UI (being part of the Then)
          - pregenerated that we will update now
      - provide "readable", "use case relevant" naming for the actions in that part of the UI
    - Update the assertions and import the ```sap/ui/test/matchers/AggregationLengthEquals``` matcher:
      - explain the waitFor
      	- include the async part (wait!For)
      	- look for ids with the UI5 view prefix knowledge (list has the component and view id prefixed, but by accesing the view instance, the test framework doesn't have to care)
      	- matchers to find controls in special conditions, aggregations, properties, ancestor, custom function
      	- success function for real assertions
    ```
    theListShouldHaveTheGivenNumberOfOrders: function(iNumberOfOrders) {
		return this.waitFor({
			id: "list",
			viewName: "Master",
			matchers: new AggregationLengthEquals({
				name: "items",
				length: iNumberOfOrders
			}),
			success: function() {
				Opa5.assert.ok(true, "The list has " + iNumberOfOrders + " orders.");
			},
			errorMessage: "List does not have all orders."
		});
	}
    ```
    - Run the tests
  
### Step 3 - SearchJourney - Search for an order

- Lets search for a single order in the list
- update the ```SearchJourney.js``` with the next test
    ```
	opaTest("Can find a single order", function(Given, When, Then) {
		When.onTheMasterView.iEnterSeachTerm("58")
			.and.iTriggerTheSearch();

		Then.onTheMasterView.theListShouldHaveTheGivenNumberOfOrders(1);
	});
    ```
- update the ```Master.js``` page object
  - better name for the searching
  - ```iTriggerTheSearch``` instead of ```iPressSearchField_searchField```
  - ```iEnterSeachTerm``` instead of ```iEnterTextSearchField_searchField```
  - have parameter for the text in ```iEnterSearchTerm``` that is passed to the ```EnterText``` action
  - Explain Actions:
    - Simulate! the browser events on the control
    - For most controls no need to know the DOM internals to trigger actions (look into api doc)
      - https://sapui5.hana.ondemand.com/#docs/api/symbols/sap.ui.test.actions.Press.html#constructor
  - Run the tests
 

### Step 4 - SearchJourney - Navigate to the order

- Lets navigate to that single order in the list to see the details
- update the ```SearchJourney.js``` with the next test

    ```
	opaTest("Can navigate to an single order", function(Given, When, Then) {
		When.onTheMasterView.iPressOnTheOrderWithTheID("5001658");

		Then.onTheDetailView.iSeeTheTitle("Sales Order 5001658");
	});
    ```
- update the ```Master.js``` page object
 - exchange ```require sap/ui/test/matchers/BindingPath``` matcher and replace the ```iPressList_list``` action with 
 - we can access the binding information for more stable tests!
   
     ```
	iPressOnTheOrderWithTheID  : function(sId) {
		return this.waitFor({
			controlType: "sap.m.ObjectListItem",
			viewName: "Master",
			matchers: new BindingPath({
				path: "/SalesOrders('" + sId + "')"
			}),
			actions: new Press(),
			errorMessage: "No order with the id " + sId + " was found."
		});
	}
    ```
 - Create OPA Page "```Detail.js```", Container: AllJourneys.js,  select view Detail.view.xml, no controls to select
   - update the content with 
   
    ```
	sap.ui.define([
		"sap/ui/test/Opa5",
		"sap/ui/test/actions/EnterText",
		"sap/ui/test/matchers/Properties"
	], function(Opa5, EnterText, Properties) {
		"use strict";

		Opa5.createPageObjects({
		        onTheDetailView: {
		            assertions: {
		                iSeeTheTitle: function(sTitle) {
		                    return this.waitFor({
		                    	id: "objectHeader",
		                    	viewName: "Detail",
		                    	matchers : new Properties({
		                    		title : sTitle
		                    	}),
		                    	success: function() {
		                    		Opa5.assert.ok(true, "I can see the title " + sTitle);
		                    	},
		                    	errorMessage: "Was not able to find the control with the id objectHeader"
		                    });
		                }
		            }
		        }
		});
});
       ```
### Conclusion
 - Summarize
 - Prefer to write plain Unit tests!
 - Use Opa5 for integration/acceptance tests

### Additional Content
 - ```.and.iTeardownMyUIComponent()``` in ```SearchJourney.js```
   - Setup and Teardown of the app for each Journey
 - Update the initial test with an assertion on the detail page title to see the benefit and reuse of page objects.
 - Code Coverage
