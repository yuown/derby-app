function getObjectFromId(array, id) {
	for (var int = 0; int < array.length; int++) {
		var every = array[int];
		if (every.id == id) {
			return every;
		}
	}
	return null;
}

function getObjectFromName(array, name) {
    for (var int = 0; int < array.length; int++) {
        var every = array[int];
        if (every.name == name) {
            return every;
        }
    }
    return null;
}

function contains(array, obj, fieldName) {
    for (var int = 0; int < array.length; int++) {
        var every = array[int];
        if (every[fieldName] == obj[fieldName]) {
            return true;
        }
    }
}

function json2csv(dataArray) {
	var output = '';
	for (var i = 0; i < dataArray.length; i++) {
		if (i == 0) {
			output = stringify(getComponents(dataArray, i, 'key'));
		}
		output += stringify(getComponents(dataArray, i, 'value'));
	}
	return output;
}

function stringify(json) {
	var stringified = JSON.stringify(json);
	stringified = stringified.replace('[', '');
	stringified = stringified.replace(']', '');

	stringified += "\n";
	return stringified;
}

function getComponents(array, i, comp) {
	var returnArray = [];
	var keyed = '';
	$.each(array[i], function(key, value) {
		if (comp == 'key') {
			var k = convertKey(key);
			if (k) {
				returnArray.push(k);
			} else {
				keyed = key;
				$.each(array, function(key1, value1) {
					delete value1[keyed];
				});
			}
		} else if (comp == 'value') {
			returnArray.push(value);
		}
	});
	return returnArray;
}

function roundTo2Decimals(amount) {
	return parseFloat(Math.round((amount) * 100) / 100).toFixed(2);
}

function roundTo3Decimals(amount) {
	return parseFloat(Math.round((amount) * 1000) / 1000).toFixed(3);
}