---
sidebar_position: 24
sidebar_label: 23. 테스트 진단
---

# 🌈 Chapter 23: 테스트 진단

## 📚 실패하는 설계
- 테스트의 핵심은 통과가 아니라 실패에 있다. 테스트 실패가 우리가 알아차리지 못했던 코드상의 암시적인 관계를 드러낸다.
- 절대 하지 말아야 할 일은 디버거를 열어서 테스트한 코드를 단계별로 훑어 내려가면서 불일치한 점을 알아내는 것이다. 그렇게 한다는 것은, 최소한 우리가 작성한 테스트가 요구 사항을 충분히 **명확하게 표현하지 못했다는 것을 의미한다.**

## 📚 작고, 문제에 집중하고, 이름을 잘 지은 테스트
- 진단을 개선하는 가장 쉬운 방법은 각 테스트를 작으면서 문제에 초점을 맞춘 상태로 유지하고 테스트에 **가독성 있는 이름을 부여**하는 것이다.


## 📚 설명력 있는 단정 메시지
- JUnit의 모든 단정 메서드에는 단정이 실패했을 때 표시할 메시지를 첫 번째 매개변수로 전달할 수 있다. 이 기능은 단정 메시지를 더욱 유용하게 할 수 있다.
- 단정의 대상이 되는 값을 식별하는 값을 추가한다.

```java
assertEquals("account id", "573242", customer.getAccountId());
assertEquals("outstanding balance", 16301, customer.getOutstandingBalance());
```

## 📚 매처를 활용한 세부 사항 강조
- 개발자들은 햄크레스트 매처의 `assertThat()`을 이용해 차이점을 정확하게 이해하는 데 도움을 주기 위해 불일치하는 값을 기술하는 보조 기능이 포함되어 있어 어느 값이 중요한지 정확한 실패 메시지를 만들어낸다.

## 📚 자기 서술적인 값
- 단정 내의 값에 세부 사항을 추가할 수 있다. 단정에 세부 사항을 추가해야 한다면 아마도 우리가 실패를 좀 더 이해하기 쉽게 만들 수도 있다는 힌트이다.
- 자기 서술적인 값으로  실패 메시지를 개선할 수 있다.

## 📚 명확하게 가공된 값
- 검사 대상이 되는 값이 스스로를 쉽게 설명하지 못할 때가 있다. (`char`나 `int`에는 충분한 정보가 없다.)
- 한 가지 방법은 제품에서 기대할 법한 값과는 확연히 다른 별난 값을 사용하는 것이다.
- 팀에서 공통적인 값에 대해 관계를 만들어주면 관례가 분명 두드러지게 드러날 수 있다.

## 📚 추적자 객체
- 때로는 테스트 중인 코드로 전달한 객체가 적절한 협력 객체에까지 전달됐는지 확인하고 싶을 때가 있다. 이러한 값을 표현하기 위해 *명확하게 가공된 값* 타입에 해당하는 추적자 객체(tracer object)를 만들 수 있다.
- 추적자 객체는 뭔가가 실패했을 때 자신의 역할을 기술하는 것을 제외하면 **자체적인 보조적 행위가 아무것도 없는 더미 객체**에 해당한다.
- 추적자 객체는 클래스에 TDD를 적용할 때 유용한 설계 도구일 수 있다. 때때로 우리는 빈 인터페이스로 도메인 개념을 표시해 인터페이스가 협력에 어떻게 사용되는지 보여주기도 한다.

## 📚 예상이 충족됐음을 명시적으로 단정하라
- 예상 구문과 단정이 모두 포함된 테스트는 혼란스러운 실패를 만들어낼 수 있다.
- 가령 협력 객체가 적절히 동작하지 않고 잘못된 값을 반환한다면 단정이 예상 구문을 검사하기 전에 실패할지도 모른다. 다시 말해 이렇게 되면 실제로 테스트 실패를 야기한 누락된 협력 객체보다는 **올바르지 않은 계산 결과를 보여주는 실패 보고가 만들어진다.**
- 일부 경우에는 어떤 테스트 단정이 올바른 실패 보고를 획득하기 전에 Mockery에 대해 `assertIsSatisfied()` 메서드를 호출하는 편이 가치있다.

```java
context.assertIsSatisfied();
assertThat(result, equalTo(expectedResult));
```

- 예상 구문이 충족되지 않고 후행 조건 단정이 대신 실패하기 때문에 테스트가 실패하리라 예상한다면 모든 예상이 충족됐음을 단정하는 명시적인 호출을 추가해야한다는 사실을 알게 될 것이다.

## 📚 진단은 일급 기능이다
- 요즘에는 네 단계 TDD 주기(실패, 보고, 통과, 리팩터링)를 따르려 하는데, 이렇게 해서 우리가 아는 기능을 이해할 수 있으며, 한 달 내에 기능을 변경해야 하는 사람이 누구이든 그 누군가도 기능을 이해할 것이기 때문이다.

> 실패하는 테스트 작성 -> 진단 정보를 명확하게 표현 -> 테스트를 통과시키기 -> 리팩터링
