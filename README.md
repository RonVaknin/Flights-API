# Flights API
 
## Instructions

* Install npm modules
* run server.js file

## Endpoints

### GET /flights/stats/total
get total flights, if country parameter exist filter by country
##### Parameters
* country - text [optional]


### GET /flights/stats/outbound
get total outbound flights, if country parameter exist filter by country
##### Parameters
* country - text [optional]


### GET /flights/stats/inbound
get total inbound flights, if country parameter exist filter by country

##### Parameters
* country - text [optional]

### GET flights/stats/delayed
get number of delayed flights

### GET flights/stats/popular
get the most popular city destination

### GET flights/getaway
if exist, get arrival and departure flights codes within 5 hours
