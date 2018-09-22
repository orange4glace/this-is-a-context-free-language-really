S -> STATEMENTS {% id %}

STATEMENTS -> S_if {% id %}
            | S_assign {% id %}
            | S_alias_assign {% id %}
			      | S_for {% id %}
			      | EXPRESSIONS {% id %}
			
EXPRESSIONS -> E_arithmetic {% id %}
			       | E_compare {% id %}
			       | E_alert {% id %}

S_assign -> E_address _ R_is _ EXPRESSIONS {%
	function (d) {
		return { type: "S_assign", d: d, key: d[0], v: d[4] }
	}
%}

S_alias_assign -> E_alias _ R_is _ E_address {%
	function (d) {
		return { type: "S_alias_assign", d: d, key: d[0], v: d[4] }
	}
%}

S_if -> S_if1 {% id %}
      | S_if2 {% id %}

S_if1 -> "혹시 " _ EXPRESSIONS _ ("니?"|"이니?"|"야?") _ "그럼" NL S_if1 NL "아니면" NL S_if1 {%
	function(d) {
		return { type: "S_if", d: d, cond: d[2], then: d[8], else: d[12] }
	}
%}
       | (STATEMENTS NL):+ "해줘"  {%
	function(d) {
		return { type: "S_statements", d: d, statements: d[0].map(r => r[0]) }
	}
%}

S_if2 -> "혹시 " _ EXPRESSIONS _ ("니?"|"이니?"|"야?") _ "그럼" NL S_if {%
	function(d) {
		return { type: "S_if", d: d, cond: d[2], then: d[8], else: {type: "NO_OP"} }
	}
%}
       | "혹시 " _ EXPRESSIONS _ ("니?"|"이니?"|"야?") _ "그럼" NL S_if1 NL "아니면" NL S_if2 {%
	function(d) {
		return { type: "S_if", d: d, cond: d[2], then: d[8], else: d[12] }
	}
%}


S_for -> EXPRESSIONS _ "일 때 까지" _ "\n" (STATEMENTS "\n"):+ "해줘" {%
	function(d) {
		return {
			type:"S_for",
			cond: d[0],
			statements: { type: "S_statements", statements: d[5].map(r => r[0]) }
		}
	}
%}

E_address -> "[" E_address_ "]" {%
	function (data) { return {  type: "E_address", v: data[1] } }
%}
E_address_ -> [가-힣]:+ {%
	function (data) {
		return data[0].join('')
	}
%}

E_alias -> "{" E_alias_ "}" {%
	function (data) { return {  type: "E_alias", v: data[1] } }
%}
E_alias_ -> [가-힣]:+ {%
	function (data) {
		return data[0].join('')
	}
%}

E_value -> E_address {%
	function(d) { return { type: "E_value", d: d, key: d[0].v } }
%}

E_alias_value -> E_alias {%
  function(d) { return { type: "E_alias_value", d: d, key: d[0].v } }
%}

E_valuable -> E_value {% id %}
            | E_alias_value {% id %}
			      | E_number {% id %}
		      	| E_string {% id %}

E_arithmetic -> E_arithmetic _ "더하기" _ E_arithmetic2 {%
	function(d) { return { type: "E_add", d: d, lhs:d[0], rhs:d[4] } }
%}           |  E_arithmetic _ "빼기" _ E_arithmetic2 {%
	function(d) { return { type: "E_sub", d: d, lhs:d[0], rhs:d[4] } }
%}           | E_arithmetic2 {% id %}
E_arithmetic2 -> E_arithmetic2 _ "곱하기" _ E_arithmetic_terminal {%
	function(d) { return { type: "E_mul", d: d, lhs:d[0], rhs:d[4] } }
%}             | E_arithmetic2 _ "나누기" _ E_arithmetic_terminal {%
	function(d) { return { type: "E_div", d: d, lhs:d[0], rhs:d[4] } }
%}             | E_arithmetic_terminal {% id %}
E_arithmetic_terminal -> E_valuable {% id %}

E_compare -> EXPRESSIONS _ R_iis _ EXPRESSIONS _ "보다 크다" {%
	function (d) { return {
		type: "E_gt", d: d, lhs: d[0], rhs: d[4] } } %}
		       | EXPRESSIONS _ R_iis _ EXPRESSIONS _ "보다 작다" {%
	function (d) { return {
		type: "E_lt", d: d, lhs: d[0], rhs: d[4] } } %}
		       | EXPRESSIONS _ R_iis _ EXPRESSIONS _ "보다 크거나 같다" {%
	function (d) { return {
		type: "E_gte", d: d, lhs: d[0], rhs: d[4] } } %}
	    	   | EXPRESSIONS _ R_iis _ EXPRESSIONS _ "보다 작거나 같다" {%
	function (d) { return {
		type: "E_lte", d: d, lhs: d[0], rhs: d[4] } } %}
           | EXPRESSIONS _ R_iis _ EXPRESSIONS _ ("와"|"과") " 같다" {%
	function (d) { return {
		type: "E_eq", d: d, lhs: d[0], rhs: d[4] } } %}
		
E_alert -> "뿅" _ [!]:+ _ "(" _ E_alert_ _ ")" {%
	function (d) { return {
		type: "E_alert", d: d, style: d[2].length, v: d[6] } }
%}
E_alert_ -> E_alert_ _ "," _ EXPRESSIONS {%
	function (d) {
		return d[0].concat(d[4])
	}
%}
		      | EXPRESSIONS {%
	function (d) {
		return d;
	}
%}

E_number -> [0-9]:+ {% function(d) {return {type: "E_number", v:+d[0].join("")}} %}

E_string -> "'" E_string_ "'" {% function(d) {return d[1]} %}
E_string_ -> [가-힣|\s|0-9|!?\.,\[\]\*\+-/]:+ {% function(d) {return {type: "E_string", v:d[0].join("")}} %}

R_is -> "는" {% id %}
      | "은" {% id %}
	  
R_iis -> "가" {% id %}
       | "이" {% id %}
	     | "이가" {% id %}


_ -> [\s]:*     {% function(d) {return null } %}
NL -> [\s|\r\n]:*     {% function(d) {return null } %}