// var foodName = $(".food-choice").val().trim()
// console.log(foodName);
function calculateCalories(){
	var calorieCount = 0;
	$.each($(".list-title").children(), function(index,value){
		var addCalories = $(value).text();
		var calories = addCalories.match(/\d+/g).map(Number)
		calorieCount += calories[0];
	})
	console.log(calorieCount);
	$("#total").append(" " ,calorieCount," "," "," ");
	
}
function foodChoice() {
	var foodChoice = $(".food-choice").val().trim();
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://nutritionix-api.p.rapidapi.com/v1_1/search/" + foodChoice + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "250391abd2msh4726f31e05ef85bp1fff09jsnbc63edbdae23",
			"x-rapidapi-host": "nutritionix-api.p.rapidapi.com"
		}
	};
	// var totalCalories = calorieCount;
	$.ajax(settings).done(function (response) {
		console.log(response);
		
		var liEl = $("<li>").append(foodChoice + ":" + " " + response.hits[0].fields.nf_calories + " calories");
		
		$(".list-title").prepend(liEl)	;
		
		


	});
}

function caloriesBurned(){
	// var weight = $("#weight-input").val()
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://fitness-calculator.p.rapidapi.com/mets",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "250391abd2msh4726f31e05ef85bp1fff09jsnbc63edbdae23",
			"x-rapidapi-host": "fitness-calculator.p.rapidapi.com"
		}
	};
	
	$.ajax(settings).done(function (response) {
		console.log(response);
		var weight = parseInt(localStorage.getItem("weight"));
		console.log(weight);
		var bikingMets = response["bicycling"]["activity 8"]["MET"];
		console.log (bikingMets);
		var joggingMets = response["running"]["activity 473"]["MET"];
		console.log(joggingMets);
		var bikingCalorie30min = bikingMets * weight * (.454 * 3.5)/200* 30; 
		$("#total").append("",bikingCalorie30min);
	});
}

$(document).on("click","#total-calories", function(){
	
	calculateCalories();
	caloriesBurned();




	
})
$("#clear-btn").on("click", function(){
	$(".list-title").empty();
	$("#total").empty();

})

$(".add-to-list").on("click", function (event) {
	event.preventDefault();
	foodChoice();
})
$(".submit-button").on("click", function(event){
	event.preventDefault()
	var weight = $(".weight").val().trim();
	localStorage.setItem("weight", weight);
	
	
})