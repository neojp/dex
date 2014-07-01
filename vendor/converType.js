var convertType = function (value){
	var v = Number(value);
	return !isNaN(v) ? v : 
			value === "undefined" ? undefined
			: value === "null" ? null
			: value === "true" ? true
			: value === "false" ? false
			: value
};