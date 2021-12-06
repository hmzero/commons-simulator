var resources = 100;

var end = false;
var tragedy = false;

setTimeout(loopCall, PARAMS.speed);

function loopCall()
{
	console.log(PARAMS.resources)
	
	// Add resources
	resources += PARAMS.regen_rate;

	// Remove resources
	resources -= PARAMS.consumers;

	// Cap and floor
	if(resources > 100) resources = 100;

	if(resources < 0) 
	{
		resources = 0;
		if(!tragedy) end = true
		tragedy = true;
	}
	else tragedy = false;

	// Update GUI
	PARAMS.resources = resources;

	setTimeout(loopCall, PARAMS.speed);
}