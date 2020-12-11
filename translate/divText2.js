
var countSpan=document.getElementById('count');
var message='';
var MAX_MESSAGE_BYTE=150;

var mFootCode=[
	00000,
	12593,
	12594,
	12595,
	12596,
	12597,
	12598,
	12599,
	12601,
	12602,
	12603,
	12604,
	12605,
	12606,
	12607,
	12608,
	12609,
	12610,
	12612,
	12613,
	12614,
	12615,
	12616,
	12618,
	12619,
	12620,
	12621,
	12622
];

function count(message)
{
	var totalByte=0;
	var length=message.length;
	
	for(var index=0; index<length; index++){
		var currentByte=message.charCodeAt(index);
		(currentByte>128)?totalByte += 2: totalByte++;
	}
	return totalByte;
}


function changeTextArea(e)
{
	console.log(e.key);

	const totalByte=count(e.target.textContent);
	
	if( totalByte <= MAX_MESSAGE_BYTE ){
		countSpan.innerText = totalByte.toString()+"/"+150;
		message=e.target.textContent;
	}else{
		countSpan.innerText=count(message).toString();
		e.target.textContent=message;
		return;
	}
	
	
	//if( e.key == "Enter" || e.key == "." ){
		var ta=document.getElementById("TA");
		var _text = ta.textContent;
		traslate(_text);
	//}
	
	
}


function traslate(_text)
{
	var _isUnder=false;
	var _uniCode;
	
	var _headCode;
	var _footCode;
	var _idx;
	var _temp=[];
	
	var _headTxt;
	var _footTxt;
	
	for( var i=0; i<_text.length; i++){
		
		_uniCode=_text.charCodeAt(i);
		
		_isUnder = checkBatchimEnding(_uniCode);
		if( _isUnder ){
			_headCode = _uniCode - ( (_uniCode-44032)%28 );
			_idx = (_uniCode-44032)%28;
			_footCode = mFootCode[_idx];
			
			
			_headTxt = String.fromCharCode( parseInt(_headCode.toString(16),16) )
			_footTxt = String.fromCharCode( parseInt(_footCode.toString(16),16) )
			
			_temp.push(_headTxt);
			_temp.push(_footTxt);
		}else{
			_temp.push(String.fromCharCode( parseInt(_text.charCodeAt(i).toString(16),16) ));
		}
	}
	
	
	var _fullStr = _temp.join(""); 
	
	var ta=document.getElementById("OTA");
	ta.textContent = _fullStr;
	
	
}


function checkBatchimEnding(uni) 
{
	if (uni < 44032 || uni > 55203) return false;
	
	return (uni - 44032) % 28 != 0;
}



function copy2Clipboard() 
{
	  /* Get the text field */
	  var copyText = document.getElementById("OTA");

	  /* Select the text field */
	  copyText.select();
	  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

	  /* Copy the text inside the text field */
	  document.execCommand("copy");

	  /* Alert the copied text */
	  alert("Copied the text: " + copyText.value);
}

function CopyToClipboard() {
    var elm = document.getElementById("OTA");
    // for Internet Explorer
  
    if(document.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(elm);
      range.select();
      document.execCommand("Copy");
      alert("복사 되었습니다.");
    }
    else if(window.getSelection) {
      // other browsers
  
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(elm);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
      alert("복사 되었습니다.");
    }
  }

function setText()
{
	var ta=document.getElementById("TA");
	ta.textContent= "안녕하세요.";
	traslate("안녕하세요.");
}

setText();