var foodName

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search?query="+foodName+"&offset=0&number=10&maxCalories=5000&minProtein=0&maxProtein=100&minFat=0&maxFat=100&minCarbs=0&maxCarbs=100&minCalories=0",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "250391abd2msh4726f31e05ef85bp1fff09jsnbc63edbdae23",
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
};
$.ajax(settings).done(function (response) {
	console.log(response);
});