---
sidebar_position: 6
---

# 🌈 Chapter 5: 클로저

## 📚 클로저의 의미 및 원리 이해
- 클로저(Closure)는 여러 함수형 프로그래밍 언어에서 등장하는 보편적인 특성이다.

> - 클로저를 한 문장으로 요약
>   - 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수 (자바스크립트 핵심 가이드)
>   - 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것 (러닝 자바스크립트)
>   - 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수 (자바스크립트 닌자 비급)
>   - 이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 함수 (인사이드 자바스크립트)
>   - 자유변수가 있는 함수와 자유변수를 알 수 있는 환경의 결합 (Head First Javascript Programming)
>   - 로컬 변수를 참조하고 있는 함수 내의 함수 (자바스크립트 마스터북)
>   - 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만을 기억하며 유지시키는 함수 (함수형 자바스크립트 프로그래밍)
>   - 클로저는 함수와 그 함수가 선언될 당시의 lexical environment(렉시컬 환경)의 상호관계에 따른 현상 (MDN)

- 어떤 컨텍스트 A에서 선언한 내부함수 B의 실행 컨텍스트가 활성화된 시점에는 B의 outerEnvironmentReference가 참조하는 대상인 A의 LexicalEnvironment에도 접근이 가능하다. A에서는 B에서 선언한 변수에 접근할 수 없지만 B에서는 A에서 선언한 변수에 접근이 가능하다.
- 내부함수에서 외부 변수를 참조하지 않는 경우는 해당하지 않는다. 즉, 선언될 당시의 LexicalEnvironment와의 상호관계이다.

```js
var outer = function() {
  var a = 1;

  var inner = function() {
    console.log(++a); // 2
  };

  inner();
};

outer();
```

- 위 예에서 `inner` 함수 내부에서는 `a`를 선언하지 않았기 때문에 environmentRecord에서 값을 찾지 못하므로 outerEnvironmentReference에 지정된 상위 컨텍스트인 LexicalEnvironment에 접근해서 다시 `a`를 찾는다.
- `outer` 함수의 실행 컨텍스트가 종료되면 LexicalEnvironment에 지정된 식별자들(`a`, `inner`)에 대한 참조를 지운다. 그러면 각 주소에 저장돼 있던 값들은 자신을 참조하는 변수가 하나도 없게 되므로 가비지 컬렉터의 수집 대상이 될 것이다.
  
```js
var outer = function() {
  var a = 1;

  var inner = function() {
    return ++a;
  };

  return inner();
};

var outer2 = outer();
console.log(outer2); // 2
```

- 위 예제에서는 `inner` 함수를 실행한 결과를 리턴하고 있으므로 결과적으로 `outer` 함수의 실행 컨텍스트가 종료된 시점에는 `a` 변수를 참조하는 대상이 없어진다.
- 위 두 예제에서 `outer` 함수의 실행 컨텍스트가 종료되기 이전에 `inner` 함수의 실행 컨텍스트가 종료돼 있으며, 이후 별도의 `inner` 함수를 호출할 수 없다는 공통점이 있다.
- 그렇다면 `outer`의 실행 컨텍스트가 종료된 후에도 `inner` 함수를 호출할 수 있게 만들면 어떨까?

```js
var outer = function() {
  var a = 1;

  var inner = function() {
    return ++a;
  };

  return inner;
};

var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3
```

- 위 예제에서 `inner` 함수 자체를 반환했다. 그러면 `outer` 함수의 실행 컨텍스트가 종료될 때 `outer2` 변수는 `outer`의 실행 결과인 `inner` 함수를 참조하게 될 것이다.
- `inner` 함수의 실행 컨텍스트의 environmentRecord에는 수집할 정보가 없다. outerEnvironmentReference에는 `inner` 함수가 선언된 위치의 LexicalEnvironment가 참조복사된다.
- `inner` 함수는 `outer` 함수 내부에서 선언됐으므로, `outer` 함수의 LexicalEnvironment가 담길 것이다.
- 이제 스코프 체이닝에 따라 `outer`에서 선언한 변수 `a`에 접근해서 1만큼 증가시킨 후 그 값인 2를 반환하고, `inner` 함수의 실행 컨텍스트가 종료된다.
- 그런데 **`inner` 함수의 실행 시점에는 `outer` 함수는 이미 실행이 종료된 상태인데 `outer` 함수의 LexicalEnvironment에 어떻게 접근하는 것일까?**
- 이는 가비지 컬렉터의 동작 방식 때문인데 가비지 컬렉터는 어떤 값을 참조하는 변수가 하나라도 있다면 그 값은 수집 대상에 포함시키지 않는다.
- `outer` 함수는 실행 종료 시점에 `inner` 함수를 반환한다. 외부함수인 `outer`의 실행이 종료되더라도 내부 함수인 `inner` 함수는 언젠가 `outer2`를 실행함으로써 호출될 가능성이 열린 것이다. 때문에 가비지 컬렉터의 수집 대상에서 제외가 되는 것이다.
- 이처럼 함수의 실행 컨텍스트가 종료된 후에도 LexicalEnvironment가 가비지 컬렉터의 수집 대상에서 제외되는 경우는 마지막 예제처럼 지역변수를 참조하는 내부함수가 외부로 전달된 경우가 유일하다.

> 클로저를 다시 정의해보면 **클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상**이다.

- **한가지 주의할 점은 외부로 전달이 곧 `return`만을 의미하는 것은 아니다.** 아래 코드는 `return`없이도 클로저가 발생하는 상황이다.

```js
// setInterval/setTimeout
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if(++a >= 10) {
      clearInterval(intervalId);
    }

    console.log(a);
  };

  intervalId = setInterval(inner, 1000);
})();

// eventListener
(function () {
  var count = 0;
  var button = document.createElement('button');

  button.innerText = 'click';
  button.addEventListener('click', function () {
    console.log(++count, 'times clicked');
  });
  
  document.body.appendChild(button);
})();
```

- 위 두 상황 모두 지역변수를 참조하는 내부함수를 외부에 전달했기 때문에 클로저이다.

## 📚 클로저와 메모리 관리
- 클로저는 어떤 필요에 의해 의도적으로 함수의 지역변수를 메모리를 소모하도록 함으로써 발생한다. 그렇다면 그 필요성이 사라진 시점에는 더는 메모리를 소모하지 않게 해주면 된다.

```js
// return 에 의한 클로저의 메모리 해제
var outer = (function () {
  var a = 1;

  var inner = function () {
    return ++a;
  };

  return inner;
})();

console.log(outer());
console.log(outer());

outer = null; // outer 식별자의 inner 함수 참조를 끊음

console.log(outer()); // TypeError: outer is not a function
```

- `setInterval`에 의한 클로저 메모리 해제

```js
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if(++a >= 10) {
      clearInterval(intervalId);
      inner = null; // inner 식별자의 함수 참조를 끊음
    }

    console.log(a);
  };

  intervalId = setInterval(inner, 1000);
})();
```

-  `eventListener`에 의한 클로저 메모리 해제

```js
(function () {
  var count = 0;
  var button = document.createElement('button');
  button.innerText = 'click';

  var clickHandler = function () {
    console.log(++count, 'times clicked');
    if(count >= 10) {
      button.removeEventListener('click', clickHandler);
      clickHandler = null; // clickHandler 식별자의 함수 참조를 끊음
    }
  };
  
  button.addEventListener('click', clickHandler);
  document.body.appendChild(button);
})();
```

## 📚 클로저 활용 사례

### 🎈 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

```js
var fruits = ['apple', 'banana', 'peach'];
var ul = document.createElement('ul');

fruits.forEach(function (fruit) { // A
  var li = document.createElement('li');
  li.innerText = fruit;
  li.addEventListener('click', function () { // B
    alert('your choice is ' + fruit);
  });

  ul.appendChild(li);
});

document.body.appendChild(ul);
```

- 위 예제에서 A 콜백 함수는 그 내부에서 외부 변수를 사용하지 않고 있으므로 클로저가 없지만, `addEventListener`에 넘겨준 B 콜백 함수에는 `fruit`이라는 외부 변수를 참조하고 있으므로 클로저가 있다.
- A는 fruits의 개수만큼 실행되며, 그때마다 새로운 실행 컨텍스트가 활성될 것이다. A의 실행 종료 여부와 무관하게 클릭 이벤트에 의해 각 컨텍스트의 B가 실행될 때는 B의 outerEnvironmentReference가 A의 LexicalEnvironment를 참조하게 될 것이다. 따라서 최소한 B 함수가 참조할 예정인 변수 fruit에 대해서는 A가 종료된 후에도 GC 대상에서 제외되어 계속 참조가 가능하다.
- 이제 반복을 줄이기 위해 B를 외부로 분리해본다. 즉 `fruit`를 인자로 받아 출력하는 형태로..

```js
var fruits = ['apple', 'banana', 'peach'];
var ul = document.createElement('ul');

var alertFruit = function (fruit) {
  alert('your choice is ' + fruit);
}
fruits.forEach(function (fruit) { // A
  var li = document.createElement('li');
  li.innerText = fruit;
  // 첫 번째 인자에 이벤트 객체를 주입하기 때문에 bind 메서드를 할용
  li.addEventListener('click', alertFruit.bind(null, fruit));

  ul.appendChild(li);
});

document.body.appendChild(ul);
```

- 다만 이렇게 하면 이벤트 객체가 인자로 넘어오는 순서가 바뀌는 점 및 함수 내부에서의 `this`가 원래의 그것과 달라지는 점을 감안해야 한다. 그렇기 때문에 여기서 고차함수를 활용한다.

```js
var fruits = ['apple', 'banana', 'peach'];
var ul = document.createElement('ul');

var alertFruitBuilder = function (fruit) {
  return function () {
    alert('your choice is ' + fruit);
  }
}
fruits.forEach(function (fruit) { // A
  var li = document.createElement('li');
  li.innerText = fruit;
  // 첫 번째 인자에 이벤트 객체를 주입하기 때문에 bind 메서드를 할용
  li.addEventListener('click', alertFruitBuilder(fruit));

  ul.appendChild(li);
});

document.body.appendChild(ul);
```

- `alertFruitBuilder` 함수를 실행하면서 `fruit` 값을 인자로 전달했고 이 함수의 실행 결과가 다시 함수가 되며, 이렇게 반환된 함수를 리스너에 콜백 함수로써 전달할 것이다.
- 이후 클릭 이벤트가 발생하면 이 함수의 실행 컨텍스트가 열리면서 `alertFruitBuilder`의 인자로 넘어온 `fruit`를 outerEnvironmentReference에 의해 참조할 수 있다. 즉, `alertFruitBuilder`의 실행 결과로 반환된 함수에는 클로저가 존재한다.

### 🎈 접근 권한 제어(정보 은닉)
- 클로저를 이용하면 함수 차원에서 `public`한 값과 `private`한 값을 구분하는 것이 가능하다.

```js
var outer = function () {
  var a = 1;
  
  var inner = function () {
    return ++a;
  };

  return inner;
};

var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3

return {
  get move() {

  },
  run: function() {

  }
}
```

- `outer` 함수를 종료할 때 `inner` 함수를 반환함으로써 `outer` 함수의 지역변수인 `a`의 값을 외부에서도 읽을 수 있게 되었다. 이처럼 클로저를 활용하면 외부 스코프에서 함수 내부의 변수들 중 선택적으로 일부 변수에 대한 접근 권한을 부여할 수 있다. `return`을 활용해서 가능하다.
- `outer` 함수는 외부(전역 스코프)로부터 철저하게 격리된 닫힌 공간이다. 외부에서는 외부 공간에 노출돼 있는 `outer` 라는 변수를 통해 `outer` 함수를 실행할 수는 있지만, **`outer` 함수 내부에는 어떠한 개입도 할 수 없다.** 외부에서는 오직 `outer` 함수가 `return`한 정보에만 접근할 수 있다. `return` 값이 외부에 제공되는 유일한 수단이다.
- 그렇기 때문에 외부에 제공하고자 하는 정보들을 모아서 `return`하고, 내부에서만 사용할 정보들은 `return`하지 않는 것으로 접근 권한 제어가 가능한 것이다.

### 🎈 부분 적용 함수
- 부분 적용 함수란 `n` 개의 인자를 받는 함수에 미리 `m`개의 인자만 넘겨 기억시켰다가, 나중에 `(n - m)`개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있겠끔 하는 함수이다.

```js
var partial = function () {
  var originalPartialArgs = arguments;
  var func = originalPartialArgs[0];

  if (typeof func !== 'function') {
    throw new Error('첫 번째 인자가 함수가 아닙니다.');
  }

  return function () {
    var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

var add = function () {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};

var addPartial = partial(add, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10)); // 55

var dog = {
  name: '강아지',
  greet: partial(function(prefix, suffix) {
    return prefix + this.name + suffix;
  }, '왈왈, ');
};

dog.greet('입니다!'); // 왈왈, 강아지입니다!
```

- 다음 예제는 디바운스(debounce)에 대한 예제이다. 디바운스는 짧은 시간 동안 동일한 이벤트가 많이 발생할 경우 이를 전부 처리하지 않고 처음 또는 마지막에 발생한 이벤트에 대해 한 번만 처리하는 것으로, 프런트엔드 성능 최적화에 큰 도움을 주는 기능 중 하나다. (`scroll`, `wheel`, `mousemove`. `resize`등 적용)

```js
var debounce = function (eventName, func, wait) {
  var timeoutId = null;

  return function (event) {
    var self = this;

    console.log(eventName, 'event 발생');

    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
};

var moveHandler = function (e) {
  console.log('move event 처리');
};

var wheelHandler = function (e) {
  console.log('wheel event 처리');
};

document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
document.body.addEventListener('mousewheel', debounce('wheel', wheelHandler, 700));
```

- 최초 `event`가 발생하면 timeout의 대기열에 `wait` 시간 뒤 `func`를 실행한다. 그런데 `wait` 시간이 경과하기 이전에 다시 동일한 `event`가 발생하면 `clearTimeout`으로 무조건 대기큐를 초기화하게 한다. 다시 새로운 대기열을 등록한다.

### 🎈 커링 함수
- 커링 함수란 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것을 말한다.
- 커링은 한 번에 하나의 인자를 전달하는 것을 원칙으로 하고 중간 과정상의 함수를 실행한 결과는 그다응ㅁ 인자를 받기 위해 대기만 할 뿐으로, 마지막 인자가 전달되기 전까지는 원본 함수가 실행되지 않는다.

```js
var curry3 = function (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    };
  };
};

var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25

var getMinWith10 = curry3(Math.min)(10);
console.log(getMinWith10(8)); // 8
console.log(getMinWith10(25)); // 10
```

- 각 단계에서 받은 인자들은 모두 마지막 단계에서 참조할 것이므로 GC되지 않고 메모리에 차곡차곡 쌓였다가, 마지막 호출로 실행 컨텍스트가 종료된 후에야 비로소 한꺼번에 GC의 수거 대상이 된다.
- 즉, 당장 필요한 정보만 받아서 전달하고 또 필요한 정보가 들어오면 전달하는 식으로 하면 결국 마지막 인자가 넘어갈 때까지 함수 실행을 미룰 수 있다. 이를 함수형 프로그램밍에서 지연실행이라고 한다.