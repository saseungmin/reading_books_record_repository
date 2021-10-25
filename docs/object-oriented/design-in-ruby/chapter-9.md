---
sidebar_position: 10
---

# ✌️ Chapter 9: 비용-효율적인 테스트 디자인하기

-  수정하기 쉬운 코드를 작성하는 일은?
    - 객체지향 디자인을 이해하고 있어야 한다.
    - 코드를 리팩터링하는 법을 익혀야 한다. (**코드의 외적인 작동방식을 변경하지 않으면서**) 
    - 수정 가능한 코드를 작성하려면 높은 수준의 테스트를 짤 수 있어야 한다.

## 📚 의도를 가지고 테스트하기
- 테스트는 버그를 줄여주고 문서의 역할을 하며 테스트를 먼저 작성하면 애플리케이션의 디자인이 향상된다.
- 진정한 테스트의 목표는 디자인의 진정한 목표와 똑같이, 코드 작성 비용을 줄이는 것이다.
- 테스트 코드를 디자인하는 데 드는 시간보다 오래 걸린다면 테스트를 작성하는 의미가 없지만, 테스트 작성 비용이 너무 높은 문제를 해결하기 위한 방법은 테스트를 그만두는 것이 아니라 테스트를 더 잘 짤 수 있도록 수련하는 것이다.

### 🎈 테스트 의도를 알기

#### 🐤 버그 찾아내기
- 초기 단계에서 버그를 발견하기도 쉽고 수정하기도 쉬울 뿐 아니라 코드를 일찍 올바르게 만들어 놓는 것이 코드 디자인에 긍정적인 영향을 미친다.

#### 🐤 문서를 제공하기
- 테스트만이 디자인에 대한 믿을 수 있는 문서를 제공한다.

#### 🐤 디자인 결정을 미루기
- 테스트는 디자인 결정을 안전하게 미룰 수 있도록 해준다.
- **어떤 것**이 필요한데 아직 그 무엇을 알아내기에는 충분한 정보가 없는 경우가 있다.
- 테스트가 인터페이스에 기대고 있다면 인터페이스 밑에 숨겨진 구체적인 코드는 나중에 리팩터링할 수 있다.
- 테스트는 인터페이스가 계속해서 올바르게 작동하고 있다는 점을 확인해 줄 수 있고 리팩터링 과정에서 테스트를 다시 작성할 필요도 없다.
- 의도적으로 인터페이스에 의존하는 테스트를 작성하면 아무런 대가를 치르지 않고도 안전하게 디자인 결정을 미룰 수 있다.

#### 🐤 추상화를 돕기
- 좋은 디자인은 추상화된 코드에 기대고 있는 작고 독립적인 객체들을 자연스럽게 만들어낸다. 이런 추상화들 사이의 상호작용으로 조금씩 변해간다.
- 추상화된 디자인이 어느 순간에 도달하면, 테스트 없이는 더 이상 안전하게 코드를 수정할 수 없는 수준에 도달한다.
- 테스트는 모든 추상화된 인터페이스의 기록이기 때문에 우리의 작업을 지지해주는 기반이 된다.

#### 🐤 디자인의 결점 드러내기
- 테스트를 작성하기 위한 준비 작업이 너무 힘겹다면 코드에 너무 많은 맥락(context)이 있다는 뜻이다.
- 객체 하나를 테스트하기 위해 다른 객체를 많이 끌어와야 한다면 이 코드는 의존성이 높다는 뜻이다. 디자인이 나쁠 때 테스트는 힘들어진다.
- 하지만, 테스트가 힘들다고 해서 애플리케이션의 디자인에 문제가 있다는 뜻은 아니다.
- 최소한의 비용으로 테스트가 제공하는 이점을 최대한으로 누리는 것이고 이걸 이루기 위해서는 느슨하게 결합된 테스트를 작성하는 것이다.

### 🎈 무엇을 테스트할지 알기
- 테스트에서 더 나은 가치를 얻기 위한 방법 중 하나는 테스트를 덜 짜는 것이다. 이를 위해서는 모든 것을 단 한번만 테스트하고 제대로 된 곳에서 테스트해야 한다.
- 테스트에서 중복을 제거하면 애플리케이션이 수정에 맞춰 테스트를 수정해야 하는 비용을 줄일 수 있다.
- 테스트의 핵심내용만 남겨 놓기 위해서는 테스트의 의도를 매우 뚜렷하게 가지고 있어야 하고 이 의도는 우리가 이미 알고 있는 디자인 원칙으로부터 끄집어 낼 수 있다.
- 디자인의 핵심은 다른 객체의 내부에 대한 의도적인 무지에 있고 객체를 그저 메시지에 반응하는 존재처럼 취급할 때 애플리케이션의 수정이 쉬워진다. 그래야 최소한의 비용으로 최대한의 이득을 제공하는 테스트를 작성할 수 있다.
- **모든 객체에서 가장 안정적인 것은 퍼블릭 인터페이스로 우리가 테스트하는 것은 퍼블릭 인터페이스에서 정의된 메시지이다.**
- **가장 비효율적인 것은 불필요한 테스트는 객체를 감싸는 방어막을 뚫고 들어가서 객체 내부의 불안정한 세부사항을 테스트하는 것이다.** 리팩토링시 유지보수 비용만 높이게 된다.
- 그렇기 때문에 테스트는 객체의 경계를 넘나드는 메시지에 집중해야 한다.
- 객체는 오직 자신의 퍼블릭 인터페이스에 속하는 메시지의 상태만 검증해야 한다.
- 들어오는 메시지에 대해서는 메시지가 반환하는 상태를 테스트한다. 밖으로 나가는 커맨드 메시지(다른 객체에 영향을 미치는 메시지)에 대해서는 이 메시지가 제대로 전송되었는지 테스트해야 한다. 밖으로 나가는 쿼리 메시지는 테스트할 필요가 없다.
- 밖으로 커멘드 메시지가 제대로 전송되었는지만 테스트한다면 실제 코드와 느슨하게 결합되어 있기 때문에 실제 코드가 변경되어도 테스트를 수정할 필요가 없다.

### 🎈 언제 테스트할지 알기
- 테스트를 먼저 작성하는 것이 좋다. 테스트를 먼저 작성하면 객체를 처음 만드는 순간부터 객체 속에 약간의 재사용 가능성을 각인시켜 놓게 된다.
- 제대로 된 시점에 적당한 양의 테스트를 작성한다면, 그리고 테스트를 먼저 작성한다면 전체적인 개발비용을 줄일 수 있다. 그렇기 때문에 객체지향 디자인의 원칙을 테스트에서도 적용해야 한다.

### 🎈 어떻게 테스트할지 알기
- 가장 대중적인 테스트 프레임워크 사용하기. 사용자층이 두텁기 때문에 하위호환성을 포기할 수 없고, 덕분에 기존 테스트를 모두 재작성해야하는 변경사항이 적용될 여지가 적다.
- 어떤 프레임워크를 선택할지 뿐만 아니라, 서로 다른 두 가지 스타일인, 테스트 주도 개발(TDD)와 행동 주도 개발(BDD) 사이에서도 고민하고 결정해야 한다. 각자의 경험과 각자의 보다 중요하게 생각하는 가치에 준해 결정한다.
- 두 스타일 모두 테스트를 먼저 작성하지만 BDD는 밖에서 안으로, TDD는 안에서 밖으로 나가는 접근을 취한다. 보통 도메인 객체에 대한 테스트로 시작해서, 이렇게 만든 도메인 객체를 재사용하면서 바로 바깥 층위인 테스트 코드를 작성한다.
- 테스트를 할 땐 테스트 중인 객체를 알아야 하지만 그 이외의 객체에 대해서는 최대한 무지해야 한다.
- 테스트 중인 객체에만 초점을 맞추고 테스트를 진행하려면, 테스트하는 관점을 선택해야 한다. **테스트는 테스트 중인 객체의 가장자리를 따라 시선을 고정하고 그 경계를 넘나드는 메시지만 알고 있는 편이 낫다.**

## 📚 들어오는 메시지 테스트하기
- 들어오는 메시지들은 객체의 퍼블릭 인터페이스, 다시 말해 객체가 외부 세계에 보여지는 모습을 형성한다.
- 애플리케이션의 다른 객체들은 이 메시지의 시그니처와 그 반환 결과에 의존하고 있기 때문에 이 메시지들은 테스트해야 한다.
- 다음은 3장의 코드이다.

```ruby
class Gear
  attr_reader :chainring :cog, :rim, :tire
  def initialize(args)
    @chainring = args[:chainring]
    @cog = args[:cog]
    @rim = args[:rim]
    @tire = args[:tire]
  end

  def ratio
    chainring / cog.to_f
  end

  def gear_inches
    ratio * Wheel.new(rim, tire).diameter
  end
  # ...
end

class Wheel
  attr_reader :rim, :trie
  def initialize(rim, tire)
    @rim = rim
    @tire = tire
  end

  def diameter
    rim + (tire * 2)
  end
  # ...
end
```
- `Wheel`은 들어오는 메시지 `diameter`에 반응한다. (이 메시지는 `Gear`가 전송한 메시지 또는 `Gear`에서 밖으로 나온 메시지이다.) 그리고 `Gear`는 두 개의 들어오는 메시지, `gear_inches`와 `ratio`에 반응한다.


### 🎈 사용하지 않는 인터페이스 제거하기
- 들어오는 메시지가 딸린 객체를 가지고 있지 않다면 이 메시지는 테스트할 필요가 없다.

|객체|들어오는 메시지들|밖으로 나가는 메시지들|메시지에 의존하는 객체가 있는가?|
|:---:|:---:|:---:|:---:|
|`Wheel`|`diameter`||Yes|
|`Gear`||`diameter`|No|
||`gear_inches`|||
||`ratio`|||

### 🎈 퍼블릭 인터페이스 검증하기
- 들어오는 메시지들은 메시지가 반환하는 값이나 상태를 검증하는 방식으로 테스트한다.
- 들어오는 메시지를 테스트하는 첫 번째 단계는 여러 상황에서 언제나 올바른 값을 반환하는지 확인하는 것이다. 

```ruby
class WheelTest < MiniTest::Unit::TestCase
  def test_calculates_diameter
    wheel = Wheel.new(26, 1.5)

    assert_in_delta(29, wheel.diameter, 0.01) # 29가 맞는지 검증하는 테스트
  end
end
```
- 위 테스트를 위해 애플리케이션의 다른 객체를 생성해야 하는 번거로움도 없고, 독립적으로 테스트할 수 있다.
- 다음 코드는 `Gear`를 테스트하는 것이다.

```ruby
class GearTest < MiniTest::Unit::TestCase
  def test_calculates_gear_inches
    gear = Gear.new(
      chainring: 52,
      cog: 11,
      rim: 26,
      tire: 1.5
    )

    assert_in_delta(137.1, gear.gear_inches, 0.01)
  end
end
```
- `Gear`의 `gear_inches` 메서드는 무조건 새로운 객체 `Wheel`을 만들고 사용한다. `Gear`와 `Wheel`의 코드에서 그리고 테스트에서도 서로 결합되어 있다. 때문에 수정이 발생했을 때 이 테스트가 고장 날 가능성이 얼마나 높을지를 결정한다. 하지만 이런 문제를 야기하는 결합은 `Gear` 안쪽 깊은 곳에 숨어 있기 때문에 테스트를 통해서 그 내용을 파악할 수 없다.
- 테스트가 최소한의 코드만을 실행할 때 그리고 테스트가 호출하는 외부 코드가 디자인과 직접적으로 연관되어 있을 때 테스트는 빠르게 실행된다.

### 🎈 테스트 중인 객체 고립시키기
- `gear_inches`가 `Gear` 이외의 객체에 기대고 있다는 사실이다. 이 사실은 `Gear`를 톡립적으로 테스트할 수 없다는 사실이다. `Gear`가 특정한 맥락이 묶여 있고, `Gear`를 재사용하기 어렵다는 것을 말해준다.
- 아래는 `Gear`에서 `Wheel`을 만드는 부분을 제거해서 이런 결합을 깨뜨렸다.

```ruby
class Gear
  attr_reader :chainring :cog, :wheel
  def initialize(args)
    @chainring = args[:chainring]
    @cog = args[:cog]
    @wheel = args[:wheel]
  end

  def ratio
    chainring / cog.to_f
  end

  def gear_inches
    ratio * wheel.diameter
  end
  # ...
end
```

- 이러한 결과에서 `diameter` 메서드는 특정 역할의 퍼블릭 인터페이스를 이루고 있다.
- 입력받는 객체의 클래스에 얽매이지 않고 보다 자유롭게 사고할 수 있을 때 더욱 다양한 디자인과 테스트를 시도해 볼 수 있다.
- 테스트 단계에서도 `Wheel` 인스턴스를 주입하는 것을 통해 실제 코드의 변경사항을 테스트에 반영하고 있다.

```ruby
class GearTest < MiniTest::Unit::TestCase
  def test_calculates_gear_inches
    gear = Gear.new(
      chainring: 52,
      cog: 11,
      wheel: Wheel.new(26, 1.5)
    )

    assert_in_delta(137.1, gear.gear_inches, 0.01)
  end
end
```

- 테스트 코드에서도 `Gear`가 `Wheel`을 사용한다는 점이 명확해졌다. 공개적으로 드러나게 되었다.
- 또한 여기서 `Wheel`이 `diameter`의 역할을 수행하고 있다는 것 역시 명확히 드러나지 않았다. 역할이 눈에 보이지도 않고 `Gear`는 `Wheel`과 결합되어 있지만 테스트를 이런 방식으로 작성하는 것은 명백한 이점을 하나 가지고 있다.

### 🎈 클래스를 사용해서 의존성 주입하기
- 다음은 `Wheel` 클래스의 `diameter` 메서드의 이름을 `width`로 변경했다.

```ruby
class Wheel
  attr_reader :rim, :trie
  def initialize(rim, tire)
    @rim = rim
    @tire = tire
  end

  def width # 변경
    rim + (tire * 2)
  end
  # ...
end
```
- `Gear` 태스트는 `Wheel` 인스턴스를 주입하고 있고 이 `Wheel`은 `width`를 구현하고 있다고 가정한다. 그런데 `Gear`는 여전히 `diameter` 메시지를 전송한다고 가정하면 테스트는 당연히 실패한다.

```ruby
Gear
  ERROR test_calculates_gear_inches
    undefined method 'diameter'
```
- 이러한 실패는 이해하기 쉽다. 코드가 매우 구체적이기 때문에 테스트 역시 간단하고 실패의 원인도 명확하다. 그렇기 때문에 이 테스트는 바로 이 특정한 경우에만 제대로 작동한다.

### 🎈 역할에 대한 의존성 주입하기
- 위 코드에는 객체가 `Diameterizable`에 대한 지식이 의존하는 곳이 두 군데 있다.
- 첫째, `Gear`는 자신이 `Diameterizable`의 인터페이스를 알고 있다고 생각한다. 다시 말해 `Gear`는 주입된 객체에게 `diameter`를 전송해도 된다고 생각한다.
- 둘째, 주입하기 위해 객체를 생성하는 코드는 `Wheel`이 이런 인터페이스를 구현하고 있다고 생각한다. 다시 말해 `Wheel`이 `diameter`를 구현하고 있다고 생각한다.
- 이제 `Diameterizable`가 변경되면서 문제가 발생하는데 `Wheel`에 새로운 인터페이스를 구현했지만 `Gear`는 여전히 예전 인터페이스를 사용하고 있다.
- 의존성 주입을 사용하는 궁극적인 이유는 이미 있는 코드를 수정하지 않고도 구체 클래스들을 서로 대체해서 사용하기 위함이다.
- 애플리케이션의 코드를 한 가지 방식으로 작성해야 한다면 실제 코드를 그대로 반영하는 방식으로 테스트를 작성하는 것이 종종 가장 효율적이다. 구체적인 것이 변하든 아니면 추상적인 것이 변하든, 테스트는 실패하는 지점에 제대로 실패할 것이기 때문이다.

#### 🐤 테스트 더블 만들기
- 다음 예시는 `Diameterizable` 역할을 수행하는 가짜 객체 또는 테스트 더블을 만드는 방법이다.

```ruby
# "Diameterizable" 역할을 수행할 가짜 객체
class DiameterDouble
  def diameter
    10
  end
end

class GearTest < MiniTest::Unit::TestCase
  def test_calculates_gear_inches
    gear = Gear.new(
      chainring: 52,
      cog: 11,
      wheel: DiameterDouble.new
    )

    assert_in_delta(47.27, gear.gear_inches, 0.01)
  end
end  
```

- 이 테스트 더블은 역할을 수행하는 객체의 표준적인 형태로써, 전적으로 테스트만을 위한 것이다. 이런 테스트 더블이 대신하고 있는 실제 객체의 세세한 특징들은 뒤로 감춘다.
- 우리가 만든 테스트 더블은 `diameter`를 **스텁**(stubs)하고 있다. 다시 말해, 이미 정해진 값을 반환하는 `diameter` 메시지를 가지고 있다.
- `DiameterDouble`은 목(mock)이 **아니다.**
- 테스트 더블을 주입하면 `Gear` 테스트와 `Wheel` 클래스 사이의 결합을 끊을 수 있다. 또한, 테스트는 간단하고 빠르고 독립적이며 의도를 명확하게 드러내게 될 수 있다.

#### 🐤 꿈속에서 살기
- 아까 `diameter`를 `width`로 변경했었는데 `Gear`는 수정하지 않았다. 하지만, 위에서 변경한 테스트에서는 `Wheel` 대신에 `DiameterDouble`을 주입했고, 테스트는 성공하게 된다.
- 애플리케이션은 제대로 작동하지 않지만 테스트는 여전히 통과하고 있다.
- 그렇기 때문에 좀 더 나은 코드를 작성하기 위해서는 문제의 핵심을 이해하고 있어야 하고 결국 문제의 원인들을 꼼꼼히 살펴봐야 한다.
- 지금 발생한 문제는 `Wheel`에는 새로운 인터페이스를 반영했지만 `DiameterDouble`을 수정하지 않은 것이다.

#### 🐤 역할을 문서화하기 위해 테스트를 사용하기
- 위와 같은 문제가 발생한 이뉴는 역할이 눈에 잘 띄지 않기 때문이다.
- 역할을 더욱 선명하게 드러낼 수 있는 방법 중 하나는 `Wheel`이 주어진 역할을 수행하고 있다고 명시적으로 선언하는 것이다.
- 아래의 코드에선 역할은 문서화되어 있고, `Wheel`이 역할을 제대로 구현하고 있는지 확인하고 있다.

```ruby
class WheelTest < MiniTest::Unit::TestCase
  def setup
    @wheel = Wheel.new(26, 1.5)
  end

  def test_implements_the_diameterizable_interface
    assert_respond_to(@wheel, :diameter)
  end
  
  def test_calculates_diameter
    wheel = Wheel.new(26, 1.5)

    assert_in_delta(29, wheel.diameter, 0.01)
  end
end
```

- `test_implements_the_diameterizable_interface` 테스트는 역할을 테스트하는 방법을 보여주고 있지만, 만족스럽지 못하다. 첫째, 다른 `Diameterizable`은 이 테스트를 사용할 수 없다. 둘째, `Wheel`이 `Diameterizable` 역할을 수행하는지 검증하는 것만으로는 `Gear`의 `Diameterizable`를 깜빡 잊고 수정하지 않는 실수를 해결해주지 못한다.
- 테스트는 여전히 실패해야 하는 순간에도 문제가 없다고 말하고 있다. 하지만, 문서화화고 테스트하는 문제는 간단히 해결할 수 있다.
- 진짜 객체와 가짜 객체에서 선택하는 하는 문제는 진짜 객체는 실제 애플리케이션에서 발생하는 문제가 테스트에서도 정확히 포착된다. 대신 테스트 실행 속도가 느려진다.
- 반대로 테스트 더블을 주입하면 테스트를 동화 속 세상에 가둬버릴지도 모른다.
- 테스트 코드는 객체들 사이의 결합을 깨뜨려주지 않고 의존성을 주입해주지도 않는다.

## 📚 프라이빗 메서드 테스트하기
- 프라이빗 메서드는 테스트 중인 객체의 외부에서는 전혀 보이지 않기 때문에 이상적이고 완벽한 디자인이 갖춰져 있다면 프라이빗 메서드를 테스트하지 않아도 된다.
- 하지만, 프라이빗 메서드를 다룰 때에도 디자이너의 판단과 유연함이 필요하다.

### 🎈 테스트 과정에서도 프라이빗 메서드 무시하기
- 프라이빗 메서드를 테스트하지 말아야 할 이유는 다음과 같다.
  1. 이런 테스트는 쓸모없다. 테스트 중인 객체 안에 숨어있기 때문에 그 외부에서는 보이지 않는다. **프라이빗 메서드는 이미 테스트를 붙여 놓은 퍼블릭 메서드에 의해 호출된다.**
  2. 프라이빗 메서드는 불안정하다. 때문에 테스트는 변경될 확률이 높은 애플리케이션 코드에 결합되어 있다. 애플리케이션을 수정하면 뒤이어 테스트 역시 수정해야 한다.
  3. 프라이빗 메서드를 테스트하면 다른 프로그래머에게 이 메서드를 사용해도 된다는 잘못된 생각을 심어줄 수 있다. 코드의 캡슐화를 무시하고 프라이빗 메서드를 사용하게 된다.

### 🎈 테스트 중인 클래스에서 프라이빗 메서드 제거하기
- 프라이빗 메서드를 너무 많이 가지고 있어 도저히 테스트하지 않고 지나칠 수 없는 객체를 가지고 있다면, 메서드들을 새로운 객체로 옮기는 것을 고려해보아야 한다. 다시 말해 퍼블릭 인터페이스를 구성한다. 하지만 새로 구성한 인터페이스가 안정적인 경우에만 의미가 있다.

### 🎈 프라이빗 메서드를 테스트하기
- 프라이빗 메서드에 대한 테스트는 문제가 발생한 바로 그 부분을 정확하게 짚어주는데 의의가 있다. 정확한 에러 메시지를 제공해 줄 수 있기 때문이다. 이런 구체적인 에러들은 실제 코드와 테스트 코드 사이의 강한 결합을 뜻하며, 이런 결합은 유지보수 비용을 높인다.
- 하지만 코드를 수정하면 어떤 결과를 나오는지 이해하기 쉽게 만들어 주고, 복잡한 프라이빗 메서드를 리팩터링하는 과정의 힘겨움을 어느 정도 덜어 줄 수 있다.
- **프라이빗 메서드를 테스트할 때 기본 원칙은 절대 테스트 하지 마라. 만약 테스트해야 한다면, 그래도 테스트 하지 마라. 물론 꼭 해야 하는 상황에서는 테스트해도 된다.**

## 📚 밖으로 나가는 메시지 테스트하기
- 밖으로 나가는 메시지는 **쿼리 메시지**이거나 **커맨드 메시지**이다.
- 쿼리 메시지는 전송하는 송신자에게만 중요한 메시지이고 커맨드 메시지는 애플리케이션의 다른 객체들에게도 영향을 미친다.

### 🎈 쿼리 메시지 무시하기

```ruby
class Gear
  # ...
  def gear_inches
    ratio * wheel.diameter
  end
end
```

- `gear_inches`를 제외한 애플리케이션의 다른 부분은 `diameter`가 전송되었다는 사실에 관심이 없다. `diameter` 메서드는 아무런 부작용도 낳지 않는다.
- 자기 자신에게 전송하는 메시지를 테스트하지 않는 것과 같은 이유로 밖으로 나가는 메시지도 테스트할 필요가 없다.
- `gear_inches` 메서드는 `diameter` 메시지가 반환하는 값에 의존하고 있지만, `diameter`가 제대로 작동하는지 테스트하는 것은 `Wheel` 담당이지 `Gear`가 신경 쓸 내용이 아니다. 때문에 `Gear`가 테스트틀 중복해서 작성할 필요는 없다.
- `Gear`의 책임은 `gear_inches`가 제대로 작동하고 있는지 검증하는 것이다.

### 🎈 커맨드 메시지 검증하기
- 애플리케이션의 다른 부분이 이 메시지 전송의 결과에 의존하고 있으면 테스트 중인 객체가 메시지를 전송해야 할 책임을 가지고 있다.
- 예를 들어 `Gear` 클래스는 애플리케이션 전체에 기어가 바뀌는 순간 알려줄 책임이 있다. 이 정보를 가지고 행동을 변경해야 한다.

```ruby
class Gear
  attr_reader :chainring, :cog, :wheel, :observer
  def initialize(args)
    # ...
    @observer = args[:observer]
  end

  # ...

  def set_cog(new_cog)
    @cog = new_cog
    changed
  end

  def set_chainring(new_chainring)
    @chainring = new_chainring
    changed
  end

  def changed
    observer.changed(chainring, cog)
  end

  # ...
end
```

- `cogs`나 `chainrings`가 변경되면 이 내용을 `observer`에게 알려줘야 한다. 때문에 `changed` 메시지가 전송되었는지 테스트해야 한다. 또한, `observer`의 `changed`메서드가 무엇을 반환하는지와는 상관없이 작동해야 한다.
- 중복을 피하려면 `Gear`의 `changed`가 무엇을 반환하는지 확인하지 않으면서도, `Gear`가 `changed`를 `observer`에게 전송했다는 사실을 검증해야 한다. 이럴때 **목**(**mock**)을 사용하면 된다. 목은 행동에 대한 테스트이고, 상태에 대한 테스트와는 반대된다. 목 객체가 기대하는 바를 테스트한다.
- 테스트는 목 객체를 만들고 목 객체를 `observer`의 위치에 놓는다.

```ruby
class GearTest < MiniTest::Unit::TestCase

  def setup
    @observer = MiniTest::Mock.new
    @gear = Gear.new(
      chainring: 52,
      cog: 11,
      observer = @observer
    )
  end

  def test_notifies_observers_when_cogs_change
    # 목 객체가 changed 메시지를 수신하고자 한다는 사실을 명시 (어떤 메시지를 기대하고 있는지)
    @observer.expect(:changed, true, [52, 27])
    # 기대를 충족시킬 수 있는 행동을 유발
    @gear.set_cog(27)
    # 목 객체에게 주어진 기대가 충족하는지 물어본다.
    @observer.verify
  end

  def test_notifies_observers_when_chainring_change
    @observer.expect(:changed, true, [42, 11])
    @gear.set_chainring(42)
    @observer.verify
  end

end
```

- 목 객체가 메시지를 가지고 하는 일은 그저 메시지를 수신했다는 사실을 기억하는 것뿐이다. 반환 값이 중한게 아니라 메시지의 전송 여부를 검증해야 한다.

## 📚 오리 타입 테스트하기

### 🎈 역할 테스트하기
- 5장의 예제이다.

```ruby
class Trip
  attr_reader :bicycles, :customers, :vehicle

  def prepare(preparers)
    preparers.each {|preparer|
      preparer.prepare_trip(self)}
  end
end

class Mechanic
  def prepare_trip(trip)
    trip.bicycles.each {|bicycle|
      prepare_bicycle(bicycle)}
  end

  # ...
end

class TripCoordinator
  def prepare_trip(trip)
    buy_food(trip.customers)
  end

  # ...
end

class Driver
  def prepare_trip(trip)
    vehicle = trip.vehicle
    gas_up(vehicle)
    fill_water_tank(vehicle)
  end

  # ...
end
```

- 테스트는 `Preparer` 역할을 문서화해야 하고, 역할 수행자 각각이 올바르게 행동하고 있는지 검증해야 한다. 그리고 `Trip`이 `Preparers`들과 제대로 소통하고 있다는 것을 보여줘야 한다.
- `Preparer`의 인터페이스를 테스트하고 문서화해주는 모듈은 다음과 같다.

```ruby
module PreparerInterfaceTest
  def test_implements_the_preparer_interface
    assert_respond_to(@object, :prepare_trip)
  end
end
```

- 이 모듈은 `@object`가 `prepare_trip`에 반응하는지 검증한다. 아래 테스트 코드는 이 모듈을 사용해서 `Mechanic`이 `Preparer`인지 확인하고 있다.

```ruby
class MechanicTest < MiniTest::Unit::TestCase
  include PreparerInterfaceTest

  def setup
    # @object를 가지고 Mechanic을 만든다.
    @mechanic = @object = Mechanic.new
  end

  # @mechanic을 사용하는 다른 테스트들
end
```

- 나머지 `TripCoordinator`와 `Driver` 테스트도 같은 패턴이다.
- `PreparerInterfaceTest`를 모듈의 형태로 정의했기 때문에 테스트를 한 번만 작성하고도 역할 수행 객체들이 테스트 코드를 재사용할 수 있었다. 모듈 덕분에 역할을 명시적으로 불 수 있게 되었다.
- 들어오는 메시지를 테스트하였으니 반대로 `Trip`이 전송하는 메시지를 테스트한다. 목 객체를 만들고 이 객체가 기대하는 바를 정의하면 된다.

```ruby
class TripTest < MiniTest::Unit::TestCase

  def test_requests_trip_preparation
    @preparer = MiniTest::Mock.new # 목 객체 생성
    @trip = Trip.new
    @preparer.expect(:prepare_trip, nil, [@trip])

    @trip.prepare([@preparer]) # 메서드 실행
    @preparer.verify # 목 객체가 제대로 수신했는지 확인
  end

end
```

### 🎈 테스트 더블을 확인하기 위해 역할 테스트 사용하기
- 아래는 잘못된 테스트 코드로 이전에 설명했던 스텁을 사용했을 때의 문제이다. (실패해야 하는 순간에도 통과)

```ruby
class DiameterDouble
  def diameter # 인터페이스가 'width'로 바뀌었지만
    10         # 이 테스트 더블과 Gear 모두
  end          # 여전히 'diameter'를 사용하고 있다.
end

class GearTest < MiniTest::Unit::TestCase
  def test_calculates_gear_inches
    gear = Gear.new(
      chainring: 52,
      cog: 11,
      wheel: DiameterDouble.new
    )

    assert_in_delta(47.27, gear.gear_inches, 0.01)
  end
end  
```
- 더 이상 유효하지 않은 테스트 더블 때문에 테스트는 문제를 걸러내지 못하고 `Gear`가 정상적으로 작동한다는 잘못된 믿음을 준다. 하지만 `GearTest`가 정상적으로 작동한다는 것은 잘못된 테스트 더블을 사용했기 때문이다.
- `WheelTest`를 다음과 같이 만들었었다.
- `Wheel`이 `width` 인터페이스를 구현하고 있는 `Diameterizable`의 역할을 수행하고 있다는 사실을 검증하고 있다.

```ruby
class WheelTest < MiniTest::Unit::TestCase
  def setup
    @wheel = Wheel.new(26, 1.5)
  end

  def test_implements_the_diameterizable_interface
    assert_respond_to(@wheel, :width)
  end
  
  def test_calculates_diameter
    # ...
  end
end
```

- 문제를 해결하기 위해서 `Wheel`에서 `test_implements_the_diameterizable_interface` 테스트를 뽑아내서 새로운 모듈 속에 넣는다.

```ruby
module DiameterizableInterfaceTest
  def test_implements_the_diameterizable_interface
    assert_respond_to(@object, :width)
  end
end
```

- 모듈을 인클루드하고 `Wheel`을 가지고 `@object`를 초기화한다.

```ruby
class WheelTest < MiniTest::Unit::TestCase
  include DiameterizableInterfaceTest

  def setup
    @wheel = Wheel.new(26, 1.5)
  end
  
  def test_calculates_diameter
    # ...
  end
end
```

- 리팩터링의 결과로 독립적인 모듈을 얻었고, 이 모듈은 `Diameterizable`이 제대로 작동한다는 것을 검증해줄 수 있다.
- 아래 코드는 `GearTest`에 이 모듈을 적용한 것이다.

```ruby
class DiameterDouble
  def diameter
    10
  end
end

# 테스트 더블이 올바른 인터페이스를 따르고 있는지 검증한다.
class DiameterDoubleTest < MiniTest::Unit::TestCase
    include DiameterizableInterfaceTest

  def setup
    @object = DiameterDouble.new
  end
end

class GearTest < MiniTest::Unit::TestCase
  def test_calculates_gear_inches
    gear = Gear.new(
      chainring: 52,
      cog: 11,
      wheel: DiameterDouble.new
    )

    assert_in_delta(47.27, gear.gear_inches, 0.01)
  end
end  
```

- 이렇게 테스트 더블이 주어진 역할을 올바르게 수행하고 있는지도 테스트한다. 테스트를 실행하면 `DiameterDoubleTest`에 에러가 출력된다. 그리고 `DiameterDouble`에 `width`를 추가할 수 있다.

```ruby
class DiameterDouble
  def width
    10
  end
end
```

- 이제 테스트 더블을 수정하고 다시 테스트를 돌려보면, 테스트는 `GearTest`애서 실패한다.
- `Gear`의 `gear_inches` 메서드가 `diameter` 대신 `width`를 전송해야한다는 것이다.

```ruby
class Gear
  def gear_inches
    ratio * wheel.width
  end

  # ...
end
```
- 오리 타입을 테스트하려면 역할을 테스트하는 독립적인 코드를 만들고 이 코드를 공유할 수 있어야만 한다.
- 이렇게 역할 기반의 관점을 취하고 난 뒤, 테스트 중인 객체의 관점에서 보면 다른 모든 객체는 하나의 역할이다. 그리고 이 객체들을 주어진 역할의 대변자로 취급하면, 애플리케이션과 테스트 모두 결합을 줄이고 유연성을 높일 수 있다.

## 📚 상속 받은 코드 테스트하기

### 🎈 상속 받는 인터페이스 명확하게 하기
- 아래는 6장의 `Bicycle` 클래스이다.

```ruby
class Bicycle
  attr_reader :size, :chain, :tire_size

  def initialize(args={})
    @size = args[:size]
    @chain = args[:chain] || default_chain
    @tire_size = args[:tire_size] || default_tire_size
    post_initialize(args)
  end

  def spares
    {
      tire_size: tire_size,
      chain: chain,
    }.merge(local_spares)
  end

  def default_tire_size
    raise NotImplementedError, "This #{self.class} cannot respond to:"
  end

  # 하위클래스가 재정의할 수 있다.
  def post_initialize(args)
    nil
  end

  def local_spares
    {}
  end

  def default_chain 
    '10-speed'
  end
end
```
- 아래는 `Bicycle`의 하위클래스 중 하나인 `RoadBike` 코드이다.

```ruby
class RoadBike < Bicycle
  attr_reader :tape_color

  def post_initialize(args)
    @tape_color = args[:tape_color]
  end

  def local_spares
    { tape_color: tape_color }
  end

  def default_tire_size
    '23'
  end
end
```
- 테스트의 첫 번째 목표는 이 상속 관계에 속한 모든 객체들이 약속을 제대로 이행하고 있는지 검증하는 것이다.
- 리스코프 원칙을 검증하는 방법은 공통의 약속을 테스트하는 공용코드를 작성하고 이 테스트를 모든 객체에 인클루드하는 것이다.

```ruby
module BicycleInterfaceTest
  def test_responds_to_default_tire_size
    assert_respond_to(@object, :default_tire_size)
  end

  def test_responds_to_default_chain
    assert_respond_to(@object, :default_chain)
  end

  def test_responds_to_chain
    assert_respond_to(@object, :chain)
  end

  def test_responds_to_size
    assert_respond_to(@object, :size)
  end

  def test_responds_to_tire_size
    assert_respond_to(@object, :tire_size)
  end

  def test_responds_to_spares
    assert_respond_to(@object, :spares)
  end
end
```

- `BicycleInterfaceTest` 테스트를 통과하는 모든 객체는 `Bicycle`처럼 행동하는 객체라고 볼 수 있다.
- 아래 코드는 `BicycleTest`에 이 인터페이스를 인클드한 것이다. 그리고 구체적인 하위클래스 `RoadBikeTest`에도 인클루드했다.

```ruby
class BicycleTest < MiniTest::Unit::TestCase
  include BicycleInterfaceTest

  def setup
    @bike = @object = Bicycle.new({tire_size: 0})
  end
end

class RoadBikeTest < MiniTest::Unit::TestCase
  include BicycleInterfaceTest

  def setup
    @bike = @object = RoadBike.new
  end
end
```

- `BicycleInterfaceTest`는 모든 종류의 `Bicycle`이 사용할 수 있고, 새로운 클래스를 만들더라도 쉽게 인클루드할 수 있다.

### 🎈 하위클래스의 책임 명확히 하기

#### 🐤 하위클래스의 행동 확인하기
- 아래 코드는 하위클래스가 갖추어야 하는 바를 문서화한 테스트이다.

```ruby
module BicycleSubClassTest
  def test_responds_to_post_initialize
    assert_respond_to(@object, :post_initialize)
  end

  def test_responds_to_local_spares
    assert_respond_to(@object, :local_spares)
  end

  def test_responds_to_default_tire_size
    assert_respond_to(@object, :default_tire_size)
  end
end
```

- 이 테스트는 이 메시지들이 오작동하는 것을 방지할 뿐이다. 하위클래스가 꼭 구현해야 하는 메서드는 `default_tire_size`이다. 하위클래스가 자신만의 고유한 로직을 구현하지 않는다면 테스트는 통과할 수 없다.
- `RoadBike`는 `Bicycle`의 하위클래스처럼 작동해야 한다.

```ruby
class RoadBikeTest < MiniTest::Unit::TestCase
  include BicycleInterfaceTest
  include BicycleSubClassTest

  def setup
    @bike = @object = RoadBike.new
  end
end
```

- 이 두 개의 인터페이스를 사용하면 하위클래스가 공유하는 모든 행동을 쉽게 테스트할 수 있다.

#### 🐤 상위클래스의 요구사항 검증하기
- 하위클래스가 `default_tire_size`를 구현하고 있지 않다면 `Bicycle`이 에러를 발생시켜야 한다. 이 조건은 하위클래스가 충족시켜야 하는 것이지만 실제 행동은 `Bicycle` 안에서 실행된다. 때문에 이 테스트는 `BicycleTest` 안에 직접 추가되어야 한다.

```ruby
class BicycleTest < MiniTest::Unit::TestCase
  include BicycleInterfaceTest

  def setup
    @bike = @object = Bicycle.new({tire_size: 0})
  end

  def test_forces_subclasses_to_implement_default_tire_size
    assert_raises(NotImplementedError) {@bike.default_tire_size}
  end
end
```

### 🎈 하나뿐인 행동 테스트하기
- 이제 두 가지의 문제만이 남았다. 하나는 구체적인 하위클래스만의 특수한 행동을 테스트하지 않았고, 추상화된 상위클래스가 제공하는 구체적인 행동도 테스트하지 않았다.

#### 🐤 구체적인 하위클래스의 행동 테스트하기
- `RoadBike`의 특수한 행동만 테스트하면 된다.
- 하위클래스의 특수한 행동을 테스트할 때는 상위클래스에 대한 지식을 끌어오지 않는 것이 중요하다.
- 아래 `RoadBikeTest`는 `local_spares` 메서드를 테스트하고 있는데 이때 `spares`에 반응하면 안되고 존재를 무시해야 한다. (이미 `BicycleInterfaceTest`가 검증했다.)

```ruby
class RoadBikeTest < MiniTest::Unit::TestCase
  include BicycleInterfaceTest
  include BicycleSubClassTest

  def setup
    @bike = @object = RoadBike.new(tape_color: 'red')
  end

  def test_puts_tape_color_in_local_spares
    assert_equal 'red', @bike.local_spares[:tape_color]
  end
end
```

#### 🐤 추상화된 상위클래스의 행동 테스트하기
- `Bicycle`의 상속 관계를 살펴보면 여전히 추상화된 상위클래스이기 때문에 발생하는 문제가 여전히 남아 있다. `Bicycle`의 인스턴스를 생성하기도 어렵고 테스트를 하기 위한 충분한 행동을 가지고 있지 않을 수도 있다.
- 해결책은 `Bicycle`은 구체적인 행동을 구현하기 위해 템플릿 메서드를 사용하고 있기 때문에 상위클래스가 제공하는 행동을 스텁하면 된다.

```ruby
# Bicycle의 새로운 하위클래스인 StubbedBike를 정의한다.
class StubbedBike < Bicycle
  def default_tire_size
    0
  end

  def local_spares
    {saddle: 'painful'}
  end
end

class Bicycle < MiniTest::Unit::TestCase
  include BicycleInterfaceTest

  def setup
    @bike = @object = Bicycle.new({tire_size: 0})
    # StubbedBike 클래스의 인스턴스 생성
    @stubbed_bike = StubbedBike.new
  end

  def test_forces_subclasses_to_implement_default_tire_size
    assert_raises(NotImplementedError) {
      @bike.default_tire_size
    }
  end

  # local_spares를 제대로 처리하는지 검증
  def test_includes_local_spares_in_spares
    assert_equal @stubbed_bike.spares,{
      tire_size: 0,
      chain: '10-speed',
      saddle: 'painful'
    }
  end
end
```

- 만약 `StubbedBike`가 더 이상 유효하지 않아서 `BicycleTest`가 실패해야 할 때 실패하지 않을까 걱정된다면, 해결책은 이미 `BicycleSubClassTest`를 가지고 있다는 것이다. `BicycleSubClassTest`를 이용해서 `StubbedBike`의 정상상태를 확인할 수 있다.

```ruby
class StubbedBike < MiniTest::Unit::TestCase
  include BicycleSubClassTest

  def setup
    @object = StubbedBike.new
  end
end
```

- 전체적인 인터페이스에 대한 코드를 하나 작성해서 공유하고, 하위클래스의 책임을 테스트하면 된다.
- 여러가지 책임을 독립적으로 분리하도록 노력한다. 또한 하위클래스 고유의 행동을 테스트할 때는 상위클래스에 대한 지식이 하위클래스의 테스트 속으로 흘러들어오지 않도록 주의해야 한다.
- 리스코프 원칙에 충실한 새로운 하위클래스를 만들고, 이 클래스의 테스트 용도로 사용할 수 있다.
