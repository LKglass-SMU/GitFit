
var foods = [];
function calculateCalories(shouldSubtract){
	var calorieCount = 0;
	
	for (var i = 0; i < foods.length; i++){
		console.log(foods[i].calories);
			calorieCount += foods[i].calories;
	}
	console.log(calorieCount);
	$("#total").text (calorieCount);
	localStorage.setItem("calories", calorieCount);

	
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
		var itemDiv = $("<div>").attr("style", "display: flex; justify-content: space-between; width: 70%").attr("id",response.hits[0]._id);
		var resetButton = $("<button>").addClass("delete-btn").text("delete");
		var liEl = $("<div>").text(foodChoice + ":" + " " + response.hits[0].fields.nf_calories + " calories").addClass("li-tag");
		itemDiv.append(liEl, resetButton)
		$(".list-title").prepend(itemDiv)
		console.log(liEl);
		foods.push({foodId: response.hits[0]._id, calories: response.hits[0].fields.nf_calories});
		var foodInput = $(".food-choice").val();
		if(!foodInput){
			alert("Must enter a value");
			return;	
		};
		
		$("#todo-text").val("");
		calculateCalories();
		
		


	});
}

function caloriesBurned(){
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
		var weight = (localStorage.getItem("weight"));
		console.log(weight);
		var bikingMets = response["bicycling"]["activity 8"]["MET"];
		console.log (bikingMets);
		var joggingMets = response["running"]["activity 473"]["MET"];
		console.log(joggingMets);
		var bikingCalorie30min = bikingMets * weight * (.454 * 3.5)/200* 30; 
		console.log(bikingCalorie30min);
		var yogaMets = response["conditioning exercise"]["activity 68"]["MET"];
		console.log(yogaMets);
		var walkingMets = response["home activities"]["activity 192"]["MET"];
		console.log(walkingMets);
		var circuitTrainingMets = response["conditioning exercise"]["activity 36"]["MET"];
		console.log(circuitTrainingMets);
		var weightliftingMets = response["conditioning exercise"]["activity 36"]["MET"];
		console.log(weightliftingMets);
		var highImpactDanceMets = response["dancing"]["activity 82"]["MET"];	
		console.log(highImpactDanceMets);
		var lowImpactDanceMets = response["dancing"]["activity 81"]["MET"];
		console.log(lowImpactDanceMets);
		var ellipticalMets = response["conditioning exercise"]["activity 38"]["MET"];
		console.log(ellipticalMets);
		var pilatesMets = response["conditioning exercise"]["activity 57"]["MET"];
		console.log(pilatesMets);
		var metFormula = (.454 *3.5)/200*30;
		var bikingCalorie30min = bikingMets * weight * metFormula;
		var joggingCalorie30min = joggingMets * weight * metFormula;
		var yogaCalorie30min = yogaMets * weight * metFormula;
		var walkingCalorie30min = walkingMets * weight * metFormula;
		var circuitTraining30min = circuitTrainingMets * weight * metFormula;
		var weightlifting30min = weightliftingMets * weight * metFormula;
		var highImpactDance30min = highImpactDanceMets * weight * metFormula;
		var lowImpactDance30min = lowImpactDanceMets * weight * metFormula;
		

		$("#running-calories").append("",Math.floor(joggingCalorie30min));
		$("#cycling-calories").append("",Math.floor(bikingCalorie30min));
		$("#yoga-calories").append("",Math.floor(yogaCalorie30min));
		$("#walking-calories").append("",Math.floor(walkingCalorie30min));
		$("#circuit-calories").append("",Math.floor(circuitTraining30min));
		$("#weight-calories").append("",Math.floor(weightlifting30min));
		$("#dance-calories").append("",Math.floor(highImpactDance30min));
		$("#low-impact-dance-calories").append("",Math.floor(lowImpactDance30min));

		
	});
}


$(document).on("click","#weight-submit-button", function(event){
	event.preventDefault();
	console.log("hello");	
	var weightInput = $("#weight-text").val();
	
	if(!weightInput){
		return;	
		
	};
	
	console.log(weightInput);
	localStorage.setItem("weight", weightInput);
	

	caloriesBurned();




	
})

$(document).on("click",".delete-btn", function(){
	var removeFoodId = parseInt($(this).parent().attr("id"));
	var removeFoodIndex = foods.findIndex(function(food){
		return food.foodId === removeFoodId;

	});
	foods.splice(removeFoodIndex,1);
	calculateCalories();
	console.log(foods);
	
	$(this).siblings().remove();
	$(this).remove();
	
})



$("#clear-btn").on("click", function(){
	$(".list-title").empty();
	$("#total").empty();

})

$(".add-to-list").on("click", function (event) {
	event.preventDefault();
	foodChoice();
	
})


var totalFoodCalories = localStorage.getItem("calories");
$("#repeat-calories").text(totalFoodCalories);