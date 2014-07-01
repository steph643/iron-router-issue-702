iron-router-issue-702
=====================

<h4>Step to reproduce</h4>

1. $ git clone https://github.com/steph643/iron-router-issue-702/
2. Go to folder iron-router-issue-702 and run meteor
3. Launch the browser on http://localhost:3000/page1 and have a look at the console: it shows empty collection content (data not ready), then correct collection content -2,-1,0,1,2
4. Click the 'Toggle positive Only' button: it shows updated collection content 0,1,2
5. Open main.js, uncomment section SOLUTION 1 and go to step 3 again: as expected, the empty collection does not show up, because we have waited for data to be ready before rendering the template.
6. Now uncomment lines 20 and 21 and go to step 3 again: rendering gets stucked on the 'loading' template.
7. Go to step 5 and do the same with SOLUTION 2 instead of SOLUTION 1: the same problem occurs.
8. You can try with the built-in `Router.onBeforeAction('loading')` hook: the same problem occurs.

<h4>Problem description</h4>

I use a reactive subscribe like this:

```
this.route('page1',
    {
    waitOn: function () 
        { 
        return Meteor.subscribe('myCollection', Session.get('positiveOnly')); 
        },
    });
```
My publish function looks like this:

```
Meteor.publish('myCollection', function(positiveOnly) 
    {
    return MyCollection.find( positiveOnly ? { value: { $gte: 0 } } : {} );
    });
```
This works fine: when the Session value positiveOnly changes, MyCollection is updated with the correct values and my template is re-rendered.

The issue occurs when I try to wait for data to be ready before rendering my template.

This works :

```
this.route('page1',
    {
    action: function()
        {
        if (this.ready())
            this.render();
        }
    });

this.route('page1',
    {
    onBeforeAction: function(pause)
        {
        if (this.ready())
            return;
        pause();
        },
    });
```
This does not work :
Rendering gets stucked in the 'loading' template and never comes back to default rendering:

```
this.route('page1',
    {
    action: function()
        {
        if (this.ready())
            this.render();
        else
            this.render('loading');
        }
    });

this.route('page1',
    {
    onBeforeAction: function(pause)
        {
        if (this.ready())
            return;
        pause();
        this.render('loading');
        },
    });
```
The same problem occurs when using the built-in `Router.onBeforeAction('loading')` hook.
