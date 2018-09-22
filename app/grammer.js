// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "S", "symbols": ["STATEMENTS"], "postprocess": id},
    {"name": "STATEMENTS", "symbols": ["S_if"], "postprocess": id},
    {"name": "STATEMENTS", "symbols": ["S_assign"], "postprocess": id},
    {"name": "STATEMENTS", "symbols": ["S_alias_assign"], "postprocess": id},
    {"name": "STATEMENTS", "symbols": ["S_for"], "postprocess": id},
    {"name": "STATEMENTS", "symbols": ["EXPRESSIONS"], "postprocess": id},
    {"name": "EXPRESSIONS", "symbols": ["E_arithmetic"], "postprocess": id},
    {"name": "EXPRESSIONS", "symbols": ["E_compare"], "postprocess": id},
    {"name": "EXPRESSIONS", "symbols": ["E_alert"], "postprocess": id},
    {"name": "S_assign", "symbols": ["E_address", "_", "R_is", "_", "EXPRESSIONS"], "postprocess": 
        function (d) {
        	return { type: "S_assign", d: d, key: d[0], v: d[4] }
        }
        },
    {"name": "S_alias_assign", "symbols": ["E_alias", "_", "R_is", "_", "E_address"], "postprocess": 
        function (d) {
        	return { type: "S_alias_assign", d: d, key: d[0], v: d[4] }
        }
        },
    {"name": "S_if", "symbols": ["S_if1"], "postprocess": id},
    {"name": "S_if", "symbols": ["S_if2"], "postprocess": id},
    {"name": "S_if1$string$1", "symbols": [{"literal":"혹"}, {"literal":"시"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if1$subexpression$1$string$1", "symbols": [{"literal":"니"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if1$subexpression$1", "symbols": ["S_if1$subexpression$1$string$1"]},
    {"name": "S_if1$subexpression$1$string$2", "symbols": [{"literal":"이"}, {"literal":"니"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if1$subexpression$1", "symbols": ["S_if1$subexpression$1$string$2"]},
    {"name": "S_if1$subexpression$1$string$3", "symbols": [{"literal":"야"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if1$subexpression$1", "symbols": ["S_if1$subexpression$1$string$3"]},
    {"name": "S_if1$string$2", "symbols": [{"literal":"그"}, {"literal":"럼"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if1$string$3", "symbols": [{"literal":"아"}, {"literal":"니"}, {"literal":"면"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if1", "symbols": ["S_if1$string$1", "_", "EXPRESSIONS", "_", "S_if1$subexpression$1", "_", "S_if1$string$2", "NL", "S_if1", "NL", "S_if1$string$3", "NL", "S_if1"], "postprocess": 
        function(d) {
        	return { type: "S_if", d: d, cond: d[2], then: d[8], else: d[12] }
        }
        },
    {"name": "S_if1$ebnf$1$subexpression$1", "symbols": ["STATEMENTS", "NL"]},
    {"name": "S_if1$ebnf$1", "symbols": ["S_if1$ebnf$1$subexpression$1"]},
    {"name": "S_if1$ebnf$1$subexpression$2", "symbols": ["STATEMENTS", "NL"]},
    {"name": "S_if1$ebnf$1", "symbols": ["S_if1$ebnf$1", "S_if1$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "S_if1$string$4", "symbols": [{"literal":"해"}, {"literal":"줘"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if1", "symbols": ["S_if1$ebnf$1", "S_if1$string$4"], "postprocess": 
        function(d) {
        	return { type: "S_statements", d: d, statements: d[0].map(r => r[0]) }
        }
        },
    {"name": "S_if2$string$1", "symbols": [{"literal":"혹"}, {"literal":"시"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2$subexpression$1$string$1", "symbols": [{"literal":"니"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2$subexpression$1", "symbols": ["S_if2$subexpression$1$string$1"]},
    {"name": "S_if2$subexpression$1$string$2", "symbols": [{"literal":"이"}, {"literal":"니"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2$subexpression$1", "symbols": ["S_if2$subexpression$1$string$2"]},
    {"name": "S_if2$subexpression$1$string$3", "symbols": [{"literal":"야"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2$subexpression$1", "symbols": ["S_if2$subexpression$1$string$3"]},
    {"name": "S_if2$string$2", "symbols": [{"literal":"그"}, {"literal":"럼"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2", "symbols": ["S_if2$string$1", "_", "EXPRESSIONS", "_", "S_if2$subexpression$1", "_", "S_if2$string$2", "NL", "S_if"], "postprocess": 
        function(d) {
        	return { type: "S_if", d: d, cond: d[2], then: d[8], else: {type: "NO_OP"} }
        }
        },
    {"name": "S_if2$string$3", "symbols": [{"literal":"혹"}, {"literal":"시"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2$subexpression$2$string$1", "symbols": [{"literal":"니"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2$subexpression$2", "symbols": ["S_if2$subexpression$2$string$1"]},
    {"name": "S_if2$subexpression$2$string$2", "symbols": [{"literal":"이"}, {"literal":"니"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2$subexpression$2", "symbols": ["S_if2$subexpression$2$string$2"]},
    {"name": "S_if2$subexpression$2$string$3", "symbols": [{"literal":"야"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2$subexpression$2", "symbols": ["S_if2$subexpression$2$string$3"]},
    {"name": "S_if2$string$4", "symbols": [{"literal":"그"}, {"literal":"럼"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2$string$5", "symbols": [{"literal":"아"}, {"literal":"니"}, {"literal":"면"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_if2", "symbols": ["S_if2$string$3", "_", "EXPRESSIONS", "_", "S_if2$subexpression$2", "_", "S_if2$string$4", "NL", "S_if1", "NL", "S_if2$string$5", "NL", "S_if2"], "postprocess": 
        function(d) {
        	return { type: "S_if", d: d, cond: d[2], then: d[8], else: d[12] }
        }
        },
    {"name": "S_for$string$1", "symbols": [{"literal":"일"}, {"literal":" "}, {"literal":"때"}, {"literal":" "}, {"literal":"까"}, {"literal":"지"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_for$ebnf$1$subexpression$1", "symbols": ["STATEMENTS", {"literal":"\n"}]},
    {"name": "S_for$ebnf$1", "symbols": ["S_for$ebnf$1$subexpression$1"]},
    {"name": "S_for$ebnf$1$subexpression$2", "symbols": ["STATEMENTS", {"literal":"\n"}]},
    {"name": "S_for$ebnf$1", "symbols": ["S_for$ebnf$1", "S_for$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "S_for$string$2", "symbols": [{"literal":"해"}, {"literal":"줘"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "S_for", "symbols": ["EXPRESSIONS", "_", "S_for$string$1", "_", {"literal":"\n"}, "S_for$ebnf$1", "S_for$string$2"], "postprocess": 
        function(d) {
        	return {
        		type:"S_for",
        		cond: d[0],
        		statements: { type: "S_statements", statements: d[5].map(r => r[0]) }
        	}
        }
        },
    {"name": "E_address", "symbols": [{"literal":"["}, "E_address_", {"literal":"]"}], "postprocess": 
        function (data) { return {  type: "E_address", v: data[1] } }
        },
    {"name": "E_address_$ebnf$1", "symbols": [/[가-힣]/]},
    {"name": "E_address_$ebnf$1", "symbols": ["E_address_$ebnf$1", /[가-힣]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "E_address_", "symbols": ["E_address_$ebnf$1"], "postprocess": 
        function (data) {
        	return data[0].join('')
        }
        },
    {"name": "E_alias", "symbols": [{"literal":"{"}, "E_alias_", {"literal":"}"}], "postprocess": 
        function (data) { return {  type: "E_alias", v: data[1] } }
        },
    {"name": "E_alias_$ebnf$1", "symbols": [/[가-힣]/]},
    {"name": "E_alias_$ebnf$1", "symbols": ["E_alias_$ebnf$1", /[가-힣]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "E_alias_", "symbols": ["E_alias_$ebnf$1"], "postprocess": 
        function (data) {
        	return data[0].join('')
        }
        },
    {"name": "E_value", "symbols": ["E_address"], "postprocess": 
        function(d) { return { type: "E_value", d: d, key: d[0].v } }
        },
    {"name": "E_alias_value", "symbols": ["E_alias"], "postprocess": 
        function(d) { return { type: "E_alias_value", d: d, key: d[0].v } }
        },
    {"name": "E_valuable", "symbols": ["E_value"], "postprocess": id},
    {"name": "E_valuable", "symbols": ["E_alias_value"], "postprocess": id},
    {"name": "E_valuable", "symbols": ["E_number"], "postprocess": id},
    {"name": "E_valuable", "symbols": ["E_string"], "postprocess": id},
    {"name": "E_arithmetic$string$1", "symbols": [{"literal":"더"}, {"literal":"하"}, {"literal":"기"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E_arithmetic", "symbols": ["E_arithmetic", "_", "E_arithmetic$string$1", "_", "E_arithmetic2"], "postprocess": 
        function(d) { return { type: "E_add", d: d, lhs:d[0], rhs:d[4] } }
        },
    {"name": "E_arithmetic$string$2", "symbols": [{"literal":"빼"}, {"literal":"기"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E_arithmetic", "symbols": ["E_arithmetic", "_", "E_arithmetic$string$2", "_", "E_arithmetic2"], "postprocess": 
        function(d) { return { type: "E_sub", d: d, lhs:d[0], rhs:d[4] } }
        },
    {"name": "E_arithmetic", "symbols": ["E_arithmetic2"], "postprocess": id},
    {"name": "E_arithmetic2$string$1", "symbols": [{"literal":"곱"}, {"literal":"하"}, {"literal":"기"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E_arithmetic2", "symbols": ["E_arithmetic2", "_", "E_arithmetic2$string$1", "_", "E_arithmetic_terminal"], "postprocess": 
        function(d) { return { type: "E_mul", d: d, lhs:d[0], rhs:d[4] } }
        },
    {"name": "E_arithmetic2$string$2", "symbols": [{"literal":"나"}, {"literal":"누"}, {"literal":"기"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E_arithmetic2", "symbols": ["E_arithmetic2", "_", "E_arithmetic2$string$2", "_", "E_arithmetic_terminal"], "postprocess": 
        function(d) { return { type: "E_div", d: d, lhs:d[0], rhs:d[4] } }
        },
    {"name": "E_arithmetic2", "symbols": ["E_arithmetic_terminal"], "postprocess": id},
    {"name": "E_arithmetic_terminal", "symbols": ["E_valuable"], "postprocess": id},
    {"name": "E_compare$string$1", "symbols": [{"literal":"보"}, {"literal":"다"}, {"literal":" "}, {"literal":"크"}, {"literal":"다"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E_compare", "symbols": ["EXPRESSIONS", "_", "R_iis", "_", "EXPRESSIONS", "_", "E_compare$string$1"], "postprocess": 
        function (d) { return {
        	type: "E_gt", d: d, lhs: d[0], rhs: d[4] } } },
    {"name": "E_compare$string$2", "symbols": [{"literal":"보"}, {"literal":"다"}, {"literal":" "}, {"literal":"작"}, {"literal":"다"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E_compare", "symbols": ["EXPRESSIONS", "_", "R_iis", "_", "EXPRESSIONS", "_", "E_compare$string$2"], "postprocess": 
        function (d) { return {
        	type: "E_lt", d: d, lhs: d[0], rhs: d[4] } } },
    {"name": "E_compare$string$3", "symbols": [{"literal":"보"}, {"literal":"다"}, {"literal":" "}, {"literal":"크"}, {"literal":"거"}, {"literal":"나"}, {"literal":" "}, {"literal":"같"}, {"literal":"다"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E_compare", "symbols": ["EXPRESSIONS", "_", "R_iis", "_", "EXPRESSIONS", "_", "E_compare$string$3"], "postprocess": 
        function (d) { return {
        	type: "E_gte", d: d, lhs: d[0], rhs: d[4] } } },
    {"name": "E_compare$string$4", "symbols": [{"literal":"보"}, {"literal":"다"}, {"literal":" "}, {"literal":"작"}, {"literal":"거"}, {"literal":"나"}, {"literal":" "}, {"literal":"같"}, {"literal":"다"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E_compare", "symbols": ["EXPRESSIONS", "_", "R_iis", "_", "EXPRESSIONS", "_", "E_compare$string$4"], "postprocess": 
        function (d) { return {
        	type: "E_lte", d: d, lhs: d[0], rhs: d[4] } } },
    {"name": "E_compare$subexpression$1", "symbols": [{"literal":"와"}]},
    {"name": "E_compare$subexpression$1", "symbols": [{"literal":"과"}]},
    {"name": "E_compare$string$5", "symbols": [{"literal":" "}, {"literal":"같"}, {"literal":"다"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E_compare", "symbols": ["EXPRESSIONS", "_", "R_iis", "_", "EXPRESSIONS", "_", "E_compare$subexpression$1", "E_compare$string$5"], "postprocess": 
        function (d) { return {
        	type: "E_eq", d: d, lhs: d[0], rhs: d[4] } } },
    {"name": "E_alert$ebnf$1", "symbols": [/[!]/]},
    {"name": "E_alert$ebnf$1", "symbols": ["E_alert$ebnf$1", /[!]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "E_alert", "symbols": [{"literal":"뿅"}, "_", "E_alert$ebnf$1", "_", {"literal":"("}, "_", "E_alert_", "_", {"literal":")"}], "postprocess": 
        function (d) { return {
        	type: "E_alert", d: d, style: d[2].length, v: d[6] } }
        },
    {"name": "E_alert_", "symbols": ["E_alert_", "_", {"literal":","}, "_", "EXPRESSIONS"], "postprocess": 
        function (d) {
        	return d[0].concat(d[4])
        }
        },
    {"name": "E_alert_", "symbols": ["EXPRESSIONS"], "postprocess": 
        function (d) {
        	return d;
        }
        },
    {"name": "E_number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "E_number$ebnf$1", "symbols": ["E_number$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "E_number", "symbols": ["E_number$ebnf$1"], "postprocess": function(d) {return {type: "E_number", v:+d[0].join("")}}},
    {"name": "E_string", "symbols": [{"literal":"'"}, "E_string_", {"literal":"'"}], "postprocess": function(d) {return d[1]}},
    {"name": "E_string_$ebnf$1", "symbols": [/[가-힣|\s|0-9|!?\.,\[\]\*\+-\/]/]},
    {"name": "E_string_$ebnf$1", "symbols": ["E_string_$ebnf$1", /[가-힣|\s|0-9|!?\.,\[\]\*\+-\/]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "E_string_", "symbols": ["E_string_$ebnf$1"], "postprocess": function(d) {return {type: "E_string", v:d[0].join("")}}},
    {"name": "R_is", "symbols": [{"literal":"는"}], "postprocess": id},
    {"name": "R_is", "symbols": [{"literal":"은"}], "postprocess": id},
    {"name": "R_iis", "symbols": [{"literal":"가"}], "postprocess": id},
    {"name": "R_iis", "symbols": [{"literal":"이"}], "postprocess": id},
    {"name": "R_iis$string$1", "symbols": [{"literal":"이"}, {"literal":"가"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "R_iis", "symbols": ["R_iis$string$1"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null }},
    {"name": "NL$ebnf$1", "symbols": []},
    {"name": "NL$ebnf$1", "symbols": ["NL$ebnf$1", /[\s|\r\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NL", "symbols": ["NL$ebnf$1"], "postprocess": function(d) {return null }}
]
  , ParserStart: "S"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
