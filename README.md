# Menachem

# &nbsp;Hershkop

# &nbsp;chermon 

# 316611649



In the program before us there is an event management system.

Any existing user can add an event or buy tickets for an event.

Important to note. Every sending request requires being registered in the system, except for a user registration request.

Sample codes:

&nbsp;curl -X POST -H "Content-Type: application/json" -d '{"eventName":"mitupl", "ticketsForSale":12, "username":"dani", "password":"didan"}' http://localhost:3000/creator/event



&nbsp;curl -X POST -H "Content-Type: application/json" -d '{"username":"dani", "password":"didan", "eventName":"mitup", "quantity":3}' http://localhost:3000/users/tickets/buy

&nbsp;curl -X POST -H "Content-Type: application/json" -d '{"username":"avi", "password":12345}' http://localhost:3000/user/register



