---
sidebar_position: 7
---

# 🌈 Chapter 6: 메시지와 인터페이스
- 훌륭한 객체지향 코드를 얻기 위해서는 클래스가 아니라 객체를 지향해야 한다. 좀 더 정확하게 말해서 협력 안에서 객체가 수행하는 책임에 초점을 맞춰야 한다. 여기서 중요한 것은 책임이 객체가 수신할 수 있는 메시지의 기반이 된다는 것이다.

## 📚 협력과 메시지

### 🎈 클라이언트-서버 모델
- 협력은 어떤 객체가 다른 객체에게 무언가를 요청할 때 시작되는데 메시지는 객체 사이의 협력을 가능하게 하는 매개체다. 
- 객체가 다른 객체에게 접근할 수 있는 유일한 방법은 메시지를 전송하는 것뿐이다.
- 두 객체 사이의 협력 관계를 설명하기 위해 사용하는 전통적인 메타포는 **클라이언트-서버 모델**이다. (메시지를 전송하는 객체는 클라이언트, 메시지를 수신하는 객체는 서버 / 단방향 상호작용)
- 협력의 관점에서 객체는 두 가지 종류의 메시지 집합으로 구성되는데 하나는 객체가 수신하는 메시지의 집합이고 다른 하나는 외부의 객체에게 전송하는 메시지의 집합이다.
- 객체가 독립적으로 수행할 수 있는 것보다 더 큰 책임을 수행하기 위해서는 다른 객체와 협력해야 한다. 그리고 두 객체 사이의 협력을 가능하게 해주는 매게체가 바로 메시지이다.

### 🎈 메시지와 메시지 전송
- **메시지**는 객체들이 협력하기 위해 사용할 수 있는 유일한 의사소통 수단이다.
- **메시지 전송**(**메시지 패싱**)은 한 객체가 다른 객체에게 도움을 요청하는 것이다.
- **메시지 전송자**는 메시지를 전송하는 객체이다. (클라이언트)
- **메시지 수신자**는 메시지를 수신하는 객체이다. (서버)
- 메시지는 **오퍼레이션명**과 **인자**로 구성되며 메시지 전송은 여기에 **메시지 수신자**를 추가한 것이다. 따라서 메시지 전송은 메시지 수신자, 오퍼레이션명, 인자의 조합이다.
- 아래는 자바의 예시이다.

```java
//수신자.오퍼레이션명(인자)
condition.isSatisfiedBy(screening);
```

### 🎈 메시지와 메서드
- 메시지를 수신했을 때 실제로 실행되는 함수 또는 프로시저를 **메서드**라고 부른다.
- 코드 상에서 동일한 이름의 변수에게 동일한 메시지를 전송하더라도 객체의 타입에 따라 실제 실행되는 메서드가 달라질 수 있다.
- 객체는 메시지와 메서드라는 두 가지 서로 다른 개념을 실행 시점에 연결해야 하기 때문에 컴파일 시점과 실행 시점의 의미가 달라질 수 있다. 메시지와 메서드의 구분은 메시지 전송자와 수신자가 느슨하게 결합될 수 있게 한다.
- 메시지 전송자는 자신이 어떤 메시지를 전송해야 하는지만 알면 된다. 수신자는 어떤 클래스의 인스턴스인지, 어떤 방식으로 요청을 처리하는지 모르더라도 원활한 협력이 가능하다. 메시지 수신자 역시 누가 메시지를 전송하는지 알 필요가 없다. 단지 메시지가 도착했다는 사실만 알면 된다.

### 🎈 퍼블릭 인터페이스와 오퍼레이션
- 외부의 객체는 오직 객체가 공개하는 메시지를 통해서만 객체와 상호작용할 수 있다. 이처럼 객체가 의사소통을 위해 외부에 공개하는 메시지의 집합을 **퍼블릭 인터페이스**라고 부른다.
- 프로그래밍 언어의 관점에서 퍼블릭 인터페이스에 포함된 메시지를 **오퍼레이션**이라고 부른다. 오퍼레이션은 수행 가능한 어떤 행동에 대한 추상화다. (`DiscountCondition`인터페이스에 정의된 `isSatisfiedBy`가 오퍼레이션에 해당한다.)
- 그에 비해 메시지를 수신했을 때 실제로 실행되는 코드는 메서드라고 부른다. (`SequenceCondition`, `PeriodCondition`에 정의된 각각의 `isSatisfiedBy`는 실제 구현을 포함하기 때문에 메서드라고 부른다.)

### 🎈 시그니처
- 오퍼레이션(또는 메서드)의 이름과 파라미터의 목록을 합쳐 **시그니처**(**signature**)라고 부른다.
- 오퍼레이션은 실행 코드 없이 시그니처만 정의한 것이다. 메서드는 이 시그니처에 구현을 더한 것이다.
- 일반적으로 메시지를 수신하면 오퍼레이션의 시그니처와 동일한 메서드가 실행된다.
- 오퍼레이션의 관점에서 다형성이란 동일한 오퍼레이션 호출에 대해 서로 다른 메서드들이 실행되는 것이라고 정의할 수 있다.

## 📚 인터페이스톼 설계 품질
- 좋은 인터페이스는 **최소한의 인터페이스**와 **추상적인 인터페이스**라는 조건을 만족해야 한다.
- 최소한의 인터페이스는 꼭 필요한 오퍼레이션만을 인터페이스에 포함하는 것이고 추상적인 인터페이스는 어떻게 수행하는지가 아니라 **무엇을 하는지**를 표현한다.
- 이렇게 설계할 수 있는 가장 좋은 방법은 책임 주도 설계 방법을 따르는 것이다. (메시지를 먼저 선택함으로써 무관한 오퍼레이션이 인터페이스에 스며드는 것을 방지)
- 메시지가 객체를 선택하게 함으로써 클라이언트의 의도를 메시지에 표현할 수 있게 한다.
  
### 🎈 디미터 법칙
- 4장의 절차적인 방식의 영화 예매 시스템 코드 중 할인 가능 여부를 체크하는 코드이다.

```java
public class ReservationAgency {
  public Reservation reserve(Screening screening, Customer customer, int audienceCount) {
    Movie movie = screening.getMovie();

    boolean discountable = false;
    // DiscountCondition에 대해 루프를 돌면서 할인 가능 여부를 확인
    for (DiscountCondition condition : movie.getDiscountConditions()) {
      if (condition.getType() == DiscountConditionType.PERIOD) {
        // 기간 조건
      } else {
        discountable = condition.getSequence() == screening.getSequence();
      }

      if (discountable) {
        break;
      }
    }

    // ...
  }
}
```

- 이 코드에서 가장 큰 단점은 `ReservationAgency`와 인자로 전달된 `Screening` 사이의 결합도가 너무 높기 때문에 `Screening` 내부 구현을 변경할 때 마다 `ReservationAgency`도 함께 변경된다는 것이다.
- 이처럼 협력하는 객체의 내부 구조에 대한 결합으로 인해 발생하는 설계 문제를 해결하기 위해 제안된 원칙이 **디미터 법칙**(**Law of Demeter**)이다.
- 디미터 법칙은 객체의 내부 구조에 강하게 결합되지 않도록 협력 경로를 제안하라는 것이다. (낯선 자에게 말하지 말라, 오직 인접한 이웃하고만 말하라)
- 디미터 법칙을 따르기 위해서는 클래스가 특정한 조건을 만족하는 대상에게만 메시지를 전송하도록 프로그래밍해야 한다.
- 모든 클래스 C와 C에 구현된 모든 메서드 M에 대해서, M이 메시지를 전송할 수 있는 모든 객체는 다음에 서술된 클래스의 인스턴스여야 한다. 이때 M에 의해 생성된 객체나 M이 호출하는 메서드에 의해 생성된 객체, 전역 변수로 선언된 객체는 모두 M의 인자로 간주한다.
- 다음은 4장에서 결합도 문제를 해겨라기 위해 수정한 `ReservationAgency`의 최종 코드이다.

```java
public class ReservationAgency {
  public Reservation reserve(Screening screening, Customer customer, int audienceCount) {
    Money fee = screening.calculateFee(audienceCount);
    return new Reservation(customer, screening, fee, audienceCount);
  }
}
```

- 이 코드에서 `ReservationAgency`는 메서드의 인자로 전달된 `Screening` 인스턴스에게만 메시지를 전송한다. `ReservationAgency`는 `Screening` 내부에 대한 어떤 정보도 알지 못한다. 때문에 `Screening`의 내부 구현을 변경해도 `ReservationAgency`를 변경할 필요가 없다.
- 디미터의 법칙을 따르면 **부끄럼타는 코드**를 작성할 수 있다. 부끄럼타는 코드란 불필요한 어떤 것도 다른 객체에게 보여주지 않으며, 다른 객체의 구현에 의존하지 않는 코드를 말한다.
- 디미터 법칙을 따르는 코드는 메시지 수신자의 내부 구조가 전송자에게 노출되지 않으며, 메시지 전송자는 수신자의 내부 구현에 결합되지 않는다. 따라서 낮은 결합도를 유지할 수 있다.
- 다음은 디미터 법칙을 위반하는 코드이다.

```java
screening.getMovie().getDiscountConditions();
```
- 메시지 전송자가 수신자의 내부 구조에 대해 물어보고 반환하는 요소에 대해 연쇄적으로 메시지를 전송한다. 이와 같은 코드를 **기차 충돌**(**train wreck**)이라고 부른다. 내부 구현이 외부로 노출되어 메시지 수신자의 캡슐화는 무너지고, 메시지 전송자가 메시지 수신자의 내부 구현에 강하게 결합된다.
- 다음과 같이 개선할 수 있다.

```java
screening.calculateFee(audienceCount);
```

- 디미터 법칙은 객체가 자기 자신을 책임지는 자율적인 존재여야 한다는 사실을 강조한다.
- 디미터 법칙은 객체의 내부 구조를 묻는 메시지가 아니라 수신자에게 무언가를 시키는 메시지가 더 좋은 메시지라고 속삭인다.

### 🎈 묻지 말고 시켜라
- 디미터 법칙은 훌륭한 메시지는 객체의 상태에 관해 묻지 말고 원하는 것을 시켜야 한다는 사실을 강조한다. **묻지 말고 시켜라**는 이런 스타일의 메시지 작성을 장려하는 원칙을 가리키는 용어다.
- 메시지 전송자는 메시지 수신자의 상태를 기반으로 결정을 내린 후 메시지 수신자의 상태를 바꿔서는 안 된다.
- 이 원칙을 따르면 밀접하게 연관된 정보와 행동을 함께 가지는 객체를 만들 수 있다. 또한 객체의 정보를 이용하는 행동을 객체의 외부가 아닌 내부에 위치시키기 때문에 자연스럽게 정보와 행동을 동일한 클래스 안에 두게 된다.

### 🎈 의도를 드러내는 인터페이스
- 다음과 같이 메서드가 작업을 어떻게 수행하는지를 나타내도록 이름을 짓는 것은 내부 구현 방법을 드러내서 좋지 않는 방법이다.

```java
public class PeriodCondition {
  public boolean isSatisfiedByPeriod(Screening screening) { }
}

public class SequenceCondition {
  public boolean isSatisfiedBySequence(Screening screening) { }
}
```

- 메서드의 이름을 짓는 방법은 어떻게가 아니라 **무엇**을 하는지를 드러내야 한다. 이렇게 이름을 지으면 이해하기 쉽게 만들 수 있고 유연한 코드를 낳는다.
- 무엇을 하는지를 드러내도록 이름을 변경하기 위해서는 클라이언트의 관점에서 협력을 바라봐야 한다. 클라이언트 관점에서의 두 메서드는 할인 여부를 판단하기 위한 작업을 수행하기 때문에 `isSatisfiedBy`로 변경하는 것이 적절하다.

```java
public class PeriodCondition {
  public boolean isSatisfiedBy(Screening screening) { }
}

public class SequenceCondition {
  public boolean isSatisfiedBy(Screening screening) { }
}
```

- 클라이언트의 입장에서 두 메서드는 동일한 메시지를 서로 다른 방법으로 처리하기 때문에 대체 가능하다. 때문에 `DiscountCondition`이라는 인터페이스를 정의하고 인터페이스에 `isSatisfiedBy` 오퍼레이션을 정의한다.

```java
public interface DiscountCondition {
  boolean isSatisfiedBy(Screening screening);
}
```

- 메시지를 어떻게 수행하느냐가 아니라 무엇을 하느냐에 초점을 맞추면 클라이언트의 관점에서 동일한 작업을 수행하는 메서드들을 하나의 타입 계층으로 묶을 수 있는 가능성이 커진다. 이처럼 이름을 짓는 패턴을 **의도를 드러내는 선택자**(**Intention Revealing Selector**)라고 부른다.

### 🎈 함께 모으기
- 디미터 법칙, 묻지 말고 시켜라 스타일, 의도를 드러내는 인터페이스를 이해할 수 있는 좋은 방법 중 하나는 이 원칙을 위반 하는 코드를 살펴보는 것이다.
- 1장의 티켓 판매 도메인이 바로 그것이다.

#### 🐶 디미터 법칙을 위반하는 티켓 판매 도메인

```java
public class Theater {
  private TicketSeller ticketSeller;

  public Theater(TicketSeller ticketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public void enter(Audience audience) {
    if (audience.getBag().hasInvitation()) { // 초대장이 있으면
      Ticket ticket = ticketSeller.getTicketOffice().getTicket();
      audience.getBag().setTicket(ticket); // 판매원이 티켓을 준다.
    } else { // 초대장이 없으면
      Ticket ticket = ticketSeller.getTicketOffice().getTicket();
      audience.getBag().minusAmount(ticket.getFee()); // 관람객이 돈을 지불한다.
      ticketSeller.getTicketOffice().plusAmount(ticket.getFee()); // 판매원이 돈을 받는다.
      audience.getBag().setTicket(ticket); // 티켓을 준다.
    }
  }
}
```

- 위 `Theater`는 인자로 전달된 `audience`와 인스턴스 변수인 `ticketSeller`에게 메시지를 전송하는 것은 문제가 없지만 `audience`와 `ticketSeller` 내부에 포함된 객체에도 직접 접근하기 때문에 디미터 법칙을 위반하고 있다.

```java
audience.getBag().minusAmount(ticket.getFee());
```

- 근본적으로 디미터 법칙을 위반하는 설계는 **인터페이스와 구현의 분리 원칙**을 위반한다.
- 객체의 내부 구조는 구현에 해당한다. `Audience`가 `Bag`을 포한한다는 사실은 `Audience`의 내부 구현에 속한다.
- 디미터 법칙을 위반하는 코드를 수정하는 일반적인 방법은 `Audience`와 `TicketSeller`의 내부 구조를 묻는 대신 `Audience`와 `TicketSeller`가 직접 자신의 책임을 수행하도록 시키는 것이다.

#### 🐶 묻지 말고 시켜라
- **1장의 구현 내용과 비슷. 책 참고**

```java
public class Theater {
  public void enter(Audience audience) {
    ticketSeller.setTicket(audience);
  }
}

public class TicketSeller {
  public void setTicket(Audience audience) {
    ticketOffice.plusAmount(
      audience.setTicket(ticketOffice.getTicket());
    )
  }
}

public class Audience {
  public Long setTicket(Ticket ticket) {
    return bag.setTicket(ticket);
  }
}
```
- 디미터 법칙과 묻지 말고 시켜라 스타일을 따르면 자연스럽게 자율적인 객체로 구성된 유연한 협력을 얻게 된다.
- 구현이 객체의 퍼블릭 인터페이스에 노출되지 않기 때문에 객체 사이의 결합도는 낮아진다. 응집도 역시 높아진다.

#### 🐶 인터페이스에 의도를 드러내자
- 현재의 인터페이스는 클라이언트의 의도를 명확하게 드러내지 못한다. `TicketSeller`의 `setTicket`?? `Audience`의 `setTicket`??
- 클라이언트 개발자를 혼란스럽게 만들 확률이 높다. 의도를 명확하게 드러내지 못하고 있다.

```java
public class TicketSeller {
  public void sellTo(Audience audience) {}
}

public class Audience {
  public Long buy(Ticket ticket) {}
}

public class Bag {
  public Long hold(Ticket ticket) {}
}
```
- 오퍼레이션의 이름은 협력이라는 문맥을 반영해야 한다. 오퍼레이션은 클라이언트가 객체에게 무엇을 원하는지 표현해야 한다. 다시 말해 객체 자신이 아닌 클라이언트의 의도를 표현하는 이름을 가져야 한다.
- 디미터 법칙은 객체 간의 협력을 설계할 때 캡슐화를 위반하는 메시지가 인터페이스에 포함되지 않도록 제한한다.
- 묻지 말고 시켜라 원칙은 디미터 법칙을 준수하는 협력을 만들기 위한 스타일을 제시한다.
- 의도를 드러내는 인터페이스 원칙은 객체의 퍼블릭 인터페이스에 어떤 이름이 드러나야 하는지에 대한 지침을 제공함으로써 코드의 목적을 명확하게 커뮤니케이션할 수 있게 해준다.

## 📚 원칙의 함정
- 이 세 가지 원칙은 객체의 퍼블릭 인터페이스를 깔끔하고 유연하게 만들 수 있는 훌륭한 설계 원칙이지만 절대적인 법칙은 아니다.
- 원칙이 현재 상황에 부적합하다고 판단된다면 과감하게 원칙을 무시하라. 원칙을 아는 것보다 더 중요한 것이 언제 원칙이 유용하고 언제 유용하지 않은지를 판단할 수 있는 능력을 기르는 것이다.

### 🎈 디미터 법칙은 하나의 도트(.)를 강제하는 규칙이 아니다
- 아래의 코드가 디미터 법칙을 위반한다 생각할 수도 있다.

```java
IntStream.of(1, 15, 20, 3, 9).filter(x -> x > 10).distinct().count();
```

- 하지만 위 코드에서 `of`, `filter`, `distinct` 메서드는 모두 `IntStream`이라는 동일한 클래스의 인스턴스를 반환한다. 즉, `IntStream`의 인스턴스를 또 다른 `IntStream`의 인스턴스로 변환한다.
- 따라서 이 코드는 디미터 법칙을 위반하지 않는다.
- 외 코드는 내부 구조가 외부로 노출되지 않는다. 단지 다른 `IntStream`으로 변환할 뿐, 객체를 둘러싸고 있는 캡슐은 그대로 유지된다.

### 🎈 결합도와 응집도의 충돌
- 일반적으로 어떤 객체의 상태를 물어본 후 반환된 상태를 기반으로 결정을 내리고 그 결정에 따라 객체의 상태를 변경하는 코드는 묻지 말고 시켜라 스타일로 변경해야 한다.
- 하지만 묻지 말고 시켜라와 디미터 법칙을 준수하는 것이 항상 긍정적인 결과로만 귀결되는 것은 아니다. 모든 상황에서 맹목적으로 위임 메서드를 추가하면 같은 퍼블릭 인터페이스 안에 어울리지 않는 오퍼레이션들이 공존하게 된다. 결과적으로 응집도가 낮아진다.
- 클래스는 하나의 변경 원인만 가져야 한다.
- 디미터 법칙의 위반 여부는 묻는 대상이 객체인지, 자료 구조인지에 달려있다. 객체는 내부 구조를 숨겨야 하므로 디미터 법치을 따르는 것이 좋지만 자료 구조라면 당연히 내부를 노출해야 하므로 디미터 법칙을 적용할 필요가 없다.


## 📚 명령-쿼리 분리 원칙
- **명령-쿼리 분리 원칙**은 퍼블릭 인터페이스에 오퍼레이션을 정의할 때 참고할 수 있는 지침을 제공한다.
- **루틴**(**routine**)이란 어떤 절차를 묶어 호출 가능하도록 이름을 부여한 기능 모듈이다.
- 루틴은 **프로시저**와 **함수**로 구분할 수 있다.
- 프로시저와 함수의 구분은 부수효과와 반환값의 유무로 구분된다.
- 프로시저는 정해진 절차에 따라 내부의 상태를 변경하는 루틴의 한 종류다.
- 함수는 어떤 절차에 따라 필요한 값을 계산해서 반환하는 루틴의 한 종류이다.

> 프로시저는 부수효과를 발생시킬 수 있지만 값을 반환할 수 없다.   
> 함수는 값을 반환할 수 있지만 부수효과를 발생시킬 수 없다.

- **명령**과 **쿼리**는 객체의 인터페이스 측면에서 프로시저와 함수를 부르는 또 다른 이름이다.
- 객체의 상태를 수정하는 오퍼레이션을 명령이라고 부르고 객체와 관련된 정보를 반환하는 오퍼레이션을 쿼리라고 부른다.
- 명령-쿼리 분리 원칙의 요지는 오퍼레이션은 부수효과를 발생시키는 명령이거나 부수효과를 발생시키지 않는 쿼리 중 하나여야 한다는 것이다. 어떤 오퍼레이션도 명령인 동시에 쿼리여서는 안 된다. 따라서 명령과 쿼리를 분리하기 위해서는 다음의 두 가지 규칙을 준수해야 한다.
> 객체의 상태를 변경하는 명령은 반환값을 가질 수 없다.   
> 객체의 정보를 반환하는 쿼리는 상태를 변경할 수 없다.

- 마틴 파울러는 명령-쿼리 분리 원칙에 따라 작성된 객체의 인터페이스를 **명령-쿼리 인터페이스**라고 부른다.

### 🎈 반복 일정의 명령과 쿼리 분리하기
- 다음은 `Event` 클래스이다.

```java
public class Event {
  private String subject; // 주제
  private LocalDateTime from; // 시작 일시
  private Duration duration; // 소요 시간

  public Event(String subject, LocalDateTime from, Duration duration) {
    this.subject = subject;
    this.from = from;
    this.duration = duration;
  }
}
```

- 만약 2019년 5월 8일 수요일 10시 30분부터 11시까지 열리는 회의를 표현하는 `Event`의 인스턴스는 다음과 같이 생성할 수 있다.

```java
Event meeting = new Event("회의",
  LocalDateTime.of(2019, 5, 8, 10, 30),
  Duration.ofMinutes(30));
```

- 반복 일정은 `RecurringSchedule` 클래스로 구현할 수 있다.

```java
public class RecurringSchedule {
  private String subject; // 주제
  private DayOfWeek dayOfWeek; // 반복될 요일
  private LocalTime from; // 시작 시간
  private Duration duration; // 기간

  public RecurringSchedule(String subject, DayOfWeek dayOfWeek, LocalTime from, Duration duration) {
    this.subject = subject;
    this.dayOfWeek = dayOfWeek;
    this.from = from;
    this.duration = duration;
  }

  public DayOfWeek getDayOfWeek() {
    return dayOfWeek;
  }

  public LocalTime getFrom() {
    return from;
  }

  public Duration getDuration() {
    return duration;
  }
}
```

- 다음은 매주 수요일 10시 30분부터 30분 동안 열리는 회의에 대한 인스턴스를 생성한 코드이다.

```java
RecurringSchedule schedule = new RecurringSchedule("회의", DayOfWeek.WEDNESDAY,
  LocalTime.of(10, 30), Duration.ofMinutes(30));
```

- `Event` 클래스는 현재 이벤트가 `RecurringSchedule`이 정의한 반복 일정 조건을 만족시키는지 검사하는 `isSatisfied` 메서드를 제공한다.

```java
RecurringSchedule schedule = new RecurringSchedule("회의", DayOfWeek.WEDNESDAY,
  LocalTime.of(10, 30), Duration.ofMinutes(30));

Event meeting = new Event("회의",
  LocalDateTime.of(2019, 5, 9, 10, 30),
  Duration.ofMinutes(30));

assert meeting.isSatisfied(schedule) == false;
assert meeting.isSatisfied(schedule) == true;
```

- 하지만 `isSatisfied` 안에 버그가 숨겨져 있다.
- `Event`인스턴스인 `meeting`은 2019년 5월 9일 10시 30분부터 30분 동안 진행되는 회의이다. 때문에 `isSatisfied` 조건에 만족시키지 못한다. 따라서 `false`를 반환할 것이다.
- 하지만 다시 한 번 `isSatisfied` 메서드를 호출하면 `true`를 반환한다.
- 다음은 `isSatisfied` 메서드이다.

```java
public class Event {
  public boolean isSatisfied(RecurringSchedule schedule) {
    if (from.getDayOfWeek() != schedule.getDayOfWeek() ||
      !from.toLocalTime().equals(schedule.getFrom()) ||
      !duration.equals(schedule.getDuration())) {
        reschedule(schedule); // reschedule 메서드는 Event 객체의 상태를 수정한다!
        return false;
    }

    return true;
  }
}
```
- `reschedule`는 반화전에 `Event` 객체를 수정 후 반환한다.
- 버그를 찾기 어려웠던 이유는 `isSatisfied`가 명령과 쿼리의 두 가지 역할을 동시에 수행하고 있기 때문이다.
- 명령과 쿼리를 뒤섞으면 실행 결과를 예측하기가 어려워진다. 명령과 쿼리를 명확하게 분리해라.

```java
public class Event {
  public boolean isSatisfied(RecurringSchedule schedule) {
    if (from.getDayOfWeek() != schedule.getDayOfWeek() ||
      !from.toLocalTime().equals(schedule.getFrom()) ||
      !duration.equals(schedule.getDuration())) {
        return false;
    }

    return true;
  }

  public void reschedule(RecurringSchedule schedule) {
    from = LocalDateTime.of(from.toLocalDate().plusDays(daysDistance(schedule))
      schedule.getFrom());
    duration = schedule.getDuration();
  }
}
```

- 이제 `Event`를 보면 명령과 쿼리를 분리한 상태이므로 인터페이스를 훑어보는 것만으로도 `isSatisfied`가 쿼리고, `reschedule` 메서드가 명령이라는 사실을 한눈에 알 수 있다.
- 반환 값을 가지지 않는 메서드는 모두 명령이므로 해당 메서드를 호출할 때는 부수효과에 주의해야 한다.

### 🎈 명령-쿼리 분리와 참조 투명성
- 명령과 쿼리를 분리함으로써 명령형 언어의 틀 안에서 **참조 투명성**의 장점을 제한적이나마 누릴 수 있게 된다.
- 프로그램에서 부수효과를 발생시키는 두 가지 대표적인 문법은 대입문과 함수다.
- 부수효과를 말할 때 빠질 수 없는 것이 바로 참조 투명성인데 참조 투명성이란 어떤 포현식 e가 있을 때 e의 값으로 e가 나타나는 모든 위치를 교체하더라도 결과가 달라지지 않는 특성이다.
- 수학은 참조 투명성을 엄격하게 준수하는 가장 유명한 체계이다. 어떤 함수 `f(n)`이 존재할 때 `n`의 값으로 1을 대입하면 그 결과가 3이라고 가정한다. 즉, `f(1) = 3`이다.

```
f(1) + f(1) = 6
f(1) * 2 = 6
f(1) - 1 = 2
```

- 이제 `f(1)`을 결괏값인 3으로 바꿔 본다. 3으로 변경해도 결과는 변하지 않는다.

```
3 + 3 = 6
3 * 2 = 6
3 - 1 = 2
```

- 이것이 참조 투명성이다. `f(n)`이 어디에 존재하던 `n`의 값이 1이라면 그 결과는 3이다. 동일한 입력에 대해 항상 동일한 값을 출력하는 것이다.
- `f(1)`이 3이라고 말할 수 있는 이유는 `f(1)`값은 변하지 않기 때문이다. 이처럼 값이 변하지 않는 성질을 **불변성**이라고 부른다. 불변하다는 말은 부수효과를 발생시키지 않는다는 말과 동일하다.
- 불변성은 부수효과의 발생을 방지하고 참조 투명성을 만족시킨다. 또한 순서를 변경하더라도 결과가 달라지지 않는다.

```
f(1) - 1 = 2
f(1) * 2 = 6
f(1) + f(1) = 6
```

- 참조 투명성을 만족하는 식은 다음과 같은 장점을 제공한다.

> - 모든 함수를 이미 알고 있는 하나의 결괏값으로 대체할 수 있기 때문에 식을 쉽게 계산할 수 있다.
> - 모든 곳에서 함수의 결괏값이 동일하기 때문에 식의 순서를 변경하더라도 각 식의 결과는 달라지지 않는다.

- 객체지향 패러다임이 객체의 상태 변경이라는 부수효과를 기반으로 하기 때문에 참조 투명성은 예외에 가깝다. 하지만 명령-쿼리 분리 원칙을 사용하면 이 문제를 조금이나마 줄일 수 있다.
- 명령-쿼리 분리 원칙은 부수효과를 가지는 명령으로부터 부수효과를 가지지 않는 쿼리를 명백하게 분리함으로써 제한적이나마 참조 투명성의 혜택을 누릴 수 있게 된다.

### 🎈 책임에 초점을 맞춰라
- 디미터 법칙을 준수하고 묻지 말고 시켜라 스타일을 따르면서도 의도를 드러내는 인터페이스를 설계하는 아주 쉬운 방법은 메시지를 먼저 선택하고 그 후 메시지를 처리할 객체를 선택하는 것이다.
- 명령과 쿼리를 분리하고 계약에 의한 설계 개념을 통해 객체의 협력 방식을 명시적으로 드러낼 수 있는 방법은 객체의 구현 이전에 객체 사이의 협력에 초점을 두고 협력 방식을 단순하고 유연하게 만드는 것이다.
- 이 모든 방ㅇ식읭 중심에는 객체가 수행할 책임이 위치한다.
- 훌륭한 메시지를 얻기 위한 출발점은 책임 주도 설계 원칙을 따르는 것이다. 책임 주도 설계 방법에 따라 메시지가 객체를 결정하게 하라.
