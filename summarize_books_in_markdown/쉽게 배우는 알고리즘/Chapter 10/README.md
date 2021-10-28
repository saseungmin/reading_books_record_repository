# 🌈 Chapter 10: 그래프

#### 📌 해당 JavaScript로 구현한 예제 내용들은 [링크](https://github.com/saseungmin/daily_coding_dojo/issues/8) 참고 

## 📚 그래프의 표현

### 🎈 인접 행렬을 이용한 방법
- 행렬 표현법은 이해하기 쉽고 간선의 존재 여부를 즉각 알 수 있다는 장점이 있다.
- 정점 `i`와 `j`의 인접 여부는 행렬의 `(i, j)`나 `(j, i)` 원소의 값만 보면 알 수 있기 때문이다.
- 대신 `n x n` 행렬이 필요하므로 n<sup>2</sup>에 비례하는 공간이 필요하고, 행렬의 준비 과정에서 행렬의 모든 원소를 채우는 데만 n<sup>2</sup>에 비례하는 시간이 든다. 그러므로 O(n<sup>2</sup>) 미만의 시간이 소요되는 알고리즘이 필요한 경우에 행렬 표현법을 사용하면 행렬의 준비 과정에서만 ɵ(n<sup>2</sup>)의 시간을 소모해버려 적절하지 않다.
- 간섭의 밀도가 아주 높은 그래프에서는 인접 행렬 표현이 적합하다.
- JavaScript 인접 행렬 예제

```js
function adjacentMatrix(n, arr) {
  const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  const dp = Array.from({ length: n + 1 }, () => false);

  let answer = 0;

  arr.forEach(([x, y]) => {
    graph[x][y] = 1; // 행렬 생성
  });

  function dfs(v) {
    if (v === n) {
      answer += 1;
      return;
    }

    for (let i = 1; i <= n; i++) {
      if (!dp[i] && graph[v][i] === 1) {
        dp[i] = true;

        dfs(i);

        dp[i] = false;
      }
    }
  }

  dp[1] = true;
  dfs(1);

  return answer;
}
```


### 🎈 인접 리스트를 이용한 방법
- 인접 리스트 표현법은 각 정점에 인접한 정점들을 리스트로 표현하는 방법이다. 각 정점마다 리스트를 하나씩 만들고 여기에 각 정점에 인접한 정점들을 연결 리스트로 매단다.
- 인접 리스트 표현에서는 행렬 표현과 달리 존재하지 않는 간선은 표현상에 나타나지 않는다.
- 무향 그래프를 위한 인접 리스트 표현에서 필요한 총 노드 수는 존재하는 총 간선 수의 2배다.
- 유향 그래프의 경우에는 간선 하나당 노드가 하나씩 존재한다.
- 인접 리스트는 공간이 간선의 총수에 비례하는 양만큼 필요하므로 대체로 행렬 표현에 비해 공간의 낭비가 없다. 모든 가능한 정점 쌍에 비해 간선의 수가 적을 때 유용하다. 하지만, 거의 모든 정점 쌍에 대해 간선이 존재하는 경우에는 오히려 리스트를 만드는 데 필요한 오버헤드만 더 든다. 그래서 간선의 밀도가 높은 경우에는 적합하지 않다.
- JavaScript 인접 리스트 예제

```js
function adjacentList(n, arr) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const dp = Array.from({ length: n + 1 }, () => false);

  let answer = 0;

  arr.forEach(([x, y]) => {
    graph[x].push(y); // 리스트 생성
  });

  function dfs(v) {
    if (v === n) {
      answer += 1;
      return;
    }

    for (let i = 0; i < graph[v].length; i++) {
      const node = graph[v][i];

      if (!dp[node]) {
        dp[node] = true;

        dfs(node);

        dp[node] = false;
      }
    }
  }

  dp[1] = true;
  dfs(1);

  return answer;
}
```

### 🎈 인접 배열과 인접 해시 테이블
- 각 정점에 연결된 정점들을 연결 리스트로 저장하는 대신 배열로 저장하면 연결 리스트의 포인터를 관리하는 번거로움에서 해방될 뿐만 아니라 두 정점의 인접 여부를 체크하는 시간도 대폭 줄일 수 있다.

## 📚 너비 우선 탐색(BFS)과 깊이 우선 탐색(DFS)
- BFS는 먼저 루트의 자식을 차례로 방문한다. 다음으로 루트 자식의 자식, 즉 루트에서 두 개의 간선을 거쳐서 도달할 수 있는 정점을 방문한다.
- DFS는 루트의 자식 정점을 하나 방문한 다음 아래로 내겨갈 수 있는 곳까지 내려간다. 더 이상 내려갈 수가 없으면 위로 되돌아오다가 내려갈 곳이 있으면 즉각 내려간다.
- 다음은 BFS 알고리즘이다.

```
BFS(G, s) // G: 그래프, s: 시작정점
{
  for each v ∈ V - {s} // 모든 정점에서 시작정점을 뺀 것
    visited[v] <- NO; // 시작 정점을 제외한 모든 정점은 방문하지 않음.
  visited[s] <- YES; // 시작 정점은 방문했다.
  enqueue(Q, s); // 시작 정점을 큐에 넣는다.
  while(Q != Ø) { // 공집합이 아니면
    u <- dequeue(Q);
    for each v ∈ L(u) // L(u): 정점 u의 인접 정점 집합
      if (visited[v] = NO) then {
        visited[v] <- YES;
        enqueue(Q, v);
      }
  }
}
```

- BFS의 수행 시간은 ɵ(V + E)이다. 각 정점이 큐에 한 번씩 들어갔다 나온다.
- JavaScript BFS 예제

```js
function solution(s, e) {
  const dis = Array.from({ length: 10001 }, () => 0);
  const check = Array.from({ length: 10001 }, () => false);

  const queue = [];

  queue.push(s);
  check[s] = true;

  while (queue.length) {
    const v = queue.shift();

    for (const nv of [v + 1, v - 1, v + 5]) {
      if (nv === e) {
        return dis[v] + 1;
      }

      if (nv > 0 && nv <= 10000 && !check[nv]) {
        check[nv] = true;
        queue.push(nv);
        dis[nv] = dis[v] + 1;
      }
    }
  }

  return 0;
}

solution(5, 14); // 3
```

- 다음은 DFS 알고리즘이다.

```
DFS(G)
{
  for each v ∈ V
    visited[v] <- NO;
  for each v ∈ V
    if (visited[v] = NO) then aDFS(v);
}

aDFS(v)
{
  visited[v] <- YES;
  for each x ∈ L(v) // L(v): 정점 v의 인접 정점 집합
    if (visited[x] = NO) then aDFS(x);
}
```

- 궁극적으로 모든 정점에 대해 `aDFS()`가 한 번씩 호출된다. DFS의 수행시간은 ɵ(V + E)이다.

```js
function solution(board) {
  const maze = [...board];

  let result = 0;
  const len = maze.length - 1;

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  function dfs(x, y) {
    if (x === len && y === len) {
      result += 1;
      return;
    }

    for (let i = 0; i < 4; i++) {
      const newX = x + dx[i];
      const newY = y + dy[i];

      if (newX <= len && newX >= 0 && newY <= len && newY >= 0 && maze[newX][newY] === 0) {
        maze[newX][newY] = 1;

        dfs(newX, newY);

        maze[newX][newY] = 0;
      }
    }
  }

  maze[0][0] = 1;
  dfs(0, 0);

  return result;
}
```

## 📚 최소 신장 트리
- 그래프 `G=(V, E)`의 신장 트리는 정점 집합 `V`를 그대로 두고 간선을 `|V| - 1`개만 남겨 트리가 되도록 만든 것이다.
- 너비 우선 트리와 깊이 우선 트리도 신장 트리들이다.
- 간선들이 가중치를 갖는 그래프에서 간선 가중치의 합이 가장 작은 트리를 최소 신장(Minimum Spanning Tree)라 한다.

### 🎈 프림 알고리즘
- 프림 알고리즘은 집합 S를 공집합에서 시작하여 모든 정점을 포함할 때까지(즉, `S=V`가 될때까지) 키워나간다. 맨 처음 정점을 제외하고는 정점을 하나 더할 때마다 간서이 하나씩 확정된다.
- 다음 프림 알고리즘(버전 1)은 집합 S를 중심으로 기술한 것이다.

```
Prim(G, r)
// G = (V, E): 주어진 그래프
// r: 시작 정점
// d[]: 각 정점을 신장 트리에 포함시키는 데 드는 최소 비용을 구하기 위한 것
// tree[v]: 현재까지 계산 결과 정점 v를 신장 트리에 연결시키는 비용이 가장 적게 드는 간선을 저장한다. (실제로는 해당 간선에서 v의 맞은편에 있는 정점을 저장한다.)
{
  S <- Ø; // S: 정점 집합
  for each u ∈ V
    d[u] <- ∞;
  d[r] <- 0;

  while (S != V) { // n회 순환
    u <- extractMin(V - S, d); // 가중치가 가장 적은 정점 u
    S <- S ∪ {u}; // S 정점 집합에 포함 시킨다.
    for each v ∈ L(u) // L(u): 정점 u의 인접 정점 집합
      // 가중치(w(u, v)) 값이 정점(d[v])의 최소 비용보다 작고, 
      // 정점이 S에 속하지 않고, 방문하지 않은 것 (v ∈ V - S)
      if (v ∈ V - S and w(u, v) < d[v]) then {
        d[v] <- w(u, v); // 정점의 최소 비용을 바꿔준다.
        tree[v] <- u;
      }
  }
}

extractMin(Q, d[])
{
  // 집합 Q에서 d 값이 가장 작은 정점 u를 리턴한다;
}
```

- 다음은 프림 알고리즘(버전 2)는 집합 S를 제외한 나머지, 즉 `Q = V - S`를 중심으로 기술한 것이다.
- 직관적으로는 집합 S를 바로 다루는 첫 번째 버전이 이해하기에 좀 나을지 모르나 구현하는 데는 두 번째 버전이 더 나을 것이다.

```
Prim(G, r)
// G = (V, E): 주어진 그래프
// r: 시작 정점
{
  Q <- V; // Q: S에 속하지 않은 정점 집합
  for each u ∈ Q
    d[u] <- ∞;
  d[r] <- 0;
  
  while(Q != Ø) { // n회 순환
    u <- deleteMin(Q, d);
    for each v ∈ L(u) // L(u): 정점 u의 인접 정접 집합
      if (v ∈ Q and w(u, v) < d[v]) then {
        d[v] <- w(u, v);
        tree[v] <- u;
      }
  }
}

deleteMin(Q, d[])
{
  // 집합 Q에서 d값이 가장 적은 정점 u를 리턴하고, u를 집합 Q에서 제거한다;
}
```

- 이 프림 알고리즘에서 집합 Q가 모든 정점을 집합 V에서 시작하여 공집합으로 줄어가는 것이다.
- 프림 알고리즘의 수행 시간은 우선 `for`루프는 정확히 `n`번 반복된다. 각가의 `for` 루프에서 단순 할당 작업을 하므로 상수 시간이 소모되어 첫 `for` 루프는 총 `O(V)` 시간을 소요한다. `while` 루프는 정확히 `n`회 반복된다. 이 `while` 루프에 `for` 루프가 중첩되어 있다. 두 개의 루프가 중첩되어 있지만 `for` 루프는 `u`와 인접한 간선을 훑어보는데 어떻게 되든 한 간선은 두 번만 본다. 그러므로 `for` 루프는 `while` 루프를 통틀어 `2E`번 돌 뿐이다.
- 프림 알고리즘의 수행 시간은 `deleteMin()`이 `while` 루프가 반복될 때마다 수행되는 시간과 `while` 문 안의 `for`루프 내에서 수행되는 시간 중 하나가 죄우하게 된다.
- `deleteMin()`이 배열을 정렬된 배열로 유지한다면 가장 작은 원소를 추출하는 데는 상수 시간이 든다. 단, `d[v]`값의 변동이 생길 때 최대 `O(V)` 시간이 소요된다. 이런 수정은 최악의 경우 `E`번 일어날 수 있으므로 이것이 수행 시간을 좌우하며 전체 시간은 `O(VE)`가 된다.
- 만약 `d` 값의 관리를 위해 최소힙을 사용하면 시간을 개선할 수 있다. `d`값들이 힙으로 구성되어 있다면 `deleteMin()`은 `O(logV)` 시간에 가능하다. `while` 루프가 `n`회 반복되므로 이와 관계된 비용은 `O(VlogV)`이다. 그런데 `for` 루프 안에서 `d` 값이 변동이 생기면 힙을 조정해줘야 한다. 힙에서 임의의 원소 값이 변해서 이를 반영하여 조정하는 데는 `O(logV)` 시간이 소요된다. 이런 수정은 최악의 경우 `E`번 일어날 수 있으므로 이와 관련된 비용은 총 `O(ElogV)`가 된다.

### 🎈 크루스칼 알고리즘

- 크루스칼(Kruskal) 알고리즘은 사이클을 만들지 않는 범위에서 최소 비용 간선을 하나씩 더해가면서 최소 신장 트리를 만든다. `n`개의 정점으로 트리를 만드는 데는 `n - 1` 개의 간선이 필요하므로, 알고리즘은 최초에는 간선이 하나도 없는 상태에서 시작하여 `n - 1`개의 간선을 더하면 끝난다.
- 크루스칼 알고리즘은 프림 알고리즘처럼 하나의 트리를 키워나가는 방식이 아니고, 임의의 시점에 최소 비용의 간선을 더하므로 여러 개의 트리가 산재하게 된다.
- 최초에는 `n`개의 트리로 시작한다. 즉, 간선이 하나도 없는 상태의 `n`개의 정점은 각각 정점 하나만으로 구성된 `n`개의 트리로 볼 수 있다. 하나의 간선을 더할 떄마다 두 개의 트리가 하나의 트리로 합쳐진다. `n - 1`개의 간선을 더하고 나면 모든 트리가 합쳐져서 하나의 트리가 된다.
- 다음은 크루스칼 알고리즘이다.

```
Kruskal(G)
{
  T <- Ø; // T: 신장 트리
  1. 단 하나의 정점만으로 구성된 n개의 집합을 초기화한다.
  2. 모든 간선을 가중치의 크기 순으로 정렬하여 배열 A[1 ... E]에 저장한다;
  while (T의 간선 수 < n - 1) { // 3
    4. A에서 최소 비용의 간선 (u, v)를 제거한다;
    if (정점 u와 v가 다른 집합에 속함) then { // 5. 두 정점은 다른 집합에 속해야 한다. (같은 집합에 속하면 사이클이 만들어짐)
      T <- T ∪ {(u, v)}; // 6. 간선 하나를 더한다.
      7. 정점 u와 v가 속한 두 집합을 하나로 합친다;
    }
  }
}
```

- 프림 알고리즘이 하나의 트리(=집합)에 초점을 맞추어 키워나가는 데 비해 크루스칼 알고리즘은 부분적 트리(=집합)들을 조각조각 만들고 합쳐간다.
- 크루스칼 알고리즘의 수행 시간은 1번에서 모든 간선을 정렬하는 데 `O(ElogE) = O(ElogV)`가 소요된다. 3번 `while` 루프는 최소 `V - 1`회, 최대 `E`회를 반복한다. `While` 루프 내부는 4번은 상수 시간이 든다. 5번과 7번은 집합을 관리하는 작업들로 여러 가지 구현 방법이 있다. 최대 `O(E)`의 `Find-Set()`과 `Union()`을 수행하게 된다. 여기에 1번에서 V번의 `Make-Set()`이 필요하다. 두 합친 시간은 O((V + E)log<sup>`*`</sup>V)가 된다. log<sup>`*`</sup>V는 거의 상수로 간주할 수 있으므로 결국 크루스칼 알고리즘이 시간을 좌우하는 것은 2번의 정렬 시간이다. 따라서 총 수행 시간은 O(ElogV)가 된다.

## 📚 위상 정렬(Topological Sorting)
- 작업 `i`와 작업 `j` 사이에 간선 `(i, j)`가 존재한다면 작업 `i`는 반드시 작업 `j`보다 먼저 수행된다. 모든 간선에 대해서 이 성질만 만족하면 어떤 순서라도 좋다. 이러한 성질을 만족하는 정렬을 위상 정렬이라 한다.
- 위상 정렬은 사이클이 없는 유향 그래프 `G=(V, E)`에서 `V`의 모든 정점을 정렬하되 다음 성질을 만족해야 한다.

> 간선(i, j)가 존재하면 정렬 결과에서 정점 i는 반드시 정점 j보다 앞에 위치해야 한다.

- 만약 그래프에 사이클이 있다면 이 성질은 결코 만족될 수 없으므로 위상 정렬은 할 수 없다.
- 다음은 위상 정렬 알고리즘을 기술한 것이다.

```
topologicalSort1(G, v)
{
  for i <- 1 to n {
    1. 진입 간선이 없는 정점 u를 선택한다;
    A[i] <- u;
    2. 정점 u와 u의 진출 간선들을 모두 제거한다;
  }

  // 이 시점에 배열 A[1 ... n]에는 정점들이 위상 정렬되어 있다.
}
```

- 위상 정렬 알고리즘의 수행 시간은 `for` 루프는 `n`번 반복된다. 매 반복 때마다 1개의 정점이 선택되고 해당 정점이 연결된 진출 간선이 모두 제거된다. 각 간선은 단 한 번씩만 취급된다. 그러므로 총 수행 시간은 ɵ(V + E)이다.
- 다음은 DFS를 이용한 위상 정렬 알고리즘으로 앞의 위상 정렬 알고리즘보다 더 많이 사용한다.

```
topologicalSort2(G)
{
  for each v ∈ V
    visited[v] = NO;
  for each v ∈ V // 정점의 순서는 무관
    if (visited[v] = NO) then DFS-TS(v);
}

DFS-TS(v)
{
  visited[v] = YES;
  for each x ∈ L(v) // L(v): v의 인접리스트
    if (visited[x] = NO) then DFS-TS(x);
  // 1. 연결 리스트 R의 맨 앞에 정점 v를 삽입한다.
}
```

- 이 알고리즘의 수행 시간은 DFS에 1번의 연결 리스트 삽입을 더한 것뿐이므로 (연결 리스트 삽입 한 번당 상수 시간, 총 ɵ(V)) DFS의 수행 시간과 같다. 그러므로 ɵ(V + E)이다.

## 📚 최단 경로
- 그래프 `G=(V, E)`가 주어지고, 여기서 `E`는 가중치를 가진 유향 간선들의 집합이다. 임의의 경로는 연속된 간선들로 구성된다. 경로를 구성하는 간선들의 가중치 합을 해당 경로의 길이라 한다.
- 목적지에 이르는 모든 가능한 경로 중 최단 경로를 찾는 알고리즘으로 다익스트라 알고리즘, 벨만-포드 알고리즘, 모든 쌍 최단 경로 알고리즘, 사이클이 없는 그래프의 최단 경로 알고리즘을 소개한다.
- 최단 경로 문제에서 입력 그래프의 유형은 크게 두 가지다.
  1. 모든 간선 가중치가 음이 아닌 일반적인 경우로, 다익스트라 알고리즘이 이 유형의 문제를 푼다.
  2. 음의 가중치가 존재하는 경우로. 벨만-포드 알고리즘이 이 유형의 문제를 푼다. (음의 가중치는 허용하지만 가중치 합이 음인 사이클은 절대 허용하지 않는다.)
- 다익스트라 알고리즘, 벨만-포드 알고리즘, 사이클이 없는 그래프의 최단 경로 알고리즘은 하나의 시작 정점에서 다른 모든 정점까지 최단 경로를 구한다.
- 모든 쌍 최단 경로 알고리즘은 모든 정점 쌍 간의 최단 경로를 구한다. 즉, 전자의 알고리즘은 `n-1`개의 경로를 구하지만, 후자의 알고리즘은 `n(n-1)`개의 경로를 구한다. 그래서 앞의 유형을 단일 시작점 최단 경로 문제라 하고, 뒤의 유형은 모든 쌍 최단 경로 문제라고 한다.

### 🎈 다익스트라 알고리즘(음의 가중치를 허용하지 않는 경우)
- 입력 그래프 `G=(V, E)`에서 간선들의 가중치가 모두 0 이상인 경우의 최단 경로 알고리즘이다. 이 알고리즘은 다익스트라(Dijkstra)가 고안했다.

```
Dijkstra(G, r)
// G=(V, E): 주어진 그래프
// r: 시작으로 삼을 정점
{
  S <- Ø; // S: 정점 집합
  for each u ∈ V
    d[u] <- ∞;
  d[r] <- 0;

  while (S != V) { // n회 순환
    u <- extractMin(V-S, d); // S에 포함되지 않은 가중치가 가장 작은 정점
    S <- S ∪ {u}; // S 정점 집합에 포함 시킨다.

    for each v ∈ L(u) // L(u): 정점 u로부터 연결된 정점들의 집합
      // S에 포함되어 있지 않고, 정점의 비용과 간선의 가중치 비용을 더한 것이 현재 정점 비용보다 값이 작으면
      if (v ∈ V-S and d[u] + w(u, v) < d[v]) then {
        d[v] <- d[u] + w(u, v); // 현재 정점의 비용 변경
        prev[v] <- u; // 가중치 저장
      }
  }
}

extractMin(Q, d[])
{
  // 집합 Q에서 d값이 가장 작은 정점 u를 리턴한다;
}
```

- 다익스트라 알고리즘은 최소 신장 트리를 위한 프림 알고리즘과 원리가 거의 비슷하다. 다만 프림 알고리즘에서는 `d[v]`가 정점 `v`를 신장 트리에 연결하는 최소 비용을 위해 사용되는 반면, 다익스트라 알고리즘에서는 `d[v]`가 정점 `r`에서 정점 `v`에 이르는 최단 거리를 위해 사용된다.
- 다익스트라 알고리즘은 프림 알고리즘과 거의 같으므로 수행시간은 힙을 이용하면 O(ElogV) 시간이 소요된다. 다익스트라 알고리즘은 간선의 가중치가 음이 되면 작동하지 않는다.
- JavaScript 다익스트라 알고리즘 예제

```js
function dijkstra(board, n) {
  const graph = Array.from({ length: n }, () => []);

  board.forEach(([from, to, weight]) => {
    graph[from].push([to, weight]);
  });

  const dist = Array.from({ length: n }, () => Infinity);
  const visited = Array.from({ length: n }, () => false);
  const pq = new PriorityQueue(dist);

  pq.enqueue(0);
  dist[0] = 0;

  while (pq.queue.length) {
    const [v] = pq.dequeue();

    if (!visited[v]) {
      visited[v] = true;

      graph[v].forEach(([to, weight]) => {
        if (dist[v] + weight < dist[to]) {
          dist[to] = dist[v] + weight;
          pq.enqueue(to);
        }
      });
    }
  }

  return dist.reduce((acc, cur) => acc + cur, 0);
}
```
### 🎈 벨만-포드 알고리즘(음의 가중치를 허용하는 경우)
- 벨만-포드(Bellman-Ford) 알고리즘은 입력 그래프 G=(V, E)에서 간선의 가중치가 음의 값을 허용하는 임의의 실수인 경우 최단 경로 알고리즘이다.
- 벨만-포드 알고리즘은 간선을 최대 1개 사용하는 최단 경로, 간선을 최대 2개 사용하는 최단 경로, ... 식으로 간선을 최대 `n-1`개 사용하는 최단 경로까지 구해나간다.
- 다음은 벨만-포드 알고리즘을 기술한 것이다.

```
BellmanFord(G, r)
{
  for each u ∈ V
    d[u] <- ∞;
  d[r] <- 0;

  for i <- 1 to |V|-1 // 정점의 개수 - 1
    for each (u, v) ∈ E // u에서 v로 가는 간선
      // 직전 정점 + v로 가는 간선 비용 < 현재 정점의 가중치
      if (d[u] + w(u, v) < d[v]) then {
        d[v] <- d[u] + w(u, v);
        prev[v] <- u;
      }
  // 음의 사이클 존재 여부 확인
  for each (u, v) ∈ E
    if (d[u] + w(u, v) < d[v]) then output "음의 사이클 발견! 해 없음";
}
```

- 최대 `n-1`개의 간선을 사용해서 이를 수 있는 최단 경로는 이 그래프의 최단 경로다.
- **벨만-포드 알고리즘은 음의 사이클이 존재하면 문제 자체가 성립되지 않는다.**
- **벨만-포드 알고르즘을 사용해야 하는 곳에 다익스트라 알고리즘을 사용하면 제대로 해를 구하지 못한다.** **반대로 다익스트라 알고리즘을 사용해 해를 구할 수 있는 경우에는 항상 벨만-포드 알고리즘을 써도 된다.** 그러나 **벨만 포드 알고리즘은 O(ElogV) 시간이 소요되는 다익스트라 알고리즘에 비해 시간이 많이 걸린다.**
- 벨만-포드 알고리즘의 수행 시간은 가장 바깥 `for` 루프는 O(V)회 반복된다. 그 안의 `for`루프는 O(E)회 반복된다. `for`루프 내 `if ~ then` 작업은 상수 작업이다. 따라서 이 두 `for`루프가 겹쳐져서 총 O(VE) 시간이 소요된다.
- JavaScript 벨만-포드 예제

```js
function bellmanFord(graph, n) {
  let answer = true;

  const distance = Array.from({ length: n }, () => Infinity);
  const predecessor = Array.from({ length: n }, () => null);

  distance[0] = 0;

  for (let i = 0; i < n - 1; i++) {
    graph.forEach(([from, to, weight]) => {
      if (distance[from] + weight < distance[to]) {
        distance[to] = distance[from] + weight;
        predecessor[to] = from;
      }
    });
  }

  graph.forEach(([from, to, weight]) => {
    if (distance[from] + weight < distance[to]) {
      answer = false;
    }
  });

  return answer ? [distance, predecessor] : answer;
}
```


### 🎈 모든 쌍 최단 경로 알고리즘
- 모든 정점 쌍 사이의 최단 경로를 구하는 방법으로 구해야 할 최단 경로가 모두 n<sup>2</sup>개다. (자신에게서 자신으로 경로도 포함해서)
- 플로이드-워샬 알고리즘은 동적 프로그래밍의 원리를 이용하지만 ɵ(n<sup>3</sup>)에 해결한다.

> d<sub>ij</sub><sup>k</sup> : 정점 집합 {1, 2, ..., k}에 속하는 정점들만 중간 정점으로 거쳐서 i에서 j에 이르는 최단 거리

- 정점의 **집합**과 관계를 지었다. 관계식은 다음과 같다.
- d<sub>ij</sub><sup>k</sup> =
  1. `if k = 0` : w<sub>ij</sub>
  2. `if k >= 1` : min{ d<sub>ij</sub><sup>k-1</sup>, d<sub>ik</sub><sup>k-1</sup>, d<sub>kj</sub><sup>k-1</sup>}
- 다음은 플로이드-워샬 알고리즘으로 여기서 `1, 2, ..., n`으로 매겨지는 정점의 순서는 어떠한 순서든 상관 없고 한 가지 순서가 고정되기만 하면 된다.

```
// ^: 다음 문자 및 숫자는 윗첨자
// ~: 다음 문자 및 숫자는 아랫첨자
FloydWarshall(G)
{
  for i <- 1 to n
    for j <- 1 to n
      d^k~ij <- w~ij;
  for k <- 1 to n // 중간 정점 집합 {1, 2, ..., k}
    for i <- 1 to n // i: 시작 정점
      for j <- 1 to n // j: 마지막 정점
        // 위 공식중 두번째가 들어감.
}
```

- 이 알고리즘의 수행 시간은 ɵ(n)의 `for` 루프가 세 겹 중첩되었고, 각 경우에 단 두 가지 경우의 대소를 비교하는 것으로 상수 시간이 걸려 ɵ(n<sup>3</sup>) 시간에 수행된다.
- JavaScript 플로이드-워샬 알고리즘 예제

```js
function floydWarshall(n, edges) {
  const adjMatrix = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

  edges.forEach(([from, to, weight]) => {
    adjMatrix[from][to] = weight;
  });

  for (let k = 1; k < n + 1; k++) {
    for (let i = 1; i < n + 1; i++) {
      for (let j = 1; j < n + 1; j++) {
        // 정점 i -> j로 갈 때 기존 거리값과 k를 거쳐갈 때의 거리 값 중 작은 값을 저장
        adjMatrix[i][j] = Math.min(adjMatrix[i][j], adjMatrix[i][k] + adjMatrix[k][j]);
      }
    }
  }

  // Infinity 배열 삭제
  return adjMatrix;
}
```

### 🎈 사이클이 없는 그래프의 최단 경로
- 사이클이 없는 유향 그래프를 DAG(Directed Acyclic Graph)라 한다. DAG에서는 모든 정점을 한 줄로 늘어놓을 때, 뒤에 위치한 정점부터 앞에 위치한 정점으로 가는 간선은 존재하지 않도록 정점들의 순열이 존재한다. 이 순열은 위상 정렬로 얻을 수 있다.
- DAG에서는 위상 정렬의 순서를 이용해서 다음과 같이 최단 경로를 구할 수 있다.

```
DAG-ShortestPath(G, r)
{
  for each u ∈ V // 1
    d[u] <- ∞;
  d[r] <- 0;
  2. G의 정점들을 위상 정렬한다;
  for each u ∈ V // 3. (위상 정렬 순서로)
    for each v ∈ L(u) // 4. L(u): u로부터 연결된 정점들의 집합
      if (d[u] + w(u, v) < d[v]) then {
        d[v] <- d[u] + w(u, v);
        prev[v] <- u;
      }
}
```

- DAG의 최단 경로 알고리즘의 수행 시간은 1번의 `for` 루프는 ɵ(V)의 시간이 들고, 2번 위상 정렬은 ɵ(V+E)의 시간이 든다. 4번의 `for`루프를 한 번 반복하는 데는 상수 시간이 든다. 3번의 `for`루프에서 각 정점을 한 번씩 보고 그때마다 해당 정점에서 연결된 간선들을 한 번씩 체크하므로 3, 4번 통틀어 모든 간선을 한 번씩 체크하게 된다. 즉, 4번의 `for`루프는 3번의 `for`루프를 통틀어 정확하게 총 `E`번 반복된다. 3, 4번의 두 `for`루프를 통틀어 수행 시간은 ɵ(V+E)이다. 그러므로 총 수행 시간은 ɵ(V+E)이다.
- 이것은 선형 시간으로 다익스트라 알고리즘이나 벨만-포드 알고리즘보다 훨씬 빠르다.
- 참고로 DAG의 경우, 위 알고리즘에서 간선들의 가중치의 부호를 모두 바꾸어 수행하면 최장 경로를 구할 수 있다. 그렇지만 DAG가 아닌 경우, 다익스트라 알고리즘이나 벨만-포드 알고리즘에서는 이런 방식으로 최장 경로를 구할 수 없다.

## 📚 강연결 요소
- 유향 그래프 G=(V, E)에서 V의 모든 정점 쌍(u, v)에 대해서 경로 `u -> v`와 `v -> u`가 존재하면 그래프 G는 강하게 연결되었다고 말한다. 즉, 어떤 두 정점을 잡더라도 양방향으로 서로에게 이르는 경로가 존재하면 강하게 연결되었다고 한다. 그래프에서 강하게 연결된 부분 그래프들을 각각 강연결 요소(Strongly Connected Component)라 한다.
- 임의의 그래프에서 강연결 오소들을 찾는 문제는 깊이 우선 탐색을 이용하는 대표적인 응용 중 하나다.
- 강연결 요소 구하기

```
stronglyConnectedComponents(G)
{
  1. 그래프 G에 대해 DFS(G)를 수행하여 각 정점 v의 완료 시간 f[v]를 계산한다;
  2. G의 모든 간선들의 방향을 뒤집어 G^R을 만든다;
  3. DFS(G^R)을 수행하되 아래 DFS의 1번에서 시작점을 택할 때 stronglyConnectedComponents의 1번에서 구한 f[v]가 가장 큰 정점으로 잡는다;
  4. 앞의 3번에서 만들어진 분리된 트리 각각의 강연결 요소를 리턴한다;
}

DFS(G)
{
  for each v ∈ V
    visited[v] <- NO;
  for each v ∈ V // 1.
    if (visited[v] = NO) then aDFS(v);
}

aDFS(v)
{
  visited[v] <- YES;
  for each x ∈ L(v) // L(v): 정점 v의 인접 정점 집합
    if (visited[x] = NO) then aDFS(x);
}
```

- 강연결 요소 구하기 알고리즘은 수행 시간은 1번의 DFS는 ɵ(V+E)시간이 든다. 2의 그래프 G<sup>R</sup>을 만드는 과정도 모든 간선을 한 번씩 훑으면서 방향만 바꾸어주면 되니까 ɵ(V+E)시간이 든다. 3번의 DFS도 ɵ(V+E)시간이 든다. 그러므로 알고리즘의 총 수행 시간은 ɵ(V+E)이다.

