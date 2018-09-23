import nearley from 'nearley';
import grammar from './grammar.js';

import style from './style.scss';

window.MEMORY = new Map();

let results = [];
function Parse(string) {
  console.log("Parse", string);
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(string);
  if (parser.results.length > 1 || parser.results.length == 0) console.error("ERROR",string);
  return parser.results[0];
}

const SE = {
  "NO_OP": s => {
    return {
      type: "NO_OP"
    }
  },
  "S_statements": s => {
    for (var i = 0; i < s.statements.length; i ++) 
      Gen(s.statements[i]);
    delete s.d;
    return s;
  },
  "S_if": s => {
    let cond = Gen(s.cond);
    if (cond.v) Gen(s.then);
    else Gen(s.else);
    delete s.d;
    return s;
  },
  "S_for": s => {
    while (Gen(s.cond).v) 
      Gen(s.statements);
    delete s.d;
    return s;
  },
  "S_assign": s => {
    let key = null;
    if (s.key.type == "E_address")
      key = s.key.v;
    else key = Gen(s.key).v;
    console.log("KEY = ", key, "VALUE = ", s.v);
    MEMORY.set(key, Gen(s.v).v);
    delete s.d;
    return s;
  },
  "S_alias_assign": s => {
    let key = s.key.v;
    let value = s.v.v;
    MEMORY.set(key, value);
    delete s.d;
    return s;
  },
  "E_add": s => {
    let lhs = Gen(s.lhs);
    let rhs = Gen(s.rhs);
    return {
      type: "E_number",
      v: lhs.v + rhs.v
    }
  },
  "E_sub": s => {
    let lhs = Gen(s.lhs);
    let rhs = Gen(s.rhs);
    return {
      type: "E_number",
      v: lhs.v - rhs.v
    }
  },
  "E_mul": s => {
    let lhs = Gen(s.lhs);
    let rhs = Gen(s.rhs);
    return {
      type: "E_number",
      v: lhs.v * rhs.v
    }
  },
  "E_div": s => {
    let lhs = Gen(s.lhs);
    let rhs = Gen(s.rhs);
    return {
      type: "E_number",
      v: lhs.v / rhs.v
    }
  },
  "E_gt": s => {
    let lhs = Gen(s.lhs);
    let rhs = Gen(s.rhs);
    return {
      type: "E_gt",
      v: lhs.v > rhs.v
    }
  },
  "E_lt": s => {
    let lhs = Gen(s.lhs);
    let rhs = Gen(s.rhs);
    return {
      type: "E_lt",
      v: lhs.v < rhs.v
    }
  },
  "E_gte": s => {
    let lhs = Gen(s.lhs);
    let rhs = Gen(s.rhs);
    return {
      type: "E_gte",
      v: lhs.v >= rhs.v
    }
  },
  "E_lte": s => {
    let lhs = Gen(s.lhs);
    let rhs = Gen(s.rhs);
    return {
      type: "E_lte",
      v: lhs.v <= rhs.v
    }
  },
  "E_eq": s => {
    let lhs = Gen(s.lhs);
    let rhs = Gen(s.rhs);
    return {
      type: "E_eq",
      v: lhs.v == rhs.v
    }
  },
  "E_alert": s => {
    let str = "";
    for (var i = 0; i < s.v.length; i ++)
      str = str + Gen(s.v[i]).v + " ";
    var style = `font-size:${12 + 3 * s.style}px`
    $("#result").append($(`<div style="${style}">${str}</div>`))
    $("#result").scrollTop($("#result")[0].scrollHeight);
    delete s.d;
    return s;
  },
  "E_value": s => {
    return {
      type: "E_value",
      v: MEMORY.get(s.key)
    }
  },
  "E_alias_value": s => {
    return {
      type: "E_value",
      v: MEMORY.get(MEMORY.get(s.key))
    }
  },
  "E_number": s => {
    return {
      type: "E_number",
      v: s.v
    }
  },
  "E_string": s => {
    return {
      type: "E_string",
      v: s.v
    }
  },
}

function Gen(s) {
  return SE[s.type](s);
}

var KEY_MAP = {};

function insertTab() {
  if (!window.getSelection) return;
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  range.collapse(true);
  const span = document.createElement('span');
  span.appendChild(document.createTextNode('\t'));
  span.style.whiteSpace = 'pre';
  range.insertNode(span);
  // Move the caret immediately after the inserted span
  range.setStartAfter(span);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

let $currentLine;

function EvaluateCE() {
  let $ce = $currentLine.clone();
  let divs = $ce.children('div');
  if (divs.length == 0) {
    $ce.find('span').remove();
    $ce.find('br').remove();
    return Evaluate($ce.html().trim());
  }
  var str = "";
  for (var i = 0; i < divs.length; i ++) {
    $(divs[i]).find('span').remove();
    $(divs[i]).find('br').remove();
    str += $(divs[i]).html().trim();
    if (i != divs.length - 1) str += "\n";
  }
  Evaluate(str);
}

function EvaluateCLI(str) {
  var lines = str.split("\n");
  var r = "";
  for (var i = 0; i < lines.length; i ++) {
    var line = lines[i];
    if (line.length == 0) continue;
    line = line.replace(/\t/gi, '<span style="white-space: pre;">	</span>');
    line = line.replace(/\s\s/gi, '<span style="white-space: pre;">	</span>');
    r += '<div>' + line + '</div>' + "\n";
  }
  r = r.substring(0, r.length - 1);
  console.log(r);
  $currentLine.html(r);
  EvaluateCE();
}

function Evaluate(string) {
  console.log("Evaluate", string);
  $currentLine.removeAttr('contenteditable');
  $currentLine.removeClass('active');
  let parsed, log;
  try {
    parsed = Parse(string);
    log = Gen(parsed);
    $("#logger").append(`
      <pre>${JSON.stringify(log, null, 4)}</pre>
    `)
  } catch (e) {
    console.log(e);
    $currentLine.addClass('error');
    $("#result").append(`
      <pre class='error'>${e}</pre>
    `)
    $("#result").scrollTop($("#result")[0].scrollHeight);
  } finally {
    $("#logger").scrollTop($("#logger")[0].scrollHeight);
    AddLine();
  }
}

function onKeydown(e) {
  KEY_MAP[e.keyCode] = 1;
  let $el = $(e.srcElement);
  if (KEY_MAP[13] && KEY_MAP[16]) {
    e.preventDefault();
    EvaluateCE();
  }
  if (KEY_MAP[9]) {
    e.preventDefault();
    insertTab();
  }
}

function onKeyup(e) {
  delete KEY_MAP[e.keyCode];
}

function AddLine() {
  let $line = $(`
    <div class='line active' contenteditable></div>
  `)
  $currentLine = $line;
  $line[0].addEventListener('keydown', onKeydown);
  $line[0].addEventListener('keyup', onKeyup);
  $("#left").append($line);
  $line.focus();
  $("#left").scrollTop($("#left")[0].scrollHeight);
}

function AppendComment(text) {
  console.log($currentLine[0]);
  $(`<div class='comment'>${text}</div>`).insertBefore($currentLine);
}

$(document).ready(() => {
  AddLine();

AppendComment("변수 선언하기");
AppendComment("[<i><b>VARIABLE</b></i>](은|는) <i><b>EXPRESSION</b></i>");
EvaluateCLI(`[몇단] 은 1927`);

AppendComment("결과창에 출력하기. '!' 의 개수가 많을수록 글씨 크기가 커진다.");
AppendComment("뿅[!+] (<i><b>EXPRESSION</b></i>, <i><b>EXPRESSION</b></i>, <i><b>EXPRESSION</b></i>, ...)");
EvaluateCLI(`뿅!!!!! ('이건정말문맥에상관없는언어라구요!!', [몇단])`);

AppendComment("Alias 선언하기. Alias는 오직 변수로만 대입된다. Symbolic link같은 개념.");
AppendComment("<i><b>ALIAS</b></i>(은|는) <i><b>VARIABLE</b></i>");
EvaluateCLI(`{묯단} 은 [몇단]`);
EvaluateCLI(`뿅!!! ( {묯단} )`);

AppendComment("비교문과 사칙 연산");
AppendComment("<i><b>EXPRESSION</b></i> (더하기|빼기|곱하기|나누기) <i><b>EXPRESSION</b></i>");
AppendComment("<i><b>EXPRESSION</b></i>(이|가) <i><b>EXPRESSION</b></i>보다 (크다|작다|같다|크거나 같다|작거나 같다)");
EvaluateCLI(`[나]는 3 더하기 5`);
EvaluateCLI(`[너]는 [나] 곱하기 2`);
EvaluateCLI(`뿅! ('나는 ', [나])`);
EvaluateCLI(`뿅! ('너는 ', [너])`);
EvaluateCLI(`뿅!! ('[나]가 [너]보다 클까? ', [나]가 [너]보다 크다)`);
EvaluateCLI(`뿅!! ('[나] 곱하기 2가 [너]와 같을까? ', [나] 곱하기 2가 [너]와 같다)`);

AppendComment("While 스타일 반복문");
AppendComment("Nested while loop 도 지원한다.");
AppendComment("<i><b>EXPRESSION</b></i>일 때 까지 <i><b>STATEMENT+</b></i> 해줘");
EvaluateCLI(`[구구단을외자구구단을외자]는 '구구단을 외자 구구단을 외자 '`);
EvaluateCLI(`{구외구외}는 [구구단을외자구구단을외자]`);
EvaluateCLI(`뿅!!! ({구외구외}, '지금부터 ', 38582 곱하기 0 더하기 1, '단 부터 구구단을 외워보자!')`);
EvaluateCLI(`[몇단] 은 1`);
EvaluateCLI(`{구구단의단}은 [몇단]`)
EvaluateCLI(`
{구구단의단}이 9보다 작거나 같다일 때 까지
  뿅!! ([몇단], '차례 !')
  [몇번]은 1
  [몇번]이 9보다 작거나 같다일 때 까지
    뿅! ({구구단의단}, ' 곱하기 ', [몇번], '은 ', [몇단] 곱하기 [몇번])
    [몇번]은 [몇번] 더하기 1
  해줘
  [몇단]은 [몇단] 더하기 1
해줘
`)
AppendComment("If-Else 조건문");
AppendComment("혹시 <i><b>EXPRESSION</b></i>(니?|이니?|야?) 그럼 <i><b>STATEMENT+</b></i> 해줘 아니면 <i><b>STATEMENT+</b></i> 해줘");
EvaluateCLI('[나]는 5');
EvaluateCLI('[너]는 2');
EvaluateCLI('[쟤]는 7');
EvaluateCLI(`뿅!!! ('[나] 곱하기 [너] 빼기 [쟤]는 3과 같을까?')`);
EvaluateCLI(`
혹시 [나] 곱하기 [너] 빼기 [쟤]가 3과 같다야? 그럼
  뿅!! ('맞아 같아!')
해줘
아니면
  뿅!! ('아니야 달라!')
해줘
`)
AppendComment("Nested If-Else");
EvaluateCLI(`뿅!!! ('그럼 [나] 더하기 [나] 곱하기 [너]는 20과 같을까?')`);
EvaluateCLI('[나더하기나곱하기너]는 [나] 더하기 [나] 곱하기 [너]');
EvaluateCLI('{우리들}은 [나더하기나곱하기너]');
EvaluateCLI(`
혹시 {우리들}이 20과 같다야? 그럼
  뿅!! ('맞아 같아!')
해줘
아니면
  뿅!! ('아니야 달라!')
  뿅!!! ('그럼 혹시 30과 같을까?')
  혹시 {우리들}이 30과 같다야? 그럼
    뿅!! ('맞아 같아!')
  해줘
  아니면
    뿅!! ('아니야 달라! 답은 ', {우리들}, '야!')
  해줘
해줘
`)

});