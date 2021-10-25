---
sidebar_position: 11
sidebar_label: 10. 동작하는 골격
---

# 🌈 Chapter 10: 동작하는 골격

## 📚 골격 사용 준비
- 동작하는 골격의 핵심은 대략적인 시스템 구조를 제안하고 그것의 유효성을 검증할 수 있을 정도로 요구 사항을 이해하는 데 이바지하는 것이다.

## 📚 최초 테스트
- 동작하는 골격은 반드시 경매 스나이퍼 시스템의 모든 컴포넌트, 즉 사용자 인터페이스, 스나이퍼 컴포넌트, 경매 서버와의 통신 등을 포괄해야 한다.
- 우리는 구현이 이미 존재하는 것처럼 테스트를 작성한 다음 해당 구현이 동작하는 데 필요한 것을 채워나가는 식으로 시작하는 방식을 선호한다. (희망적 관측에 의한 프로그래밍) 테스트를 가지고 역으로 작업하면 시스템을 어떻게 동작하게 만들지에 관련한 복잡함 때문에 발목이 잡히는 대신 시스템이 해야 할 일에 집중하는 데 도움이 된다.

```java
public class AuctionSniperEndToEndTest {
  private final FakeAuctionServer auction = new FakeAuctionServer("item-54321");
  private final ApplicationRunner application = new ApplicationRunner();

  @Test public void sniperJoinsAuctionUntilAuctionCloses() throws Exception {
    auction.startSellingItem(); // 1. 경매에서 품목을 판매
    application.startBiddingIn(auction); // 2. 경매 스나이퍼가 해앋 경매에서 입찰을 시작하면
    auction.hasReceivedJoinRequestFromSniper(); // 3. 경매에서는 경매 스나이퍼로부터 Join 요청을 받을 것이다.
    auction.announceClosed(); // 4. 경매가 Close됐다고 선언하면
    application.showsSniperHasLostAuction(); // 5. 경매 스나이퍼는 경매에서 낙찰해 실패했음을 보여줄 것이다.
  } 
}
```

- 어떤 메서드가 이벤트를 발생시켜 테스트를 이끈다면 해당 메서드의 이름은 `startBiddingIn()` 같은 명령(command)이 될 것이다.
- 반면 어떤 메서드에서 어떤 일이 일어나야 한다고 단정(assert)한다면 해당 메서드의 이름은 서술형(지시적인 형태)이 될 것이다. 예를 들어 `showsSniperHasLostAuction()` 메서드는 애플리케이션에서 경매 상태를 낙찰 실패로 보여주지 않는다면 예외를 던질 것이다.

## 📚 몇 가지 초기 선택
- 이제 테스트를 통과하게 만들어야 한다.
- 여기서는 우선 XMPP 메시지 브로커, XMPP를 통해 통신할 수 있는 스텁 경매, GUI 테스트 프레임워크, 다중 스레드를 지원하고 비동기적인 아키텍처에서 활용가능한 테스트 설비인데, 이 네 가지 구성 요소를 찾아보거나 직접 작성해야 한다.
- 자동화된 빌드, 배포, 테스트 프로세스와 함께 버전 관리하에 프로젝트를 진행해야 한다.
- 이렇게 처음으로 작성할 전 구간 테스트를 작성하다 보면 패키지화와 배포 같은 구조적인 측면에 관한 의사 결정을 내려야 할 것이다.

### 🎈 전 구간 테스트
- 전 구간 테스트에서는 대상 애플리케이션 내부를 들여다볼 수 없으며, 따라서 사용자 인터페이스가 바뀌거나 로그가 남는 것처럼 어떤 가시적인 효과를 감지할 때까지 기다려야만 한다.

### 🎈 시작 준비
- 여기서 첫 테스트는 실제로 전 구간을 대상으로 하지 않는다. 이 테스트에는 실제 경매 서비스가 포함돼 있지 않다. 그 이유는 실제 경매 서비스를 마련하기 쉽지 않기 때문이다.
- **테스트 주도 개발 기술에서 중요한 부분은 테스트 대상을 어디까지 바라봐야 하고, 결국 어떻게 모든 부분을 테스트할지 판단하는 것이다.**
- 차이를 일찍 파악할수록 오해에 기초한 코드양은 줄고 불일치를 고칠 시간은 늘어날 것이다.
