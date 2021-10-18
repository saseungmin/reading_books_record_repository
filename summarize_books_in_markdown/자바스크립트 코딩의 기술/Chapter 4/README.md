## 🌈 Chapter 4 : 조건문을 깔끔하게 작성하라.

### 🎯 거짓 값이 있는 조건문을 축약하라.
- 값을 빠르게 검증하는 방법은 불 자료형(boolean type)이라고 부르는 원시 값 `true`, `false`와 참 또는 거짓 값이라고 부르는 사이의 미묘한 차이를 이해하는 것이다.
- **동등**은 내용은 같지만 자료형이 서로 다른 값을 비교할 때 `==`을 이용해서 확인할 수 있다.

```javascript
1 == '1' // true
```
- **동일한 값 또는 엄격히 일치하는 값**이란 두 값이 서로 동일할 뿐만 아니라 자료형도 같은 것을 의미한다.

```javascript
1 === '1' // false
1 === 1 // true
```

- **빈 문자열은 false와 동등**하다. 그렇지만 일치하지는 않다. 다시말해 빈 문자열은 거짓 값이다.

```javascript
'' == false; // true
'' === false; // false
```
- 📌 [거짓 값의 목록 MDN 참고](https://developer.mozilla.org/ko/docs/Glossary/Falsy)
- 배열과 객체의 경우 **빈 배열 또는 빈 객체라도 항상 참 값**이다.
- 따라서 객체 또는 배열이 비어있는지 확인하려면, `[].length` 또는 `Object.keys({}).length` 처럼 `0` 또는 참 값인 숫자를 반환하는 다른 방법을 사용해야 한다.
- 의도와 다르게 거짓 값을 만드는 경우가 있다. 
- 가장 흔한 문제는 아래와 같이 색인을 사용해 배열에서 존재 여부를 검사하는 경우이다.

```javascript
['a','b'].indexOf('a');
// return 0 => 0은 false
```
- 하지만 이 경우는 `Array.includes()`를 사용해 해결할 수 있다.
- 또한, 정의되지 않은 키-값 데이터를 탐색할 때 문제를 경험할 수 있는데 정의되지 않은 키의 값을 가져오면 `undefined`이다.
- 이 경우 코드의 다른 곳에 객체 또는 맵을 변경하는 부분이 있다면 문제를 일으킬 수 있다.

```javascript
const employee = {
  name: 'Eric',
  equipmentTraining: true,
};

function listCerts(employee) {
  if(employee.equipmentTraining) {
    employee.certificates = ['Equipment'];
    // 조작
    delete employee.equipmentTraining;
  }
  // ...생략
}

function checkAuthorization() {
  if(!employee.equipmentTraining) {
    return '기계를 작동할 권한이 없습니다.';
  }
  return `반갑습니다! ${employee.name} 님`;
}

listCerts(employee);
checkAuthorization(employee); // "기계를 작동할 권한이 없습니다."
```

- 위 예제 코드에서 `listCerts` 함수에서 객체를 조작하고 키-값 데이터를 제거하였다.
- 그 후 `checkAuthorization`에서 객체에 값이 있는지 검사한다.
- 객체에 키를 정의하지 않은 경우에는 오류가 발생하지 않고, `undefined`를 반환한다. (맵도 동일)
- 코드를 점검해보면 직원이 인증서를 받아서 조건문을 통과한 것처럼 보이지만 이것은 잘못되었다.
- 문제를 해결하기 위해서 첫 번째이자 월등히 더 좋은 방법은 **데이터를 조작하지 않는 것이다.**
- 만약 그럴 수 없는 상황이라면, 두 번째 방법으로 **엄격한 일치(strict equivalency)를 이용해서 값이 있는지, 원하는 형식인지 확인한다.**

```javascript
function checkAuthorization() {
  if(employee.equipmentTraining !== true) {
    return '기계를 작동할 권한이 없습니다.';
  }
  return `반갑습니다! ${employee.name} 님`;
}

checkAuthorization(employee); // "기계를 작동할 권한이 없습니다."
```

### 🎯 삼항 연산자로 빠르게 데이터를 확인하라.

- 삼항 연사자를 이용하면 **변수의 재할당을 줄일 수 있다.**
- 게다가 새로운 변수 선언 방식은 `if/else` 문을 과도하게 사용하는 문제로 이어지기도 한다.
- 블록 유효 범위 변수를 확인하려고 할 때 블록 밖에서는 확인 결과를 알 수 없다.

```javascript
if (title === '과장') {
  const permissions = ['근로시간','수당'];
} else {
  const permissions = ['근로시간'];
}
permissions; // Uncaught ReferenceError: permissions is not defined
```

- 이렇게 되면 블록 유효 범위 밖에서도 접근 가능한 `var`로 변수를 선언하거나 `let`으로 변수를 선언하고 `if/esle` 문 내부에서 재할당해야 한다.

```javascript
let permissions;
if (title === '과장') {
  permissions = ['근로시간','수당'];
} else {
  permissions = ['근로시간'];
}
```
- 하지만 변수가 생성되는 시점을 걱정해야 하고, 잠재적인 유효 범위 충돌까지 고려해야 한다.
- 이러한 문제를 삼항 연산자로 해결할 수 있다.
- 또한, 삼항 연산자를 이용하면 값을 `const`에 직접 선언하므로 좀 더 예측 가능하다.

```javascript
const permissions = title === '과장' ? ['근로시간','수당'] : ['근로시간'];
```

- 한 가지 주의할 점은 **삼항 연산자를 여러 개 연결해서 사용할 수는 있지만 가급적 피하는 것이 좋다.**

```javascript
const permissions = title === '부장' || title === '과장' ? 
  title === '과장' ?
    ['근로시간', '초과근무승인', '수당'] : ['근로시간', '초과근무승인']
  : ['근로시간'];
```

- 위와 같은 예제 코드를 살펴보면 중첩된 삼항 연산자는 제대로 읽을 수 없게 되었고, 단순함이라는 가치도 잃어버리게 된다.
- 그렇기 때문에 코드를 완전히 **블록 외부로 분리해서 독립적인 함수로 이동시킨다.**
- 이렇게 하면 과도한 코드에 대한 우려 없이 `const`를 사용할 수 있다.

```javascript
function getTimePermissions({ title }) {
  if(title === '과장') {
    return ['근로시간', '초과근무승인', '수당'];
  }
  if (title === '부장') {
    return ['근로시간', '초과근무승인'];
  }
  return ['근로시간'];
}

const permissions = getTimePermissions({ title: '사원' }); // ['근로시간']
```

- 위와 같이 **추상화 없이 한 가지 작업만을 목적으로 하는 짧은 함수를 만드는 것은 아무런 문제가 되지 않고**, 깨끗한 코드를 작성하는 첫 단계이기도 하다.

### 🎯 단락 평가를 이용해 효율성을 극대화하라.
- **단락 평가(short circuiting)** 의 목적은 가장 타당한 정보를 먼저 위치시켜서 정보 확인을 건너뛰는 것이다.
- 아래의 코드는 아이콘 경로가 참이면 해당 경로를 사용하고 아닌 경우 기본값을 사용한다.

```javascript
const icon = {
  path: 'acme/bar.png';
}

function getIconPath(icon) {
  const path = icon.path ? icon.path : 'uploads/default.png';
  return `https://assets.foo.com/${path}`;
}
getIconPath(icon); // 'https://assets.foo.com/acme/bar.png'
```
- 위 코드는 `icon.path`가 두 번이나 확인하는 것을 발견할 수 있다.
- 코드를 개선하기 전에 논리 연산자의 동작원리를 살펴보자.
- `||`으로 작성하는 `OR`연산자는 선택 가능한 값 중 하나라도 true이면 true를 반환하기 때문에 어떤 값이든 `true`를 반환하면 다른 값을 확인할 필요가 없어진다.

```javascript
const name = 'sa' || 'I have no name';
name; // sa
```
- 이러한 방법으로 더 간결하게 바꿀 수 있다.

```javascript
function getIconPath(icon) {
  const path = icon.path || 'uploads/default.png';
  return `https://assets.foo.com/${path}`;
}
```
- 이제 반대의 경우로 `false`가 있을 때 표현식을 중단시켜보자.
- 단락 평가를 이용하는 또 다른 인기 있는 방법을 오류를 방지하는 것으로, 특별히 특정 컬렉션의 메서드 또는 동작을 사용할 때 단락 평가를 사용하는 것이다.

```javascript
// 지정된 배열이 없음
const userConfig1 = {
}
// 내용이 없는 배열
const userConfig2 = {
  images: []
}
// 내용이 있는 배열
const userConfig3 = {
  images: [
    'me.png',
    'work.png',
  ]
}
```

- 원하는 값을 가져올 때 `||` 연산자로 단락 평가를 이용할 때 속성이 정의되지 않은 경우에는 제대로 작동하지 않는다.

```javascript
const userConfig1 = {
}
const img = userConfig1.images[0] || 'default.png';
// Uncaught TypeError: Cannot read property '0' of undefined
```
- 이 경우에는 여러 번 중첩된 조건문을 사용할 수 있다.

```javascript
function getFirstImage(userConfig) {
  let img = 'default.png';
  if(userConfig.images) {
    img = userConfig.images[0];
  }
  return img;
}
```
- 하지만 위 예제 코드에서도 배열에 항목이 없으면 문제가 발생한다.

```javascript
const userConfig = {
  images: []
}
const img = getFirstImage(userConfig); // undefined
```
- 아래와 같이 해결할 수 있다.

```javascript
function getFirstImage(userConfig) {
  let img = 'default.png';
  if(userConfig.images) {
    if(userConfig.images.length){
      img = userConfig.images[0];
    }
  }
  return img;
}
```
- 하지만 코드의 가독성이 좋지 못하기 때문에 단락 평가로 문제를 해결할 수 있다.

```javascript
function getImage(userConfig) {
  if(userConfig.images && userConfig.images.length > 0) {
    return userConfig.images[0];
  }
  return 'default.png';
}
```
- 마지막으로, 단락 평가를 삼항 연산자와 조합해서 확인 과정을 한 줄로 줄일 수 있다.

```javascript
function getImage(userConfig) {
  const images = userConfig.images;
  return images && images.length ? images[0] : 'default.png';
}
```
- 단락 평가를 사용해 코드를 좀 더 읽기 좋게 만들자. **그저 코드를 줄이기 위한 용도가 아니다.**