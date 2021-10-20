# 🌈 Chapter 2: Git의 기초

<details><summary>Table of Contents</summary>

- 🦄 Git 저장소 만들기 [:link:](#-Git-저장소-만들기)
- 🦄 수정하고 저장소에 저장하기 [:link:](#-수정하고-저장소에-저장하기)
- 🦄 커밋 히스토리 조회하기 [:link:](#-커밋-히스토리-조회하기)
- 🦄 되돌리기 [:link:](#-되돌리기)
- 🦄 리모트 저장소 [:link:](#-리모트-저장소)
- 🦄 태그 [:link:](#-태그)
- 🦄 Git Alias [:link:](#-Git-Alias)

</details>

## 🦄 Git 저장소 만들기

### 🐣 기존 디렉터리를 Git 저장소로 만들기
  
```bash
> git init
```
- 이 명령은 `.git`이라는 하위 디렉터리를 만든다. 이 디렉터리는 저장소에 필요한 뼈대 파일이 들어있다.
- Git이 파일을 관리하게 하려면 저장소에 파일을 추가하고 커밋해야 한다.

```bash
> git add *.c // 파일을 추가
> git add LICENSE // 파일을 추가
> git commit -m 'initial project version' // 커밋
```

### 🐣 기존 저장소를 Clone 하기
- 다른 프로젝트에 참여하거나(contribute) Git 저장소를 복사하고 싶을 때 `git clone` 명령을 사용한다.
- Git이 SVN과 가장 큰 차이점은 ㅅ버에 있는 거의 모든 데이터를 복사한다.
- `git clone`을 실행하면 프로젝트 히스토리를 전부 받아온다.

```bash
> git clone [url]
```

- 저장소의 데이터를 모두 가져와서 자동으로 가장 최신 버전을 `checkout` 해 놓는다.

```bash
> git clone [url] [디렉터리 명] // 디렉터리 명을 변경할 수 있다.
```

## 🦄 수정하고 저장소에 저장하기
- 파일을 수정하다가 저장하고 싶으면 **스냅샷을 커밋**한다.
- 워킹 디렉터리의 모든 파일은 크게 **Tracked**(관리대상임)와 **Untracked**(관리대상이 아님)로 나눈다.
- Tracked 파일은 이미 스냅샷에 포함돼 있던 파일이고 Tracked 파일은 또 **Unmodified**(수정하지 않음)와 **Modified**(수정함) 그리고 **Staged**(커밋으로 저장소에 기록할) 상태 중 하나이다.
- 처음에 저장소를 `Clone`하면 모든 파일은 `Tracked`이면서 `Unmodified` 상태이다. 이후 어떤 파일을 수정하면 Git은 그 파일을 `Modified` 상태로 인식한다.
- 실제로 수정한 파일을 `Staged` 상태로 만들고, `Staged` 상태의 파일을 커밋한다. (사이클 반복)

### 🐣 파일의 상태 확인하기
- 파일 상태를 확인하려면 `git status` 명령을 사용한다.

```bash
> git status
```

- 프로젝트에 README 파일을 만들면 README 파일은 새로 만든 파일이기 때문에 `git status`룰 실행하면 `Untracked files`에 들어 있다.
- Untracked 상태는 아직 스냅샷(커밋)에 넣어지지 않는 파일이다.

### 🐣 파일 새로 추적하기
- `git add` 명령으로 파일을 새로 추적할 수 있다.

```bash
> git add README
```

- 그 후 `git status` 명령을 다시 실행하면  Tracked 상태이면서 커밋에 추가될 Staged 상태라는 것을 확인할 수 있다.
- 커밋하면  `git add`를 실행한 시점의 파일이 커밋되어 저장소 히스토리에 남는다.

### 🐣 Modified 상태의 파일을 Stage하기
- 이미 Tracked 상태인 파일을 수정하면 `Changes not staged for commit`에 있다.

```bash
❯ git status
현재 브랜치 pro-git-chapter-2 브랜치가 'origin/master'에 맞게 업데이트된 상태입니다.

커밋하도록 정하지 않은 변경 사항:
  (무엇을 커밋할지 바꾸려면 "git add <파일>..."을 사용하십시오)
  (use "git restore <file>..." to discard changes in working directory)
        수정함:        "Pro Git 2\355\214\220/Chapter 1/README.md"
```
- 이 상태는 수정한 파일이 Tracked 상태이지만 아직 Staged 상태는 아니라는 점이다.
- Staged 상태로 만들기 위해서는 `git add` 명령을 실행해야 한다.
- `git add`후 해당 파일을 다시 수정하면 그 파일의 상태는 Staged 상태이면서 동시에 Unstaged 상태로 나오게 된다. 이렇게 되는 이유는 `git commit`은 실행하는 시점의 버전이 커밋되는 것이 아니라 마지막으로 `git add` 명령을 실행했을 때의 버전이 커밋된다. 그렇기 때문에 최신 상태로 반영하기 위해서는 다시 `git add` 명령을 실행해서 최신 버전을 Staged 상태로 만들어야 한다.

### 🐣 파일 상태를 짤막하게 확인하기
- `git status -s` 또는 `git status --short` 처럼 옵션을 주면 현재 변경한 상태를 짤막하게 보여준다.

```bash
> git status -s
M "Pro Git 2\355\214\220/Chapter 1/README.md"
?? "Pro Git 2\355\214\220/Chapter 2/"
```

- 아직 추적하지 않는 새 파일 앞에는 `??`표시가 붙는다.
- Staged 상태로 추가한 파일 중 새로 생성한 파일 앞에는 `A` 표시가, 수정한 파일 앞에는 `M`표시가 붙는다.
- `MM`이 붙는 경우는 해당 파일을 변경하고 Staged 상태로 추가한 후 또 내용을 변경해서 Staged이면서 Unstaged 상태인 파일이다.

### 🐣 파일 무시하기
- 로그 파일이나 빌드 시스템이 자동으로 생성하는 파일 같은 경우에는 Git이 관리할 필요가 없다.
- 이러한 파일을 무시하려면 `.gitignore` 파일을 만들고 그 안에 무시할 파일 패턴을 적는다.
- `.gitignore`파일은 보통 처음에 만들어 두는 것이 편리하다. 그래야 Git 저장소에 커밋하고 싶지 않은 파일을 실수로 커밋하는 일을 방지할 수 있다.
- `.gitignore` 파일에 입력하는 패턴은 아래 규칙을 따른다.

> 1. 아무것도 없는 라인이나, #로 시작하는 라인은 무시한다.
> 2. 표준 Glob 패턴을 사용한다.
> 3. 슬래시(/)로 시작하면 하위 디렉터리에 적용되지 않는다.
> 4. 디렉터리는 슬래시(/)를 끝에 사용하는 것으로 표현한다.
> 5. 느낌표(!)로 시작하는 패턴의 파일은 무시하지 않는다.

- `.gitignore` 예제 [참고](https://github.com/github/gitignore)

### 🐣 Staged와 Unstaged 상태의 변경 내용을 보기
- 어떤 내용이 변경됐는지 살펴보려면 `git status` 명령이 아니라 `git diff` 명령을 사용해야 한다.

```bash
> git diff
```
- 이 명령은 워킹 디렉터리에 있는 것과 Staging Area에 있는 것을 비교한다.
- 만약 커밋하려고 Staging Area에 넣은 파일의 변경 부분을 보고 싶으면 `git diff --staged` 옵션을 사용한다.
- `git diff` 명령은 마지막으로 커밋한 후에 수정한 것들 전부를 보여주지 않는다. `git diff`는 Unstaged 상태인 것들만 보여준다. 즉, **수정한 파일을 모두 Staging Area에 넣었다면 `git diff` 명령은 아무것도 출력하지 않는다.**
- Staged 상태인 파일은 `git diff --cached` 옵션으로 확인한다. `--staged`와 `--cached`는 같은 옵션이다.

### 🐣 변경사항 커밋하기
- Git은 생성하거나 수정하고 나서 `git add` 명령으로 추가하지 않은 파일은 커밋하지 않는다.
- `git commit`을 실행하여 커밋한다.

```bash
> git commit
```
- 커밋을 하게 되면 Git 설정에서 지정된 편집기(Vim, Emacs)가 실행되고, 자동으로 텍스트가 자동으로 포함된다.
- 자동으로 생성되는 커밋 메시지의 첫 라인은 비어 있고 둘째 라인부터 `git status` 명령이 결과가 채워진다. (이 메시지는 삭제하거나 추가할 수 있다. `git commit -v`을 ㅎ게 되면 편집기에 `diff` 메시지가 추가된다.)
- 이렇게 커밋을 하게 되면 다음과 같이 출력되는데 아래 같은 경우는 `object-oriented-chapter-7` 브랜치에 커밋했고 체크섬은 `a742431`라고 알려준다.

```bash
❯ git commit
[object-oriented-chapter-7 a742431] [Update] object oriented chapter 7 link
 1 file changed, 7 insertions(+), 1 deletion(-)
```
### 🐣 Staging Area 생략하기
- Staging Area를 생략하려면 `git commit` 명령을 실행할 때 `-a` 옵션을 추가하면 Git은 Tracked 상태의 파일을 자동으로 Staging Area에 넣는다.

```bash
> git commit -a
```

### 🐣 파일 삭제하기
- Git에서 파일을 제거하려면 `git rm` 명령으로 Tracked 상태의 파일을 삭제한 후에 커밋해야 한다. 이 명령은 워킹 디렉터리에 있는 파일도 삭제하기 때문에 실제로 파일도 지워진다.
- 커밋하면 파일은 삭제되고 Git은 이 파일은 더는 추적하지 않는다.
- 이미 파일을 수정했거나, 수정한 파일을 Index에 추가했다면 `-f` 옵션을 주어 강제로 삭제해야 한다.
- 또한, Staging Area에서만 제거하고 워킹 디렉터리에 있는 파일은 지우지 않고 남겨두려면 `--cached` 옵션을 사용한다.

```bash
> git rm --cached README
```

- 다음과 같이 여러 개의 디렉터리를 삭제할 수도 있다. (log/ 디렉터리에 있는 .log 파일을 모두 삭제한다.)

```bash
> git rm log\/*.log 
```

### 🐣 파일 이름 변경하기
- Git은 파일 이름의 변경이나 파일의 이동을 명시적으로 관리하지 않는다. 즉, 파일 이름이 변경됐다는 별도의 정보를 저장하지 않는다.
- 아래와 같이 파일 이름을 변경할 수 있다.

```bash
> git mv file_from file_to
```

- 위 `mv` 명령어는 아래 명령을 수행한 것과 완전히 동일하다.

```bash
> mv file_from file_to
> git rm file_from
> git add file_to
```

- `git mv`는 일종의 단축 명령어이다. Git의 `mv` 명령은 편리하게 명령을 세 번 실행해주는 것뿐이다.

## 🦄 커밋 히스토리 조회하기
- Git에는 히스토리를 조회하는 명령어인 `git log`가 있다.

```bash
> git log
```
- 특별한 아규먼트 없이 `git log` 명령을 실행하면 저장소의 커밋 히스토리를 시간순으로 보여준다. 즉, **가장 최근의 커밋이 가장 먼저 나온다.**
- 그리고 SHA-1 체크섬, 저자 이름, 저자 이메일, 커밋한 날짜, 커밋 메시지를 보여준다.

```bash
commit 5de160e0d1edd5eafe5c6061b07fce8532a5416b (HEAD -> pro-git-chapter-2, origin/pro-git-chapter-2)
Author: saseungmin <dbd02169@naver.com>
Date:   Tue Jan 19 23:00:00 2021 +0900

    [Update] pro git Chapter 2.2

commit 2ef879e3d68d233db116e1e9d4ffce92b35d7de4
Merge: d1644d2 de4b5af
Author: saseungmin <dbd02169@naver.com>
Date:   Tue Jan 19 22:04:21 2021 +0900

    Merge branch 'master' of https://github.com/saseungmin/reading_books_record_repository into pro-git-chapter-2
```

- `git log`의 `-p` 옵션은 각 커밋의 `diff` 결과를 보여준다.
- `-2` 옵션은 최근 두 개의 결과만 보여주는 옵션이다.

```bash
> git log -p -2
```

- `--stat` 옵션은 히스토리의 통계를 보여준다. 각 커밋의 통계 정보를 조회할 수 있다.
- 이 결과에서 어떤 파일이 수정됐는지, 얼마나 많은 파일이 변경됐는지, 또 얼마나 많은 라인을 추가하거나 삭제했는지 보여준다.

```bash
> git log --stat
```

- `--pretty` 옵션은 히스토리 내용을 보여줄 때 기본 형식 이외에 여러 가지 중 하나를 선택할 수 있다.

```bash
// 각 커밋을 한 라인으로 보여준다.
> git log --pretty=oneline

// short, full, fuller 옵션은 정보를 조금씩 가감해서 보여준다.
> git log --pretty=short

// format 옵션은 나만의 포맷으로 결과를 출력하고 싶을 때 사용한다. (다른 프로그램으로 파싱하고자 할 때 유용하다)
> git log --pretty=format:"%h - %an, %ar : %s"
5de160e - saseungmin, 25시간 전 : [Update] pro git Chapter 2.2
2ef879e - saseungmin, 25시간 전 : Merge branch 'master' of https://github.com/saseungmin/reading_books_record_repository into pro-git-chapter-2
de4b5af - SeungMin, 26시간 전 : Merge pull request #24 from saseungmin/object-oriented-chapter-7
```

- `oneline`과 `format` 옵션은 `--graph` 옵션과 함께 사용하면 브랜치와 머지 히스토리를 보여주는 아스키 그래프를 출력한다.

![chapter2-1](../image/chapter2-1.png)

### 🐣 조회 제한조건
- `git log` 명령엔 조회 범위를 제한하는 옵션들이 있다.
- `-<n>`이고 `n`은 최근 `n`개의 커밋을 의미한다.
- `--since`나 `--until` 같은 시간을 기준으로 조회하는 옵션도 있다.

```bash
// 지난 2주 동안 만들어진 커밋들만 조회
> git log --since=2.weeks
```

- `--author` 옵션으로 저자를 지정하여 검색할 수 있고 `--grep` 옵션으로 커밋 메시지에서 키워드를 검색할 수도 있다.
- 두 옵션을 함께 사용하여 모두 만족하는 커밋을 찾으려면 `--all-match` 옵션도 함께 사용해야 한다.
  
```bash
> git log --author="saseungmin" --grep="pro" --all-match
```

- `-S`를 사용하면 코드에서 추가되거나 제거된 내용 중에 특정 텍스트가 포함되어 있는지를 검색한다.

```bash
> git log -S function_name
```

## 🦄 되돌리기
- 한 번 되돌리면 복구할 수 없기에 주의해야 한다.
- 예를 들어 메시지를 잘못 적었을 때 커밋을 수정해야 할 때가 있는데 이때 `--amend` 옵션을 사용한다.

```bash
> git commit --amend
```
- 이 명령은 Staging Area를 사용하여 커밋한다. 만약 마지막으로 커밋하고 나서 수정한 것이 없다면 조금 전에 한 커밋과 모든 것이 같고, 커밋 메시지만 수정한다.
- 커밋을 했는데 Stage하는 것을 깜빡하고 빠트린 파일이 있으면 아래와 같이 고칠 수 있다.

```bash
> git commit -m 'initial commit'
> git add forgotten_file
> git commit --amend
```
- 여기서 실행한 명령어 3개는 모두 하나의 커밋으로 기록된다. 두 번째 커밋은 첫 번째 커밋을 덮어쓴다.

### 🐣 파일 상태를 Unstaged로 변경하기
- `git reset HEAD <file>...` 메시지를 사용하면 Unstaged 상태로 변경할 수 있다.
- `git reset` 명령을 `--hard` 옵션과 함께 사용하면 워킹 디렉터리 파일까지 수정되기 때문에 조심해야 한다. `hard` 옵션을 사용하지 않으면 Staging Area의 파일만 조작하기 때문에 위험하지 않다.

### 🐣 Modified 파일 되돌리기
- 파일을 수정하고 나서 다시 되돌리기 위해서는 즉, 최근 커밋된 버전으로 되돌리는 방법은 `git status`의 메시지가 친절하게 알려준다.

```bash
> git checkout -- README.md
```
- 이 명령은 꽤 위험할 수 있는데 원래 파일로 덮어썼기 때문에 수정한 내용은 전부 사라진다.
- 만약 변경한 내용을 쉽게 버릴 수는 없고 당장은 되돌려야만 하는 상황이라면 `Stash`와 `Branch`를 사용하면 된다.

## 🦄 리모트 저장소
- 리모트 저장소를 관리한다는 것은 저장소를 추가, 삭제하는 것뿐만 아니라 브랜치를 관리하고 추적할지 말지 등을 관리하는 것을 말한다.

### 🐣 리모트 저장소 확인하기
- `git remote` 명령으로 현재 프로젝트에 등록된 리모트 저장소를 확인할 수 있다.
- 저장소를 clone하면 `origin`이라는 리모트 저장소가 자동으로 등록되기 때문에 `origin`이라는 이름을 볼 수 있다.

```bash
> git remote
origin
```

- `-v` 옵션을 주면 단축 이름과 URL을 함께 볼 수 있다.
- 리모트 저장소가 여러 개 있다면 이 명령은 등록된 저부를 보여준다.

```bash
❯ git remote -v
origin  https://github.com/saseungmin/reading_books_record_repository.git (fetch)
origin  https://github.com/saseungmin/reading_books_record_repository.git (push)
```

### 🐣 리모트 저장소 추가하기
- 새 리모트 저장소는 `git remote add [단축 이름] [URL]` 명령으로 실행한다.

```bash
> git remote add seung https://github.com/saseungmin/reading_books_record_repository.git
```

- 단축 이름을 등록하면 URL 대신에 `seung`라는 이름을 사용할 수 있다.

### 🐣 리모트 저장소를 Pull하거나 Fetch하기
- 리모트 저장소에서 데이터를 가져오려면 아래와 같이 실행한다.

```bash
> git fetch [remote-name]
```

- 이 명령은 로컬에는 없지만, 리모트 저장소에는 있는 데이터를 모두 가져온다.
- `git fetch` 명령은 리모트 저장소의 데이터를 모두 로컬로 가져오지만, 자동으로 Merge하지는 않는다. 그렇기 때문에 수동으로 Merge를 해주어야 한다.
- `git pull` 명령은 리모트 저장소의 브랜치에서 데이터를 가져올 뿐만 아니라 자동으로 로컬 브랜치와 Merge 시킬 수 있다.

### 🐣 리모트 저장소에 Push 하기
- 프로젝트를 공유하고 싶을 때 Upstream 저장소에 Push할 수 있다.
- 이 명령은 `git push [리모트 저장소 이름] [브랜치 이름]` 으로 수행한다.

```bash
> git push origin main
```

- 이 명령은 Clone한 리모트 저장소에 쓰기 권한이 있고, Clone하고 난 이후 아무도 Upstream 저장소에 Push하지 않았을 때만 사용할 수 있다. 다시 말해 다른 사람이 Push한 후에 Push하려고 하면 Push할 수 없다. (Merge 후 가능)

### 🐣 리모트 저장소 살펴보기
- `git remote [리모트 저장소 이름]` 명령으로 리모트 저장소의 구체적인 정보를 확인할 수 있다.

![chapter2-2](../image/chapter2-2.png)

- 리모트 저장소의 URL과 추적하는 브랜치를 출력한다. 또한 가져온 모든 리모트 저장소 정보도 출력한다.
- 브랜치명을 생략하고 `git push` 명령을 실행할 때 어떤 브랜치가 어떤 브랜치로 Push되는지 보여준다.

### 🐣 리모트 저장소 이름을 바꾸거나 리모트 저장소를 삭제하기
- `git remote rename` 명령으로 리모트 저장소의 이름을 변경할 수 있다.

```bash
> git remote rename seung sing
> git remote
origin
sing
```

- 리모트 저장소의 브랜치 이름도 바뀐다. (seung/main => sing/main)
- 라모트 저장소를 삭제해야 한다면 `git remote rm` 명령을 사용한다. 서버 정보가 바뀌었을 때, 더는 별도의 미러가 필요하지 않을 때, 더는 기여자 활동하지 않을 때 필요하다.
  
```bash
> git remote rm sing
> git remote
origin
```

## 🦄 태그
- 보통 태그는 릴리스할 때 사용한다.

### 🐣 태그 조회하기
- 다음 명령으로 만들어진 태그를 확인할 수 있다.

```bash
> git tag
```

- 이 명령은 알파벳 순서로 태그를 보여준다. 검색 패턴을 사용해서 태그를 검색할 수도 있다.

```bash
> git tag -l 'v1.8.5*'
```

### 🐣 태그 붙이기
- Git 태그는 `Lightweight` 태그와 `Annotated` 태그로 두 종류가 있다.
- `Lightweight` 태그는 브랜치와 비슷한데 브랜치처럼 가리키는 지점을 최신 커밋으로 이동시키지 않는다. 단순히 특정 커밋에 대한 포인터일 뿐이다.
- `Annotated` 태그는 Git 데이터베이스에 태그를 만든 사람이 이름, 이메일과 태그를 만든 날짜, 그리고 태그 메시지도 저장한다. GPG로 서명도 할 수 있다. 이러한 모든 정보를 저장할 때만 이 태그를 추천한다.

### 🐣 Annotated 태그
- `tag` 명령을 실행할 때 `-a` 옵션을 추가한다.
- `-m`을 사용하면 메시지를 함께 저장할 수 있다.

```bash
> git tag -a v1.4 -m 'my version 1.4'
```

- `git show` 명령으로 태그 정보와 커밋 정보를 모두 확인 가능하다.

```bash
> git show v1.4
```

### 🐣 Lightweight 태그
- 파일에 커밋 체크섬을 저장하는 것이다. 다른 정보는 저장하지 않는다.
- Lightwieght 태그를 만들 때는  `-a`, `-s`, `-m` 옵션을 사용하지 않는다.
- 이 명령은 단순히 커밋 정보만을 보여준다.

### 🐣 나중에 태그 하기
- 예전 커밋에 대해서도 태그 할 수 있다.
- 특정 커밋에 태그 하기 위해서 명령의 끝에 커밋 체크섬을 명시한다.

```bash
> git tag -a v1.2 9fceb02
```

### 🐣 태그 공유하기
- `git push` 명령은 자동으로 리모트 서버에 태그를 전송하지 않는다.
- 태그를 만들었으면 서버에 별도로 Push해야 한다.
- 브랜치를 공유하는 것과 같은 방법으로 할 수 있다.
- `git push origin [태그 이름]`을 실행한다.

```bash
> git push origin v1.5
```

- 만약 한 번에 여러 개 Push하고 싶으면 `--tags` 옵션을 추가하여 `git push` 명령을 실행한다.
- 이 명령으로 리모트 서버에 없는 태그를 모두 전송할 수 있다.
  
```bash
> git push origin --tags
```

### 🐣 태그를 Checkout 하기
- 태그를 브랜치와 달리 가리키는 커밋을 바꿀 수 없는 이름이기 때문에 Checkout해서 사용할 수 없다.
- 태그가 가리키는 특정 커밋 기반의 브랜치를 만들어 작업하려면 아래와 같이 새로 브랜치를 생성한다.

```bash
> git checkout -b version2 v2.0.0
```

- 이렇게 브랜치를 만든 후에 `version2` 브랜치에 커밋하면 브랜치는 업데이트된다. 하지만, `v2.0.0` 태그는 가리키는 커밋이 변하지 않았으므로 두 내용이 가리키는 커밋이 다르다는 것을 알 수 있다.

## 🦄 Git Alias
- 명령을 완벽하게 입력하지 않으면 Git은 알아듣지 못한다. Git의 명령을 전부 입력하는 것이 귀찮다면 `git config`를 사용하여 각 명령의 `Alias`을 쉽게 만들어 사용할 수 있다.

```bash
> git config --global alias.co checkout
> git config --global alias.br branch
> git config --global alias.ci commit
> git config --global alias.st status
```

- 이렇게 설정하면 `ci` 만 입력해도 커밋이 가능하다.
- 다음과 같이 파일을 Unstaged 상태로 변경하는 명령을 만들어서 불편함을 덜 수 있다.

```bash
> git config --global alias.unstage 'reset HEAD --'
```

- 이렇게 하면 다음 두 명령은 동일한 명령이다.

```bash
> git unstage fileA
> git reset HEAD -- fileA
```

- `!`를 제일 앞에 추가하면 외부 명령을 실행한다.

```bash
> git config --global alias.visual '!gitk'
```