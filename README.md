# Project name: AdRux


#### How to build static project:
1. `$ npm install`
2. `$ npm run static-build`
3. `& npm run static-server`

#### How to build react project:
1. `$ npm install`
2. `$ npm run react-starter`
3. `$ npm run build-react`
3. `$ npm start`

### How to upload project:
1. `$ npm run upload-react`

### Run pre-production script:
1. `$ npm run pre-production`

### How to install and run mongoDB (linux)
1. `$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6`
2. `$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`
3. `$ sudo apt-get update`
4. `$ sudo apt-get install -y mongodb-org`
5. `$ sudo mkdir -p /data/db`
6. `$ sudo chown -R $USER /data/db`
7. `$ mongod`

### How to install and run mongoDB (OS X)
1. `brew update`
2. `brew install mongodb`
3. `$ sudo mkdir -p /data/db`
4. `$ sudo chown -R $USER /data/db`
5. `$ mongod`

### How to run API server
1. `$ npm run api-server`

Run static server: `$ npm run static-server`
Run development tasks: `$ npm run static-dev`
Run react server: `$ npm start`


#### Description:
+ Page links:
	- followers - http://localhost:3000/followers/followers.html
	- get real followers - http://localhost:3000/followers/get-followers.html
	- message & comments (empty) - http://localhost:3000/messages-comments/m&c-empty.html
	- message & comments - http://localhost:3000/messages-comments/m&c.html
	- messages - http://localhost:3000/messages-comments/messages.html
	- comments - http://localhost:3000/messages-comments/comments.html
	- publishing (empty) - http://localhost:3000/publishing/publishing(empty).html
	- publishing (media library) - http://localhost:3000/publishing/publishing(media).html
	- publishing (search) - http://localhost:3000/publishing/publishing(search).html
	- analytics - http://localhost:3000/analytics/analytics.html
	- settings - http://localhost:3000/settings/settings.html
	- settings (social accounts) - http://localhost:3000/settings/accounts.html
	- settings (team members) - http://localhost:3000/settings/members.html
	- settings (pricing) - http://localhost:3000/settings/pricing.html


### Connect via FTP:
	$ lftp -u content-user,Uy8Lim6HRLpkPpbC 188.166.150.21

#### TODO:
- Adding 'mobile-layout' class (components/wrapper/header.js)
- Describe redux layer
- Describe reducers
- Styles for "Back to dashboard" is inline (menu.js, menu_item.js)
- Working directory (static-src, static-build, react-src, react-build)
- Describe ping for messages and comments

### Instagram Accounts
- login: hjyihxgy9 
-	password: IH5ut1VL5o
- mail: novikovmikchail1990@mail.ru
- password: rh1C5vl52
____________________________________________________________________________________
- login: zrxdwxzslkg3
- password: jOTswiRQoQ
- mail: gorschkovnikita1997@mail.ru
- password: waqqqP77
____________________________________________________________________________________
- login: uv0evpo
- password: itnYXY3n2X
- mail: frolovpyotr1998@mail.ru
- password: sB5ce885
____________________________________________________________________________________
- login: yakovlevnikifor198712
- password: 1cNaPn3ssR
- mail: YakovlevNikifor198712@mail.ru
- password: akB4cpLh
____________________________________________________________________________________
- login: vsevolodpishcherov
- password: SODEhUKA9O
- mail: ElevsippSmirnov18@mail.ru
- password: ql6kDkDN
____________________________________________________________________________________
- login: michaela__arellano__6634
- password: emqBY8XzEJ
- mail: malvina.golovkina.74
- password@ mail.ru:bPhgX6ZRkxR1TsSi

#### Mockup:
+ https://projects.invisionapp.com/share/GTC5HHFWB#/screens/238962016

#### DOCS:
+ Drag n Drop:
	- https://github.com/react-dnd/react-dnd
+ Chart.js:
	- http://www.chartjs.org/docs/latest/charts/line.html
	- http://www.chartjs.org/docs/latest/getting-started/usage.html
	- https://webdesign.tutsplus.com/tutorials/how-to-create-a-simple-line-chart-with-chartjs--cms-28129
+ Scheduler:
	- http://alloyui.com/examples/scheduler/
	- http://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/overview#getting-started
	- http://docs.telerik.com/kendo-ui/intro/supporting/scripts-scheduling
	- https://codecanyon.net/item/tiva-timetable/17916231
	- https://codyhouse.co/gem/schedule-template/
	- https://fullcalendar.io/
+ Bootstrap:
	- http://getbootstrap.com/components/
	- http://getbootstrap.com/css/#buttons
+ Template:
	- https://wrappixel.com/ampleadmin/ampleadmin-html/ampleadmin-minimal/morris-chart.html
