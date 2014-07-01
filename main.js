
MyCollection = new Meteor.Collection("myCollection1");

if (Meteor.isClient)
	{

	Session.set('positiveOnly', false);

	Router.map(function ()
		{
		this.route('page1',
			{
			waitOn: function () { return Meteor.subscribe('myCollection', Session.get('positiveOnly')); },
/*
			// SOLUTION 1: works well, unless you uncomment this.render('loading')
			action: function()
				{
				if (this.ready())
					this.render();
//				else
//					this.render('loading');
				}
*/
				
/*
			// SOLUTION 2: works well, unless you uncomment this.render('loading')
			onBeforeAction: function(pause)
				{
				if (this.ready())
					return;
				pause();
//				this.render('loading');
				},
*/
			});
		});

	Template.page1.logCollection = function()
		{
		var log = MyCollection.find({}).map(function(e) { return e.value; });
		console.log(log);
		return log;
		}

	Template.page1.events(
		{
		'click #togglePositiveOnly': function(event, template)
			{
			Session.set('positiveOnly', ! Session.get('positiveOnly'));
			},
		});

	}

if (Meteor.isServer)
	{
	MyCollection.remove({});

	MyCollection.insert({ value: -2 });
	MyCollection.insert({ value: -1 });
	MyCollection.insert({ value: 0 });
	MyCollection.insert({ value: 1 });
	MyCollection.insert({ value: 2 });

	Meteor.publish('myCollection', function(positiveOnly)
		{
		return MyCollection.find( positiveOnly ? { value: { $gte: 0 } } : {} );
		});
	}
