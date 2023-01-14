// Get ToC div
toc = document.getElementById("ToC");

//Add a header
tocHeader = document.createElement("div");
tocHeader.innerText="Table of Contents";
tocHeader.className = "tocTitle";
toc.appendChild(tocHeader);
   
// Create a list for the ToC entries
tocList = document.createElement("span");    

// Get the h3 tags - ToC entries
headers = document.querySelectorAll("h1,h2");

var inAppendix = 0;
var wroteCategory = [];

const isEmoji = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;

const indexCategories = [
    'Adventures: Seeds,',
    'Adventures: Geographic,',
    'Aliens: ',
    'Background: Geographic,',
    'Equipment: ',
    'Reviews: '    
];



for (i = 1; i < headers.length; i++){

    var thisEntry = headers[i].innerText;
    
    // Create an id
    name = thisEntry.replace(/[^a-zA-Z0-9-_]/g,'-').replace(/^-*/,'').replace(/-+/g,'-').toLowerCase();
    headers[i].id=name;

    var thisEmoji = thisEntry.match(isEmoji);
    thisEntry = thisEntry.replace(thisEmoji,'').replace(/^[^a-zA-Z0-9]/,'');
	    
    // a list item for the entry
    tocListItem = document.createElement("div");

    // Only Display the Appendix H1s	

    if (headers[i].nodeName == "H1" &&
	thisEntry.match(/Appendix/)) {

	if (!inAppendix) {
   	    inAppendix = 1;
	    tocLine = document.createElement("hr");
	    tocLine.className = "tocLine";
	    tocListItem.appendChild(tocLine);

	}
	    
        tocAppendix = document.createElement("a");
	tocAppendix.setAttribute("href","#"+name);
        tocAppendix.style.color = "black";
	tocAppendix.style.fontStyle = "italic";
        tocAppendix.innerText= thisEntry.trim();
        tocListItem.appendChild(tocAppendix);

	// Only Display H2s if Not in Appendix & if Emoji Exists
		
    } else if (!inAppendix && thisEmoji) {

	var hasPrefix = 0;
	matchedCategory = indexCategories.filter(v => (thisEntry.match(v)));

	if (matchedCategory.length) {

	    thisMatch = matchedCategory[0];
	    
	    // First Time? List that category!
	    
	    if (!wroteCategory[thisMatch]) {
		wroteCategory[thisMatch] = 1;

		tocEmoji = document.createElement("span");
		tocEmoji.style.display = "table-cell";
		tocEmoji.style.width = "1.5em";
		tocEmoji.innerText = thisEmoji;
		tocListItem.appendChild(tocEmoji);
	
		tocCategory = document.createElement("a");
		tocCategory.setAttribute("href","#"+name);
		tocCategory.style.color = "black";
		tocCategory.style.display = "table-cell";
		tocCategory.innerText=thisMatch.replace(/,\s*$/,'').replace(/:\s*?$/,'').trim();
		tocListItem.appendChild(tocCategory);

		tocList.appendChild(tocListItem);		
		tocListItem = document.createElement("div");		

	    }

	    // Rewrite Emoji & Entry for Subcategories
	    
	    thisEmoji = '';
	    
	    thisPrefix = document.createElement("span");
	    thisPrefix.style.display = "table-cell";
	    thisPrefix.style.width = "1.5em";
	    thisPrefix.innerText  = '⟣ '
	    hasPrefix = 1;
	    
	    thisEntry =thisEntry.replace(thisMatch,'').replace(/^[^a-zA-Z0-9]/,'');
	      
        }


        tocEmoji = document.createElement("span");
	tocEmoji.style.display = "table-cell";
	tocEmoji.style.width = "1.5em";
        tocEmoji.innerText = thisEmoji;
        tocListItem.appendChild(tocEmoji);

	if (hasPrefix) {
	    tocListItem.appendChild(thisPrefix);
	}
	
        tocEntry = document.createElement("a");
        tocEntry.setAttribute("href","#"+name);
        tocEntry.style.color = "black";
	tocEntry.style.display = "table-cell";	      
        tocEntry.innerText= thisEntry.replace(/\d$/,'').trim();
	    
        tocListItem.appendChild(tocEntry);

	      
    }

    tocList.appendChild(tocListItem);

}
toc.appendChild(tocList);
