# Target Audience
The main target audience is IKEA Logan, Cashline Department. Additionally, the application will work for any retail or food business involving shift work. 

# Business Challenge
The Cashline Department is where people pay. It's where the cashiers and self-serve registers are. On any given day, there are a number of cashiers working, and each of them are entitled to a certain number of breaks based on the length of their shift. It is a business requirement that all of these breaks be fullfilled by a certain time, the Goal. 

The issue is that there are occasions where the cashier in charge of breaks (the Floater) falls behind git@github.com:s3477631/FinalAssignment-Documentation.gitl time. This is due to a lack of infrastructure surrounding how these breaks are planned, and also the unpredictability of queue times. 

# Purpose
The purpose of this application is to solve or relieve the aforementioned painpoints: 
 - breaks not being completed on time
 - reduce occasions where managers have to step in to support breaks 

# Features
The app will solve the Business Challenge through the proposed process and features: 
1. Manager uploads break roster to the App
2. The App will generate a "break schedule" based on the number of floaters and the time that breaks should be completed
3. On the day, the floater(s) will access this break schedule via their phone, checking breaks off as they go
4. The App will notify the floater to seek assistance if it determines that the floater will not finish in time
5. Stats such as actual break durations, final finishing time, how many times a manager was called, can be retrieved for the manager's info afterwards. Managers can use this information to roster extra support and provide feedback to Floaters. 

# User Stories
- As Floater, I want to be able to check off breaks as I go, so I can keep track of what breaks are done
- As Floater, I want to see how many breaks I have left to do, so I can get an idea of when I will finish
- As Floater, I want to see what breaks I have to do next, so I can prepare ahead of time
- As Floater, I want breaks to be scheduled for me, so I don't have to think of who's break to do next
- As Floater, I want to see if I'm behind in my breaks, so I can ask for assistance before it gets too late
- As Manager, I want to generate a break schedule, so Floaters have a better chance of finishing on time
- As Manager, I want to enable Floaters to be more effective, so I don't have to step in during the day
- As Manager, I want to see how the floaters are performing, so I can roster extra support if necessary
- As Manager, I want to see if employees are coming back from their breaks on time, so I can take disciplinary action if necessary

# Trello Board 

![Trello Board](https://github.com/s3477631/FinalAssignment-Documentation/blob/master/docs/Trello.png)


# Application Architecture Diagram

![Application Architecture Diagram](https://github.com/s3477631/FinalAssignment-Documentation/blob/master/docs/AAD.jpg)

# Dataflow diagram

![Data Flow Diagram](https://github.com/s3477631/FinalAssignment-Documentation/blob/master/docs/break-scheduler-dfd.png)

