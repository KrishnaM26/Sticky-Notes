export function formatDate(date){
	return date.toLocaleDateString("en_US", {


	month: "short",
	day: "numeric",
	year: "numeric",


	});

	
}
