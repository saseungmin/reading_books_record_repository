---
sidebar_position: 4
---

# 🌈 Chapter 3: this

## 📚 상황에 따라 달라지는 this
- 자바스크립트에서 `this`는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다.
- 실행 컨텍스트는 함수를 호출할 때 생성되므로, 바꿔 말하면 `this`는 **함수를 호출할 때 결정된다**고 할 수 있다.

### 🎈 전역 공간에서의 this
- 전역 공간에서 `this`는 전역 객체를 가리킨다. 전역 객체는 런타임 환경에 따라 브라우저 환경에서 전역객체는 `window`이고 `Node.js` 환경에서는 `global`이다.

```js
// 브라우저
this === window

// Node.js
this === global
```

- 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로도 할당한다. 변수이면서 객체의 프로퍼티이기도 하다.

```js
var a = 1;
console.log(a); // 1
console.log(window.a); // 1
console.log(this.a); // 1
```

- **자바스크립트의 모든 변수는 특정 객체의 프로퍼티**로서 동작한다. `var` 연산자를 이용해 변수를 선언하더라도 실제 자바스크립트 엔진은 어떤 특정 객체의 프로퍼티로 인식한다. 여기서 특정 객체란 바로 실행 컨텍스트의 `LexicalEnvironment`이다. 실행 컨텍스트는 변수를 수집해서 `LexicalEnvironment`의 프로퍼티로 저장한다. 이후 어떤 변수를 호출하면 `LexicalEnvironment`를 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 반환한다. 전역 컨텍스트의 경우 `LexicalEnvironment`는 전역객체를 그대로 참조한다. (정확히는 `GlobalEnv`를 참조)
- **전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다.**
- 여기서 `a`만 호출하여도 1이 나오는 이유는 변수 `a`에 접근하고자 하면 스코프 체인에서 `a`를 검색하다가 가장 마지막에 도달하는 전역 스코프의 `LexicalEnvironment` 즉, 전역 객체에서 해당 프로퍼티 `a`를 발견해서 그 값을 반환하기 때문이다.

```js
// var로 변수를 선언하는 대신 window의 프로퍼티에 직접 할당하더라도 대부분의 경우는 똑같이 동작한다.
var a = 1;
window.b = 2;

console.log(a, window.a, this.a); // 1 1 1
console.log(b, window.b, this.b); // 2 2 2
```

- 그런데 전역변수 선언과 전역객체의 프로퍼티 할당 사이에 전혀 다른 경우도 있는데 바로 삭제 명령에 대해 그렇다.

```js
var a = 1;
delete window.a; // false
console.log(a, window.a, this.a); // 1 1 1

window.c = 3;
delete window.c; // true
console.log(c, window.c, this.c); // Uncaught ReferenceError: c is not defined
```

- 전역객체의 프로퍼티로 할당한 경우에는 삭제가 되는 반면 전역변수로 선언할 경우에는 삭제가 되지 않는다. 이는 사용자가 의도치 않게 삭제하는 것을 방지하는 차원에서 마련한 방어 전략이다.

### 🎈 메서드로서 호출할 때 그 메서드 내부에서의 this

#### 🐶 함수 vs. 메서드
- 함수와 메서드를 구분하는 유일한 차이는 **독립성**에 있다. 함수는 그 자체로 독립적인 기능을 수행하는 반면, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행한다.

```js
// 함수로서 호출, 메서드로서 호출
var func = function (x) {
  console.log(this, x);
};

func(1); // Window {...} 1

var obj = {
  method: func
};

obj.method(2); // { method: f } 2
```

- 원래 익명함수는 그대로인데 이를 변수에 담아 호출한 경우와 `obj` 객체의 프로퍼티에 할당해서 호출한 경우에 `this`가 달라진다.

#### 🐶 메서드 내부에서의 this
- `this`에는 호출한 주체에 대한 정보가 담긴다. 어떤 함수를 메서드로서 호출하는 경우 호출 주체는 바로 함수(프로퍼티명) 앞의 객체이다. 점 표기법의 경우 마지막 점 앞에 명시된 객체가 곧 `this`가 된다.

```js
var obj = {
  methodA: function() { console.log(this); },
  inner: {
    methodB: function() { console.log(this); },
  },
};

obj.methodA(); // { methodA: f, inner: {...} } ( === obj)
obj.inner.methodB(); // { methodB: f } ( === obj.inner)
```

### 🎈 함수로서 호출할 때 그 함수 내부에서의 this

#### 🐶 함수 내부에서의 this
- 어떤 함수를 함수로서 호출할 경우에는 `this`가 지정되지 않는다. 함수로서 호출하는 것은 호출 주체를 명시하지 않고 개발자가 코드에 직접 관여해서 실행한 것이기 때문에 호출 주체의 정보를 알 수 없다.
- 그렇기 때문에 `this`가 지정되지 않았기에 `this`는 전역 객체를 가키린다.
- 이것은 설계상의 오류이다.

#### 🐶 메서드의 내부함수에서의 this

```js
var obj1 = {
  outer: function () {
    console.log(this); // (1)

    var innerFunc = function () {
      console.log(this); // (2) (3)
    }

    innerFunc();

    var obj2 = {
      innerMethod: innerFunc
    };

    obj2.innerMethod();
  }
};

obj1.outer();
```

- (1)은 `obj1`, (2)는 전역객체(`Window`) (3)은 `obj2`이다.
  1. `obj1.outer`를 호출한다.
  2. `obj1.outer` 함수의 실행 컨텍스트가 생성되면서 호이스팅하고, 스코프 체인 정보를 수집하고, `this`를 바인딩한다. 이 함수는 호출할 때 함수명인 `outer` 앞에 점이 있었으므로 메서드로서 호출한 것이다. 따라서 `this`에는 마지막 점 앞의 객체인 `obj1`이 바인딩된다.
  3. `obj1`의 객체 정보가 출력된다.
  4. 호이스팅된 변수 `innerFunc`는 `outer` 스코프 내에서만 접근할 수 있는 지역변수이다. 이 지역변수에 익명 함수를 할당한다.
  5. `innerFunc`를 호출한다.
  6. `innerFunc` 함수의 실행 컨텍스트가 생성되면서 호이스팅하고, 스코프 체인 정보를 수집하고, `this`를 바인딩한다. 이 함수를 호출할 때 함수명 앞에는 점이 없다. 즉 함수로서 호출한 것이므로 `this`가 지정되지 않았고, 따라서 자동으로 스코프 체인상의 최상위 객체인 전역객체(`Window`)가 바인딩된다.
  7. `Window` 객체 정보가 출력된다.
  8. 호이스팅된 변수 `obj2` 역시 `outer` 스코프 내에서만 접근할 수 있는 지역변수이다. 여기서 다시 객체를 할당하는데, 그 객체에는 `innerMethod`라는 프로퍼티가 있으며 여기에는 앞서 정의된 변수 `innerFunc`와 연결된 익명 함수가 연결된다.
  9. `obj2.innerMethod`를 호출한다.
  10. `obj2.innerMethod` 함수의 실행 컨텍스트가 생성되고 이 함수는 호출할 때 함수명인 `innerMethod` 앞에 점이 있었으므로 메서드로서 호출한 것이다. 따라서 `this`에는 마지막 점 앞의 객체인 `obj2`가 바인딩된다.
  11. `obj2` 객체 정보가 출력된다.
- 위의 예제와 같이 `this` 바인딩에 관해서는 함수를 실행하는 당시 주변 환경은 중요하지 않고, 오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건이다.

#### 🐶 메서드의 내부 함수에서의 this를 우회하는 방법
- 호출 주체가 없을 때는 자동으로 전역객체를 바인딩하지 않고 호출 당시 주변 환경의 `this`를 그대로 상속받아 사용할 수 있으면 좋을것이다. 하지만 ES5까지는 자체적으로 내부함수에 `this`를 상속할 방법이 없지만 우회할 방법이 있다. 대중적인 방버으로 변수를 활용한 방법이다.

```js
var obj1 = {
  outer: function () {
    console.log(this); // (1) { outer: f }

    var innerFunc1 = function () {
      console.log(this); // (2) Window {...}
    }

    innerFunc1();

    var self = this;
    var innerFunc2 = function () {
      console.log(self); // (3) { outer: f }
    };

    innerFunc2();
  }
};

obj1.outer();
```

- `self`는 그저 상위 스코프의 `this`를 저장해서 내부함수에서 활요하려는 수단이다.

#### 🐶 this를 바인딩하지 않는 함수
- ES6에서는 함수 내부에서 `this`가 전역객체를 바라보는 문제를 보안하고자, `this`를 바인딩하지 않는 화살표 함수를 도입했다. 화살표 함수는 실행 컨텍스트를 생성할 때 `this` 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 `this`를 그대로 활용할 수 있다.

```js
var obj = {
  outer: function () {
    console.log(this); // (1) { outer: f }
    
    var innerFunc = () => {
      console.log(this); // (2) { outer: f }
    };

    innerFunc();
  },
};

obj.outer();
```

- 그 밖에도 `call`, `apply` 등의 메서드를 활용해 함수를 호출할 때 명시적으로 `this`를 지정하는 방법이 있다.

### 🎈 콜백 함수 호출 시 그 함수 내부에서의 this
- 함수 A의 제어권을 다른 함수 B에게 넘겨주는 경우 함수 A를 콜백 함수라 한다. 이때 함수 A는 함수 B의 내부 로직에 따라 실행되며, `this` 역시 함수 B 내부 로직에서 정한 규칙에 따라 값이 결정된다.
- 콜백 함수도 함수이기 때문에 기본적으로 `this`가 전역객체를 참조하지만, 제어권을 받은 함수에서 콜백 함수에 별도로 `this`가 될 대상을 지정한 경우에는 그 대상을 참조하게 된다.

```js
setTimeout(function () { console.log(this); }, 300); // (1)

[1, 2, 3, 4, 5].forEach(function (x) { // (2)
  console.log(this, x);
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a')
  .addEventListener('click', function (e) { // (3)
    console.log(this, e);
  });
```

- 1번은 300ms만큼 시간 지연을 한 뒤 콜백 함수를 실행하라는 명령이다. 0.3초 뒤 전역객체가 출력된다.
- 2번은 전역객체와 배열의 각 요소가 총 5회 출력된다.
- 3번은 버큰을 클릭하면 앞서 지정한 엘리먼트와 클릭 이벤트에 관한 정보가 담긴 객체가 출력된다.
- 1번과 2번은 그 배누에서 콜백 함수를 호출할 때 대상이 될 `this`를 지정하지 않는다. 따라서 콜백 함수 내부에서의 `this`는 전역객체를 참조한다.
- 3번은 콜백 함수를 호출할 때 자신의 `this`를 상속하도록 정의돼 있다. 그러니까 메서드명의 점 앞부분이 곧 `this`가 되는 것이다.
- 그렇기 때문에 콜백 함수의 제어권을 가지는 함수(메서드)가 콜백 함수에서의 `this`를 무엇으로 할지를 결정하며, 특별히 정의하지 않은 경우에는 기본적으로 함수와 마찬가지로 전역객체를 바라본다.

### 🎈 생성자 함수 내부에서의 this
- 생성자 함수는 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수이다.
- 생성자는 **구체적인 인스턴스를 만들기 위한** 일종의 **틀**이다.
- 어떤 함수가 생성자 함수로서 호출된 경우 내부에서의 `this`는 곧 새로 만들 구체적인 인스턴스 자신이 된다.
- 생성자 함수를 호출(`new` 명령어와 함께 함수를 호출)하면 우선 생성자의 `prototype` 프로퍼티를 참조하는 `__proto__`라는 프로퍼티가 있는 객체(인스턴스)를 만들고, 미리 준비된 공통 속성 및 개성을 해당 객체(`this`)에 부여한다. 이렇게 해서 구체적인 인스턴스가 만들어진다.

```js
var Cat = function (name, age) {
  this.bark = '야옹';
  this.name = name;
  this.age = age;
};

var choco = new Cat('초코', 7);
var nabi = new Cat('나비', 5);
console.log(choco, nabi);
// Cat {bark: "야옹", name: "초코", age: 7}
// Cat {bark: "야옹", name: "나비", age: 5}
```

## 📚 명시적으로 this를 바인딩하는 방법

### 🎈 call 메서드

```js
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

- `call` 메서드는 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령이다.
- 이때 `call` 메서드의 첫 번째 인자를 `this`로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 한다. 함수를 그냥 실행하면 `this`는 전역객체를 참조하지만 `call` 메서드를 이용하면 임의의 객체를 `this`로 지정할 수 있다.

```js
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // Window{ ... } 1 2 3
func.call({ x: 1 }, 4, 5, 6); // { x: 1 } 4 5 6
```

- 메서드에 대해서도 마찬가지로 객체의 메서드를 그냥 호출하면 `this`는 객체를 참조하지만 `call` 메서드를 이용하면 임의의 객체를 `this`로 지정할 수 있다.

```js
var obj = {
  a: 1,
  method: function(x, y) {
    console.log(this.a, x, y);
  }
};

obj.method(2, 3); // 1 2 3
obj.method.call({ a: 4 }, 5, 6); // 4 5 6
```

### 🎈 apply 메서드

```js
Function.prototype.apply(thisArg[, argsArray])
```

- `apply` 메서드는 `call` 메서드와 기능적으로 완전히 동일하다.
- `call` 메서드는 첫 번째 인자를 제외한 나머지 모든 인자들을 호출할 함수의 매개변수로 지정하는 반면, `apply` 메서드는 두 번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정한다는 점에서만 차이가 있다.

```js
var func = function(a, b, c) {
  console.log(this, a, b, c);
};

func.apply({ x: 1 }, [4, 5, 6]); // { x: 1 } 4 5 6

var obj = {
  a: 1,
  method: function(x, y) {
    console.log(this.a, x, y);
  },
};

obj.method.apply({ a: 4 }, [5, 6]); // 4 5 6
```

### 🎈 call / apply 메서드의 활용

#### 🐶 유사배열객체(array-like object)에 배열 메서드를 적용

```js
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

Array.prototype.push.call(obj, 'd');
console.log(obj); // { 0: "a", 1: "b", 2: "c", 3: "d", length: 4 }

var arr = Array.prototype.slice.call(obj);
console.log(arr); // [ 'a', 'b', 'c', 'd' ]
```

- 객체에는 배열 메서드를 직접 적용할 수 없지만, **키가 0 또는 양의 정수인 프로퍼티가 존재하고 `length` 프로퍼티 값이 0 또는 양의 정수인 객체**, 즉 배열의 구조와 유사한 객체의 경우(유사배열객체) `call` 또는 `apply` 메서드를 이용해 배열 메서드를 차용할 수 있다.
- 함수 내부에서 접근할 수 있는 `arguments` 객체도 유사배열객체이므로 배열로 전환해서 활용할 수 있다. `querySelectorAll`, `getElementsByClassName` 등의 `Node` 선택자로 선택할 결과인 `NodeList`도 마찬가지이다.

```js
function a() {
  var argv = Array.prototype.slice.call(arguments);
  
  argv.forEach(function (arg) {
    console.log(arg);
  });
}

a(1, 2, 3);
// 1
// 2
// 3

document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
var nodeList = document.querySelectorAll('div');
var nodeArr = Array.prototype.slice.call(nodeList);

nodeArr.forEach(function (node) {
  console.log(node);
});
// <div>a</div>
// <div>b</div>
// <div>c</div>
```

- 그 밖에도 유사배열객체에는 `call/apply` 메서드를 이용해 모든 배열 메서드를 적용할 수 있다.
- 배열처럼 인덱스와 `length` 프로퍼티를 지니는 문자열에 대해서도 마찬가지이다. 단, 문자열의 경우 `length` 프로퍼티가 읽기 전용이기 때문에 원본 문자열에 변경을 가하는 메서드(`push`, `pop`, `shift`, `unshift`, `splice` 등)는 에러를 던지며, `concat`처럼 대상이 반드시 배열이어야 하는 경우에는 에러가 나지 않지만 제대로 된 결과를 얻을 수 없다.
- ES6에서는 유사배열객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 `Array.from` 메서드를 새로 도입했다.

```js
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};

var arr = Array.from(obj);
console.log(arr); // ['a', 'b', 'c']
```

#### 🐶 생성자 내부에서 다른 생성사를 호출
- 생성자 내부에 다른 생성자와 공통된 내용이 있을 경우 `call` 또는 `apply`를 이용해 다른 생성자를 호출하면 간단하게 반복을 줄일 수 있다.

```js
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}

function Employee(name, gender, company) {
  Person.apply(this, [name, gender]);
  this.company = company;
}

var by = new Student('보영', 'female', '단국대');
var jn = new Employee('재난', 'male', '구골');
```

#### 🐶 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - apply 활용
- 예를 들어, 배열에서 최대/최솟값을 구해야 할 경우 `apply`를 사용하면 다음과 같이 구할 수 있다.

```js
var numbers = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);
console.log(max, min); // 45 3
```

- ES6에서는 스프레드 연산자를 이용하면 간단하게 작성할 수 있다.

```js
const numbers = [10, 20, 3, 16, 45];
const max = Math.max(...numbers);
const min = Math.min(...numbers);
console.log(max, min); // 45 3
```

- `call/apply` 메서드는 명시적으로 `this`를 바인딩하면서 함수 또는 메서드를 실행하는 방법이지만 이로 인해 `this`를 예측하기 어려워 코드 해석을 방해한다는 단점이 있다.

### 🎈 bind 메서드

```js
Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
```

- `bind` 메서드는 ES5에서 추가된 기능으로, `call`과 비슷하지만 즉시 호출하지는 않고 넘겨받은 `this` 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드이다.
- 다시 새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 `bind` 메서드를 호출할 때 전달했던 인수들의 뒤에 이어서 등록된다. 즉 **`bind` 메서드는 함수에 `this`를 미리 적용하는 것과 부분 적용 함수를 구현하는 두 가지 목적을 모두 지닌다.**

```js
var func = function(a, b, c, d) {
  console.log(this, a, b, c, d);
};

func(1, 2, 3, 4); // Window{ ... } 1 2 3 4

var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8); // { x: 1 } 5 6 7 8

var bindFunc2 = func.bind({ x: 1 }, 4, 5); // 부분 적용 함수
bindFunc2(6, 7); // { x: 1 } 4 5 6 7
bindFunc2(8, 9); // { x: 1 } 4 5 8 9
```

#### 🐶 name 프로퍼티
- `bind` 메서드를 적용해서 새로 만든 함수는 `name` 프로퍼티에 동사 `bind`의 수동태인 `bound`라는 접두어가 붙는다. 어떤 함수의 `name` 프로퍼티가 `bound xxx`라면 이는 곧 함수명이 `xxx`인 원본 함수에 `bind` 메서드를 적용한 새로운 함수라는 의미가 되므로 기존의 `call`이나 `apply`보다 코드를 추적하기에 더 수월해진 면이 있다.

```js
var func = function(a, b, c, d) {
  console.log(this, a, b, c, d);
};

var bindFunc = func.bind({ x: 1}, 4, 5);
console.log(func.name); // func
console.log(bindFunc.name); // bound func
```

#### 🐶 상위 컨텍스트의 this를 내부 함수나 콜백 함수에 전달하기
- 메서드의 내부함수에서 메서드의 `this`를 그대로 바라보게 하기 위한 방법으로 `self`등의 변수를 활용한 우회법이 있었는데, `call`, `apply` 또는 `bind` 메서드를 이용하면 더 깔끔하게 처리할 수 있다.

```js
// call
var obj = {
  outer: function() {
    console.log(this);
    
    var innerFunc = function() {
      console.log(this);
    };

    innerFunc.call(this);
  },
};

obj.outer();

// bind
var obj = {
  outer: function() {
    console.log(this);
    
    var innerFunc = function() {
      console.log(this);
    }.bind(this);

    innerFunc();
  },
};

obj.outer();
```

- 또한 콜백 함수를 인자로 받는 함수나 메서드 중에서 기본적으로 콜백 함수 내에서의 `this`에 관여하는 함수 또는 메서드에 대해서도 `bind` 메서드를 이용하면 `this` 값을 사용자의 입맛에 맞게 바꿀 수 있다.

```js
var obj = {
  logThis: function() {
    console.log(this);
  },
  logThisLater1: function() {
    setTimeout(this.logThis, 500);
  },
  logThisLater2: function() {
    setTimeout(this.logThis.bind(this), 1000);
  },
};

obj.logThisLater1(); // Window { ... }
obj.logThisLater2(); // obj { logThis: f, ... }
```

### 🎈 화살표 함수의 예외사항
- ES6에서 도입된 화살표 함수는 실행 컨텍스트 생성 시 `this`를 바인딩하는 과정이 제외됐다. 즉 이 함수 내부에는 `this`가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 `this`에 접근하게 된다.

```js
var obj = {
  outer: function() {
    console.log(this);

    var innerFunc = () => {
      console.log(this);
    };

    innerFunc();
  },
};

obj.outer();
// outer { f }
// outer { f }
```

### 🎈 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)
- 콜백 함수를 인자로 받는 메서드 중 일부는 추가로 `this`를 지정할 객체(`thisArg`)를 인자로 지정할 수 있는 경우가 있다. 이러한 메서드의 `thisArg` 값을 지정하면 콜백 함수 내부에서 `this`값을 원하는 대로 변경할 수 있다.
- 이런 형태는 내부 요소에 대해 같은 동작으로 반복 수행해야 하는 **배열 메서드**에 많이 포진돼 있으며, 같은 이유로 ES6에서 새로 등장한 `Set`, `Map` 등의 메서드에도 일부 존재한다.

```js
var report = {
  sum: 0,
  count: 0,
  add: function() {
    var args = Array.prototype.slice.call(arguments);

    args.forEach(function(entry) {
      this.sum += entry;
      ++this.count;
    }, this);
  },
  average: function () {
    return this.sum / this.count;
  },
};

report.add(60, 85, 95);
console.log(report.sum, report.count, report.average()); // 240 3 80
```

- 배열을 순회하면서 콜백 함수를 실행하는데, 이때 콜백 함수 내부에서의 `this`는 `forEach` 함수의 두 번째 인자로 전달해준 `this`가 바인딩 된다.
- 콜백 함수 내부에서의 `this`는 `add` 메서드에서의 `this`가 전달된 상태이므로 `add`메서드의 `this`(report)를 그대로 가리키고 있다. 따라서 세 요소를 순해하면서 `report.sum`값 및 `report.count` 값이 차례로 바뀐다.
- 이 밖에도 `thisArg`를 인자로 받는 메서드는 꽤 많이 있다.

```js
Array.prototype.forEach(callback[, thisArg])
Array.prototype.map(callback[, thisArg])
Array.prototype.filter(callback[, thisArg])
Array.prototype.some(callback[, thisArg])
Array.prototype.every(callback[, thisArg])
Array.prototype.find(callback[, thisArg])
Array.prototype.findIndex(callback[, thisArg])
Array.prototype.flatMap(callback[, thisArg])
Array.prototype.from(callback[, thisArg])
Set.prototype.forEach(callback[, thisArg])
Map.prototype.forEach(callback[, thisArg])
```

## 📚 정리
- 다음 규칙은 명시적 `this` 바인딩이 없는 한 늘 성립한다.
  - 전역공간에서의 `this`는 전역객체(브라우저 window, Node.js global)를 참조한다.
  - 어떤 함수를 메서드로서 호출한 경우 `this`는 메서드 호출 주체(메서드명 앞의 객체)를 참조한다.
  - 어떤 함수를 함수로써 호출한 경우 `this`는 전역객체를 참조한다. 메서드의 내부함수에서도 같다.
  - 콜백 함수 내부에서의 `this`는 해당 콜백 함수의 제어권을 넘겨받는 함수가 정의한 바에 따르며, 정의하지 않은 경우에는 전역객체를 참조한다.
  - 생성자 함수에서의 `this`는 생성될 인스턴스를 참조한다.
- 다음은 명시적 `this` 바인딩이다.
  - `call`, `apply` 메서드는 `this`를 명시적으로 지정하면서 함수 또는 메서드를 호출한다.
  - `bind` 메서드는 `this` 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만든다.
  - 요소를 순회하면서 콜백 함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자로 `this`를 받기도 한다.
