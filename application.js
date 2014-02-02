$(document).ready(function() {
	//Function for adding a new checkbox with corresponding label.
	function addCheckbox(id, name) {
   		var container = $('#'+id);
   		var inputId = name.replace(/[\s"']/g, "");
   		$('<input />', { type: 'checkbox', id: inputId, value: inputId }).appendTo(container);
   		$('<label />', { 'for': inputId, text: name }).appendTo(container);
	}

	//Line-through or not a list item when its checkbox is checked or unchecked.
	$('#shoppingList').on('change','input[type=checkbox]',function(){
    	var itemLabel = $(this).parent().find('label');
    	if ($(this).is(':checked') ) {
        	$(itemLabel).css('textDecoration','line-through');
    	} else {
        	$(itemLabel).css('textDecoration','none');
    	};
	});
	//On click, takes the value of text field, checks for invaild inputs, and finally creates
	//a li element with input and label.
	$('#submit').click(function() {
		var name = $('#addItem').val();
		var id = name.replace(/[\s"']/g, "") .toLowerCase() + 'ListItem';
		if (name.replace(/[\s"']/g, "") == "") {
			alert("Please enter an actual item.");
		} else {
			$('<li />', {id: id}).appendTo('#shoppingList').ready(function() {addCheckbox(id, name)});
			var name = $('#addItem').val('');
		};
	});
	//On click function that selects all list items and cross them out.
	$('#selectAll').click(function() {
		$('li').each(function() {
			$(this).find('input').prop('checked', true);
			$(this).parent().find('label').css('textDecoration','line-through');
		});
	});
	//On click funtion that deselects all list items.
	$('#deselectAll').click(function() {
		$('li').each(function() {
			$(this).find('input').prop('checked', false);
			$(this).parent().find('label').css('textDecoration','none');
		});
	});
	//On click function that removes all selected list items.
	$('#removeSelected').click(function() {
		$('li').each(function() {	
			if($(this).find('input').is(':checked')) 
				$(this).remove();
		});
	});
	//On click function that compares and sorts the list items currently on the shopping list.
	$('#sortList').click(function() {
    	$('#shoppingList').children('li').sort(function(a, b) {
        	var upA = $(a).children('label').text().toUpperCase();
        	var upB = $(b).children('label').text().toUpperCase();
        	console.log(upA);
        	console.log(upB);
        	return (upA < upB) ? -1 : (upA > upB) ? 1 : 0;
    	}).appendTo('#shoppingList');
    })
});