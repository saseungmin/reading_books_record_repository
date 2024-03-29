---
sidebar_position: 5
---

# 🤔 Chapter 4: 실용주의 편집증

> **Tip 36. 여러분은 완벽한 소프트웨어를 만들 수 없다.**

**실용주의 프로그래머는 자기 자신 역시 믿지 않는다.** 어느 누구도, 심지어는 자기 자신도 완벽한 코드를 작성할 수 없음을 알기 때문에 실용주의 프로그래머는 자신의 실수에 대비한 방어책을 마련한다.

## 🍭 Topic 23. 계약에 의한 설계
계약은 자신과 상대편의 권리 및 책임을 정의한다. 그뿐만 아니라 한쪽이 계약을 어겼을 경우의 대응도 계약 사항에 포함된다.

### 🥕 DBC
DBC(계약에 의한 설계)는 단순하지만 강력한 기법으로, 프로그램의 정확성을 보장하기 위해 소프트웨어 모듈의 권리와 책임을 문서화하고 합의하는 데에 초점을 맞춘다. 정확한 프로그램이란 무엇인가? 자신이 하는 일이라고 주장하는 것보다 많지도 적지도 않게 딱 그만큼만 하는 프로그램이다. 이 주장을 문서화하고 검증하는 것이 "계약에 의한 설계"의 핵심이다.   

소프트웨어 시스템의 모든 함수와 메서드는 **뭔가를 한다.** 그 뭔가를 시작하기 전에 해당 함수는 세상의 상태에 대해 어떤 전제 조건을 갖고 있을 테고, 루틴이 끝난 후에는 세상의 상태가 어떠할 것이라고 선언할 수 있을 것이다.

#### 선행 조건
- 루틴이 호출되기 위해 참이어야 하는 것.
- 즉, 루틴의 요구 사항이다. 루틴의 선행 조건이 위반된 경우에는 루틴이 호출되어서는 안 된다. 제대로 된 데이터를 전달하는 것은 호출하는 쪽으 책임이다.

#### 후행 조건
- 루틴이 자기가 할 것이라고 보장하는 것.
- 즉, 루틴이 완료되었을 때 세상의 상태다. 루틴에 후행 조건이 있다는 것은 곧 루틴이 종국에는 종료될 것이라는 걸 의미한다. 무한 반복은 허용되지 않는다.

#### 클래스 불변식
- 호출자의 입장에서 볼 때는 이 조건이 언제나 참인 것을 클래스가 보장한다.
- 루틴의 내부 처리 도중에는 불변식이 참이 아닐 수도 있지만, 루틴이 끝나고 호출자로 제어권이 반환되는 시점에는 불변식이 참이 되어야 한다.


루틴과 그 루틴을 호출하려는 코드 간의 계약은 다음과 같다.

> 만약 호출자가 루틴의 모든 선행 조건을 충족한다면 해당 루틴은 종료 시 모든 후행 조건과 불변식이 참이 되는 것을 보장한다.

만약 계약 당사자 중 어느 한쪽이라도 이 계약 내용을 지키지 못하면 해결 방안이 실행된다. 예외가 발생할 수도 있고 아니면 프로그램을 종료시킬 수도 있다. 무슨 일이 벌어지든지 확실한 점은 계약에 부응하지 못하는 것은 버그라는 것이다. 이것은 결코 발생해서는 안 되는 일이며, 그렇기 때문에 선행 조건을 이용해서 사용자 입력값을 검증한다거나 해서는 안 된다.

> **Tip 37. 계약으로 설계하라.**

계으름뱅이(lazy) 코드를 강조하고 싶다. 시작하기 전에 자신이 수용할 것은 엄격하게 확인하고, 내어 줄 것에 대해서는 최소한도를 약속하는 것이다. 무엇이든 수용하고 결과로는 무엇이든 다 준다고 계약을 쓰여 있다면, 여러분은 정말이지 많은 코드를 작성해야 할 것이다.

### 🥕 DBC 구현
코드를 작성하기 전에 유효한 입력 범위가 무엇인지, 경계 조건이 무엇인지, 루틴이 뭘 전달한다고 약속하는지, 혹은 더 중요하게는 무엇을 약속하지 않는지 등 나열하는 것만으로도더 나은 소프트웨어를 작성하는 데에 엄청난 도움이 된다.

### 🥕 DBC와 일찍 멈추기
DBC는 우리의 "일찍 작동을 멈춰라."라는 개념과 잘 어울린다. 단정문이나 DBC 방식을 사용하여 선행 조건이나 후행 조건, 불변식을 검증하면 더 일찍 멈추고, 문제에 대한 보다 정확한 정보를 알려줄 수 있을 것이다.   

문제를 찾고 원인을 밝히기 위해서는 사고가 난 지점에서 일찍 멈추는 것이 유리하다.

### 🥕 의미론적 불변식
의미론적 불변식을 사용하면 일종의 철학적 계약인 절대 어겨서는 안 되는 요구 사항을 표현할 수 있다.   

어겨서는 안 되는 고정된 규칙인 요구 사항과 경영진이 바뀌면 얼마든지 없어질 수 있는 단순한 정책을 혼동하지 말아야 한다. 의미론적 불변식은 무언가가 품은 진짜 의미를 중심이 되어야 하며, 훨씬 역동적으로 변하는 비즈니스 규칙처럼 일시적인 정책에 영향을 받으면 안 된다. 우리가 의미론적 불변식이라는 용어를 사용하는 것은 이 때문이다.   

불변식의 자격이 있는 요구 사항을 찾았다면 여러분이 작성하는 모든 문서에 잘 드러나도록 만들어라. 그게 세 부씩 서명하는 요구 사항 문서의 번호붙인 목록이든, 혹은 모든 사람이 볼 수 있는 공용 화이트보드에 쓰인 커다란 메모이든 뭐든 모두가 여러분이 찾는 의미론적 불변식을 잘 드러내야 한다. 명확하고 모호한 점이 없게 서술하도록 노력하라.

> 오류 발생 시 소비자의 입장을 우선하라.

이것은 시스템의 여러 다른 부분에 적용할 수 있는 분명하고 간략하며 명확한 선언이다. 이는 모든 시스템 사용자와 맺는 계약이며 동작에 대한 우리의 보증이다.

### 🥕 동적 계약과 에이전트
지금까지 우리는 계약이 고정불변의 명세라고 가정하고 이야기했다. 하지만 자율 에이전트의 무대에서라면 이야기는 달라진다. "자율"의 정의 따르면 에이전트는 자신이 따르기 원치 않는 요구를 거절할 자유가 있다. 계약을 재협할 자유도 있다. "그걸 제공해 드릴 수는 없어요. 하지만 어려분이 이걸 주신다면 저도 뭔가 다른 걸 드릴 수는 있어요."   

에이전트 기술에 의존하는 어떤 시스템이건 계약의 합의가 **결정적으로** 중요하다는 점은 분명하다. 계약 내용이 매번 동적으로 생성되더라도 마찬가지다.

## 🍭 Topic 24. 죽은 프로그램은 거짓말을 하지 않는다.

우리는 대다수가 코드를 작성할 떄 파일이 성공적으로 닫혔는지, 혹은 트레이스 문이 우리 예상대로 찍혔는지 확인하지 않았던 적이 있을 것이다. 그리고 다른 모든 조건이 늘 그대로라면 그럴 필요가 없었을지도 모른다. 문제의 코드는 정상적인 상황에서는 실패하지 않았을 것이다. 하지만 우리는 지금 방어적으로 코딩하고 있다.   
데이터가 우리가 생각하는 대로인지, 서비스에서 작동하는 코드가 우리가 생각하는 그 코드인지 확인해야 한다.   

모든 오류는 정보를 준다. 여러분은 오류가 발생할 리 없다고 자신을 설득하고선 그걸 무시하기로 할 수도 있다. 반면에 실용주의 프로그래머는 만약 오류가 발생했다면 정말로 뭔가 나쁜 일이 생긴 것이라고 자신에게 이야기한다. 일단 그놈의 오류 메시지 좀 읽어라.

### 🥕 잡은 후 그냥 놓아주는 것은 물고기뿐
어떤 개발자는 모든 예외를 `catch`나 `rescue`로 잡은 후 로그 메시지를 좀 찍은 다음 다시 예외를 발생하시키는 것이 좋은 방식이라고 여기는 듯하다. 이를 테면 다음과 같은 식으로 코드를 쓴다. 여기서 아무 인자 없이 쓴 `raise`는 현재 예외를 다시 발생시키는 것이다.

```ruby
try do
  add_score_to_board(score);
rescue InvalidScore
  Logger.error("올바르지 않은 점수는 더할 수 없음. 종료합니다.");
  raise
rescue BoardServerDown
  Logger.error("점수를 더할 수 없음: 보드가 죽었음. 종료합니다.");
  raise
rescue StaleTransaction
  Logger.error("점수를 더할 수 없음: 오래된 트랜잭션. 종료합니다.");
  raise
end
```

실용주의 프로그래머라면 다음과 같이 쓸 것이다.

```java
add_score_to_board(score);
```

이렇게 코드를 작성하는 이유는 두 가지다. 첫째, 애플리케이션 코드가 오류 처리 코드 사이에 묻히지 않는다. 더 중요한 두 번째 이유는 코드의 결합도를 높이지 않는다는 점이다. 길게 쓴 코드에서는 `add_score_to_board` 메서드가 발생시킬 수 있는 모든 예외를 다 나열해야 한다. 만약 메서드 저자가 새로운 예외를 추가하면 이 코드도 조금이지만 갱신이 필요한 코드가 되어 버린다. 보다 실용적인 두 번째 코드에서는 새로운 예외가 자동으로 전파된다.

> **Tip 38. 일찍 작동을 멈춰라.**

### 🥕 망치지 말고 멈춰라
가능한 한 빨리 문제를 발견하면 좀 더 일찍 시스템을 멈출 수 있으니 더 낫다. 계다가 프로그램을 멈추는 것이 할 수 있는 최선인 경우가 흔하다.   

어떤 환경에서는 실행 중인 프로그램을 그냥 종료해 버리는 것이 적절치 못할 수도 있다. 해제되지 않은 리소스가 남아 있을 수도 있고, 로그 메시지를 기록해야 할 수도 있고, 열려 있는 트랜잭션을 정리해야 하거나 다른 프로세스와 상호작용이 필요할지도 모른다.   

그렇지만 기본 원칙은 똑같다. 방금 있을 수 없는 일이 발생했다는 것을 코드가 발견했다면 프로그램은 더는 유효하지 않다고 할 수 있다. 이시점 이후로 하는 일은 모두 수상쩍은 게 된다. 되도록 빨리 종료할 일이다.   
일반적으로 죽은 프로그램이 끼치는 피해는 이상한 상태의 프로그램이 끼치는 피해보다 훨씬 적은 법이다.

## 🍭 Topic 25. 단정적 프로그래밍

> 그런 일은 절대 일어날 리 없어

"이 애플리케이션을 외국에서 사용하는 일은 절대 없을 텐데 뭐하로 국제화하지?", "count는 음수가 될 수 없어.", "로깅은 실패할 리 없어."   
이런 식으로 자신을 기만하지 말자, 특히 코딩할 때는.

> **Tip 39. 단정문으로 불가능한 상황을 예방하라.**

"하지만 물론 그런 일은 절대 일어나지 않을 거야."라는 생각이 든다면 그런 일을 확인하는 코드를 추가하라. 가장 간단하게 추가하는 방법은 단정문을 사용하는 것이다. 대부분의 언어 구현에서 조건이 참인지 거짓인지 확인하는 `assert`의 일종을 찾을 수 있을 것이다. 이런 단정문은 엄청나게 유용하다. 매개 변수나 결과가 절대 `null`이어서는 안 된다면 명시적으로 검사하라.

```java
assert (result != null);
```

자바나 파이썬의 단정문에는 문자열로 설명을 추가할 수 있다. 꼭 설명을 넣어라.

```java
assert  result != null && result.size() > 0 : "XYZ의 결과가 비어 있음";
```

단정은 알고리즘의 동작을 검사하는 데도 유용하다. 여러분이 아주 기발한 정렬 알고리즘인 `my_sort`를 작성했다면 그것이 제대로 작동하는지 확인하라.

```java
books = my_sort(find("SF"))
assert(is_sorted?(books))
```

하지만 진짜 오류 처리를 해야 하는 곳은 단정을 대신 사용하지는 말라. 단정은 결코 일어나면 안 되는 것들을 검사한다. 다음과 같은 코드를 작성해서는 안 된다.

```ruby
puts("'Y'나 'N'을 입력하시오: ")
ch = gets[0] # 응답의 첫 글자만 분리
assert((ch == 'Y')) || (ch == 'N') # 몹시 나쁜 생각이다!
```

그리고 단정이 실패할 때 대부분이 `assert` 구현이 프로세스를 종료시킨다고 해서 여러분이 작성하는 버전도 그래야 할 이유는 없다. 만약 리소스를 해제할 필요가 있다면 단정으로 인해 발생하는 예외를 잡거나 프로그램 종료를 중지시키고 여러분의 오류 처리 루틴을 실행하라. 다만, 프로세스가 죽는 몇 밀리초의 시간 동안 여러분의 코드를 실행할 때 애초에 단정을 실패하게 한 잘못된 정보에 의존하지 않도록 하라.

### 🥕 단정과 부작용
단정문을 쓸 때 조건을 평가하는 코드에 부작용(side effect)이 있다면 이런 일이 발생할 수 있다. 예를 들어 코드를 다음과 같이 작성하는 것은 그리 좋은 생각이 아니다.

```java
while (iter.hasMoreElements()) {
  assert(iter.nextElement() != null);
  Object obj = iter.nextElement();
  // ...
}
```

단정문 안에 있는 `.nextElement()` 호출은 이 호출이 반환하는 원소 다음으로 반복자를 이동시키는 부작용이 있다. 그러므로 이 반복문은 컬렉션의 원소 중 절반만 처리하게 된다. 다음과 같이 작성해야 한다.

```java
while (iter.hasMoreElements()) {
  Object obj = iter.nextElement();
  assert(obj != null);
  // ...
}
```

이는 디버깅 행위가 디버깅하려는 시스템의 행동을 바꿔 버리는 일종의 "하이젠버그"적인 문제다.

### 🥕 단정 기능을 켜 둬라
단정문에 관한 흔한 오해가 하나 있다. 대략 다음과 비슷하다.

> 단정은 코드를 느리게 만든다. 단정은 일어나서는 안 되는 일들을 검사하기 때문에 코드 속에 버그가 있을 때만 단정 검사가 실패할 것이다. 일단 코드가 테스트되고 배포된 다음에는 더 이상 단정이 필요하지 않다. 그러니 코드 실행이 빨라지도록 단정을 꺼버려야 한다. 단정은 디버깅 도구일 뿐이다.

여리게은 두 가지 명백하게 틀린 가정이 있다. 첫째, 테스트가 모든 버그를 발견한다는 가정이다. 실제로는 프로그램이 조금만 복잡해져도 여러분의 코드가 거칠 수 있는 경로의 전체 조합에서 지극히 적은 비율조차도 테스트하기 힘들다. 들째, 낙관주의자들은 여러분의 프로그램이 험한 세상에서 돌아간다는 사실을 잊는다. 여러분의 첫 번째 방어선은 가능한 오류를 모두 검사하는 것이고, 그다음은 그러고도 놓친 것을 잡아내기 위해 단정을 사용하는 것이다.   

성능 문제가 있다 하더라도 정말 문제가 되는 단정문만 끄도록 하자. 앞에 나온 정렬 예시가 여러분 애플리케이션의 핵심적인 부분이고 따라서 속도가 빨라야 할지도 모른다. 검사를 추가하는 것은 그 데이터 전체를 한 번 더 처리하는 것을 의미하기에 수용하기 힘들 수도 있다. 그 단정 하나만 끌 수 있게 만들고 나머지는 그대로 둬라.

## 🍭 Topic 26. 리소스 사용의 균형
우리는 코딩할 때 언제나 리소스을 관리한다. 그렇지만 많은 개발자가 리소스 할당과 해제를 다루는 알관된 방침을 갖고 있지 않다.

> **Tip 40. 자신이 시작한 것은 자신이 끝내라.**

리소스를 할당하는 함수나 객체가 리소스를 해제하는 책임 역시 져야 한다는 뜻일 뿐이다.   

"자신이 시작한 것은 자신이 끝내라." 팁이 가르쳐 주는 것은 이상적으로 말해서 리소스를 할당하는 루틴이 해제 역시 책임져야 한다는 것이다.

> **Tip 41. 지역적으로 행동하라.**

### 🥕 중첩 할당
리소스 할당의 기본 패턴을 확장해서 한 번에 여러 리소스를 사용하는 루틴에 적용할 수 있다. 두 가지만 더 제안하겠다.

- 리소스를 할당한 순서의 역순으로 해제하라. 이렇게 해야 한 리소스가 다른 리소스를 참조하는 경우에도 참조를 망가트리지 않는다.
- 코드의 여러 곳에서 동일한 구성의 리소스들을 할당하는 경우에는 언제나 같은 순서로 할당해야 교착 가능성을 줄일 수 있다.

어떤 종류의 리소스를 사용하고 있는지는 중요하지 않다. 리소스를 할당하는 것이 언제나 그 리소스를 해제할 책임까지 져야 한다. 그렇지만 몇몇 언어에서는 이 개념을 좀 더 발전시킬 수 있다.

### 🥕 객체와 예외
객체 지향 언어로 프로그래밍을 한다면 리소스를 클래스 안에 캡슐화하는 것이 유용할 수 있다. 특정 유형의 리소스가 필요할 때마다 그 클래스의 객체를 생성하면 된다.

### 🥕 균형 잡기와 예외
예외를 지원하는 언어에서는 리소스 해제가 골치 아플 수 있다. 예외가 던져진 경우 예외 발생 이전에 할당된 모든 것이 깨끗이 청소된다고 어떻게 보장할 수 있을까? 일반적으로 두 가지 방식이 있다.

1. 변수 스코프를 사용한다. 예를 들어 C++나 러스트의 스택 변수가 있다.
2. `try-catch` 블록에서 `finally` 절을 사용한다.

### 🥕 리소스 사용의 균형을 잡을 수 없는 경우
이런 경우의 요령은 메모리 할당에 대한 의미론적 불변식을 정하는 것이다. 한군데 모은 자료 구조 안의 자료를 누가 책임지는지 정해 놓아야 한다. 자료 구조에서 최상위 구조의 메모리 할당을 해제할 경우 어떻게 처리해야 할까? 크게는 다음 세 가지 방법이 있다.

- 최상위 구조가 자기 안에 들어 있는 하위 구조들을 해제할 책임을 진다. 하위 구조들은 또다시 재귀적으로 자기 안에 들어 있는 자료들을 해제할 책임을 지고, 이런 식으로 반복된다.
- 최상위 구조가 그냥 할당 해제한다. 최상위 구조가 참조하던 하위 구조들은 연결이 끊어져서 다른 곳에서 참조하지 않는다면 외톨이가 된다.
- 최상위 구조가 하나라도 하위 구조를 가지고 있으면 자신의 할당 해제를 거부한다.

### 🥕 균형을 점검하기
실용주의 프로그래머는 자신을 포함해서 아무도 맏지 않는다. 우리는 언제나 정말로 리소스가 적절하게 해제되었는지 실제로 점검하는 코드를 작성하는 것을 좋아한다. 프로그램 논리에 따르자면 자원들이 반드시 특정한 상태에 있어야 한다고 지정할 수 있는 지점들이 코드 속에 있을 것이다. 래퍼를 사용해서 상태가 올바른지 점검하라.

## 🍭 Topic 27. 헤드라이트를 앞서가지 말라
소프트웨어 개발에서 우리의 "헤드라이트"는 제한되어 있다.   
우리는 너무 먼 미래는 내다볼 수 없고, 정면에서 벗어난 곳일수록 더 어둡다. 그래서 실용주의 프로그래머에게는 확고한 규칙이 있다.

> **Tip 42. 작은 단계들을 밟아라. 언제나.**

언제나 신중하게 작은 단계들을 밟아라. 더 진행하기 전에 피드백을 확인하고 조정하라. 피드백의 빈도를 여러분의 제한 속도라고 생각하라. "너무 큰" 단계나 작업은 하지 않게 될 것이다.   
여기서 피드백이란 무엇을 말하는 걸까? 여러분의 행동을 독립적으로 확증하거나 반증하는 것이라면 모두 피드백이다. 예를 들어 다음과 같다.

- REPL의 결과는 API나 알고리즘을 여러분이 제대로 이해하고 있는지 피드백을 준다.
- 단위 테스트는 직전에 고친 코드에 대한 피드백을 준다.
- 사용자 데모 및 사용자와의 대화는 기능이나 사용성에 대한 피드백을 준다.

우리는 미래의 유지 보수를 고려해서 설계해야 하지 않느냐고? 맞다. 하지만 여러분이 볼 수 있는 미래까지만 고려해야 한다. 미래가 어떤 모습일지 더 많이 예측하려 할수록 여러분이 틀릴 가능성은 계속 높아질 것이다. 불확실한 미래에 대비한 설계를 하느라 진을 빼는 대신 언제나 교체 가능한 코드를 작성하여 대비하면 된다. 여러분의 코드를 더적절한 무언가로 대체하기 쉽게 설계하라. 코드를 교체할 수 있도록 하면 응집도나 결합도, DRY에도 도움이 되고, 전반적으로 더 나은 설계가 탄생할 것이다.   

설사 여러분이 미래에 대한 확신이 있더라도 저 모퉁이 너머에 블랙 스완이 기다리고 있을 수 있다.

### 🥕 블랙 스완
이 책의 1판이 나올 무렵 컴퓨터 잡지와 온라이 게시판을 달군 주제는 "데스크톱 GUI 전쟁의 승자는 누구인가? 모티프인가 아니면 오픈룩인가?"였다. 질문 자체가 틀렸다. 아마 여러분은 두 기술 모두 들어 본 적이 없을 것이다. 누구도 "승자"가 되지 못했고 브라우저 중심의 웹이 빠르게 중원을 평정했다.

> **Tip 43. 예언하지 말라.**

대부분의 경우 내일은 오늘과 거의 같을 것이다. 하지만 확신하지는 말라.
