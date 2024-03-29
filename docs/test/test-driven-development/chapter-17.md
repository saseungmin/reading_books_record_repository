---
sidebar_position: 18
sidebar_label: 17. Money 회고
---

# 🌈 Chapter 17: Money 회고
Money 예제를 만든 과정과 그 결과를 다시 한번 돌아보자.

## 👉 다음에 할 일은 무엇인가
이제 코딩은 끝난 걸까? 아직 아니다. 난 "끝났다"는 말을 맏지 않는다. TDD의 완벽을 위한 노력의 일환으로 사용할 수도 있겠지만 그건 TDD의 가장 효과적인 용법이 아니다. **만약 시스템이 크다면, 당신이 늘 건들이는 부분들을 절대적으로 견고해야 한다. 그래야 나날이 수정할 때 안심할 수 있기 때문이다.** 당신이 그 시스템의 가장자리, 자주 바뀌지 않는 부분으로 흘러감에 따라, 테스트는 더 듬성듬성 불규칙적이게 되고 디자인도 더 안 좋아지지만 안심할 수 있다.   

나는 작업을 끝낸 후에 스몰토크의 스몰린트 같은 코드 감정 프로그램을 실행하길 좋아한다. "다음에 할일은 무엇인가?"에 관련된 또 다른 질문은 "어떤 테스트들이 추가로 더 필요할까?"다. 때로는 실패해야 하는 테스트가 성공하는 경우가 있는데, 그럴 땐 그 이유를 찾아내야 한다. 또는 실패해야 하는 테스트가 실제로 실패하기도 하는데, 이때는 이를 이미 알려진 제한사항 또는 앞으로 해야 할 작업 등의 의미로 그 사실을 기록해둘 수도 있다.   

마지막으로, 할일 목록이 빌 때가 그때까지 설계한 것을 검토하기에 적절한 시기다. 말과 개념이 서로 잘 통하는가? 현재의 설계로는 제거하기 힘든 중복이 있는가?

## 👉 메타포
Money 예제를 코딩하면서 가장 놀라운 점은 이번 Money 예제의 결과가 기존에 했던 것과 많이 다르다는 것이다. 지금 글 쓰는 동안 'expression(수식)' 메타포를 생각했는데, 설계가 기존과는 완전히 다른 방향으로 흘렀다.   

Expression 메타포는 중복되는 통화를 합치는 세세한 일단의 문제에서 날 해방시켰다. 코드도 그 어느 때보다도 더 명확해져갔다. 나는 수식의 성능에 대해 우려했지만 최적화를 시작하기 전에 어느 정도의 사용 통계를 볼 때까지 기다리는 것에 만족한다.   

내가 지금까지 작성한 모든 프로그램을 20번씩 다시 작성해본다면 어떨까? 매번 새로운 통찰을 얻고 놀라움을 경험할 것인가? 더 신중을 가해서 모든 통찰을 처음 세 번 안에 다 얻어낼 방법이 있을까? 아니면 한번에?

## 👉 JUnit 사용도
Money 예제를 코딩하는 동안 JUnit이 로그를 기록하게 해 두었다. 실행버튼을 정확히 125번 눌렀다. 보통 일분에 한 번 정도 테스트를 실행했다. 그 전체 시간 중 정말 가끔 나는 성곡 혹은 실패를 보고 놀랐는데, 그것은 조급하게 리팩토링을 한 경우였다.

## 👉 코드 메트릭스
1. 코드와 테스트 사이에 대략 비슷한 양의 함수와 줄이 있는 것을 알 수 있다.
2. 테스트 코드의 줄 수는 공통된 테스트 픽스처를 뽑아내는 작업을 통해 줄일 수 있다. 하지만 모텔 코드와 테스트 코드 사이의 대략적인 줄 수의 비율은 비스사게 유지될 것이다.
3. 회기성 복잡도는 기존의 흐름 복잡도와 같다. 테스트 코드에 분기가 반복문이 전혀 없기 때문에 테스트 복잡도는 1이다. 명시적인 흐름 제어 대신 다형성을 주로 사용했기 때문에 실제 코드의 복잡도(1.4) 역시 낮다.

## 👉 프로세스
TDD의 주기는 다음과 같다.

- 작은 테스트를 추가한다.
- 모든 테스트를 실행하고, 실패하는 것을 확인한다.
- 코드에 변화를 준다.
- 모든 테스트를 실행하고, 성공하는 것을 확인한다.
- 중복을 제거하기 위해 리팩토링한다.

한 테스트를 작성하는 것을 단일 단계라고 가정할 때, 그걸 컴파일하고 실행하고 리팩토링하는 데 얼마나 많은 수정이 필요한가?   

큰 프로젝트에서 데이터를 수집한다고 해도 수정 횟수는 충분히 적게 유지될 것이다. 그렇지만 리팩토링당 수정 횟수는 "두꺼운 꼬리(fat tail)" 혹은 렙토쿠르토틱 프로파일(leptokurtotic profile)을 따르는데, 이는 종형 곡선(bell curve)과 유사하지만 표준적인 종형 곡선이 예상하는 것보다 좀 더 극단적인 변화가 있는 걸 말한다. 자연의 많은 측정치는 이 분포를 따르는데, 주식 시장에서의 가격 변화도 그러한 예다.

## 👉 테스트의 질
TDD의 부산물로 자연히 생기는 테스트들은 시스템의 수명이 다할 때까지 함께 유지돼야 할 만큼 확실히 유용하다. 하지만 이 테스트들이 다음과 같은 다른 종류의 테스트들을 대체할 수 있을 거라고 예상해서는 안 된다.

- 성능 테스트
- 스트레스 테스트
- 사용성 테스트

그렇지만 만약 테스트 주도 코드의 결함 밀도가 충분히 낮다면 전문 테스팅의 역할은 필연적으로 "어른의 감시"에서, 의사소통의 증폭기에 좀더 가까운 무언가로 바뀌기 될 것이다. 여기서 의사소통이란, 시스템이 무엇을 해야 하는지에 대해 일반적으로 어떤 느낌을 갖고 있는 사람들과 시스템이 실제로 그 일을 하도록 만들 사람들 간의 의사소통이다.

- 명령문 커버리지는 테스트의 질에 대한 충분한 평가 기준이 될 수 없음이 확실하지만, 테스트의 시작점이다. TDD는 100%의 명령문 커버리지를 종교적으로 따른다.
- 결함 삽입은 테스트의 질을 평가하는 또 다른 방법이다. 코드의 의미를 바꾼 후에 테스트가 실패하는지 보는 것이다.

이 책의 리뷰어 중 한 사람인 플립이 테스트 커버리지에 대해 한 이야기가 있는데, 여기서 되풀이할 가치가 있다. 전체 커버리지 수치는 프로그램의 서로 다른 경우를 테스트하는 테스트 수를 테스팅이 필요한 경우의 수(로직의 복잡도)로 나눈 것이다. 테스트 커버리지를 향상시키는 한 가지 방법은 더 많은 테스트를 작성하는 건데, 테스트 주도 개발자가 작성하는 테스트 코드의 수와 전문 테스터가 작성하는 테스트 코드의 수 사이의 엄청난 차이가 여기서 온다. (32장에 이에 대한 구체적인 예가 나오는데, 같은 문제에 대해 나느 6개의 테스트를 작성한 반면 전문 테스터는 65개의 테스트를 작성했다.) 테스트 커버리지를 향상시키는 또다른 방법은 테스트의 수는 그대로 두면서 프로그램의 로직을 단순화하는 것이다. 리팩토링 단계가 종종 다음과 같은 효과를 가져온다. 조건문이 메시징으로 바뀌거나 아예 사라진다. 플립의 말을 빌자면 "모든 입력의 경우(좀더 정확히 말하자면, 가능한 모든 경우를 효율적으로 줄인 샘플)를 따져서 테스트 커버리지를 높이는 대신에, 우리는 테스트는 그대로 두고 코드를 줄여서 동일한 테스트가 다양한 경우를 다루게 한다."

## 👉 최종 검토
TDD를 가르칠 때 사람들이 자주 놀라는 세 가지는
- 테스트를 확실히 돌아가게 만드는 세 가지 접근법: 가짜로 구현하기, 삼각측량법, 명백하게 구현하기.
- 설계를 주도하기 위한 방법으로 테스트 코드와 실제 코드 사이의 중복을 제거하기.
- 길이 미끄러우면 속도를 줄이고 상황이 좋으면 속도를 높이는 식으로 테스트 사이의 간격을 조절할 수 있는 능력.
