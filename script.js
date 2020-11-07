// var foodName = $(".food-choice").val().trim()
// console.log(foodName);
function calculateCalories(){
	var calorieCount = 0;
	$.each($(".list-title").children(), function(index,value){
		var addCalories = $(value).text();
		var calories = addCalories.match(/\d+/g).map(Number)
		// console.log(calories);
		// console.log(parseInt(addCalories));
		// calorieArr.push(calories[0])
		calorieCount += calories[0];
	})
	console.log(calorieCount);
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

	$.ajax(settings).done(function (response) {
		console.log(response);
		// var divEl = $("<div>").attr("id", "calories").append(foodChoice + ":" + " " + response.hits[0].fields.nf_calories + " calories");
		// $(".box").append(divEl);
		var liEl = $("<li>").append(foodChoice + ":" + " " + response.hits[0].fields.nf_calories + " calories");
		var addButton = $("<button>").addClass("add-btn").text("Add to List");
		$("#food-list").prepend(liEl,addButton)	;
		// var clearButton = $("<button>").addClass("reset-btn").text("Reset");

		// $("#clear").append(clearButton);
		
		


	});
}
$(document).on("click",".add-btn", function(){
	var listText = $(this).siblings()[0];
	$(".list-title").append(listText);
	$(this).remove();	
	calculateCalories();



	
})
$("#clear-btn").on("click", function(){
	$("#food-list").empty();
})

$(".submit-button").on("click", function (event) {
	event.preventDefault();
	foodChoice();
})