iron-router-issue-678
=====================

How to reproduce Iron Router issue #678


<h4>Steps To Reproduce</h4>

1. $ git clone https://github.com/steph643/iron-router-issue-678/
2. Go to folder iron-router-issue-678 and run meteor
3. Launch the browser on http://localhost:3000/page1
4. Click on 'Go to page2'
5. Click on 'Go to page1'


<h4>Program Output</h4>

With untouched code, data is not ready (as expected):

```
In page 1, myCollection1Cursor = WARNING, NULL OR UNDEFINED!!!
In page 1, myCollection1Cursor = 1,2,3
In page 2, myCollection2Cursor = WARNING, NULL OR UNDEFINED!!!
In page 2, myCollection2Cursor = 4,5,6
In page 1, myCollection1Cursor = WARNING, NULL OR UNDEFINED!!!
In page 1, myCollection1Cursor = 1,2,3 
```
After uncommenting the 2 'action' lines, data is ready (as expected):
```
In page 1, myCollection1Cursor = 1,2,3
In page 2, myCollection2Cursor = 4,5,6
In page 1, myCollection1Cursor = 1,2,3
```
After commenting back the 2 'action' lines and uncommenting the 2 'onBeforeAction' lines, unexpected behavior:
```
In page 1, myCollection1Cursor = 1,2,3
In page 1, myCollection1Cursor = WARNING, NULL OR UNDEFINED!!!
In page 2, myCollection2Cursor = 4,5,6
In page 2, myCollection2Cursor = WARNING, NULL OR UNDEFINED!!!
In page 1, myCollection1Cursor = 1,2,3 
```
