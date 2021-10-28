## 🌈 Chapter 1: Birth

- 객체는 자신의 **가시성 범위**(**scope of visibility**) 안에서 살아간다.

```java
if (price < 100) {
  Cash extra = new Cash(5);
  price.add(extra);
}
```
- 예제에서 `if`블록 안에서만 `extra`라는 객체를 볼 수 있기 때문에, `if`블록 내부가 `extra` 객체의 가시성 범위가 된다. 예제에서 숫자 5는 객체 내부에 남아있고, `price`는 객체의 외부에 존재한다.
- 객체지향 프로그래밍에서 객체와 객체의 역할을 이해함으로써 코드의 유지보수성을 향상시킬 수 있다. 코드의 길이는 더 짧아지고, 소화하기 쉬워지며, 모듈성이 향상되고, 응집도가 높아진다.

### 🦄 -er로 끝나는 이름을 사용하지 마세요
- 클래스는 **객체의 팩토리**이다.
- 클래스는 객체를 생성하고 클래스가 **객체를 인스턴스화한다**라고 표현한다.

```java
class Cash {
  public Cash(int dollars) {
    // ...
  }
}

Cash five = new Cash(5);
```
- `new`는 객체의 팩토리를 제어할 수 있는 원시적인 수단이다.
- `new`는 `Cash` 클래스의 정적 메서드이며, `new`가 호출되면 `Cash`클래스가 제어를 획득한 후 `five`객체를 생성한다.
- `new` 연산자가 실행되기 전에 부가적인 로직을 더할 수 있기 떄문에, `new`연산자를 보다 유연하게 사용할 수 있다.

```java
class Shapes {
  public Shape make(String name) {
    if (name.equals("circle")) {
      return new Circle();
    }

    if (name.equals("rectangle")) {
      return new Rectangle();
    }

    throw new IllegalArgumentException("not found");
  }
}
```
- 클래스를 플요할 떄 객체를 꺼낼 수 있고, 더 이상 필요하지 않은 객체를 반환할 수 있는 객체의 웨어하우스로 보는 것이 좋다.
- 클래스는 객체의 템플릿이 아니다 **팩토리**이다. (클래스는 객체의 능동적인 관리자라고 생각해야 한다.)
- 아래의 예제는 객체를 이름을 짓는데 잘못된 방법으로 클래스의 객체들이 무엇을 하고 있는지를 살펴본 후 기능에 기반해서 이름을 짓는 방법이다.

```java
class CashFormatter {
  private int dollars;

  CashFormatter(int dlr) {
    this.dollars = dlr;
  }

  public String format() {
    return String.format("$ %d", this.dollars);
  }
}
```
- 위와 같이 **클래스의 이름은 객체가 노출하고 있는 기능에 기반해서는 안된다.**
- 클래스의 이름은 무엇을 하는지가 아니라 **무엇인지에 기반해야 한다.**

```java
class Cash {
  private int dollars;
  Cash(int dlr) {
    this.dollars = dlr;
  }

  public String usd() {
    return String.format("$ %d", this.dollars);
  }
}
```

- 다시 말해서, 객체는 그의 **역량**(**capability**)으로 특정지어져야 한다.
- 여기서 말하는 것처럼 바로 접미사 **-er**을 사용하면 안된다. (Manager, Controller, Helper, Handler, Writer, Validator, Router etc..)
- 예외인 규칙도 존재하는데 오랜 시간이 흐르면서 의미가 정착된 경우이다. 대표적인 예가 computer, user이다.
- 객체는 객체의 외부 세계와 내부 세계를 이어주는 연결장치가 아니라 **객체는 캡슐화된 데이터의 대표자이다.** 즉, 대표자는 **스스로 결정을 내리고 행동할 수 있는 자립적인 엔티티이다.**
- 때문에 클래스의 이름이 **-er**로 끝난다면, 이 클래스의 인스턴스는 실제로는 객체가 아니라 어떤 데이터를 다루는 절차들의 집합일 뿐이다.
- 올바른 클래스를 이름은 클래스의 객체들이 무엇을 캡슐화할 것인지를 관찰하고 이 요소들에 붙일 적합한 이름을 찾아야 한다.

```ruby
class PrimeNumbers
  def initialize(origin)
    @origin = origin
  end

  def each
    @origin
      .select{ |i| prime? i }
      .each{ |i| yield i }
  end

  def prime?(x)
    # ...
  end
end
```

- `PrimeNumbers` 클래스는 숫자들의 리스트처럼 행동하지만 오직 소수만 반환한다.
- 이처럼 숫자 리스트를 캡슐화하고 있는 동안에는, 외부에서 직접 객체 내부에 포함된 숫자 리스트를 처리하거나 조회하도록 허용해서는 안된다. **`PrimeNumbers`는 숫자의 리스트이다.**(**is a**) 리스트 그 자체이다.

### 🦄 생성자 하나를 주 생성자로 만드세요
- `constructor`는 새로운 객체에 대한 진입점으로 몇 개의 인자들을 전달받아, 어떤 일을 수행한 후, 임무를 수행할 수 있도록 객체를 준비시킨다.

```java
class Cash {
  private int dollar;
  Cash(int dlr) {
    this.dollars = dlr;
  }
}
```
- 예제는 하나의 `constructor`가 존재하고 수행하는 하나의 작업은 인자로 전달된 달러를 `dollars`라는 이름의 `private` 정수 프로퍼티에 캡슐화하는 것이다.
- 이때 2 ~ 3개의 메서드와 5 ~ 10개의 `constructor`를 포함하는 것이 적당하다.
- `constructor`의 개수가 많아질 수록 더 개선되고, 사용자 입장에서 클래스를 더 편하게 사용할 수 있다. 하지만 메서드가 많아질수록 클래스를 사용하기는 더 어려워진다. 메서드가 많아지면 클래스의 초점이 흐려지고, 단일 책임 원칙을 위반한다.
- `constructor`의 주된 작업은 **제공된 인자를 사용해서 캡슐화하고 있는 프로퍼티를 초기화하는 일이다.** 이런 초기화 로직을 단 하나의 `constructor`에만 위치시키고 주 `constructor`라고 부르기를 권장하고 아래의 예제처럼 부 `constructor`라고 부르는 다른 `constructor`들이 이 주 `constructor`를 호출하도록 만들어야 한다.

```java
class Cash {
  private int dollars;

  Cash(float dlr) { // 부
    this((int) dlr);
  }

  Cash(String dlr) { // 부
    this(Cash.parse(dlr));
  }

  Cash(int dlr) { // 주 constructor
    this.dollars = dlr;
  }
}
```

- 유지보수성을 위해 주 `constructor`를 모든 부 `constructor`뒤에 위치시킨다.
- 하나의 주 `constructor`와 다수의 부 `constructor` 원칙의 핵심은 중복 코드를 방지하고 설계를 더 간결하게 만들기 때문에 유지보수성이 향상된다는 것이다.
- 내부의 프로퍼티는 오직 한 곳에서만 초기화해야 한다는 핵심 원칙이다.

### 🦄 생성자에 코드를 넣지 마세요
- 주 `constructor`에는 객체 초기화 프로세스를 시작하는 유일한 장소이기 떄문에 제공되는 인자들은 완전해야 한다.
- 인자를 어떻게 다루어야 할까?
- 일단, 인자에 손을 대지말라는 것이다.

```java
class Cash {
  private int dollars;

  Cash(String dlr) {
    this.dollars = Integer.parseInt(dlr);
  }
}
```
- 위에서 클래스가 내부에 캡슐화하고 있는 것은 정수형이지만, `constructor`에 선언된 인자의 타입은 문자열이다. 때문에 전달된 문자열을 정수로 변환할 필요가 있어 이 작업을 `constructor`내부에서 처리하고 있다. 하지만 이러한 방법은 아주 잘못된 방법이다.
- **객체 초기화에는 코드가 없어야하고 인자를 건드려서는 안된다.** 대신, 필요하다면 인자들을 다른 타입의 객체로 감싸거나 가공하지 않은 형식으로 캡슐화해야 한다.
- 다음은 인자를 전달된 텍스트를 건드리지 않고 동일한 작업을 수행한 예시이다.

```java
class Cash {
  private Number dollars;

  Cash(String dlr) { // 부 constructor
    this(new StringAsInteger(dlr));
  }

  Cash(Number dlr) { // 주 constructor
    this.dollars = dlr;
  }
}

class StringAsInteger implements Number {
  private String source;

  StringAsInteger(String src) {
    this.source = src;
  }

  int intValue() {
    return Integer.parseInt(this.source);
  }
}

Cash five = new Cash("5");
```
- 첫 번째 예제의 객체 `five`는 숫자 5를 캡슐화하지만, 두 번째 예제의 객체 `five`는 `Number`처럼 보이는 `StringAsInteger` 인스턴스를 캡슐화한다.
- 진정한 객체지향에서 인스턴스화란 더 작은 객체들을 **조합해서** 더 큰 객체를 만드는 것을 의미한다. 객체들을 조합해야 하는 단 하나의 이유는 새로운 계약을 준수하는 새로운 엔티티가 필요하기 때문이다.
- 제일 처음 할 일은 객체를 인스턴스화하는 것이고 두 번째 할 일은 객체가 우리를 위해 작업을 하게 만드는 것이다. `constructor`는 어떤 일을 수행하는 곳이 아니기 때문에 `constructor`안에서 인자에게 어떤 작업을 요청해서는 안된다. 다시 말해서 **생성자는 코드가 없어야하고, 오직 할당문만 포함해야 한다.**
- 이 조언을 지지하는 이유는 첫째로 `constructor`에 코드가 없을 경우 성능 최적화가 더 쉽기 때문에 코드의 실행 속도가 더 빨라진다.

```java
class StringAsInteger implements Number {
  private String text;

  public StringAsInteger(String txt) {
    this.text = txt;
  }

  public int intValue() {
    return Integer.parseInt(this.text);
  }
}

Number num = new StringAsInteger("123");
num.intValue();
num.intValue();
```
- 위 코드는 `intValue()`를 호출할 때마다 매번 텍스트를 정수로 파싱한다.

```java
class StringAsInteger implements Number {
  private int num;

  public StringAsInteger(String txt) {
    this.num = Integer.parseInt(txt);
  }

  public int intValue() {
    return this.num;
  }
}
```
- 텍스트 파싱은 객체를 초기화하는 시점에 단 한 번 수행하기 때문에 실제로 이 코드가 더 효율적이다. 하지만 `constructor`에서 직접 파싱을 수행하는 두 번째 예제는 최적화가 불가능하다. 이 경우에는 객체를 만들 때마다 매번 파싱이 수행되기 때문에 실행 여부를 제어할 수 없다. `intValue()`를 호출할 필요가 없는 경우에도 CPU는 파싱을 위해 시간을 소모한다.
- 반대로 인자를 전달된 상태 그대로 캡슐화하고 나중에 요청이 있을 때 파싱하도록 하면, 클래스의 사용자들이 파싱 시점을 자유롭게 결정할 수 있게 된다.
- 파싱을 여러 번 수행되지 않도록 하고 싶다면 데코레이터를 추가해서 최초의 파싱 결과를 캐싱할 수도 있다.

```java
class CachedNumber implements Number {
  private Number origin;

  private Collection<Integer> cached = new ArrayList<>(1);

  public CachedNumber(Number num) {
    this.origin = num;
  }

  public int intValue() {
    if (this.cached.isEmpty()) {
      this.cached.add(this.origin.intValue());
    }

    return this.cached.get(0);
  }
}

Number num = new CachedNumber(
  new StringAsInteger("123");
);
num.intValue(); // 첫 번째 파싱
num.intValue(); // 여기서는 파싱하지 않음
```

- 객체를 인스턴스화하는 동안에 객체를 만드는 일 이외에는 어떤 일도 수행하지 않는다. 실제 작업은 객체의 메서드가 수행한다. 이로 인해서 우리가 직접 이 과정을 제어할 수 있다.
- 따라서 생성자에서 코드를 없애면 사용자가 쉽게 제어할 수 있는 투명한 객체를 만들 수 있으며, 객체를 이해하고 재사용하기도 쉬워진다.
