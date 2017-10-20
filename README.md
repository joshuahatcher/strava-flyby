# FlyBy
An app for connecting athletes using the Strava API

## The skinny
Strava is an application used for runners and other athletes to track their workouts (usually using data from a GPS watch), and to connect with other athletes in a social media-style environment.
FlyBy was initially intended to use Strava's open API to provide a method of sorting through a Strava user's connections to find the ones that might be most useful to them across varying dimensions (running routes, average pace, gear, etc.). Because the Strava API is very limited, I have started by making it a tool primarily to find running buddies based on average mile pace of recent activities.

This app was used as a context for me to practice using environments/frameworks I was less familiar with (in this case, Node and React Router) and it is still very much in development. For future updates, please see below under [Future Updates](#user-content-future-updates).

## Running the app locally
You can run this app on your local system, but first you must set up private keys in order to properly authenticate with the Strava API's OAuth flow. __NOTE:__ To use this app, you will have to have an account with Strava. You can sign up for a free account at http://strava.com.

### Steps
You will only need to run steps 1-6 once.

1. Clone this repo
2. Navigate to Strava's [developer site](http://labs.strava.com/developers/) and click the link under the "Getting Started" menu to register an app (you aren't actually creating an app here, but the system will give you a personal Client ID and Client Secret which you will need to authenticate to the API).
3. Once you have created a new app, you should have a __Client ID__ and __Client Secret__ on your [My API Application](https://www.strava.com/settings/api) page. Do not share these with anyone.
4. In your local copy of this repo, navigate to the api-keys.temp.js file.
5. Replace the placeholder text `<clientId>` and `<clientSecret>` with your new Client ID and Client Secret respectively (make sure both are strings).
6. Rename this file to __api-keys.js__ (remove "temp.") and save. By default, this file will be ignored by git during commits.
7. Run `npm start` in your terminal.
8. Navigate to `localhost:8080` to use the app. You will be prompted to log in through Strava, and then play around all you like.
9. If you close your browser and ever want to run this app again, simply run steps 7-8 again (assuming you didn't delete your api-keys.js file).

## Future Updates
Because of the limits of the Strava API, I limited the app's functionality to suggesting other runners to connect with based solely on pace. Eventually, I plan to allow users to filter their connections across varying dimensions. This will allow users not only to find running companions (similar pace), but to find other users with similar gear, who run similar routes, or who are related for a slew of other reasons. However, such updates will require either that the Strava API expand, or that the app have its own database separate from to the API to store voluntarily-provided user data that Strava does not make public via the API.

My ultimate goal of FlyBy is to make it into a sort of friend-making/dating app for athletes. I would like it to have users actually sign up as users *with* FlyBy (rather than just accessing them through Strava data). With its own users stored in a database, the app will ingest data not stored in Strava that the users voluntarily provide, such as extra photos, sexual preference, etc. to help users connect with others based not solely on the dimensions Strava provides, and make matches accordingly. This is a bit down the road, though.
