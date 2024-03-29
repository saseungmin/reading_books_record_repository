# 🍭 Chapter 4: 예외를 이용하지 않은 오류 처리

예외를 던지는 것이 하나의 부수 효과임을 간단히 언급했다. 실패 상황과 예외를 보통의 값으로 표현할 수 있으며, 일반적인 오류 처리, 복구 패턴을 추상화환 고차 함수를 작성할 수 있다는 것이다. 오류를 값으로서 돌려준다는 함수적 해법은 더 안전하고 참조 투명성을 유지한다는 장점이 있다. 계다가 고차 함수 덕분에 예외의 주된 이점인 **오류 처리 논라의 통합**도 유지된다.

## 🎃 예외의 장단점
예외가 왜 참조 투명성을 해칠까? 그리고 그것이 왜 문제가 될까?

```scala
// 예외를 던지고 받기
def failingFn(i: Int): Int = {
  val y: Int = throw new Exception("fail!")
  try {
    val x = 42 + 5
    x + y
  }
  catch { case e: Exception => 43 }
}

// 예상대로 오류 발생
```

`y`가 참조에 투명하지 않음을 증명할 수 있다. 임의의 참조 투명 표현식을 그것이 지칭하는 값으로 치환해도 프로그램의 의미가 변하지 않는다는 점을 기억할 것이다. 만일 `x + y`의 `y`를 `throw new Exception("fail!")`로 치환하면 그전과는 다른 결과가 나온다. 이제는 예외를 잡아서 43을 돌려주는 `try` 블록 안에서 예외가 발생하기 떄문이다.

```scala
def failingFn2(i: Int): Int = {
  try {
    val x = 42 + 5
    x + ((throw new Exception("fail!")): Int)
  }
  catch { case e: Exception => 43 }
}

// 43
```

참조 투명성이라는 것을, 참조에 투명한 표현식의 의미는 **문맥(context)에 의존하지 않으며** 지역적으로 추론할 수 있지만 참조에 투명하지 않은 표현식의 의미는 **문맥에 의존적**이고 좀 더 전역의 추론이 필요하다는 것으로 이해해도 될 것이다.   

예외의 주된 문제 두 가지는 다음과 같다.
- 방금 논의했듯이, **예외는 참조 투명성을 위반하고 문맥 의존성을 도입한다.** 따라서 치환 모형의 간단한 추론이 불가능해지고 예외에 기초한 혼란스러운 코드가 만들어진다. 이것이 예외를 오류 처리에만 사용하고 흐름의 제어에는 사용하지 말아야 한다는 속설의 근원이다.
- **예외는 형식에 안전하지 않다.** `failingFn`의 형식인 `Int => Int`만 보고는 이 함수가 예오를 던질 수 있다는 사실을 전혀 알 수 없으며, 그래서 컴파일러는 `failingFn`의 호출자에게 그 예외들을 처리하는 방식을 결정하라고 강제할 수 없다.

이런 단점들이 없으면서도 예외의 가장 장점인 **오류 처리 논리의 통합과 중앙집중화**를 유지하는 대안이 있으면 좋을 것이다. 지금부터 소개하는 대안 기법은 "예외를 던지는 대신, 예외적인 조건을 발생했음을 뜻하는 값을 돌려준다"라는 오래된 착안에 기초한다. 단, 이 기법에서는 오류 부호를 직접 돌려주는 대신 그런 '미리 정의해 둘 수 있는 값들'을 대표하는 새로운 일반적 형식을 도입하고, 오류의 처리와 전파에 관한 공통적인 패턴들을 고차 함수들을 이용해서 캡슐화한다. 우리가 사용하는 오류 처리 전략은 **형식에 완전히 안전하며,** 최소한의 구문적 잡음으로도 스칼라의 형식 점검기를 도움을 받아서 실수를 미리 발견할 수 있다.

## 🎃 예외의 가능한 대안들
예외 대신 사용할 만한 여러 가지 접근방식을 조사해보자. 다음은 목록의 평균을 계산하는 함수이다. 빈 목록에 대해서는 평균이 정의되지 않는다.

```scala
def mean(xs: Seq[Double]): Double = 
  if (xs.isEmpty)
    throw new ArithmeticException("mean of empty list!")
  else xs.sum / xs.length
```

`mean`에 대해 예외 대신 사용할 수 있는 대안 몇 가지를 살펴보자.   

첫 번째 대안은 `Double` 형식의 가짜 값을 돌려주는 것이다. 모든 경우에 그냥 `xs.sum / xs.length`를 돌려준다면 빈 목록에 대해서는 `0.0 / 0.0`을 돌려주게 되는데, 이는 `Double.NaN`이다. 아니면 다른 어떤 경계 값을 돌려줄 수도 있겠다. 상황에 따라서는 원하는 형식의 값 대신 `null`을 돌려줄 수도 있다. 이런 부류의 접근방식은 예외 기능이 없는 언어에서 오류를 처리하는 데 흔히 쓰인다. 그러나 이 책에서는 이런 접근방식을 거부한다. 이유는 여러 가지이다.
- 오류가 소리 없이 전파될 수 있다.
- 실수의 여지가 많다는 점 외에, 호출하는 쪽에 호출자가 '진짜' 결과를 받았는지 점검하는 명시적 `if`문들로 구성된 판에 박힌 코드가 상당히 늘어난다.
- 다형적 코드에는 적용할 수 없다. 출력 형식에 따라서는 그 형식의 경계 값을 결정하는 것이 **불가능**할 수도 있다.
- 호출자에게 특별한 방침이나 호출 규약을 요구한다. `mean` 함수를 제대로 사용하려면 호출자가 그냥 `mean`을 호출해서 그 결과를 사용하는 것 이상의 작업을 수행해야 한다. 함수에 이런 특별한 방침을 부여하면, 모든 인수를 균일한 방식으로 처리해야 하는 고차 함수에 전달하기 어려워진다.

또 다른 대안은 함수가 입력을 처리할 수 없는 상황에 처했을 때 무엇을 해야 하는지 말해주는 인수를 호출자가 지정하는 것이다.

```scala
def mean_1(xs: IndexedSeq[Double], onEmpty: Double): Double = 
  if (xs.isEmpty) onEmpty
  else xs.sum / xs.length
```

이렇게 하면 `mean`은 부분 함수가 아닌 완전 함수가 된다. 그러나 여기에는 결과가 정의되지 않은 경우의 처리 방식을 함수의 **직접적인** 호출자가 알고 있어야 하고 그런 경우에도 항상 하나의 `Double` 값을 돌려주어야 한다는 단점이 있다.   

우리에게 필요한 것은, 정의되지 않은 경우가 가장 적당한 수준에서 처리되도록 그 처리 방식의 결정을 미룰 수 있게 하는 방법이다.

## 🎃 Option 자료 형식
해법은, 함수가 항상 답을 내지 못한다는 점을 반환 형식을 통해서 명시적으로 표현하는 것이다. 이를, 오류 처리 전략을 호출자에게 미루는 것으로 생각해도 된다. 이를 위해 `Option`이라는 새로운 형식을 도입한다.

```scala
sealed trait Option[+A]
case class Some[+A](get: A) extends Option[A]
case object None extends Option[Nothing]
```

`Option`에는 두 개의 경우 문이 있다. `Option`을 정의할 수 있는 경우에는 `Some`이 되고, 정의할 수 없는 경우에는 `None`이 된다.   

이제 `Option`을 이용해서 `mean`을 구현하면 다음과 같은 코드가 된다.

```scala
def mean(xs: Seq[Double]): Option[Double] =
  if (xs.isEmpty) None
  else Some(xs.sum / xs.length)
```

이제는 이 함수의 결과가 항상 정의되지 않는다는 사실이 함수의 반환 방식에 반영되어 있다. 함수가 항상 선언된 반환 형식의 결과를 돌려주어야 한다는 점은 여전하므로, `mean`은 이제 하나의 **완전 함수**이다. 이 함수는 입력 형식의 모든 값에 대해 정확히 하나의 출력 형식 값을 돌려준다.

### 🎈 Option의 사용 패턴
부분 함수는 프로그래밍에서 흔히 볼 수 있으며, FP에서는 그런 부분성을 흔히 `Option` 같은 자료 형식으로 처리한다.   

`Option`이 편리한 이유는, 오류 처리의 공통 패턴을 고차 함수들을 이용해서 추출함으로써 예외 처리 코드에 흔히 수반되는 판에 박힌 코드를 작성하지 않아도 된다는 점이다.   

#### Option에 대한 기본적인 함수들
`Option`은 최대 하나의 원소를 담을 수 있다는 점을 제외하면 `List`와 비슷하다.   

```scala
// Option 자료 형식
trait Option[+A] {
  // 만일 Option이 None이 아니면 f를 적용
  def map[B](f: A => B): Option[B]
  // 만일 Option이 None이 아니면 f(실패할 수 있음)를 적용한다.
  def flatMap[B](f: A => Option[B]): Option[B]
  // B >: A는 B 형식 매개변수가 반드시 A의 상위형식이어야 함을 의미한다.
  def getOrElse[B >: A](default: => B): B
  // ob는 필요한 경우에만 평가한다.
  def orElse[B >: A](ob: => Option[B]): Option[B]
  // 값이 f를 만족하지 않으면 Some을 None으로 변환한다.
  def filter(f: A => Boolean): Option[A]
}
```

#### 기본적인 Option 함수들의 용례
하나의 `Option`에 대해 명시적인 패턴 부함을 적용할 수도 있지만, 거의 모든 경우에 위에 말한 고차 함수들을 사용하게 된다.   

`map` 함수는 `Option` 안의 결과를 변환하는 데 사용할 수 있다. 이를 오류가 발생하지 않았다는 가정하에서 계산을 진행하는 것으로 생각해도 될 것이다. 또한, 이는 오류 처리를 나중의 코드에 미루는 수단이기도 하다.

```scala
case class Employee(name: String, department: String)

def lookupByName(name: String): Option[Employee] = ...

val joeDepartment: Option[String] = 
  lookupByName("Joe").map(_.department)
```

이 예에서 `lookupByName("Joe")`는 `Option[Employee]`를 돌려준다. 그것을 `map`으로 변환하면 `Joe`가 속한 부서의 이름을 뜻하는 `Option[String]`이 나온다. 여기서 `lookupBtName("Joe")`의 결과를 명시적으로 점검하지 않음을 주목하기 바란다. 그냥 오류가 전혀 발생하지 않았다는 듯이 `map`의 인수 안에서 계산을 계속 진행한다. 만일 `lockupByName("Joe")`가 `None`을 돌려주었다면 계산의 나머지 부분이 취소되어서 `map`은 `_.department` 함수를 전혀 호출하지 않는다.   

`flatMap`을 이용하면 여러 단계로 이루어진 계산을 수행하되 어떤 단계라도 실패하면 그 즉시 나머지 모든 과정이 취소되는 방식으로 수행할 수 있다. 이는 `None.flatMap(f)`가 `f`를 실행하지 않고 즉시 `None`을 돌려주기 때문이다.   

`filter`는 성공적인 값이 주어진 술어와 부합하지 않을 때 성공을 실패로 변환하는데 사용할 수 있다. 흔한 사용 패턴은 `map`, `flatMap`, `filter`의 임의의 조합을 이용해서 `Option`을 변환하고 제일 끝에서 `getOrElse`를 이용해서 오류 처리를 수행하는 것이다.

```scala
val dept: String =
  lookupByName("Joe").
  map(_.dept).
  filter(_ != "Accounting").
  getOrElse("Default Dept")
```

여기서 `getOrElse`는 `Option[String]`을 `String`으로 변환하되 `"Joe"`라는 키가 `Map`에 존재하지 않거나 `Joe`의 부서가 `"Accounting"`인 경우에는 기본 부서 이름을 돌려주는 역할을 한다.   

오류를 보통의 값으로 돌려주면 코드를 짜기가 편해지며, 고차 함수를 사용함으로써 예외의 주된 장점인 오류 처리 논리의 통합과 격리도 유지할 수 있다. 계싼의 매 단계마다 `None`을 점검할 필요가 없음을 주목하기 바란다.

### 🎈 예외 지향적 API의 Option 합성과 승급, 감싸기
일단 `Option`을 사용하기 시작하면 코드 기반 전체에 `Option`이 번지게 되리라는 성급한 결론을 내리는 독자도 있을 것이다. 즉, `Option`을 받거나 돌려주는 메서드를 호출하는 모든 코드를 `Some`이나 `None`을 처리하도록 수정해야 한다고 추측할 수 있다. 그러나 실제로는 그런 부담을 질 필요가 없다. 보통의 함수를 `Option`에 대해 작용하는 함수로 **승급시킬** 수 있기 때문이다.

```scala
def lift[A, B](f: A => B): Option[A] => Option[B] = _ map f
```

이러한 `lift`가 있으면 지금까지 나온 그 어떤 함수라도 한 `Option` 값의 **문맥 안에서** 작용하도록 변환할 수 있다.

```scala
val abs0: Option[Double] => Option[Double] = lift(math.abs)
```

위 예에서 보듯이, 선택적 값에 작용하는 `math.abs` 함수를 직접 작성할 필요가 없다. 그냥 그 함수를 `Option` 문맥으로 승격시키면 된다. 이러한 승급은 **모든** 함수에 가능하다.

## 🎃 Either 자료 형식
`Option`이 예외적인 조건이 발생했을 때 무엇이 잘못되었는지에 대한 정보를 제공하지 못한다는 단점이 있다. 실패 시 이 형식은 그냥 유효한 값이 없음을 뜻하는 `None`을 돌려줄 뿐이다. 그러나 그 외의 것이 필요할 때도 있다.   

실패에 관해 알고 싶은 정보가 어떤 것이든 그것을 부호화하는 자료 형식을 만드는 것은 물론 가능하다. 그냥 실패가 발생했음을 알면 충분한 때에는 `Option`을 사용하면 된다. 그 외의 경우에는 좀 더 많은 정보가 필요하다.

```scala
sealed trait Either[+E, +A]
case class Left[+E](value: E) extends Either[E, Nothing]
case class Right[+A](value: A) extends Either[Nothing, A]
```

`Option` 처럼 `Either`도 `case`가 두 개뿐이다. `Option`과의 본질적인 차이는, 두 경우 모두 값을 가진다는 것이다. 아주 개괄적으로 말하자면, `Either` 자료 형식은 둘 중 하나일 수 있는 값들을 대표한다. 이 형식은 두 형식의 **분리합집합**(서로 소 합집합)이라 할 수 있다. 이 형식을 성공 또는 실패를 나타내는 데 사용할 때에는, `Right` 생성자를 성공을 나타내는 데 사용하고(오른쪽이 옳은 쪽) `Left`는 실패에 사용한다. 왼쪽 형식 매개변수의 이름으로는 error(오류)를 의미하는 `E`를 사용한다.   

그럼 `mean` 예제를 다시 보자. 이번에는 실패의 경우에 `String`을 돌려준다.

```scala
def mean(xs: IndexedSeq[Double]): Either[String, Double] =
  if (xs.isEmpty)
    Left("mean of empty list!")
  else
    Right(xs.sum / xs.length)
```

오류에 대한 추가 정보, 이를테면 소스 코드에서 오류가 발생한 위치를 알 수 있는 스택 추적 정보가 있으면 편리한 경우가 종종 있다. 그런 경우 `Either`의 `Left`쪽에서 그냥 예외를 돌려주면 된다.

```scala
def safeDiv(x: Int, y: Int): Either[Exception, Int] =
  try Right(x / y)
  catch { case e: Exception => Left(e) }
```

`Option`에서 했듯이, 던져진 예외를 값으로 변환한다는 이러한 공통의 패턴을 추출한 함수 `Try`를 작성해 보자.

```scala
def Try[A](a: => A): Either[Exception, A] =
  try Right(a)
  catch { case e: Exception => Left(e) }
```

이러한 정의들이 있으면 `Either`를 `for-함축`에 사용할 수 있음을 주묙하자.

```scala
def parseInsuranceRateQuote(
  age: String,
  numberOfSpeedTickets: String
): Either[Exception. Double] =
  for {
    a <- Try { age.toInt }
    tickets <- Try { numberOfSpeedingTickets.toInt }
  } yield insuranceRateQuote(a, tickets)
```

이제는 실패 시 그냥 `None`이 아니라 발생한 실제 예외에 대한 정보를 얻게 되었다.   

마지막 예로, 다음은 `map2`를 적용한 예다. 함수 `mkPerson`은 주어진 이름과 나이의 유효성을 점검한 후 유효한 `Person`을 생성한다.

```scala
// Either를 자료 유효성 점검에 활용
case class Person(name: Name, age: Age)
sealed class Name(val value: String)
sealed class Age(val value: Int)

def mkName(name: String): Either[String, Name] =
  if (name == ""  || name == null) Left("Name is empty.")
  else Right(new Name(name))

def mkAge(age: Int): Either[String, Age] =
  if (age < 0) Left("Age is out of range.")
  else Right(new Age(age))

def mkPerson(name: String, age: Int): Either[String, Person] =
  mkName(name).map2(mkAge(age))(Person(_, _))
```
