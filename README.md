# SAP TechEd 2016 Code Review Session UX725 OPA5 – Kick-Start Asynchronous Acceptance Tests!

## Abstract
One Page Acceptance Tests (OPA5) is an API that’s especially useful for testing SAPUI5 controls. In this code review session, you’ll find out why. Learn how OPA5 simplifies asynchronous acceptance tests. And don’t worry about ramp-up time – OPA5 is integrated with SAPUI5 and the QUnit test framework.

## Idea
Have a Fiori App and explain Opa5 by adding Opa5 tests.

## Setup
- SAP Web IDE with app
- Clone this repository on the initial branch
- You can also clone it 4 more times and create a local branches for step1 - step4


### Motivation for Opa5 
-	Why testing?
 -	You need confidence in your app to stay agile, go fast and deliver often
-	Issues with non-integrated Testing Tools like Selenium, Protractor?
 -	Finding the right DOM element to interact with is not API of openui5 controls
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
