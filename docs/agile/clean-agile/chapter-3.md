---
sidebar_position: 4
---

# 👉 Chapter 3: 비즈니스 실천 방법
- 성공적인 개발을 위해 반드시 지켜야 하는 애자일 실천 방법 중 비즈니스와 연관된 것들이 많이 있다.
- 계획 세우기, 작은 릴리즈, 인수 테스트, 전체 팀이 여기에 속한다.

## 📚 계획 세우기
- 추정은 추측이다. 프로젝트를 실제로 완성하지는 않고 프로젝트가 대략 얼마나 걸릴지 알고 싶은 것이다.
- 추정에는 비용이 적게 들어야 한다.
- 하지만 추정이 불확실해야 한다는 말은 아니다. 추정은 가능한 한 확실해야 한다.
- 하지만 추정 비용을 낮게 유지하려면, 필요한 만큼만 정밀해야 한다.
- 소프트웨어 개발자를 위한 좋은 추정 요령은, **확실한 시간 범위를 고르되 이 시간 범위를 가능한 한 좁히기 위해 약간의 시간을 투자하는 것이다.**

### 🔥 삼변량 분석
- 대형 과제 추정에는 *삼변량 추정*(**trivariate estimation**)이 매우 유용하다.
- 삼변량 추정은 **최선의 경우**, **일반적인 경우**, **최악의 경우** 이렇게 세 개의 숫자로 이루어져 있다.
- 이 숫자들은 확신 정도에 따른 추정값이다. **최악의 경우로 추정한 시간은 그 안에 끝날 것이 95% 확실한 시간이다.**
- **일반적인 경우는 50% 확실한 시간이고, 최악의 경우는 5%밖에 안 된다.**
- 삼변량 추정을 관리하기 위한 수학적 방법론도 있는데 이걸 **프로그램 평가 검토 기법**(**PERT**)이라고 한다. 
- PERT는 대형 프로젝트나 여러 프로젝트로 구성된 포트폴리오를 관리하는 데 탁월하다.
- 삼변량 분석이 전체 프로젝트의 장기 추정에는 적당하지만, 하나의 프로젝트 내에서 일상적 관리 용도로 사용하기에는 너무 정밀도가 낮다.
- 그래서 일상적 관리 용도로는 **스토리 포인트**(**story point**) 방법을 사용한다.

### 🔥 스토리와 포인트
- 스토리 포인트 기법은 매우 엄격한 피드백 루프를 사용한다.
- **실제 결과를 가지고 추정치를 재조정하여 더 확실하고 정밀하게 추정을 다시한다.**
- 스토리를 작성할 때는 개발자와 이해관계자가 스토리 구현에 관하여 몇 가지 세부 사항을 논의한 후 내용을 요약해서 적는다.
- 스토리 문구는 단순해야 한다. 스토리는 인덱스카드에 적는다.

### 🔥 ATM 스토리
- 스토리에 세부 사항은 적지 않는다.
- **세부 사항을 남기지 않는 규율을 지켜야 한다.**
- 스토리에 세부 사항을 적지 않는 이유는 세부 사항이 너무 많아서 추정할 수가 없고, 일정을 잡기도 어렵다.
- 스토리는 가볍게 시작해야 한다.
- 반복 주기 0에서 스토리 카드가 생겨날 것이고 스토리를 만드는 프로세스는 끊임없이 계속된다.
- **스토리는 언제나 만들어지고, 바뀌고, 버려지고, (가장 중요하게는) 개발된다.**

#### 💧 스토리 추정하기
- 아직 반복 주기 0인 초기이고, 처음으로 하는 추정 회의이다. 추정한 스토리가 하나도 없다.
- 카드 더미에서 스토리 하나를 고른다. 그 다음 스토리에 부여할 포인트를 정한다.
- 중간 정도의 스토리를 고른 후 중간 정도의 포인트를 부여하면 우리의 **기준 스토리**(**Golden Story**)가 된다.
- 추정한 스토리 카드 한쪽 귀퉁이에 이 숫자를 쓴다.
- 이 포인트는 추정한 노력의 단위이지 실제 시간을 나타내지 않는다. 시간을 추정한 것이 아니라, **노력을 추정한 것이다.**

#### 💧 반복 주기 1 계획하기
- 반복 주기는 **반복 주기 계획 회의**(Iteration Planning Meeting, IPM)로 시작한다.
- 회의 길이는 전체 반복 주기 길이의 1/20 정도가 좋다.
- 2주 단위의 반복 주기라면, 하루 업무 시간의 절반 정도를 계획 회의에 할애하는 정도다.
- 반복 주기 계획 회의에는 **팀 전원이 참석한다.** (이해관계자, 프로그래머, 테스터, 프로젝트 관리자 등)
- 반복 주기 계획 회의에서 이해관계자는 반복 주기 동안 프로그래머와 테스터가 구현할 스토리를 골라야 한다. 그러려면 이해관계자는 프로그래머가 스토리 포인트를 몇 포인트나 처리할 수 있다고 생각하는지 알아야 한다. 이 숫자를 **속도**라고 부른다.
- 물론, 첫 번째 반복 주기니 진짜 속도가 어느 정도일지 아무도 모르니 적당히 짐작해야 한다.
- **속도는 약속이 아니라는 점을 꼭 기억해야 한다.**

#### 💧 투자 수익률
- 이것이 **투자 수익률**(**return on investment**)계산이다.
> - **가치는 높은데 저비용인 스토리는 바로 작업해야 한다.** 
> - 가치는 높지만, 고비용이면 나중에 한다.
> - 가치는 낮고 저비용이면 언젠가는 할 것이다. 
> - 가치는 낮은데 고비용이면 절대 하지 않을 것이다.
- 엄밀하게 정의한 것도 아니고 수학도 필요 없다. 이해관계자는 그저 카드를 보고, 스토리의 가치와 추정된 비용에 따라 판단을 내리면 된다.

#### 💧 중간 확인
- 반복 주기가 반쯤 지났고, 이쯤이면 스토리가 많이 끝났어야 한다.
- 그러면 중간 검토 회의를 가진다.
- 반복 주기에 실패란 없다. **반복 주기의 목표는 관리자에게 데이터를 제공하는 것이다.**
- 반복 주기 동안 작동하는 코드를 만든 것은 물론 좋은 일이다. 하지만 그렇게 하지 못했더라도 데이터는 만들어 냈을 것이다.

#### 💧 어제의 날씨
- 이제 우리는 반복 주기 한 번 동안 포인트를 얼마나 처리할 수 있는지 알 수 있다.
- 다음 반복 주기를 시작하는 월요일에 이해관계자가 스토리를 몇 포인트를 골라야 할까? 당연히 **직전 반복 주기와 같은 포인트이다.**
- 이것을 어제의 날씨라고 한다.

#### 💧 프로젝트 종료
- 반복 주기가 끝날 때마다 속도 차트에 반복 주기의 속도를 기록하므로, 누구나 이 팀이 일하는 진행하는 속도를 알 수 있다.
- 프로젝트는 스토리를 모두 구현함으로써 끝나는 것이 아니다. **프로젝트는 스토리 더미에 구현할 가치가 있는 스토리가 더 이상 없을 때 끝난다.**

### 🔥 스토리
- 스토리에 세부 사항은 쉽게 바뀌기 때문에 너무 많은 것을 적으면 안 된다.
- 세부 사항은 나중에 작성하는데, 나중에 인수 테스트 형태로 작성한다.
- **스토리를 쓸 때는 다음 여섯 가지를 지켜야 한다.** (각 항목의 앞글자 **INVEST**)

#### 💧 I: 독립적인(Independent)
- 사용자 스토리는 서로 독립적이다. 
- 스토리를 어떤 순서로 구현해도 상관없다.

#### 💧 N: 협상할 수 있는(Negotiable)
- 이것이 세부 사항을 전부 쓰지 않는 또 다른 이유이다.
- 개발자와 사업 부서가 세부 사항을 협상할 수 있어야 한다.

#### 💧 V: 가치 있는(Valuable)
- 스토리는 명확하고 계량할 수 있는 비즈니스 가치가 있어야 한다.
- **스토리는 언제나 바즈니스 가치가 있는 일이어야 한다.**

#### 💧 E: 추정할 수 있는(Estimable)
- 사용자 스토리는 개발자가 작업량을 추정할 수 있을 정도로 구체적이어야 한다.

#### 💧 S: 작은(small)
- 사용자 스토리는 개발자 한두 명이 반복 주기 한 번 이내에 구현하기 힘들 정도로 크면 안 된다.

#### 💧 T: 테스트할 수 있는(Testable)
- 사업 부서가 스토리 완료를 증명하는 테스트를 제시할 수 있어야 한다.
- 보통 QA가 이 테스트를 작성하고 테스트를 자동화시키면, 이걸로 스토어 완료 여부를 판단할 수 있다.

### 🔥 스토리 추정
- **날아다니는 손가락(Flying Fingers)** 은 가장 간단한 축에 속한다. 
- 개발자가 모두 탁자에 둘러앉고 스토리를 읽고, 필요하다면 이해관계자와 논의를 한다.
- 논의가 끝나면, 개발자는 모두 한 손을 등 뒤에 안 보이게 감추고, 자신이 생각하는 스토리 포인트를 손가락으로 표시한다.
- 모두가 같은 수의 손가락을 들었거나 편차가 그리 크지 않고 평균값이 명백하다면, 숫자를 스토리 카드에 적는다.
- 들쑥날쑥하다면 토론 후 합의가 될 때까지 이 과정을 반복한다.
- **계획 포커(Planning Poker)** 도 존재한다.

#### 💧 쪼개기, 합치기, 스파이크
- **스토리 합치기**는 스토리 카드를 클립으로 묶어서 하나의 스토리인 척하면 된다. 포인트는 다 더하면 된다.
- **스토리 쪼개기**는 **INVEST**를 지키면서 쪼개야 한다. 쪼갤 수 없는 스토리는 거의 없다.
- **스파이크**는 메타스토리(meta-story)다. 스토리를 추정하는 스토리이다.

### 🔥 반복 주기 관리하기
- 각 반복 주기의 목표는 **스토리를 처리하여 데이터를 얻는 것**이다.
- 팀은 세부 작업 하나하나의 처리보다 스토리 전체에 집중해야 한다.
- **스토리를 완료하는 데 집중한다.**
- 관리자나 수석 프로그래머는 아마 스토리를 프로그래머에게 직접 할당하고 싶을 것이지만 그래서는 안 된다. **프로그래머들끼지 스스로 나눠 갖도록 하는 편이 훨씬 낫다.**

#### 💧 QA와 인수 테스트
- QA가 자동화된 인스 테스트 작성을 시작하지 않았다면, 계획 회의가 끝나자마자 시작해야 한다.
- 먼저 끝날 예정인 스토리의 테스트부터 만들어야 한다.
- 인수 테스트는 빨리 만들어야 한다. 반복 주기의 전반부에 완성하는 것이 좋다.
- 주의해야 할 점은, 특정 스토리를 구현하는 프로그래머가 그 스토리의 인수 테스트까지 작성하면 안 된다는 것이다.
- 반복 주기 후반이 되고, 인수 테스트 작성이 끝났다면, QA는 다음 반복 주기에 쓸 테스트를 만든다.
- 개발자와 QA는 인수 테스트 이야기를 많이 해야 한다.
- **완료의 정의는 인수 테스트 통과이다.**
- 스토리 하나를 희생하여 다른 스토리를 하나라도 완료하는 것이 반쯤 만든 스토리 두개보다 낫다.
- 스토리를 최대한 완료시키려는 것이지 작업 속도를 높이려는 것은 아니다.
- 이것은 **진행 상황을 보다 구체적이고 측정하게 좋게 만들려는 것이며, 신뢰할 수 있는 데이터를 얻기 위한 것이다.**

### 🔥 데모
- 이해관계자에게 완료한 스토리의 데모를 간단히 시연하는 것으로 반복 주기가 끝난다.
- 데모할 때는 모든 인수 테스트와 단위 테스트를 통과하는 것도 보여 주어야 한다.

### 🔥 속도
- 반복 주기를 마치면서 속도 그래프와 번다운 차트를 기록한다.
- 인수 테스트를 통과한 스토리의 포인트만 기록해야 한다.
- 반복 주기가 몇 번 지나고 나면, 들쑥날쑥한 것이 줄어들면서 평균 속도가 분명해질 정도가 된다.
- 반복 주기가 몇 번 지나고 난 뒤, 속도 그래프의 기울기는 0이어야 한다.

#### 💧 속도가 오를 때
- 표시된 속도가 오르고 있더라도, 아마 진짜로 속도가 오르지는 않았을 것이다.
- 실제로는 프로젝트 관리자가 일을 더 빨리 하라고 압박하고 있다는 의미일 수 있다.
- 속도는 측정하는 것이지 목표하는 것이 아니다. 측정하려는 대상에 압력을 가하지 마라.

#### 💧 속도가 떨어질 때
- 속도 그래프가 꾸준히 계속 떨어진다면, 코드 품질에 문제가 있을가능성이 제일 크다.
- 리팩터링을 충분히 하지 않아서 아마 코드가 썩고 있을 것이다.
- 리팩터링을 충분히 하지 않은 이유 중 하나는 단위 테스트를 충분히 쓰지 않아서이다.

#### 💧 기준 스토리
- 포인트 인플레이션을 막는 한 가지 방법은, **스토리 추정 결과를 계속해서 예전에 정한 기준 스토리와 비교해 보는 것이다.**

## 📚 작은 릴리스
- **작은 릴리스(Small Release)** 실천 방법은 개발팀이 스프트웨어를 최대한 자주 릴리즈할 것을 권장한다.
- 그래서 새로운 목표는 **지속적 배포**(**Continuous Delivery**)이다. 변경 사항이 생길 때마다 코드를 서비스에 배포하는 것이다.

### 🔥 서브버전(SVN)
- 서브버전은 낙관적 잠금을 사용했다.
- 사실 낙관적 잠금은 아무것도 잠그지 않는다. 한 개발자가 모듈을 체크아웃했더라도, 다른 사람이 또 체크아웃할 수 있다.
- 서브버전은 체크아웃한 내용을 기록해 두었다가 모듈의 변경 내용을 자동으로 합쳐 준다.
- 충돌한 부분을 해결한 후에 체크인 가능.

### 🔥 깃과 테스트
- 이제 우른 깃(git)을 사용한다.
- 깃을 쓰면 체크아웃 시간은 0이 된다.
- 체크아웃이라는 개념이 아예 없다. 언제든지 모듈 수정 사항을 커밋할 수 있고, 커밋 간의 충돌은 프로그래머가 원하는 시점에 해결할 수 있다.
- 작고 독립적인 모듈과 빠른 커밋 속도 덕분에 소스 코드 수정 주기는 몇 분 정도로 줄어든다.
- 여기에 포괄적이고 빠르게 수행되는 테스트만 더해서 거의 모든 것을 테스트할 수 있게 된다면 지속적 배포를 할 수 있다.

### 🔥 작은 릴리스
- 애자일은 릴리스 주기를 더 짧게 만들어서 이 오래된 관성을 깨부수려 한다.
- **릴리스 주기를 줄이려면, 조직에서 릴리스와 배포 사이의 관계를 끊어야만 한다.**
- 릴리스라는 단어는 소프트웨어가 기술적으로는 배포 가능하다는 것을 의미한다.

## 📚 인수 테스트
- 인수 테스트(Acceptance Test)는 애자일 실천 방법 중 아는 사람이 가장 적고, 드물게 사용되며, 많이 오해하는 실천 방법이다.
- 인수 테스트의 기반이 되는 발상은 **사업 부서가 요구 사항을 명시해야 한다는 것**이다.
- **명세(specification)은 그 본질상 테스트이다.**

> 사용자가 올바른 사용자 아이디와 비밀번호를 입력하고 '로그인'을 클릭하면, 시스템은 '환영합니다' 페이지를 표시해야 한다.

- 확실한 명세다. 그리고 확실한 테스트이다.
- 이것이 애자일 실천 방법 중 인수 테스트다. 인수 테스트는 가능한 한, **시스템 요구 사항을 자동화된 테스트 형태로 작성해야 한다는 것이다.**

### 🔥 동작 주도 개발
- 댄 노스가 **동작 주도 개발**(Behavior-Driven-Development, BDD)이라는 이름으로 TDD를 새롭게 정의하기 시작했다.
- 댄의 목표는 테스트에서 개발자 용어를 빼내고 명세처럼 보이게 만들어서, 사업 부서 사람들이 좋아하게 만드는 것이였다.
- BDD에서는 Given(상황), When(행동), Then(결과)이라는 단어 세 가지를 특별하게 사용한다.
- 하지만 갈수록 초점이 도구와 테스트에서 요구 사항과 명세로 옮겨갔다.

### 🔥 실천 방법
- 인수 테스트 실천 방법은 사업 부서에서 각 사용자 스토리의 동작을 설명하는 테스트를 형식에 맞게 작성하고, 개발자는 이를 자동화한다.
- 인수 테스트는 업무 분석가와 QA가 작성한다. 테스트할 스토리를 개발하는 반복 주기의 전반부가 끝나기 전까지 작성해야 한다.
- 개발자는 이 테스트를 지속적 빌드에 통합한다.
- 인수 테스트를 통과하기 전까지는 스토리가 끝난 것이 아니다.

#### 💧 업무 분석가와 QA
- 업무 분석나는 정상적으로 성공하는 경로만 기술한다.
- QA는 정상에서 벗어난 경로를 담당한다.
- 개발자는 테스트가 기술적인 관점에서 타당한지 확인해야 한다.

#### 💧 QA
- 이렇게 되면 QA의 역할이 완전히 달라지는데 프로젝트가 끝날 즈음에야 테스트하는 역할에서 프로젝트 **초기에 명세를 작성하는 역할**로 바뀐다.
- 에러나 빠진 요소를 뒤늦게 검사해 알려 주는 것이 아니라, **문제를 예방할 수 있도록 초기부터 개발팀을 안내하게 된다.**
- QA가 시스템을 배포할 수 있는지 결정한다.

#### 💧 사라지는 막바지 테스트
- QA가 막바지에 수동으로 테스트를 하면, 전 단계의 모든 지연으로 인한 부담이 QA에게 쏠린다.
- 시스템 배포하려면 QA의 테스트가 끝나야 한다.
- 일정상 테스트할 시간이 부족해지면 테스트를 하지 않게 되버린다. 변경된 부분만 테스트를 하게된다.
- **이렇게 테스트가 사라진다.** 일정에 압박을 받으면 QA는 그냥 모든 반복 테스트를 생략해 버린다.

#### 💧 개발자가 테스트를 돌린다.
- 이 모든 병을 고치는 만병통치약이 인수 테스트이다.
- 반복 주기에서 처리할 스토리의 인ㄴ수 테스트를 QA가 작성한다. 하지만 QA는 테스트를 돌리지 않는다.
- **시스템이 테스트를 통과하는지 확인하는 사람은 QA가 아니고 프로그래머가 테스트를 돌린다.**
- **모든 코드가 테스트를 통과하는지 확인하는 것은 프로그래머 담당이고 스토리 완료 여부를 알 수 있는 유일한 방법이다.**

#### 💧 지속적 빌드
- 프로그래머는 지속적 빌드 서버를 구축해서 이 과정을 자동화할 것이다.
- 빌드 서버는 프로그래머가 모듈 체크인할 때마다 시스템의 모든 테스트를 수행한다.
- 모든 단위 테스트와 인수 테스트를 죄다 수행한다.

## 📚 전체 팀
- 전체 팀 실천 방법은 원래 현장 고객이라고 불렸다.
- 사용자와 프로그램머가 물리적으로 가까이 있을 수록 의사소통하기 더 좋을 것이다. 그러면 개발도 더 빠르고 정확하게 할 수 있을 것이다.
- 여기서 고객은 필요로 하는 것을 잘 알면서 개발팀과 같은 곳에서 일하는 사람이나 그룹을 가리키는 메타포다.
- 스크럼에서 이 고객을 제품 책임자(Product Owner)라고 부른다.
- **제품 책임자인 사람 혹은 그룹은 스토리를 고르고, 우선순위를 결정하고, 바로바로 피드백을 준다.**
- **전체 팀의 목표는 각 역할을 하는 사람들 사이의 물리적 거리를 최소화하는 것이다.**
- 이 실천 방법은 팀 실천 방법이 아니라 **비즈니스 실천 방법에 속한다.**

### 🔥 같은 곳에서 일하기
- 같은 곳에서 일하게 한 것만으로도 훨씬 효울적으로 일하게 되었다.

#### 💧 떨어져서 일할 때의 대안
- 화상 회의나 스크린 공유를 일상적으로 사용할 수 있다.
- 지구 반대편에 앉아 있는 개발자와 짝 프로그래밍으로 같은 코드를 고칠 수 있다.
- 하지만, **성공적으로 운영되는 것을 본 적은 없다.**

#### 💧 집에서 원격 근무하기
- 팀 동료가 집에서 일하면, 비언어적 의사소통에서 손해보는 부분이 분명 있다.
- 우연히 생기는 대화도 훨씬 줄어든다.
- 팀 대부분이 같은 곳에서 일하고, 구성원 중 한두 명만 일주일에 하루 이틀 정도 집에서 일하는 것이라면, 특별히 거추장스러운 점은 느끼지 못할 수도 있다.
- 하지만 우리 모두 같은 방에서 일할 수 있다면, 훨씬 더 잘 해낼 수 있을 것이다.