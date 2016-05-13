// Reserved words
var reserved_words = [ ";" , 
                      "while",  "(" , ")", "{", "}" ,
                      "if", "else" , "=" , "<", ">" ,
                      "+", "-" , "*", "/"
                      ];

// Variables
var variables = [];
var variable_values = [];

function value_in_array(value,array){
   return array.indexOf(value) > -1;
}

function parse(){
   var code=document.getElementById("code_input").value;     

   // lowercase all
   code = code.toLowerCase();


   // Change keywords; "if(something)" => " if ( something ) "
   for( var n = 0; n < reserved_words.length ; n++){
      
      // Goddamit, hacky regex. Hours of pain and manuals.
      var re = new RegExp('\\'  + reserved_words[n], 'g');
      code = code.replace(re, ' ' + reserved_words[n] + ' ' );
   }
   
   // everything is separated with whitespace
   code = code.split(/\s+/g);  


   // remove empty elements
   for ( i = code.length-1 ; i >= 0; i--) {
      if( code[i][0] == "*" ){
         code.splice(i,1);
      }
      
      if ( code[i] === ""){
         code.splice(i,1);         
      }
   }

   // plop,=,1,;,while,(,plop,<,10,),{,plop,=,plop,+,1,;,}
   for( n =0 ; n<code.length ; n++){
      // is code[n] in reserved_words?
      if( value_in_array( code[n] , reserved_words )){
         // code[n] in reserved words
      
         if( code[n]  == '='){
            var statement = [];

            for( var i = n-1 ; code[+i] != ';' ; i++){
               statement.push(code[i]);
            }
            // where to store end result
            var to_where = variables.indexOf(statement[0]);
               
            // If there's just assignment
            if ( statement.length == 3 ){
               // is the right side number, variable or error?
               if ( (!isNaN(parseInt(statement[2]))) ){
                  // just number, assign it to left side
                  variable_values[to_where] = statement[2];
               }
               else if( value_in_array(statement[2] , variables) ){
                  // it was variable, assign it's value to left
                  variable_values[to_where] = variable_values[variables.indexOf(statement[2])];
               }
            }
         } 


      }
      // is it already in variables?
      else if( value_in_array( code[n] , variables)){
         // code[n] in variables
      }
      // is it number?
      else if( !isNaN(code[n])){
         // code[n] is number
      }
      // found new variable!
      else{
         variables.push(code[n]);
         variable_values.push(0);
      }
   }

   document.getElementById("output").innerHTML = code;

   var tmp = "";

   for ( var n=0; n< variables.length ; n++){
      tmp += " " + variables[n] + "=";
      tmp += variable_values[n] + " , ";
   }

   document.getElementById("vars").innerHTML = tmp;
}
