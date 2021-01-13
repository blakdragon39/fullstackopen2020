# 2.12* Data for countries, step1

The API https://restcountries.eu provides data for different countries in a machine-readable format, a so-called REST API.

Create an application, in which one can look at data of various countries. The application should probably get the data from the endpoint all.

The user interface is very simple. The country to be shown is found by typing a search query into the search field.

If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific

If there are ten or fewer countries, but more than one, then all countries matching the query are shown

When there is only one country matching the query, then the basic data of the country, its flag and the languages spoken there, are shown